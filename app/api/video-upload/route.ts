import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResponse {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: unknown;
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      { status: 401 },
    );
  }

  try {
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        {
          error: 'Cloudinary configuration is missing.',
        },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const originalSize = formData.get('originalSize') as string;

    if (!file) {
      return NextResponse.json(
        {
          error: 'File not found.',
        },
        {
          status: 400,
        },
      );
    }

    if (!title || !description || !originalSize) {
      return NextResponse.json(
        {
          error: 'Title, description, and original size are required.',
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'video',
            folder: 'video-uploads',
            eager: [{ quality: 'auto', fetch_format: 'mp4' }],
            eager_async: true,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as CloudinaryUploadResponse);
            }
          },
        );
        uploadStream.end(buffer);
      },
    );

    const video = await prisma.video.create({
      data: {
        title,
        description,
        publicId: result.public_id,
        originalSize: originalSize,
        compressedSize: String(result.bytes),
        duration: result.duration || 0,
      },
    });

    return NextResponse.json(
      {
        video,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log('Upload video failed.', error);
    return NextResponse.json(
      {
        error: 'Upload video failed.',
      },
      {
        status: 500,
      },
    );
  } finally {
    await prisma.$disconnect();
  }
}

import { PrismaClient } from '@/app/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(videos);
  } catch {
    return NextResponse.json(
      {
        error: 'Failed to fetch videos',
      },
      {
        status: 500,
      },
    );
  } finally {
    await prisma.$disconnect();
  }
}

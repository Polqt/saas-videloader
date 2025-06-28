'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { filesize } from 'filesize';
import { Video } from '@/app/generated/prisma';
import { AlertCircle, Download, Play } from 'lucide-react';

dayjs.extend(relativeTime);

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto',
      format: 'jpg',
      assetType: 'video',
    });
  }, []);

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 1920,
      height: 1080,
    });
  }, []);

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      assetType: 'video',
      rawTransformations: ['so_0', 'du_20', 'fl_progressive'],
    });
  }, []);

  const formatFileSize = useCallback((size: number) => {
    return filesize(size);
  }, []);

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100,
  );

  useEffect(() => {
    setPreviewError(false);
  }, [isHovered]);

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  return (
    <div
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="aspect-video relative overflow-hidden rounded-t-lg">
        {isHovered ? (
          previewError ? (
            <div className="w-full h-full flex items-center justify-center bg-base-200">
              <div className="text-center space-y-2">
                <AlertCircle className="mx-auto w-6 h-6 text-error" />
                <p className="text-error font-medium">Preview not available</p>
              </div>
            </div>
          ) : (
            <video
              src={getPreviewVideoUrl(video.publicId)}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover transition-all duration-300"
              crossOrigin="anonymous"
              onError={handlePreviewError}
            />
          )
        ) : (
          <Image
            src={getThumbnailUrl(video.publicId)}
            alt={video.title}
            className="w-full h-full object-cover transition-all duration-300"
            width={400}
            height={225}
          />
        )}
        <div className="absolute bottom-3 right-3 bg-base-100/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm flex items-center gap-1 shadow-lg">
          <span className="font-medium">{formatDuration(video.duration)}</span>
        </div>
        {!isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-base-100/20 backdrop-blur-[1px] opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center">
              <Play className="text-white w-6 h-6" />
            </div>
          </div>
        )}
      </figure>

      <div className="card-body p-6">
        <div className="space-y-2 mb-4">
          <h2 className="card-title text-lg font-bold text-base-content line-clamp-2 leading-tight">
            {video.title}
          </h2>
          {video.description && (
            <p className="text-sm text-base-content/70 line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-base-content/70">
            Uploaded {dayjs(video.createdAt).fromNow()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-base-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wide">
                Original
              </span>
            </div>
            <div className="text-sm font-bold text-base-content">
              {formatFileSize(Number(video.originalSize))}
            </div>
          </div>

          <div className="bg-base-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wide">
                Compressed
              </span>
            </div>
            <div className="text-sm font-bold text-base-content">
              {formatFileSize(Number(video.compressedSize))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-base-200">
          <div className="flex items-center gap-2">
            <div className="badge badge-success badge-sm font-semibold">
              {compressionPercentage}% saved
            </div>
          </div>

          <button
            className="btn btn-primary btn-sm gap-2 hover:btn-primary-focus transition-all duration-200"
            onClick={() =>
              onDownload(getFullVideoUrl(video.publicId), video.title)
            }
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isHovered && !previewError && (
        <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="loading loading-spinner loading-xs text-primary-content"></span>
            <span className="text-xs text-primary-content font-medium">
              Loading preview...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;

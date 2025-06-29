'use client';

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Video } from '@/types';
import {
  AlertCircle,
  Clock,
  ImageIcon,
  ImageUpscale,
  TrendingUp,
  VideoIcon,
  Zap,
} from 'lucide-react';
import VideoCard from '@/components/VideoCard';

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get('api/videos');

      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.log(error);
      setError('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title}.mp4`);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 px-4 py-8 space-y-12 animate-pulse">
        <div className="text-center space-y-4 mb-12">
          <div className="h-10 w-64 bg-base-300 mx-auto rounded" />
          <div className="h-4 w-96 bg-base-300 mx-auto rounded" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card bg-base-100 shadow">
              <div className="card-body space-y-4">
                <div className="w-12 h-12 bg-base-300 rounded-lg" />
                <div className="h-4 w-3/4 bg-base-300 rounded" />
                <div className="h-3 w-full bg-base-300 rounded" />
                <div className="h-3 w-5/6 bg-base-300 rounded" />
                <div className="card-actions justify-end">
                  <div className="h-8 w-24 bg-base-300 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4 mb-12">
          <div className="flex justify-between items-center">
            <div className="h-6 w-48 bg-base-300 rounded" />
            <div className="h-8 w-20 bg-base-300 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card bg-base-100 shadow">
                <div className="aspect-video bg-base-300 rounded-t" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-2/3 bg-base-300 rounded" />
                  <div className="h-3 w-full bg-base-300 rounded" />
                  <div className="h-3 w-5/6 bg-base-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="stat space-y-2">
              <div className="w-10 h-10 bg-base-300 rounded-full" />
              <div className="h-3 w-1/2 bg-base-300 rounded" />
              <div className="h-6 w-1/3 bg-base-300 rounded" />
              <div className="h-2 w-2/3 bg-base-300 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
        <div className="card bg-base-100 shadow-xl max-w-md">
          <div className="card-body text-center">
            <div className="w-16 h-16 mx-auto bg-error/20 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-error" />
            </div>
            <h3 className="text-lg font-semibold text-error mb-2">
              Error Loading Content
            </h3>
            <p className="text-base-content/70 mb-4">{error}</p>
            <button onClick={fetchVideos} className="btn btn-primary btn-sm">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Creative Studio
            </h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Transform your media with powerful tools for social media
              optimization, video processing, and creative content generation.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="card-body">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <ImageUpscale className="w-6 h-6 text-primary" />
              </div>
              <h3 className="card-title text-lg">Social Media Resize</h3>
              <p className="text-base-content/70">
                Instantly resize images for Instagram, Twitter, Facebook, and
                more platforms with smart cropping.
              </p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary btn-sm">Try Now</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="card-body">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <VideoIcon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="card-title text-lg">Video Processing</h3>
              <p className="text-base-content/70">
                Convert, compress, and optimize videos for web, social media,
                and professional use.
              </p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-secondary btn-sm">Explore</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="card-body">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="card-title text-lg">AI Enhancement</h3>
              <p className="text-base-content/70">
                Enhance image quality, remove backgrounds, and apply smart
                filters with AI technology.
              </p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-accent btn-sm">Coming Soon</button>
              </div>
            </div>
          </div>
        </div>

        {videos.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-base-content">
                Recent Videos
              </h2>
              <button className="btn btn-outline btn-sm">View All</button>
            </div>

            {videos.length === 0 ? (
              <div className="text-center text-lg text-gray-500">
                No videos available
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map(video => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full bg-base-100">
          <div className="stat">
            <div className="stat-figure text-primary">
              <ImageIcon className="w-8 h-8" />
            </div>
            <div className="stat-title">Images Processed</div>
            <div className="stat-value text-primary">12.4K</div>
            <div className="stat-desc">This month</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <VideoIcon className="w-8 h-8" />
            </div>
            <div className="stat-title">Videos Converted</div>
            <div className="stat-value text-secondary">{videos.length}</div>
            <div className="stat-desc">Total processed</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-accent">
              <Clock className="w-8 h-8" />
            </div>
            <div className="stat-title">Average Speed</div>
            <div className="stat-value text-accent">&lt; 2s</div>
            <div className="stat-desc">Processing time</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-info">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="stat-title">Success Rate</div>
            <div className="stat-value text-info">99.8%</div>
            <div className="stat-desc">Uptime reliability</div>
          </div>
        </div>
      </div>
    </div>
  );
}

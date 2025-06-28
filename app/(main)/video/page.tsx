'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';

export default function Video() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const MAX_FILE = 70 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;
    if (file.size > MAX_FILE) {
      console.log('File size exceeds the maximum limit of 70MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('originalSize', file.size.toString());

    try {
      const response = await axios.post('/api/video-upload', formData);

      if (response.status === 200) {
        console.log('File uploaded successfully');
      } else {
        console.log('File upload failed');
      }
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title flex items-center gap-2">
                  Upload Video
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Video Title
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter video title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="input input-bordered input-primary w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Description
                      </span>
                      <span className="label-text-alt text-base-content/60">
                        Optional
                      </span>
                    </label>
                    <textarea
                      placeholder="Describe your video content..."
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="textarea textarea-bordered textarea-primary w-full h-24 resize-none"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Video File</span>
                      <span className="label-text-alt text-base-content/60">
                        Max 70MB
                      </span>
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={e => setFile(e.target.files?.[0] || null)}
                      className="file-input file-input-bordered file-input-primary w-full"
                      required
                    />
                    {file && (
                      <div className="mt-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-primary">
                              {file.name}
                            </p>
                            <p className="text-xs text-base-content/60">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                          <div className="badge badge-primary badge-sm">
                            Selected
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary btn-block"
                    disabled={isUploading || !file}
                  >
                    {isUploading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Uploading...
                      </>
                    ) : (
                      <>Upload Video</>
                    )}
                  </button>
                </form>

                <div className="alert alert-info mt-4">
                  <span className="text-sm">
                    Supported formats: MP4, MOV, AVI, WebM up to 70MB
                  </span>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-lg">Guidelines</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Keep videos under 70MB for best upload speed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>
                      Use descriptive titles to help others find your content
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Videos are processed automatically after upload</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card bg-base-100 shadow-xl h-full">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="card-title flex items-center gap-2">
                    Upload Status
                  </h2>

                  {isUploading && (
                    <div className="badge badge-warning gap-1">
                      <span className="loading loading-spinner loading-xs"></span>
                      Processing
                    </div>
                  )}
                </div>

                <div className="flex-1 flex items-center justify-center bg-base-200 rounded-lg p-8 min-h-[400px]">
                  {!file && !isUploading ? (
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-base-300 rounded-full flex items-center justify-center"></div>
                      <div>
                        <h3 className="text-lg font-semibold text-base-content/70">
                          Ready to Upload
                        </h3>
                        <p className="text-base-content/50">
                          Select a video file to get started
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        {['MP4', 'MOV', 'AVI', 'WebM'].map(format => (
                          <div
                            className="badge badge-outline badge-sm"
                            key={format}
                          >
                            {format}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : isUploading ? (
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="loading loading-ring loading-lg text-primary"></span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary">
                          Uploading Video
                        </h3>
                        <p className="text-base-content/70">
                          Please wait while we process your file...
                        </p>
                      </div>
                      <div className="w-full max-w-xs mx-auto">
                        <progress className="progress progress-primary w-full"></progress>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-success/20 rounded-full flex items-center justify-center"></div>
                      <div>
                        <h3 className="text-lg font-semibold text-success">
                          Video Ready
                        </h3>
                        <p className="text-base-content/70">
                          {file?.name} is ready for upload
                        </p>
                      </div>
                      {file && (
                        <div className="bg-success/10 p-4 rounded-lg border border-success/20 max-w-sm mx-auto">
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span className="text-base-content/60">
                                Size:
                              </span>
                              <span className="font-medium">
                                {formatFileSize(file.size)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-base-content/60">
                                Type:
                              </span>
                              <span className="font-medium">{file.type}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {file && !isUploading && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-medium text-sm">
                        Video ready for upload - Click &quot;Upload Video&quot;
                        to proceed
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full bg-base-100">
            <div className="stat">
              <div className="stat-figure text-primary"></div>
              <div className="stat-title">Max File Size</div>
              <div className="stat-value text-primary">70MB</div>
              <div className="stat-desc">Per video upload</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary"></div>
              <div className="stat-title">Processing Speed</div>
              <div className="stat-value text-secondary">Fast</div>
              <div className="stat-desc">Cloudinary powered</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-accent"></div>
              <div className="stat-title">Supported Formats</div>
              <div className="stat-value text-accent">4+</div>
              <div className="stat-desc">MP4, MOV, AVI, WebM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

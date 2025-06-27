'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CldImage } from 'next-cloudinary';

const socialFormats = {
  'Instagram Square (1:1)': { width: 1080, height: 1080, aspectRatio: '1:1' },
  'Instagram Portrait (4:5)': { width: 1080, height: 1350, aspectRatio: '4:5' },
  'Twitter Post (16:9)': { width: 1200, height: 675, aspectRatio: '16:9' },
  'Twitter Header (3:1)': { width: 1500, height: 500, aspectRatio: '3:1' },
  'Facebook Cover (205:78)': { width: 820, height: 312, aspectRatio: '205:78' },
};

type SocialFormat = keyof typeof socialFormats;

export default function Socials() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    'Instagram Square (1:1)',
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [selectedFormat, uploadedImage]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      setUploadedImage(data.publicId);
    } catch (error) {
      console.log('Failed to upload image', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedFormat
          .replace(/\s+/g, '_')
          .toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Social Share Studio
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title flex items-center gap-2">
                  Upload Image
                </h2>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Choose your image</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="file-input file-input-bordered file-input-primary w-full"
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="loading loading-spinner loading-sm text-primary"></span>
                      <span className="text-sm text-base-content/70">
                        Uploading...
                      </span>
                    </div>
                  )}
                </div>

                <div className="alert alert-info mt-4">
                  <span className="text-sm">
                    Upload JPG, PNG, or WebP images up to 10MB
                  </span>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title flex items-center gap-2">
                  Social Format
                </h2>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select platform format</span>
                  </label>
                  <select
                    className="select select-bordered select-primary w-full"
                    value={selectedFormat}
                    onChange={e =>
                      setSelectedFormat(e.target.value as SocialFormat)
                    }
                    disabled={!uploadedImage}
                  >
                    {Object.entries(socialFormats).map(
                      ([format, dimensions]) => (
                        <option key={format} value={format}>
                          {format} - {dimensions.width}x{dimensions.height}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title text-xs">Dimensions</div>
                    <div className="stat-value text-sm">
                      {socialFormats[selectedFormat].width}×
                      {socialFormats[selectedFormat].height}
                    </div>
                  </div>
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title text-xs">Ratio</div>
                    <div className="stat-value text-sm">
                      {socialFormats[selectedFormat].aspectRatio}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {uploadedImage && (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title flex items-center gap-2">
                    Download
                  </h2>

                  <button
                    onClick={handleDownload}
                    className="btn btn-primary btn-block"
                    disabled={isTransforming}
                  >
                    {isTransforming ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Processing...
                      </>
                    ) : (
                      <>Download Image</>
                    )}
                  </button>
                  <div className="divider">OR</div>

                  <button className="btn btn-outline btn-secondary btn-block">
                    Share Link
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="card bg-base-100 shadow-xl h-full">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="card-title flex items-center gap-2">
                    Preview
                  </h2>

                  {uploadedImage && (
                    <div className="badge badge-success gap-1">Ready</div>
                  )}
                </div>

                <div className="flex-1 flex items-center justify-center bg-base-200 rounded-lg p-8 min-h-[400px]">
                  {!uploadedImage ? (
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-base-300 rounded-full flex items-center justify-center"></div>
                      <div>
                        <h3 className="text-lg font-semibold text-base-content/70">
                          No Image Selected
                        </h3>
                        <p className="text-base-content/50">
                          Upload an image to see the preview
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        {Object.keys(socialFormats)
                          .slice(0, 3)
                          .map(format => (
                            <div
                              className="badge badge-outline badge-sm"
                              key={format}
                            >
                              {format.split(' ')[0]}
                            </div>
                          ))}
                        <div className="badge badge-outline badge-sm">
                          +2 more
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      {isTransforming && (
                        <div className="absolute inset-0 bg-base-200/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                          <div className="text-center space-y-2">
                            <span className="loading loading-ring loading-lg text-primary"></span>
                            <p className="text-sm font-medium">
                              Transforming image...
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="relative bg-white p-4 rounded-lg shadow-lg">
                        <CldImage
                          ref={imageRef}
                          width={socialFormats[selectedFormat].width}
                          height={socialFormats[selectedFormat].height}
                          src={uploadedImage}
                          sizes="100vw"
                          alt="transformed image"
                          className="rounded max-w-full h-auto shadow-sm"
                          crop="fill"
                          aspectRatio={
                            socialFormats[selectedFormat].aspectRatio
                          }
                          gravity="auto"
                          onLoad={() => setIsTransforming(false)}
                        />

                        <div className="absolute -bottom-2 -right-2 bg-primary text-primary-content px-2 py-1 rounded text-xs font-medium">
                          {selectedFormat.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {uploadedImage && (
                  <div className="mt-4 p-4 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center gap-2 text-success">
                      <span className="font-medium text-sm">
                        Image ready for {selectedFormat}
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
              <div className="stat-title">Supported Formats</div>
              <div className="stat-value text-primary">
                {Object.keys(socialFormats).length}
              </div>
              <div className="stat-desc">Instagram, Twitter, Facebook</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary"></div>
              <div className="stat-title">Processing Speed</div>
              <div className="stat-value text-secondary">&lt; 2s</div>
              <div className="stat-desc">Average transformation time</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-accent"></div>
              <div className="stat-title">Quality</div>
              <div className="stat-value text-accent">HD</div>
              <div className="stat-desc">High-definition output</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

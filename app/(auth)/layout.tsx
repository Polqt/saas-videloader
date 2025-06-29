'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  Share2,
  CloudUpload,
  Instagram,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showBackButton?: boolean;
}

const FEATURES = [
  {
    icon: CloudUpload,
    title: 'Cloud Uploads',
    description:
      'Upload images or videos directly to our Cloudinary-powered platform.',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description:
      'Share your uploads via public links or send them directly to friends.',
  },
  {
    icon: Instagram,
    title: 'Social-Ready',
    description:
      'Auto-optimize for Instagram, Facebook Covers, Twitter Headers, and more.',
  },
];

export default function AuthLayout({
  children,
  title,
  subtitle,
  showBackButton = true,
}: AuthLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-base-100 via-base-200/30 to-base-100 overflow-hidden">
      <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-base-300/20 bg-base-100/80 backdrop-blur-sm z-50">
        {showBackButton ? (
          <Link href="/" className="btn btn-ghost btn-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        ) : (
          <div />
        )}
        <Link href="/" className="btn btn-ghost text-lg font-bold">
          <Sparkles className="w-5 h-5 text-primary mr-2" />
          VP
        </Link>
        <div className="badge badge-success badge-outline hidden sm:flex items-center">
          <ShieldCheck className="w-3 h-3 mr-1" />
          Secured
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:flex w-3/5 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-12">
          <div className="m-auto max-w-xl w-full space-y-10">
            <div>
              <div className="badge badge-primary mb-3">
                <Sparkles className="w-3 h-3 mr-1" />
                For Creators & Sharers
              </div>
              <h1 className="text-4xl font-extrabold leading-tight mb-3">
                {title}
              </h1>
              <p className="text-base text-base-content/70">{subtitle}</p>
            </div>

            <div className="space-y-4">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-base-100/70 rounded-lg border border-base-300/20 shadow-sm"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{f.title}</h3>
                    <p className="text-sm text-base-content/60">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 text-center">
              <div>
                <div className="text-xl font-bold text-primary">10K+</div>
                <div className="text-xs text-base-content/60">
                  Media Uploaded
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-secondary">Instant</div>
                <div className="text-xs text-base-content/60">Share Links</div>
              </div>
              <div>
                <div className="text-xl font-bold text-accent">
                  Multi-Platform
                </div>
                <div className="text-xs text-base-content/60">
                  Social Formats
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="w-full lg:w-2/5 flex items-center justify-center px-6 sm:px-10 py-10 bg-base-100 overflow-y-auto">
          <div className="w-full max-w-md space-y-6">
            <div className="lg:hidden text-center space-y-2">
              <div className="badge badge-primary">Welcome</div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-sm text-base-content/70">{subtitle}</p>
            </div>
            <div className="card bg-base-100 shadow-xl border border-base-300/20">
              <div className="card-body p-6 sm:p-8">{children}</div>
            </div>
            <div className="lg:hidden text-center text-xs text-base-content/60 flex justify-center gap-6 pt-4">
              <div className="flex items-center">
                <CloudUpload className="w-3 h-3 mr-1" />
                Cloud Uploads
              </div>
              <div className="flex items-center">
                <Share2 className="w-3 h-3 mr-1" />
                Quick Sharing
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Instant Access
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

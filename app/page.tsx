import React from 'react';
import Link from 'next/link';
import { Play, ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const stats = [
    { number: '50M+', label: 'Files Processed' },
    { number: '100K+', label: 'Happy Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '< 10s', label: 'Avg Process Time' },
  ];

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <div className="navbar bg-base-100/95 backdrop-blur-sm sticky top-0 z-50 border-b border-base-300/20 h-16 min-h-16">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-lg sm:text-xl font-bold">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-1 sm:mr-2" />
            <span className="hidden xs:inline">VideoPloader</span>
            <span className="xs:hidden">VP</span>
          </Link>
        </div>

        <div className="navbar-end space-x-1 sm:space-x-2">
          <Link
            href="/sign-in"
            className="btn btn-ghost btn-sm text-xs sm:text-sm"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="btn btn-primary btn-sm text-xs sm:text-sm"
          >
            Get Started
          </Link>
        </div>
      </div>

      <section className="flex-1 bg-gradient-to-br from-base-100 via-base-200/30 to-base-100 relative overflow-hidden flex items-center justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center badge badge-primary badge-outline mb-4 sm:mb-6 lg:mb-8 p-2 sm:p-3 text-xs sm:text-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              New: AI-powered video enhancement
            </div>

            <h1 className="font-black mb-4 sm:mb-6 leading-tight">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Transform Your{' '}
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Media
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-1 sm:mt-2">
                In Seconds
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-base-content/70 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Professional-grade image resizing, video processing, and AI
              enhancement. Built for creators who demand quality and speed.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 lg:mb-12 px-4">
              <Link
                href="/sign-up"
                className="btn btn-primary btn-md sm:btn-lg group shadow-lg"
              >
                <span className="text-sm sm:text-base">Start Free Trial</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn btn-outline btn-md sm:btn-lg group">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base">Watch Demo</span>
              </button>
            </div>

            <div className="w-full max-w-4xl mx-auto">
              <div className="stats stats-vertical sm:stats-horizontal shadow-lg bg-base-100/80 backdrop-blur w-full">
                {stats.map((stat, index) => (
                  <div key={index} className="stat py-4 sm:py-6">
                    <div className="stat-value text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-bold">
                      {stat.number}
                    </div>
                    <div className="stat-desc text-xs sm:text-sm md:text-base text-base-content/70 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

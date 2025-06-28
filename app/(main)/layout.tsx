'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';
import {
  LogOut,
  LayoutDashboard,
  Share2,
  Upload,
  X,
  ChevronRight,
  Menu,
} from 'lucide-react';
import Image from 'next/image';

const sidebarItems = [
  {
    href: '/home',
    icon: LayoutDashboard,
    label: 'Dashboard',
    description: 'Overview & analytics',
  },
  {
    href: '/socials',
    icon: Share2,
    label: 'Social Media',
    description: 'Image formatting',
  },
  {
    href: '/video',
    icon: Upload,
    label: 'Video Tools',
    description: 'Upload & process',
  },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleSignOut = async () => {
    await signOut();
  };

  const currentPage = sidebarItems.find(item => item.href === pathname);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar bg-base-100 shadow-sm lg:hidden sticky top-0 z-50 border-b border-base-200">
        <div className="navbar-start">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="navbar-center">
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {currentPage?.label || 'CloudinaryApp'}
          </h1>
        </div>

        <div className="navbar-end">
          {user && (
            <div className="avatar">
              <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content text-xs font-bold">
                    {(user.username || user.emailAddresses[0].emailAddress)
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="drawer lg:drawer-open">
        <input
          id="drawer-toggle"
          type="checkbox"
          className="drawer-toggle"
          checked={sidebarOpen}
          onChange={e => setSidebarOpen(e.target.checked)}
        />

        <div className="drawer-content">
          <main className="min-h-screen lg:min-h-[calc(100vh-5rem)]">
            {children}
          </main>
        </div>

        <div className="drawer-side z-50">
          <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
          <aside className="min-h-full w-80 bg-base-100 border-r border-base-200 flex flex-col">
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-base-200">
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                VideoPloader
              </h1>
              <button
                className="btn btn-ghost btn-sm btn-circle"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="hidden lg:block p-6 border-b border-base-200">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    VideoPloader
                  </h1>
                  <p className="text-xs text-base-content/60 font-medium">
                    Media Processing Suite
                  </p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4">
              <div className="space-y-6">
                {sidebarItems.map(item => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg shadow-primary/25'
                            : 'hover:bg-base-200 text-base-content'
                        }
                      `}
                    >
                      <div
                        className={`
                        p-2.5 rounded-xl transition-colors
                        ${
                          isActive
                            ? 'bg-white/20'
                            : 'bg-base-200 group-hover:bg-base-300'
                        }
                      `}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            isActive
                              ? 'text-primary-content'
                              : 'text-base-content/70'
                          }`}
                        />
                      </div>

                      <div className="flex-1">
                        <div
                          className={`font-semibold text-sm ${
                            isActive
                              ? 'text-primary-content'
                              : 'text-base-content'
                          }`}
                        >
                          {item.label}
                        </div>
                        <div
                          className={`text-xs ${
                            isActive
                              ? 'text-primary-content/80'
                              : 'text-base-content/60'
                          }`}
                        >
                          {item.description}
                        </div>
                      </div>

                      <ChevronRight
                        className={`
                        w-4 h-4 transition-all duration-300 
                        ${
                          isActive
                            ? 'text-primary-content opacity-100'
                            : 'text-base-content/40 opacity-0 group-hover:opacity-100'
                        }
                      `}
                      />

                      {isActive && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 -z-10" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {user && (
              <div className="p-4 border-t border-base-200">
                <div className="card bg-gradient-to-br from-base-200 to-base-300 shadow-sm border border-base-300">
                  <div className="card-body p-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          {user.imageUrl ? (
                            <Image
                              src={user.imageUrl}
                              alt="Profile"
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-bold">
                              {(
                                user.username ||
                                user.emailAddresses[0].emailAddress
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base-content truncate text-sm">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="btn btn-error btn-outline btn-sm w-full mt-3 hover:scale-105 transition-transform"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

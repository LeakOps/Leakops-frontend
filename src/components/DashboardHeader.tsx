'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/lib/auth';
import { Menu, ChevronDown, Settings, LogOut, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileSidebar?: () => void;
  children?: React.ReactNode;
}

export function DashboardHeader({
  title,
  subtitle,
  onOpenMobileSidebar,
  children,
}: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const displayName = user?.name || 'Account';
  const displayEmail = user?.email || '';
  const avatarUrl = user?.profile_picture_url;
  const initial = displayName.charAt(0).toUpperCase() || 'U';

  return (
    <header className="h-[76px] px-6 sm:px-8 bg-white dark:bg-[#0B0F19] border-b border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-3">
        {onOpenMobileSidebar && (
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="font-display font-bold text-lg sm:text-xl text-[#111827] dark:text-white flex items-center gap-1.5">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#6B7280] dark:text-gray-400 hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {children}
        <ThemeToggle />

        {/* User profile dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]"
            aria-expanded={userMenuOpen}
          >
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover shadow-sm border border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-display font-semibold text-xs shadow-sm">
                {initial}
              </div>
            )}
            <span className="hidden xl:inline-block text-xs font-semibold text-[#111827] dark:text-gray-200">
              {displayName}
            </span>
            <ChevronDown className="w-3 h-3 text-[#6B7280] dark:text-gray-400 hidden xl:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-11 w-52 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                <p className="text-[11px] text-gray-500">Signed in as</p>
                <p className="text-xs font-semibold truncate text-gray-900 dark:text-gray-100">
                  {displayName}
                </p>
                {displayEmail && (
                  <p className="text-[11px] truncate text-gray-500 dark:text-gray-400">
                    {displayEmail}
                  </p>
                )}
              </div>
              <Link
                href="/dashboard/recoveries"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Recoveries</span>
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </Link>
              <div className="border-t border-gray-100 dark:border-gray-800 mt-1 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

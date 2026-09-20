"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/Button";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

interface NavbarProps {
  variant?: "landing" | "app";
  userName?: string;
}

export function Navbar({
  variant = "landing",
  userName,
}: NavbarProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const displayName = user?.name || userName || "Account";
  const displayEmail = user?.email || "";
  const avatarUrl = user?.profile_picture_url;
  const initial = displayName.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 w-full h-[76px] px-6 sm:px-10 bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#E5E7EB] dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Logo size="md" />

          {/* Landing Variant Center-left Links: Features, Pricing, Resources, About */}
          {variant === "landing" && (
            <nav className="hidden md:flex items-center gap-8 ml-4">
              <Link
                href="/#features"
                className="text-[15px] font-medium text-[#6B7280] hover:text-[#111827] dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                href="/#pricing"
                className="text-[15px] font-medium text-[#6B7280] hover:text-[#111827] dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/resources"
                className={cn(
                  "text-[15px] font-medium hover:text-[#111827] dark:hover:text-white transition-colors",
                  pathname.startsWith("/resources")
                    ? "text-[#6366F1] font-semibold"
                    : "text-[#6B7280] dark:text-gray-400"
                )}
              >
                Resources
              </Link>
              <Link
                href="/about"
                className={cn(
                  "text-[15px] font-medium hover:text-[#111827] dark:hover:text-white transition-colors",
                  pathname === "/about"
                    ? "text-[#6366F1] font-semibold"
                    : "text-[#6B7280] dark:text-gray-400"
                )}
              >
                About
              </Link>
            </nav>
          )}
        </div>

        {/* Logged-in App Center Links (for Pricing & Authenticated header) */}
        {variant === "app" && (
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#6B7280] dark:text-gray-400">
            <Link
              href="/dashboard"
              className={cn(
                "hover:text-[#111827] dark:hover:text-white transition-colors",
                pathname === "/dashboard" && "text-[#6366F1] font-semibold"
              )}
            >
              Dashboard
            </Link>
            <span className="text-gray-300 dark:text-gray-700 select-none">·</span>
            <Link
              href="/dashboard/customers"
              className={cn(
                "hover:text-[#111827] dark:hover:text-white transition-colors",
                pathname === "/dashboard/customers" && "text-[#6366F1] font-semibold"
              )}
            >
              Customers
            </Link>
            <span className="text-gray-300 dark:text-gray-700 select-none">·</span>
            <Link
              href="/dashboard/recoveries"
              className={cn(
                "hover:text-[#111827] dark:hover:text-white transition-colors",
                pathname === "/dashboard/recoveries" && "text-[#6366F1] font-semibold"
              )}
            >
              Recoveries
            </Link>
            <span className="text-gray-300 dark:text-gray-700 select-none">·</span>
            <Link
              href="/dashboard/coupons"
              className={cn(
                "hover:text-[#111827] dark:hover:text-white transition-colors",
                pathname === "/dashboard/coupons" && "text-[#6366F1] font-semibold"
              )}
            >
              Coupons
            </Link>
            <span className="text-gray-300 dark:text-gray-700 select-none">·</span>
            <Link
              href="/dashboard/analytics"
              className={cn(
                "hover:text-[#111827] dark:hover:text-white transition-colors",
                pathname === "/dashboard/analytics" && "text-[#6366F1] font-semibold"
              )}
            >
              Analytics
            </Link>
          </nav>
        )}

        {/* Right Group: ThemeToggle + Action buttons / Avatar */}
        {variant === "landing" && !isAuthenticated ? (
          <div className="hidden sm:flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" size="md">
                  Sign In
                </Button>
              </Link>
              <Link href="/login?tab=signup">
                <Button variant="primary" size="md">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]"
                aria-expanded={userMenuOpen}
              >
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-9 h-9 rounded-full object-cover shadow-sm border border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-display font-semibold text-sm shadow-sm">
                    {initial}
                  </div>
                )}
                <span className="hidden sm:inline-block text-sm font-medium text-[#111827] dark:text-gray-200">
                  {displayName}
                </span>
                <ChevronDown className="w-4 h-4 text-[#6B7280] dark:text-gray-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-semibold truncate text-gray-900 dark:text-gray-100">
                      {displayName}
                    </p>
                    {displayEmail && (
                      <p className="text-xs truncate text-gray-500 dark:text-gray-400">
                        {displayEmail}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/recoveries"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Recoveries
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Pricing
                  </Link>
                  <div className="border-t border-gray-100 dark:border-gray-800 mt-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-[76px] left-0 right-0 bg-white dark:bg-[#0B0F19] border-b border-[#E5E7EB] dark:border-gray-800 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-[#111827] dark:text-white"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-[#111827] dark:text-white"
          >
            Pricing
          </Link>
          <Link
            href="/resources"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-[#111827] dark:text-white"
          >
            Resources
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-[#111827] dark:text-white"
          >
            About
          </Link>
          {isAuthenticated ? (
            <div className="pt-2 flex flex-col gap-2.5">
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Dashboard
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2 px-4 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 font-medium text-sm text-center"
              >
                Sign out ({displayName})
              </button>
            </div>
          ) : (
            <div className="pt-2 flex flex-col gap-2.5">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/login?tab=signup" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

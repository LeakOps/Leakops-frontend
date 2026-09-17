"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import {
  LayoutGrid,
  Users,
  RefreshCw,
  Clock,
  Tag,
  BarChart2,
  Link2,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  activeItem?: string;
}

export function Sidebar({ className, activeItem }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { label: "Customers", href: "/dashboard/customers", icon: Users },
    { label: "Recoveries", href: "/dashboard/recoveries", icon: RefreshCw },
    { label: "Dunning", href: "/dashboard/dunning", icon: Clock },
    { label: "Coupons", href: "/dashboard/coupons", icon: Tag },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
    { label: "Webhook Setup", href: "/dashboard/webhook-setup", icon: Link2 },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "w-[250px] shrink-0 min-h-screen bg-white dark:bg-[#0B0F19] border-r border-[#E5E7EB] dark:border-gray-800 flex flex-col justify-between transition-colors",
        className
      )}
    >
      <div>
        {/* Top: Logo with ~24px padding */}
        <div className="p-6 border-b border-transparent">
          <Logo size="md" />
        </div>

        {/* Navigation list */}
        <nav className="px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              (activeItem && item.label === activeItem) ||
              (!activeItem && pathname === item.href) ||
              (!activeItem && item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group relative",
                  isActive
                    ? "bg-[#EEF2FF] dark:bg-[#6366F1]/15 text-[#6366F1] dark:text-[#818CF8] font-semibold"
                    : "text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/60"
                )}
              >
                {/* Left accent bar for active item */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#6366F1] rounded-r-full" />
                )}
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive
                      ? "text-[#6366F1] dark:text-[#818CF8]"
                      : "text-[#6B7280] dark:text-gray-400 group-hover:text-[#111827] dark:group-hover:text-white"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom indigo-50 tinted card */}
      <div className="p-4 m-3 rounded-xl bg-[#EEF2FF] dark:bg-[#6366F1]/10 border border-[#6366F1]/20">
        <div className="flex items-center gap-2 text-[#6366F1] dark:text-[#818CF8] mb-1.5">
          <div className="w-6 h-6 rounded-lg bg-[#6366F1] text-white flex items-center justify-center shrink-0">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-tight text-[#111827] dark:text-white">
            Recover more revenue
          </span>
        </div>
        <p className="text-[11px] leading-relaxed text-[#6B7280] dark:text-gray-400 mb-3">
          We&apos;re monitoring your payments and handling the rest.
        </p>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-700 shadow-2xs text-[11px] font-medium text-[#111827] dark:text-gray-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span>Connected to Stripe &amp; Dodo</span>
        </div>
      </div>
    </aside>
  );
}

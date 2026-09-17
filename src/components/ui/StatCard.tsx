import React from "react";
import { IconChip } from "./IconChip";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  trendDirection?: "neutral" | "up" | "down";
  caption: string;
  className?: string;
}

export function StatCard({
  icon,
  label,
  value,
  trend,
  trendDirection = "neutral",
  caption,
  className,
}: StatCardProps) {
  const trendBadge = (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        trendDirection === "neutral" &&
          "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700",
        trendDirection === "up" &&
          "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
        trendDirection === "down" &&
          "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
      )}
    >
      {trend}
    </span>
  );

  return (
    <div
      className={cn(
        "bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl p-5 shadow-[0_4px_24px_rgba(17,24,39,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] flex flex-col justify-between transition-all",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <IconChip icon={icon} size="sm" />
        {/* Tiny flat sparkline chart */}
        <div className="w-16 h-7 flex items-center justify-end" aria-hidden="true">
          <svg viewBox="0 0 64 20" className="w-full h-full stroke-gray-300 dark:stroke-gray-700">
            <line
              x1="2"
              y1="10"
              x2="62"
              y2="10"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="2 3"
            />
          </svg>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-[#6B7280] dark:text-gray-400 tracking-normal">
          {label}
        </p>
        <p className="text-2xl sm:text-3xl font-bold font-display text-[#111827] dark:text-white mt-1">
          {value}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 text-xs">
        {trendBadge}
        <span className="text-[#6B7280] dark:text-gray-400 truncate">{caption}</span>
      </div>
    </div>
  );
}

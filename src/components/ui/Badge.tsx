import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "indigo" | "success" | "warning" | "danger" | "neutral" | "cyan" | "purple";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "indigo",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    indigo:
      "bg-[#EEF2FF] dark:bg-[#6366F1]/15 text-[#6366F1] dark:text-[#818CF8] border border-[#6366F1]/20",
    success:
      "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
    warning:
      "bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20",
    danger:
      "bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/20",
    neutral:
      "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
    cyan:
      "bg-cyan-50 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20",
    purple:
      "bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400 border border-purple-500/20",
  }[variant];

  const dotStyles = {
    indigo: "bg-[#6366F1]",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    neutral: "bg-gray-500",
    cyan: "bg-cyan-500",
    purple: "bg-purple-500",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors",
        variantStyles,
        className
      )}
      {...props}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotStyles)} />}
      {children}
    </span>
  );
}

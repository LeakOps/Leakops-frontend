import React from "react";
import { cn } from "@/lib/utils";

export interface IconChipProps {
  icon: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function IconChip({ icon, size = "md", className }: IconChipProps) {
  const sizeStyles = {
    sm: "w-8 h-8 rounded-lg text-sm",
    md: "w-10 h-10 rounded-xl text-base", // ≈40x40px
    lg: "w-12 h-12 rounded-xl text-lg",
  }[size];

  return (
    <div
      className={cn(
        "shrink-0 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#6366F1]/15 text-[#6366F1] dark:text-[#818CF8] transition-colors",
        sizeStyles,
        className
      )}
    >
      {icon}
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg" | "none";
}

export function Card({
  className,
  padding = "md",
  children,
  ...props
}: CardProps) {
  const paddingStyles = {
    none: "p-0",
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-7",
    lg: "p-8 sm:p-10",
  }[padding];

  return (
    <div
      className={cn(
        "bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-2xl shadow-[0_4px_24px_rgba(17,24,39,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-colors",
        paddingStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

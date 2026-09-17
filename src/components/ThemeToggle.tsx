"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-8 w-16 rounded-full bg-[#EEF2FF] dark:bg-gray-800 p-1 flex items-center justify-between border border-[#E5E7EB] dark:border-gray-700",
          className
        )}
      >
        <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-900" />
      </div>
    );
  }

  const current = theme === "system" ? resolvedTheme : theme;
  const isDark = current === "dark";

  return (
    <div
      role="radiogroup"
      aria-label="Theme switcher"
      className={cn(
        "relative flex items-center p-0.5 rounded-full border border-[#E5E7EB] dark:border-gray-800 bg-[#F3F4F6] dark:bg-gray-900 transition-colors",
        className
      )}
    >
      <button
        type="button"
        role="radio"
        aria-checked={!isDark}
        onClick={() => setTheme("light")}
        className={cn(
          "relative flex items-center justify-center w-7 h-7 rounded-full text-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]",
          !isDark
            ? "bg-white text-[#111827] shadow-sm font-medium"
            : "text-[#6B7280] hover:text-[#111827] dark:hover:text-gray-200"
        )}
        title="Light theme"
      >
        <Sun className="w-3.5 h-3.5" />
        <span className="sr-only">Light</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={isDark}
        onClick={() => setTheme("dark")}
        className={cn(
          "relative flex items-center justify-center w-7 h-7 rounded-full text-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]",
          isDark
            ? "bg-[#1F2937] text-white shadow-sm font-medium"
            : "text-[#6B7280] hover:text-[#111827] dark:hover:text-gray-200"
        )}
        title="Dark theme"
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="sr-only">Dark</span>
      </button>
    </div>
  );
}

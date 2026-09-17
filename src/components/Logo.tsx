import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  whiteText?: boolean;
  href?: string;
  className?: string;
}

export function LogoHexagon({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const pixelSizes = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 200,
  }[size];

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-9 h-9 sm:w-10 sm:h-10",
    lg: "w-12 h-12",
    xl: "w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52",
  }[size];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.18)] select-none",
        sizeClasses,
        className
      )}
    >
      <Image
        src="/logo.png"
        alt="LeakOps Logo"
        width={pixelSizes}
        height={pixelSizes}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
}

export function Logo({
  size = "md",
  showText = true,
  whiteText = false,
  href = "/",
  className,
}: LogoProps) {
  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl",
  }[size];

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <LogoHexagon size={size} />
      {showText && (
        <span
          className={cn(
            "font-display font-bold tracking-tight transition-colors",
            whiteText
              ? "text-white"
              : "text-[#111827] dark:text-[#F9FAFB]",
            textSizes
          )}
        >
          LeakOps
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] rounded-lg transition-transform active:scale-[0.98]"
      >
        {content}
      </Link>
    );
  }

  return content;
}

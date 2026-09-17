import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      withArrow = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-2 rounded-md gap-1.5",
      md: "text-sm px-6 py-3 rounded-lg gap-2", // 12px 24px per spec
      lg: "text-base px-7 py-3.5 rounded-lg gap-2.5",
    }[size];

    const variantStyles = {
      primary:
        "bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#1F2937] dark:hover:bg-gray-100 shadow-sm",
      outline:
        "bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 text-[#111827] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm",
      ghost:
        "bg-transparent text-[#6B7280] hover:text-[#111827] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
      danger:
        "bg-[#EF4444] text-white hover:bg-red-600 shadow-sm",
    }[variant];

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles, variantStyles, className)}
        {...props}
      >
        {children}
        {withArrow && <ArrowRight className="w-4 h-4 ml-0.5 shrink-0" />}
      </button>
    );
  }
);

Button.displayName = "Button";

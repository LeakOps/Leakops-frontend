"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo, LogoHexagon } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { IconChip } from "@/components/ui/IconChip";
import {
  CreditCard,
  RefreshCw,
  Mail,
  Tag,
  Shield,
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "signup" ? "signup" : "signin";

  const [activeTab, setActiveTab] = useState<"signin" | "signup">(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to onboarding connect payment
    router.push("/onboarding/connect-payment");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] transition-colors">
      {/* Mobile Top Header (compact brand logo for mobile) */}
      <div className="lg:hidden p-5 flex items-center justify-between border-b border-[#E5E7EB] dark:border-gray-800 bg-[#F5F6FB] dark:bg-[#111827]">
        <Logo size="md" />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/"
            className="text-xs font-medium text-[#6B7280] hover:text-[#111827] dark:hover:text-white"
          >
            ← Home
          </Link>
        </div>
      </div>

      {/* Left Panel (~45% split) */}
      <div className="hidden lg:flex lg:w-[45%] bg-soft-gradient p-12 xl:p-16 flex-col justify-between border-r border-[#E5E7EB] dark:border-gray-800/80 relative overflow-hidden">
        {/* Decorative ambient shape */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#6366F1]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* 1. Logo top-left */}
          <Logo size="md" />

          {/* 2. H1: two lines, bold Sora */}
          <h1 className="mt-10 font-display font-bold text-3xl xl:text-4xl leading-tight">
            <span className="text-[#111827] dark:text-white block">
              Recover the payments
            </span>
            <span className="text-[#6B7280] dark:text-gray-400 block font-semibold">
              that slip through.
            </span>
          </h1>

          {/* 3. Paragraph */}
          <p className="mt-4 text-[#6B7280] dark:text-gray-300 text-sm xl:text-[15px] leading-relaxed max-w-[420px]">
            LeakOps finds and recovers lost revenue from failed payments, dunning
            issues, plan downgrades, coupon abuse and more — so you can focus on
            building, not chasing money.
          </p>

          {/* 4. Feature list, vertical stack, gap ~20px */}
          <div className="mt-8 space-y-5">
            {/* Feature 1 */}
            <div className="flex items-start gap-3.5">
              <IconChip
                icon={<CreditCard className="w-4 h-4" />}
                size="md"
              />
              <div>
                <h4 className="font-semibold text-[15px] text-[#111827] dark:text-white">
                  Failed Payments
                </h4>
                <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Catch and recover involuntary churn.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3.5">
              <IconChip
                icon={<RefreshCw className="w-4 h-4" />}
                size="md"
              />
              <div>
                <h4 className="font-semibold text-[15px] text-[#111827] dark:text-white">
                  Smart Retries
                </h4>
                <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Intelligent retry logic with optimal timing.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3.5">
              <IconChip
                icon={<Mail className="w-4 h-4" />}
                size="md"
              />
              <div>
                <h4 className="font-semibold text-[15px] text-[#111827] dark:text-white">
                  Dunning Emails
                </h4>
                <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Automated, multi-step recovery sequences.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-3.5">
              <IconChip
                icon={<Tag className="w-4 h-4" />}
                size="md"
              />
              <div>
                <h4 className="font-semibold text-[15px] text-[#111827] dark:text-white">
                  Coupon Abuse Detection
                </h4>
                <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Stop misuse and recover lost revenue.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex items-start gap-3.5">
              <IconChip
                icon={<Shield className="w-4 h-4" />}
                size="md"
              />
              <div>
                <h4 className="font-semibold text-[15px] text-[#111827] dark:text-white">
                  And more…
                </h4>
                <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Downgrades, proration errors, trial leaks &amp; more.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Near the bottom: floating white mock-card & caption */}
        <div className="relative z-10 mt-10">
          <div className="relative max-w-[280px] bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl p-4 shadow-[0_4px_24px_rgba(17,24,39,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300">
            {/* Small black hexagon logo icon overlapping top-right corner */}
            <div className="absolute -top-3.5 -right-3.5">
              <LogoHexagon size="sm" />
            </div>

            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-[#6B7280] dark:text-gray-400">
                Recovered Revenue
              </span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <TrendingUp className="w-2.5 h-2.5" />
                ↑12%
              </span>
            </div>

            <p className="font-display font-bold text-2xl text-[#111827] dark:text-white">
              $2,480
            </p>

            {/* Mini line-chart mockup */}
            <div className="mt-2.5 h-6 w-full" aria-hidden="true">
              <svg viewBox="0 0 100 24" className="w-full h-full stroke-[#10B981] fill-none">
                <path
                  d="M0 20 Q 25 18, 45 10 T 80 8 T 100 4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* 6. Caption below */}
          <p className="mt-4 text-xs italic text-[#6B7280] dark:text-gray-400 tracking-wide">
            Less leakage. More growth.
          </p>
        </div>
      </div>

      {/* Right Panel (~55% split) */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-white dark:bg-[#0B0F19] relative">
        <div className="absolute top-6 right-6 hidden lg:block">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-[440px] bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-2xl shadow-[0_4px_24px_rgba(17,24,39,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] p-8 sm:p-10 transition-all">
          {/* 1. Logo centered at top */}
          <div className="flex justify-center mb-3">
            <Logo size="lg" />
          </div>

          {/* 2. Centered subtext */}
          <p className="text-center text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 mb-6 max-w-xs mx-auto">
            Welcome back! Please sign in to your account or create a new one.
          </p>

          {/* 3. Segmented tab control */}
          <div className="flex p-1 rounded-lg bg-[#F3F4F6] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("signin")}
              className={cn(
                "flex-1 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all",
                activeTab === "signin"
                  ? "bg-[#111827] text-white shadow-sm"
                  : "text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white"
              )}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("signup")}
              className={cn(
                "flex-1 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all",
                activeTab === "signup"
                  ? "bg-[#111827] text-white shadow-sm"
                  : "text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white"
              )}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 4. Field group: Email address */}
            <div>
              <label className="block text-xs font-medium text-[#111827] dark:text-gray-200 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280] dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 rounded-lg text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* 5. Field group: Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-[#111827] dark:text-gray-200">
                  Password
                </label>
                {/* 6. Right-aligned small link */}
                {activeTab === "signin" && (
                  <button
                    type="button"
                    onClick={() => alert("Password reset link will be sent to your email.")}
                    className="text-xs text-[#6366F1] hover:underline font-medium"
                  >
                    Forgot your password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280] dark:text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 rounded-lg text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* 7. Full-width primary black button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                withArrow
                className="w-full py-3"
              >
                {activeTab === "signin" ? "Sign In" : "Sign Up"}
              </Button>
            </div>
          </form>

          {/* 8. Divider with centered small text */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB] dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white dark:bg-[#111827] px-3 text-[#6B7280] dark:text-gray-400">
                or continue with
              </span>
            </div>
          </div>

          {/* 9. Two full-width outline buttons stacked */}
          <div className="space-y-2.5">
            {/* Continue with Google */}
            <button
              type="button"
              onClick={() => router.push("/onboarding/connect-payment")}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg border border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-[#111827] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-2xs cursor-pointer"
            >
              {/* Google multicolor G icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Continue with GitHub */}
            <button
              type="button"
              onClick={() => router.push("/onboarding/connect-payment")}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg border border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-[#111827] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-2xs cursor-pointer"
            >
              {/* GitHub mark icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* 10. Centered footer text */}
          <p className="mt-8 text-center text-xs text-[#6B7280] dark:text-gray-400">
            {activeTab === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className="font-semibold text-[#111827] dark:text-white hover:text-[#6366F1] underline underline-offset-2"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("signin")}
                  className="font-semibold text-[#111827] dark:text-white hover:text-[#6366F1] underline underline-offset-2"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0F19]">
          <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}

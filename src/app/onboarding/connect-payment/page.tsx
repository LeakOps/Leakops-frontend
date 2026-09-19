"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import {
  ArrowLeft,
  Zap,
  Clock,
  Shield,
  Link2,
  Check,
  CheckCircle2,
  ChevronDown,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;
type Provider = "stripe" | "dodo";

export default function ConnectPaymentPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  // Automated progress screen state for Step 2
  const [progressItems, setProgressItems] = useState([
    { id: 1, label: "Creating your account…", done: false },
    {
      id: 2,
      label: "Registering secure webhook with Stripe/Dodo…",
      done: false,
    },
    { id: 3, label: "Encrypting & storing credentials…", done: false },
  ]);

  const handleOpenConnect = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
    setApiKey("");
  };

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsModalOpen(false);
    setProgressItems([
      { id: 1, label: "Creating your account…", done: false },
      {
        id: 2,
        label: `Registering secure webhook with ${
          selectedProvider === "dodo" ? "Dodo" : "Stripe"
        }…`,
        done: false,
      },
      { id: 3, label: "Encrypting & storing credentials…", done: false },
    ]);
    setCurrentStep(2);
  };

  // Step 2 Automated Sequence
  useEffect(() => {
    if (currentStep === 2) {
      const t1 = setTimeout(() => {
        setProgressItems((prev) =>
          prev.map((item) => (item.id === 1 ? { ...item, done: true } : item)),
        );
      }, 700);

      const t2 = setTimeout(() => {
        setProgressItems((prev) =>
          prev.map((item) => (item.id === 2 ? { ...item, done: true } : item)),
        );
      }, 1500);

      const t3 = setTimeout(() => {
        setProgressItems((prev) =>
          prev.map((item) => (item.id === 3 ? { ...item, done: true } : item)),
        );
      }, 2300);

      const t4 = setTimeout(() => {
        setCurrentStep(3);
      }, 3100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex flex-col transition-colors">
      {/* Header row */}
      <header className="w-full h-[76px] px-6 sm:px-10 border-b border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between transition-colors">
        {/* Logo top-left */}
        <div className="flex items-center">
          <Logo size="md" />
        </div>

        {/* Centered horizontal stepper with 3 steps connected by thin dashed lines */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                currentStep === 1
                  ? "bg-[#6366F1] text-white ring-4 ring-[#6366F1]/20"
                  : currentStep > 1
                    ? "bg-[#10B981] text-white"
                    : "border border-gray-300 dark:border-gray-700 text-gray-400",
              )}
            >
              {currentStep > 1 ? <Check className="w-4 h-4" /> : "1"}
            </div>
            <span
              className={cn(
                "text-xs sm:text-sm font-medium",
                currentStep === 1
                  ? "text-[#111827] dark:text-white font-bold"
                  : "text-[#6B7280] dark:text-gray-400",
              )}
            >
              ① Connect Payment
            </span>
          </div>

          {/* Thin dashed connector */}
          <div className="w-8 lg:w-12 border-t border-dashed border-gray-300 dark:border-gray-700" />

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                currentStep === 2
                  ? "bg-[#6366F1] text-white ring-4 ring-[#6366F1]/20"
                  : currentStep > 2
                    ? "bg-[#10B981] text-white"
                    : "border border-gray-300 dark:border-gray-700 text-gray-400",
              )}
            >
              {currentStep > 2 ? <Check className="w-4 h-4" /> : "2"}
            </div>
            <span
              className={cn(
                "text-xs sm:text-sm font-medium",
                currentStep === 2
                  ? "text-[#111827] dark:text-white font-bold"
                  : "text-[#6B7280] dark:text-gray-400",
              )}
            >
              ② Webhook Setup
            </span>
          </div>

          {/* Thin dashed connector */}
          <div className="w-8 lg:w-12 border-t border-dashed border-gray-300 dark:border-gray-700" />

          {/* Step 3 */}
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                currentStep === 3
                  ? "bg-[#6366F1] text-white ring-4 ring-[#6366F1]/20"
                  : "border border-gray-300 dark:border-gray-700 text-gray-400",
              )}
            >
              {currentStep === 3 ? <Check className="w-4 h-4" /> : "3"}
            </div>
            <span
              className={cn(
                "text-xs sm:text-sm font-medium",
                currentStep === 3
                  ? "text-[#111827] dark:text-white font-bold"
                  : "text-[#6B7280] dark:text-gray-400",
              )}
            >
              ③ Complete
            </span>
          </div>
        </div>

        {/* Top-right: theme toggle + avatar circle with initial + name + small chevron */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="flex items-center gap-2.5 p-1 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-display font-semibold text-xs">
              A
            </div>
            <span className="hidden sm:inline-block text-sm font-medium text-[#111827] dark:text-gray-200">
              Alex
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] dark:text-gray-400" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto px-6 sm:px-10 py-6 flex-1 flex flex-col">
        {/* Below header: small ← Back to Dashboard text link */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#111827] dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Two-column body (left ≈40%, right ≈60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start flex-1">
          {/* Left Column (~40% -> 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* 1. Small uppercase tracked-out eyebrow label */}
              <p className="text-[13px] font-semibold tracking-wider text-[#6B7280] dark:text-gray-400 uppercase">
                STEP {currentStep} OF 3
              </p>

              {/* 2. H1: two lines, bold */}
              <h1 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-[#111827] dark:text-white leading-tight">
                Connect your
                <br />
                payment gateway
              </h1>

              {/* 3. Paragraph */}
              <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#6B7280] dark:text-gray-300">
                Link your Stripe or Dodo account to start recovering lost
                revenue. It only takes a few clicks — just paste your API key
                and we handle the rest.
              </p>

              {/* 4. Three feature rows */}
              <div className="mt-8 space-y-5">
                {/* Feature 1 */}
                <div className="flex items-start gap-3.5">
                  <IconChip icon={<Zap className="w-4 h-4" />} size="md" />
                  <div>
                    <h4 className="font-semibold text-sm sm:text-[15px] text-[#111827] dark:text-white">
                      Secure &amp; Encrypted
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                      Your API key is encrypted in transit and at rest — we
                      never store it in plain text.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-3.5">
                  <IconChip icon={<Clock className="w-4 h-4" />} size="md" />
                  <div>
                    <h4 className="font-semibold text-sm sm:text-[15px] text-[#111827] dark:text-white">
                      No Manual Setup
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                      Just paste your key and we&apos;ll handle the rest —
                      including webhook registration.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-3.5">
                  <IconChip icon={<Shield className="w-4 h-4" />} size="md" />
                  <div>
                    <h4 className="font-semibold text-sm sm:text-[15px] text-[#111827] dark:text-white">
                      Works in the Background
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                      Once connected, we&apos;ll automatically listen to payment
                      events and start recovering revenue.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Bottom decorative illustration */}
            <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="relative flex items-center justify-center py-6">
                {/* Dashed circular orbit */}
                <div className="w-44 h-44 rounded-full border border-dashed border-[#6366F1]/30 flex items-center justify-center relative">
                  {/* Small floating orbit dots */}
                  <span className="absolute top-2 left-6 w-2 h-2 rounded-full bg-[#6366F1]/50 animate-pulse" />
                  <span className="absolute bottom-4 right-8 w-1.5 h-1.5 rounded-full bg-[#10B981]/60" />

                  {/* Stripe logo card */}
                  <div className="absolute -left-3 bg-white dark:bg-[#111827] border border-[#6366F1]/30 rounded-xl px-3.5 py-2 shadow-md">
                    <span className="font-display font-black text-sm tracking-tight text-[#6366F1]">
                      stripe
                    </span>
                  </div>

                  {/* Central spark/connector icon */}
                  <div className="w-9 h-9 rounded-full bg-[#EEF2FF] dark:bg-[#6366F1]/20 flex items-center justify-center text-[#6366F1]">
                    <Sparkles className="w-4 h-4" />
                  </div>

                  {/* Dodo logo card */}
                  <div className="absolute -right-3 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2 shadow-md">
                    <span className="font-display font-black text-sm tracking-widest text-[#111827] dark:text-white">
                      DODO
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (~60% -> 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* STEP 1: Provider selection & inline modal */}
            {currentStep === 1 && (
              <Card padding="lg" className="w-full">
                {/* Heading */}
                <div className="flex items-center gap-3 mb-2">
                  <IconChip icon={<Link2 className="w-4 h-4" />} size="sm" />
                  <h2 className="font-display font-bold text-xl text-[#111827] dark:text-white">
                    Connect Your Payment Provider
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 mb-6">
                  Choose your payment gateway and connect it securely.
                </p>

                <div className="space-y-4">
                  {/* Provider option: Stripe (Highlighted/Recommended) */}
                  <div className="border-2 border-[#6366F1] bg-[#EEF2FF]/40 dark:bg-[#6366F1]/10 rounded-xl p-5 sm:p-6 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-display font-black text-lg text-[#6366F1]">
                            stripe
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wider bg-[#6366F1] text-white px-2 py-0.5 rounded-full">
                            Recommended
                          </span>
                        </div>
                        <h3 className="font-semibold text-base text-[#111827] dark:text-white">
                          Connect with Stripe
                        </h3>
                        <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                          The most popular payment platform for SaaS businesses.
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => handleOpenConnect("stripe")}
                        withArrow
                        className="self-start sm:self-center shrink-0"
                      >
                        Connect Stripe
                      </Button>
                    </div>

                    {/* 3 Checklist lines */}
                    <div className="mt-4 pt-4 border-t border-[#6366F1]/20 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#111827] dark:text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>Bank-level encryption</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>Supports all major cards</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>Instant setup</span>
                      </div>
                    </div>
                  </div>

                  {/* Provider option: Dodo */}
                  <div className="border border-[#E5E7EB] dark:border-gray-800 bg-white dark:bg-gray-900/50 rounded-xl p-5 sm:p-6 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="font-display font-black text-lg tracking-widest text-[#111827] dark:text-white block mb-1">
                          DODO
                        </span>
                        <h3 className="font-semibold text-base text-[#111827] dark:text-white">
                          Connect with Dodo
                        </h3>
                        <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                          Merchant of Record with simple, individual-friendly
                          integration.
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleOpenConnect("dodo")}
                        withArrow
                        className="self-start sm:self-center shrink-0"
                      >
                        Connect Dodo
                      </Button>
                    </div>

                    {/* 3 Checklist lines */}
                    <div className="mt-4 pt-4 border-t border-[#E5E7EB] dark:border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#111827] dark:text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>Bank-level encryption</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>Local &amp; global support</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>Fast &amp; easy setup</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer line below card */}
                <p className="mt-6 text-center text-xs text-[#6B7280] dark:text-gray-400">
                  🔒 Your credentials are encrypted and never stored on our
                  servers.
                </p>
              </Card>
            )}

            {/* STEP 2: Automated Progress Screen */}
            {currentStep === 2 && (
              <Card
                padding="lg"
                className="w-full animate-in fade-in zoom-in-95 duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <IconChip
                    icon={
                      <Loader2 className="w-4 h-4 animate-spin text-[#6366F1]" />
                    }
                    size="sm"
                  />
                  <h2 className="font-display font-bold text-xl text-[#111827] dark:text-white">
                    Configuring Webhook Integration…
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 mb-8">
                  We are automatically setting up event subscriptions and
                  testing the secure endpoint. Please wait a moment.
                </p>

                {/* Sequential Checklist Animation */}
                <div className="space-y-4 py-2">
                  {progressItems.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
                        item.done
                          ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                          : "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 text-[#6B7280] dark:text-gray-400",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.done ? (
                          <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center animate-in zoom-in duration-200">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-700 border-t-[#6366F1] animate-spin" />
                        )}
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-xs font-semibold">
                        {item.done ? "Completed" : "In progress…"}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-center text-xs text-[#6B7280] dark:text-gray-400">
                  Automatic registration in progress • No manual webhook secret
                  needed
                </p>
              </Card>
            )}

            {/* STEP 3: Complete Success State */}
            {currentStep === 3 && (
              <Card
                padding="lg"
                className="w-full text-center animate-in fade-in zoom-in-95 duration-400 py-12"
              >
                {/* Big checkmark illustration/icon */}
                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border-2 border-[#10B981] flex items-center justify-center text-[#10B981] mb-6 shadow-sm">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#111827] dark:text-white">
                  Connected successfully ✅
                </h2>

                <p className="mt-3 text-sm sm:text-base text-[#6B7280] dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                  Your payment provider is now connected and LeakOps is watching
                  for revenue leaks.
                </p>

                <div className="mt-8 flex justify-center">
                  <Link href="/dashboard">
                    <Button
                      variant="primary"
                      size="lg"
                      withArrow
                      className="px-8"
                    >
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Connect API Key Modal (Exactly one field: API Key — NO webhook secret field) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-150">
            <h3 className="font-display font-bold text-xl text-[#111827] dark:text-white mb-1">
              Connect with {selectedProvider === "dodo" ? "Dodo" : "Stripe"}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 mb-6">
              Paste your API key below. We will securely configure webhooks
              automatically in the background.
            </p>

            <form onSubmit={handleConnectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#111827] dark:text-gray-200 mb-1.5">
                  API Key
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280] dark:text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showApiKey ? "text" : "password"}
                    required
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={
                      selectedProvider === "dodo"
                        ? "dodo_api_live_..."
                        : "rk_live_..."
                    }
                    className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 rounded-lg text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white"
                  >
                    {showApiKey ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-[#6B7280] dark:text-gray-500 mt-1.5">
                  Needs restricted permissions for charges and customer events.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" withArrow>
                  Connect
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

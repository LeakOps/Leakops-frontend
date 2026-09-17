import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import {
  Tag,
  Check,
  Zap,
  Shield,
  CreditCard,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "/month",
      note: "30 days · No credit card required",
      description: "Try everything, risk-free.",
      features: [
        "Connect Stripe / Dodo",
        "Detect revenue leaks",
        "Failed payment recovery",
        "Retry automation",
        "Leakage analytics",
        "Recovery dashboard",
        "See exactly how much revenue LeakOps recovered",
      ],
      ctaText: "Start Free Trial",
      ctaVariant: "outline" as const,
      isHighlighted: false,
    },
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      note: "30-day free trial included",
      description: "For early-stage SaaS",
      features: [
        "Up to $5k recovered revenue tracked/month",
        "Failed payment detection",
        "Smart retry workflows",
        "Basic leakage detection",
        "Revenue recovery dashboard",
        "Email alerts",
      ],
      ctaText: "Get Started",
      ctaVariant: "outline" as const,
      isHighlighted: false,
    },
    {
      name: "Growth",
      price: "$49",
      period: "/month",
      note: "30-day free trial included",
      description: "For growing SaaS",
      features: [
        "Up to $25k recovered revenue tracked/month",
        "Everything in Starter",
        "Advanced recovery rules",
        "Downgrade leakage detection",
        "Coupon leakage detection",
        "Trial conversion leakage",
        "Advanced analytics",
      ],
      ctaText: "Get Started",
      ctaVariant: "primary" as const,
      isHighlighted: true, // Most Popular
    },
    {
      name: "Scale",
      price: "$99",
      period: "/month",
      note: "30-day free trial included",
      description: "For scaling SaaS",
      features: [
        "Up to $100k recovered revenue tracked/month",
        "Everything in Growth",
        "Custom recovery rules",
        "Advanced reporting",
        "Multiple payment accounts",
        "Priority support",
      ],
      ctaText: "Get Started",
      ctaVariant: "outline" as const,
      isHighlighted: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "/month",
      note: "Custom trial terms available",
      description: "For large teams and custom needs.",
      features: [
        "Unlimited events",
        "Everything in Scale",
        "Dedicated account manager",
        "SLA & uptime guarantees",
        "Custom integrations & features",
      ],
      ctaText: "Contact Sales",
      ctaVariant: "outline" as const,
      isHighlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex flex-col transition-colors selection:bg-[#6366F1] selection:text-white">
      {/* Navbar (logged-in variant with ThemeToggle) */}
      <Navbar variant="app" />

      {/* Main container */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-8 py-12">
        {/* Header block */}
        <div className="text-center max-w-2xl mx-auto mt-4 sm:mt-8 mb-14">
          {/* 1. Small pill badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#EEF2FF] dark:bg-[#6366F1]/15 text-[#6366F1] dark:text-[#818CF8] border border-[#6366F1]/20 mb-4">
            <Tag className="w-3.5 h-3.5" />
            <span>Simple, transparent pricing</span>
          </div>

          {/* 2. H1, centered, two lines, bold */}
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[44px] leading-tight text-[#111827] dark:text-white">
            Choose the plan that
            <br />
            fits your business.
          </h1>

          {/* 3. Subtext, centered, text-muted, two lines */}
          <p className="mt-4 text-[#6B7280] dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            Start for free and scale as you grow. No hidden fees, no setup costs.
            <br className="hidden sm:inline" /> Just powerful tools to help you
            recover revenue.
          </p>
        </div>

        {/* Pricing cards row: 5 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 items-stretch mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative bg-white dark:bg-[#111827] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all",
                plan.isHighlighted
                  ? "border-2 border-[#111827] dark:border-white shadow-[0_8px_32px_rgba(17,24,39,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] xl:-translate-y-2 z-10 pt-11 sm:pt-12" // extra top padding to prevent collision
                  : "border border-[#E5E7EB] dark:border-gray-800 shadow-[0_4px_24px_rgba(17,24,39,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
              )}
            >
              {/* Overlapping Top-Corner "Most Popular" Badge (Single-line non-wrapping pill straddling border) */}
              {plan.isHighlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                  <span className="whitespace-nowrap bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                {/* Plan Name & Description */}
                <h3 className="font-display font-bold text-lg text-[#111827] dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1 min-h-[32px]">
                  {plan.description}
                </p>

                {/* Price block */}
                <div className="mt-5 pb-5 border-b border-[#E5E7EB] dark:border-gray-800">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#111827] dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-[#6B7280] dark:text-gray-400 font-medium">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B7280] dark:text-gray-400 mt-1.5">
                    {plan.note}
                  </p>
                </div>

                {/* Checklist */}
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-[#111827] dark:text-gray-300 leading-snug"
                    >
                      {/* Checkmark icon: black on Growth card, indigo on others per rule */}
                      <Check
                        className={cn(
                          "w-4 h-4 shrink-0 mt-0.5",
                          plan.isHighlighted
                            ? "text-[#111827] dark:text-white stroke-[2.5]"
                            : "text-[#6366F1] dark:text-[#818CF8]"
                        )}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pinned CTA Button */}
              <div className="mt-8 pt-4">
                <Link href="/onboarding/connect-payment" className="w-full block">
                  <Button
                    variant={plan.ctaVariant}
                    className={cn(
                      "w-full py-2.5 text-xs font-semibold",
                      plan.isHighlighted &&
                        "bg-[#111827] text-white hover:bg-[#1F2937] dark:bg-white dark:text-[#111827] dark:hover:bg-gray-100"
                    )}
                  >
                    {plan.ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust strip — 4 equal columns */}
        <Card padding="lg" className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1 */}
            <div className="flex items-start gap-3.5">
              <IconChip icon={<Zap className="w-4 h-4" />} size="md" />
              <div>
                <h4 className="font-semibold text-sm text-[#111827] dark:text-white">
                  No setup fees
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Get started instantly.
                </p>
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex items-start gap-3.5">
              <IconChip icon={<Shield className="w-4 h-4" />} size="md" />
              <div>
                <h4 className="font-semibold text-sm text-[#111827] dark:text-white">
                  Secure &amp; reliable
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Your data is always protected.
                </p>
              </div>
            </div>

            {/* Col 3 */}
            <div className="flex items-start gap-3.5">
              <IconChip icon={<CreditCard className="w-4 h-4" />} size="md" />
              <div>
                <h4 className="font-semibold text-sm text-[#111827] dark:text-white">
                  Flexible billing
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Cancel anytime.
                </p>
              </div>
            </div>

            {/* Col 4 */}
            <div className="flex items-start gap-3.5">
              <IconChip icon={<Headphones className="w-4 h-4" />} size="md" />
              <div>
                <h4 className="font-semibold text-sm text-[#111827] dark:text-white">
                  24/7 support
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                  We&apos;re here when you need us.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

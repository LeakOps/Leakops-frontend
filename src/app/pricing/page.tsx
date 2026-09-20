"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import {
  Tag,
  Check,
  Zap,
  Shield,
  CreditCard,
  Headphones,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [enterpriseModal, setEnterpriseModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [salesMessage, setSalesMessage] = useState("");
  const [salesSuccess, setSalesSuccess] = useState(false);
  const [salesSubmitting, setSalesSubmitting] = useState(false);

  const handlePlanSelect = async (planName: string) => {
    if (planName === "Free Trial") {
      router.push(
        isAuthenticated ? "/onboarding/connect-payment" : "/login?tab=signup",
      );
      return;
    }

    if (planName === "Enterprise") {
      if (!isAuthenticated) {
        router.push("/login?tab=signup");
        return;
      }
      setEnterpriseModal(true);
      return;
    }

    if (!isAuthenticated) {
      router.push("/login?tab=signup");
      return;
    }

    const planKey = planName.toLowerCase() as "starter" | "growth" | "scale";
    try {
      setLoadingPlan(planName);
      const res = await api.createCheckout(planKey);
      if (res.checkout_url) {
        window.location.href = res.checkout_url;
      }
    } catch (err: any) {
      alert(err.message || "Failed to initialize checkout session");
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleContactSales = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    try {
      setSalesSubmitting(true);
      await api.contactSales({
        company_name: companyName,
        message: salesMessage,
      });
      setSalesSuccess(true);
      setTimeout(() => {
        setEnterpriseModal(false);
        setSalesSuccess(false);
        setCompanyName("");
        setSalesMessage("");
      }, 2000);
    } catch (err: any) {
      alert(err.message || "Failed to submit request");
    } finally {
      setSalesSubmitting(false);
    }
  };
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "/month",
      note: "30 days · No credit card required",
      description: "Try everything, risk-free.",
      included: [
        "Connect Stripe / Dodo (1 gateway)",
        "Revenue tracked up to $2K/month",
        "Failed payment detection",
        "Retry automation",
        "Recovery dashboard",
        "See exactly how much revenue was recovered",
      ],
      excluded: [
        "CSV export",
        "Smart retry workflows with custom schedules",
        "Coupon, downgrade, and trial-conversion leakage detection",
        "Priority support",
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
      included: [
        "Connect Stripe / Dodo (1 gateway)",
        "Revenue tracked up to $5K/month",
        "Failed payment detection",
        "Smart retry workflows",
        "Basic leakage detection",
        "Recovery dashboard",
        "Email alerts",
      ],
      excluded: [
        "Downgrade, coupon, and trial-conversion leakage detection",
        "Advanced recovery rules",
        "Advanced analytics",
        "Priority support",
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
      included: [
        "Everything in Starter",
        "Revenue tracked up to $25K/month",
        "Advanced recovery rules",
        "Downgrade leakage detection",
        "Coupon leakage detection",
        "Trial-conversion leakage detection",
        "Advanced analytics",
        "Multiple payment accounts",
        "Custom integrations",
      ],
      excluded: ["Dedicated account manager", "SLA and uptime guarantees"],
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
      included: [
        "Everything in Growth",
        "Revenue tracked up to $100K/month",
        "Custom recovery rules",
        "Advanced reporting",
        "Multiple payment accounts",
        "Priority support",
        "Dedicated account manager",
        "SLA and uptime guarantees",
        "Custom integrations and features",
      ],
      excluded: [],
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
      included: [
        "Unlimited events",
        "Everything in Scale",
        "Dedicated account manager",
        "SLA & uptime guarantees",
        "Custom integrations & features",
        "Custom trial terms",
      ],
      excluded: [],
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
            Start for free and scale as you grow. No hidden fees, no setup
            costs.
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
                  : "border border-[#E5E7EB] dark:border-gray-800 shadow-[0_4px_24px_rgba(17,24,39,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)]",
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

                {/* Included features */}
                <div className="mt-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#111827] dark:text-white">
                    Included
                  </p>
                  <ul className="mt-3 space-y-3">
                    {plan.included.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-[#111827] dark:text-gray-300 leading-snug"
                      >
                        <Check
                          className={cn(
                            "w-4 h-4 shrink-0 mt-0.5",
                            plan.isHighlighted
                              ? "text-[#111827] dark:text-white stroke-[2.5]"
                              : "text-[#6366F1] dark:text-[#818CF8]",
                          )}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excluded features */}
                {plan.excluded.length > 0 && (
                  <div className="mt-7 pt-5 border-t border-[#E5E7EB] dark:border-gray-800">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
                      Excluded
                    </p>
                    <ul className="mt-3 space-y-3">
                      {plan.excluded.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-[#6B7280] dark:text-gray-500 leading-snug"
                        >
                          <X className="w-4 h-4 shrink-0 mt-0.5 text-[#9CA3AF] dark:text-gray-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Pinned CTA Button */}
              <div className="mt-8 pt-4">
                <Button
                  type="button"
                  variant={plan.ctaVariant}
                  disabled={loadingPlan === plan.name}
                  onClick={() => handlePlanSelect(plan.name)}
                  className={cn(
                    "w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2",
                    plan.isHighlighted &&
                      "bg-[#111827] text-white hover:bg-[#1F2937] dark:bg-white dark:text-[#111827] dark:hover:bg-gray-100",
                  )}
                >
                  {loadingPlan === plan.name ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Connecting…</span>
                    </>
                  ) : (
                    <span>{plan.ctaText}</span>
                  )}
                </Button>
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

      {/* Enterprise Contact Modal */}
      {enterpriseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setEnterpriseModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-bold text-xl text-[#111827] dark:text-white mb-1">
              Contact Enterprise Sales
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-gray-400 mb-6">
              Custom trial terms, dedicated account manager, and high-volume
              SLAs.
            </p>

            {salesSuccess ? (
              <div className="py-6 text-center text-emerald-600 dark:text-emerald-400">
                <Check className="w-8 h-8 mx-auto mb-2 stroke-[3]" />
                <p className="font-semibold text-sm">Thank you!</p>
                <p className="text-xs text-gray-500 mt-1">
                  Our team will reach out to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSales} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#111827] dark:text-gray-200 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Inc."
                    className="w-full px-3.5 py-2 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 rounded-lg text-xs sm:text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#111827] dark:text-gray-200 mb-1.5">
                    Message / Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={salesMessage}
                    onChange={(e) => setSalesMessage(e.target.value)}
                    placeholder="Estimated monthly payment volume, custom integrations..."
                    className="w-full px-3.5 py-2 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 rounded-lg text-xs sm:text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEnterpriseModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={salesSubmitting}
                  >
                    {salesSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        Submitting…
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

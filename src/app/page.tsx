import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { LogoHexagon } from "@/components/Logo";
import {
  CreditCard,
  Tag,
  Mail,
  Percent,
  User,
  Gift,
  CheckCircle2,
  Link2,
  Radar,
  RefreshCw,
  Check,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const steps = [
    {
      number: "1",
      title: "Connect",
      icon: <Link2 className="w-5 h-5 text-[#6366F1]" />,
      description:
        "Link your Stripe or Dodo account in under a minute — just paste an API key, no code required.",
    },
    {
      number: "2",
      title: "Detect",
      icon: <Radar className="w-5 h-5 text-[#6366F1]" />,
      description:
        "LeakOps continuously watches your payment events for failed charges, coupon abuse, downgrades, proration errors, and trial leakage.",
    },
    {
      number: "3",
      title: "Recover",
      icon: <RefreshCw className="w-5 h-5 text-[#6366F1]" />,
      description:
        "Automated retries, dunning emails, and SMS nudges bring the revenue back — with a dashboard showing exactly what was recovered.",
    },
  ];

  const featureCards = [
    {
      title: "Failed Payment Recovery",
      icon: <CreditCard className="w-4 h-4" />,
      description:
        "Detects declined charges the moment they happen and kicks off smart retries automatically.",
    },
    {
      title: "Dunning Automation",
      icon: <Mail className="w-4 h-4" />,
      description:
        "Sends timed, branded recovery emails and SMS nudges so customers fix their card without you lifting a finger.",
    },
    {
      title: "Coupon Abuse Detection",
      icon: <Tag className="w-4 h-4" />,
      description:
        "Flags customers stacking or reusing discount codes in ways that quietly eat into your margin.",
    },
    {
      title: "Proration Error Detection",
      icon: <Percent className="w-4 h-4" />,
      description:
        "Catches billing mismatches from plan changes before they turn into disputes or lost revenue.",
    },
    {
      title: "Downgrade Leakage",
      icon: <User className="w-4 h-4" />,
      description:
        "Surfaces customers silently downgrading their plan so you can win back the difference.",
    },
    {
      title: "Free Trial Leakage",
      icon: <Gift className="w-4 h-4" />,
      description:
        "Tracks trial-to-paid conversion gaps and tells you exactly where signups are falling through.",
    },
  ];

  const dunningChecklist = [
    "Retry timing adjusted automatically based on decline reason and customer history",
    "Recovery flow escalates from email, to SMS, to a direct team alert if nothing lands",
    "A no-login card-update page with 3D Secure support, so customers can fix billing in one tap",
    "Every failed charge is tracked to a clear outcome — recovered, retried, escalated, or churned",
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex flex-col selection:bg-[#6366F1] selection:text-white transition-colors scroll-smooth">
      {/* Navbar per Section 3 & follow-up specs */}
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section className="max-w-7xl w-full mx-auto px-6 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (~55% split -> 7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* 1. Small pill badge */}
            <Badge
              variant="indigo"
              dot
              className="mb-6 text-[14px] px-3.5 py-1"
            >
              Stop revenue leaks before they hit your MRR
            </Badge>

            {/* 2. H1: three lines, tight leading, bold Sora, ink color */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[58px] leading-[1.06] tracking-tight text-[#111827] dark:text-white">
              Your SaaS revenue
              <br />
              is leaking. Find it.
              <br />
              Fix it.
            </h1>

            {/* 3. Paragraph */}
            <p className="mt-5 text-[#6B7280] dark:text-gray-400 text-base sm:text-[17px] leading-relaxed max-w-[480px]">
              LeakOps monitors failed payments, dunning, proration errors,
              coupon abuse and more — so you can recover lost revenue
              automatically.
            </p>

            {/* 4. CTA row: ONLY ONE BUTTON */}
            <div className="mt-8">
              <Link href="/login?tab=signup">
                <Button
                  variant="primary"
                  size="lg"
                  withArrow
                  className="px-7 py-3.5"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* 5. Trust row: exactly two items only */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-[#6B7280] dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Connect in minutes</span>
              </div>
            </div>
          </div>

          {/* Right Column — the hero graphic (~45% split -> 5 cols on desktop) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] w-full">
            {/* Soft blurred radial glow */}
            <div
              className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#6366F1]/20 via-[#A5B4FC]/15 to-transparent blur-3xl -z-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Decorative connector network */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none stroke-[#6366F1]/20 dark:stroke-[#6366F1]/30 hidden sm:block -z-5"
              viewBox="0 0 500 500"
              fill="none"
            >
              <line x1="250" y1="250" x2="80" y2="80" strokeDasharray="4 4" />
              <line x1="250" y1="250" x2="420" y2="80" strokeDasharray="4 4" />
              <line x1="250" y1="250" x2="50" y2="250" strokeDasharray="4 4" />
              <line x1="250" y1="250" x2="450" y2="250" strokeDasharray="4 4" />
              <line x1="250" y1="250" x2="90" y2="420" strokeDasharray="4 4" />
              <line x1="250" y1="250" x2="410" y2="420" strokeDasharray="4 4" />
              <circle cx="80" cy="80" r="3" fill="#6366F1" fillOpacity="0.4" />
              <circle cx="420" cy="80" r="3" fill="#6366F1" fillOpacity="0.4" />
              <circle cx="50" cy="250" r="3" fill="#6366F1" fillOpacity="0.4" />
              <circle
                cx="450"
                cy="250"
                r="3"
                fill="#6366F1"
                fillOpacity="0.4"
              />
              <circle cx="90" cy="420" r="3" fill="#6366F1" fillOpacity="0.4" />
              <circle
                cx="410"
                cy="420"
                r="3"
                fill="#6366F1"
                fillOpacity="0.4"
              />
            </svg>

            {/* Center large 3D glossy hexagon */}
            <div className="relative z-10 flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <LogoHexagon size="xl" />
            </div>

            {/* 6 Floating Feature Pill Cards */}
            <div className="absolute top-2 sm:top-6 left-0 sm:left-2 z-20 animate-in fade-in zoom-in duration-500">
              <div className="flex items-center gap-2.5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_4px_24px_rgba(17,24,39,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                <IconChip icon={<CreditCard className="w-4 h-4" />} size="sm" />
                <span className="text-xs sm:text-[14px] font-medium text-[#111827] dark:text-gray-100 whitespace-nowrap">
                  Failed Payments
                </span>
              </div>
            </div>

            <div className="absolute top-2 sm:top-6 right-0 sm:right-2 z-20 animate-in fade-in zoom-in duration-500 delay-100">
              <div className="flex items-center gap-2.5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_4px_24px_rgba(17,24,39,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                <IconChip icon={<Tag className="w-4 h-4" />} size="sm" />
                <span className="text-xs sm:text-[14px] font-medium text-[#111827] dark:text-gray-100 whitespace-nowrap">
                  Coupon Abuse
                </span>
              </div>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-6 z-20 animate-in fade-in zoom-in duration-500 delay-200">
              <div className="flex items-center gap-2.5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_4px_24px_rgba(17,24,39,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                <IconChip icon={<Mail className="w-4 h-4" />} size="sm" />
                <span className="text-xs sm:text-[14px] font-medium text-[#111827] dark:text-gray-100 whitespace-nowrap">
                  Dunning Emails
                </span>
              </div>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-6 z-20 animate-in fade-in zoom-in duration-500 delay-300">
              <div className="flex items-center gap-2.5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_4px_24px_rgba(17,24,39,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                <IconChip icon={<Percent className="w-4 h-4" />} size="sm" />
                <span className="text-xs sm:text-[14px] font-medium text-[#111827] dark:text-gray-100 whitespace-nowrap">
                  Proration Errors
                </span>
              </div>
            </div>

            <div className="absolute bottom-2 sm:bottom-6 left-0 sm:left-2 z-20 animate-in fade-in zoom-in duration-500 delay-400">
              <div className="flex items-center gap-2.5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_4px_24px_rgba(17,24,39,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                <IconChip icon={<User className="w-4 h-4" />} size="sm" />
                <span className="text-xs sm:text-[14px] font-medium text-[#111827] dark:text-gray-100 whitespace-nowrap">
                  Downgrade Leakage
                </span>
              </div>
            </div>

            <div className="absolute bottom-2 sm:bottom-6 right-0 sm:right-2 z-20 animate-in fade-in zoom-in duration-500 delay-500">
              <div className="flex items-center gap-2.5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_4px_24px_rgba(17,24,39,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                <IconChip icon={<Gift className="w-4 h-4" />} size="sm" />
                <span className="text-xs sm:text-[14px] font-medium text-[#111827] dark:text-gray-100 whitespace-nowrap">
                  Free Trial Leakage
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Features (#features) */}
      <section
        id="features"
        className="py-20 sm:py-28 bg-[#F5F6FB]/70 dark:bg-[#0E1322]/80 border-t border-b border-[#E5E7EB] dark:border-gray-800 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          {/* Part 1: How it Works (from Addendum #4) */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#EEF2FF] dark:bg-[#6366F1]/15 text-[#6366F1] dark:text-[#818CF8] border border-[#6366F1]/20 mb-3">
              How it works
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111827] dark:text-white leading-tight">
              Three steps. Zero manual chasing.
            </h2>
            <p className="mt-3 text-[#6B7280] dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              No code, no manual retries, no spreadsheets — just connect and let
              LeakOps run in the background.
            </p>
          </div>

          {/* 3 Horizontal Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-24">
            {steps.map((step, idx) => (
              <Card
                key={step.title}
                padding="md"
                className="relative flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] dark:bg-[#6366F1]/20 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <span className="font-display font-black text-2xl text-gray-200 dark:text-gray-700 select-none">
                      0{step.number}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#111827] dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {idx < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-700" />
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Part 2: What LeakOps catches — 6 Feature Cards */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#EEF2FF] dark:bg-[#6366F1]/15 text-[#6366F1] dark:text-[#818CF8] border border-[#6366F1]/20 mb-3">
              What LeakOps catches
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111827] dark:text-white leading-tight">
              Every leak, covered.
            </h2>
            <p className="mt-3 text-[#6B7280] dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              Six ways your SaaS revenue quietly disappears — and how LeakOps
              plugs each one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feat) => (
              <Card
                key={feat.title}
                padding="md"
                className="flex flex-col justify-start hover:border-[#6366F1]/40 transition-all"
              >
                <div className="mb-4">
                  <IconChip icon={feat.icon} size="md" />
                </div>
                <h3 className="font-display font-bold text-base text-[#111827] dark:text-white mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed">
                  {feat.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Dunning spotlight (~45/55 split) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy (~45% -> 5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111827] dark:text-white leading-tight">
              Recovery that learns
              <br />
              your decline patterns.
            </h2>

            <p className="text-sm sm:text-base text-[#6B7280] dark:text-gray-400 leading-relaxed">
              Most payment platforms retry a failed charge once and send a
              generic email. LeakOps goes further — it looks at <em>why</em> a
              card was declined and adjusts the retry timing, channel, and
              messaging to match, based on patterns across thousands of recovery
              attempts.
            </p>

            <div className="pt-3">
              <Link href="/dashboard/dunning">
                <Button variant="primary" size="lg" withArrow>
                  See Dunning
                </Button>
              </Link>
            </div>
          </div>

          {/* Right checklist card (~55% -> 7 cols) */}
          <div className="lg:col-span-7">
            <Card
              padding="lg"
              className="border border-[#E5E7EB] dark:border-gray-800"
            >
              <h3 className="font-display font-semibold text-lg text-[#111827] dark:text-white mb-6">
                Intelligent Dunning Architecture
              </h3>

              <div className="space-y-4">
                {dunningChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-xs sm:text-sm text-[#111827] dark:text-gray-300 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION: Pricing Teaser & Preview (#pricing) */}
      <section
        id="pricing"
        className="py-20 sm:py-28 bg-[#F5F6FB]/70 dark:bg-[#0E1322]/80 border-t border-[#E5E7EB] dark:border-gray-800 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          {/* Pricing Teaser Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#EEF2FF] dark:bg-[#6366F1]/15 text-[#6366F1] dark:text-[#818CF8] border border-[#6366F1]/20 mb-3">
              PRICING
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111827] dark:text-white leading-tight">
              Choose the plan that fits your business.
            </h2>
            <p className="mt-3 text-[#6B7280] dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              Start for free and scale as you grow. No hidden fees, no setup
              costs. Just powerful tools to help you recover revenue.
            </p>
            <div className="mt-6">
              <Link href="/pricing">
                <Button variant="primary" size="md" withArrow>
                  See Pricing
                </Button>
              </Link>
            </div>
          </div>

          {/* Pricing Preview: Condensed 4-Card Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch max-w-6xl mx-auto">
            {/* Free Trial */}
            <Card padding="md" className="flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-[#111827] dark:text-white">
                  Free Trial
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                  Try everything, risk-free.
                </p>

                <div className="mt-4 pb-4 border-b border-[#E5E7EB] dark:border-gray-800">
                  <span className="font-display font-extrabold text-3xl text-[#111827] dark:text-white">
                    $0
                  </span>
                  <span className="text-xs text-[#6B7280] dark:text-gray-400 ml-1">
                    /month
                  </span>
                </div>

                <p className="mt-3 text-xs text-[#6B7280] dark:text-gray-400">
                  30 days · No credit card required
                </p>

                <ul className="mt-5 space-y-2.5 text-xs text-[#111827] dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                    <span>Connect Stripe / Dodo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                    <span>Detect revenue leaks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                    <span>Failed payment recovery</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <Link href="/pricing" className="block w-full">
                  <Button variant="outline" className="w-full text-xs">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Starter ($19) */}
            <Card padding="md" className="flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-[#111827] dark:text-white">
                  Starter
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                  For early-stage SaaS
                </p>

                <div className="mt-4 pb-4 border-b border-[#E5E7EB] dark:border-gray-800">
                  <span className="font-display font-extrabold text-3xl text-[#111827] dark:text-white">
                    $19
                  </span>
                  <span className="text-xs text-[#6B7280] dark:text-gray-400 ml-1">
                    /month
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5 text-xs text-[#111827] dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                    <span>Up to $5k recovered revenue/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                    <span>Failed payment detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                    <span>Smart retry workflows</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <Link href="/pricing" className="block w-full">
                  <Button variant="outline" className="w-full text-xs">
                    Get Started
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Growth ($49) — HIGHLIGHTED: Single-line Most Popular Badge */}
            <div className="relative bg-white dark:bg-[#111827] rounded-2xl p-6 sm:p-7 pt-10 sm:pt-11 flex flex-col justify-between border-2 border-[#111827] dark:border-white shadow-[0_8px_32px_rgba(17,24,39,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] md:-translate-y-2 z-10 transition-all">
              {/* Single-line Most Popular badge straddling top border */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                <span className="whitespace-nowrap bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-[#111827] dark:text-white">
                  Growth
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                  For growing SaaS
                </p>

                <div className="mt-4 pb-4 border-b border-[#E5E7EB] dark:border-gray-800">
                  <span className="font-display font-extrabold text-3xl text-[#111827] dark:text-white">
                    $49
                  </span>
                  <span className="text-xs text-[#6B7280] dark:text-gray-400 ml-1">
                    /month
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5 text-xs text-[#111827] dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#111827] dark:text-white stroke-[2.5] shrink-0" />
                    <span>Up to $25k recovered revenue/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#111827] dark:text-white stroke-[2.5] shrink-0" />
                    <span>Everything in Starter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#111827] dark:text-white stroke-[2.5] shrink-0" />
                    <span>Advanced recovery rules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#111827] dark:text-white stroke-[2.5] shrink-0" />
                    <span>Coupon &amp; downgrade detection</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <Link href="/pricing" className="block w-full">
                  <Button
                    variant="primary"
                    className="w-full text-xs bg-[#111827] text-white hover:bg-[#1F2937] dark:bg-white dark:text-[#111827] dark:hover:bg-gray-100"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            {/* Scale ($99) */}
            <Card padding="md" className="flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-[#111827] dark:text-white">
                  Scale
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                  For scaling SaaS
                </p>

                <div className="mt-4 pb-4 border-b border-[#E5E7EB] dark:border-gray-800">
                  <span className="font-display font-extrabold text-3xl text-[#111827] dark:text-white">
                    $99
                  </span>
                  <span className="text-xs text-[#6B7280] dark:text-gray-400 ml-1">
                    /month
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5 text-xs text-[#111827] dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                    <span>Up to $100k recovered revenue/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                    <span>Everything in Growth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                    <span>Custom recovery rules</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <Link href="/pricing" className="block w-full">
                  <Button variant="outline" className="w-full text-xs">
                    Get Started
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Centered link below */}
          <div className="mt-10 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6366F1] dark:text-[#818CF8] hover:underline"
            >
              <span>See full pricing &amp; Enterprise plans</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Shared Persistent Dark Footer */}
      <Footer />
    </div>
  );
}

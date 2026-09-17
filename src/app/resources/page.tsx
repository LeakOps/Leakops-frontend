"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import {
  Link2,
  Clock,
  Webhook,
  BookOpen,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ResourcesPage() {
  const docs = [
    {
      slug: "connecting-stripe",
      title: "Connecting Stripe",
      description:
        "Step-by-step guide to linking your Stripe account and going live in minutes.",
      icon: <Link2 className="w-4 h-4" />,
    },
    {
      slug: "connecting-dodo",
      title: "Connecting Dodo",
      description:
        "How to connect Dodo Payments as your merchant of record.",
      icon: <Link2 className="w-4 h-4" />,
    },
    {
      slug: "understanding-dunning-sequences",
      title: "Understanding Dunning Sequences",
      description:
        "How LeakOps schedules retries, emails, SMS, and team alerts.",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      slug: "webhook-events-reference",
      title: "Webhook Events Reference",
      description: "Every event LeakOps listens for, explained.",
      icon: <Webhook className="w-4 h-4" />,
    },
  ];

  const guides = [
    {
      slug: "what-is-involuntary-churn",
      title: "What Is Involuntary Churn?",
      description:
        "Why silent payment failures cost SaaS companies more than they realize.",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      slug: "founders-guide-to-saas-dunning",
      title: "A Founder's Guide to SaaS Dunning",
      description:
        "The retry and messaging strategy behind recovering failed payments.",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      slug: "coupon-abuse-silent-margin-killer",
      title: "Coupon Abuse: The Silent Margin Killer",
      description:
        "How discount codes get misused, and how to catch it early.",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      slug: "proration-errors-explained",
      title: "Proration Errors, Explained",
      description:
        "What goes wrong when customers change plans mid-cycle — and how to fix it.",
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  const faqs = [
    {
      q: "Which payment providers does LeakOps support?",
      a: "Stripe and Dodo Payments today, with more planned.",
    },
    {
      q: "Is my payment data secure?",
      a: "Your API key is encrypted in transit and at rest — we never store it in plain text.",
    },
    {
      q: "How long does setup take?",
      a: "Most founders are fully connected in under two minutes.",
    },
    {
      q: "Do you offer a free trial?",
      a: "Yes — every plan includes a 30-day free trial, no credit card required.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, all plans are month-to-month with no long-term contract.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex flex-col transition-colors selection:bg-[#6366F1] selection:text-white scroll-smooth">
      {/* Navbar with ThemeToggle */}
      <Navbar variant="landing" />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 pt-16 pb-24">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#EEF2FF] dark:bg-[#6366F1]/15 text-[#6366F1] dark:text-[#818CF8] border border-[#6366F1]/20 mb-4">
            Resources
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#111827] dark:text-white">
            Guides, docs, and answers.
          </h1>
          <p className="mt-4 text-[#6B7280] dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            Everything you need to get the most out of LeakOps — from setup guides
            to the concepts behind revenue recovery.
          </p>
        </div>

        {/* Section: Docs & Setup Guides */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#111827] dark:text-white">
              Docs &amp; Setup Guides
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {docs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/resources/${doc.slug}`}
                className="group block"
              >
                <Card
                  padding="md"
                  className="h-full flex flex-col justify-between group-hover:border-[#6366F1]/50 group-hover:shadow-md transition-all"
                >
                  <div>
                    <div className="mb-4">
                      <IconChip icon={doc.icon} size="sm" />
                    </div>
                    <h3 className="font-display font-bold text-base text-[#111827] dark:text-white group-hover:text-[#6366F1] transition-colors mb-2">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center text-xs font-semibold text-[#6366F1]">
                    <span>Read guide</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Section: Guides */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#111827] dark:text-white">
              Guides &amp; Articles
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/resources/${guide.slug}`}
                className="group block"
              >
                <Card
                  padding="md"
                  className="h-full flex flex-col justify-between group-hover:border-[#6366F1]/50 group-hover:shadow-md transition-all"
                >
                  <div>
                    <div className="mb-4">
                      <IconChip icon={guide.icon} size="sm" />
                    </div>
                    <h3 className="font-display font-bold text-base text-[#111827] dark:text-white group-hover:text-[#6366F1] transition-colors mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center text-xs font-semibold text-[#6366F1]">
                    <span>Read article</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Section: Help Center / FAQ Accordion */}
        <section className="max-w-3xl mx-auto pt-6">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#111827] dark:text-white">
              Help Center &amp; FAQ
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 mt-1.5">
              Frequently asked questions about LeakOps integration and billing.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-2xl shadow-[0_4px_24px_rgba(17,24,39,0.04)] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-display font-semibold text-sm sm:text-base text-[#111827] dark:text-white hover:text-[#6366F1] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-[#6B7280] shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180 text-[#6366F1]"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-0 text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800/80 animate-in fade-in duration-150">
                      <div className="pt-3">{faq.a}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

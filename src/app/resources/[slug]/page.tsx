import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const titles: Record<string, string> = {
  "connecting-stripe": "Connecting Stripe",
  "connecting-dodo": "Connecting Dodo",
  "understanding-dunning-sequences": "Understanding Dunning Sequences",
  "webhook-events-reference": "Webhook Events Reference",
  "what-is-involuntary-churn": "What Is Involuntary Churn?",
  "founders-guide-to-saas-dunning": "A Founder's Guide to SaaS Dunning",
  "coupon-abuse-silent-margin-killer": "Coupon Abuse: The Silent Margin Killer",
  "proration-errors-explained": "Proration Errors, Explained",
};

export async function generateStaticParams() {
  return Object.keys(titles).map((slug) => ({ slug }));
}

export default async function ResourceGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const title = titles[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex flex-col transition-colors selection:bg-[#6366F1] selection:text-white">
      <Navbar variant="landing" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 sm:px-10 pt-12 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-gray-400 mb-8">
          <Link href="/resources" className="hover:text-[#111827] dark:hover:text-white">
            Resources
          </Link>
          <span>/</span>
          <span className="text-[#111827] dark:text-white font-medium truncate">
            {title}
          </span>
        </div>

        <div className="mb-6">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6366F1] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all resources</span>
          </Link>
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#111827] dark:text-white mb-8 leading-tight">
          {title}
        </h1>

        {/* Placeholder Guide Card */}
        <Card padding="lg" className="text-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] dark:bg-[#6366F1]/20 text-[#6366F1] flex items-center justify-center mx-auto mb-4">
            <Clock className="w-7 h-7" />
          </div>

          <h2 className="font-display font-bold text-xl text-[#111827] dark:text-white mb-2">
            This guide is being written — check back soon.
          </h2>

          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 max-w-md mx-auto leading-relaxed mb-8">
            We are actively preparing detailed, step-by-step walkthroughs and best
            practices for this topic.
          </p>

          <Link href="/resources">
            <Button variant="primary" size="md">
              Explore other resources
            </Button>
          </Link>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

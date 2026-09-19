import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex flex-col transition-colors selection:bg-[#6366F1] selection:text-white">
      <Navbar variant="landing" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 sm:px-10 pt-16 pb-24">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#111827] dark:text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-xs text-[#6B7280] dark:text-gray-400 mb-8">
          Last updated: September 2026
        </p>

        <Card
          padding="lg"
          className="space-y-6 text-sm text-[#6B7280] dark:text-gray-300 leading-relaxed"
        >
          <section>
            <h2 className="font-display font-semibold text-lg text-[#111827] dark:text-white mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By connecting your payment gateway or creating an account on
              LeakOps, you agree to these Terms of Service and all applicable
              laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-[#111827] dark:text-white mb-2">
              2. Subscription and Billing
            </h2>
            <p>
              Subscription plans include a 30-day free trial. Following the
              trial, plans bill on a monthly basis according to your selected
              tier. You may cancel anytime without penalty.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-[#111827] dark:text-white mb-2">
              3. Limitation of Liability
            </h2>
            <p>
              LeakOps provides revenue recovery automation tools on an &quot;as
              is&quot; basis and makes no guarantees of specific recovery rates
              or outcomes.
            </p>
          </section>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

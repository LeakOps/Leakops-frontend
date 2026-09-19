import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex flex-col transition-colors selection:bg-[#6366F1] selection:text-white">
      <Navbar variant="landing" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 sm:px-10 pt-16 pb-24">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#111827] dark:text-white mb-4">
          Privacy Policy
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
              1. Information We Collect
            </h2>
            <p>
              LeakOps collects encrypted API credentials, payment event webhooks
              (e.g., charge failure metadata, invoice updates), and account
              information necessary to identify revenue leaks and automate
              recovery operations.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-[#111827] dark:text-white mb-2">
              2. Data Encryption and Security
            </h2>
            <p>
              All payment credentials and webhook communications are encrypted
              in transit and at rest using bank-grade AES-256 protocols. We
              never store raw card numbers or sensitive payment methods on our
              servers.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-[#111827] dark:text-white mb-2">
              3. Contact
            </h2>
            <p>
              If you have any questions regarding privacy, reach out to us at{" "}
              <a
                href="mailto:support@leakops.com"
                className="text-[#6366F1] underline"
              >
                support@leakops.com
              </a>
              .
            </p>
          </section>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

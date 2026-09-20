"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/SocialIcons";

export default function AboutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please complete all fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(
          data.error || "We could not send your feedback. Please try again.",
        );
      }
    } catch {
      setError("We could not send your feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex flex-col transition-colors selection:bg-[#6366F1] selection:text-white scroll-smooth">
      {/* Navbar with ThemeToggle */}
      <Navbar variant="landing" />

      {/* Main Content — Normal Document Flow */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 sm:px-10 pt-16 sm:pt-20 pb-24">
        {/* Hero Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#EEF2FF] dark:bg-[#6366F1]/15 text-[#6366F1] dark:text-[#818CF8] border border-[#6366F1]/20 mb-4">
            Our Story
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#111827] dark:text-white">
            We are helping SaaS businesses recover lost payments.
          </h1>
          <p className="mt-5 text-[#6B7280] dark:text-gray-400 text-base sm:text-[17px] leading-relaxed max-w-[600px] mx-auto">
            Every SaaS platform&apos;s native dunning does the bare minimum —
            one retry, one generic email. We started LeakOps because founders
            deserve to see exactly where their revenue is leaking, and to fix it
            automatically instead of chasing it manually.
          </p>
        </div>

        {/* Mission Block */}
        <div className="max-w-2xl mx-auto mb-16 p-8 rounded-2xl bg-[#F5F6FB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 text-center">
          <h2 className="font-display font-bold text-xl text-[#111827] dark:text-white mb-3">
            Our mission
          </h2>
          <p className="text-[#6B7280] dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            Give every SaaS founder the visibility and automation that used to
            only exist inside large finance teams — so recovering revenue takes
            minutes, not manual spreadsheet work.
          </p>
        </div>

        {/* Connect / Social Section */}
        <div className="text-center max-w-md mx-auto mb-20">
          <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-[#6B7280] dark:text-gray-400 mb-4">
            Follow along
          </h3>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://x.com/AdityaS888"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-11 h-11 rounded-full bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 flex items-center justify-center text-[#6B7280] dark:text-gray-300 hover:bg-[#EEF2FF] hover:text-[#6366F1] dark:hover:bg-[#6366F1]/20 dark:hover:text-[#818CF8] hover:border-[#6366F1]/30 transition-all shadow-2xs"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/aditya-singh0811b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-11 h-11 rounded-full bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 flex items-center justify-center text-[#6B7280] dark:text-gray-300 hover:bg-[#EEF2FF] hover:text-[#6366F1] dark:hover:bg-[#6366F1]/20 dark:hover:text-[#818CF8] hover:border-[#6366F1]/30 transition-all shadow-2xs"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/leakops"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="w-11 h-11 rounded-full bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 flex items-center justify-center text-[#6B7280] dark:text-gray-300 hover:bg-[#EEF2FF] hover:text-[#6366F1] dark:hover:bg-[#6366F1]/20 dark:hover:text-[#818CF8] hover:border-[#6366F1]/30 transition-all shadow-2xs"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Feedback Form Section */}
        <section id="feedback" className="pt-4">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#111827] dark:text-white">
              Have feedback or a feature request?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B7280] dark:text-gray-400">
              Tell us what&apos;s working, what&apos;s missing, or what&apos;s
              broken — we read every message.
            </p>
          </div>

          <Card padding="lg" className="max-w-[520px] mx-auto">
            {submitted ? (
              <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-[#10B981] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#111827] dark:text-white">
                  Thanks — we got it!
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 mt-1">
                  We appreciate your feedback and will review it closely.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs font-semibold text-[#6366F1] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#111827] dark:text-gray-200 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 rounded-lg text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#111827] dark:text-gray-200 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 rounded-lg text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#111827] dark:text-gray-200 mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 rounded-lg text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Feedback
                      </>
                    )}
                  </Button>
                </div>
                {error && (
                  <p
                    role="alert"
                    className="text-sm text-red-600 dark:text-red-400"
                  >
                    {error}
                  </p>
                )}
              </form>
            )}
          </Card>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

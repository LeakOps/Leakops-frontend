"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Clock,
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Sliders,
  Save,
} from "lucide-react";

export default function DunningPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [day1Timing, setDay1Timing] = useState("12"); // hours
  const [day3Timing, setDay3Timing] = useState("72"); // hours
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FB] dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex transition-colors">
      <div className="hidden md:block shrink-0">
        <Sidebar activeItem="Dunning" />
      </div>

      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-2xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-[270px] bg-white dark:bg-[#0B0F19] h-full shadow-2xl flex flex-col">
            <div className="p-4 flex justify-end">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar activeItem="Dunning" className="w-full border-r-0" />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-[76px] px-6 sm:px-8 bg-white dark:bg-[#0B0F19] border-b border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between sticky top-0 z-30 transition-colors">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-display font-bold text-lg sm:text-xl text-[#111827] dark:text-white">
                Dunning Sequences
              </h1>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 hidden sm:block">
                Intelligent retry timing and automated customer communications.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-display font-semibold text-xs shadow-sm">
                A
              </div>
              <span className="hidden xl:inline-block text-xs font-semibold text-[#111827] dark:text-gray-200">
                Alex Morgan
              </span>
              <ChevronDown className="w-3 h-3 text-[#6B7280] dark:text-gray-400 hidden xl:block" />
            </div>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-6 max-w-7xl w-full">
          {/* Visual Retry Timeline Card */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-base text-[#111827] dark:text-white">
                  Active Recovery Escalation Sequence
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Multi-channel sequence triggered when a subscription payment declines.
                </p>
              </div>
              <Badge variant="success" dot>
                Sequence Active
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Step 1 */}
              <div className="p-5 rounded-xl border border-[#6366F1]/30 bg-[#EEF2FF]/30 dark:bg-[#6366F1]/10 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#6366F1] text-white flex items-center justify-center font-bold text-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider">
                    Step 1 · Day 1
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-[#111827] dark:text-white">
                  Smart Retry + Branded Email
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                  Optimal timing retry based on card decline code. Sends gentle card update link.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#10B981] text-white flex items-center justify-center font-bold text-xs">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#10B981] uppercase tracking-wider">
                    Step 2 · Day 3
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-[#111827] dark:text-white">
                  SMS Nudge + Direct Update
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                  Sends 1-click mobile card update form with 3D Secure verification support.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    Step 3 · Day 5
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-[#111827] dark:text-white">
                  Team Alert &amp; Final Warning
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                  Escalates customer to customer-success channel before suspension.
                </p>
              </div>
            </div>
          </Card>

          {/* Active Dunning Sequences per customer */}
          <Card padding="none" className="overflow-hidden">
            <div className="p-6 border-b border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-[#111827] dark:text-white">
                  Active Sequences
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Customers currently going through the recovery sequence.
                </p>
              </div>
            </div>

            <div className="py-16 text-center">
              <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-display font-semibold text-base text-[#111827] dark:text-white">
                  No dunning sequences running yet.
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1 mb-4">
                  When a payment fails on your connected provider, LeakOps automatically begins recovery here.
                </p>
                <Link href="/onboarding/connect-payment">
                  <Button variant="outline" size="sm">
                    View Connected Gateways
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Editable Settings Panel */}
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-6">
              <Sliders className="w-5 h-5 text-[#6366F1]" />
              <h3 className="font-display font-bold text-base text-[#111827] dark:text-white">
                Dunning &amp; Escalation Settings
              </h3>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-[#111827] dark:text-gray-200 mb-1.5">
                    Initial Retry Delay (Hours)
                  </label>
                  <input
                    type="number"
                    value={day1Timing}
                    onChange={(e) => setDay1Timing(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 rounded-lg text-xs sm:text-sm text-[#111827] dark:text-white"
                  />
                  <span className="text-[11px] text-[#6B7280] dark:text-gray-500 mt-1 block">
                    Recommended: 12–24 hours after decline.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#111827] dark:text-gray-200 mb-1.5">
                    SMS Escalation Delay (Hours)
                  </label>
                  <input
                    type="number"
                    value={day3Timing}
                    onChange={(e) => setDay3Timing(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 rounded-lg text-xs sm:text-sm text-[#111827] dark:text-white"
                  />
                  <span className="text-[11px] text-[#6B7280] dark:text-gray-500 mt-1 block">
                    Trigger SMS if email unopened after 72 hours.
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB] dark:border-gray-800">
                <div>
                  <p className="text-xs font-semibold text-[#111827] dark:text-white">
                    Enable Automated SMS Nudges
                  </p>
                  <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                    Sends SMS with a secure one-tap payment update link.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={smsEnabled}
                  onChange={(e) => setSmsEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#6366F1] rounded border-gray-300 focus:ring-[#6366F1]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" variant="primary" size="md">
                  <Save className="w-4 h-4 mr-2" />
                  Save Sequence Configuration
                </Button>
                {savedSuccess && (
                  <span className="text-xs font-medium text-[#10B981] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Settings saved successfully
                  </span>
                )}
              </div>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
}

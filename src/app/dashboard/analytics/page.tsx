"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import {
  BarChart2,
  Calendar,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  Percent,
  CreditCard,
  DollarSign,
} from "lucide-react";

export default function AnalyticsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Last 30 days");
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  const ranges = [
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Last 12 months",
    "Year to date",
  ];

  return (
    <div className="min-h-screen bg-[#F5F6FB] dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex transition-colors">
      <div className="hidden md:block shrink-0">
        <Sidebar activeItem="Analytics" />
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
            <Sidebar activeItem="Analytics" className="w-full border-r-0" />
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
                Revenue Analytics
              </h1>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 hidden sm:block">
                Deep dive into recovered MRR, cohort salvage rates, and decline trends.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Custom Date-Range Picker Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-medium text-[#111827] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-2xs transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>{selectedRange}</span>
                <ChevronDown className="w-3 h-3 text-[#6B7280]" />
              </button>

              {dateDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl shadow-lg py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                  {ranges.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setSelectedRange(r);
                        setDateDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-[#111827] dark:text-gray-300 hover:bg-[#EEF2FF] dark:hover:bg-[#6366F1]/20 hover:text-[#6366F1] dark:hover:text-white transition-colors"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
          {/* Top KPI row (All zeroes for fresh account) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              icon={<DollarSign className="w-4 h-4" />}
              label="Net Recovered ARR"
              value="$0"
              trend="0%"
              trendDirection="neutral"
              caption="Annualized impact"
            />
            <StatCard
              icon={<Percent className="w-4 h-4" />}
              label="Overall Recovery Rate"
              value="0%"
              trend="0%"
              trendDirection="neutral"
              caption="vs. industry benchmark"
            />
            <StatCard
              icon={<CreditCard className="w-4 h-4" />}
              label="Involuntary Churn Prevented"
              value="$0"
              trend="0%"
              trendDirection="neutral"
              caption="Across active plans"
            />
            <StatCard
              icon={<TrendingUp className="w-4 h-4" />}
              label="Avg Time to Recovery"
              value="0d"
              trend="0%"
              trendDirection="neutral"
              caption="From first decline"
            />
          </div>

          {/* Revenue Recovery Trend Chart (Deeper version with empty state) */}
          <Card padding="lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display font-bold text-base text-[#111827] dark:text-white">
                  Revenue Recovery vs. Failed Billings Trend
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Daily comparison across the selected timeframe ({selectedRange}).
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span className="text-[#6B7280] dark:text-gray-300">Recovered ($)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
                  <span className="text-[#6B7280] dark:text-gray-300">Failed ($)</span>
                </div>
              </div>
            </div>

            {/* Flat Line Graph with Zero-State Overlay */}
            <div className="relative h-64 w-full flex items-end">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-400 dark:text-gray-600">
                <div className="border-b border-gray-100 dark:border-gray-800/80 w-full pb-1">
                  <span>$5,000</span>
                </div>
                <div className="border-b border-gray-100 dark:border-gray-800/80 w-full pb-1">
                  <span>$2,500</span>
                </div>
                <div className="border-b border-gray-100 dark:border-gray-800/80 w-full pb-1">
                  <span>$1,000</span>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-800 w-full pb-1 font-semibold text-gray-500">
                  <span>$0</span>
                </div>
              </div>

              <svg
                className="w-full h-full absolute inset-0 overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <line x1="0" y1="98" x2="100" y2="98" stroke="#10B981" strokeWidth="2.5" />
                <line x1="0" y1="98" x2="100" y2="98" stroke="#6366F1" strokeWidth="2.5" strokeDasharray="2 3" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/75 dark:bg-[#111827]/75 backdrop-blur-[2px] rounded-xl text-center p-6 z-10">
                <p className="text-xs sm:text-sm font-medium text-[#6B7280] dark:text-gray-300 max-w-sm">
                  No billing history recorded yet in {selectedRange}.
                </p>
                <Link
                  href="/onboarding/connect-payment"
                  className="mt-2 text-xs font-semibold text-[#6366F1] dark:text-[#818CF8] hover:underline"
                >
                  Connect Payment Provider →
                </Link>
              </div>
            </div>
          </Card>

          {/* Bottom Two Charts: Breakdown by Reason & Recovery Rate Over Time */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Breakdown by Reason */}
            <Card padding="lg">
              <h3 className="font-display font-bold text-base text-[#111827] dark:text-white mb-1">
                Decline Breakdown by Reason
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mb-6">
                Distribution of payment decline causes.
              </p>

              <div className="h-44 flex items-center justify-center text-center">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="14"
                      fill="none"
                      className="text-gray-200 dark:text-gray-800"
                    />
                  </svg>
                  <span className="absolute font-display font-bold text-base text-[#111827] dark:text-white">
                    0%
                  </span>
                </div>
              </div>
              <p className="text-center text-xs text-[#6B7280] dark:text-gray-500 mt-2">
                Awaiting first payment failure event.
              </p>
            </Card>

            {/* Recovery Rate Over Time Trend */}
            <Card padding="lg">
              <h3 className="font-display font-bold text-base text-[#111827] dark:text-white mb-1">
                Salvage Rate Over Time
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mb-6">
                Percentage of failed charges successfully recovered.
              </p>

              <div className="h-44 flex items-center justify-center text-center">
                <div className="space-y-2 max-w-xs">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mx-auto">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-[#111827] dark:text-white">
                    Zero churn data recorded
                  </p>
                  <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                    Rates will calculate dynamically as retries complete.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

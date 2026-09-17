"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import {
  CreditCard,
  Shield,
  Gift,
  Clock,
  ChevronDown,
  ChevronRight,
  Users,
  Link2,
  Inbox,
  Activity,
  Menu,
  X,
  Calendar,
} from "lucide-react";

export default function DashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Last 30 days");

  const ranges = ["Last 7 days", "Last 30 days", "Last 90 days", "Year to date"];

  return (
    <div className="min-h-screen bg-[#F5F6FB] dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex transition-colors">
      {/* Desktop Fixed Left Sidebar (~250px) */}
      <div className="hidden md:block shrink-0">
        <Sidebar activeItem="Dashboard" />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
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
            <Sidebar activeItem="Dashboard" className="w-full border-r-0" />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Main Content — Top Bar */}
        <header className="h-[76px] px-6 sm:px-8 bg-white dark:bg-[#0B0F19] border-b border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between sticky top-0 z-30 transition-colors">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Greeting */}
            <div>
              <h1 className="font-display font-bold text-lg sm:text-xl text-[#111827] dark:text-white flex items-center gap-1.5">
                Good morning, Alex <span className="inline-block animate-wave">👋</span>
              </h1>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 hidden sm:block">
                Here&apos;s what&apos;s happening with your revenue recovery.
              </p>
            </div>
          </div>

          {/* Right actions: date-range dropdown, theme toggle, avatar */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Date-range dropdown pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDateRangeOpen(!dateRangeOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-medium text-[#111827] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-2xs transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>{selectedRange}</span>
                <ChevronDown className="w-3 h-3 text-[#6B7280]" />
              </button>

              {dateRangeOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl shadow-lg py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                  {ranges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => {
                        setSelectedRange(range);
                        setDateRangeOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-[#111827] dark:text-gray-300 hover:bg-[#EEF2FF] dark:hover:bg-[#6366F1]/20 hover:text-[#6366F1] dark:hover:text-white transition-colors"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Avatar Dropdown */}
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

        {/* Dashboard Body Content */}
        <main className="p-6 sm:p-8 space-y-6 max-w-7xl w-full">
          {/* Stat cards row — 4 equal-width white cards (ALL VALUES ZERO) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Recovered Revenue */}
            <StatCard
              icon={<CreditCard className="w-4 h-4" />}
              label="Recovered Revenue"
              value="$0"
              trend="0%"
              trendDirection="neutral"
              caption="vs. previous 30 days"
            />

            {/* 2. Failed Payments */}
            <StatCard
              icon={<Shield className="w-4 h-4" />}
              label="Failed Payments"
              value="$0"
              trend="0%"
              trendDirection="neutral"
              caption="vs. previous 30 days"
            />

            {/* 3. Recovered Customers */}
            <StatCard
              icon={<Gift className="w-4 h-4" />}
              label="Recovered Customers"
              value="0"
              trend="0%"
              trendDirection="neutral"
              caption="vs. previous 30 days"
            />

            {/* 4. Success Rate */}
            <StatCard
              icon={<Clock className="w-4 h-4" />}
              label="Success Rate"
              value="0%"
              trend="0%"
              trendDirection="neutral"
              caption="vs. previous 30 days"
            />
          </div>

          {/* Middle row (two columns, left ≈65% / right ≈35%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Revenue Recovery Trend card (~65% -> 8 cols) */}
            <Card padding="md" className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#111827] dark:text-white">
                      Revenue Recovery Trend
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                      Recovered revenue vs. failed payments over the last 30 days.
                    </p>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 text-xs font-medium shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      <span className="text-[#6B7280] dark:text-gray-300">
                        Recovered Revenue
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
                      <span className="text-[#6B7280] dark:text-gray-300">
                        Failed Payments
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chart Area with Flat Lines and Overlay */}
                <div className="relative h-64 sm:h-72 w-full mt-6 flex items-end">
                  {/* Grid Lines & Labels */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-400 dark:text-gray-600">
                    <div className="border-b border-gray-100 dark:border-gray-800/80 w-full flex justify-between pb-1">
                      <span>$2,000</span>
                    </div>
                    <div className="border-b border-gray-100 dark:border-gray-800/80 w-full flex justify-between pb-1">
                      <span>$1,000</span>
                    </div>
                    <div className="border-b border-gray-100 dark:border-gray-800/80 w-full flex justify-between pb-1">
                      <span>$500</span>
                    </div>
                    <div className="border-b border-gray-200 dark:border-gray-800 w-full flex justify-between pb-1 font-semibold text-gray-500">
                      <span>$0</span>
                    </div>
                  </div>

                  {/* SVG Flat Lines */}
                  <svg
                    className="w-full h-full absolute inset-0 overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    {/* Both lines flat at $0 (y=98) */}
                    <line
                      x1="0"
                      y1="98"
                      x2="100"
                      y2="98"
                      stroke="#10B981"
                      strokeWidth="2.5"
                    />
                    <line
                      x1="0"
                      y1="98"
                      x2="100"
                      y2="98"
                      stroke="#6366F1"
                      strokeWidth="2.5"
                      strokeDasharray="2 3"
                    />
                  </svg>

                  {/* X-axis days label */}
                  <div className="absolute bottom-[-24px] inset-x-0 flex justify-between text-[11px] text-[#6B7280] dark:text-gray-500 pt-1">
                    <span>30 days ago</span>
                    <span>20 days ago</span>
                    <span>10 days ago</span>
                    <span>Today</span>
                  </div>

                  {/* Centered Empty-State Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-[#111827]/75 backdrop-blur-[2px] rounded-xl text-center p-6 z-10">
                    <p className="text-xs sm:text-sm font-medium text-[#6B7280] dark:text-gray-300 max-w-sm">
                      No data yet — connect your payment provider to start tracking
                      recoveries.
                    </p>
                    <Link
                      href="/onboarding/connect-payment"
                      className="mt-2.5 inline-flex items-center text-xs sm:text-sm font-semibold text-[#6366F1] dark:text-[#818CF8] hover:underline"
                    >
                      Connect Now →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="h-6" />
            </Card>

            {/* Right: Quick Actions card (~35% -> 4 cols) */}
            <Card padding="md" className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-[#111827] dark:text-white mb-4">
                  Quick Actions
                </h3>

                <div className="space-y-3">
                  {/* Row 1: View Failed Payments */}
                  <Link
                    href="/dashboard/recoveries"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5E7EB] dark:border-gray-800 hover:border-[#6366F1]/40 dark:hover:border-[#6366F1]/50 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <IconChip icon={<CreditCard className="w-4 h-4" />} size="sm" />
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm text-[#111827] dark:text-white group-hover:text-[#6366F1] transition-colors">
                          View Failed Payments
                        </h4>
                        <p className="text-[11px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                          See and manage failed transactions
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  {/* Row 2: View Customers */}
                  <Link
                    href="/dashboard/customers"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5E7EB] dark:border-gray-800 hover:border-[#6366F1]/40 dark:hover:border-[#6366F1]/50 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <IconChip icon={<Users className="w-4 h-4" />} size="sm" />
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm text-[#111827] dark:text-white group-hover:text-[#6366F1] transition-colors">
                          View Customers
                        </h4>
                        <p className="text-[11px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                          Browse recovered customers
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  {/* Row 3: Configure Webhooks */}
                  <Link
                    href="/dashboard/webhook-setup"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5E7EB] dark:border-gray-800 hover:border-[#6366F1]/40 dark:hover:border-[#6366F1]/50 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <IconChip icon={<Link2 className="w-4 h-4" />} size="sm" />
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm text-[#111827] dark:text-white group-hover:text-[#6366F1] transition-colors">
                          Configure Webhooks
                        </h4>
                        <p className="text-[11px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                          Set up payment event tracking
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Helper tip */}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] text-[#6B7280] dark:text-gray-400">
                Tip: Connecting webhooks enables real-time dunning sequences.
              </div>
            </Card>
          </div>

          {/* Bottom row (two columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Top Recovery Reasons card (4 cols on lg) */}
            <Card padding="md" className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-[#111827] dark:text-white">
                  Top Recovery Reasons
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5 mb-6">
                  Why payments were recovered.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                  {/* Empty gray donut ring */}
                  <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {/* Empty gray circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="currentColor"
                        strokeWidth="14"
                        fill="none"
                        className="text-gray-200 dark:text-gray-800"
                      />
                    </svg>
                    {/* Centered text: 0 bold + recovered small gray */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="font-display font-bold text-2xl text-[#111827] dark:text-white leading-none">
                        0
                      </span>
                      <span className="text-[11px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                        recovered
                      </span>
                    </div>
                  </div>

                  {/* Legend list with categories and 0% or — */}
                  <div className="space-y-2.5 w-full sm:w-auto text-xs">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[#111827] dark:text-gray-300">
                          Insufficient Funds
                        </span>
                      </div>
                      <span className="text-[#6B7280] dark:text-gray-400 font-medium">
                        0%
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-[#111827] dark:text-gray-300">
                          Card Expired
                        </span>
                      </div>
                      <span className="text-[#6B7280] dark:text-gray-400 font-medium">
                        0%
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span className="text-[#111827] dark:text-gray-300">
                          Fraud Protection
                        </span>
                      </div>
                      <span className="text-[#6B7280] dark:text-gray-400 font-medium">
                        0%
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-[#111827] dark:text-gray-300">
                          Customer Update
                        </span>
                      </div>
                      <span className="text-[#6B7280] dark:text-gray-400 font-medium">
                        0%
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-400" />
                        <span className="text-[#111827] dark:text-gray-300">Other</span>
                      </div>
                      <span className="text-[#6B7280] dark:text-gray-400 font-medium">
                        0%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-2" />
            </Card>

            {/* Right: Recent Recoveries table card (7 cols on lg) */}
            <Card padding="md" className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-base text-[#111827] dark:text-white">
                    Recent Recoveries
                  </h3>
                  <Link
                    href="/dashboard/recoveries"
                    className="text-xs font-semibold text-[#6366F1] dark:text-[#818CF8] hover:underline"
                  >
                    View all →
                  </Link>
                </div>

                {/* Table structure with header and empty state */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] dark:border-gray-800 text-[#6B7280] dark:text-gray-400 uppercase tracking-wider text-[10px]">
                        <th className="pb-2.5 font-semibold">Customer</th>
                        <th className="pb-2.5 font-semibold">Amount</th>
                        <th className="pb-2.5 font-semibold">Reason</th>
                        <th className="pb-2.5 font-semibold text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Empty state instead of rows */}
                      <tr>
                        <td colSpan={4} className="py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-3">
                              <Inbox className="w-5 h-5" />
                            </div>
                            <p className="font-semibold text-sm text-[#111827] dark:text-white">
                              No recoveries yet
                            </p>
                            <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                              Once payments are recovered, they&apos;ll show up here.
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="h-2" />
            </Card>
          </div>

          {/* Recent Activity card (list style) */}
          <Card padding="md" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-base text-[#111827] dark:text-white">
                Recent Activity
              </h3>
              <Link
                href="/dashboard#activity"
                className="text-xs font-semibold text-[#6366F1] dark:text-[#818CF8] hover:underline"
              >
                View all
              </Link>
            </div>

            {/* Empty state */}
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-3">
                <Activity className="w-5 h-5" />
              </div>
              <p className="font-semibold text-sm text-[#111827] dark:text-white">
                No activity yet.
              </p>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                Once you connect a payment provider, events will show up here.
              </p>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  RefreshCw,
  Search,
  Filter,
  Download,
  Calendar,
  ChevronDown,
  Menu,
  X,
  Inbox,
} from "lucide-react";

interface RecoveryItem {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: string;
  reason: "Insufficient Funds" | "Card Expired" | "Fraud Protection" | "Customer Update" | "Other";
  date: string;
}

export default function RecoveriesPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [reasonFilter, setReasonFilter] = useState("All");
  const [dateRange, setDateRange] = useState("Last 30 days");

  // Zero-data state for fresh account
  const recoveries: RecoveryItem[] = [];

  const handleExportCSV = () => {
    alert("Exporting CSV... (No records to export yet on fresh account)");
  };

  return (
    <div className="min-h-screen bg-[#F5F6FB] dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex transition-colors">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar activeItem="Recoveries" />
      </div>

      {/* Mobile Drawer Sidebar */}
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
            <Sidebar activeItem="Recoveries" className="w-full border-r-0" />
          </div>
        </div>
      )}

      {/* Main Content Area */}
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
                Recoveries
              </h1>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 hidden sm:block">
                All recovered invoices and resolved payment failures.
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
          {/* Action and Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by customer or invoice..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] shadow-2xs"
              />
            </div>

            {/* Filters: Reason, Date Range, Export */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Reason filter */}
              <div className="relative">
                <select
                  value={reasonFilter}
                  onChange={(e) => setReasonFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl text-xs font-medium text-[#111827] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] shadow-2xs cursor-pointer"
                >
                  <option value="All">All Reasons</option>
                  <option value="Insufficient Funds">Insufficient Funds</option>
                  <option value="Card Expired">Card Expired</option>
                  <option value="Fraud Protection">Fraud Protection</option>
                  <option value="Customer Update">Customer Update</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Date Range dropdown */}
              <div className="relative">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl text-xs font-medium text-[#111827] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] shadow-2xs cursor-pointer"
                >
                  <option value="Last 7 days">Last 7 days</option>
                  <option value="Last 30 days">Last 30 days</option>
                  <option value="Last 90 days">Last 90 days</option>
                  <option value="All time">All time</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Export CSV Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </Button>
            </div>
          </div>

          {/* Recoveries Table */}
          <Card padding="none" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50/70 dark:bg-gray-900/50 border-b border-[#E5E7EB] dark:border-gray-800 text-[#6B7280] dark:text-gray-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-6 font-semibold">Customer</th>
                    <th className="py-3 px-6 font-semibold">Amount</th>
                    <th className="py-3 px-6 font-semibold">Reason</th>
                    <th className="py-3 px-6 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] dark:divide-gray-800">
                  {recoveries.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-16 text-center">
                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-3">
                            <Inbox className="w-6 h-6" />
                          </div>
                          <h3 className="font-display font-semibold text-base text-[#111827] dark:text-white">
                            No recoveries yet
                          </h3>
                          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1 mb-5">
                            Once payments are recovered, they&apos;ll show up here with full event logs.
                          </p>
                          <Link href="/onboarding/connect-payment">
                            <Button variant="primary" size="sm" withArrow>
                              Connect Payment Gateway
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { api, DashboardPayment } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Search, Download, ChevronDown, Inbox, Loader2 } from "lucide-react";

export default function RecoveriesPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [payments, setPayments] = useState<DashboardPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const loadPayments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.getDashboardPayments();
      setPayments(res.payments || []);
    } catch (err) {
      console.error("Failed to load payments:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const handleExportCSV = async () => {
    try {
      setExporting(true);
      await api.downloadPaymentsCSV();
    } catch (err: any) {
      alert(err.message || "Failed to download CSV");
    } finally {
      setExporting(false);
    }
  };

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      !searchTerm ||
      p.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.customer_email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || p.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F5F6FB] dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex transition-colors">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar activeItem="Recoveries" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader
          title="Recoveries"
          subtitle="All recovered invoices and resolved payment failures."
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

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
                placeholder="Search by customer or email..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] shadow-2xs"
              />
            </div>

            {/* Filters: Status, Export */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Status filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl text-xs font-medium text-[#111827] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] shadow-2xs cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="recovered">Recovered</option>
                  <option value="retrying">Retrying</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Export CSV Button */}
              <Button
                variant="outline"
                size="sm"
                disabled={exporting}
                onClick={handleExportCSV}
                className="flex items-center gap-1.5"
              >
                {exporting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
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
                    <th className="py-3 px-6 font-semibold">Status</th>
                    <th className="py-3 px-6 font-semibold">Retries</th>
                    <th className="py-3 px-6 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] dark:divide-gray-800">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-16 text-center text-gray-500">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#6366F1] mb-2" />
                        <span>Loading recoveries…</span>
                      </td>
                    </tr>
                  ) : filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-16 text-center">
                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-3">
                            <Inbox className="w-6 h-6" />
                          </div>
                          <h3 className="font-display font-semibold text-base text-[#111827] dark:text-white">
                            No recoveries found
                          </h3>
                          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1 mb-5">
                            Once payment events occur, they will appear here in real time.
                          </p>
                          <Link href="/onboarding/connect-payment">
                            <Button variant="primary" size="sm" withArrow>
                              Connect Payment Gateway
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="py-3.5 px-6">
                          <div className="font-semibold text-[#111827] dark:text-white">
                            {p.customer_name || "Unknown"}
                          </div>
                          <div className="text-xs text-[#6B7280] dark:text-gray-400">
                            {p.customer_email}
                          </div>
                        </td>
                        <td className="py-3.5 px-6 font-semibold text-[#111827] dark:text-white">
                          {(p.amount_cents / 100).toLocaleString("en-US", {
                            style: "currency",
                            currency: p.currency || "USD",
                          })}
                        </td>
                        <td className="py-3.5 px-6">
                          <span
                            className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize",
                              p.status === "recovered"
                                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                : p.status === "retrying" || p.status === "pending"
                                ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                : "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-500/20"
                            )}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 text-[#6B7280] dark:text-gray-300">
                          {p.retry_count}
                        </td>
                        <td className="py-3.5 px-6 text-right text-[#6B7280] dark:text-gray-400">
                          {new Date(p.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

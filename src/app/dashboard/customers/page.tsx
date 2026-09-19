"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Users, Search, ChevronDown, Menu, X, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  plan: string;
  ltv: string;
  status: "Active" | "At Risk" | "Recovered" | "Churned";
  lastPaymentDate: string;
  paymentMethod: string;
  history: {
    date: string;
    amount: string;
    event: string;
    status: "success" | "failed" | "recovered";
  }[];
}

export default function CustomersPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerRecord | null>(null);

  // Since this is a fresh account without live webhook events, customers list defaults to empty state
  const customers: CustomerRecord[] = [];

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F5F6FB] dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex transition-colors">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar activeItem="Customers" />
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
            <Sidebar activeItem="Customers" className="w-full border-r-0" />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
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
                Customers
              </h1>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 hidden sm:block">
                Directory of customers seen across your connected gateways.
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

        {/* Body content */}
        <main className="p-6 sm:p-8 space-y-6 max-w-7xl w-full">
          {/* Controls Bar: Search + Status Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search customers by email, name..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] shadow-2xs"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-gray-800 rounded-xl shadow-2xs overflow-x-auto text-xs">
              {["All", "Active", "At Risk", "Recovered", "Churned"].map(
                (tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setStatusFilter(tab)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap",
                      statusFilter === tab
                        ? "bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-2xs"
                        : "text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white",
                    )}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Customers Table Card */}
          <Card padding="none" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50/70 dark:bg-gray-900/50 border-b border-[#E5E7EB] dark:border-gray-800 text-[#6B7280] dark:text-gray-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-6 font-semibold">Customer</th>
                    <th className="py-3 px-6 font-semibold">Plan</th>
                    <th className="py-3 px-6 font-semibold">Lifetime Value</th>
                    <th className="py-3 px-6 font-semibold">Status</th>
                    <th className="py-3 px-6 font-semibold text-right">
                      Last Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] dark:divide-gray-800">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-16 text-center">
                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-3">
                            <Users className="w-6 h-6" />
                          </div>
                          <h3 className="font-display font-semibold text-base text-[#111827] dark:text-white">
                            No customers yet
                          </h3>
                          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1 mb-5">
                            Once you connect a payment provider, they&apos;ll
                            show up here.
                          </p>
                          <Link href="/onboarding/connect-payment">
                            <Button variant="primary" size="sm" withArrow>
                              Connect Gateway
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((c) => (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedCustomer(c)}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#EEF2FF] dark:bg-[#6366F1]/20 text-[#6366F1] font-bold text-xs flex items-center justify-center">
                              {c.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-[#111827] dark:text-white">
                                {c.name}
                              </p>
                              <p className="text-xs text-[#6B7280] dark:text-gray-400">
                                {c.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-[#111827] dark:text-gray-300 font-medium">
                          {c.plan}
                        </td>
                        <td className="py-4 px-6 font-display font-bold text-[#111827] dark:text-white">
                          {c.ltv}
                        </td>
                        <td className="py-4 px-6">
                          <Badge
                            variant={
                              c.status === "Active"
                                ? "success"
                                : c.status === "Recovered"
                                  ? "indigo"
                                  : c.status === "At Risk"
                                    ? "warning"
                                    : "danger"
                            }
                            dot
                          >
                            {c.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-right text-[#6B7280] dark:text-gray-400 text-xs">
                          {c.lastPaymentDate}
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

      {/* Customer Detail Drawer Slide-over */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs animate-in fade-in"
            onClick={() => setSelectedCustomer(null)}
          />
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#111827] h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-display font-bold text-lg text-[#111827] dark:text-white">
                  Customer Details
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Profile info */}
              <div className="mt-6 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#6366F1] text-white font-display font-bold text-lg flex items-center justify-center shadow-sm">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#111827] dark:text-white">
                    {selectedCustomer.name}
                  </h4>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400">
                    {selectedCustomer.email}
                  </p>
                </div>
              </div>

              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                  <span className="text-[11px] text-[#6B7280] dark:text-gray-400 block">
                    Current Plan
                  </span>
                  <span className="font-semibold text-sm text-[#111827] dark:text-white">
                    {selectedCustomer.plan}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                  <span className="text-[11px] text-[#6B7280] dark:text-gray-400 block">
                    Lifetime Value
                  </span>
                  <span className="font-bold text-sm text-[#111827] dark:text-white">
                    {selectedCustomer.ltv}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6 p-4 rounded-xl border border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#6366F1]" />
                  <div>
                    <p className="text-xs font-semibold text-[#111827] dark:text-white">
                      Payment Method
                    </p>
                    <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                      {selectedCustomer.paymentMethod}
                    </p>
                  </div>
                </div>
                <Badge variant="indigo">Default</Badge>
              </div>

              {/* Recovery Timeline */}
              <div className="mt-8">
                <h5 className="font-display font-semibold text-xs uppercase tracking-wider text-[#6B7280] dark:text-gray-400 mb-4">
                  Recovery &amp; Payment History
                </h5>
                <div className="space-y-4 relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 pl-4">
                  {selectedCustomer.history.map((hist, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[22px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#6366F1] ring-4 ring-white dark:ring-[#111827]" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#111827] dark:text-white">
                          {hist.event}
                        </span>
                        <span className="text-[11px] text-[#6B7280] dark:text-gray-400">
                          {hist.date}
                        </span>
                      </div>
                      <span className="text-xs text-[#6B7280] dark:text-gray-400 font-medium">
                        {hist.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={() => setSelectedCustomer(null)}
              >
                Close Drawer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

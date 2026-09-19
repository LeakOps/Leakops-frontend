"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Tag,
  ShieldAlert,
  ChevronDown,
  Menu,
  X,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function CouponsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [maxCodePerCard, setMaxCodePerCard] = useState("1");
  const [blockStackedCoupons, setBlockStackedCoupons] = useState(true);
  const [flagCrossAccountReuse, setFlagCrossAccountReuse] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Empty state for brand new account
  const monitoredCoupons: {
    code: string;
    timesUsed: number;
    uniqueCustomers: number;
    flaggedCount: number;
  }[] = [];

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FB] dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex transition-colors">
      <div className="hidden md:block shrink-0">
        <Sidebar activeItem="Coupons" />
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
            <Sidebar activeItem="Coupons" className="w-full border-r-0" />
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
                Coupon Abuse Detection
              </h1>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 hidden sm:block">
                Monitor promotional discount redemptions and protect margins.
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
          {/* Coupon codes table */}
          <Card padding="none" className="overflow-hidden">
            <div className="p-6 border-b border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-[#111827] dark:text-white">
                  Monitored Coupons
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Coupon usage synced automatically from your payment gateway.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50/70 dark:bg-gray-900/50 border-b border-[#E5E7EB] dark:border-gray-800 text-[#6B7280] dark:text-gray-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-6 font-semibold">Code</th>
                    <th className="py-3 px-6 font-semibold">Times Used</th>
                    <th className="py-3 px-6 font-semibold">
                      Unique Customers
                    </th>
                    <th className="py-3 px-6 font-semibold text-right">
                      Flagged Usage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] dark:divide-gray-800">
                  {monitoredCoupons.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-16 text-center">
                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-3">
                            <Tag className="w-6 h-6" />
                          </div>
                          <h4 className="font-display font-semibold text-base text-[#111827] dark:text-white">
                            No coupon activity detected yet.
                          </h4>
                          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                            Discounts redeemed on your connected gateway will be
                            monitored here.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Abuse Rules Settings Panel */}
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-6">
              <ShieldAlert className="w-5 h-5 text-[#6366F1]" />
              <h3 className="font-display font-bold text-base text-[#111827] dark:text-white">
                Abuse Prevention Rules
              </h3>
            </div>

            <form onSubmit={handleSaveRules} className="space-y-5 max-w-2xl">
              <div>
                <label className="block text-xs font-medium text-[#111827] dark:text-gray-200 mb-1.5">
                  Max Codes per Credit Card
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={maxCodePerCard}
                  onChange={(e) => setMaxCodePerCard(e.target.value)}
                  className="w-full sm:w-48 px-3.5 py-2 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 rounded-lg text-xs sm:text-sm text-[#111827] dark:text-white"
                />
                <span className="text-[11px] text-[#6B7280] dark:text-gray-500 mt-1 block">
                  Flag transaction if the same card fingerprint redeems 2+
                  promotional codes.
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB] dark:border-gray-800">
                  <div>
                    <p className="text-xs font-semibold text-[#111827] dark:text-white">
                      Block Coupon Stacking
                    </p>
                    <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                      Prevent multiple active discount subscriptions on one
                      customer ID.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={blockStackedCoupons}
                    onChange={(e) => setBlockStackedCoupons(e.target.checked)}
                    className="w-4 h-4 text-[#6366F1] rounded border-gray-300 focus:ring-[#6366F1]"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB] dark:border-gray-800">
                  <div>
                    <p className="text-xs font-semibold text-[#111827] dark:text-white">
                      Cross-Account Reuse Detection
                    </p>
                    <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                      Detect when unique accounts use matching billing addresses
                      or device fingerprints.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={flagCrossAccountReuse}
                    onChange={(e) => setFlagCrossAccountReuse(e.target.checked)}
                    className="w-4 h-4 text-[#6366F1] rounded border-gray-300 focus:ring-[#6366F1]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <Button type="submit" variant="primary" size="md">
                  <Save className="w-4 h-4 mr-2" />
                  Save Protection Rules
                </Button>
                {savedSuccess && (
                  <span className="text-xs font-medium text-[#10B981] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Rules updated
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

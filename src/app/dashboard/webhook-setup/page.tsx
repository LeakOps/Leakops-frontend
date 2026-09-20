"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { api, GatewayAccount } from "@/lib/api";
import {
  RefreshCw,
  Trash2,
  Activity,
  Plus,
  ChevronDown,
  Menu,
  X,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function WebhookSetupPage() {
  const { user } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [gateways, setGateways] = useState<GatewayAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [events] = useState<
    {
      id: string;
      timestamp: string;
      type: string;
      status: "200 OK" | "400 Failed";
      gateway: string;
    }[]
  >([]);

  const loadGateways = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getGateways();
      setGateways(res.gateways || []);
    } catch (err: any) {
      setError(err.message || "Failed to load connected gateways");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGateways();
  }, [loadGateways]);

  const handleDisconnect = async (id: string) => {
    if (!confirm("Are you sure you want to disconnect this gateway webhook?")) return;
    try {
      setActionLoading(id);
      await api.disconnectGateway(id);
      setGateways((prev) => prev.filter((g) => g.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to disconnect gateway");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReconnect = () => {
    loadGateways();
  };

  return (
    <div className="min-h-screen bg-[#F5F6FB] dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex transition-colors">
      <div className="hidden md:block shrink-0">
        <Sidebar activeItem="Webhook Setup" />
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
            <Sidebar activeItem="Webhook Setup" className="w-full border-r-0" />
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
                Webhook Configuration
              </h1>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 hidden sm:block">
                Manage automated webhook listeners and incoming event
                subscriptions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {user?.profile_picture_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.profile_picture_url}
                  alt={user?.name || "Account"}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-display font-semibold text-xs shadow-sm">
                  {(user?.name || "A").charAt(0).toUpperCase()}
                </div>
              )}
              <span className="hidden xl:inline-block text-xs font-semibold text-[#111827] dark:text-gray-200">
                {user?.name || "Account"}
              </span>
            </Link>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-6 max-w-7xl w-full">
          {/* Connected Gateways Card */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-base text-[#111827] dark:text-white">
                  Connected Gateways
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Webhooks configured and actively monitored by LeakOps.
                </p>
              </div>

              <Link href="/onboarding/connect-payment">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Connect Another Gateway</span>
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <Loader2 className="w-6 h-6 animate-spin text-[#6366F1] mb-2" />
                <p className="text-xs text-[#6B7280] dark:text-gray-400">Loading gateways…</p>
              </div>
            ) : error ? (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-center">
                <p className="text-xs text-red-600 dark:text-red-400 mb-2">{error}</p>
                <Button variant="outline" size="sm" onClick={loadGateways}>
                  Retry
                </Button>
              </div>
            ) : gateways.length === 0 ? (
              <div className="py-10 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h4 className="font-semibold text-sm text-[#111827] dark:text-white">
                  No gateway connected yet
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1 mb-4">
                  Connect Stripe or Dodo to begin receiving automated recovery
                  webhooks.
                </p>
                <Link href="/onboarding/connect-payment">
                  <Button variant="primary" size="sm" withArrow>
                    Go to Onboarding
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {gateways.map((gw) => {
                  const providerName = gw.gateway_type === "dodo" ? "Dodo Payments" : "Stripe";
                  return (
                    <div
                      key={gw.id}
                      className="p-5 rounded-xl border border-[#E5E7EB] dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-display font-bold text-base text-[#111827] dark:text-white">
                            {providerName}
                          </span>
                          <Badge variant={gw.is_active ? "success" : "neutral"} dot>
                            {gw.is_active ? "Connected" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-xs text-[#6B7280] dark:text-gray-400 font-mono">
                          API Key: •••• {gw.last_four || "••••"}
                        </p>
                        {gw.connected_at && (
                          <p className="text-[11px] text-[#6B7280] dark:text-gray-500">
                            Connected on: {new Date(gw.connected_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleReconnect}
                          className="flex items-center gap-1 text-xs"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Refresh</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={actionLoading === gw.id}
                          onClick={() => handleDisconnect(gw.id)}
                          className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                        >
                          {actionLoading === gw.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          <span>Disconnect</span>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Raw Webhook Event Log Card */}
          <Card padding="none" className="overflow-hidden">
            <div className="p-6 border-b border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-[#111827] dark:text-white">
                  Raw Webhook Event Stream
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                  Real-time payload receipts (e.g. charge.failed,
                  invoice.payment_failed).
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50/70 dark:bg-gray-900/50 border-b border-[#E5E7EB] dark:border-gray-800 text-[#6B7280] dark:text-gray-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-6 font-semibold">Event Type</th>
                    <th className="py-3 px-6 font-semibold">Gateway</th>
                    <th className="py-3 px-6 font-semibold">Status</th>
                    <th className="py-3 px-6 font-semibold text-right">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] dark:divide-gray-800">
                  {events.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-16 text-center">
                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-3">
                            <Activity className="w-6 h-6" />
                          </div>
                          <h4 className="font-display font-semibold text-base text-[#111827] dark:text-white">
                            No webhook events logged yet
                          </h4>
                          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                            Events like{" "}
                            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                              charge.failed
                            </code>{" "}
                            or{" "}
                            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                              customer.subscription.updated
                            </code>{" "}
                            will stream here in real time.
                          </p>
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

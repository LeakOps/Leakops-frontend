"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Settings,
  User,
  CreditCard,
  Users,
  Bell,
  AlertTriangle,
  ChevronDown,
  Menu,
  X,
  Save,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "billing" | "team" | "notifications" | "danger"
  >("profile");

  // Profile form state
  const [name, setName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex@saasstartup.com");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // Team state
  const [inviteEmail, setInviteEmail] = useState("");
  const [teamMembers, setTeamMembers] = useState([
    { name: "Alex Morgan", email: "alex@saasstartup.com", role: "Owner" },
  ]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setTeamMembers((prev) => [
      ...prev,
      { name: inviteEmail.split("@")[0], email: inviteEmail, role: "Member" },
    ]);
    setInviteEmail("");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "team", label: "Team", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6FB] dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex transition-colors">
      <div className="hidden md:block shrink-0">
        <Sidebar activeItem="Settings" />
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
            <Sidebar activeItem="Settings" className="w-full border-r-0" />
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
                Account Settings
              </h1>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 hidden sm:block">
                Manage your personal profile, team access, alerts, and subscription.
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

        <main className="p-6 sm:p-8 max-w-5xl w-full space-y-6">
          {/* Settings Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#E5E7EB] dark:border-gray-800 pb-3 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-white dark:bg-[#111827] text-[#111827] dark:text-white shadow-2xs font-semibold border border-[#E5E7EB] dark:border-gray-700"
                      : "text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Profile */}
          {activeTab === "profile" && (
            <Card padding="lg">
              <h3 className="font-display font-bold text-base text-[#111827] dark:text-white mb-6">
                Personal Profile
              </h3>

              <form onSubmit={handleSaveProfile} className="space-y-6 max-w-md">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#6366F1] text-white font-display font-bold text-2xl flex items-center justify-center shadow-md">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <Button variant="outline" size="sm" type="button">
                      Change Avatar
                    </Button>
                    <p className="text-[11px] text-[#6B7280] dark:text-gray-500 mt-1">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#111827] dark:text-gray-200 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 rounded-lg text-xs sm:text-sm text-[#111827] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#111827] dark:text-gray-200 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 rounded-lg text-xs sm:text-sm text-[#111827] dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" variant="primary" size="md">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  {saveSuccess && (
                    <span className="text-xs font-medium text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Saved
                    </span>
                  )}
                </div>
              </form>
            </Card>
          )}

          {/* Tab 2: Billing */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <Card padding="lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6366F1]">
                      Current Plan
                    </span>
                    <h3 className="font-display font-bold text-xl text-[#111827] dark:text-white mt-0.5">
                      Growth Plan ($49/month)
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                      Tracks up to $25k recovered revenue per month with advanced recovery rules.
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Link href="/pricing">
                      <Button variant="outline" size="sm">
                        Upgrade / Change Plan
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              <Card padding="none" className="overflow-hidden">
                <div className="p-6 border-b border-[#E5E7EB] dark:border-gray-800">
                  <h4 className="font-display font-bold text-sm text-[#111827] dark:text-white">
                    Invoice History
                  </h4>
                </div>
                <div className="p-8 text-center text-xs text-[#6B7280] dark:text-gray-400">
                  No invoices generated yet during your 30-day free trial.
                </div>
              </Card>
            </div>
          )}

          {/* Tab 3: Team */}
          {activeTab === "team" && (
            <Card padding="lg">
              <h3 className="font-display font-bold text-base text-[#111827] dark:text-white mb-2">
                Team Members
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mb-6">
                Invite team members to monitor payment recovery and configure webhooks.
              </p>

              <form onSubmit={handleInvite} className="flex gap-3 max-w-md mb-8">
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="teammate@company.com"
                  className="flex-1 px-3.5 py-2 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 rounded-lg text-xs sm:text-sm text-[#111827] dark:text-white placeholder-gray-400"
                />
                <Button type="submit" variant="primary" size="sm">
                  Invite Teammate
                </Button>
              </form>

              <div className="divide-y divide-[#E5E7EB] dark:divide-gray-800 border-t border-[#E5E7EB] dark:border-gray-800 pt-2">
                {teamMembers.map((member, i) => (
                  <div key={i} className="py-3.5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-[#111827] dark:text-white">
                        {member.name}
                      </p>
                      <p className="text-xs text-[#6B7280] dark:text-gray-400">
                        {member.email}
                      </p>
                    </div>
                    <Badge variant={member.role === "Owner" ? "indigo" : "neutral"}>
                      {member.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Tab 4: Notifications */}
          {activeTab === "notifications" && (
            <Card padding="lg">
              <h3 className="font-display font-bold text-base text-[#111827] dark:text-white mb-2">
                Alert Preferences
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mb-6">
                Choose how and when you want to be alerted about revenue recovery events.
              </p>

              <div className="space-y-4 max-w-xl">
                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB] dark:border-gray-800">
                  <div>
                    <p className="text-xs font-semibold text-[#111827] dark:text-white">
                      Instant Failed Payment Alerts
                    </p>
                    <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                      Receive an immediate email notification when a high-value charge fails.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-4 h-4 text-[#6366F1] rounded border-gray-300"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB] dark:border-gray-800">
                  <div>
                    <p className="text-xs font-semibold text-[#111827] dark:text-white">
                      SMS Escalation Notifications
                    </p>
                    <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                      Send urgent alerts to founder phone when customer reaches final dunning step.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="w-4 h-4 text-[#6366F1] rounded border-gray-300"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB] dark:border-gray-800">
                  <div>
                    <p className="text-xs font-semibold text-[#111827] dark:text-white">
                      Weekly Revenue Digest
                    </p>
                    <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                      Summary of recovered revenue, saved customers, and coupon flags.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={weeklyDigest}
                    onChange={(e) => setWeeklyDigest(e.target.checked)}
                    className="w-4 h-4 text-[#6366F1] rounded border-gray-300"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Tab 5: Danger Zone */}
          {activeTab === "danger" && (
            <Card padding="lg" className="border-rose-200 dark:border-rose-950/60">
              <h3 className="font-display font-bold text-base text-rose-600 mb-2">
                Danger Zone
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mb-6">
                Irreversible actions related to your account and payment gateways.
              </p>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-rose-100 dark:border-rose-950/40 bg-rose-50/30 dark:bg-rose-950/10">
                  <div>
                    <p className="text-xs font-semibold text-[#111827] dark:text-white">
                      Disconnect All Gateways
                    </p>
                    <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                      Stops listening to payment events and deactivates automated dunning.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => confirm("Disconnect all payment webhooks?")}
                    className="text-rose-600 border-rose-200 hover:bg-rose-50 dark:border-rose-900"
                  >
                    Disconnect Gateways
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-rose-100 dark:border-rose-950/40 bg-rose-50/30 dark:bg-rose-950/10">
                  <div>
                    <p className="text-xs font-semibold text-[#111827] dark:text-white">
                      Delete Account
                    </p>
                    <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                      Permanently delete your LeakOps account and all associated recovery logs.
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => confirm("Are you sure you want to permanently delete your account?")}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}

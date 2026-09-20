'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/Logo';

export default function BillingSuccessPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-6">
        <Logo size="lg" />
      </div>

      <div className="max-w-md w-full p-8 sm:p-10 bg-white dark:bg-[#111827] rounded-2xl border border-[#E5E7EB] dark:border-gray-800 shadow-xl">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border-2 border-[#10B981] flex items-center justify-center text-[#10B981]">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <h2 className="font-display font-bold text-2xl text-[#111827] dark:text-white mb-2">
          Subscription Activated!
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-gray-300 mb-8 leading-relaxed">
          Your payment was processed successfully. Your account has been upgraded with automated recovery infrastructure.
        </p>

        <Link href="/dashboard" className="w-full block">
          <Button variant="primary" size="lg" withArrow className="w-full">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { getToken } from '@/lib/api';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoading, token } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existingToken = getToken();
    if (!existingToken) {
      router.replace('/login');
    }
  }, [router]);

  useEffect(() => {
    if (mounted && !isLoading && !token) {
      router.replace('/login');
    }
  }, [mounted, isLoading, token, router]);

  // While checking auth status or when unauthenticated, do not mount protected content
  if (!mounted || isLoading || !getToken()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F6FB] dark:bg-[#0B0F19]">
        <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

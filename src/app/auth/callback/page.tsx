'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuthToken } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const err = searchParams.get('error');

    if (err) {
      setError(decodeURIComponent(err));
      return;
    }

    if (!token) {
      setError('No authentication token received.');
      return;
    }

    setAuthToken(token)
      .then(() => {
        router.replace('/dashboard');
      })
      .catch((e) => {
        setError(e.message || 'Failed to authenticate session.');
      });
  }, [searchParams, setAuthToken, router]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-[#0B0F19] p-4 text-center">
        <div className="max-w-md w-full p-8 bg-white dark:bg-[#111827] rounded-xl border border-red-200 dark:border-red-900/50 shadow-sm">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-display">Authentication Failed</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-[#0B0F19] p-4 text-center">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white font-display">Signing you in...</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Completing authentication and redirecting to your dashboard.</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-[#0B0F19] p-4 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}

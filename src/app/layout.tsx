import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/lib/auth";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LeakOps — Payment Recovery Infrastructure for SaaS",
  description:
    "Recover lost revenue from failed payments, dunning, proration errors, coupon abuse and more automatically.",
  icons: {
    icon: {
      url: "/favicon.png",
      type: "image/png",
    },
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#111827] dark:text-[#F9FAFB] font-sans antialiased selection:bg-[#6366F1] selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

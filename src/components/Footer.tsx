import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./SocialIcons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0B0E1A] text-gray-300 border-t border-gray-800/80 pt-16 pb-12 px-6 sm:px-10 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14">
          {/* Column 1 — Brand (widest column, 5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4">
            <Logo size="md" whiteText={true} />

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Stop guessing where your revenue is leaking.
            </p>

            <div className="pt-1 text-xs text-gray-400 flex items-center gap-1.5">
              <span>Questions? Email</span>
              <a
                href="mailto:adityawork0811@gmail.com"
                className="text-white hover:text-[#818CF8] font-medium underline underline-offset-2 transition-colors inline-flex items-center gap-1"
              >
                <Mail className="w-3 h-3 inline" />
                adityawork0811@gmail.com
              </a>
            </div>

            {/* Social Icons row */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://github.com/leakops"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-full border border-gray-700/80 bg-gray-900/60 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 hover:bg-[#6366F1]/20 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-singh0811b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-gray-700/80 bg-gray-900/60 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 hover:bg-[#6366F1]/20 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/AdityaS888"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="w-8 h-8 rounded-full border border-gray-700/80 bg-gray-900/60 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 hover:bg-[#6366F1]/20 transition-all"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap items-center gap-4 dark:hidden">
                <a
                  href="https://launchbuff.com/products/leakops-rlvuk8"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Featured on LaunchBuff"
                >
                  <img
                    src="https://launchbuff.com/badge-featured-light.svg"
                    alt="Featured on LaunchBuff"
                    width={256}
                    height={80}
                  />
                </a>
                <a
                  href="https://www.producthunt.com/products/leakops?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-leakops"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="LeakOps - Your SaaS revenue is leaking. Find it. Fix it. | Product Hunt"
                    width={250}
                    height={54}
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1256832&amp;theme=light&amp;t=1789996901976"
                  />
                </a>
              </div>

              <div className="hidden flex-wrap items-center gap-4 dark:flex">
                <a
                  href="https://launchbuff.com/products/leakops-rlvuk8"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Featured on LaunchBuff"
                >
                  <img
                    src="https://launchbuff.com/badge-featured-dark.svg"
                    alt="Featured on LaunchBuff"
                    width={256}
                    height={80}
                  />
                </a>
                <a
                  href="https://www.producthunt.com/products/leakops?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-leakops"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="LeakOps - Your SaaS revenue is leaking. Find it. Fix it. | Product Hunt"
                    width={250}
                    height={54}
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1256832&amp;theme=dark&amp;t=1789996418107"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 — Product (2 or 3 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              PRODUCT
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/#features"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/dunning"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Dunning
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/coupons"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Coupons
                </Link>
              </li>
              <li>
                <Link
                  href="/onboarding/connect-payment"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/about#feedback"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Legal */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              LEGAL
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800/80 text-center">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} LeakOps. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

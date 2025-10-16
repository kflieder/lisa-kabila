import type { Metadata } from "next";
import Link from "next/link";

// src/app/success/page.tsx

export const metadata: Metadata = {
  title: "Payment Success",
  description: "Thank you for your purchase",
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center px-6 py-16">
      <div className="relative w-full max-w-xl text-center">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/40 blur-3xl" />
          <div className="absolute left-0 bottom-0 h-56 w-56 rounded-full bg-indigo-300/30 blur-3xl" />
          <div className="absolute right-0 top-10 h-40 w-40 rounded-full bg-pink-300/30 blur-3xl" />
        </div>

        <div className="rounded-2xl border border-black/5 bg-white/70 p-10 shadow-2xl backdrop-blur-md dark:bg-gray-900/60">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-9 w-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 7L9 18l-5-5" />
            </svg>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Thank you for your purchase!
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Your payment was successful. A confirmation email is on its way.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Return Home
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
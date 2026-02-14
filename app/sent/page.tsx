"use client";

import { motion } from "framer-motion";
import HeartParticles from "@/components/HeartParticles";
import Link from "next/link";

export default function SentPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-5">
      <HeartParticles count={12} />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-rose-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-gold-light/20 blur-3xl" />

      <motion.div
        className="glass-card relative z-10 flex max-w-md flex-col items-center gap-6 rounded-3xl p-8 text-center sm:p-12"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated envelope */}
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: [0, -8, 0], opacity: 1 }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.5 },
          }}
        >
          <svg width="72" height="56" viewBox="0 0 72 56" fill="none">
            <rect x="2" y="10" width="68" height="44" rx="6" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
            <path d="M2 16 L36 38 L70 16" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M36 2 C36 2 28 -4 28 4 C28 8 36 14 36 14 C36 14 44 8 44 4 C44 -4 36 2 36 2Z" fill="#e11d48" />
          </svg>
        </motion.div>

        <motion.h1
          className="font-display text-3xl font-bold text-rose-900 sm:text-4xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Valentine Sent
        </motion.h1>

        <motion.p
          className="font-body text-lg leading-relaxed text-rose-700/70"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          Your message has been delivered. Now we wait for their sweet
          response!
        </motion.p>

        <motion.p
          className="font-body text-sm text-rose-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ delay: 0.5, duration: 3, repeat: Infinity }}
        >
          You&apos;ll get an email when they respond
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-block rounded-full border border-rose-200 px-6 py-2.5 font-display text-sm font-medium text-rose-700 transition-all duration-300 hover:border-rose-300 hover:bg-rose-50"
          >
            Send Another
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}

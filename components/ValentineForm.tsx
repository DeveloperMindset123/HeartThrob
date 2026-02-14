"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const fadeSlide = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ValentineForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    recipientEmail: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        const detail = data.details ? ` (${data.details})` : "";
        throw new Error((data.error || "Failed to send") + detail);
      }

      router.push("/sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-card mx-auto w-full max-w-md space-y-5 rounded-2xl p-6 sm:p-8"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeSlide}>
        <label
          htmlFor="senderName"
          className="mb-1.5 block font-display text-sm font-semibold text-rose-900"
        >
          Your Name
        </label>
        <input
          id="senderName"
          type="text"
          required
          maxLength={100}
          placeholder="Enter your name"
          className="w-full rounded-xl border border-rose-200/60 bg-white/60 px-4 py-3 font-body text-rose-900 placeholder-rose-300 outline-none transition-all duration-300 focus:border-rose-400 focus:bg-white/80 focus:ring-2 focus:ring-rose-200/50"
          value={formData.senderName}
          onChange={(e) =>
            setFormData({ ...formData, senderName: e.target.value })
          }
        />
      </motion.div>

      <motion.div variants={fadeSlide}>
        <label
          htmlFor="senderEmail"
          className="mb-1.5 block font-display text-sm font-semibold text-rose-900"
        >
          Your Email
        </label>
        <input
          id="senderEmail"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-rose-200/60 bg-white/60 px-4 py-3 font-body text-rose-900 placeholder-rose-300 outline-none transition-all duration-300 focus:border-rose-400 focus:bg-white/80 focus:ring-2 focus:ring-rose-200/50"
          value={formData.senderEmail}
          onChange={(e) =>
            setFormData({ ...formData, senderEmail: e.target.value })
          }
        />
      </motion.div>

      <motion.div variants={fadeSlide}>
        <label
          htmlFor="recipientEmail"
          className="mb-1.5 block font-display text-sm font-semibold text-rose-900"
        >
          Their Email
        </label>
        <input
          id="recipientEmail"
          type="email"
          required
          placeholder="someone-special@example.com"
          className="w-full rounded-xl border border-rose-200/60 bg-white/60 px-4 py-3 font-body text-rose-900 placeholder-rose-300 outline-none transition-all duration-300 focus:border-rose-400 focus:bg-white/80 focus:ring-2 focus:ring-rose-200/50"
          value={formData.recipientEmail}
          onChange={(e) =>
            setFormData({ ...formData, recipientEmail: e.target.value })
          }
        />
      </motion.div>

      <motion.div variants={fadeSlide}>
        <label
          htmlFor="message"
          className="mb-1.5 block font-display text-sm font-semibold text-rose-900"
        >
          Your Message
        </label>
        <textarea
          id="message"
          required
          maxLength={500}
          rows={4}
          placeholder="Write something from the heart..."
          className="w-full resize-none rounded-xl border border-rose-200/60 bg-white/60 px-4 py-3 font-body text-rose-900 placeholder-rose-300 outline-none transition-all duration-300 focus:border-rose-400 focus:bg-white/80 focus:ring-2 focus:ring-rose-200/50"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
        <p className="mt-1 text-right font-body text-xs text-rose-300">
          {formData.message.length}/500
        </p>
      </motion.div>

      {error && (
        <motion.div
          className="rounded-xl border border-red-200 bg-red-50/80 p-3 text-center font-body text-sm text-red-600"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {error}
        </motion.div>
      )}

      <motion.div variants={fadeSlide}>
        <motion.button
          type="submit"
          disabled={loading}
          className="btn-glow w-full rounded-full bg-gradient-to-r from-rose-600 to-rose-500 py-3.5 font-display text-lg font-semibold text-white shadow-lg shadow-rose-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/30 disabled:opacity-60"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                {"\u{1F48C}"}
              </motion.span>
              Sending...
            </span>
          ) : (
            "Send My Valentine"
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}

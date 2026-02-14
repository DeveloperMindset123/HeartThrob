"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import CatSVG from "./cats/CatSVG";

export default function CelebrationScene() {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ["#e11d48", "#fb7185", "#fda4af", "#fecdd3", "#d4a574"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <div className="relative flex items-center gap-0">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <CatSVG mood="love" size={110} color="#e11d48" />
        </motion.div>
        <motion.div
          className="z-10 -mx-3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 1], opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <svg width="36" height="32" viewBox="0 0 40 36" fill="none">
            <path
              d="M20 36 C20 36 0 22 0 10 C0 4 4 0 10 0 C14 0 18 3 20 6 C22 3 26 0 30 0 C36 0 40 4 40 10 C40 22 20 36 20 36Z"
              fill="#e11d48"
            />
          </svg>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <CatSVG mood="love" size={110} color="#fb7185" flip />
        </motion.div>
      </div>

      <motion.h2
        className="font-display text-4xl font-bold text-rose-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        It&apos;s a match!
      </motion.h2>

      <motion.p
        className="font-body text-lg text-rose-700/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Happy Valentine&apos;s Day!
      </motion.p>

      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{
            left: `${15 + (i / 8) * 70}%`,
            top: `${10 + (i % 3) * 25}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 0], opacity: [0, 0.6, 0], y: [0, -40] }}
          transition={{ delay: 0.5 + i * 0.2, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <svg width="16" height="14" viewBox="0 0 40 36" fill="none">
            <path
              d="M20 36 C20 36 0 22 0 10 C0 4 4 0 10 0 C14 0 18 3 20 6 C22 3 26 0 30 0 C36 0 40 4 40 10 C40 22 20 36 20 36Z"
              fill={["#e11d48", "#fb7185", "#fda4af", "#d4a574"][i % 4]}
            />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
}

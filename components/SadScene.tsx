"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CatSVG from "./cats/CatSVG";

export default function SadScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <CatSVG mood="sad" size={130} color="#d4a0aa" />
      </motion.div>

      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="44" height="40" viewBox="0 0 44 40" fill="none">
          <motion.path
            d="M22 40 C22 40 0 24 0 11 C0 5 4.5 0 11 0 C15.5 0 19.5 3 22 7 L22 40Z"
            fill="#be123c"
            initial={{ x: 0, rotate: 0 }}
            animate={{ x: -3, rotate: -5 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.path
            d="M22 40 C22 40 44 24 44 11 C44 5 39.5 0 33 0 C28.5 0 24.5 3 22 7 L22 40Z"
            fill="#be123c"
            initial={{ x: 0, rotate: 0 }}
            animate={{ x: 3, rotate: 5 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.path
            d="M22 7 L20 15 L24 22 L21 30 L22 40"
            fill="none"
            stroke="#fff1f2"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </svg>
      </motion.div>

      <motion.h2
        className="font-display text-3xl font-bold text-rose-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Maybe next time...
      </motion.h2>

      <motion.p
        className="font-body text-lg text-rose-600/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        The kitty will be okay... eventually
      </motion.p>

      {mounted && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${(i / 20) * 100}%`, top: "-10px" }}
              animate={{ y: [0, window.innerHeight + 20] }}
              transition={{
                duration: 0.8 + Math.random() * 0.6,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            >
              <svg width="2" height="12" viewBox="0 0 2 12">
                <rect width="2" height="12" rx="1" fill="#93c5fd" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

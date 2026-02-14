"use client";

import { motion } from "framer-motion";
import CatBodySVG from "./cats/CatBodySVG";

export default function CatKissAnimation() {
  return (
    <div className="relative flex items-end justify-center py-4" style={{ height: "200px" }}>
      {/* Left cat slides toward center */}
      <motion.div
        className="relative z-10"
        initial={{ x: -70 }}
        animate={{ x: -10 }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1.5,
        }}
      >
        <motion.div
          animate={{ rotate: [0, 3, 0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <CatBodySVG color="#ff587a" />
        </motion.div>
      </motion.div>

      {/* Heart burst between them */}
      <motion.div
        className="absolute left-1/2 top-4 z-20 -translate-x-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.3, 1, 1.2, 0],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 0.5,
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
          <path
            d="M20 36 C20 36 0 22 0 10 C0 4 4 0 10 0 C14 0 18 3 20 6 C22 3 26 0 30 0 C36 0 40 4 40 10 C40 22 20 36 20 36Z"
            fill="#ff2d55"
          />
        </svg>
      </motion.div>

      {/* Floating mini hearts */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 z-20"
          style={{ top: "30%" }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -40 - i * 15],
            x: [(i - 2) * 8, (i - 2) * 20],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 2 + i * 0.4,
            repeatDelay: 2.5,
          }}
        >
          <svg width="12" height="11" viewBox="0 0 40 36" fill="none">
            <path
              d="M20 36 C20 36 0 22 0 10 C0 4 4 0 10 0 C14 0 18 3 20 6 C22 3 26 0 30 0 C36 0 40 4 40 10 C40 22 20 36 20 36Z"
              fill="#ff95ab"
            />
          </svg>
        </motion.div>
      ))}

      {/* Right cat slides toward center (flipped) */}
      <motion.div
        className="relative z-10"
        initial={{ x: 70 }}
        animate={{ x: 10 }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1.5,
        }}
      >
        <motion.div
          animate={{ rotate: [0, -3, 0, 2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <CatBodySVG color="#ff95ab" flip />
        </motion.div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

const COLORS = ["#e11d48", "#fb7185", "#fda4af", "#fecdd3", "#d4a574"];

function HeartSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 40 36" fill="none">
      <path
        d="M20 36 C20 36 0 22 0 10 C0 4 4 0 10 0 C14 0 18 3 20 6 C22 3 26 0 30 0 C36 0 40 4 40 10 C40 22 20 36 20 36Z"
        fill={color}
      />
    </svg>
  );
}

export default function HeartParticles({ count = 18 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 8 + Math.random() * 14,
        opacity: 0.15 + Math.random() * 0.25,
        color: COLORS[i % COLORS.length],
        drift: (Math.random() - 0.5) * 40,
      })),
    [count]
  );

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: "-30px",
          }}
          animate={{
            y: [0, -(window.innerHeight + 60)],
            x: [0, heart.drift],
            opacity: [0, heart.opacity, heart.opacity, 0],
            rotate: [0, heart.id % 2 === 0 ? 20 : -20],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <HeartSVG color={heart.color} size={heart.size} />
        </motion.div>
      ))}
    </div>
  );
}

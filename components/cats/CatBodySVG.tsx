"use client";

import { motion } from "framer-motion";

interface CatBodySVGProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

export default function CatBodySVG({
  color = "#ff587a",
  flip = false,
  className = "",
}: CatBodySVGProps) {
  return (
    <svg
      width="140"
      height="160"
      viewBox="0 0 140 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* Tail */}
      <motion.path
        d="M 20 120 Q 0 100 8 80 Q 14 65 5 50"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        animate={{
          d: [
            "M 20 120 Q 0 100 8 80 Q 14 65 5 50",
            "M 20 120 Q 0 100 8 80 Q 18 65 15 45",
            "M 20 120 Q 0 100 8 80 Q 14 65 5 50",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Body */}
      <ellipse cx="70" cy="120" rx="35" ry="28" fill={color} stroke="#333" strokeWidth="1.5" />

      {/* Belly */}
      <ellipse cx="70" cy="125" rx="20" ry="18" fill="#fff0f3" opacity="0.5" />

      {/* Front legs */}
      <rect x="48" y="135" width="12" height="20" rx="6" fill={color} stroke="#333" strokeWidth="1.5" />
      <rect x="78" y="135" width="12" height="20" rx="6" fill={color} stroke="#333" strokeWidth="1.5" />

      {/* Paws */}
      <ellipse cx="54" cy="155" rx="7" ry="4" fill="#ffb3c6" stroke="#333" strokeWidth="1" />
      <ellipse cx="84" cy="155" rx="7" ry="4" fill="#ffb3c6" stroke="#333" strokeWidth="1" />

      {/* Ears */}
      <path d="M 42 58 L 34 30 L 56 48 Z" fill={color} stroke="#333" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M 96 58 L 104 30 L 82 48 Z" fill={color} stroke="#333" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M 44 54 L 39 38 L 54 50 Z" fill="#ffb3c6" />
      <path d="M 94 54 L 99 38 L 84 50 Z" fill="#ffb3c6" />

      {/* Head */}
      <ellipse cx="70" cy="70" rx="30" ry="28" fill={color} stroke="#333" strokeWidth="1.5" />

      {/* Face lighter area */}
      <ellipse cx="70" cy="74" rx="19" ry="17" fill="#fff0f3" opacity="0.5" />

      {/* Happy closed eyes */}
      <motion.path
        d="M 56 66 Q 60 61 64 66"
        fill="none"
        stroke="#333"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <motion.path
        d="M 76 66 Q 80 61 84 66"
        fill="none"
        stroke="#333"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Blush */}
      <ellipse cx="52" cy="72" rx="4" ry="2.5" fill="#ffb3c6" opacity="0.5" />
      <ellipse cx="88" cy="72" rx="4" ry="2.5" fill="#ffb3c6" opacity="0.5" />

      {/* Nose */}
      <path d="M 68 72 L 70 75 L 72 72 Z" fill="#ffb3c6" stroke="#333" strokeWidth="1" />

      {/* Happy mouth */}
      <path d="M 64 77 Q 70 82 76 77" fill="none" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />

      {/* Whiskers */}
      <g stroke="#333" strokeWidth="1" strokeLinecap="round" opacity="0.4">
        <line x1="36" y1="70" x2="52" y2="72" />
        <line x1="34" y1="76" x2="52" y2="76" />
        <line x1="36" y1="82" x2="52" y2="80" />
        <line x1="88" y1="72" x2="104" y2="70" />
        <line x1="88" y1="76" x2="106" y2="76" />
        <line x1="88" y1="80" x2="104" y2="82" />
      </g>
    </svg>
  );
}

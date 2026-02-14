"use client";

import { motion } from "framer-motion";

interface CatSVGProps {
  mood: "happy" | "expectant" | "sad" | "love";
  size?: number;
  color?: string;
  flip?: boolean;
  className?: string;
}

export default function CatSVG({
  mood,
  size = 120,
  color = "#ff587a",
  flip = false,
  className = "",
}: CatSVGProps) {
  const eyeVariants = {
    happy: { d: "M 28 38 Q 32 34 36 38", fill: "none", stroke: "#333" },
    expectant: { cx: 32, cy: 36, r: 3.5 },
    sad: { cx: 32, cy: 38, r: 3 },
    love: { d: "M 28 38 Q 32 34 36 38", fill: "none", stroke: "#333" },
  };

  const mouthVariants = {
    happy: "M 38 48 Q 44 54 50 48",
    expectant: "M 40 49 Q 44 52 48 49",
    sad: "M 38 52 Q 44 47 50 52",
    love: "M 38 47 Q 44 53 50 47",
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* Ears */}
      <motion.path
        d="M 18 32 L 10 8 L 32 22 Z"
        fill={color}
        stroke="#333"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <motion.path
        d="M 70 32 L 78 8 L 56 22 Z"
        fill={color}
        stroke="#333"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Inner ears */}
      <path d="M 20 28 L 15 14 L 30 24 Z" fill="#ffb3c6" />
      <path d="M 68 28 L 73 14 L 58 24 Z" fill="#ffb3c6" />

      {/* Head */}
      <motion.ellipse
        cx="44"
        cy="44"
        rx="28"
        ry="26"
        fill={color}
        stroke="#333"
        strokeWidth="1.5"
      />

      {/* Face background (lighter belly/face) */}
      <ellipse cx="44" cy="48" rx="18" ry="16" fill="#fff0f3" opacity="0.6" />

      {/* Eyes */}
      {mood === "happy" || mood === "love" ? (
        <>
          <motion.path
            d="M 30 38 Q 34 33 38 38"
            fill="none"
            stroke="#333"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={mood === "love" ? { scaleY: [1, 0.8, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M 50 38 Q 54 33 58 38"
            fill="none"
            stroke="#333"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={mood === "love" ? { scaleY: [1, 0.8, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </>
      ) : mood === "expectant" ? (
        <>
          {/* Big round eyes */}
          <circle cx="34" cy="37" r="5" fill="white" stroke="#333" strokeWidth="1.5" />
          <motion.circle
            cx="34"
            cy="37"
            r="3"
            fill="#333"
            animate={{ cy: [37, 36, 37, 38, 37] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <circle cx="35.5" cy="35.5" r="1" fill="white" />
          <circle cx="54" cy="37" r="5" fill="white" stroke="#333" strokeWidth="1.5" />
          <motion.circle
            cx="54"
            cy="37"
            r="3"
            fill="#333"
            animate={{ cy: [37, 36, 37, 38, 37] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <circle cx="55.5" cy="35.5" r="1" fill="white" />
        </>
      ) : (
        <>
          {/* Sad droopy eyes */}
          <circle cx="34" cy="38" r="4.5" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="34" cy="39" r="2.5" fill="#333" />
          <circle cx="35" cy="38" r="0.8" fill="white" />
          <circle cx="54" cy="38" r="4.5" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="54" cy="39" r="2.5" fill="#333" />
          <circle cx="55" cy="38" r="0.8" fill="white" />
          {/* Eyebrow worry lines */}
          <path d="M 28 33 Q 34 30 38 33" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 50 33 Q 54 30 60 33" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}

      {/* Nose */}
      <path d="M 42 44 L 44 47 L 46 44 Z" fill="#ffb3c6" stroke="#333" strokeWidth="1" />

      {/* Mouth */}
      <motion.path
        d={mouthVariants[mood]}
        fill="none"
        stroke="#333"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Whiskers */}
      <g stroke="#333" strokeWidth="1" strokeLinecap="round" opacity="0.5">
        <line x1="10" y1="42" x2="26" y2="44" />
        <line x1="8" y1="48" x2="26" y2="48" />
        <line x1="10" y1="54" x2="26" y2="52" />
        <line x1="62" y1="44" x2="78" y2="42" />
        <line x1="62" y1="48" x2="80" y2="48" />
        <line x1="62" y1="52" x2="78" y2="54" />
      </g>

      {/* Blush */}
      {(mood === "happy" || mood === "love") && (
        <>
          <ellipse cx="26" cy="44" rx="4" ry="2.5" fill="#ffb3c6" opacity="0.5" />
          <ellipse cx="62" cy="44" rx="4" ry="2.5" fill="#ffb3c6" opacity="0.5" />
        </>
      )}

      {/* Tears for sad cat */}
      {mood === "sad" && (
        <>
          <motion.ellipse
            cx="30"
            cy="44"
            rx="1.5"
            ry="2"
            fill="#7dd3fc"
            animate={{ cy: [44, 54], opacity: [0.8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          />
          <motion.ellipse
            cx="58"
            cy="44"
            rx="1.5"
            ry="2"
            fill="#7dd3fc"
            animate={{ cy: [44, 54], opacity: [0.8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
          />
        </>
      )}

      {/* Love hearts floating from love cat */}
      {mood === "love" && (
        <>
          <motion.text
            x="60"
            y="20"
            fontSize="10"
            animate={{ y: [20, 8], opacity: [1, 0], scale: [0.8, 1.2] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            ♥
          </motion.text>
          <motion.text
            x="68"
            y="28"
            fontSize="8"
            animate={{ y: [28, 14], opacity: [1, 0], scale: [0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
          >
            ♥
          </motion.text>
        </>
      )}
    </motion.svg>
  );
}

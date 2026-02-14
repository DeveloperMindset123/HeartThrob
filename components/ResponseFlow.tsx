"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CelebrationScene from "./CelebrationScene";
import SadScene from "./SadScene";
import CatSVG from "./cats/CatSVG";

type Stage = "reveal" | "first_ask" | "second_ask" | "result";
type Result = "yes" | "no" | null;

const cardTransition = {
  initial: { opacity: 0, y: 30, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

interface ResponseFlowProps {
  senderName: string;
  message: string;
  token: string;
}

export default function ResponseFlow({
  senderName,
  message,
  token,
}: ResponseFlowProps) {
  const [stage, setStage] = useState<Stage>("reveal");
  const [result, setResult] = useState<Result>(null);
  const [hasResponded, setHasResponded] = useState(false);
  const [alreadyResponded, setAlreadyResponded] = useState(false);

  useEffect(() => {
    const key = `valentine-${token.slice(0, 20)}`;
    if (localStorage.getItem(key) === "responded") {
      setAlreadyResponded(true);
    }
  }, [token]);

  const sendResponse = useCallback(
    async (response: "yes" | "no") => {
      if (hasResponded) return;
      setHasResponded(true);
      try {
        await fetch("/api/respond", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, response }),
        });
      } catch (error) {
        console.error("Failed to send response:", error);
      }
      localStorage.setItem(`valentine-${token.slice(0, 20)}`, "responded");
    },
    [token, hasResponded]
  );

  const handleYes = useCallback(() => {
    setResult("yes");
    setStage("result");
    sendResponse("yes");
  }, [sendResponse]);

  const handleNo = useCallback(() => {
    if (stage === "first_ask") {
      setStage("second_ask");
    } else {
      setResult("no");
      setStage("result");
      sendResponse("no");
    }
  }, [stage, sendResponse]);

  if (alreadyResponded && stage !== "result") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-5">
        <motion.div
          className="glass-card flex flex-col items-center gap-5 rounded-3xl p-8 text-center"
          {...cardTransition}
        >
          <CatSVG mood="happy" size={90} color="#e11d48" />
          <h2 className="font-display text-2xl font-bold text-rose-900">
            You&apos;ve already responded
          </h2>
          <p className="font-body text-rose-600/70">
            Thanks for your answer. Happy Valentine&apos;s Day!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5">
      <AnimatePresence mode="wait">
        {stage === "reveal" && (
          <motion.div
            key="reveal"
            className="glass-card flex max-w-md flex-col items-center gap-6 rounded-3xl p-8 text-center sm:p-10"
            {...cardTransition}
          >
            {/* Envelope */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <svg width="64" height="50" viewBox="0 0 64 50" fill="none">
                <rect x="2" y="8" width="60" height="40" rx="5" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
                <path d="M2 13 L32 33 L62 13" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M32 2 C32 2 26 -3 26 3 C26 6 32 11 32 11 C32 11 38 6 38 3 C38 -3 32 2 32 2Z" fill="#e11d48" />
              </svg>
            </motion.div>

            <motion.h1
              className="font-display text-2xl font-bold text-rose-900 sm:text-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {senderName} sent you a Valentine
            </motion.h1>

            <motion.div
              className="w-full rounded-2xl border border-rose-200/40 bg-rose-50/50 p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="whitespace-pre-wrap font-display text-lg italic leading-relaxed text-rose-900">
                &ldquo;{message}&rdquo;
              </p>
            </motion.div>

            <motion.button
              className="btn-glow mt-2 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 px-8 py-3 font-display text-base font-semibold text-white shadow-lg shadow-rose-500/20"
              onClick={() => setStage("first_ask")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              See their question &rarr;
            </motion.button>
          </motion.div>
        )}

        {stage === "first_ask" && (
          <motion.div
            key="first_ask"
            className="glass-card flex max-w-md flex-col items-center gap-6 rounded-3xl p-8 text-center sm:p-10"
            {...cardTransition}
          >
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <CatSVG mood="expectant" size={110} color="#e11d48" />
            </motion.div>

            <h2 className="font-display text-2xl font-bold text-rose-900 sm:text-3xl">
              Will you be {senderName}&apos;s Valentine?
            </h2>

            <div className="flex gap-4">
              <motion.button
                className="btn-glow rounded-full bg-gradient-to-r from-rose-600 to-rose-500 px-8 py-3 font-display text-base font-semibold text-white shadow-lg shadow-rose-500/20"
                onClick={handleYes}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                Yes!
              </motion.button>
              <motion.button
                className="rounded-full border border-rose-200 bg-white/60 px-8 py-3 font-display text-base font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                onClick={handleNo}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === "second_ask" && (
          <motion.div
            key="second_ask"
            className="glass-card flex max-w-md flex-col items-center gap-6 rounded-3xl p-8 text-center sm:p-10"
            {...cardTransition}
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CatSVG mood="sad" size={110} color="#d4a0aa" />
            </motion.div>

            <h2 className="font-display text-2xl font-bold text-rose-900">
              Are you sure?
            </h2>

            <p className="font-body text-rose-600/70">
              The kitty is getting really sad...
            </p>

            <div className="flex gap-4">
              <motion.button
                className="btn-glow rounded-full bg-gradient-to-r from-rose-600 to-rose-500 px-8 py-3 font-display text-base font-semibold text-white shadow-lg shadow-rose-500/20"
                onClick={handleYes}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                Okay, Yes!
              </motion.button>
              <motion.button
                className="rounded-full border border-rose-200 bg-white/60 px-8 py-3 font-display text-base font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                onClick={handleNo}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                No, I&apos;m sure
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === "result" && (
          <motion.div
            key="result"
            className="flex min-h-[50vh] items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {result === "yes" ? <CelebrationScene /> : <SadScene />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

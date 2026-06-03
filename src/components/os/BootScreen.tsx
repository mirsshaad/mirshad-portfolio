"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore } from "@/store/os.store";

export default function BootScreen() {
  const bootSystem = useOSStore((state) => state.bootSystem);
  const soundOn = useOSStore((state) => state.soundOn);
  
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"logo" | "loading" | "ready" | "done">("logo");

  const logLines = [
    "Initializing System...",
    "Loading Projects...",
    "Loading AI Infrastructure...",
    "Loading Cloud Services...",
    "Loading Developer Environment...",
    "Loading Portfolio Experience...",
  ];

  // Play startup sound using Web Audio API
  const playStartupSound = () => {
    if (!soundOn) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Warm synth chord (Major 7th - Apple style)
      const playTone = (freq: number, delay: number, duration: number, type: OscillatorType = "sine") => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + delay + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration);
      };
      
      // Play a beautiful chord (C major 9)
      playTone(130.81, 0, 2.5, "triangle"); // C3
      playTone(196.00, 0.05, 2.4, "sine");    // G3
      playTone(261.63, 0.1, 2.3, "sine");     // C4
      playTone(329.63, 0.15, 2.2, "sine");    // E4
      playTone(392.00, 0.2, 2.1, "sine");     // G4
      playTone(493.88, 0.25, 2.0, "sine");    // B4
      playTone(587.33, 0.3, 1.8, "sine");     // D5
    } catch (e) {
      console.warn("Audio Context failed to start:", e);
    }
  };

  useEffect(() => {
    // Stage 1: Show logo for 1.2s
    const logoTimer = setTimeout(() => {
      setPhase("loading");
      playStartupSound();
    }, 1500);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logLines.length) {
        setLogs((prev) => [...prev, logLines[currentLogIndex]]);
        setProgress((prev) => Math.min(prev + 16.6, 100));
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setPhase("ready");
        }, 600);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "ready") return;

    const readyTimer = setTimeout(() => {
      setPhase("done");
      // Give fade-out animation time before calling store action
      setTimeout(() => {
        bootSystem();
      }, 500);
    }, 1200);

    return () => clearTimeout(readyTimer);
  }, [phase, bootSystem]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black font-mono text-zinc-400 select-none cursor-wait"
        >
          <div className="w-[320px] sm:w-[450px] flex flex-col gap-6">
            {/* Phase 1: Show logo */}
            <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl font-bold text-white tracking-wider font-serif"
              >
                MVP OS v1.0
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xs text-zinc-500 uppercase tracking-widest"
              >
                Created by Mirshad V P
              </motion.div>
            </div>

            {/* Log Output Section */}
            {phase !== "logo" && (
              <div className="flex flex-col gap-1.5 h-[160px] text-xs sm:text-sm font-light text-zinc-300">
                {logs.map((log, index) => {
                  // Simulate progress block drawing
                  const percentDone = Math.round(((index + 1) / logLines.length) * 10);
                  const filledBlocks = "▓".repeat(percentDone);
                  const emptyBlocks = "░".repeat(10 - percentDone);
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4"
                    >
                      <span className="text-zinc-500">{filledBlocks}{emptyBlocks}</span>
                      <span>{log}</span>
                    </motion.div>
                  );
                })}

                {phase === "ready" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-emerald-400 font-semibold mt-4 flex items-center gap-2"
                  >
                    <span>●</span> System Ready.
                  </motion.div>
                )}
              </div>
            )}

            {/* Progress Bar */}
            {phase !== "logo" && (
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

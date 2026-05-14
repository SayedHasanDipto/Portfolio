"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClickEffect() {
  const [particles, setParticles] = useState([]);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handlePointerDown = (e) => {
      const clickId = Date.now();

      // 1. Elegant Water Ripple
      const newRipple = {
        id: `ripple-${clickId}`,
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);

      // 2. Premium Neon Sparkles (Replacing Minecraft)
      const sparks = Array.from({ length: 12 }).map((_, i) => ({
        id: `spark-${clickId}-${i}`,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 2,
        vx: (Math.random() - 0.5) * 300,
        vy: (Math.random() - 0.5) * 300,
        delay: Math.random() * 0.1,
      }));
      setParticles((prev) => [...prev, ...sparks]);

      // Cleanup
      setTimeout(() => {
        setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
      }, 1000);

      setTimeout(() => {
        setParticles((prev) => prev.filter(p => !sparks.find(ns => ns.id === p.id)));
      }, 1500);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {/* Elegant Ripple */}
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{
              x: r.x,
              y: r.y,
              scale: 0,
              opacity: 0.6,
              translateX: "-50%",
              translateY: "-50%"
            }}
            animate={{
              scale: 5,
              opacity: 0,
              borderWidth: "1px"
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-12 h-12 border-[3px] border-brand rounded-full shadow-[0_0_20px_rgba(217,255,0,0.3)]"
          />
        ))}

        {/* Premium Neon Sparkles */}
        {particles.map((s) => (
          <motion.div
            key={s.id}
            initial={{
              x: s.x,
              y: s.y,
              opacity: 1,
              scale: 1,
              translateX: "-50%",
              translateY: "-50%"
            }}
            animate={{
              x: s.x + s.vx,
              y: s.y + s.vy,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1 + Math.random(),
              ease: [0.22, 1, 0.36, 1],
              delay: s.delay
            }}
            style={{
              position: "absolute",
              width: s.size,
              height: s.size,
              backgroundColor: "#D9FF00",
              borderRadius: "50%",
              filter: "blur(1px)",
              boxShadow: "0 0 10px #D9FF00, 0 0 20px #D9FF00",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

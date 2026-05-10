"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClickEffect() {
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handlePointerDown = (e) => {
      const clickId = Date.now();

      // Optimized: 8 blocks instead of 12
      const blocks = Array.from({ length: 8 }).map((_, i) => ({
        id: `${clickId}-${i}`,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 12 + 8,
        vx: (Math.random() - 0.5) * 180,
        vy: (Math.random() - 0.5) * 180,
        rotation: Math.random() * 360,
      }));

      setClicks((prev) => [...prev, ...blocks]);

      // Faster cleanup: 800ms
      setTimeout(() => {
        setClicks((prev) => prev.filter(p => !blocks.find(nb => nb.id === p.id)));
      }, 800);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {clicks.map((b) => (
          <motion.div
            key={b.id}
            initial={{
              x: b.x,
              y: b.y,
              rotate: 0,
              opacity: 1,
              scale: 1
            }}
            animate={{
              x: b.x + b.vx,
              y: b.y + b.vy + 100, // Add "gravity" pull
              rotate: b.rotation,
              opacity: 0,
              scale: 0.2,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: b.size,
              height: b.size,
              backgroundColor: "#D9FF00",
              boxShadow: "2px 2px 0px rgba(0,0,0,0.2)", // Minecraft-like shadow
              borderRadius: "0px", // Strict squares
              willChange: "transform, opacity",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

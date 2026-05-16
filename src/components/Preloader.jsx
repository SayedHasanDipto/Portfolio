"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(onComplete, 400); // Small delay before fading out
      }
      setProgress(currentProgress);
    }, 100);

    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: "0%" }}
      exit={{ 
        y: "-100%",
        rotateX: -30,
        scale: 0.9,
        opacity: 0
      }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      style={{ perspective: "1000px" }}
      className="fixed inset-0 z-[200] bg-dark text-white flex flex-col items-center justify-center pointer-events-none"
    >

      <div className="overflow-hidden">
        <motion.div
          initial={{ y: 150 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-[10rem] font-bold font-sans tracking-tighter"
        >
          {progress}%
        </motion.div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 md:w-96 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-brand"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

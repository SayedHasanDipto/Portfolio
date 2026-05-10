"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorMode, setCursorMode] = useState("default"); // default, hover, view
  const [isMobile, setIsMobile] = useState(false);

  // Faster springs for better response time
  const cursorXSpring = useSpring(mousePosition.x, { stiffness: 200, damping: 40, mass: 0.5 });
  const cursorYSpring = useSpring(mousePosition.y, { stiffness: 200, damping: 40, mass: 0.5 });

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorXSpring.set(e.clientX);
      cursorYSpring.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isProjectCard = target.closest(".project-card");
      const isClickable = 
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor]");

      if (isProjectCard) {
        setCursorMode("view");
      } else if (isClickable) {
        setCursorMode("hover");
      } else {
        setCursorMode("default");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorXSpring, cursorYSpring]);

  if (isMobile) return null;

  return (
    <>
      {/* Trailing Ring / View Mode Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-dark/30 dark:border-brand pointer-events-none z-[100] mix-blend-difference flex items-center justify-center overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorMode === "view" ? 100 : 32,
          height: cursorMode === "view" ? 100 : 32,
        }}
        animate={{
          scale: cursorMode === "hover" ? 2.5 : 1,
          opacity: cursorMode === "hover" ? 0 : 1,
          backgroundColor: cursorMode === "view" ? "rgba(217, 255, 0, 1)" : "rgba(217, 255, 0, 0)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        {cursorMode === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-dark font-bold text-[10px] tracking-widest uppercase"
          >
            View
          </motion.span>
        )}
      </motion.div>
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-dark dark:bg-brand rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: cursorMode === "hover" ? 3 : cursorMode === "view" ? 0 : 1,
          opacity: cursorMode === "hover" ? 0.5 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 1000, 
          damping: 40, 
          mass: 0.1 
        }}
      />
    </>
  );
}

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function FluidBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const springX = useSpring(mousePosition.x, { stiffness: 40, damping: 25 });
  const springY = useSpring(mousePosition.y, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    springX.set(window.innerWidth / 2);
    springY.set(window.innerHeight / 2);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#050505] transition-colors">
      {/* Primary Glow Orb following mouse */}
      <motion.div
        className="absolute w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] rounded-full blur-[80px] opacity-30 will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(217, 255, 0, 0.15) 0%, transparent 70%)",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Static Decorative Orbs - Optimized */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand/10 rounded-full blur-[100px] will-change-transform"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-500/5 rounded-full blur-[120px] hide-on-mobile will-change-transform"
      />
    </div>
  );
}

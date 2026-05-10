"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FluidBackground from "@/components/FluidBackground";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      <FluidBackground />
      
      <div className="text-center z-10 px-6">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "power4.out" }}
          className="text-[12rem] md:text-[20rem] font-bold text-white/5 leading-none select-none"
        >
          404
        </motion.h1>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="-mt-20 md:-mt-40"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-8">
            Lost in <span className="italic font-serif text-brand">Space?</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-12 text-lg">
            The page you are looking for doesn&apos;t exist or has been moved to another dimension.
          </p>
          
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand text-dark px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(217,255,0,0.4)] transition-all"
            >
              Back to Reality
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand/5 blur-[120px] rounded-full -z-10" />
    </div>
  );
}

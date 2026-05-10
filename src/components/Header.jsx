"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";

export default function Header() {
  const [hoveredLink, setHoveredLink] = useState(null);

  // Magnetic button setup
  const buttonRef = useRef(null);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setButtonPos({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setButtonPos({ x: 0, y: 0 });
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 transition-colors"
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" data-cursor="hover">
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="w-8 h-8 bg-brand rounded-full flex items-center justify-center font-bold text-xs text-dark"
          >
            SH
          </motion.div>
          <span className="font-bold tracking-tighter text-xl text-white uppercase">SAYED HASAN DIPTO</span>
        </div>

        <ul className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400 relative">
          {navLinks.map((link) => (
            <li
              key={link.name}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative"
            >
              <Link href={link.href} className="relative z-10 px-2 py-1 hover:text-dark transition-colors" data-cursor="hover">
                {link.name}
              </Link>
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-gray-100 rounded-md -z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <motion.div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: buttonPos.x, y: buttonPos.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="relative"
          >
            <Link href="https://www.linkedin.com/in/sayedhasandipto/" target="_blank" data-cursor="hover">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand text-dark px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand/90 transition-all shadow-lg hover:shadow-xl"
              >
                Get In Touch
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </nav>
    </motion.header>
  );
}

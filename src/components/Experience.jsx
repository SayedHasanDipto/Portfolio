"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";

import Link from "next/link";
import InteractiveDotGrid from "./InteractiveDotGrid";


export default function Experience() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const colsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );

      const columns = colsRef.current.children;
      gsap.fromTo(
        columns,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: colsRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const data = [
    {
      period: "2018 – 2023",
      items: [
        { title: "Computer Expert & Trainer", subtitle: "Bakshibonj Post E Center" },
        { title: "Secondary School Certificate (SSC)", subtitle: "Humanities" },
      ]
    },
    {
      period: "2023 — 2024",
      items: [
        { title: "Higher Secondary Certificate (HSC)", subtitle: "UI/UX Designer at AB" },
        { title: "Junior Web Developer", subtitle: "Upwork & Fiverr" },
      ]
    },
    {
      period: "2025 – Present",
      items: [
        { title: "Junior MERN stack Developer", subtitle: "Upwork & Fiverr" },
        { title: "Full-Stack Web Development", subtitle: "Building Modern Web Ecosystems" },
      ]
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-[#050505] transition-colors" data-purpose="education-and-experience">

      <InteractiveDotGrid />

      {/* Animated SVG Path */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] -z-10 hidden md:block">
        <svg width="2" height="100%" viewBox="0 0 2 1000" fill="none" preserveAspectRatio="none" className="h-full w-full">
          <line x1="1" y1="0" x2="1" y2="1000" stroke="currentColor" className="text-white/10" strokeWidth="2" strokeDasharray="10 10" />
          <motion.line
            x1="1" y1="0" x2="1" y2="1000"
            stroke="#D9FF00"
            strokeWidth="2"
            style={{ pathLength }}
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        <h2 ref={titleRef} className="text-center font-serif text-4xl mb-20 italic text-white">
          Education &amp; Experience
        </h2>

        <div ref={colsRef} className="grid md:grid-cols-3 gap-12 mb-16">
          {data.map((col, index) => (
            <div key={index} className="flex flex-col relative">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-6 bg-[#050505] pr-4 self-start relative z-10 transition-colors">
                {col.period}
              </span>
              <div className="space-y-8 relative">
                {col.items.map((item, i) => (
                  <Link key={i} href="/experience" className="block">
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative cursor-pointer group pl-4 border-l-2 border-transparent hover:border-brand transition-all"
                    >
                      <h4 className="font-semibold text-lg mb-1 group-hover:text-brand transition-colors text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-400">{item.subtitle}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/experience">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs uppercase tracking-widest border border-white/20 px-8 py-3 rounded-full hover:border-brand hover:text-brand transition-all text-white"
            >
              Explore Detailed Career History →
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

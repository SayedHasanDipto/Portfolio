"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const infoRef = useRef(null);
  const toolListRef = useRef(null);

  // Framer Motion Parallax for the image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Stagger
      const headingWords = headingRef.current.children;
      gsap.fromTo(
        headingWords,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      // Info text fade up
      gsap.fromTo(
        infoRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
          },
        }
      );

      // Tool List Stagger
      const toolItems = toolListRef.current.children;
      gsap.fromTo(
        toolItems,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: toolListRef.current,
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tools = [
    { name: "Product Design", desc: "Figma, Adobe XD", year: "2012 — Pres." },
    { name: "Art Direction", desc: "Branding, Visuals", year: "2014 — 2020" },
    { name: "Web Design", desc: "Webflow, Framer", year: "2016 — Pres." },
    { name: "UI/UX Audit", desc: "User Testing", year: "2020 — Pres." },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[#050505] transition-colors relative z-20" data-purpose="intro-content">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        <p className="text-center text-sm font-medium text-gray-400 mb-4 uppercase tracking-widest">
          — About Me —
        </p>

        <h2 ref={headingRef} className="text-4xl md:text-6xl text-center font-serif mb-16 overflow-hidden flex flex-wrap justify-center gap-x-4 text-white">
          <span className="italic block">Pushing</span>
          <span className="italic block">Boundaries</span>
          <span className="not-italic font-sans font-light block">since</span>
          <span className="not-italic font-sans font-light block">2011</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="relative overflow-hidden rounded-3xl flex justify-center">
            {/* Secondary Image/Portrait with Parallax */}
            <motion.div
              style={{ y: imageY, scale: 1.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-dark rounded-3xl overflow-hidden aspect-[4/3] w-full max-w-[500px] origin-center group relative cursor-pointer"
            >
              <img
                alt="Studio work"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                src="https://i.ibb.co/RG8BLLnN/20250818-071227.jpg"
              />
              <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
            </motion.div>

            <div className="mt-6 flex gap-4 text-gray-400">
              {["IG", "LN", "BE"].map((social, i) => (
                <motion.span
                  key={social}
                  whileHover={{ y: -3, color: "#D9FF00" }}
                  className="text-xs cursor-pointer transition-colors"
                  data-cursor="hover"
                >
                  {social}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <p ref={infoRef} className="text-xl leading-relaxed text-gray-300 mb-8">
              Based in Jakarta, I am a passionate UX/UI designer with over a decade of experience crafting intuitive interfaces and meaningful digital products for global brands and startups alike.
            </p>

            <div className="mb-12">
              <Link href="#contact" data-cursor="hover">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand text-dark text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-brand/90 transition-colors relative overflow-hidden group"
                >
                  <span className="relative z-10">Let's talk</span>
                </motion.button>
              </Link>
            </div>

            {/* Tool List */}
            <div ref={toolListRef} className="space-y-4 border-t border-white/10 pt-8">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="flex justify-between items-center group cursor-default p-4 rounded-xl transition-all"
                >
                  <span className="font-medium group-hover:text-brand transition-colors text-white">{tool.name}</span>
                  <span className="text-sm text-gray-400">{tool.desc}</span>
                  <span className="text-xs text-gray-500">{tool.year}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

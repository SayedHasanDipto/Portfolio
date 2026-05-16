"use client";

import { motion } from "framer-motion";
import InteractiveDotGrid from "./InteractiveDotGrid";


export default function Partners() {
  const partners = [
    "HTML 5", "CSS3", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "VS Code", "Netlify",
    "Node.js", "MongoDB", "Firebase", "Git & GitHub", "Figma", "UI/UX Design", "Better Auth", "API Integration"
  ];

  return (
    <section className="py-20 bg-[#050505] overflow-hidden border-y border-white/5 transition-colors relative" data-purpose="trusted-partners">

      <InteractiveDotGrid />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h3 className="text-center font-serif text-3xl italic text-gray-600 dark:text-gray-400">
          Skill&apos;s I&apos;ve Mastered
        </h3>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap"
        >
          {partners.concat(partners).map((partner, index) => (
            <div
              key={index}
              className="mx-4 bg-white dark:bg-dark px-12 py-8 rounded-xl flex items-center justify-center border border-gray-100 dark:border-white/10 hover:shadow-sm hover:border-brand/30 transition-all duration-300 group min-w-[250px]"
            >
              <span className="font-bold text-2xl opacity-30 group-hover:opacity-100 group-hover:text-brand transition-all duration-300 text-dark dark:text-white">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

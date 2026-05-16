"use client";

import { motion } from "framer-motion";

import InteractiveDotGrid from "./InteractiveDotGrid";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    desc: "Understanding your vision, business goals, and target audience to build a solid foundation.",
  },
  {
    number: "02",
    title: "Design & UX",
    desc: "Creating intuitive interfaces and seamless user experiences that reflect your brand identity.",
  },
  {
    number: "03",
    title: "Development",
    desc: "Building scalable, high-performance applications using the latest MERN stack technologies.",
  },
  {
    number: "04",
    title: "Testing & Launch",
    desc: "Rigorous testing and optimization to ensure a flawless launch and long-term success.",
  },
];

export default function Process() {
  return (
    <section className="py-24 px-6 bg-[#050505] relative overflow-hidden">
      <InteractiveDotGrid />

      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="text-brand text-xs uppercase tracking-[0.3em] font-bold mb-4">My Workflow</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter">
            How I <span className="italic font-serif text-brand">Work</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="relative p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-brand/30 transition-all group"
            >
              <span className="text-6xl font-bold text-white/5 absolute top-4 right-8 group-hover:text-brand/10 transition-colors">
                {step.number}
              </span>
              <h4 className="text-xl font-bold text-white mb-4 mt-8 group-hover:text-brand transition-colors">
                {step.title}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

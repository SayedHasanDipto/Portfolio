"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "CEO at TechFlow",
    text: "Sayed is an exceptional developer. His attention to detail and ability to translate complex requirements into beautiful, functional interfaces is unmatched.",
  },
  {
    name: "Sarah Miller",
    role: "Product Manager",
    text: "Working with Sayed was a breeze. He delivered our project ahead of schedule and the code quality was top-notch. Highly recommended for MERN stack work.",
  },
  {
    name: "David Chen",
    role: "Founder of GreenLoop",
    text: "The 3D animations and performance optimizations Sayed implemented for our site really helped us stand out. He's a true creative developer.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6 relative bg-[#050505] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-block p-4 bg-brand/10 rounded-full mb-8"
        >
          <FaQuoteLeft className="text-brand text-2xl" />
        </motion.div>

        <div className="relative h-[250px] md:h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="text-2xl md:text-3xl font-serif italic text-white leading-relaxed mb-8">
                &quot;{testimonials[index].text}&quot;
              </p>
              <div>
                <h4 className="text-white font-bold text-lg uppercase tracking-wider">{testimonials[index].name}</h4>
                <p className="text-brand text-xs font-medium uppercase tracking-[0.2em]">{testimonials[index].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i === index ? "bg-brand w-8" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-brand/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand/5 blur-[100px] rounded-full" />
      </div>
    </section>
  );
}

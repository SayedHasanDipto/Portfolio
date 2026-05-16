"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import InteractiveDotGrid from "./InteractiveDotGrid";


function Counter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;

      let totalMilisecondsCount = duration * 1000;
      let timerStep = Math.max(totalMilisecondsCount / end, 50);

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, timerStep);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Stats() {
  const stats = [
    { label: "Years Experience", value: "3", suffix: "+" },
    { label: "Projects Completed", value: "50", suffix: "+" },
    { label: "Happy Clients", value: "20", suffix: "+" },
    { label: "Cups of Coffee", value: "500", suffix: "" },
  ];

  return (
    <section className="py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      <InteractiveDotGrid />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="text-center group"
            >
              <h4 className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:text-brand transition-colors">
                <Counter value={stat.value} />
                <span className="text-brand">{stat.suffix}</span>
              </h4>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-brand/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
}

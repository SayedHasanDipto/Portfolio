"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";

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
      period: "2010 — 2014",
      items: [
        { title: "Bachelor Degree of Design", subtitle: "BINUS University" },
        { title: "UI/UX Design Certificate", subtitle: "Interaction Design Foundation" },
      ]
    },
    {
      period: "2015 — 2021",
      items: [
        { title: "Design Internship", subtitle: "UI/UX Designer at AB" },
        { title: "Graphic Designer", subtitle: "Freelance for 2 Years" },
        { title: "Junior Graphic Design", subtitle: "Team Designer at ABC Agency" },
        { title: "UX Designer", subtitle: "Gojek Indonesia" },
      ]
    },
    {
      period: "2021 — PRESENT",
      items: [
        { title: "Product Designer Management", subtitle: "Traveloka Jkt, ID" },
        { title: "Art Director / Co-Founder", subtitle: "Studiolab" },
        { title: "Founder", subtitle: "Minimalist UI Project" },
        { title: "Author of The Book", subtitle: "Standard Design Language Guide" },
      ]
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 relative bg-[#050505] transition-colors" data-purpose="education-and-experience">
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
        
        <div ref={colsRef} className="grid md:grid-cols-3 gap-12">
          {data.map((col, index) => (
            <div key={index} className="flex flex-col relative">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-6 bg-[#050505] pr-4 self-start relative z-10 transition-colors">
                {col.period}
              </span>
              <div className="space-y-8 relative">
                {col.items.map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative cursor-default group pl-4 border-l-2 border-transparent hover:border-brand transition-all"
                  >
                    <h4 className="font-semibold text-lg mb-1 group-hover:text-brand transition-colors text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-400">{item.subtitle}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

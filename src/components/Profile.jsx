"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FiMapPin, FiGlobe, FiCode, FiHeart, FiBriefcase, FiMail } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

import { useMotionValue, useSpring, useTransform } from "framer-motion";
import InteractiveDotGrid from "./InteractiveDotGrid";


function TiltBox({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Profile() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-item-wrapper",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 px-6 bg-transparent relative overflow-hidden"
    >
      <InteractiveDotGrid />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand text-xs uppercase tracking-[0.3em] font-bold mb-4"
          >
            Curriculum Vitae
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif italic text-white"
          >
            About Me
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-full md:h-[800px] perspective-1000">
          {/* Main Bio Card */}
          <TiltBox className="bento-item-wrapper md:col-span-2 md:row-span-2">
            <div className="h-full bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col justify-between group hover:border-brand/30 transition-all duration-500">
              <div style={{ transform: "translateZ(50px)" }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 relative">
                    <Image
                      src="https://i.ibb.co/wZVXT6Yd/m1.png"
                      alt="Sayed Hasan Dipto"
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Sayed Hasan Dipto</h3>
                    <p className="text-gray-500 text-sm">Expert MERN Stack Developer</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  I am a specialized <span className="text-white font-bold">MERN Stack Developer</span> with a passion for architecting scalable, high-performance web applications. By leveraging the power of MongoDB, Express.js, React, and Node.js, I build seamless end-to-end solutions that combine technical robustness with premium user experiences.
                </p>
              </div>
              <div className="flex flex-wrap gap-3" style={{ transform: "translateZ(30px)" }}>
                <span className="bg-white/5 text-white/70 text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 group-hover:border-brand/30 transition-colors">Creative Design</span>
                <span className="bg-white/5 text-white/70 text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 group-hover:border-brand/30 transition-colors">Clean Code</span>
                <span className="bg-white/5 text-white/70 text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 group-hover:border-brand/30 transition-colors">Fast Performance</span>
              </div>
            </div>
          </TiltBox>

          {/* Location Card */}
          <TiltBox className="bento-item-wrapper">
            <div className="h-full bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:border-brand/30 transition-all duration-500">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand group-hover:text-dark transition-all" style={{ transform: "translateZ(40px)" }}>
                <FiMapPin size={24} />
              </div>
              <h4 className="text-white font-bold mb-1" style={{ transform: "translateZ(20px)" }}>Location</h4>
              <p className="text-gray-400 text-sm" style={{ transform: "translateZ(10px)" }}>Dhaka, Bangladesh</p>
            </div>
          </TiltBox>

          {/* Availability Card */}
          <TiltBox className="bento-item-wrapper">
            <div className="h-full bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:border-brand/30 transition-all duration-500">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand group-hover:text-dark transition-all" style={{ transform: "translateZ(40px)" }}>
                <FiBriefcase size={24} />
              </div>
              <h4 className="text-white font-bold mb-1" style={{ transform: "translateZ(20px)" }}>Availability</h4>
              <p className="text-gray-400 text-sm" style={{ transform: "translateZ(10px)" }}>Open for Freelance / Full-time</p>
            </div>
          </TiltBox>

          {/* Languages Card */}
          <TiltBox className="bento-item-wrapper md:row-span-2">
            <div className="h-full bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col group hover:border-brand/30 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:text-brand transition-colors" style={{ transform: "translateZ(30px)" }}>
                <FiGlobe size={24} />
              </div>
              <h4 className="text-white font-bold text-lg mb-6" style={{ transform: "translateZ(20px)" }}>Languages</h4>
              <ul className="space-y-6" style={{ transform: "translateZ(10px)" }}>
                {[
                  { name: "Bengali", level: "Native", width: "100%" },
                  { name: "English", level: "Professional", width: "85%" },
                  { name: "Hindi", level: "Conversational", width: "60%" },
                ].map((lang) => (
                  <li key={lang.name}>
                    <div className="flex justify-between text-xs uppercase tracking-widest mb-2">
                      <span className="text-white">{lang.name}</span>
                      <span className="text-gray-500">{lang.level}</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: lang.width }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-brand"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TiltBox>

          {/* Tech Stack Card */}
          <TiltBox className="bento-item-wrapper md:col-span-2">
            <div className="h-full bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col group hover:border-brand/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6" style={{ transform: "translateZ(30px)" }}>
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:text-brand transition-colors">
                  <FiCode size={20} />
                </div>
                <h4 className="text-white font-bold text-lg">Tech Stack</h4>
              </div>
              <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(10px)" }}>
                {[
                  "Next.js", "React.js", "Node.js", "MongoDB", "Express", 
                  "Tailwind CSS", "GSAP", "Framer Motion", "Figma", "Firebase", "PostgreSQL"
                ].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 hover:border-brand/50 hover:text-white transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </TiltBox>

          {/* Contact CTA Card */}
          <TiltBox className="bento-item-wrapper">
            <div 
              className="h-full bg-brand rounded-3xl p-8 flex flex-col justify-between group cursor-pointer hover:scale-[0.98] transition-all duration-500"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="flex justify-between items-start" style={{ transform: "translateZ(40px)" }}>
                <FiMail className="text-dark" size={32} />
                <div className="w-10 h-10 rounded-full border border-dark/20 flex items-center justify-center">
                  <span className="text-dark rotate-45">→</span>
                </div>
              </div>
              <div style={{ transform: "translateZ(20px)" }}>
                <h4 className="text-dark font-black text-2xl uppercase leading-none">Get In<br />Touch</h4>
              </div>
            </div>
          </TiltBox>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-brand/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
}


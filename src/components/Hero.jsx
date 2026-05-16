"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring as useFramerSpring } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import TextScramble from "./TextScramble";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import InteractiveDotGrid from "./InteractiveDotGrid";


import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';

function Magnetic({ children, strength = 0.2 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useFramerSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useFramerSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const nameRef1 = useRef(null);
  const nameRef2 = useRef(null);
  const introRef = useRef(null);
  const imageRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useFramerSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useFramerSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const bgTextX = useTransform(springX, [-0.5, 0.5], ["-50px", "50px"]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      const splitName = (el) => {
        if (!el) return;
        const text = el.innerText;
        el.innerHTML = text.split("").map(c => `<span class="inline-block char">${c === " " ? "&nbsp;" : c}</span>`).join("");
        return el.querySelectorAll(".char");
      };

      tl.fromTo(splitName(nameRef1.current), { y: 200, skewY: 10, opacity: 0 }, { y: 0, skewY: 0, opacity: 1, duration: 1.5, stagger: 0.05 })
        .fromTo(splitName(nameRef2.current), { y: 200, skewY: 10, opacity: 0 }, { y: 0, skewY: 0, opacity: 1, duration: 1.5, stagger: 0.05 }, "-=1.2")
        .fromTo(introRef.current.children, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2 }, "-=1")
        .fromTo(imageRef.current, { scale: 1.2, opacity: 0, filter: "blur(20px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2 }, "-=1.5")
        .fromTo(".floating-icon", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, stagger: 0.1 }, "-=1");

      // Continuous Floating Animation - Separated for reliability
      const icons = containerRef.current.querySelectorAll(".floating-icon");
      icons.forEach((icon, i) => {
        gsap.to(icon, {
          y: i % 2 === 0 ? 15 : -15,
          x: i % 3 === 0 ? 10 : -10,
          rotation: i % 2 === 0 ? 5 : -5,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5 + (i * 0.2) // Start after initial reveal
        });
      });

      // Special subtle rotation for React icon
      gsap.to(".react-icon svg", {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "linear"
      });

    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <motion.section
      ref={containerRef}
      style={{ scale: scrollScale, opacity: scrollOpacity }}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#050505]"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Massive Background Typography */}
        <motion.div
          style={{ x: bgTextX }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black text-white/[0.02] uppercase whitespace-nowrap select-none leading-none z-0 tracking-[0.2em]"
        >
          MERN STACK
        </motion.div>

        {/* Interactive Dot Grid */}
        <InteractiveDotGrid />


        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">

          {/* Content Left */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="mb-8 space-y-4" ref={introRef}>
              <motion.div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                </div>
                <span className="text-brand text-xs uppercase tracking-[0.4em] font-black">Available for Projects</span>
              </motion.div>
              <h2 className="text-xl md:text-2xl font-serif italic text-white/40">
                <TextScramble text="MERN Stack Web Developer" delay={600} />
              </h2>
            </div>

            <h1 className="flex flex-col text-[14vw] md:text-[8.5vw] font-black uppercase leading-[0.8] tracking-[-0.05em] mb-6">
              <span ref={nameRef1} className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.4)] hover:[-webkit-text-stroke:1.5px_#D9FF00] transition-all duration-700 block cursor-default">Sayed</span>
              <span ref={nameRef2} className="text-white hover:text-brand transition-all duration-700 block cursor-default drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:drop-shadow-[0_0_30px_rgba(217,255,0,0.3)]">Hasan</span>
            </h1>

            <div className="flex items-center gap-4 justify-center md:justify-start text-white/60 ml-3 text-xs md:text-sm tracking-[0.5em] font-light uppercase mb-12">
              <span className="hover:text-brand transition-colors duration-300">Dipto</span>
              <span className="w-1 h-1 rounded-full bg-brand/30" />
              <span className="hover:text-brand transition-colors duration-300">Portfolio</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-8 items-center justify-center md:justify-start">

              <Magnetic strength={0.2}>
                <Link href="/#contact" data-cursor="hover">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-10 py-4 bg-brand rounded-full overflow-hidden shadow-[0_0_30px_rgba(217,255,0,0.2)]"
                  >
                    <span className="relative z-10 text-dark font-black uppercase text-sm tracking-widest flex items-center gap-2">
                      Let&apos;s Talk <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                  </motion.button>
                </Link>
              </Magnetic>

              <div className="flex gap-6">
                {[
                  { name: "IG", href: "https://instagram.com/sayedhasandipto" },
                  { name: "LI", href: "https://linkedin.com/in/sayedhasandipto" },
                  { name: "GH", href: "https://github.com/sayedhasandipto" }
                ].map((s) => (
                  <Magnetic key={s.name} strength={0.5}>
                    <Link href={s.href} target="_blank" className="text-xs font-bold text-white/50 hover:text-brand transition-colors tracking-widest" data-cursor="hover">
                      {s.name}
                    </Link>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>

          {/* Portrait Right */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative" ref={imageRef}>
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full max-w-[450px] aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden group border border-white/10 shadow-2xl"
            >
              <Image
                src="https://i.ibb.co/wZVXT6Yd/m1.png"
                alt="Portrait"
                fill
                priority
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />

              {/* Internal Parallax Elements */}
              <div className="absolute bottom-8 left-8 right-8 z-20 transition-transform duration-700 group-hover:translate-y-[-10px]" style={{ transform: "translateZ(50px)" }}>
                <p className="text-brand font-black text-4xl uppercase leading-none">MERN<br />EXPERT</p>
                <div className="h-1 w-12 bg-white/20 mt-2" />
              </div>
            </motion.div>

            {/* Floating Tech Icons */}
            <div className="absolute inset-0 pointer-events-none z-30">
              <div className="floating-icon react-icon absolute top-10 -left-10 text-brand bg-dark/80 p-4 rounded-2xl border border-white/10 shadow-xl" style={{ transform: "translateZ(80px)" }}>
                <SiReact size={32} />
              </div>
              <div className="floating-icon absolute bottom-20 -right-5 text-brand bg-dark/80 p-4 rounded-2xl border border-white/10 shadow-xl" style={{ transform: "translateZ(100px)" }}>
                <SiNodedotjs size={32} />
              </div>
              <div className="floating-icon absolute top-1/2 -right-12 text-brand bg-dark/80 p-4 rounded-2xl border border-white/10 shadow-xl" style={{ transform: "translateZ(60px)" }}>
                <SiMongodb size={32} />
              </div>
            </div>

            {/* Background Accent */}
            <motion.div
              style={{ rotateX, rotateY, translateZ: -50 }}
              className="absolute -inset-10 bg-brand/5 rounded-full blur-[100px] -z-10 group-hover:bg-brand/10 transition-colors"
            />
          </div>

        </div>
      </div>
    </motion.section>
  );
}



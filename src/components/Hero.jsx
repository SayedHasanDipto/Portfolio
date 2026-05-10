"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import TextScramble from "./TextScramble";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";

export default function Hero() {
  const containerRef = useRef(null);
  const nameRef1 = useRef(null);
  const nameRef2 = useRef(null);
  const introRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Kinetic 3D Typography Reveal
      const splitName = (el) => {
        const text = el.innerText;
        el.innerHTML = text
          .split("")
          .map((char) => `<span class="inline-block char">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");
        return el.querySelectorAll(".char");
      };

      const chars1 = splitName(nameRef1.current);
      const chars2 = splitName(nameRef2.current);

      tl.fromTo(
        chars1,
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
          transformOrigin: "50% 50% -50px"
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.05,
          delay: 0.2
        }
      )
        .fromTo(
          chars2,
          {
            y: 100,
            opacity: 0,
            rotateX: -90,
            transformOrigin: "50% 50% -50px"
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.05
          },
          "-=0.8"
        )
        .fromTo(
          introRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
          "-=0.8"
        )
        .fromTo(
          imageRef.current,
          { scale: 0.8, opacity: 0, y: 50 },
          { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
          "-=1.2"
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={containerRef}
      style={{ y, opacity }}
      className="relative pt-32 pb-12 px-6 overflow-hidden"
      data-purpose="hero-container"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="text-left order-2 md:order-1 relative z-10">
            <div className="mb-8" ref={introRef}>
              <p className="font-serif text-2xl mb-2 italic text-white">
                <TextScramble text="MERN Stack Web Developer" delay={800} />
              </p>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">MERN Stack Developer | Bridging the gap between users and technology.</p>
            </div>

            <h1 className="hero-title font-bold uppercase flex flex-col leading-none overflow-hidden perspective-1000">
              <span ref={nameRef1} className="block leading-[0.8] pb-2 text-transparent [-webkit-text-stroke:1px_#bef302] uppercase">
                sayed
              </span>
              <span ref={nameRef2} className="block leading-[0.8] pb-2 text-white">hasan</span>
              <span className="block leading-[0.8] pb-2 text-white/50 text-4xl md:text-6xl mt-4">dipto</span>
            </h1>

            <div className="mt-10 flex flex-wrap gap-6 items-center">
              <Link href="https://drive.google.com/file/d/1XZYvf3R5avxB4R0akfSLJCLSQ4jtbNIF/view?usp=sharing" target="_blank" data-cursor="hover">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand text-dark text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-brand/90 transition-colors relative overflow-hidden group"
                >
                  <span className="relative z-10 flex gap-2 items-center justify-center"><FaDownload /> Download CV</span>
                </motion.button>
              </Link>

              <div className="flex gap-4">
                {["Instagram", "LinkedIn", "Behance"].map((social, i) => (
                  <motion.a
                    key={social}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                    className="text-[10px] font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-brand transition-colors text-white"
                    href="https://www.linkedin.com/in/sayedhasandipto/"
                    target="_blank"
                    data-cursor="hover"
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 relative group cursor-pointer flex justify-center" ref={imageRef}>
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative z-10 rounded-4xl overflow-hidden bg-dark w-full max-w-105 aspect-4/5 shadow-2xl border border-white/5"
            >
              <Image
                alt="Sayed Hasan Portrait"
                fill
                priority
                className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                src="https://i.ibb.co/wZVXT6Yd/m1.png"
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
            </motion.div>
            <motion.div
              animate={{
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.05, 1, 1.02, 1]
              }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute -bottom-6 -right-6 w-full h-full bg-brand/10 rounded-4xl -z-10 blur-2xl group-hover:bg-brand/20 transition-colors"
            ></motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

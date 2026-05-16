"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { projects } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FluidBackground from "@/components/FluidBackground";
import Preloader from "@/components/Preloader";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";

function IndividualProjectCard({ project }) {
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // 3D Tilt Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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
    <Link href={`/projects/${project.slug}`}>
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group project-card cursor-pointer relative"
        data-cursor="hover"
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="bg-white/5 border border-white/10 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden mb-6 hover:border-brand/30"
      >
        <div className="bg-white/5 rounded-2xl aspect-[4/3] overflow-hidden relative">
          <motion.div style={{ y: imgY, scale: 1.1 }} className="absolute inset-0">
            <Image
              alt={project.title} 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.15]" 
              src={project.img}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-500 z-10 pointer-events-none"></div>
        </div>
      </div>
      
      <div style={{ transform: "translateZ(30px)" }}>
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand mb-2 block">
          {project.category}
        </span>
        <h3 className="text-xl font-bold mb-3 group-hover:text-brand transition-colors text-white">
          {project.title}
        </h3>
        
        <div className="flex gap-2">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-[10px] font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-full group-hover:border-brand transition-colors text-white">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          titleRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
        );

        gsap.fromTo(
          ".project-grid-item",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.5 }
        );
      });
      return () => ctx.revert();
    }
  }, [isLoading]);

  return (
    <>
      <FluidBackground />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <PageWrapper>
          <Header />
          <main className="pt-24 md:pt-32 pb-24 px-4 md:px-6 min-h-screen dot-grid">
            <div className="max-w-7xl mx-auto" ref={containerRef}>
              <div className="mb-12 md:mb-20 overflow-hidden text-center">
                <p className="text-brand text-xs uppercase tracking-[0.3em] font-bold mb-4">Portfolio</p>
                <h1 ref={titleRef} className="text-4xl md:text-8xl font-bold text-white uppercase tracking-tighter">
                  All <span className="italic font-serif text-brand">Projects</span>
                </h1>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className="project-grid-item">
                    <IndividualProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          </main>
          <Footer />
        </PageWrapper>
      )}
    </>
  );
}


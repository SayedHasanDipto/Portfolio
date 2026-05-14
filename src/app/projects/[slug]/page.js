"use client";

import { useParams, useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FluidBackground from "@/components/FluidBackground";
import Preloader from "@/components/Preloader";
import { FaArrowLeft, FaExternalLinkAlt, FaTools, FaLightbulb, FaExclamationTriangle, FaAsterisk } from "react-icons/fa";

export default function ProjectDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const project = projects.find((p) => p.slug === slug);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll();

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 italic font-serif">Project Not Found</h1>
          <Link href="/projects" className="text-brand hover:underline">Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <FluidBackground />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden" ref={containerRef}>
          <Header />
          
          <main className="relative">
            {/* Elegant Header Section */}
            <section className="pt-32 md:pt-40 pb-16 px-6">
              <div className="max-w-7xl mx-auto">
                <motion.button
                  onClick={() => router.back()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group flex items-center gap-3 text-white/30 hover:text-brand transition-all mb-12 uppercase text-[10px] font-bold tracking-[0.5em]"
                >
                  <span className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-brand transition-all" />
                  Return to Archive
                </motion.button>

                <div className="grid lg:grid-cols-12 gap-12 items-end">
                  <div className="lg:col-span-8">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-brand text-xs uppercase tracking-[0.6em] font-black mb-6"
                    >
                      {project.category} // 0{project.id}
                    </motion.p>
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-5xl md:text-[7rem] font-bold uppercase tracking-tighter leading-[0.85] font-sans"
                    >
                      {project.title.split(' ').map((word, i) => (
                        <span key={i} className="block overflow-hidden">
                          <motion.span 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 1 }}
                            className="block"
                          >
                            {word}
                          </motion.span>
                        </span>
                      ))}
                    </motion.h1>
                  </div>
                  <div className="lg:col-span-4 lg:text-right pb-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col gap-2 md:items-end"
                    >
                      <span className="text-[10px] uppercase tracking-widest text-white/30">Client Experience</span>
                      <span className="text-xl font-serif italic text-white/60">Premium Digital Craftsmanship</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* Immersive Hero Image with Parallax */}
            <section className="px-6 mb-24">
              <div className="max-w-7xl mx-auto relative h-[50vh] md:h-[70vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                </motion.div>
                
                {/* Floating Meta Box */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="absolute bottom-12 right-12 hidden md:block p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl"
                >
                  <div className="flex gap-12">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-brand mb-2 font-black">Timeline</p>
                      <p className="text-sm font-bold">2024 Series</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-brand mb-2 font-black">Services</p>
                      <p className="text-sm font-bold">{project.category}</p>
                    </div>
                    <Link href="#" className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-dark hover:scale-110 transition-transform">
                      <FaExternalLinkAlt size={12} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Narrative Section */}
            <section className="py-24 px-6 bg-[#080808] border-y border-white/5">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-24">
                  <div className="lg:col-span-5">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="sticky top-32"
                    >
                      <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8 leading-none">
                        The <span className="italic font-serif text-brand">Narrative</span>
                      </h2>
                      <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light">
                        {project.fullDescription}
                      </p>
                    </motion.div>
                  </div>

                  <div className="lg:col-span-6 lg:col-start-7 space-y-24">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="group"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 group-hover:border-red-500/50 transition-colors">
                          <FaExclamationTriangle size={20} />
                        </div>
                        <h3 className="text-xs uppercase tracking-[0.4em] font-black text-white/40">Critical Challenge</h3>
                      </div>
                      <p className="text-xl text-white/80 leading-relaxed font-light pl-4 border-l border-white/10">
                        {project.challenge}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="group"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand group-hover:border-brand transition-colors">
                          <FaLightbulb size={20} />
                        </div>
                        <h3 className="text-xs uppercase tracking-[0.4em] font-black text-white/40">Technical Solution</h3>
                      </div>
                      <p className="text-xl text-white/80 leading-relaxed font-light pl-4 border-l border-white/10">
                        {project.solution}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Stack (Bento Style) */}
            <section className="py-24 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter">
                    Built for <span className="italic font-serif text-brand">Excellence</span>
                  </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {project.tools.map((tool, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-10 py-6 bg-white/[0.02] border border-white/10 rounded-[2rem] hover:bg-white/5 hover:border-brand/40 transition-all cursor-default"
                    >
                      <span className="text-lg font-bold tracking-widest uppercase text-white/60">{tool}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer Navigation */}
            <section className="py-24 px-6 border-t border-white/5 bg-brand text-dark overflow-hidden relative group">
              <div className="absolute inset-0 bg-dark opacity-0 group-hover:opacity-5 transition-opacity" />
              <Link href="/#projects" className="flex flex-col items-center gap-8 group">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.8em] italic">
                  <FaAsterisk className="animate-spin-slow" />
                  The Journey Continues
                </div>
                <h2 className="text-5xl md:text-[7rem] font-bold uppercase tracking-tighter leading-none text-center">
                  Next <span className="italic font-serif">Project</span>
                </h2>
                <div className="w-24 h-24 rounded-full border-2 border-dark flex items-center justify-center group-hover:bg-dark group-hover:text-brand transition-all duration-700">
                   <FaArrowLeft className="rotate-180" size={32} />
                </div>
              </Link>
            </section>
          </main>
          
          <Footer />
        </div>
      )}
    </>
  );
}

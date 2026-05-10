"use client";

import { useParams, useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FluidBackground from "@/components/FluidBackground";
import Preloader from "@/components/Preloader";
import { FaArrowLeft, FaExternalLinkAlt, FaTools, FaLightbulb, FaExclamationTriangle } from "react-icons/fa";

export default function ProjectDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const project = projects.find((p) => p.slug === slug);
  const [isLoading, setIsLoading] = useState(true);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
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
        <>
          <Header />
          <main className="pt-24 md:pt-32 pb-24 px-4 md:px-6 min-h-screen">
            <div className="max-w-5xl mx-auto">
              {/* Back Button */}
              <motion.button
                onClick={() => router.back()}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-gray-400 hover:text-brand transition-colors mb-8 md:mb-12 uppercase text-[10px] md:text-xs font-bold tracking-widest"
              >
                <FaArrowLeft /> Back to projects
              </motion.button>

              {/* Hero Header */}
              <div className="mb-12 md:mb-16">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-brand text-xs uppercase tracking-[0.3em] font-bold mb-4 block"
                >
                  {project.category}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-6 md:mb-8"
                >
                  {project.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
                >
                  {project.fullDescription}
                </motion.p>
              </div>

              {/* Cover Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden mb-16 md:mb-24 border border-white/10"
              >
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1200px) 100vw, 1024px"
                />
              </motion.div>

              {/* Case Study Grid */}
              <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-16 md:mb-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-red-500/10 rounded-xl">
                      <FaExclamationTriangle className="text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">The Challenge</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {project.challenge}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-brand/10 rounded-xl">
                      <FaLightbulb className="text-brand" />
                    </div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">The Solution</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {project.solution}
                  </p>
                </motion.div>
              </div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-12 bg-white/5 border border-white/10 rounded-4xl"
              >
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-3 bg-white/10 rounded-xl text-white">
                    <FaTools />
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Technologies Used</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  {project.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:border-brand transition-colors cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Next Steps / CTA */}
              <div className="mt-32 text-center border-t border-white/10 pt-24">
                <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-8">
                  Like what you <span className="italic font-serif text-brand">see?</span>
                </h2>
                <Link href="/#contact" className="inline-block bg-brand text-dark px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                  Let&apos;s start your project
                </Link>
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

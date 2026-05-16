"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import FluidBackground from "@/components/FluidBackground";
import PageWrapper from "@/components/PageWrapper";
import { FiBriefcase, FiAward, FiCode, FiMapPin, FiCalendar } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    title: "Junior MERN Stack Developer",
    company: "Upwork & Fiverr",
    period: "2025 – Present",
    description: "Specializing in building high-performance, full-stack web applications using the MERN ecosystem. Focused on creating scalable architectures and seamless user experiences.",
    achievements: [
      "Developed and deployed 10+ full-stack applications for international clients.",
      "Implemented secure authentication systems using Better Auth and Next-Auth.",
      "Optimized database queries in MongoDB, resulting in a 30% improvement in load times.",
      "Integrated complex third-party APIs for payment gateways and social media."
    ],
    tech: ["Next.js", "React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Better Auth"],
    type: "Work"
  },
  {
    id: 2,
    title: "Junior Web Developer",
    company: "Upwork & Fiverr",
    period: "2023 – 2024",
    description: "Started my professional journey as a freelancer, delivering high-quality web solutions to clients worldwide. Focused on frontend excellence and responsive design.",
    achievements: [
      "Maintained a 5-star rating on freelance platforms through consistent delivery.",
      "Converted 50+ complex Figma designs into pixel-perfect React components.",
      "Built interactive UI components using Framer Motion and GSAP for premium branding.",
      "Collaborated with diverse clients to define project scopes and technical requirements."
    ],
    tech: ["React.js", "JavaScript", "HTML5", "CSS3", "GSAP", "Framer Motion", "Figma"],
    type: "Work"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "AB Agency",
    period: "2023 – 2024",
    description: "Bridged the gap between aesthetics and functionality by designing user-centric interfaces. Focused on accessibility and modern design trends.",
    achievements: [
      "Designed comprehensive design systems that improved development efficiency by 40%.",
      "Conducted user research and usability testing to iterate on product designs.",
      "Created high-fidelity prototypes that secured project approvals from stakeholders.",
      "Collaborated closely with developers to ensure design feasibility and implementation."
    ],
    tech: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    type: "Design"
  },
  {
    id: 4,
    title: "Computer Expert & Trainer",
    company: "Bakshibonj Post E Center",
    period: "2018 – 2023",
    description: "Shared my knowledge of computing and IT with the local community, empowering students and professionals with essential digital skills.",
    achievements: [
      "Trained over 200+ students in basic computing and office productivity tools.",
      "Managed IT infrastructure and troubleshooting for the training center.",
      "Developed a customized curriculum for vocational computer training.",
      "Awarded 'Best Trainer' for three consecutive years based on student feedback."
    ],
    tech: ["IT Support", "Networking", "Office Suite", "Public Speaking", "Curriculum Development"],
    type: "Training"
  }
];

export default function ExperiencePage() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".timeline-line",
          { height: 0 },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline-container",
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );

        // Glowing dot following the line
        gsap.fromTo(
          ".timeline-dot-tracker",
          { top: 0, opacity: 0 },
          {
            top: "100%",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline-container",
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );

        // Experience cards entrance on scroll
        const cards = gsap.utils.toArray(".experience-card");
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { 
              opacity: 0, 
              x: i % 2 === 0 ? -100 : 100,
              filter: "blur(10px)"
            },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 60%",
                scrub: 1,
              },
            }
          );
        });
      }, containerRef);
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
          <main className="pt-24 md:pt-32 pb-24 px-4 md:px-6 min-h-screen overflow-hidden dot-grid">
            <div className="max-w-7xl mx-auto" ref={containerRef}>
              {/* Hero Section */}
              <div className="text-center mb-24">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-brand text-xs uppercase tracking-[0.3em] font-bold mb-4"
                >
                  Career Journey
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter"
                >
                  Detailed <span className="italic font-serif text-brand">Experience</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="max-w-2xl mx-auto text-gray-400 mt-8 text-lg"
                >
                  A timeline of my professional growth, key achievements, and the evolution of my technical expertise.
                </motion.p>
              </div>

              {/* Timeline Section */}
              <div className="relative timeline-container">
                {/* Central Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block">
                  <div className="timeline-line absolute top-0 left-0 w-full bg-brand origin-top shadow-[0_0_10px_#D9FF00]" />
                  {/* Floating Tracker Dot */}
                  <div className="timeline-dot-tracker absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-brand rounded-full shadow-[0_0_20px_#D9FF00] z-20">
                    <div className="absolute inset-0 bg-brand rounded-full animate-ping opacity-50" />
                  </div>
                </div>

                <div className="space-y-24 md:space-y-48">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="relative flex flex-col md:flex-row items-center">
                      {/* Timeline Dot */}
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#050505] border-2 border-brand rounded-full z-10 hidden md:block" />

                      {/* Content Card */}
                      <div className={`experience-card w-full md:w-[45%] ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"} group`}>
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-12 hover:border-brand/30 transition-all duration-500 relative">
                          {/* Type Badge */}
                          <div className="absolute top-8 right-8 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            {exp.type === "Work" ? <FiBriefcase /> : exp.type === "Design" ? <FiAward /> : <FiCode />}
                            {exp.type}
                          </div>

                          <div className="mb-8">
                            <span className="text-brand font-bold text-sm block mb-2">{exp.period}</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-brand transition-colors">{exp.title}</h3>
                            <p className="text-gray-400 font-medium flex items-center gap-2">
                              <FiMapPin className="text-brand/50" /> {exp.company}
                            </p>
                          </div>

                          <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                            {exp.description}
                          </p>

                          <div className="space-y-4 mb-8">
                            <h4 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                              <FiAward className="text-brand" /> Key Achievements
                            </h4>
                            <ul className="space-y-3">
                              {exp.achievements.map((ach, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                                  {ach}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-8 border-t border-white/5">
                            <h4 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2 mb-4">
                              <FiCode className="text-brand" /> Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.tech.map((t, i) => (
                                <span key={i} className="text-[10px] font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 group-hover:border-brand/50 transition-colors">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Period indicator for mobile */}
                      <div className="md:hidden mt-4 text-brand font-bold uppercase tracking-widest text-xs">
                        {exp.period}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </PageWrapper>
      )}
    </>
  );
}

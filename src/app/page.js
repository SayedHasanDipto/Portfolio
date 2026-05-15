"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile"; // This is the Bento Grid version
import Partners from "@/components/Partners";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import FluidBackground from "@/components/FluidBackground";
import PageWrapper from "@/components/PageWrapper";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
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
          <main className="pt-20">
            <Hero />
            <Profile /> 
            <Stats />
            <Partners />
            <Experience />
            <Projects />
            <Process />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </PageWrapper>
      )}
    </>
  );
}

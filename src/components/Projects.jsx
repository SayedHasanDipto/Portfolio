"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title mask reveal
      gsap.fromTo(
        titleRef.current,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 50 },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Cards Stagger
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "Chat Dashboard",
      tags: ["UX/UI", "Product Design"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoAYq-NuTr7NxQ2uHOMrQx-EiaTv3VTDSVPeLUh_KGXxF7QctTi-Zkv-uPX0TVQOjRmc0eYBPZrejCl7v_02IkuviAbmbIem6RhpsufSJtbY_ZfhTng4l8fPos3aQxwO3N5JBqYCaCGyLWyfzVTO1aHiJpDJNxQMj_e3hDYwRY5zwJHRihqgscoy4c1UBQ9hEot0RCkA30yJC8vxCk5M9J_YtEz9rjAZvVPSDYI7Y8ZjxSIpqYqvDudePX0m9O8Z6h9FM6lea9FQo"
    },
    {
      title: "To-Do List Dashboard",
      tags: ["Web", "Product Design"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz2u_R8B-LehAcejS4CDYRnrah48mSr1Rv0djsorAkkchGws6rsTgPRV5Gaz8_uqWhpX7RlIsnyqyf0ioD94M5Mhjn-PLF-ST3izVtFrme5bt8ZU37Ulty_kjPcQt6osIpiijR8f75EM0MT-eKjrbF-2HkF_gF5XvrG_v4jvbhZXUJV1oJ_0x9QTLoFWtATXkWb4Yr2fbqEdfdMYwPbiMSH2PggOuot5TQVFbUy6vSANxcihuM6kE8XUovmkbsnj87ay9cHRUJrpU"
    },
    {
      title: "NFT Marketplace Dashboard",
      tags: ["Mobile", "Product Design"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2NUDr-3D6YemCC3j1HUM6mmx0VgGEzX3eTX-738kNrnmG9ys0lxMFNpmv3pBP8c0-KmaPcs8QbWEjEyRsWCTwQO_ahk42Iv5Tlbs-iNzDsRMeJN_MN8pH04WvgPT5l-alPFMKvawGdyZ73ooEJt50YJGL9Sy_gtsaI6wk2nBCagmHYrBpkvv-7tBbw_YkscB5Db1Sa_wiBDxNLk6r9L2-1dzBIGAS0_xCymxvjcFDS2zKMAvhBoWSRSTLRO4qIABFgB2IFfrZJt4"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-black/20 transition-colors" id="projects" data-purpose="latest-projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div className="overflow-hidden">
            <h2 ref={titleRef} className="text-5xl font-bold text-white">Latest Projects</h2>
          </div>
          <motion.a 
            whileHover={{ x: 5 }}
            className="text-sm font-semibold border-b border-white pb-1 hover:text-brand hover:border-brand transition-colors text-white" 
            href="#"
            data-cursor="hover"
          >
            See All →
          </motion.a>
        </div>
        
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
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
          <motion.img 
            style={{ y: imgY, scale: 1.1 }}
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.15]" 
            src={project.img} 
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-500 z-10 pointer-events-none"></div>
        </div>
      </div>
      
      <div style={{ transform: "translateZ(30px)" }}>
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
  );
}

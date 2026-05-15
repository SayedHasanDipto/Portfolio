"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const linkGroups = [
    {
      title: "Services",
      links: [
        { name: "Frontend Development", href: "/#projects" },
        { name: "MERN Stack", href: "/#about" },
        { name: "UI/UX Design", href: "/#about" },
        { name: "Optimization", href: "/#projects" }
      ]
    },
  ];

  return (
    <footer ref={footerRef} className="bg-white dark:bg-dark pt-20 pb-10 px-6 border-t border-gray-100 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-20 gap-12 md:gap-20">

          <div className="md:w-1/3 text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-6 group cursor-pointer" data-cursor="hover">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-8 h-8 bg-brand rounded-full flex items-center justify-center font-bold text-xs text-dark"
              >
                SH
              </motion.div>
              <span className="font-bold tracking-tighter text-xl text-dark dark:text-white uppercase">Sayed Hasan Dipto</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              A full-stack developer based in Bangladesh, specializing in Next.js and modern web ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-20 text-center md:text-left">
            {linkGroups.map((group, i) => (
              <div key={i}>
                <h5 className="font-bold text-sm mb-6 uppercase tracking-widest text-dark dark:text-white">{group.title}</h5>
                <ul className="text-gray-500 dark:text-gray-400 text-sm space-y-3">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.href}
                        className="inline-block transition-colors hover:text-brand"
                        data-cursor="hover"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h5 className="font-bold text-sm mb-6 uppercase tracking-widest text-dark dark:text-white">CONNECT</h5>
              <ul className="text-gray-500 dark:text-gray-400 text-sm space-y-4">
                {[
                  { icon: <FaGithub />, text: "sayedhasandipto", href: "https://github.com/sayedhasandipto" },
                  { icon: <FaEnvelope />, text: "dev.sayedhasan@gmail.com", href: "mailto:dev.sayedhasan@gmail.com" },
                  { icon: <FaMapMarkerAlt />, text: "Dhaka, BD", href: "https://maps.google.com/?q=Dhaka,Bangladesh" },
                ].map((item, i) => (
                  <li key={i}>
                    <motion.a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-center md:justify-start gap-3 cursor-pointer group"
                      data-cursor="hover"
                    >
                      <span className="text-gray-400 group-hover:text-brand transition-colors text-lg">{item.icon}</span>
                      <span className="group-hover:text-dark dark:group-hover:text-white transition-colors">{item.text}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">© 2026 Sayed Hasan Dipto. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-400 dark:text-gray-500">
            <Link href="/privacy" className="transition-colors hover:text-brand">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-brand">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>

  );
}

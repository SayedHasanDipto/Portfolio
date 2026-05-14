"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function Contact() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);

  // Form State
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Magnetic button state
  const buttonRef = useRef(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setBtnPos({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setBtnPos({ x: 0, y: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");

    const formData = new FormData(e.target);
    // Replace with your Web3Forms Access Key
    formData.append("access_key", "d723d673-4114-4859-a14d-36cf3d54ed77");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message Sent Successfully!");
        e.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      setResult("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 5000);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        containerRef.current,
        { scale: 0.9, opacity: 0, filter: "blur(10px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
      )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="p-4 md:p-12 relative overflow-hidden bg-transparent transition-colors" id="contact">
      {/* Animated Light Sweep Background */}
      <div className="absolute inset-0 z-0 bg-transparent transition-colors">
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-full h-full opacity-50 dark:opacity-20"
          style={{
            background: "linear-gradient(-45deg, rgba(255,255,255,0.05), rgba(240,240,240,0.05), rgba(217,255,0,0.1), rgba(255,255,255,0.05))",
            backgroundSize: "400% 400%",
          }}
        />
      </div>

      <div
        ref={containerRef}
        className="max-w-7xl mx-auto bg-[#0A0A0A] border border-white/5 rounded-3xl md:rounded-[3rem] p-6 md:p-20 text-white flex flex-col md:flex-row items-center gap-12 md:gap-16 relative z-10 shadow-2xl transition-colors"
      >
        <div className="md:w-3/5 text-center md:text-left">
          <h2 ref={headingRef} className="text-3xl md:text-6xl font-bold leading-tight uppercase text-white">
            Let&apos;s work together and create something extraordinary!
          </h2>
        </div>

        <div ref={formRef} className="md:w-2/5 w-full">
          <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group backdrop-blur-sm">
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <p className="text-lg font-medium mb-6 relative z-10 text-white">Send me a message</p>
            <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
              <input
                name="name"
                required
                className="w-full bg-white/10 border-white/20 rounded-xl py-3 px-4 focus:ring-brand focus:border-brand text-sm placeholder-gray-500 transition-all hover:bg-white/20 text-white"
                placeholder="Full Name"
                type="text"
              />
              <input
                name="email"
                required
                className="w-full bg-white/10 border-white/20 rounded-xl py-3 px-4 focus:ring-brand focus:border-brand text-sm placeholder-gray-500 transition-all hover:bg-white/20 text-white"
                placeholder="Email Address"
                type="email"
              />
              <textarea
                name="message"
                required
                className="w-full bg-white/10 border-white/20 rounded-xl py-3 px-4 focus:ring-brand focus:border-brand text-sm placeholder-gray-500 transition-all hover:bg-white/20 resize-none text-white"
                placeholder="Tell me about your project"
                rows="4"
              ></textarea>

              <motion.div
                ref={buttonRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ x: btnPos.x, y: btnPos.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                className="pt-2"
              >
                <motion.button
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand text-dark font-bold py-4 rounded-xl hover:bg-[#cbf000] transition-colors relative overflow-hidden group/btn shadow-[0_0_15px_rgba(217,255,0,0.3)] hover:shadow-[0_0_25px_rgba(217,255,0,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  data-cursor="hover"
                >
                  <span className="relative z-10">{isSubmitting ? "Sending..." : "Get Started"}</span>
                  <div className="absolute inset-0 bg-white/30 translate-y-[100%] group-hover/btn:translate-y-[0%] transition-transform duration-300 ease-out z-0"></div>
                </motion.button>
              </motion.div>

              {result && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center text-xs mt-4 ${result.includes("Successfully") ? "text-brand" : "text-red-500"}`}
                >
                  {result}
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

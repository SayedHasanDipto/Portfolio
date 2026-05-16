"use client";

import { useEffect, useRef } from 'react';

/**
 * InteractiveDotGrid Component
 * Renders a grid of dots on a canvas that reacts to mouse proximity.
 * Resizes to its parent container and only animates when in view.
 */
export default function InteractiveDotGrid() {
  const canvasRef = useRef(null);
  const isInView = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let dots = [];
    
    // Configuration
    const spacing = 40;
    const dotRadius = 1.2;
    const mouseRadius = 180;
    const color = "217, 255, 0"; // Brand color #D9FF00 in RGB
    
    const mouse = { x: -1000, y: -1000 };

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      // Handle High DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      initDots();
    };

    const initDots = () => {
      dots = [];
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          dots.push({ x, y, originX: x, originY: y });
        }
      }
    };

    const handleMouseMove = (e) => {
      if (!isInView.current) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const animate = () => {
      if (!isInView.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      dots.forEach(dot => {
        const dx = mouse.x - dot.originX;
        const dy = mouse.y - dot.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let scale = 1;
        let opacity = 0.25;

        if (dist < mouseRadius) {
          const force = 1 - dist / mouseRadius;
          const easeForce = force * force;
          
          scale = 1 + easeForce * 3;
          opacity = 0.25 + easeForce * 0.6;
          
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * (force * 10);
          const pushY = Math.sin(angle) * (force * 10);
          
          dot.x = dot.originX - pushX;
          dot.y = dot.originY - pushY;
        } else {
          dot.x += (dot.originX - dot.x) * 0.1;
          dot.y += (dot.originY - dot.y) * 0.1;
        }

        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isInView.current = entry.isIntersecting;
    }, { threshold: 0, rootMargin: "200px" });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
      intersectionObserver.observe(canvas.parentElement);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    updateSize();
    animate();

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}



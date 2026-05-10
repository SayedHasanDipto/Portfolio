"use client";

import { useState, useEffect, useRef } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#________";

export default function TextScramble({ text, autostart = true, delay = 0 }) {
  const [output, setOutput] = useState("");
  const frameRef = useRef(0);
  const queueRef = useRef([]);
  const resolveRef = useRef(null);

  const update = () => {
    let complete = 0;
    const newOutput = queueRef.current.map((item, i) => {
      let { from, to, start, end, char } = item;
      if (frameRef.current >= end) {
        complete++;
        return to;
      } else if (frameRef.current >= start) {
        if (!char || Math.random() < 0.28) {
          char = chars[Math.floor(Math.random() * chars.length)];
          queueRef.current[i].char = char;
        }
        return char;
      } else {
        return from;
      }
    });

    setOutput(newOutput.join(""));

    if (complete === queueRef.current.length) {
      resolveRef.current();
    } else {
      frameRef.current++;
      requestAnimationFrame(update);
    }
  };

  const scramble = (newText) => {
    const oldText = output || "";
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (resolveRef.current = resolve));
    queueRef.current = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queueRef.current.push({ from, to, start, end, char: "" });
    }
    
    frameRef.current = 0;
    update();
    return promise;
  };

  useEffect(() => {
    if (autostart) {
      const timer = setTimeout(() => {
        scramble(text);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [text]);

  return <span>{output}</span>;
}

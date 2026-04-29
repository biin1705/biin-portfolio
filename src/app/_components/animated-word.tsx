"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { heroWords } from "./portfolio-data";

export default function AnimatedWord() {
  const wordRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let index = 0;

    const interval = window.setInterval(() => {
      const element = wordRef.current;

      if (!element) {
        return;
      }

      index = (index + 1) % heroWords.length;
      gsap
        .timeline()
        .to(element, {
          y: -18,
          opacity: 0,
          duration: 0.24,
          ease: "power2.in",
        })
        .call(() => {
          element.textContent = heroWords[index];
        })
        .fromTo(
          element,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.42, ease: "power3.out" },
        );
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="inline-block whitespace-nowrap text-sky-400" ref={wordRef}>
      {heroWords[0]}
    </span>
  );
}

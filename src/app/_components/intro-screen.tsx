"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { INTRO_DURATION, profileInfo } from "./portfolio-data";
import ThreeHeroScene from "./three-hero-scene";

export default function IntroScreen() {
  const [progress, setProgress] = useState(0);
  const introRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef<HTMLParagraphElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const progressValue = { value: 0 };
      const progressDuration = INTRO_DURATION / 1000 - 0.25;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".intro-letter",
          { yPercent: 120, opacity: 0, rotateX: -80 },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.035,
          },
        )
        .fromTo(
          positionRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          "-=0.35",
        )
        .fromTo(
          ".intro-chip",
          { x: -18, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.58, stagger: 0.08 },
          "-=0.25",
        )
        .fromTo(
          ".intro-scan-line",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.72, stagger: 0.08 },
          "-=0.35",
        )
        .fromTo(
          imageRef.current,
          { clipPath: "inset(14% 14% 14% 14%)", opacity: 0, rotateY: -16 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            rotateY: 0,
            duration: 0.9,
          },
          "-=0.7",
        );

      gsap.set(barRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.to(progressValue, {
        value: 100,
        duration: progressDuration,
        ease: "power1.inOut",
        onUpdate: () => {
          const currentProgress = Math.round(progressValue.value);

          setProgress(currentProgress);
          gsap.set(barRef.current, {
            scaleX: currentProgress / 100,
          });
        },
      });

      gsap.to(".intro-float", {
        y: -10,
        duration: 1.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.12,
      });
    }, introRef);

    return () => context.revert();
  }, []);

  return (
    <motion.div
      ref={introRef}
      className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-zinc-950 px-5 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0">
        <ThreeHeroScene />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,theme(colors.sky.500/0.24),transparent_34rem),radial-gradient(circle_at_78%_58%,theme(colors.emerald.400/0.16),transparent_28rem),linear-gradient(135deg,theme(colors.zinc.950/0.82),theme(colors.zinc.950/0.94))]" />
      <div className="relative grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="rounded-[2rem] border border-white/10 bg-zinc-950/45 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8">
          <p className="mb-5 text-sm font-semibold uppercase text-sky-300">
            Portfolio loading
          </p>
          <div
            ref={nameRef}
            className="flex flex-wrap overflow-hidden text-4xl font-semibold leading-none sm:text-8xl lg:text-9xl"
          >
            {profileInfo.name.split("").map((letter, index) => (
              <span
                className="intro-letter inline-block will-change-transform"
                key={`${letter}-${index}`}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
          <p
            ref={positionRef}
            className="mt-6 text-xl font-medium text-zinc-300 sm:text-3xl"
          >
            {profileInfo.position}
          </p>

          <div className="mt-8 flex max-w-xl gap-3 flex-wrap">
            {["Landing Page", "CMS", "Dashboard"].map((item) => (
              <div
                className="intro-chip intro-float rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-xl space-y-3">
            {[78, 52, 88, 64].map((width, index) => (
              <div
                className="intro-scan-line h-2 rounded-full bg-white/10"
                key={width}
                style={{ width: `${width}%`, transformOrigin: "left center" }}
              >
                <span
                  className={`block h-full rounded-full ${
                    index % 2 === 0 ? "bg-sky-400" : "bg-emerald-400"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 flex max-w-xl items-center gap-5">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                ref={barRef}
                className="h-full rounded-full bg-emerald-400"
              />
            </div>
            <span className="w-16 text-right text-2xl font-semibold tabular-nums text-white">
              {progress}%
            </span>
          </div>
        </div>

        <div
          ref={imageRef}
          className="max-sm:hidden relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/45 shadow-2xl shadow-black/40 backdrop-blur-sm lg:max-w-md"
        >
          <Image
            src="/biin.jpg"
            alt="Default profile placeholder"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

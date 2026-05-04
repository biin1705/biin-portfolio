"use client";

import { motion } from "framer-motion";
import AnimatedWord from "./animated-word";
import { profileInfo, summaryPoints } from "./portfolio-data";
import ReactLogoScene from "./react-logo-scene";
import ThreeHeroScene from "./three-hero-scene";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative grid min-h-screen snap-start snap-always items-center overflow-hidden bg-zinc-950 px-5 py-24 text-white sm:px-8 lg:px-10"
    >
      <div className="absolute inset-0">
        <ThreeHeroScene />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,theme(colors.sky.500/0.22),transparent_30rem),radial-gradient(circle_at_78%_70%,theme(colors.emerald.400/0.14),transparent_28rem),linear-gradient(135deg,theme(colors.zinc.950/0.7),theme(colors.zinc.950/0.92))]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          className="max-w-3xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.65 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-medium text-zinc-200 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {profileInfo.position}
          </div>
          <h1 className="text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            I build fast, elegant <AnimatedWord /> for modern web products.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Frontend developer focused on polished interaction, maintainable UI
            systems, and product-ready web experiences.
          </p>

          <div className="mt-7 grid gap-3">
            {summaryPoints.map((point, index) => (
              <motion.p
                className="rounded-lg border border-white/10 bg-white/10 p-4 text-sm leading-6 text-zinc-200 shadow-sm backdrop-blur"
                initial={{ opacity: 0, x: -18 }}
                key={point}
                transition={{ delay: 0.12 * index, duration: 0.5 }}
                viewport={{ amount: 0.8 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                {point}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/60 shadow-2xl shadow-black/30 backdrop-blur-sm sm:min-h-[520px]"
          initial={{ opacity: 0, rotateY: -18, y: 32 }}
          style={{ transformPerspective: 1200 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.55 }}
          whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,theme(colors.sky.400/0.22),transparent_20rem),radial-gradient(circle_at_72%_68%,theme(colors.emerald.400/0.13),transparent_18rem)]" />
          
          <div className="absolute inset-0">
            <ReactLogoScene />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

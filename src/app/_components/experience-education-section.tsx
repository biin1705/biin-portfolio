"use client";

import { motion } from "framer-motion";
import { educationItems, experienceItems } from "./portfolio-data";

function TimelineColumn({
  items,
  label,
}: {
  items: typeof experienceItems;
  label: string;
}) {
  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
      initial={{ opacity: 0, y: 34 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <p className="text-sm font-semibold uppercase text-amber-300">{label}</p>
      <div className="mt-5 space-y-5">
        {items.map((item, index) => (
          <motion.article
            className="border-l border-white/15 pl-5"
            initial={{ opacity: 0, x: -20 }}
            key={`${item.title}-${item.period}`}
            transition={{ delay: index * 0.12, duration: 0.55 }}
            viewport={{ amount: 0.7 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <p className="text-sm font-semibold text-sky-300">{item.period}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {item.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-zinc-300">
              {item.place}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {item.description}
            </p>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}

export default function ExperienceEducationSection() {
  return (
    <section
      id="experience"
      className="grid min-h-screen snap-start snap-always items-center bg-zinc-950 px-5 py-24 text-white sm:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 34 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.7 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl">
            Experience and learning path.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            A compact overview of my frontend practice, project experience, and
            ongoing learning focus.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <TimelineColumn items={experienceItems} label="Work Experience" />
          <TimelineColumn items={educationItems} label="Education" />
        </div>
      </div>
    </section>
  );
}

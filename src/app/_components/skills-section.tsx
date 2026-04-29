"use client";

import { motion } from "framer-motion";
import { skillGroups } from "./portfolio-data";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="grid min-h-screen snap-start snap-always items-center bg-white px-5 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.65 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="mt-3 text-4xl font-semibold leading-tight text-zinc-950 sm:text-6xl">
            Skills built around product-quality frontend work.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600">
            I combine solid UI engineering with motion and creative frontend
            tools, so the interface feels clear, responsive, and memorable.
          </p>
        </motion.div>

        <div className="grid gap-5">
          {skillGroups.map((group, index) => (
            <motion.article
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm"
              initial={{ opacity: 0, x: 44, rotateY: -8 }}
              key={group.title}
              transition={{
                delay: index * 0.12,
                duration: 0.62,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ amount: 0.6 }}
              whileHover={{ x: -8, rotateY: 2 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            >
              <div className={`mb-5 h-2 w-16 rounded-full ${group.accent}`} />
              <div className="grid gap-4 sm:grid-cols-[0.7fr_1fr]">
                <div>
                  <h3 className="text-2xl font-semibold text-zinc-950">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {group.description}
                  </p>
                </div>
                <div className="flex flex-wrap content-start gap-2">
                  {group.items.map((item) => (
                    <span
                      className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-zinc-700 ring-1 ring-zinc-200"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

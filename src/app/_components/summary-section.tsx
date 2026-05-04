"use client";

import { motion } from "framer-motion";
import { summaryCards } from "./portfolio-data";

export default function SummarySection() {
  return (
    <section
      id="summary"
      className="grid min-h-screen snap-start snap-always items-center bg-zinc-100 px-5 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.65 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mt-3 text-4xl font-semibold leading-tight text-zinc-950">
            A quick view of who I am, what I aim for, and what keeps me curious.
          </h2>
        </motion.div>

        <div className="relative mt-10 min-h-[38rem] md:min-h-[34rem]">
          {summaryCards.map((card, index) => (
            <motion.article
              className={`relative mb-4 rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/70 md:absolute ${card.position}`}
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              key={card.title}
              transition={{
                delay: index * 0.18,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ amount: 0.45 }}
              whileHover={{ y: -8, rotate: 0, scale: 1.01 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
            >
              <div className={`mb-5 h-2 w-18 rounded-full ${card.accent}`} />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                {String(index + 1).padStart(2, "0")} / {card.title}
              </p>
              <p className="mt-4 text-lg leading-8 text-zinc-700">
                {card.content}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profileInfo } from "./portfolio-data";

export default function SiteNav() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <nav className="fixed inset-x-4 top-4 z-30 mx-auto flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between rounded-full border border-white/60 bg-white/80 px-5 py-3 text-zinc-950 shadow-sm backdrop-blur-md sm:px-6">
      <a href="#" className="text-base font-semibold">
        {profileInfo.name}
      </a>
      <div className="hidden items-center gap-7 text-sm font-medium text-zinc-600 md:flex">
        <a className="transition hover:text-zinc-950" href="#about">
          About
        </a>
        <a className="transition hover:text-zinc-950" href="#skills">
          Skills
        </a>
        <a className="transition hover:text-zinc-950" href="#experience">
          Experience
        </a>
        <a className="transition hover:text-zinc-950" href="#contact">
          Contact
        </a>
      </div>
      <div className="relative flex items-center gap-2">
        <button
          className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:border-zinc-950"
          onClick={() => setIsContactOpen((current) => !current)}
          type="button"
        >
          Contact Me
        </button>
        <a
          className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
          download
          href={profileInfo.cvPath}
        >
          Get CV
        </a>

        <AnimatePresence>
          {isContactOpen ? (
            <motion.div
              className="absolute right-0 top-12 w-64 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl shadow-zinc-300/60"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
            >
              <a
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
                href={`mailto:${profileInfo.email}`}
              >
                Contact via Email
                <span className="mt-1 block text-xs font-medium text-zinc-500">
                  {profileInfo.email}
                </span>
              </a>
              <a
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
                href={`tel:${profileInfo.phone}`}
              >
                Contact via Phone
                <span className="mt-1 block text-xs font-medium text-zinc-500">
                  {profileInfo.phone}
                </span>
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </nav>
  );
}

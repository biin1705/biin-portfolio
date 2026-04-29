"use client";

import { motion } from "framer-motion";
import { profileInfo } from "./portfolio-data";

const contactItems = [
  {
    label: "Email",
    value: profileInfo.email,
    href: `mailto:${profileInfo.email}`,
    action: "Open mail app",
    accent: "bg-sky-500",
    icon: (
      <path d="M4 6.5h16v11H4v-11Zm1.6 1.4 6.4 4.4 6.4-4.4M5.5 16l4.8-4m8.2 4-4.8-4" />
    ),
  },
  {
    label: "Phone",
    value: profileInfo.phone,
    href: `tel:${profileInfo.phone}`,
    action: "Call directly",
    accent: "bg-emerald-500",
    icon: (
      <path d="M8.2 4.8 10 8.7l-2 1.5c1.2 2.5 3.1 4.4 5.6 5.6l1.5-2 3.9 1.8-.7 3.1c-.2.8-.9 1.3-1.7 1.2C9.9 19.4 4.6 14.1 4.1 7.4 4 6.6 4.5 5.9 5.3 5.7l2.9-.9Z" />
    ),
  },
  {
    label: "CV",
    value: "Download PDF",
    href: profileInfo.cvPath,
    action: "Save file",
    accent: "bg-amber-400",
    download: true,
    icon: <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 18.5h14" />,
  },
];

export default function ContactMeSection() {
  return (
    <section
      id="contact"
      className="grid min-h-screen snap-start snap-always items-center bg-zinc-50 px-5 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.65 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="mt-3 text-5xl font-semibold leading-tight text-zinc-950 sm:text-7xl">
            Let&apos;s build something clean and memorable.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            I’m currently open to new opportunities and collaborations. Whether
            you have a question or just want to say hi, my inbox is always open!
          </p>
        </motion.div>

        <div className="grid gap-3">
          {contactItems.map((item, index) => (
            <motion.a
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 hover:shadow-2xl hover:shadow-zinc-200/80"
              download={item.download}
              href={item.href}
              initial={{ opacity: 0, x: 34, rotateY: -6 }}
              key={item.label}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              viewport={{ amount: 0.6 }}
              whileHover={{ x: -6, rotateY: 2, scale: 1.015 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              whileTap={{ scale: 0.985 }}
            >
              <motion.div
                className={`absolute inset-y-0 left-0 w-1.5 ${item.accent}`}
                initial={{ scaleY: 0.35 }}
                transition={{ duration: 0.25 }}
                whileHover={{ scaleY: 1 }}
              />
              <div className="flex items-center gap-4 pl-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white transition group-hover:bg-sky-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase text-zinc-500">
                    {item.label}
                  </p>
                  <p className="mt-1 truncate text-lg font-semibold text-zinc-950 sm:text-xl">
                    {item.value}
                  </p>
                </div>
                <div className="hidden rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600 transition group-hover:bg-zinc-950 group-hover:text-white sm:block">
                  {item.action}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

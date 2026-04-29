"use client";

import { AnimatePresence, motion } from "framer-motion";
import ThreeHeroScene from "./three-hero-scene";

type ThreeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ThreeModal({ isOpen, onClose }: ThreeModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-40 grid place-items-center bg-zinc-950/80 p-5 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative h-[min(76vh,42rem)] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50"
            initial={{ y: 50, rotateX: -16, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, rotateX: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, rotateX: 12, scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1200 }}
          >
            <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between text-sm text-white">
              <span className="font-semibold">3D motion modal</span>
              <button
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200"
                onClick={onClose}
                type="button"
              >
                Close
              </button>
            </div>
            <ThreeHeroScene />
            <div className="absolute bottom-5 left-5 right-5 z-10 grid gap-3 rounded-xl border border-white/10 bg-zinc-950/70 p-4 text-white backdrop-blur-md sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-sm font-medium uppercase text-emerald-300">
                  Three.js + Framer Motion
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Interactive product-grade motion layer.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-zinc-300">
                Canvas animation handles the 3D object while Framer Motion
                controls the modal transition and depth.
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

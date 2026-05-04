"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ContactMeSection from "./_components/contact-me-section";
import ExperienceEducationSection from "./_components/experience-education-section";
import HeroSection from "./_components/hero-section";
import IntroScreen from "./_components/intro-screen";
import { INTRO_DURATION } from "./_components/portfolio-data";
import SiteNav from "./_components/site-nav";
import SkillsSection from "./_components/skills-section";
import SummarySection from "./_components/summary-section";
import ThreeModal from "./_components/three-modal";

export default function PortfolioExperience() {
  const [showIntro, setShowIntro] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), INTRO_DURATION);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{showIntro ? <IntroScreen /> : null}</AnimatePresence>

      <SiteNav />
      <main className="h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth bg-zinc-50 text-zinc-950">
        <HeroSection />
        <SummarySection />
        <SkillsSection />
        <ExperienceEducationSection />
        <ContactMeSection />
      </main>

      <ThreeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

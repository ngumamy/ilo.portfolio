"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import portrait from "@/public/portrait.png";
import { profile } from "@/lib/site";
import type { SectionId } from "@/lib/sections";

export default function Resume({
  direction,
  goToSection,
}: {
  direction: number;
  goToSection: (id: SectionId) => void;
}) {
  return (
    <motion.div
      className="grid h-full min-h-0 w-full grid-cols-1 items-center gap-8 overflow-y-auto py-6 pr-12 sm:gap-10 sm:pr-16 lg:grid-cols-[minmax(15rem,22rem)_minmax(0,1fr)] lg:gap-14 lg:overflow-hidden lg:py-8 xl:gap-16 xl:pr-20"
      initial={{ opacity: 0, y: direction >= 0 ? 24 : -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-[20rem] lg:mx-0 lg:max-w-none">
        <div className="resume-portrait-glow pointer-events-none absolute inset-x-[6%] top-[52%] bottom-0 rounded-full" />
        <Image
          src={portrait}
          alt={`Portrait de ${profile.name}`}
          placeholder="blur"
          unoptimized
          sizes="(min-width: 1024px) 22rem, 18rem"
          className="resume-portrait-img relative h-auto w-full object-contain"
        />
      </div>

      <div className="min-w-0 pb-4 lg:pb-0">
        <p className="font-sans text-sm font-semibold tracking-[0.18em] text-[var(--section-accent)] uppercase">
          {profile.about.eyebrow}
        </p>
        <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl xl:text-5xl dark:text-white">
          {profile.name}
        </h2>
        <p className="mt-3 font-sans text-base font-medium text-slate-600 sm:text-lg dark:text-slate-300">
          {profile.roles}
        </p>
        <p className="mt-6 font-sans text-lg font-semibold text-slate-900 dark:text-white">
          {profile.about.lead}
        </p>
        {profile.about.body.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-4 max-w-xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-200"
          >
            {paragraph}
          </p>
        ))}

        <ul className="mt-6 flex flex-wrap gap-2">
          {profile.about.focus.map((item) => (
            <li
              key={item}
              className="rounded-full bg-[color-mix(in_srgb,var(--section-accent)_12%,transparent)] px-3 py-1 font-sans text-sm font-medium text-slate-800 ring-1 ring-[color-mix(in_srgb,var(--section-accent)_28%,transparent)] dark:text-slate-100"
            >
              {item}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => goToSection("services")}
          className="mt-8 inline-flex h-12 items-center px-1 font-sans text-sm font-semibold text-slate-600 underline-offset-4 transition-colors hover:text-[var(--section-accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/50 dark:text-slate-300"
        >
          Mes services
        </button>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

import { profile } from "@/lib/site";
import type { SectionId } from "@/lib/sections";

export default function Career({
  direction,
  goToSection,
}: {
  direction: number;
  goToSection: (id: SectionId) => void;
}) {
  return (
    <motion.div
      className="flex h-full min-h-0 w-full flex-col overflow-y-auto py-6 pr-12 sm:pr-16 lg:py-8 xl:pr-20"
      initial={{ opacity: 0, y: direction >= 0 ? 24 : -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
    >
      <p className="font-sans text-sm font-semibold tracking-[0.18em] text-[var(--section-accent)] uppercase">
        Parcours
      </p>
      <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl xl:text-5xl dark:text-white">
        Formation, expérience et compétences.
      </h2>
      <p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-200">
        Un parcours construit entre ingénierie informatique, administration des systèmes,
        développement web et mise en production.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)]">
        <div>
          <h3 className="font-sans text-xl font-bold text-slate-950 dark:text-white">
            Expérience & formation
          </h3>
          <ol className="mt-5 space-y-5 border-l border-slate-200 pl-5 dark:border-slate-700">
            {profile.career.timeline.map((item, index) => (
              <motion.li
                key={`${item.period}-${item.title}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.12 + index * 0.07,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="relative"
              >
                <span className="absolute -left-[1.58rem] top-1.5 size-2.5 rounded-full border-2 border-white bg-[var(--section-accent)] dark:border-[#0d1b24]" />
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[var(--section-accent)]">
                  {item.period}
                </p>
                <h4 className="mt-1 font-sans text-lg font-semibold text-slate-950 dark:text-white">
                  {item.title}
                </h4>
                <p className="mt-1 font-sans text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.organization}
                </p>
                <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        <aside className="rounded-3xl border border-slate-200/80 bg-white/75 p-5 shadow-sm dark:border-slate-700/80 dark:bg-[#102530]/65">
          <h3 className="font-sans text-xl font-bold text-slate-950 dark:text-white">
            Compétences
          </h3>
          <div className="mt-5 space-y-5">
            {profile.career.skills.map((group) => (
              <div key={group.title}>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[var(--section-accent)]">
                  {group.title}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-sans text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <button
        type="button"
        onClick={() => goToSection("contact")}
        className="mt-8 mb-4 inline-flex h-12 w-fit items-center justify-center rounded-full bg-gradient-to-r from-[#19b5c6] to-[#3b5bdb] px-6 font-sans text-sm font-semibold text-white shadow-[0_12px_28px_rgba(25,181,198,0.28)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/50"
      >
        Travailler ensemble
      </button>
    </motion.div>
  );
}

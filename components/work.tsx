"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

import { profile } from "@/lib/site";
import type { SectionId } from "@/lib/sections";

export default function Work({
  direction,
  goToSection,
}: {
  direction: number;
  goToSection: (id: SectionId) => void;
}) {
  return (
    <motion.div
      className="flex h-full min-h-0 w-full flex-col justify-center overflow-y-auto py-6 pr-12 sm:pr-16 lg:py-8 xl:pr-20"
      initial={{ opacity: 0, y: direction >= 0 ? 24 : -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
    >
      <p className="font-sans text-sm font-semibold tracking-[0.18em] text-[var(--section-accent)] uppercase">
        Projets
      </p>
      <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl xl:text-5xl dark:text-white">
        Des projets pensés pour le résultat.
      </h2>
      <p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-200">
        J’accompagne les marques et les équipes qui veulent un produit web solide,
        rapide et fiable, de la stratégie à la mise en production.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {profile.projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: 0.1 + index * 0.08,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-[#102530]/70"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-[color-mix(in_srgb,var(--section-accent)_12%,transparent)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--section-accent)]">
                {project.category}
              </span>
              <ArrowUpRightIcon className="size-4 text-slate-500 dark:text-slate-300" />
            </div>

            <h3 className="mt-5 font-sans text-2xl font-bold text-slate-950 dark:text-white">
              {project.title}
            </h3>

            <p className="mt-3 font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {project.description}
            </p>

            <ul className="mt-5 space-y-2">
              {project.outcomes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 font-sans text-sm text-slate-700 dark:text-slate-200"
                >
                  <span className="mt-1.5 size-1.5 rounded-full bg-[var(--section-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 pb-4">
        <button
          type="button"
          onClick={() => goToSection("contact")}
          className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#19b5c6] to-[#3b5bdb] px-6 font-sans text-sm font-semibold text-white shadow-[0_12px_28px_rgba(25,181,198,0.28)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/50"
        >
          Démarrer un projet
        </button>
        <button
          type="button"
          onClick={() => goToSection("services")}
          className="inline-flex h-12 items-center px-1 font-sans text-sm font-semibold text-slate-600 underline-offset-4 transition-colors hover:text-[var(--section-accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/50 dark:text-slate-300"
        >
          Voir mes services
        </button>
      </div>
    </motion.div>
  );
}

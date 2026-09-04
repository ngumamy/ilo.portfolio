"use client";

import type { ComponentType } from "react";
import {
  CloudArrowUpIcon,
  GlobeIcon,
  ShoppingCartIcon,
  StackIcon,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

import { profile } from "@/lib/site";
import type { SectionId } from "@/lib/sections";

const serviceIcons: Record<
  (typeof profile.services.items)[number]["id"],
  ComponentType<{ className?: string; weight?: "duotone" | "regular" }>
> = {
  web: GlobeIcon,
  saas: StackIcon,
  commerce: ShoppingCartIcon,
  devops: CloudArrowUpIcon,
};

export default function Services({
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
        {profile.services.eyebrow}
      </p>
      <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl xl:text-5xl dark:text-white">
        {profile.services.title}
      </h2>
      <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-200">
        {profile.services.lead}
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {profile.services.items.map((service, index) => {
          const Icon = serviceIcons[service.id];

          return (
            <motion.li
              key={service.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.12 + index * 0.05,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="rounded-2xl bg-white/70 p-5 ring-1 ring-slate-200/90 transition-colors hover:ring-[var(--section-accent)]/50 dark:bg-[#102530]/55 dark:ring-slate-700/80"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--section-accent)_14%,transparent)] text-[var(--section-accent)]">
                <Icon className="size-5" weight="duotone" />
              </div>
              <h3 className="mt-4 font-sans text-lg font-semibold text-slate-950 dark:text-white">
                {service.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {service.text}
              </p>
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-4 pb-4">
        <button
          type="button"
          onClick={() => goToSection("work")}
          className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#19b5c6] to-[#3b5bdb] px-6 font-sans text-sm font-semibold text-white shadow-[0_12px_28px_rgba(25,181,198,0.28)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/50"
        >
          Voir mes projets
        </button>
        <button
          type="button"
          onClick={() => goToSection("contact")}
          className="inline-flex h-12 items-center px-1 font-sans text-sm font-semibold text-slate-600 underline-offset-4 transition-colors hover:text-[var(--section-accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/50 dark:text-slate-300"
        >
          Me contacter
        </button>
      </div>
    </motion.div>
  );
}

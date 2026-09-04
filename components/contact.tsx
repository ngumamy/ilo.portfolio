"use client";

import { EnvelopeSimpleIcon, MapPinIcon, RocketLaunchIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

import { profile } from "@/lib/site";
import type { SectionId } from "@/lib/sections";

export default function Contact({
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
      <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-sans text-sm font-semibold tracking-[0.18em] text-[var(--section-accent)] uppercase">
            Contact
          </p>
          <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl xl:text-5xl dark:text-white">
            Discutons votre prochain projet.
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-200">
            Vous avez une idée, un besoin ou un produit à faire évoluer ? Je vous aide à
            transformer la vision en solution fiable, performante et prête à l’usage.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${profile.contact.email}`}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 text-slate-800 transition-colors hover:border-[var(--section-accent)]/50 dark:border-slate-700 dark:bg-[#102530]/70 dark:text-slate-100"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--section-accent)_12%,transparent)] text-[var(--section-accent)]">
                <EnvelopeSimpleIcon className="size-5" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Email
                </span>
                <span className="font-sans text-base font-medium">{profile.contact.email}</span>
              </span>
            </a>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 text-slate-800 dark:border-slate-700 dark:bg-[#102530]/70 dark:text-slate-100">
              <span className="flex size-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--section-accent)_12%,transparent)] text-[var(--section-accent)]">
                <MapPinIcon className="size-5" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Localisation
                </span>
                <span className="font-sans text-base font-medium">{profile.contact.location}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-[color-mix(in_srgb,var(--section-accent)_10%,white)] p-6 shadow-lg shadow-slate-200/40 dark:border-slate-700 dark:from-[#0f2430] dark:via-[#102530] dark:to-[#15333f] dark:shadow-black/20">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-[var(--section-accent)]/10 text-[var(--section-accent)]">
              <RocketLaunchIcon className="size-5" />
            </span>
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Besoin d’un dev ?
              </p>
              <p className="font-sans text-lg font-semibold text-slate-950 dark:text-white">
                Je peux vous aider.
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-200">
            {profile.contact.services.map((service) => (
              <li key={service} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 rounded-full bg-[var(--section-accent)]" />
                <span>{service}</span>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${profile.contact.email}?subject=${encodeURIComponent("Demande de devis / projet")}`}
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#19b5c6] to-[#3b5bdb] px-6 font-sans text-sm font-semibold text-white shadow-[0_12px_28px_rgba(25,181,198,0.28)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/50"
          >
            Écrire un message
          </a>

          <button
            type="button"
            onClick={() => goToSection("accueil")}
            className="mt-4 inline-flex h-12 items-center px-1 font-sans text-sm font-semibold text-slate-600 underline-offset-4 transition-colors hover:text-[var(--section-accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/50 dark:text-slate-300"
          >
            Revenir à l’accueil
          </button>
        </div>
      </div>
    </motion.div>
  );
}

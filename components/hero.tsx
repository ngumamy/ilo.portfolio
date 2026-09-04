"use client";

import { useEffect, useState, type ComponentType } from "react";
import Image from "next/image";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

import heroMascot from "@/public/hero-mascot.png";
import HeroBackdrop from "@/components/hero-backdrop";

import { profile, type SocialId } from "@/lib/site";
import type { SectionId } from "@/lib/sections";

const socialIcons: Record<SocialId, ComponentType<{ className?: string }>> = {
  linkedin: LinkedinLogoIcon,
  github: GithubLogoIcon,
};

function Typewriter({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= text.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCount((value) => value + 1);
    }, count === 0 ? 280 : 72);

    return () => window.clearTimeout(timeout);
  }, [count, text]);

  return (
    <span className="font-sans text-3xl font-bold leading-[1.15] tracking-tight text-slate-950 sm:text-4xl xl:text-5xl dark:text-white">
      <span>{text.slice(0, count)}</span>
      <span className="hero-caret ml-0.5 inline-block h-[0.95em] w-[3px] translate-y-[0.08em] bg-[var(--section-accent)] align-baseline" />
    </span>
  );
}

export default function Hero({
  direction,
  goToSection,
}: {
  direction: number;
  goToSection: (id: SectionId) => void;
}) {

  return (
    <motion.div
      className="relative grid h-full min-h-0 w-full grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]"
      initial={{ opacity: 0, y: direction >= 0 ? 24 : -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
    >
      <HeroBackdrop />

      <div className="relative z-10 flex items-center px-4 py-8 sm:px-6 lg:px-10 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] xl:pr-6">
        <div className="max-w-xl xl:max-w-2xl">
          <p className="font-sans text-base font-medium text-slate-600 sm:text-lg dark:text-slate-300">
            {profile.greeting}{" "}
            <span className="font-semibold text-[var(--section-accent)]">{profile.name}</span>.
          </p>

          <h1 className="mt-3">
            <Typewriter text={profile.roles} />
          </h1>

          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-200">
            {profile.bioLead}{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              {profile.bioOffer}
            </strong>
            {profile.bioMid}{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              {profile.bioValues}
            </strong>
            .
          </p>

          <p className="mt-5 font-sans text-base font-bold tracking-wide text-[var(--section-accent)] sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => goToSection("work")}
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#19b5c6] to-[#3b5bdb] px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(25,181,198,0.28)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/50"
            >
              Voir mes projets
            </button>
            <button
              type="button"
              onClick={() => goToSection("contact")}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/50 dark:bg-white dark:text-slate-950 dark:ring-0"
            >
              Me contacter
            </button>
            <button
              type="button"
              onClick={() => goToSection("resume")}
              className="inline-flex h-12 items-center px-2 text-sm font-semibold text-slate-600 underline-offset-4 transition-colors hover:text-[var(--section-accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/50 dark:text-slate-300"
            >
              Mon parcours
            </button>
          </div>

          {profile.socials.some((social) => social.href) ? (
            <ul className="mt-7 flex items-center gap-5 text-slate-700 dark:text-white">
              {profile.socials
                .filter((social) => social.href)
                .map((social) => {
                  const Icon = socialIcons[social.id];

                  return (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="inline-flex size-8 items-center justify-center transition-colors hover:text-[var(--section-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]"
                      >
                        <Icon className="size-5" />
                      </a>
                    </li>
                  );
                })}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="relative z-10 flex h-[42vh] min-h-0 w-full items-end justify-center overflow-hidden sm:h-[46vh] lg:h-full lg:overflow-visible lg:pr-16 xl:pr-20">
        <div className="hero-mascot-glow pointer-events-none absolute left-1/2 top-[12%] h-[78%] w-[72%] -translate-x-[46%] rounded-full" />
        <motion.div
          className="relative flex h-full w-full origin-bottom items-end justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={heroMascot}
            alt="Mascot iLo, personnage en hoodie avec visière lumineuse"
            priority
            sizes="(min-width: 1024px) 42vw, 80vw"
            className="pointer-events-none h-[92%] w-auto max-w-none bg-transparent select-none object-contain object-bottom drop-shadow-[0_28px_50px_rgba(15,23,42,0.32)] lg:h-[96%] lg:-translate-x-4 xl:h-[98%]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

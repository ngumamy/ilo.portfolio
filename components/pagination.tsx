"use client";

import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

import { useSectionPager } from "@/components/section-pager";
import { sections } from "@/lib/sections";
import { cn } from "@/lib/utils";

const controlButtonClassName =
  "inline-flex size-9 items-center justify-center rounded-full border border-slate-300/80 bg-white/90 text-slate-700 shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--section-accent)] hover:text-[var(--section-accent)] disabled:pointer-events-none disabled:opacity-35 dark:border-slate-700 dark:bg-[#102530]/90 dark:text-slate-200 dark:hover:border-[var(--section-accent)] dark:hover:text-[var(--section-accent)]";

export default function Pagination() {
  const { activeIndex, activeSection, direction, total, goToIndex, goNext, goPrev } =
    useSectionPager();

  return (
    <motion.nav
      aria-label="Pagination des sections"
      className="pointer-events-none absolute inset-y-0 right-3 z-30 flex items-center sm:right-5 xl:right-8"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <div
        className="pointer-events-auto flex flex-col items-center gap-2 rounded-full border border-slate-200/80 bg-[#f7fbfc]/90 px-2 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0d1b24]/90 dark:shadow-black/20"
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={activeIndex === 0}
          aria-label="Section précédente"
          className={controlButtonClassName}
        >
          <CaretUpIcon weight="bold" />
        </button>

        <div className="flex flex-col items-center gap-1.5 py-1">
          {sections.map((section, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => goToIndex(index)}
                aria-label={`Aller à ${section.label}`}
                aria-current={isActive ? "step" : undefined}
                className="group relative flex w-8 items-center justify-center py-0.5"
              >
                <motion.span
                  layout
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className={cn(
                    "block rounded-full bg-slate-300/80 dark:bg-slate-600",
                    isActive ? "h-7 w-2.5" : "size-2.5 group-hover:bg-[var(--section-accent)]/70"
                  )}
                  style={
                    isActive
                      ? { backgroundColor: "var(--section-accent)" }
                      : undefined
                  }
                />
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.span
            key={activeSection.id}
            initial={{
              opacity: 0,
              y: direction >= 0 ? 6 : -6,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: direction >= 0 ? -6 : 6,
            }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="min-w-8 text-center text-[10px] font-semibold leading-none tabular-nums text-slate-600 dark:text-slate-300"
          >
            {activeIndex + 1}/{total}
          </motion.span>
        </AnimatePresence>

        <button
          type="button"
          onClick={goNext}
          disabled={activeIndex === total - 1}
          aria-label="Section suivante"
          className={controlButtonClassName}
        >
          <CaretDownIcon weight="bold" />
        </button>
      </div>
    </motion.nav>
  );
}

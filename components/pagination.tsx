"use client";

import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

import { useSectionPager } from "@/components/section-pager";
import { sections } from "@/lib/sections";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const controlButtonClassName =
  "inline-flex size-9 items-center justify-center rounded-full border border-slate-300/80 bg-white/90 text-slate-700 shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--section-accent)] hover:text-[var(--section-accent)] disabled:pointer-events-none disabled:opacity-35 dark:border-slate-700 dark:bg-[#102530]/90 dark:text-slate-200 dark:hover:border-[var(--section-accent)] dark:hover:text-[var(--section-accent)]";

export default function Pagination() {
  const { activeIndex, activeSection, direction, total, goToIndex, goNext, goPrev } =
    useSectionPager();
  const { t } = useI18n();

  return (
    <motion.nav
      aria-label="Pagination des sections"
      className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex justify-center px-3 xl:inset-y-0 xl:right-8 xl:bottom-auto xl:left-auto xl:justify-end xl:px-0"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <div
        className="pointer-events-auto flex flex-row items-center gap-1.5 rounded-full border border-slate-200/80 bg-[#f7fbfc]/95 px-2 py-2 shadow-lg shadow-slate-900/10 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0d1b24]/95 dark:shadow-black/20 xl:flex-col xl:gap-2 xl:px-2 xl:py-3"
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={activeIndex === 0}
          aria-label={t.common.previous}
          className={controlButtonClassName}
        >
          <CaretUpIcon className="-rotate-90 xl:rotate-0" weight="bold" />
        </button>

        <div className="flex flex-row items-center gap-1 py-1 xl:flex-col xl:gap-1.5">
          {sections.map((section, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => goToIndex(index)}
                aria-label={`${t.sections[section.id]}`}
                aria-current={isActive ? "step" : undefined}
                className="group relative flex w-8 items-center justify-center py-0.5"
              >
                <motion.span
                  layout
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className={cn(
                    "block rounded-full bg-slate-300/80 dark:bg-slate-600",
                    isActive ? "h-2.5 w-7 xl:h-7 xl:w-2.5" : "size-2.5 group-hover:bg-[var(--section-accent)]/70"
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
            className="hidden min-w-8 text-center text-[10px] font-semibold leading-none tabular-nums text-slate-600 dark:text-slate-300 sm:inline xl:block"
          >
            {activeIndex + 1}/{total}
          </motion.span>
        </AnimatePresence>

        <button
          type="button"
          onClick={goNext}
          disabled={activeIndex === total - 1}
          aria-label={t.common.next}
          className={controlButtonClassName}
        >
          <CaretDownIcon className="rotate-90 xl:rotate-0" weight="bold" />
        </button>
      </div>
    </motion.nav>
  );
}

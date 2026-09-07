"use client";

import { DownloadSimpleIcon } from "@phosphor-icons/react";

export default function CvDownload() {
  return (
    <a
      href="/cv-lolito-razafimaharo.pdf"
      download
      aria-label="Télécharger mon CV au format PDF"
      title="Télécharger mon CV"
      className="fixed bottom-5 left-4 z-30 inline-flex h-11 items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-4 text-sm font-semibold text-slate-800 shadow-lg shadow-slate-900/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[var(--section-accent)] hover:text-[var(--section-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/60 sm:left-6 dark:border-slate-700/90 dark:bg-[#102530]/95 dark:text-slate-100 dark:shadow-black/20"
    >
      <DownloadSimpleIcon className="size-4" weight="bold" />
      <span className="hidden sm:inline">Télécharger mon CV</span>
      <span className="sm:hidden">CV</span>
    </a>
  );
}

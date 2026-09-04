"use client";

import BrandMark from "@/components/brand-mark";
import Nav from "@/components/nav";
import { useSectionPager } from "@/components/section-pager";

const Header = () => {
  const { goToSection } = useSectionPager();

  return (
    <header className="z-40 shrink-0 border-b border-slate-200/80 bg-[#f7fbfc]/90 py-3 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-md transition-colors duration-500 dark:border-slate-800/80 dark:bg-[#0d1b24]/90 xl:py-4">
      <div className="container mx-auto flex items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => goToSection("accueil")}
          aria-label="iLoR — Lolito Razafimaharo, retour à l'accueil"
          className="group rounded-md outline-none transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-[var(--section-accent)] focus-visible:ring-offset-4"
        >
          <BrandMark />
        </button>
        <Nav />
      </div>
    </header>
  );
};

export default Header;

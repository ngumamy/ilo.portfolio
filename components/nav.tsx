"use client";

import { useSectionPager } from "@/components/section-pager";
import { LanguageSelect, ThemeToggle } from "@/components/preferences";
import { sections } from "@/lib/sections";
import { cn } from "@/lib/utils";
import { ListIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const desktopLinkClassName =
  "relative py-2 text-sm font-medium text-slate-600 transition-colors hover:text-[var(--section-accent)] focus-visible:text-[var(--section-accent)] focus-visible:outline-none after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[var(--section-accent)] after:transition-transform hover:after:scale-x-100 focus-visible:after:scale-x-100 dark:text-slate-300 dark:hover:text-[var(--section-accent)] dark:focus-visible:text-[var(--section-accent)]";

const hireMeClassName =
  "nav-cta inline-flex h-11 w-full items-center justify-center rounded-full px-5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--section-accent)]/40 sm:w-auto";

const Nav = () => {
  const { activeSection, goToSection } = useSectionPager();

  const handleSectionClick = (id: typeof sections[number]["id"]) => {
    goToSection(id);
  };

  return (
    <nav aria-label="Navigation principale">
      <div className="hidden items-center gap-8 xl:flex">
        {sections.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSectionClick(item.id)}
            aria-current={activeSection.id === item.id ? "page" : undefined}
            className={cn(
              desktopLinkClassName,
              activeSection.id === item.id &&
                "text-[var(--section-accent)] after:scale-x-100 dark:text-[var(--section-accent)]"
            )}
          >
            {item.label}
          </button>
        ))}
        <LanguageSelect />
        <ThemeToggle />
        <button
          type="button"
          onClick={() => handleSectionClick("contact")}
          className={hireMeClassName}
        >
          Me contacter
        </button>
      </div>

      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              className="border-slate-300 bg-white text-[var(--section-accent)] shadow-sm transition-colors duration-500 hover:border-[var(--section-accent)] hover:bg-slate-50"
            />
          }
          className="xl:hidden"
        >
          <ListIcon />
          <span className="sr-only">Ouvrir le menu de navigation</span>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-72 border-slate-200 bg-[#f7fbfc] p-6 dark:border-slate-800 dark:bg-[#0d1b24]"
        >
          <SheetHeader className="px-0">
            <SheetTitle className="text-base text-slate-950 dark:text-white">
              Navigation
            </SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col gap-2">
            {sections.map((item) => (
              <SheetClose
                key={item.id}
                render={
                  <button
                    type="button"
                    onClick={() => handleSectionClick(item.id)}
                    aria-current={activeSection.id === item.id ? "page" : undefined}
                    className={cn(
                      "w-full border-l-2 px-3 py-2 text-left text-sm font-medium transition-colors",
                      activeSection.id === item.id
                        ? "border-[var(--section-accent)] bg-slate-100 text-[var(--section-accent)] dark:bg-[#15333f]"
                        : "border-transparent text-slate-700 hover:border-[var(--section-accent)] hover:bg-slate-100 hover:text-[var(--section-accent)] focus-visible:border-[var(--section-accent)] focus-visible:bg-slate-100 focus-visible:outline-none dark:text-slate-200 dark:hover:bg-[#15333f] dark:hover:text-[var(--section-accent)] dark:focus-visible:bg-[#15333f]"
                    )}
                  />
                }
              >
                {item.label}
              </SheetClose>
            ))}
            <div className="mt-4 flex items-center gap-2 px-3">
              <LanguageSelect />
              <ThemeToggle />
            </div>
            <SheetClose
              render={
                <button
                  type="button"
                  onClick={() => handleSectionClick("contact")}
                  className={cn(hireMeClassName, "mt-4")}
                />
              }
            >
              Me contacter
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Nav;

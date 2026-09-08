"use client";

import { useSyncExternalStore } from "react";
import { FlagIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useI18n, type Language } from "@/lib/i18n";

import { Button } from "@/components/ui/button";
const languageLabels: Record<Language, string> = {
  en: "EN",
  fr: "FR",
};

export const LanguageSelect = () => {
  const { language, setLanguage, t } = useI18n();

  const handleLanguageChange = (value: string | null) => {
    if (value !== "en" && value !== "fr") {
      return;
    }

    setLanguage(value);
  };

  return (
    <fieldset
      aria-label={t.common.language}
      className="flex h-9 items-center gap-0.5 rounded-md border border-slate-300 bg-white p-0.5 shadow-sm dark:border-slate-700 dark:bg-[#102530]"
    >
      <legend className="sr-only">{t.common.language}</legend>
      {(["fr", "en"] as const).map((value) => {
        const isActive = language === value;

        return (
          <label
            key={value}
            className={`relative inline-flex h-7 cursor-pointer items-center gap-1 rounded-sm px-2 text-xs font-bold transition-colors ${
              isActive
                ? "bg-[var(--section-accent)] text-white shadow-sm"
                : "text-slate-500 hover:text-[var(--section-accent)] dark:text-slate-300"
            }`}
          >
            <input
              type="radio"
              name="portfolio-language"
              value={value}
              checked={isActive}
              onChange={() => handleLanguageChange(value)}
              className="sr-only"
            />
            <FlagIcon className="size-3.5" weight={isActive ? "fill" : "regular"} />
            <span>{languageLabels[value]}</span>
          </label>
        );
      })}
    </fieldset>
  );
};

export const ThemeToggle = () => {
  const { t } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={isDark ? t.common.lightTheme : t.common.darkTheme}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="size-9 rounded-md border-slate-300 bg-white text-[#0f3d57] shadow-sm hover:border-[#19b5c6] hover:bg-[#e9f8fa] hover:text-[#0f3d57] dark:border-slate-700 dark:bg-[#102530] dark:text-[#7ddce5] dark:hover:border-[#19b5c6] dark:hover:bg-[#15333f]"
    >
      {isDark ? <SunIcon weight="fill" /> : <MoonIcon weight="fill" />}
    </Button>
  );
};
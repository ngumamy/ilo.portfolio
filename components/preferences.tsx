"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Language = "en" | "fr";

const languageLabels: Record<Language, string> = {
  en: "EN",
  fr: "FR",
};

export const LanguageSelect = () => {
  const [language, setLanguage] = useState<Language>("fr");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleLanguageChange = (value: string | null) => {
    if (value !== "en" && value !== "fr") {
      return;
    }

    setLanguage(value);
    window.localStorage.setItem("portfolio-language", value);
    document.documentElement.lang = value;
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger
        aria-label="Choisir la langue"
        className="h-9 rounded-md border-slate-300 bg-white px-2.5 font-semibold text-[#0f3d57] shadow-sm hover:border-[#19b5c6] dark:border-slate-700 dark:bg-[#102530] dark:text-slate-100"
      >
        <SelectValue>{languageLabels[language]}</SelectValue>
      </SelectTrigger>
      <SelectContent className="rounded-md border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-[#102530]">
        <SelectItem value="en" className="rounded-sm px-2 py-1.5 font-medium">
          EN
        </SelectItem>
        <SelectItem value="fr" className="rounded-sm px-2 py-1.5 font-medium">
          FR
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export const ThemeToggle = () => {
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
      aria-label={isDark ? "Utiliser le thème clair" : "Utiliser le thème sombre"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="size-9 rounded-md border-slate-300 bg-white text-[#0f3d57] shadow-sm hover:border-[#19b5c6] hover:bg-[#e9f8fa] hover:text-[#0f3d57] dark:border-slate-700 dark:bg-[#102530] dark:text-[#7ddce5] dark:hover:border-[#19b5c6] dark:hover:bg-[#15333f]"
    >
      {isDark ? <SunIcon weight="fill" /> : <MoonIcon weight="fill" />}
    </Button>
  );
};
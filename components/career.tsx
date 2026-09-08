"use client";

import { BriefcaseIcon, CodeIcon, GraduationCapIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

import { profile } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export default function Career({
  direction,
}: {
  direction: number;
}) {
  const { t } = useI18n();
  return (
    <motion.div
      className="flex h-full min-h-0 w-full flex-col overflow-y-auto py-6 pr-12 sm:pr-16 lg:py-8 xl:pr-20"
      initial={{ opacity: 0, y: direction >= 0 ? 24 : -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
    >
      <p className="font-sans text-sm font-semibold tracking-[0.18em] text-[var(--section-accent)] uppercase">
        {t.career.eyebrow}
      </p>
      <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl xl:text-5xl dark:text-white">
        {t.career.title}
      </h2>
      <p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-200">
        {t.career.lead}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)]">
        <div className="space-y-5">
          <CareerGroup
            icon={BriefcaseIcon}
            title={t.career.experience}
            items={profile.career.experiences}
            translations={t.career.experiences}
          />
          <CareerGroup
            icon={GraduationCapIcon}
            title={t.career.educationLabel}
            items={profile.career.education}
            translations={t.career.education}
          />
        </div>

        <aside className="h-fit rounded-3xl border border-slate-200/80 bg-white/75 p-5 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-[#102530]/65">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--section-accent)_12%,transparent)] text-[var(--section-accent)]">
              <CodeIcon className="size-5" />
            </span>
            <h3 className="font-sans text-xl font-bold text-slate-950 dark:text-white">
              {t.career.skillsLabel}
            </h3>
          </div>
          <div className="mt-5 space-y-5">
            {profile.career.skills.map((group) => (
              <div key={group.title}>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[var(--section-accent)]">
                  {group.title}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-sans text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>

    </motion.div>
  );
}

function CareerGroup({
  icon: Icon,
  title,
  items,
  translations,
}: {
  icon: typeof BriefcaseIcon;
  title: string;
  items: readonly {
    period: string;
    title: string;
    organization: string;
    description: string;
  }[];
  translations: readonly {
    period: string;
    title: string;
    organization: string;
    description: string;
  }[];
}) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white/65 p-5 dark:border-slate-700/80 dark:bg-[#102530]/45">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--section-accent)_12%,transparent)] text-[var(--section-accent)]">
          <Icon className="size-5" />
        </span>
        <h3 className="font-sans text-xl font-bold text-slate-950 dark:text-white">{title}</h3>
      </div>
      <ol className="mt-5 space-y-3 border-l border-slate-200 pl-5 dark:border-slate-700">
        {items.map((item, index) => {
          const translated = translations[index] ?? item;
          return (
          <motion.li
            key={`${item.period}-${item.title}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.35,
              delay: 0.12 + index * 0.07,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="relative rounded-2xl bg-slate-50/75 p-4 dark:bg-slate-900/25"
          >
            <span className="absolute -left-[1.58rem] top-5 size-2.5 rounded-full border-2 border-white bg-[var(--section-accent)] dark:border-[#102530]" />
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[var(--section-accent)]">
              {translated.period}
            </p>
            <h4 className="mt-1 font-sans text-lg font-semibold text-slate-950 dark:text-white">
              {translated.title}
            </h4>
            <p className="mt-1 font-sans text-sm font-medium text-slate-500 dark:text-slate-400">
              {translated.organization}
            </p>
            <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {translated.description}
            </p>
          </motion.li>
          );
        })}
      </ol>
    </section>
  );
}

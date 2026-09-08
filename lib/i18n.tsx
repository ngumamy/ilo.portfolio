"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { SectionId } from "@/lib/sections";

export type Language = "fr" | "en";

type Translation = {
  sections: Record<SectionId, string>;
  hero: {
    greeting: string;
    roles: string;
    bio: string;
    values: string;
    tagline: string;
    projects: string;
    contact: string;
    career: string;
  };
  about: {
    eyebrow: string;
    lead: string;
    body: string[];
    parcours: string;
    services: string;
  };
  career: {
    eyebrow: string;
    title: string;
    lead: string;
    experience: string;
    educationLabel: string;
    skillsLabel: string;
    experiences: Array<{ period: string; title: string; organization: string; description: string }>;
    education: Array<{ period: string; title: string; organization: string; description: string }>;
  };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Record<string, { title: string; text: string }>;
    projects: string;
    contact: string;
  };
  work: {
    eyebrow: string;
    title: string;
    lead: string;
    start: string;
    services: string;
    categories: Record<string, string>;
    projects: Record<string, { title: string; description: string; outcomes: string[] }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    email: string;
    location: string;
    need: string;
    help: string;
    write: string;
    home: string;
    services: string[];
    subject: string;
  };
  common: {
    language: string;
    lightTheme: string;
    darkTheme: string;
    previous: string;
    next: string;
    downloadCv: string;
  };
};

const translations: Record<Language, Translation> = {
  fr: {
    sections: { accueil: "Accueil", resume: "À propos", parcours: "Parcours", services: "Services", work: "Projets", contact: "Contact" },
    hero: {
      greeting: "Bonjour ! Je suis",
      roles: "Ingénieur en Informatique · Full-Stack Developer · DevOps",
      bio: "Je conçois, développe et déploie des applications web, plateformes SaaS, solutions e-commerce et sites web modernes",
      values: "sécurité, performance et fiabilité",
      tagline: "Concevoir. Développer. Déployer. Sécuriser.",
      projects: "Voir mes projets",
      contact: "Me contacter",
      career: "Mon parcours",
    },
    about: {
      eyebrow: "À propos",
      lead: "Derrière iLo, il y a un ingénieur orienté résultat.",
      body: [
        "Je conçois, développe et déploie des applications web, des plateformes SaaS, des solutions e-commerce et des sites modernes — de l’idée jusqu’à la production.",
        "Mon approche est simple : concevoir des systèmes utiles, fiables et évolutifs, en gardant un excellent rapport qualité-performance et une attention constante à la sécurité.",
        "Je travaille avec des entreprises qui veulent passer d’une simple présence web à un produit numérique qui aide réellement à vendre, à améliorer l’expérience et à organiser la croissance.",
      ],
      parcours: "Voir mon parcours",
      services: "Mes services",
    },
    career: {
      eyebrow: "Parcours",
      title: "Formation, expérience et compétences.",
      lead: "Un parcours construit entre ingénierie informatique, administration des systèmes, développement web et mise en production.",
      experience: "Expériences professionnelles",
      educationLabel: "Formation",
      skillsLabel: "Compétences",
      experiences: [
        { period: "Depuis juillet 2025", title: "Responsable Informatique", organization: "FUNTOA SMIE", description: "Création et évolution du site web, développement d’une plateforme SaaS et mise en place d’un déploiement automatisé CI/CD sur serveur VPS." },
        { period: "Septembre – décembre 2023", title: "Stagiaire IT", organization: "TAKALOU — Fort-Dauphin", description: "Administration systèmes et DevOps : Active Directory, orchestration d’une application web sous Docker et tâches d’exploitation IT." },
        { period: "Mai – juillet 2023", title: "Gérant · Multiservice & cyber", organization: "Fianarantsoa", description: "Gestion des services, installation électrique du local et installation/configuration du réseau informatique LAN et WAN." },
      ],
      education: [
        { period: "2023 – 2025", title: "Master en Informatique générale", organization: "École Nationale d’Informatique — Fianarantsoa", description: "Ingénierie logicielle, systèmes, développement web et mise en production." },
        { period: "2020 – 2023", title: "Licence en Informatique générale", organization: "École Nationale d’Informatique — Fianarantsoa", description: "Formation supérieure en informatique générale et ingénierie des systèmes logiciels." },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Ce que je construis",
      lead: "De l’idée jusqu’à la production. Quatre axes, une exigence : sécurité, performance, fiabilité.",
      items: {
        web: { title: "Applications & sites web", text: "Interfaces modernes et maintenables — du site vitrine à l’application métier, pensées pour l’usage réel et l’évolution du business." },
        saas: { title: "Plateformes SaaS", text: "Produits web conçus pour durer : parcours utilisateurs, données, administration, paiement, sécurité et mise à l’échelle." },
        commerce: { title: "E-commerce", text: "Boutiques et parcours d’achat clairs, rapides et prêts à convertir : UX, performance, checkout et fiabilité." },
        devops: { title: "DevOps & mise en prod", text: "Déploiement, observabilité, sécurité et automatisation — un système robuste, stable et prêt pour la production." },
      },
      projects: "Voir mes projets",
      contact: "Me contacter",
    },
    work: {
      eyebrow: "Projets",
      title: "Des projets pensés pour le résultat.",
      lead: "J’accompagne les marques et les équipes qui veulent un produit web solide, rapide et fiable, de la stratégie à la mise en production.",
      start: "Démarrer un projet",
      services: "Voir mes services",
      categories: { SaaS: "SaaS", "E-commerce": "E-commerce", Web: "Web" },
      projects: {
        "saas-ops": { title: "Plateforme SaaS de gestion opérationnelle", description: "Développement d’une plateforme pour centraliser les tâches, les données et les suivis internes d’une organisation.", outcomes: ["Système de gestion des opérations plus fluide", "Interface moderne et plus rapide à utiliser", "Architecture idéale pour l’évolution du produit"] },
        "commerce-store": { title: "Boutique e-commerce orientée conversion", description: "Refonte d’une expérience de commande plus claire, plus rapide et plus sûre pour améliorer la conversion et la confiance.", outcomes: ["Parcours client plus lisible et plus rapide", "Meilleure expérience mobile", "Mise en production avec un socle technique stable"] },
        "company-website": { title: "Site vitrine + positionnement de marque", description: "Création d’un site qui renforce la crédibilité digitale, explique clairement les services et guide les leads vers le contact.", outcomes: ["Amélioration de la perception de marque", "Meilleur cadrage commercial", "Structure plus claire pour les demandes de devis"] },
      },
    },
    contact: {
      eyebrow: "Contact",
      title: "Discutons votre prochain projet.",
      lead: "Vous avez une idée, un besoin ou un produit à faire évoluer ? Je vous aide à transformer la vision en solution fiable, performante et prête à l’usage.",
      email: "Email",
      location: "Localisation",
      need: "Besoin d’un dev ?",
      help: "Je peux vous aider.",
      write: "Écrire un message",
      home: "Revenir à l’accueil",
      services: ["Sites web et portfolios", "Applications web sur mesure", "Plateformes SaaS et dashboards", "E-commerce et parcours de vente", "Mise en production et DevOps"],
      subject: "Demande de devis / projet",
    },
    common: { language: "Choisir la langue", lightTheme: "Utiliser le thème clair", darkTheme: "Utiliser le thème sombre", previous: "Section précédente", next: "Section suivante", downloadCv: "Télécharger mon CV" },
  },
  en: {
    sections: { accueil: "Home", resume: "About", parcours: "Career", services: "Services", work: "Projects", contact: "Contact" },
    hero: {
      greeting: "Hello! I am",
      roles: "Computer Engineer · Full-Stack Developer · DevOps",
      bio: "I design, build and deploy web applications, SaaS platforms, e-commerce solutions and modern websites",
      values: "security, performance and reliability",
      tagline: "Design. Build. Deploy. Secure.",
      projects: "View my projects",
      contact: "Contact me",
      career: "My career",
    },
    about: {
      eyebrow: "About",
      lead: "Behind iLo is an engineer focused on results.",
      body: [
        "I design, build and deploy web applications, SaaS platforms, e-commerce solutions and modern websites — from idea to production.",
        "My approach is simple: build useful, reliable and scalable systems, with a strong focus on performance and security.",
        "I work with businesses that want to turn a basic web presence into a digital product that supports sales, user experience and growth.",
      ],
      parcours: "View my career",
      services: "My services",
    },
    career: {
      eyebrow: "Career",
      title: "Education, experience and skills.",
      lead: "A career built across software engineering, systems administration, web development and production delivery.",
      experience: "Professional experience",
      educationLabel: "Education",
      skillsLabel: "Skills",
      experiences: [
        { period: "Since July 2025", title: "IT Manager", organization: "FUNTOA SMIE", description: "Built and evolved the company website, developed a SaaS platform and set up automated CI/CD delivery on a VPS." },
        { period: "September – December 2023", title: "IT Intern", organization: "TAKALOU — Fort-Dauphin", description: "Worked on systems administration and DevOps, including Active Directory setup and Docker orchestration for a web application." },
        { period: "May – July 2023", title: "Manager · Multiservice & cyber", organization: "Fianarantsoa", description: "Managed services, installed the premises electrical system and set up the LAN and WAN network." },
      ],
      education: [
        { period: "2023 – 2025", title: "Master’s degree in Computer Science", organization: "National School of Informatics — Fianarantsoa", description: "Software engineering, systems, web development and production delivery." },
        { period: "2020 – 2023", title: "Bachelor’s degree in Computer Science", organization: "National School of Informatics — Fianarantsoa", description: "Higher education in computer science and software systems engineering." },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "What I build",
      lead: "From idea to production. Four areas, one standard: security, performance and reliability.",
      items: {
        web: { title: "Web applications & sites", text: "Modern, maintainable interfaces — from landing pages to business applications, designed for real use and growth." },
        saas: { title: "SaaS platforms", text: "Web products built to last: user journeys, data, administration, payments, security and scale." },
        commerce: { title: "E-commerce", text: "Clear, fast and conversion-ready stores and buying journeys: UX, performance, checkout and reliability." },
        devops: { title: "DevOps & delivery", text: "Deployment, observability, security and automation — a robust system ready for production." },
      },
      projects: "View my projects",
      contact: "Contact me",
    },
    work: {
      eyebrow: "Projects",
      title: "Projects built for outcomes.",
      lead: "I help brands and teams build solid, fast and reliable web products, from strategy to production.",
      start: "Start a project",
      services: "View my services",
      categories: { SaaS: "SaaS", "E-commerce": "E-commerce", Web: "Web" },
      projects: {
        "saas-ops": { title: "Operational management SaaS platform", description: "A platform designed to centralize tasks, data and internal tracking for an organization.", outcomes: ["Smoother operational management", "A faster, modern user interface", "An architecture ready for product growth"] },
        "commerce-store": { title: "Conversion-focused e-commerce store", description: "A clearer, faster and safer checkout experience designed to improve conversion and trust.", outcomes: ["Clearer and faster customer journey", "Better mobile experience", "Stable production-ready foundation"] },
        "company-website": { title: "Corporate website and brand positioning", description: "A website that strengthens digital credibility, clarifies services and guides leads toward contact.", outcomes: ["Stronger brand perception", "Clearer commercial positioning", "Better structure for quote requests"] },
      },
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s discuss your next project.",
      lead: "Have an idea, a need or a product to improve? I can help turn your vision into a reliable, high-performing solution.",
      email: "Email",
      location: "Location",
      need: "Need a developer?",
      help: "I can help.",
      write: "Write a message",
      home: "Back home",
      services: ["Websites and portfolios", "Custom web applications", "SaaS platforms and dashboards", "E-commerce and sales journeys", "Production delivery and DevOps"],
      subject: "Project inquiry",
    },
    common: { language: "Choose language", lightTheme: "Use light theme", darkTheme: "Use dark theme", previous: "Previous section", next: "Next section", downloadCv: "Download my CV" },
  },
};

type I18nValue = { language: Language; setLanguage: (language: Language) => void; t: Translation };
const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");
  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("portfolio-language", next);
    document.documentElement.lang = next;
  };

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "en" || saved === "fr") {
      // Restore the client preference after hydration to keep server and client HTML identical.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(saved);
    }
  }, []);

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}

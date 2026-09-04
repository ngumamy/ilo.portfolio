export const profile = {
  name: "Lolito Razafimaharo",
  greeting: "Bonjour ! Je suis",
  roles: "Ingénieur en Informatique · Full-Stack Developer · DevOps",
  bioLead: "Je conçois, développe et déploie des",
  bioOffer:
    "applications web, plateformes SaaS, solutions e-commerce et sites web modernes",
  bioMid: " — de l’idée jusqu’à la production, avec une exigence de",
  bioValues: "sécurité, performance et fiabilité",
  tagline: "Concevoir. Développer. Déployer. Sécuriser.",
  about: {
    eyebrow: "À propos",
    lead: "Derrière iLo, il y a un ingénieur orienté résultat.",
    body: [
      "Je conçois, développe et déploie des applications web, des plateformes SaaS, des solutions e-commerce et des sites modernes — de l’idée jusqu’à la production.",
      "Mon approche est simple : concevoir des systèmes utiles, fiables et évolutifs, en gardant un excellent rapport qualité-performance et une attention constante à la sécurité.",
      "Je travaille avec des entreprises qui veulent passer d’une simple présence web à un produit numérique qui aide réellement à vendre, à améliorer l’expérience et à organiser la croissance.",
    ],
    focus: ["Full-Stack", "DevOps", "SaaS", "E-commerce", "Web"],
  },
  resumeHref: "#resume",
  services: {
    eyebrow: "Services",
    title: "Ce que je construis",
    lead: "De l’idée jusqu’à la production. Quatre axes, une exigence : sécurité, performance, fiabilité.",
    items: [
      {
        id: "web",
        title: "Applications & sites web",
        text: "Interfaces modernes et maintenables — du site vitrine à l’application métier, pensées pour l’usage réel et l’évolution du business.",
      },
      {
        id: "saas",
        title: "Plateformes SaaS",
        text: "Produits web conçus pour durer : parcours utilisateurs, données, administration, paiement, sécurité et mise à l’échelle.",
      },
      {
        id: "commerce",
        title: "E-commerce",
        text: "Boutiques et parcours d’achat clairs, rapides et prêts à convertir : UX, performance, checkout et fiabilité.",
      },
      {
        id: "devops",
        title: "DevOps & mise en prod",
        text: "Déploiement, observabilité, sécurité et automatisation — un système robuste, stable et prêt pour la production.",
      },
    ],
  },
  projects: [
    {
      id: "saas-ops",
      title: "Plateforme SaaS de gestion opérationnelle",
      category: "SaaS",
      description:
        "Développement d’une plateforme pour centraliser les tâches, les données et les suivis internes d’une organisation.",
      outcomes: [
        "Système de gestion des opérations plus fluide",
        "Interface moderne et plus rapide à utiliser",
        "Architecture idéale pour l’évolution du produit",
      ],
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    },
    {
      id: "commerce-store",
      title: "Boutique e-commerce orientée conversion",
      category: "E-commerce",
      description:
        "Refonte d’une expérience de commande plus claire, plus rapide et plus sûre pour améliorer la conversion et la confiance.",
      outcomes: [
        "Parcours client plus lisible et plus rapide",
        "Meilleure expérience mobile",
        "Mise en production avec un socle technique stable",
      ],
      stack: ["Next.js", "Stripe", "Tailwind", "SEO"],
    },
    {
      id: "company-website",
      title: "Site vitrine + positionnement de marque",
      category: "Web",
      description:
        "Création d’un site qui renforce la crédibilité digitale, explique clairement les services et guide les leads vers le contact.",
      outcomes: [
        "Amélioration de la perception de marque",
        "Meilleur cadrage commercial",
        "Structure plus claire pour les demandes de devis",
      ],
      stack: ["Next.js", "UX", "Performance", "Marketing"],
    },
  ],
  contact: {
    email: "contact@ilo-dev.com",
    location: "France / Remote",
    services: [
      "Sites web et portfolios",
      "Applications web sur mesure",
      "Plateformes SaaS et dashboards",
      "E-commerce et parcours de vente",
      "Mise en production et DevOps",
    ],
  },
  socials: [
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com" },
    { id: "github", label: "GitHub", href: "https://github.com" },
  ],
} as const;

export type SocialId = (typeof profile.socials)[number]["id"];

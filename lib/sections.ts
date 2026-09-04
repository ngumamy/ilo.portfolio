export const sections = [
  { id: "accueil", title: "Accueil", label: "Accueil", color: "#19b5c6" },
  { id: "resume", title: "Parcours", label: "Parcours", color: "#d97706" },
  { id: "services", title: "Services", label: "Services", color: "#2f80ed" },
  { id: "work", title: "Projets", label: "Projets", color: "#9d4edd" },
  { id: "contact", title: "Contact", label: "Contact", color: "#e05263" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export function getSectionIndex(id: SectionId) {
  return sections.findIndex((section) => section.id === id);
}

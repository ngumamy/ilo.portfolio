import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import Header from "@/components/header";
import { SectionPagerProvider } from "@/components/section-pager";
import ThemeProvider from "@/components/theme-provider";

const jetbrainsMono = JetBrains_Mono({
  subsets:['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable:'--font-jetbrains-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ilo-dev.com"),
  title: "Lolito Razafimaharo — Full-Stack Developer & DevOps",
  description:
    "Ingénieur en informatique et développeur full-stack. Je conçois, développe et déploie des applications web, plateformes SaaS, sites vitrines et solutions e-commerce orientées résultats.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lolito Razafimaharo — Full-Stack Developer & DevOps",
    description:
      "Applications web, SaaS, commerce et infrastructure — de l’idée jusqu’à la production.",
    url: "https://ilo-dev.com",
    siteName: "iLo Portfolio",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lolito Razafimaharo — Full-Stack Developer & DevOps",
    description:
      "Développement web, SaaS et mise en production pour des produits fiables et performants.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className={cn(jetbrainsMono.variable, "flex h-svh flex-col overflow-hidden overscroll-none")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SectionPagerProvider>
            <Header />
            {children}
          </SectionPagerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

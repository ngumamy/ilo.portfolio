"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import Contact from "@/components/contact";
import Hero from "@/components/hero";
import Resume from "@/components/resume";
import Services from "@/components/services";
import Work from "@/components/work";
import {
  getSectionIndex,
  sections,
  type SectionId,
} from "@/lib/sections";

const NAVIGATION_COOLDOWN_MS = 650;
const WHEEL_THRESHOLD = 36;
const SWIPE_THRESHOLD = 56;

function shouldIgnoreScrollNavigation(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return true;
  }

  return Boolean(
    target.closest(
      "input, textarea, select, option, [contenteditable='true'], [data-scroll-lock]"
    )
  );
}

function hasScrollableParent(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  let node: HTMLElement | null = target;

  while (node) {
    const { overflowY } = window.getComputedStyle(node);
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      node.scrollHeight > node.clientHeight + 1
    ) {
      return true;
    }
    node = node.parentElement;
  }

  return false;
}

const sectionClassName =
  "absolute inset-0 border-b border-slate-200/70 even:bg-slate-50/70 dark:border-slate-800/70 dark:even:bg-[#102530]/35";

const slideFadeVariants: Variants = {
  enter: (direction: number) => ({
    y: direction >= 0 ? 72 : -72,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction >= 0 ? -72 : 72,
    opacity: 0,
  }),
};

type SectionPagerContextValue = {
  activeIndex: number;
  activeSection: (typeof sections)[number];
  direction: number;
  total: number;
  goToIndex: (index: number) => void;
  goToSection: (id: SectionId) => void;
  goNext: () => void;
  goPrev: () => void;
};

const SectionPagerContext = createContext<SectionPagerContextValue | null>(null);

function applySectionAccent(color: string) {
  document.documentElement.style.setProperty("--section-accent", color);
}

function syncSectionHash(id: SectionId) {
  const hash = id === "accueil" ? "" : `#${id}`;
  window.history.replaceState(null, "", `${window.location.pathname}${hash}`);
}

export function SectionPagerProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    const hash = window.location.hash.slice(1) as SectionId;
    const index = hash ? getSectionIndex(hash) : 0;
    return index >= 0 ? index : 0;
  });
  const [direction, setDirection] = useState(0);
  const activeIndexRef = useRef<number>(activeIndex);
  const isLockedRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    applySectionAccent(sections[activeIndex].color);
  }, [activeIndex]);

  const lockNavigation = useCallback(() => {
    isLockedRef.current = true;
    window.setTimeout(() => {
      isLockedRef.current = false;
    }, NAVIGATION_COOLDOWN_MS);
  }, []);

  const navigateByDirection = useCallback(
    (dir: 1 | -1) => {
      if (isLockedRef.current) {
        return false;
      }

      const index = activeIndexRef.current;
      const nextIndex = index + dir;

      if (nextIndex < 0 || nextIndex >= sections.length) {
        return false;
      }

      lockNavigation();
      setDirection(dir);
      setActiveIndex(nextIndex);
      syncSectionHash(sections[nextIndex].id);
      return true;
    },
    [lockNavigation]
  );

  const goToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= sections.length || index === activeIndexRef.current) {
        return;
      }

      if (isLockedRef.current) {
        return;
      }

      lockNavigation();
      setDirection(index > activeIndexRef.current ? 1 : -1);
      setActiveIndex(index);
      syncSectionHash(sections[index].id);
    },
    [lockNavigation]
  );

  const goToSection = useCallback(
    (id: SectionId) => {
      const index = getSectionIndex(id);
      if (index >= 0) {
        goToIndex(index);
      }
    },
    [goToIndex]
  );

  const goNext = useCallback(() => {
    navigateByDirection(1);
  }, [navigateByDirection]);

  const goPrev = useCallback(() => {
    navigateByDirection(-1);
  }, [navigateByDirection]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (shouldIgnoreScrollNavigation(event.target)) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (
        shouldIgnoreScrollNavigation(event.target) ||
        hasScrollableParent(event.target)
      ) {
        wheelDeltaRef.current = 0;
        return;
      }

      if (isLockedRef.current) {
        event.preventDefault();
        return;
      }

      wheelDeltaRef.current += event.deltaY;

      if (wheelDeltaRef.current >= WHEEL_THRESHOLD) {
        wheelDeltaRef.current = 0;
        if (navigateByDirection(1)) {
          event.preventDefault();
        }
        return;
      }

      if (wheelDeltaRef.current <= -WHEEL_THRESHOLD) {
        wheelDeltaRef.current = 0;
        if (navigateByDirection(-1)) {
          event.preventDefault();
        }
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (shouldIgnoreScrollNavigation(event.target) || hasScrollableParent(event.target)) {
        touchStartYRef.current = null;
        return;
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      touchStartYRef.current = null;

      if (startY === null) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY;
      if (endY === undefined) {
        return;
      }

      const deltaY = startY - endY;

      if (deltaY >= SWIPE_THRESHOLD) {
        navigateByDirection(1);
      } else if (deltaY <= -SWIPE_THRESHOLD) {
        navigateByDirection(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [navigateByDirection]);

  const value = useMemo(
    () => ({
      activeIndex,
      activeSection: sections[activeIndex],
      direction,
      total: sections.length,
      goToIndex,
      goToSection,
      goNext,
      goPrev,
    }),
    [activeIndex, direction, goToIndex, goToSection, goNext, goPrev]
  );

  return (
    <SectionPagerContext.Provider value={value}>
      {children}
    </SectionPagerContext.Provider>
  );
}

export function useSectionPager() {
  const context = useContext(SectionPagerContext);
  if (!context) {
    throw new Error("useSectionPager must be used within SectionPagerProvider");
  }
  return context;
}

export function SectionViewport() {
  const { activeSection, direction, goToSection } = useSectionPager();

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden overscroll-none touch-pan-y">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.section
          key={activeSection.id}
          id={activeSection.id}
          custom={direction}
          variants={slideFadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className={sectionClassName}
        >
          <div
            className={
              activeSection.id === "accueil"
                ? "relative flex h-full min-h-0 w-full items-stretch"
                : activeSection.id === "resume" || activeSection.id === "services"
                  ? "container mx-auto flex h-full min-h-0 items-stretch"
                : "container mx-auto flex h-full min-h-0 items-center"
            }
          >
            {activeSection.id === "accueil" ? (
              <Hero direction={direction} goToSection={goToSection} />
            ) : activeSection.id === "resume" ? (
              <Resume direction={direction} goToSection={goToSection} />
            ) : activeSection.id === "services" ? (
              <Services direction={direction} goToSection={goToSection} />
            ) : activeSection.id === "work" ? (
              <Work direction={direction} goToSection={goToSection} />
            ) : activeSection.id === "contact" ? (
              <Contact direction={direction} goToSection={goToSection} />
            ) : (
              <Contact direction={direction} goToSection={goToSection} />
            )}
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}

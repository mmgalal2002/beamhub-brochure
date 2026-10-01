"use client";

import { createContext, useContext, useEffect, useRef, useSyncExternalStore, type PointerEvent, type ReactNode } from "react";
import { CoursePreviewProvider } from "./course-preview";

function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const ExperienceContext = createContext<{
  motionEnabled: boolean;
  reducedMotion: boolean;
} | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const motionEnabled = !reducedMotion;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !motionEnabled) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
        const element = entry.target;
        const delay = Number(element.dataset.reveal) || 0;
        animations.push(element.animate(
          [{ opacity: 0.15, transform: "translateY(28px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 760, delay, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" },
        ));
        observer.unobserve(element);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    root.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [motionEnabled]);

  return (
    <ExperienceContext.Provider value={{ motionEnabled, reducedMotion }}>
      <div className="experience-root" data-motion={motionEnabled ? "running" : "paused"} ref={rootRef}>
        <CoursePreviewProvider>{children}</CoursePreviewProvider>
      </div>
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error("Interactive brochure components require ExperienceProvider.");
  return context;
}

export function usePointerField() {
  const { motionEnabled } = useExperience();
  const resetPointer = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "0");
    event.currentTarget.style.setProperty("--pointer-y", "0");
  };
  return {
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (!motionEnabled || event.pointerType === "touch") return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      event.currentTarget.style.setProperty("--pointer-x", x.toFixed(3));
      event.currentTarget.style.setProperty("--pointer-y", y.toFixed(3));
    },
    onPointerLeave: resetPointer,
  };
}

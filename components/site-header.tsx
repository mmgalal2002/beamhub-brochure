"use client";

import { ArrowDownRight, ArrowUpRight, Grid2X2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/beamhub";
import { Wordmark } from "./brand";
import { Modal } from "./modal";

export function SiteHeader() {
  const [mapOpen, setMapOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [progress, setProgress] = useState(0);
  const index = navigation.findIndex((item) => item.id === activeSection);
  const chapterLabel = index < 0 ? "The beginning" : navigation[index].label;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.round(window.scrollY / scrollable * 100) : 0);
      const position = window.scrollY + Math.min(window.innerHeight * 0.35, 240);
      let current = "home";
      for (const item of navigation) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= position) current = item.id;
      }
      setActiveSection(current);
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header className="chapter-console">
        <a href="#home" className="console-brand" aria-label="BeamHub brochure home"><Wordmark /></a>
        <span className="console-divider" aria-hidden="true" />
        <div className="console-readout">
          <span>EXPLORING / {String(Math.max(index + 1, 0)).padStart(2, "0")}</span>
          <strong>{chapterLabel}</strong>
        </div>
        <nav className="chapter-dial" aria-label="Chapter navigation">
          {navigation.map((chapter, chapterIndex) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              aria-label={`${chapterIndex + 1}: ${chapter.label}`}
              aria-current={activeSection === chapter.id ? "location" : undefined}
            >
              <span>{String(chapterIndex + 1).padStart(2, "0")}</span>
              <small>{chapter.label}</small>
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="console-map-button"
          aria-label="Open chapter map"
          aria-haspopup="dialog"
          aria-expanded={mapOpen}
          onClick={() => setMapOpen(true)}
        >
          <svg className="console-progress-orbit" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" pathLength="100" />
            <circle cx="24" cy="24" r="22" pathLength="100" strokeDasharray={`${progress} 100`} />
          </svg>
          <Grid2X2 size={17} aria-hidden="true" />
          <span className="sr-only">{progress}% read</span>
        </button>
      </header>

      <Modal open={mapOpen} onClose={() => setMapOpen(false)} className="chapter-map" labelledBy="chapter-map-title">
        <div className="map-topline">
          <span>BEAMHUB / CHOOSE A DIRECTION</span>
          <button type="button" aria-label="Close chapter map" onClick={() => setMapOpen(false)}><X size={22} aria-hidden="true" /></button>
        </div>
        <div className="map-heading">
          <h2 id="chapter-map-title">Follow your<br /><em>curiosity.</em></h2>
          <span>{String(progress).padStart(2, "0")}<small>% EXPLORED</small></span>
        </div>
        <nav className="map-chapters" aria-label="Full chapter map">
          {navigation.map((chapter, chapterIndex) => (
            <a key={chapter.id} href={`#${chapter.id}`} aria-current={activeSection === chapter.id ? "location" : undefined} onClick={() => setMapOpen(false)}>
              <span className="map-number">{String(chapterIndex + 1).padStart(2, "0")}</span>
              <span><strong>{chapter.label}</strong><small>{chapter.hint}</small></span>
              <ArrowUpRight size={23} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="map-bottom"><span>NO RIGHT ORDER. JUST YOUR NEXT DISCOVERY.</span><ArrowDownRight size={21} aria-hidden="true" /></div>
      </Modal>
    </>
  );
}

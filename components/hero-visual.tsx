"use client";

import { BriefcaseBusiness, GraduationCap, Pause, Play, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useExperience, usePointerField } from "./experience-provider";

const scenes = [
  { label: "Learn", image: "/motion/hero-learn.webp", icon: GraduationCap },
  { label: "Connect", image: "/motion/hero-connect.webp", icon: Users },
  { label: "Advance", image: "/motion/hero-advance.webp", icon: BriefcaseBusiness },
] as const;

export function HeroVisual() {
  const pointer = usePointerField();
  const { motionEnabled } = useExperience();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const playing = motionEnabled && !paused && inView && pageVisible;

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      setPageVisible(!document.hidden);
    }, { threshold: 0.1 });
    const updateVisibility = () => setPageVisible(!document.hidden);
    observer.observe(scene);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setActiveScene((current) => (current + 1) % scenes.length);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [activeScene, playing]);

  return (
    <div className="hero-scene" ref={sceneRef} data-playing={playing} {...pointer}>
      <div className="hero-scene-depth" aria-hidden="true">
        {scenes.map((scene, index) => (
          <div className={`hero-scene-panel hero-scene-panel--${index}`} data-active={activeScene === index} key={scene.label}>
            <div className="hero-photo">
              <div className="hero-camera">
                <Image
                  src={scene.image}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 899px) 90vw, 78vw"
                  preload={index === 0}
                  fetchPriority={index === 0 ? undefined : "low"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-scene-scrim" aria-hidden="true" />
      <div className="hero-light-field" aria-hidden="true"><i /><i /><i /></div>
      <div
        className="hero-scene-controls"
        role="group"
        aria-label="BeamHub scenes"
      >
        <div className="hero-scene-selector">
          {scenes.map((scene, index) => {
            const Icon = scene.icon;
            return (
              <button
                key={scene.label}
                type="button"
                aria-label={scene.label}
                aria-pressed={activeScene === index}
                title={scene.label}
                onFocus={() => setPaused(true)}
                onClick={() => {
                  setActiveScene(index);
                  setPaused(true);
                }}
              >
                <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                <span>{scene.label}</span>
                {activeScene === index && <i className="hero-scene-progress" key={`${index}-${playing}`} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        <button
          className="hero-motion-toggle"
          type="button"
          onClick={() => setPaused((current) => !current)}
          disabled={!motionEnabled}
          aria-label={!motionEnabled ? "Hero animation disabled by reduced-motion preference" : paused ? "Play hero animation" : "Pause hero animation"}
          title={!motionEnabled ? "Reduced motion is enabled" : paused ? "Play hero animation" : "Pause hero animation"}
        >
          {paused || !motionEnabled ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}

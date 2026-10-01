"use client";

import { ArrowLeft, ArrowRight, Maximize2, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useExperience } from "./experience-provider";

const reels = [
  { id: "beam", label: "Follow the beam", title: "Small questions.\nBrighter possibilities.", description: "Look closer. The principles behind the beam are the beginning of a bigger learning journey.", caption: "An original animation of a moving radiation beam and a rotating shielding structure.", tag: "01 / PHYSICS IN PERSPECTIVE" },
  { id: "plan", label: "Find the perspective", title: "A fresh angle.\nA clearer picture.", description: "From the first contour to a new planning perspective, keep discovering what comes next.", caption: "An original animation of changing contour lines and converging planning beams.", tag: "02 / PLANS INTO PERSPECTIVE" },
  { id: "connect", label: "Connect the dots", title: "One good idea.\nA world of connection.", description: "Knowledge travels further when curious minds find each other. Make room for a different point of view.", caption: "An original animation of a rotating globe with connected, illuminated network points.", tag: "03 / KNOWLEDGE WITHOUT BORDERS" },
] as const;

export function MotionReel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [playbackRevision, setPlaybackRevision] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const touchStart = useRef<number | null>(null);
  const { motionEnabled } = useExperience();
  const shouldPlay = motionEnabled && !paused && inView && pageVisible && !mediaError;
  const reel = reels[active];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(section);
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const video = videoRefs.current[active];
    videoRefs.current.forEach((element, index) => {
      if (element && (index !== active || !shouldPlay)) element.pause();
    });
    if (!video || !shouldPlay) return;
    let cancelled = false;
    void video.play().then(() => {
      if (!cancelled) setAutoplayBlocked(false);
    }).catch((error: unknown) => {
      if (cancelled) return;
      if (error instanceof DOMException && error.name === "AbortError") return;
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        setAutoplayBlocked(true);
        return;
      }
      console.error("BeamHub motion reel could not play.", error);
      setMediaError("This motion clip could not play. You can retry or choose another perspective.");
    });
    return () => { cancelled = true; video.pause(); };
  }, [active, shouldPlay, playbackRevision]);

  const selectReel = (index: number) => {
    const next = (index + reels.length) % reels.length;
    videoRefs.current.forEach((video) => { if (video) { video.pause(); video.currentTime = 0; } });
    progressRef.current?.style.setProperty("--reel-progress", "0");
    setMediaError(null);
    setNotice(null);
    setAutoplayBlocked(false);
    setActive(next);
    setPlaybackRevision((value) => value + 1);
  };

  const playManually = () => {
    const video = videoRefs.current[active];
    if (!video) return;
    if (paused || autoplayBlocked) {
      setPaused(false);
      void video.play().then(() => setAutoplayBlocked(false)).catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("BeamHub motion reel could not start after playback was requested.", error);
        setMediaError("Playback is unavailable in this browser. Try another perspective or retry the clip.");
      });
    } else setPaused(true);
  };

  const retry = () => {
    videoRefs.current[active]?.load();
    setMediaError(null);
    setAutoplayBlocked(false);
    setPaused(false);
  };

  return (
    <section
      id="motion-reel"
      className="reel-section section-space"
      ref={sectionRef}
      tabIndex={-1}
      aria-labelledby="reel-heading"
      aria-roledescription="carousel"
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = touchStart.current - (event.changedTouches[0]?.clientX ?? touchStart.current);
        if (Math.abs(distance) > 55) selectReel(active + (distance > 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className="container">
        <div className="section-heading" data-reveal><div><p className="eyebrow"><span>02</span> A CHANGE OF PERSPECTIVE</p><h2 id="reel-heading">See the possibility.<br /><em>Feel the momentum.</em></h2></div><p className="section-lead">Three little films. One bigger idea.<br />A new perspective changes everything.</p></div>
        <div className="reel-window">
          <div className="reel-filmstrip" style={{ transform: `translateX(-${active * 100}%)` }}>
            {reels.map((item, index) => (
              <div className={`reel-slide reel-slide--${item.id}`} key={item.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${reels.length}: ${item.label}`} aria-hidden={index !== active} inert={index !== active}>
                <video
                  ref={(element) => { videoRefs.current[index] = element; }}
                  src={index === active || inView ? `/motion/${item.id}.mp4` : undefined}
                  poster={`/motion/${item.id}.webp`}
                  muted
                  playsInline
                  preload={index === active && inView ? "auto" : "none"}
                  aria-label={item.caption}
                  onEnded={() => { if (shouldPlay) selectReel(active + 1); }}
                  onTimeUpdate={(event) => {
                    if (index === active) {
                      const duration = Number.isFinite(event.currentTarget.duration) && event.currentTarget.duration > 0 ? event.currentTarget.duration : 8;
                      progressRef.current?.style.setProperty("--reel-progress", String(Math.min(1, event.currentTarget.currentTime / duration)));
                    }
                  }}
                  onError={() => {
                    if (index === active) setMediaError("This motion clip could not load. Retry the clip or choose another perspective.");
                  }}
                />
                <div className="reel-scrim" aria-hidden="true" />
                <span className="reel-tag">{item.tag}</span>
                <div className="reel-copy"><h3>{item.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3><p>{item.description}</p></div>
                <span className="reel-frame-index" aria-hidden="true">BEAMHUB / MOTION STUDY 0{index + 1}</span>
              </div>
            ))}
          </div>
          <span className="reel-corner corner-top-left" aria-hidden="true" /><span className="reel-corner corner-bottom-right" aria-hidden="true" />
          {mediaError && <div className="reel-error" role="alert"><p>{mediaError}</p><button type="button" onClick={retry}><RotateCcw size={16} aria-hidden="true" />Retry clip</button></div>}
          {notice && <p className="reel-notice" role="status">{notice}</p>}
          <button type="button" className="reel-fullscreen" aria-label="View current motion clip fullscreen" onClick={() => {
            const video = videoRefs.current[active];
            if (!video || typeof video.requestFullscreen !== "function") {
              setNotice("Fullscreen is not available in this browser. Playback remains available here.");
              return;
            }
            void video.requestFullscreen().catch((error: unknown) => {
              console.error("BeamHub fullscreen playback was unavailable.", error);
              setNotice("Fullscreen is unavailable here. Playback remains available in the brochure.");
            });
          }}><Maximize2 size={17} aria-hidden="true" /></button>
        </div>
        <div className="reel-controls">
          <div className="reel-selector" role="group" aria-label="Choose a motion clip">
            {reels.map((item, index) => <button type="button" key={item.id} aria-pressed={active === index} aria-label={`Show ${item.label}`} onClick={() => selectReel(index)}><span>0{index + 1}</span><strong>{item.label}</strong></button>)}
          </div>
          <div className="reel-transport">
            <button type="button" aria-label="Previous motion clip" onClick={() => selectReel(active - 1)}><ArrowLeft size={18} aria-hidden="true" /></button>
            <button type="button" aria-label={paused || autoplayBlocked || !motionEnabled ? "Play motion clips" : "Pause motion clips"} disabled={!motionEnabled} onClick={playManually}>{paused || autoplayBlocked || !motionEnabled ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}</button>
            <button type="button" aria-label="Next motion clip" onClick={() => selectReel(active + 1)}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <div className="reel-foot"><span className="reel-progress" ref={progressRef}><i /></span><p aria-live="polite">{autoplayBlocked ? "Press play to begin." : !motionEnabled ? "Still mode. Explore each perspective at your pace." : reel.label}</p><span>SWIPE / EXPLORE</span></div>
      </div>
    </section>
  );
}

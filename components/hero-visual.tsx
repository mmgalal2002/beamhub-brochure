"use client";

import { ArrowUpRight, BookOpen, Globe2 } from "lucide-react";
import { BeamMark } from "./brand";
import { CoursePreviewButton } from "./course-preview";
import { usePointerField } from "./experience-provider";
import { LinacIllustration, OrbitSeal } from "./illustrations";

export function HeroVisual() {
  const pointer = usePointerField();
  return (
    <div className="hero-visual hero-visual-interactive" {...pointer}>
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <span className="visual-coordinate" aria-hidden="true">KNOWLEDGE / IN EVERY DIRECTION</span>
      <div className="lab-frame">
        <div className="lab-bar"><span className="lab-dots" aria-hidden="true"><i /><i /><i /></span><span>THE LEARNING LAB</span><BeamMark className="lab-brand" /></div>
        <div className="lab-stage">
          <div className="lab-stage-title"><span>A NEW PERSPECTIVE</span><p>Knowledge,<br /><em>in motion.</em></p></div>
          <LinacIllustration className="hero-linac" />
          <span className="lab-scan-line" aria-hidden="true" />
          <span className="lab-stage-label">RADIATION MEDICINE / A NEW PERSPECTIVE</span>
        </div>
      </div>
      <OrbitSeal />
      <div className="world-chip"><Globe2 size={24} strokeWidth={1.4} aria-hidden="true" /><span><strong>80+ countries.</strong><small>One connected community.</small></span></div>
      <CoursePreviewButton courseId="shielding" className="featured-chip" aria-label="Preview LINAC Shielding Design">
        <span className="featured-chip-icon"><BookOpen size={22} aria-hidden="true" /></span>
        <span><small>YOUR NEXT CHAPTER?</small><strong>LINAC Shielding Design</strong><em>Self-paced &middot; 3+ hours</em></span>
        <ArrowUpRight size={19} aria-hidden="true" />
      </CoursePreviewButton>
      <span className="visual-footnote">A little curiosity. A world of possibility.</span>
    </div>
  );
}

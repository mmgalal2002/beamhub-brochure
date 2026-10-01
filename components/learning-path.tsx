"use client";

import { ArrowUpRight, Compass, MoveRight } from "lucide-react";
import { useState } from "react";
import { getCourse, learnerPaths, type LearnerId } from "@/lib/beamhub";
import { CoursePreviewButton } from "./course-preview";

export function LearningPath() {
  const [selectedId, setSelectedId] = useState<LearnerId>("physicist");
  const path = learnerPaths.find((item) => item.id === selectedId);
  if (!path) throw new Error(`The learning path "${selectedId}" is not defined.`);

  return (
    <section id="your-path" className="path-section section-space" tabIndex={-1} aria-labelledby="path-heading">
      <div className="container path-layout">
        <div className="path-intro" data-reveal>
          <p className="eyebrow"><span>06</span> MAKE IT YOURS</p>
          <h2 id="path-heading">Your path.<br /><em>Your possibility.</em></h2>
          <p className="section-lead">Different backgrounds. Shared ambition.<br />A few ideas for where to begin.</p>
          <div className="path-roles" role="group" aria-label="Choose your professional background">
            {learnerPaths.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={selectedId === item.id}
                onClick={() => setSelectedId(item.id)}
              >
                {item.label}
                <MoveRight size={18} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div className="path-card" key={selectedId}>
          <div className="path-card-topline"><Compass size={21} aria-hidden="true" /><span>A LITTLE DIRECTION</span><span>01 / 03</span></div>
          <p className="path-persona" aria-live="polite" aria-atomic="true">A starting point for: {path.label}</p>
          <h3>{path.title}</h3>
          <p className="path-description">{path.description}</p>
          <ol className="path-recommendations">
            {path.courseIds.map((id, index) => {
              const course = getCourse(id);
              return (
                <li key={id}>
                  <CoursePreviewButton courseId={course.id} aria-label={`Preview ${course.title}`}>
                    <span className="path-number">0{index + 1}</span>
                    <span><strong>{course.title}</strong><small>{course.format}</small></span>
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </CoursePreviewButton>
                </li>
              );
            })}
          </ol>
          <p className="path-note">Editorial starting points, not a prescribed curriculum or clinical advice. Follow your interests and check each course on BeamHub.</p>
        </div>
      </div>
    </section>
  );
}

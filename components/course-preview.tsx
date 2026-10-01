"use client";

import { ArrowUpRight, Check, X } from "lucide-react";
import { createContext, useContext, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { getCourse, sourceDate, type CourseId } from "@/lib/beamhub";
import { CourseArtwork } from "./illustrations";
import { ExternalLink } from "./external-link";
import { Modal } from "./modal";

const CoursePreviewContext = createContext<((id: CourseId) => void) | null>(null);

export function CoursePreviewProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<CourseId | null>(null);
  const course = selectedId ? getCourse(selectedId) : null;
  return (
    <CoursePreviewContext.Provider value={setSelectedId}>
      {children}
      <Modal
        open={course !== null}
        onClose={() => setSelectedId(null)}
        className="course-dialog"
        labelledBy="course-dialog-title"
        describedBy="course-dialog-description"
      >
        {course && (
          <div className={`course-dialog-panel tone-${course.tone}`}>
            <div className="dialog-art">
              <CourseArtwork kind={course.id} />
              <span className="course-format">{course.format}</span>
              <button type="button" className="dialog-close" aria-label="Close course preview" onClick={() => setSelectedId(null)}>
                <X size={21} aria-hidden="true" />
              </button>
            </div>
            <div className="dialog-body">
              <p className="eyebrow">YOUR NEXT LEARNING CHAPTER</p>
              <h2 id="course-dialog-title">{course.title}</h2>
              {course.title !== course.officialTitle && (
                <p className="official-course-name">Listed on BeamHub as: {course.officialTitle}</p>
              )}
              <p id="course-dialog-description">{course.description}</p>
              <div className="course-facts">{course.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
              <h3>What you can explore</h3>
              <ul className="course-focus">
                {course.focus.map((focus) => <li key={focus}><Check size={17} aria-hidden="true" />{focus}</li>)}
              </ul>
              <ExternalLink href={course.source} className="button button-orange dialog-cta">
                Continue on BeamHub <ArrowUpRight size={17} aria-hidden="true" />
              </ExternalLink>
              <p className="dialog-note">Course details reviewed {sourceDate}. Confirm current access and enrollment on BeamHub.</p>
            </div>
          </div>
        )}
      </Modal>
    </CoursePreviewContext.Provider>
  );
}

type CoursePreviewButtonProps = ComponentPropsWithoutRef<"button"> & { courseId: CourseId };

export function CoursePreviewButton({ courseId, children, onClick, ...props }: CoursePreviewButtonProps) {
  const openCourse = useContext(CoursePreviewContext);
  if (!openCourse) throw new Error("Course preview buttons require CoursePreviewProvider.");
  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) openCourse(courseId);
      }}
    >
      {children}
    </button>
  );
}

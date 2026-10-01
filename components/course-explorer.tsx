"use client";

import { ArrowRight, ArrowUpRight, BookOpen, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { filterCourses, learningCategories, type CategoryId } from "@/lib/beamhub";
import { CourseArtwork } from "./illustrations";
import { CoursePreviewButton } from "./course-preview";

export function CourseExplorer() {
  const [category, setCategory] = useState<CategoryId>("all");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const visibleCourses = filterCourses(category, query);

  return (
    <section id="learning" className="learning-section section-space" tabIndex={-1} aria-labelledby="learning-heading">
      <div className="container">
        <div className="section-heading learning-heading" data-reveal>
          <div>
            <p className="eyebrow"><span>03</span> FIND YOUR NEXT CHAPTER</p>
            <h2 id="learning-heading">Big ideas.<br /><em>Practical learning.</em></h2>
          </div>
          <p className="section-lead">Follow your curiosity. Build on what you know.<br className="desktop-break" />Find a learning space that meets you where you are.</p>
        </div>
        <div className="catalog-toolbar">
          <div className="course-filters" role="group" aria-label="Filter learning by subject">
            {learningCategories.map((item) => (
              <button key={item.id} type="button" aria-pressed={category === item.id} className={category === item.id ? "filter-button is-selected" : "filter-button"} onClick={() => setCategory(item.id)}>{item.label}</button>
            ))}
          </div>
          <div className="course-search">
            <Search size={17} aria-hidden="true" />
            <label htmlFor="course-query" className="sr-only">Search featured courses</label>
            <input id="course-query" type="search" placeholder="A subject on your mind?" value={query} onChange={(event) => setQuery(event.target.value)} ref={searchRef} />
            {query && <button type="button" aria-label="Clear course search" onClick={() => { setQuery(""); searchRef.current?.focus(); }}><X size={16} aria-hidden="true" /></button>}
          </div>
        </div>
        <div className="catalog-meta">
          <p aria-live="polite" aria-atomic="true">{visibleCourses.length} featured learning {visibleCourses.length === 1 ? "space" : "spaces"}{query.trim() && <> matching &ldquo;{query.trim()}&rdquo;</>}</p>
          <span>COURSE &amp; CURRICULUM PREVIEWS</span>
        </div>
        <div className="course-grid" key={`${category}-${query.trim().toLowerCase()}`}>
          {visibleCourses.map((course, index) => (
            <article className={`course-card tone-${course.tone}`} key={course.id} data-course-id={course.id} style={{ animationDelay: `${index * 65}ms` }}>
              <div className="course-visual">
                <span className="course-format">{course.format}</span>
                <span className="course-visual-cross" aria-hidden="true">+</span>
                <CourseArtwork kind={course.id} />
                <span className="course-art-caption" aria-hidden="true">A NEW PERSPECTIVE</span>
              </div>
              <div className="course-card-body">
                <h3>{course.title}</h3><p>{course.summary}</p>
                <div className="course-card-footer">
                  <span><BookOpen size={15} aria-hidden="true" />{course.metric}</span>
                  <CoursePreviewButton courseId={course.id} aria-label={`Explore ${course.title}`}>View course <ArrowUpRight size={17} aria-hidden="true" /></CoursePreviewButton>
                </div>
              </div>
            </article>
          ))}
        </div>
        {visibleCourses.length === 0 && (
          <div className="catalog-empty">
            <Search size={30} aria-hidden="true" /><h3>A different direction, perhaps?</h3>
            <p>No featured courses match this search. Try another subject or start fresh.</p>
            <button type="button" className="button button-dark" onClick={() => { setCategory("all"); setQuery(""); }}>Reset filters <ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        )}
        <p className="catalog-note">A selection of BeamHub learning spaces. Choose a course to explore its curriculum.</p>
      </div>
    </section>
  );
}

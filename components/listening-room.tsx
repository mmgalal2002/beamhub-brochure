"use client";

import { ArrowUpRight, Headphones, MoveRight } from "lucide-react";
import { useState } from "react";
import { podcastSpotlight } from "@/lib/beamhub";
import { ExternalLink } from "./external-link";

export function ListeningRoom() {
  const [formatIndex, setFormatIndex] = useState(0);
  const format = podcastSpotlight.formats[formatIndex];
  if (!format) throw new Error(`The podcast source type "${formatIndex}" is not defined.`);
  const number = String(formatIndex + 1).padStart(2, "0");

  return (
    <section id="listening-room" className="listening-room" tabIndex={-1} aria-labelledby="listening-room-heading">
      <div className="container listening-room-inner">
        <div className="listening-masthead">
          <span><b>05</b> / ANOTHER WAY TO MEET AN IDEA</span>
          <span><Headphones size={17} strokeWidth={1.4} aria-hidden="true" /> BEAMHUB PODCASTS</span>
        </div>
        <div className="listening-layout">
          <div className="listening-editorial">
            <p className="listening-edition">THE LISTENING ROOM / SOUND EDITION</p>
            <h2 id="listening-room-heading">OFF<br />THE PAGE<span>.</span></h2>
            <p className="listening-introduction">Some ideas deserve a different way in.</p>
            <p className="listening-description">BeamHub&apos;s podcast space offers bite-sized summaries of impactful articles, books and insights. A listening route into the written word, with room for a fresh perspective.</p>
            <div className="listening-format-copy" aria-live="polite" aria-atomic="true">
              <span className="listening-format-index">{number} / {format.label.toUpperCase()}</span>
              <h3>{format.headline}</h3>
              <p>{format.description}</p>
            </div>
          </div>
          <div className="listening-object">
            <div className="record-sleeve" aria-hidden="true">
              <span className="sleeve-spine">BEAMHUB / PODCASTS / THE LISTENING ROOM</span>
              <span className="sleeve-stamp">BITE<br />SIZED.</span>
              <span className="sleeve-bottom">LESS SCREEN.<br />MORE HEADSPACE.</span>
              <span className="sleeve-barcode">{Array.from({ length: 16 }, (_, index) => <i key={index} />)}</span>
            </div>
            <button
              type="button"
              className="listening-record"
              aria-label={`Explore the next podcast source type. Currently ${format.label}.`}
              aria-describedby="listening-dial-hint"
              onClick={() => setFormatIndex((index) => (index + 1) % podcastSpotlight.formats.length)}
            >
              <span className="vinyl-surface" style={{ transform: `rotate(${formatIndex * 120 - 24}deg)` }} aria-hidden="true">
                <span className="vinyl-grooves" />
                <span className="vinyl-reflection" />
                <span className="vinyl-marker" />
              </span>
              <span className="vinyl-label" aria-hidden="true"><small>BEAMHUB / SOUND EDITION</small><strong>{format.label}</strong><span>{number}</span><i /><em>TURN TO EXPLORE</em></span>
            </button>
            <span className="record-object-caption" aria-hidden="true">{format.sleeve}</span>
          </div>
        </div>
        <div className="listening-bottom">
          <div className="listening-dial">
            <div className="listening-dial-label"><label htmlFor="podcast-source-dial">CHOOSE THE SOURCE</label><MoveRight size={15} aria-hidden="true" /><span>{format.label}</span></div>
            <input
              id="podcast-source-dial"
              type="range"
              min={0}
              max={podcastSpotlight.formats.length - 1}
              step={1}
              value={formatIndex}
              aria-valuetext={format.label}
              aria-describedby="listening-dial-hint"
              onChange={(event) => setFormatIndex(event.currentTarget.valueAsNumber)}
            />
            <div className="listening-dial-stops" aria-hidden="true">{podcastSpotlight.formats.map((item) => <span key={item.id}>{item.label}</span>)}</div>
            <p id="listening-dial-hint">Turn the record or move the dial to explore the source types.</p>
          </div>
          <ExternalLink href={podcastSpotlight.href} className="listening-destination">
            <span><small>THE NEXT LISTEN IS ON BEAMHUB</small><strong>Open the podcast space</strong></span><ArrowUpRight size={26} strokeWidth={1.4} aria-hidden="true" />
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}

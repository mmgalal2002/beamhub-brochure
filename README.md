# BeamHub: the interactive field guide

A standalone marketing brochure for BeamHub's radiation medicine community. Built with Next.js 16 App Router, React 19, TypeScript and original editorial styling.

This is a separate project. It does not import runtime code or assets from ArtDoom or digitalbrochure, and it does not modify either reference project.

## Run locally

Requires Node.js 22.18 or later and npm.

```powershell
npm install
npm run dev -- --hostname 127.0.0.1 --port 3100
```

Open [http://localhost:3100](http://localhost:3100).

For a production preview:

```powershell
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
```

Use a different free port if 3100 is already occupied. When building for a different local port, set `SITE_URL` to the matching local origin first so social-image links use the correct preview. Set `SITE_URL` to your actual brochure origin when deploying; it defaults to `http://localhost:3100` for local social-image metadata.

```powershell
$env:SITE_URL = 'https://your-brochure-domain.com'
npm run build
```

Do not set `SITE_URL` to BeamHub's official domain unless this brochure is actually deployed there. Enrollment, account access and payments remain on the official BeamHub site.

## The experience

- A pointer-reactive editorial cover with original scientific illustrations, orbital motion and a featured course preview.
- A floating chapter console with an orbital reading indicator, numbered chapter dial and an expandable eight-chapter map.
- Three original, locally hosted motion films in a sliding carousel with sequential playback, pause/resume, clip selection, swipe navigation and fullscreen controls.
- A distinctive podcast listening room: oversized editorial typography, a tactile record sleeve and a keyboard-accessible source dial exploring articles, books and insights.
- A mission chapter centered on collaboration, knowledge exchange and patient care.
- Six featured learning spaces with subject filters, text search, empty states and accessible curriculum-preview dialogs.
- All ten ecosystem areas presented on BeamHub's public introduction: courses, YouTube collections, knowledge groups, events, Journal Club, jobs, podcasts, surveys, organizers/instructors and discovery.
- Four interactive role-based starting points opening a shared curriculum preview.
- A global-community chapter and direct links to BeamHub, LinkedIn, YouTube and the official contact address.
- Modern beam-connected feature cards whose nodes, ports and paths share one SVG coordinate system; beam pulses respond to hover and keyboard focus.
- Scroll reveals, responsive navigation, active-chapter indicators, keyboard support, reduced-motion support, a skip link and basic print styling.
- Self-hosted variable typography, a custom site icon and a generated PNG social-sharing card.

The chapters remain server-rendered. Small client components handle navigation, motion, the listening room, course exploration and role selection. Videos pause outside the viewport or when the tab is hidden. Reduced-motion preferences disable automatic playback and decorative animation. Playback controls live beside the films, not in the navbar.

Each official destination has one outbound link in the rendered brochure. Course cards, the cover's course chip and role suggestions open a single shared course dialog; only that dialog exposes the selected course's official destination. The catalogue link appears once among the community spaces, and the podcast destination appears once in the listening room. The final chapter-navigation item, “The portal,” links to the closing `#join` section, where the community entry button appears once. Marketing CTAs go to official destinations or open local previews; they do not jump to another brochure section. Only chapter navigation, home links and the accessibility skip link use section anchors.

There is no analytics, tracking integration, account system or external image/video dependency. The public content-and-design-notes footer has been removed; research and asset provenance remain documented here.

## Content and evidence

Public information was reviewed on **1 October 2026**. Public access provided all the information needed; no login credentials are stored, included in source, or required to run the project.

Primary sources:

- [BeamHub introduction and mission](https://www.beamhub.org/start), including its embedded introduction at [beamhub.vercel.app](https://beamhub.vercel.app/).
- [BeamHub feed](https://www.beamhub.org/feed).
- [Public course catalogue](https://www.beamhub.org/courses).

### Section 05: the listening room

The [official introduction](https://www.beamhub.org/start), including its [public embedded page](https://beamhub.vercel.app/), describes **Podcasts** as "Bite-sized summaries of impactful articles, books, and insights" and links to the [BeamHub podcast space](https://www.beamhub.org/c/podcast/).

The chapter is based on that verified description. Its three source types are not episode titles or an invented catalogue. The record and dial browse those source types; they do not simulate audio playback. Real listening takes place on BeamHub. Member-only spaces requested email verification during research, so no unverified episode names, audio durations, recordings or survey results are used.

The previous Maidstone spotlight and its duplicate machine/curriculum design were removed. Podcasts were moved out of the section-04 shortcut list into this dedicated chapter so the destination and content are not repeated. The other chapters keep their existing layouts.

| Brochure title | Official learning space | Verified public details |
| --- | --- | --- |
| LINAC Shielding Design | [Shielding Design for Linear Accelerator - self-paced Course](https://www.beamhub.org/c/shielding-design-for-linear-accelerator-self-paced-course) | Over 3 hours of recorded content; assessments; completion certificate available on request |
| Maidstone Linac Engineering | [Maidstone Linac Engineering](https://www.beamhub.org/c/linac-engineering-course) | 10 sections, 20 lessons, 1 hr 33 min of listed content |
| Eclipse Dosimetry & Planning | [Eclipse Treatment planning Dosimetry Guide](https://www.beamhub.org/c/dosimetry-and-planning-courses) | 9 sections, 48 lessons |
| Radiology Anatomy Tutorials | [Radiology Anatomy Tutorials](https://www.beamhub.org/c/radiology-tutorials) | 6 sections, 34 lessons |
| Radiation Physics: A First Look | [Sample Course](https://www.beamhub.org/c/basic-physics) | 5 sections, 10 lessons; X-ray production, interactions and measurement |
| GAMPER Masterclass | [GAMPER Masterclass](https://www.beamhub.org/c/gamper-masterclass) | Public description identifies an SBRT/SRS masterclass covering physics, planning, QA, guidance and clinical implementation |

Display titles are editorially shortened where useful. The original title is shown in the course dialog when it differs.

The introduction publishes **1.2K+ members, 80+ countries, 4.6K+ enrollments and 59+ events**. These are attributed published figures, not independently verified or live counters. The brochure labels their source and review date.

Course availability, access and prices can change. The brochure deliberately does not invent pricing, accreditation, testimonials, instructor credentials, event schedules or clinical outcomes. Its role suggestions are editorial recommendations, not a prescribed curriculum or medical advice.

## Design references and assets

ArtDoom informed the field-guide structure and scientific visual language. digitalbrochure informed chapter navigation, sliding films, sequential playback and modular information hierarchy.

[21st.dev](https://21st.dev/community/components) and contemporary editorial/bento design patterns informed the interaction approach. No third-party component source was copied. The wordmark treatment, illustrations, globe, network diagrams, record-sleeve design and films are original brochure artwork, not official platform screenshots or clinical simulations. There is no invented AI companion.

The three silent eight-second H.264 MP4 clips in [public/motion](./public/motion) are original procedural animations: a beam/shielding study, a contour/planning study and a connected-globe study. Adjacent text provides their meaning; there is no spoken content requiring captions. They are hosted locally because the public feed's third-party media URLs are signed and expire.

To regenerate the films and optimized WebP posters without installing graphics packages:

```powershell
npm run media:render
```

Open the printed local studio URL in a Chromium browser, choose **Render original reels**, and keep the tab visible for the approximately 24-second recording. Stop the studio afterward. `MOTION_STUDIO_PORT` can select another free local port. The renderer binds only to loopback, accepts only the six named output assets, and limits each asset to 16 MB.

DM Sans is distributed through `@fontsource-variable/dm-sans` under the SIL Open Font License. Lucide icons are distributed under the ISC license. Both packages retain their license files. Fonts are served locally through `next/font/local`; the production build does not fetch fonts or course data.

## Structure

- [app/page.tsx](./app/page.tsx): server-rendered marketing chapters.
- [app/globals.css](./app/globals.css): design tokens, responsive layouts, reduced motion and print styles.
- [app/experience.css](./app/experience.css): chapter console, film carousel and motion styling.
- [app/features.css](./app/features.css): connected beam cards.
- [app/listening-room.css](./app/listening-room.css): the distinct editorial podcast chapter.
- [lib/beamhub.ts](./lib/beamhub.ts): sourced content, official destinations, course filtering and role suggestions.
- [components/course-explorer.tsx](./components/course-explorer.tsx): catalogue controls and course cards.
- [components/course-preview.tsx](./components/course-preview.tsx): shared course preview and single official course destination.
- [components/modal.tsx](./components/modal.tsx): accessible native-dialog lifecycle, Escape dismissal and focus restoration.
- [components/experience-provider.tsx](./components/experience-provider.tsx): motion preferences, scroll reveals and pointer fields.
- [components/motion-reel.tsx](./components/motion-reel.tsx): sequential video playback and film navigation.
- [components/listening-room.tsx](./components/listening-room.tsx): accessible record/dial interaction and the single podcast destination.
- [components/feature-beams.tsx](./components/feature-beams.tsx): responsive SVG diagrams with connectors derived from node geometry.
- [components/learning-path.tsx](./components/learning-path.tsx): role-based recommendations.
- [components/site-header.tsx](./components/site-header.tsx): floating chapter console and expanded map.
- [components/illustrations.tsx](./components/illustrations.tsx): original, reusable SVG artwork.
- [tests/catalog.test.mjs](./tests/catalog.test.mjs): native Node.js tests for catalogue behavior and content invariants.

## Validate

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

Tests use Node's native runner and TypeScript stripping; no extra test framework is required. For a quick UI check, verify the chapter map, connected card graphics, podcast source selection, a course preview and mobile layout. Check that external destinations are not duplicated and no marketing CTA uses a section anchor. Section-05 changes use quick lint/build checks and brief browser checks, not the full test suite or media re-rendering.

Next.js is pinned to 16.3.8, which resolves the dependency advisory reported by the initial 16.3.4 scaffold. Turbopack and output tracing are explicitly rooted in this project to keep neighboring workspace projects isolated.

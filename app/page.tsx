import {
  ArrowUpRight,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Heart,
  Lightbulb,
  Network,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import { BeamMark, Wordmark } from "@/components/brand";
import { CourseExplorer } from "@/components/course-explorer";
import { ListeningRoom } from "@/components/listening-room";
import { ExperienceProvider } from "@/components/experience-provider";
import { ExternalLink } from "@/components/external-link";
import { FeatureBeams } from "@/components/feature-beams";
import { HeroVisual } from "@/components/hero-visual";
import { GlobeIllustration } from "@/components/illustrations";
import { LearningPath } from "@/components/learning-path";
import { MotionReel } from "@/components/motion-reel";
import { SiteHeader } from "@/components/site-header";
import {
  beamHubLinks,
  ecosystem,
  moreSpaces,
  publishedStats,
  sourceDate,
} from "@/lib/beamhub";

const spaceIcons: Record<(typeof moreSpaces)[number]["id"], LucideIcon> = {
  courses: GraduationCap,
  youtube: Video,
  surveys: ClipboardList,
  organizers: Users,
  discover: Lightbulb,
};

const principles = [
  {
    number: "01",
    icon: Network,
    title: "Connect the disciplines.",
    description:
      "Bring clinical practice, physics, engineering and research into the same conversation.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Make knowledge travel.",
    description:
      "Turn what one person knows into something an entire community can build on.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Keep care at the center.",
    description:
      "Share a common ambition: stronger education, thoughtful innovation and better patient care.",
  },
] as const;

export default function Home() {
  return (
    <ExperienceProvider>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section id="home" className="hero-section" tabIndex={-1} aria-labelledby="hero-heading">
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow"><span className="status-dot" /> A BRIGHTER FUTURE FOR RADIATION MEDICINE</p>
              <h1 id="hero-heading">
                <span>Great minds.</span>
                <em>Brighter</em>
                <span>medicine.</span>
              </h1>
              <p className="hero-lead">A home for the people moving radiation medicine forward. Learn from experts, share what you know, and turn curiosity into possibility.</p>
              <div className="hero-actions">
                <ExternalLink href={beamHubLinks.introduction} className="button button-orange">
                  Discover BeamHub <ArrowUpRight size={19} aria-hidden="true" />
                </ExternalLink>
              </div>
              <div className="hero-proof">
                <span className="discipline-tokens" aria-hidden="true"><i>P</i><i>D</i><i>E</i><i>+</i></span>
                <p><strong>Different minds. Shared ambition.</strong><span>For professionals, students and the endlessly curious.</span></p>
              </div>
            </div>

            <HeroVisual />
          </div>
          <div className="container hero-bottom">
            <span>LEARN. CONNECT. ADVANCE.</span>
            <span>THE STORY STARTS WITH YOU</span>
            <span>BEAMHUB / THE FIELD GUIDE</span>
          </div>
        </section>

        <div className="discipline-band">
          <div className="container">
            {["Medical physics", "Radiotherapy", "Dosimetry", "Clinical engineering", "Research"].map((discipline) => (
              <span key={discipline}><BeamMark />{discipline}</span>
            ))}
          </div>
        </div>

        <section className="stats-section" aria-label="Community figures published by BeamHub">
          <div className="container">
            <div className="stats-grid">
              {publishedStats.map((stat) => (
                <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
              ))}
            </div>
            <p className="stats-source">Figures published by BeamHub. Reviewed {sourceDate}.</p>
          </div>
        </section>

        <section id="vision" className="vision-section section-space" tabIndex={-1} aria-labelledby="vision-heading">
          <div className="container">
            <div className="vision-layout" data-reveal>
              <div>
                <p className="eyebrow"><span>01</span> THE BIG PICTURE</p>
                <h2 id="vision-heading">Better together.<br /><em>By design.</em></h2>
              </div>
              <div className="vision-story">
                <p>Progress doesn&apos;t happen in isolation. It happens when <span>good minds find each other.</span></p>
                <div>BeamHub brings radiation medicine professionals and students into a shared space for collaboration, education and innovation. A place to exchange experience, explore research and keep growing&mdash;with patient care as the common purpose.</div>
                <p className="mission-signature">Shared expertise. Real-world possibility.</p>
              </div>
            </div>
            <div className="principle-grid">
              {principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <article className="principle-card" key={principle.number} data-reveal={Number(principle.number) * 80}>
                    <div className="principle-topline"><span>{principle.number} / OUR AMBITION</span><Icon size={24} strokeWidth={1.4} aria-hidden="true" /></div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <MotionReel />
        <CourseExplorer />

        <section id="experience" className="experience-section beamy-experience section-space" tabIndex={-1} aria-labelledby="experience-heading">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow"><span>04</span> NOT JUST A PLATFORM. A PLACE.</p>
                <h2 id="experience-heading">More than a course.<br /><em>A place to belong.</em></h2>
              </div>
              <p className="section-lead">The lesson is only the beginning.<br />Find the people, perspectives and possibilities<br className="desktop-break" /> that keep the learning going.</p>
            </div>

            <div className="ecosystem-grid">
              {ecosystem.map((space, index) => (
                <ExternalLink href={space.href} className={`ecosystem-card ecosystem-card--${space.id} beamy-card`} key={space.id}>
                  <div className="ecosystem-card-top"><span className="feature-card-index">0{index + 1} / {space.label}</span><span className="feature-card-mark"><BeamMark /></span></div>
                  <FeatureBeams kind={space.id} />
                  <div className="ecosystem-card-copy"><h3>{space.title}</h3><p>{space.description}</p></div>
                  <div className="feature-card-footer"><span>{space.label === "JOB BOARD" ? "FIND YOUR NEXT OPPORTUNITY" : `EXPLORE ${space.label}`}</span><ArrowUpRight size={19} aria-hidden="true" /></div>
                </ExternalLink>
              ))}
            </div>

            <div className="more-spaces">
              {moreSpaces.map((space) => {
                const Icon = spaceIcons[space.id];
                return (
                  <ExternalLink href={space.href} key={space.id} className="space-link">
                    <Icon size={23} strokeWidth={1.4} aria-hidden="true" />
                    <span><strong>{space.title}</strong><small>{space.subtitle}</small></span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </ExternalLink>
                );
              })}
            </div>
          </div>
        </section>

        <ListeningRoom />
        <LearningPath />

        <section id="community" className="community-section section-space" tabIndex={-1} aria-labelledby="community-heading">
          <div className="container community-layout">
            <div className="community-copy" data-reveal>
              <p className="eyebrow"><span>07</span> GLOBAL BY DESIGN. HUMAN BY NATURE.</p>
              <h2 id="community-heading">Knowledge knows<br /><em>no borders.</em></h2>
              <p className="section-lead">Different disciplines. Different time zones.<br />The same drive to move radiation medicine forward.</p>
              <div className="profession-tags">
                {["Clinicians", "Medical physicists", "Dosimetrists", "Engineers", "Researchers", "Students"].map((profession) => <span key={profession}>{profession}</span>)}
              </div>
              <p className="community-invitation">There&apos;s a place for your perspective.</p>
            </div>
            <div className="community-visual">
              <GlobeIllustration />
              <div className="global-caption"><span>80<span>+</span></span><p>countries.<br /><strong>Endless perspectives.</strong></p></div>
              <span className="global-caption-note">A SHARED PURSUIT OF SOMETHING BETTER</span>
            </div>
          </div>
        </section>

        <section id="join" className="closing-section" tabIndex={-1} aria-labelledby="closing-heading">
          <div className="container">
            <div className="closing-card" data-reveal>
              <div className="closing-rings" aria-hidden="true"><i /><i /><i /></div>
              <p className="eyebrow">A LITTLE CURIOSITY CAN GO A LONG WAY.</p>
              <h2 id="closing-heading">Your next chapter<br />starts <em>here.</em></h2>
              <div className="closing-bottom">
                <p>Bring your questions. Bring your experience.<br />There&apos;s a place for you at BeamHub.</p>
                <ExternalLink href={beamHubLinks.community} className="button button-paper">
                  Step into BeamHub <ArrowUpRight size={19} aria-hidden="true" />
                </ExternalLink>
              </div>
              <BeamMark className="closing-mark" />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand"><a href="#home" aria-label="Back to BeamHub brochure home"><Wordmark /></a><p>Where experts meet.<br />And possibility begins.</p></div>
            <div className="footer-links footer-focus"><h3>OUR SHARED FOCUS</h3><span>Expert-led learning</span><span>Knowledge exchange</span><span>Professional connection</span></div>
            <div className="footer-links"><h3>START A CONVERSATION</h3><ExternalLink href={beamHubLinks.email}>admin@beamhub.org <ArrowUpRight size={14} aria-hidden="true" /></ExternalLink><ExternalLink href={beamHubLinks.linkedin}>LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></ExternalLink><ExternalLink href={beamHubLinks.youtube}>YouTube <ArrowUpRight size={14} aria-hidden="true" /></ExternalLink></div>
          </div>
          <div className="footer-bottom"><span>BEAMHUB / AN INTERACTIVE FIELD GUIDE</span><span>DESIGNED TO LEARN. BUILT TO CONNECT.</span><div><ExternalLink href={beamHubLinks.privacy}>Privacy</ExternalLink><ExternalLink href={beamHubLinks.terms}>Terms</ExternalLink></div></div>
        </div>
      </footer>
    </ExperienceProvider>
  );
}

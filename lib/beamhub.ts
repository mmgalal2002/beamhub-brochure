export const sourceDate = "1 October 2026";

export const beamHubLinks = {
  introduction: "https://www.beamhub.org/start",
  community: "https://www.beamhub.org/feed",
  courses: "https://www.beamhub.org/courses",
  email: "mailto:admin@beamhub.org",
  linkedin: "https://www.linkedin.com/company/beamhub/",
  youtube: "https://www.youtube.com/@BeamHubPltform",
  privacy: "https://www.beamhub.org/beamhub-privacy",
  terms: "https://www.beamhub.org/beamhub-privacy-5c5bc7",
} as const;

export const navigation = [
  { id: "vision", label: "The vision", hint: "The bigger picture" },
  { id: "motion-reel", label: "In motion", hint: "A different perspective" },
  { id: "learning", label: "The learning", hint: "Follow your curiosity" },
  { id: "experience", label: "The experience", hint: "A place to belong" },
  { id: "listening-room", label: "The listening room", hint: "Ideas, off the page" },
  { id: "your-path", label: "Your path", hint: "Make it your own" },
  { id: "community", label: "The community", hint: "Knowledge without borders" },
  { id: "join", label: "The portal", hint: "Your next chapter" },
] as const;

export const learningCategories = [
  { id: "all", label: "All learning" },
  { id: "protection", label: "Physics & protection" },
  { id: "engineering", label: "Engineering" },
  { id: "radiotherapy", label: "Planning & therapy" },
  { id: "anatomy", label: "Anatomy" },
] as const;

export type CategoryId = (typeof learningCategories)[number]["id"];
export type CourseId =
  | "shielding"
  | "linac"
  | "eclipse"
  | "anatomy"
  | "physics"
  | "gamper";
export type ArtworkKind = CourseId;

export interface Course {
  id: CourseId;
  title: string;
  officialTitle: string;
  category: Exclude<CategoryId, "all">;
  format: string;
  metric: string;
  summary: string;
  description: string;
  focus: readonly string[];
  facts: readonly string[];
  keywords: readonly string[];
  tone: "sage" | "peach" | "lavender" | "sand" | "blue" | "dark";
  source: string;
}

export const courses: readonly Course[] = [
  {
    id: "shielding",
    title: "LINAC Shielding Design",
    officialTitle:
      "Shielding Design for Linear Accelerator - self-paced Course",
    category: "protection",
    format: "Self-paced course",
    metric: "3+ hours",
    summary:
      "Turn shielding principles into practical understanding, one real-world case at a time.",
    description:
      "Build your knowledge of linear accelerator shielding with an expert-led, recorded course grounded in published standards and practical scenarios. Work through calculations and assessments at your own pace. BeamHub also offers a live-session arrangement by request.",
    focus: [
      "Fundamentals of LINAC shielding",
      "Published standards and shielding principles",
      "Real-world cases and calculations",
      "Built-in learning assessments",
    ],
    facts: [
      "Over 3 hours of recorded content",
      "Self-paced learning",
      "Completion certificate on request",
    ],
    keywords: ["radiation safety", "medical physics", "protection", "certificate"],
    tone: "sage",
    source:
      "https://www.beamhub.org/c/shielding-design-for-linear-accelerator-self-paced-course",
  },
  {
    id: "linac",
    title: "Maidstone Linac Engineering",
    officialTitle: "Maidstone Linac Engineering",
    category: "engineering",
    format: "Engineering course",
    metric: "20 lessons",
    summary:
      "Get closer to the systems behind the beam, from safety and networking to imaging and MLCs.",
    description:
      "Explore the engineering of a linear accelerator through the Maidstone course. The published curriculum combines system-focused video lessons with quizzes, covering TrueBeam safety, networking, power, beam production, shaping, imaging and support systems.",
    focus: [
      "Safety, networking and power distribution",
      "Beam production, generation and transport",
      "Beam shaping and multileaf collimators",
      "Imaging, support systems and safety loops",
    ],
    facts: ["10 sections", "20 lessons", "1 hr 33 min of listed content"],
    keywords: ["TrueBeam", "MLC", "clinical engineering", "linac safety"],
    tone: "peach",
    source: "https://www.beamhub.org/c/linac-engineering-course",
  },
  {
    id: "eclipse",
    title: "Eclipse Dosimetry & Planning",
    officialTitle: "Eclipse Treatment planning Dosimetry Guide",
    category: "radiotherapy",
    format: "YouTube collection",
    metric: "48 lessons",
    summary:
      "Follow the planning journey, from preparing a dataset to site-specific techniques and plan analysis.",
    description:
      "A curated treatment-planning collection with a published nine-section curriculum. Explore preparation, image fusion, contouring and optimization before moving into site-specific planning, electron techniques and plan analysis.",
    focus: [
      "Image fusion, contouring and preparation",
      "Site-specific treatment planning",
      "VMAT, optimization and electron planning",
      "Plan analysis",
    ],
    facts: ["9 sections", "48 lessons", "Curated YouTube learning"],
    keywords: ["dosimetry", "Eclipse", "VMAT", "IMRT", "contouring"],
    tone: "lavender",
    source: "https://www.beamhub.org/c/dosimetry-and-planning-courses",
  },
  {
    id: "anatomy",
    title: "Radiology Anatomy Tutorials",
    officialTitle: "Radiology Anatomy Tutorials",
    category: "anatomy",
    format: "YouTube collection",
    metric: "34 lessons",
    summary:
      "See anatomy from a new perspective through CT, MRI and radiographic learning.",
    description:
      "Explore image-based anatomy through a curated collection spanning cranial structures, the neck and shoulder, chest, abdomen, pelvis and joints. The published curriculum also includes a radiology anatomy practice-test lesson.",
    focus: [
      "Cranial and neuroanatomy",
      "Neck, shoulder and chest imaging",
      "Abdominal, pelvic and joint anatomy",
      "Anatomy practice and recap",
    ],
    facts: ["6 sections", "34 lessons", "CT, MRI and X-ray topics"],
    keywords: ["radiology", "anatomy", "CT", "MRI", "imaging", "X-ray"],
    tone: "sand",
    source: "https://www.beamhub.org/c/radiology-tutorials",
  },
  {
    id: "physics",
    title: "Radiation Physics: A First Look",
    officialTitle: "Sample Course",
    category: "protection",
    format: "Sample course",
    metric: "10 lessons",
    summary:
      "Start with the essentials: how X-rays are produced, how radiation interacts, and how it is measured.",
    description:
      "BeamHub's Sample Course introduces core radiation physics through a YouTube-linked collection of lessons and quizzes. Use it as a starting point for production, interactions and measurement before exploring more specialized learning.",
    focus: [
      "Production of X-rays",
      "Ionizing radiation interactions with matter",
      "Measurement of ionizing radiation",
      "KERMA, absorbed dose and stopping power",
    ],
    facts: ["5 sections", "10 lessons", "Lessons paired with quizzes"],
    keywords: ["basic physics", "foundations", "sample", "KERMA", "dose"],
    tone: "blue",
    source: "https://www.beamhub.org/c/basic-physics",
  },
  {
    id: "gamper",
    title: "GAMPER Masterclass",
    officialTitle: "GAMPER Masterclass",
    category: "radiotherapy",
    format: "Masterclass",
    metric: "SBRT & SRS",
    summary:
      "Connect the physics of precision radiotherapy with planning, quality assurance and clinical practice.",
    description:
      "The GAMPER course page presents an SBRT and SRS masterclass for medical physics and radiotherapy professionals. Its stated scope connects physical principles with advanced planning, image guidance, quality assurance and clinical implementation.",
    focus: [
      "Physical principles of SBRT and SRS",
      "Advanced treatment-planning strategies",
      "Quality assurance and image guidance",
      "Clinical implementation and best practices",
    ],
    facts: ["SBRT and SRS", "Physics-to-practice focus", "Planning, QA and guidance"],
    keywords: ["GAMPER", "SBRT", "SRS", "stereotactic", "precision radiotherapy"],
    tone: "dark",
    source: "https://www.beamhub.org/c/gamper-masterclass",
  },
];

export const publishedStats = [
  { value: "1.2K+", label: "community members" },
  { value: "80+", label: "countries connected" },
  { value: "4.6K+", label: "course enrollments" },
  { value: "59+", label: "community events" },
] as const;

export const podcastSpotlight = {
  id: "podcasts",
  href: "https://www.beamhub.org/c/podcast/",
  source: beamHubLinks.introduction,
  formats: [
    {
      id: "articles",
      label: "Articles",
      headline: "A paper. Another way in.",
      description: "Meet the ideas inside an article through a bite-sized summary. A listening perspective on something worth reading.",
      sleeve: "THE WRITTEN WORD, RECONSIDERED.",
    },
    {
      id: "books",
      label: "Books",
      headline: "A book. A little headspace.",
      description: "Discover a book's ideas in a shorter form. A small listening moment can be the beginning of a much bigger reading journey.",
      sleeve: "BIG IDEAS. A DIFFERENT FORMAT.",
    },
    {
      id: "insights",
      label: "Insights",
      headline: "A thought. Something to carry.",
      description: "Take a fresh perspective with you. BeamHub's podcast space also brings insights into its bite-sized summaries.",
      sleeve: "A FRESH PERSPECTIVE TO TAKE WITH YOU.",
    },
  ],
} as const;

export const ecosystem = [
  {
    id: "knowledge",
    title: "Knowledge, without the silos.",
    label: "KNOWLEDGE BASE GROUPS",
    description:
      "Bring a question. Share a perspective. Find focused discussions that turn individual experience into collective knowledge.",
    href: "https://www.beamhub.org/s/knowledge-base-groups/",
  },
  {
    id: "events",
    title: "A front-row seat to fresh thinking.",
    label: "LIVE EVENTS",
    description:
      "Expert talks, interactive workshops and community Q&As. Make room for the conversations that move you forward.",
    href: "https://www.beamhub.org/c/live-webinars/",
  },
  {
    id: "journal",
    title: "Research is better, read together.",
    label: "JOURNAL CLUB",
    description:
      "Explore publications and guidelines through expert-led discussion. Go beyond the abstract and into the ideas.",
    href: "https://www.beamhub.org/c/journal-club-8c611b/",
  },
  {
    id: "careers",
    title: "Make your next move a meaningful one.",
    label: "JOB BOARD",
    description:
      "Discover professional opportunities, or connect the right talent with your next opening.",
    href: "https://www.beamhub.org/s/job-board/",
  },
] as const;

export const moreSpaces = [
  {
    id: "courses",
    title: "Online courses",
    subtitle: "Structured learning",
    href: beamHubLinks.courses,
  },
  {
    id: "youtube",
    title: "YouTube courses",
    subtitle: "Curated discoveries",
    href: "https://www.beamhub.org/s/youtube-courses/",
  },
  {
    id: "surveys",
    title: "Survey Land",
    subtitle: "Your perspective matters",
    href: "https://www.beamhub.org/s/survey-land/",
  },
  {
    id: "organizers",
    title: "Organizers & instructors",
    subtitle: "Create something together",
    href: "https://www.beamhub.org/s/organizers-and-instructors/",
  },
  {
    id: "discover",
    title: "Discover BeamHub",
    subtitle: "Find your way around",
    href: "https://www.beamhub.org/c/help",
  },
] as const;

export const learnerPaths = [
  {
    id: "physicist",
    label: "Medical physicist",
    title: "From strong foundations to greater precision.",
    description:
      "Explore shielding, advanced radiotherapy and the planning decisions that connect physics with practice.",
    courseIds: ["shielding", "gamper", "eclipse"],
  },
  {
    id: "radiotherapy",
    label: "Radiotherapy professional",
    title: "A new perspective on every plan.",
    description:
      "Bring together treatment planning, image-based anatomy and precision radiotherapy in your next learning chapter.",
    courseIds: ["eclipse", "anatomy", "gamper"],
  },
  {
    id: "engineer",
    label: "Clinical engineer",
    title: "Get to know what makes the beam work.",
    description:
      "Start with linac systems, revisit radiation fundamentals and explore the principles behind shielding design.",
    courseIds: ["linac", "physics", "shielding"],
  },
  {
    id: "student",
    label: "Student / curious mind",
    title: "Every expert starts with a little curiosity.",
    description:
      "Take a first look at radiation physics, build your anatomy knowledge and discover how a linear accelerator works.",
    courseIds: ["physics", "anatomy", "linac"],
  },
] as const satisfies readonly {
  id: string;
  label: string;
  title: string;
  description: string;
  courseIds: readonly CourseId[];
}[];

export type LearnerId = (typeof learnerPaths)[number]["id"];

export function getCourse(id: CourseId): Course {
  const course = courses.find((item) => item.id === id);
  if (!course) {
    throw new Error(`The BeamHub catalogue is missing course "${id}".`);
  }
  return course;
}

export function filterCourses(category: CategoryId, query: string): readonly Course[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return courses.filter((course) => {
    if (category !== "all" && course.category !== category) return false;
    const searchable = [
      course.title,
      course.officialTitle,
      course.summary,
      course.description,
      course.format,
      ...course.focus,
      ...course.facts,
      ...course.keywords,
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => searchable.includes(term));
  });
}

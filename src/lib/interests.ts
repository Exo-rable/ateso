export type InterestCategory = {
  key: string;
  label: string;
  blurb: string;
  items: string[];
};

export const INTEREST_CATEGORIES: InterestCategory[] = [
  {
    key: "agritech",
    label: "Agriculture & Agritech",
    blurb: "Smart farming, drones, soil & crop science.",
    items: [
      "Smart Farming",
      "Precision Agriculture",
      "Drone Technology",
      "Crop Science",
      "Agritech Innovation",
      "Soil Technology",
    ],
  },
  {
    key: "technology",
    label: "Technology",
    blurb: "Code, IoT, AI, electronics, robotics.",
    items: [
      "Python / Coding",
      "Web Development",
      "App Development",
      "IoT Systems",
      "AI & Machine Learning",
      "Electronics & ECE",
      "Robotics",
      "Automation",
      "UI/UX Design",
    ],
  },
  {
    key: "design",
    label: "Design & Prototyping",
    blurb: "CAD, 3D printing, product visualization.",
    items: [
      "CAD Design",
      "Fusion 360",
      "3D Printing",
      "Solid Modelling",
      "Product Visualization",
      "Rapid Prototyping",
    ],
  },
  {
    key: "entrepreneurship",
    label: "Entrepreneurship",
    blurb: "Startups, business models, incubation.",
    items: [
      "Startup Guidance",
      "Business Model Dev",
      "Prototype Dev",
      "Product Design",
      "Incubation Readiness",
    ],
  },
  {
    key: "research",
    label: "Research",
    blurb: "Papers, patents, scientific writing.",
    items: [
      "Research Writing",
      "Patent Awareness",
      "Scientific Writing",
      "Publication Support",
    ],
  },
  {
    key: "media",
    label: "Media & Communication",
    blurb: "Video, photo, content, branding.",
    items: [
      "Video Editing",
      "Photography",
      "Content Creation",
      "Digital Branding",
      "Journalism",
    ],
  },
  {
    key: "professional",
    label: "Professional Development",
    blurb: "Soft skills, exams, public speaking.",
    items: [
      "Public Speaking",
      "LinkedIn Optimization",
      "Resume Building",
      "Interview Prep",
      "Government Exam Prep",
      "Personal Branding",
    ],
  },
];

export const ALL_INTERESTS: string[] = INTEREST_CATEGORIES.flatMap((c) => c.items);

export const PROGRAMMES = [
  "B.Sc. Agriculture (Hons.)",
  "B.Tech Agricultural Engineering",
  "B.Sc. Horticulture",
  "M.Sc. Agriculture",
  "M.Tech",
  "Ph.D.",
  "Other",
] as const;

export const PILLARS = [
  {
    title: "Agriculture",
    icon: "Sprout",
    blurb:
      "Smart farming, precision agriculture, soil & crop science — applied research that meets the field.",
  },
  {
    title: "Technology",
    icon: "Cpu",
    blurb:
      "Code, IoT, AI, robotics and automation built to solve real agri-engineering problems.",
  },
  {
    title: "Entrepreneurship",
    icon: "Rocket",
    blurb:
      "From idea to incubation — business modelling, prototyping and startup readiness.",
  },
  {
    title: "Research",
    icon: "FlaskConical",
    blurb:
      "Paper writing, patent awareness and publication support with faculty mentorship.",
  },
  {
    title: "Skills",
    icon: "Wrench",
    blurb:
      "CAD, Fusion 360, 3D printing, electronics, design — hands-on toolchains that ship.",
  },
  {
    title: "Community",
    icon: "Users",
    blurb:
      "Workshops, hackathons, industrial visits and a member network built to compound.",
  },
] as const;

export const POINT_RULES = [
  { activity: "Registration completion", points: 10 },
  { activity: "Workshop attendance (per session)", points: 20 },
  { activity: "Competition participation", points: 30 },
  { activity: "Competition win — 1st / 2nd / 3rd", points: "100 / 75 / 50" },
  { activity: "Research paper submission", points: 50 },
  { activity: "Patent filing support", points: 75 },
  { activity: "Event volunteering", points: 15 },
  { activity: "Referral (new member joins)", points: 10 },
  { activity: "Profile completion (100%)", points: 15 },
  { activity: "Course / batch completion", points: 40 },
  { activity: "LinkedIn post about ATESO", points: 5 },
] as const;

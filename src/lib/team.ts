export type Person = {
  name: string;
  role: string;
  detail?: string;
  contact?: string;
  uid?: string;
  regNo?: string;
};

export type Domain = {
  key: string;
  label: string;
  blurb: string;
  lead?: Person;
};

export const MENTOR: Person = {
  name: "Dr. Adesh Kumar",
  role: "Mentor",
  detail:
    "Professor and Head of Department, Plant Pathology — School of Agriculture, LPU",
  uid: "UID 19078",
  contact: "+91 79730 27719",
};

export const PRESIDENT: Person = {
  name: "Parth",
  role: "President of ATESO",
  detail: "ATESO 2026",
  regNo: "Reg No. 12508293",
  contact: "+91 93064 91640",
};

export const DOMAINS: Domain[] = [
  {
    key: "tech",
    label: "Tech",
    blurb: "Code, AI/ML, IoT, web & app, automation.",
    lead: {
      name: "Sarthak Bhagat",
      role: "Domain Head — Tech",
      detail: "B.Tech. (CSE — AI & ML)",
      contact: "+91 70178 46710",
    },
  },
  {
    key: "ipr",
    label: "IPR — Intellectual Property Rights",
    blurb:
      "Patents, idea generation, funding assistance, portfolio & resume building.",
  },
  { key: "events", label: "Events", blurb: "Workshops, hackathons, seminars, visits." },
  { key: "media", label: "Media & Communication", blurb: "Content, design, video, branding." },
  { key: "agritech", label: "Agritech", blurb: "Smart farming, drones, soil & crop science." },
  { key: "design", label: "Design & Prototyping", blurb: "CAD, 3D printing, product visualization." },
  { key: "entrepreneurship", label: "Entrepreneurship", blurb: "Startups, business models, incubation." },
  { key: "professional", label: "Professional Development", blurb: "Soft skills, exams, public speaking." },
];

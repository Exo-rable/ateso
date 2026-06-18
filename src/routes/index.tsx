import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sprout,
  Cpu,
  Rocket,
  FlaskConical,
  Wrench,
  Users,
  ArrowRight,
  Trophy,
  Calendar,
  Sparkles,
  Quote,
} from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PILLARS } from "@/lib/interests";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ATESO — Where Agriculture Meets Innovation" },
      {
        name: "description",
        content:
          "ATESO is the student-led agri-tech innovation body at LPU School of Agriculture. Workshops, hackathons, research and startup incubation.",
      },
      { property: "og:title", content: "ATESO — Where Agriculture Meets Innovation" },
      {
        property: "og:description",
        content:
          "Student-driven agri-tech innovation, research and entrepreneurship at LPU.",
      },
    ],
  }),
  component: Home,
});

const ICONS = { Sprout, Cpu, Rocket, FlaskConical, Wrench, Users } as const;

const STATS = [
  { label: "Founding members", value: "120+" },
  { label: "Workshops planned", value: "30+" },
  { label: "Skill domains", value: "35" },
  { label: "Faculty mentors", value: "8" },
];

const TESTIMONIALS = [
  {
    quote:
      "ATESO turned my agriculture degree into something that ships. I prototyped a moisture sensor in the same week I learned Fusion 360.",
    name: "Aanya Sharma",
    role: "B.Sc. Agriculture, Sem 5",
  },
  {
    quote:
      "Faculty mentorship, hackathons, real research — the bridge between agriculture and engineering I'd been looking for.",
    name: "Devansh Mehta",
    role: "B.Tech Agri Engg., Sem 7",
  },
  {
    quote:
      "I came in for the IoT workshops. I'm staying for the startup incubation track.",
    name: "Riya Bansal",
    role: "M.Sc. Agriculture",
  },
];

function Home() {
  return (
    <SiteLayout>
      {/* ---------- HERO ---------- */}
      <section className="relative isolate overflow-hidden bg-hero grain">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:pb-32 lg:pt-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/5 px-3 py-1 font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
              <Sparkles className="h-3 w-3" />
              LPU · School of Agriculture
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] sm:text-6xl md:text-7xl">
              Where{" "}
              <span className="text-gradient-lime">agriculture</span>
              <br /> meets innovation.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              ATESO is the Agro-Technology Entrepreneurial Skill Organization —
              a student-driven innovation body building the next generation of
              agri-tech researchers, builders and founders at Lovely Professional
              University.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 rounded-md bg-gradient-lime px-6 py-3.5 text-sm font-semibold text-lime-foreground shadow-lime-glow transition-transform hover:scale-[1.02]"
              >
                Join ATESO
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-surface"
              >
                Explore what we do
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-mono-brand text-3xl font-semibold tracking-tight text-foreground">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual: layered concentric rings + pillar grid */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 -z-10 mx-auto h-full w-full max-w-md">
              <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime/20" />
              <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime/30 animate-glow-pulse" />
              <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-emerald opacity-40 blur-2xl" />
            </div>
            <div className="grid h-full place-items-center">
              <div className="grid grid-cols-2 gap-3">
                {PILLARS.slice(0, 4).map((p) => {
                  const Icon = ICONS[p.icon as keyof typeof ICONS];
                  return (
                    <div
                      key={p.title}
                      className="rounded-xl border border-border bg-card/80 p-5 shadow-elevated backdrop-blur"
                    >
                      <Icon className="h-6 w-6 text-lime" />
                      <div className="mt-3 font-display text-base font-semibold">
                        {p.title}
                      </div>
                      <div className="mt-1 text-xs leading-snug text-muted-foreground">
                        {p.blurb}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="leaf-divider mx-auto max-w-5xl" />
      </section>

      {/* ---------- PILLARS ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="Six pillars"
          title={<>Built around the work that actually <span className="text-gradient-lime">moves the field forward</span>.</>}
          description="From soil science to AI, from CAD to startup pitches — ATESO is one home for everything an agri-tech student needs to build a career."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => {
            const Icon = ICONS[p.icon as keyof typeof ICONS];
            return (
              <div
                key={p.title}
                className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-lime/40 hover:shadow-lime-glow"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-lime group-hover:bg-lime group-hover:text-lime-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- FEATURED EVENTS PREVIEW ---------- */}
      <section className="relative bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="What's coming"
            title={<>An annual calendar of building, competing, shipping.</>}
            description="Workshops, hackathons, industrial visits and seminars — all tracked in your dashboard with attendance and points."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { date: "Aug 2026", title: "Agri-Hack Origin", cat: "Hackathon" },
              { date: "Sep 2026", title: "Drone Bootcamp", cat: "Workshop" },
              { date: "Oct 2026", title: "Founder Friday #1", cat: "Talk" },
              { date: "Nov 2026", title: "Patent Filing 101", cat: "Seminar" },
            ].map((e) => (
              <div
                key={e.title}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-lime/40"
              >
                <div className="flex items-center justify-between text-[11px] font-mono-brand uppercase tracking-[0.18em]">
                  <span className="text-lime">{e.cat}</span>
                  <span className="text-muted-foreground">{e.date}</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-display text-lg font-semibold">{e.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="Members"
          title="Voices from the founding cohort."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-border bg-card p-7"
            >
              <Quote className="h-6 w-6 text-lime" />
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="font-display text-base font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-lime/30 bg-gradient-emerald p-10 shadow-elevated grain sm:p-14">
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <Trophy className="h-7 w-7 text-lime" />
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                Earn points. Climb the leaderboard. Lead a domain.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80">
                Every workshop, every competition, every paper, every event you
                volunteer at — it all counts. Your activity becomes your badge:
                Seed, Sprout, Sapling, Tree, Forest Leader.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3.5 text-sm font-semibold text-background hover:opacity-90"
              >
                Register now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-md border border-foreground/30 px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-foreground/10"
              >
                Read our story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Target, Compass, GraduationCap, Crown } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { MENTOR, PRESIDENT } from "@/lib/team";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ATESO — Story, Mission & Leadership" },
      {
        name: "description",
        content:
          "ATESO is a student-led innovation body at LPU School of Agriculture. Read our founding story, vision, mission and leadership.",
      },
      { property: "og:title", content: "About ATESO" },
      {
        property: "og:description",
        content:
          "The founding story, vision and leadership behind ATESO at LPU School of Agriculture.",
      },
    ],
  }),
  component: AboutPage,
});

const ROADMAP = [
  { year: "Year 1", title: "Origin", body: "Founding cohort, 6-pillar curriculum, first hackathon and workshop series." },
  { year: "Year 2", title: "Depth", body: "Faculty-mentored research tracks, IPR literacy, first incubated prototypes." },
  { year: "Year 3", title: "Reach", body: "Inter-college competitions, industrial partnerships, public showcase event." },
  { year: "Year 4", title: "Scale", body: "Cross-disciplinary startup studio, agritech publications, alumni network." },
  { year: "Year 5", title: "Institute", body: "ATESO as a recognised institutional pillar — funded labs, sustained pipeline of agri-tech founders." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-hero grain">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <span className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
            About · ATESO 2026
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl">
            A student body for the people who'd rather <span className="text-gradient-lime">build it</span> than wait for it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            ATESO was founded inside the LPU School of Agriculture to close a
            gap we kept running into: brilliant agriculture students with no
            shared place to learn tech, ship prototypes, write research, and
            launch ventures. So we made one.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 sm:px-8 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8">
          <Compass className="h-6 w-6 text-lime" />
          <h2 className="mt-4 font-display text-2xl font-semibold">Vision</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            To make LPU School of Agriculture India's most active hub for
            student-led agri-tech innovation — a place where every student can
            find a domain, a mentor, and a stage.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <Target className="h-6 w-6 text-lime" />
          <h2 className="mt-4 font-display text-2xl font-semibold">Mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Equip every member with hands-on skills, IPR & research literacy and
            entrepreneurial fluency across our domains — and reward sustained
            contribution through a transparent points and badge system.
          </p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHeading
            eyebrow="Roadmap"
            title="A five-year build, in five honest steps."
            description="We're not pretending year 5 happens overnight. Here's the plan."
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-5">
            {ROADMAP.map((r, i) => (
              <li
                key={r.year}
                className="relative rounded-xl border border-border bg-card p-5"
              >
                <span className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
                  {r.year}
                </span>
                <div className="mt-2 font-display text-lg font-semibold">{r.title}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{r.body}</p>
                <span className="absolute -top-3 left-5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-lime font-mono-brand text-[11px] font-bold text-lime-foreground">
                  {i + 1}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionHeading eyebrow="Leadership" title="Mentor & President." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { p: MENTOR, Icon: GraduationCap },
            { p: PRESIDENT, Icon: Crown },
          ].map(({ p, Icon }) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card p-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-emerald text-lime-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <span className="mt-5 inline-block font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
                {p.role}
              </span>
              <h3 className="mt-1 font-display text-xl font-semibold text-foreground">{p.name}</h3>
              {p.detail && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
              )}
              <div className="mt-3 text-xs text-muted-foreground">
                {p.uid && <div>{p.uid}</div>}
                {p.regNo && <div>{p.regNo}</div>}
                {p.contact && <div>{p.contact}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "ATESO Events — Workshops, Hackathons, Seminars" },
      {
        name: "description",
        content:
          "Annual ATESO calendar — agri-hackathons, drone bootcamps, founder talks, research seminars and industrial visits.",
      },
      { property: "og:title", content: "ATESO Events" },
      {
        property: "og:description",
        content: "Workshops, hackathons, seminars and industrial visits across the year.",
      },
    ],
  }),
  component: EventsPage,
});

type Ev = { date: string; title: string; description: string; category: string; location: string; status: "upcoming" | "past"; outcome?: string };

const EVENTS: Ev[] = [
  { date: "Aug 18, 2026", title: "ATESO Origin Launch", description: "Public launch of ATESO and unveiling of the 5-year roadmap.", category: "Launch", location: "LPU Auditorium", status: "upcoming" },
  { date: "Aug 29, 2026", title: "Agri-Hack Origin", description: "48-hour hackathon — solve a real farm problem with code, hardware or both.", category: "Hackathon", location: "Block 32, SOA", status: "upcoming" },
  { date: "Sep 12, 2026", title: "Drone Bootcamp", description: "Hands-on training on agricultural drone operation, mapping, and safety.", category: "Workshop", location: "LPU Field Station", status: "upcoming" },
  { date: "Oct 04, 2026", title: "Founder Friday #1", description: "Fireside chat with a working agri-tech founder.", category: "Talk", location: "Online", status: "upcoming" },
  { date: "Oct 25, 2026", title: "Patent Filing 101", description: "How to identify, document and file a patent from a student project.", category: "Seminar", location: "Block 32, SOA", status: "upcoming" },
  { date: "Nov 15, 2026", title: "Industrial Visit — Mahindra Agri", description: "Plant visit and operations walkthrough.", category: "Visit", location: "Off-campus", status: "upcoming" },
];

const CATS = ["All", "Hackathon", "Workshop", "Talk", "Seminar", "Visit", "Launch"] as const;

function EventsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");

  const list = EVENTS.filter((e) => e.status === tab).filter(
    (e) => cat === "All" || e.category === cat,
  );

  return (
    <SiteLayout>
      <section className="bg-hero grain">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <span className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
            Events
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            The <span className="text-gradient-lime">ATESO calendar</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Workshops, hackathons, seminars, and industrial visits across the
            academic year. Every event earns points toward your badge.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex rounded-md border border-border bg-surface p-1">
            {(["upcoming", "past"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  "rounded-sm px-4 py-1.5 text-xs font-medium capitalize transition-colors " +
                  (tab === t
                    ? "bg-gradient-lime text-lime-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={
                  "rounded-full border px-3.5 py-1 text-xs transition-colors " +
                  (cat === c
                    ? "border-lime bg-lime text-lime-foreground"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {list.length === 0 && (
            <p className="text-sm text-muted-foreground">No events in this view yet.</p>
          )}
          {list.map((e) => (
            <article
              key={e.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-lime/40"
            >
              <div className="flex items-center justify-between text-[11px] font-mono-brand uppercase tracking-[0.18em]">
                <span className="text-lime">{e.category}</span>
                <span className="text-muted-foreground">{e.date}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-lime" />
                  {e.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-lime" />
                  {e.location}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

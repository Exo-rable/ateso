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
          "ATESO annual calendar — agri-hackathons, drone bootcamps, founder talks, research seminars and industrial visits. Dates and venues to be announced.",
      },
      { property: "og:title", content: "ATESO Events" },
      {
        property: "og:description",
        content: "Workshops, hackathons, seminars and industrial visits — dates to be announced.",
      },
      { property: "og:url", content: "https://ateso.lovable.app/events" },
    ],
    links: [{ rel: "canonical", href: "https://ateso.lovable.app/events" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "ATESO Events",
          itemListElement: EVENTS.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Event",
              name: e.title,
              description: e.description,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              organizer: {
                "@type": "Organization",
                name: "ATESO",
                url: "https://ateso.lovable.app",
              },
              location: {
                "@type": "Place",
                name: "LPU School of Agriculture",
                address: "Phagwara, Punjab, India",
              },
            },
          })),
        }),
      },
    ],
  }),
  component: EventsPage,
});

type Ev = { title: string; description: string; category: string };

const EVENTS: Ev[] = [
  { title: "ATESO Origin Launch", description: "Public launch of ATESO and unveiling of the 5-year roadmap.", category: "Launch" },
  { title: "Agri-Hack Origin", description: "48-hour hackathon — solve a real farm problem with code, hardware or both.", category: "Hackathon" },
  { title: "Drone Bootcamp", description: "Hands-on training on agricultural drone operation, mapping, and safety.", category: "Workshop" },
  { title: "Founder Friday #1", description: "Fireside chat with a working agri-tech founder.", category: "Talk" },
  { title: "IPR & Patent Filing 101", description: "How to identify, document and file a patent from a student project.", category: "Seminar" },
  { title: "Industrial Visit", description: "Plant visit and operations walkthrough at a partner agri-tech facility.", category: "Visit" },
];

const CATS = ["All", "Hackathon", "Workshop", "Talk", "Seminar", "Visit", "Launch"] as const;

function EventsPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const list = EVENTS.filter((e) => cat === "All" || e.category === cat);

  return (
    <SiteLayout>
      <section className="bg-hero grain">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <span className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
            Events · ATESO 2026
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl">
            The <span className="text-gradient-lime">ATESO calendar</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Workshops, hackathons, seminars, and industrial visits across the
            year. All dates and venues to be announced — sign in to be notified first.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
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

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {list.map((e) => (
            <article
              key={e.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-lime/40"
            >
              <div className="flex items-center justify-between text-[11px] font-mono-brand uppercase tracking-[0.18em]">
                <span className="text-lime">{e.category}</span>
                <span className="text-muted-foreground">To be announced</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-lime" />
                  Date: To be announced
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-lime" />
                  Location: To be announced
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

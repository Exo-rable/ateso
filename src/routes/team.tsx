import { createFileRoute } from "@tanstack/react-router";
import { Crown, GraduationCap, ShieldCheck, Users } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "ATESO Team — Leadership, Mentors & Working Teams" },
      {
        name: "description",
        content:
          "Meet the leadership, faculty mentors and working teams driving ATESO at LPU School of Agriculture.",
      },
      { property: "og:title", content: "ATESO Team" },
      {
        property: "og:description",
        content: "Leadership, mentors and working teams behind ATESO.",
      },
    ],
  }),
  component: TeamPage,
});

const TIERS = [
  {
    label: "Mentor",
    icon: GraduationCap,
    people: [
      { name: "Dr. P. K. Chhuneja", role: "Head, School of Agriculture", note: "Institutional mentor" },
      { name: "Dr. Adesh Kumar", role: "Faculty Mentor", note: "Research & student development" },
    ],
  },
  {
    label: "President",
    icon: Crown,
    people: [
      { name: "Parth Aneja", role: "Founder & President", note: "ATESO 2026–27" },
    ],
  },
  {
    label: "Core Executive",
    icon: ShieldCheck,
    people: [
      { name: "Vice President", role: "Operations", note: "TBA" },
      { name: "General Secretary", role: "Communications", note: "TBA" },
      { name: "Treasurer", role: "Finance", note: "TBA" },
    ],
  },
  {
    label: "Working Teams",
    icon: Users,
    people: [
      { name: "Tech Team", role: "Code, hardware, IoT", note: "Open positions" },
      { name: "Research Team", role: "Papers, patents, writing", note: "Open positions" },
      { name: "Events Team", role: "Workshops, hackathons", note: "Open positions" },
      { name: "Media Team", role: "Content, design, video", note: "Open positions" },
    ],
  },
];

function TeamPage() {
  return (
    <SiteLayout>
      <section className="bg-hero grain">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <span className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
            Team
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            The people who <span className="text-gradient-lime">make ATESO run</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            ATESO is structured as Mentor → President → Core Executive → Working
            Teams. Every member can earn their way up.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="space-y-14">
          {TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <div key={tier.label}>
                <SectionHeading
                  eyebrow={tier.label}
                  title={
                    <span className="flex items-center gap-3">
                      <Icon className="h-7 w-7 text-lime" />
                      {tier.label}
                    </span>
                  }
                />
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tier.people.map((p) => (
                    <div
                      key={p.name}
                      className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-lime/40"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-emerald font-display text-base font-bold text-foreground">
                        {p.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div className="mt-4 font-display text-lg font-semibold">{p.name}</div>
                      <div className="text-sm text-lime">{p.role}</div>
                      <div className="mt-2 text-xs text-muted-foreground">{p.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}

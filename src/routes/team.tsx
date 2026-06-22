import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, GraduationCap, Users, Phone, IdCard, ArrowRight } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { DOMAINS, MENTOR, PRESIDENT } from "@/lib/team";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "ATESO Team — Mentor, President & Domain Leads" },
      {
        name: "description",
        content:
          "Meet the mentor, president and domain heads of ATESO at LPU School of Agriculture, and apply to join a team.",
      },
      { property: "og:title", content: "ATESO Team" },
      {
        property: "og:description",
        content: "Mentor, president, domain heads and open positions at ATESO.",
      },
    ],
  }),
  component: TeamPage,
});

function PersonCard({
  person,
  icon: Icon,
}: {
  person: typeof MENTOR;
  icon: typeof GraduationCap;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-elevated">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-emerald text-lime-foreground">
        <Icon className="h-7 w-7" />
      </div>
      <span className="mt-5 inline-block font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
        {person.role}
      </span>
      <h3 className="mt-1 font-display text-2xl font-bold text-foreground">{person.name}</h3>
      {person.detail && (
        <p className="mt-3 text-sm leading-relaxed text-foreground/85">{person.detail}</p>
      )}
      <div className="mt-5 space-y-2 text-sm">
        {person.uid && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <IdCard className="h-4 w-4 text-lime" /> {person.uid}
          </div>
        )}
        {person.regNo && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <IdCard className="h-4 w-4 text-lime" /> {person.regNo}
          </div>
        )}
        {person.contact && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 text-lime" /> {person.contact}
          </div>
        )}
      </div>
    </div>
  );
}

function TeamPage() {
  return (
    <SiteLayout>
      <section className="bg-hero grain">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <span className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
            Team · ATESO 2026
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl">
            The people who <span className="text-gradient-lime">make ATESO run</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            A small, focused team — academic mentor, student president, and a
            domain head for each discipline. Every other seat is open: apply below.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading eyebrow="Leadership" title="Mentor & President" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <PersonCard person={MENTOR} icon={GraduationCap} />
          <PersonCard person={PRESIDENT} icon={Crown} />
        </div>
      </section>

      {/* Domain Heads */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <SectionHeading
            eyebrow="Domain Heads"
            title="One lead per discipline."
            description="Tech lead is confirmed. Other domain heads are being selected from applications — apply below."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {DOMAINS.map((d) => (
              <div
                key={d.key}
                className="flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <span className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
                  {d.label}
                </span>
                <p className="mt-2 text-sm text-muted-foreground">{d.blurb}</p>

                {d.lead ? (
                  <div className="mt-5 rounded-xl border border-lime/30 bg-lime/5 p-4">
                    <div className="flex items-center gap-2 text-[11px] font-mono-brand uppercase tracking-[0.2em] text-lime">
                      <Users className="h-3.5 w-3.5" /> Domain Head
                    </div>
                    <div className="mt-2 font-display text-lg font-semibold text-foreground">
                      {d.lead.name}
                    </div>
                    <div className="text-sm text-foreground/80">{d.lead.detail}</div>
                    {d.lead.contact && (
                      <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 text-lime" /> {d.lead.contact}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-5 rounded-xl border border-dashed border-border bg-background/60 p-4 text-sm text-muted-foreground">
                    Domain Head — to be selected.
                  </div>
                )}

                <Link
                  to="/apply"
                  search={{ domain: d.label }}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-lime px-4 py-2.5 text-sm font-semibold text-lime-foreground shadow-lime-glow transition-transform hover:scale-[1.02]"
                >
                  Apply for {d.label.split("—")[0].trim()}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            All applications go into a single consolidated spreadsheet (one sheet
            per domain plus a combined view).{" "}
            <a
              href="/api/public/applications.xlsx"
              className="font-semibold text-lime underline-offset-4 hover:underline"
            >
              Download the live applications spreadsheet →
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

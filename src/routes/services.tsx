import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { INTEREST_CATEGORIES } from "@/lib/interests";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "ATESO Services — Skills, Tracks & Programmes" },
      {
        name: "description",
        content:
          "Browse every ATESO skill track: agritech, technology, design, entrepreneurship, research, media and professional development.",
      },
      { property: "og:title", content: "ATESO Services" },
      {
        property: "og:description",
        content: "All ATESO skill tracks and programmes across six pillars.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [active, setActive] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return INTEREST_CATEGORIES.filter((c) => active === "all" || c.key === active).map((c) => ({
      ...c,
      items: ql ? c.items.filter((i) => i.toLowerCase().includes(ql)) : c.items,
    })).filter((c) => c.items.length > 0);
  }, [active, q]);

  return (
    <SiteLayout>
      <section className="bg-hero grain">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <span className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
            What we do
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            <span className="text-gradient-lime">35+ skill tracks</span> across seven domains.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Every ATESO member picks the domains they want to grow in. We run
            workshops, mentorships, hackathons and research tracks across all
            of these.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterBtn active={active === "all"} onClick={() => setActive("all")}>
              All
            </FilterBtn>
            {INTEREST_CATEGORIES.map((c) => (
              <FilterBtn key={c.key} active={active === c.key} onClick={() => setActive(c.key)}>
                {c.label}
              </FilterBtn>
            ))}
          </div>
          <label className="relative flex items-center md:w-72">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search a skill…"
              className="h-10 w-full rounded-md border border-input bg-surface pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-lime focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </label>
        </div>

        <div className="mt-10 flex flex-col gap-12">
          {filtered.map((c) => (
            <div key={c.key}>
              <SectionHeading eyebrow={c.key} title={c.label} description={c.blurb} />
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {c.items.map((item) => (
                  <div
                    key={item}
                    className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-lime/40"
                  >
                    <div className="font-display text-base font-semibold">{item}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Workshops · mentorship · projects
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No skills match that search.
            </p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function FilterBtn({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors " +
        (active
          ? "border-lime bg-lime text-lime-foreground"
          : "border-border bg-surface text-muted-foreground hover:text-foreground hover:border-lime/40")
      }
    >
      {children}
    </button>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, QrCode, Send } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ATESO — Collaborate, Volunteer, Get in Touch" },
      {
        name: "description",
        content:
          "Reach ATESO at LPU School of Agriculture — collaboration enquiries, volunteer sign-ups, and campus contact info.",
      },
      { property: "og:title", content: "Contact ATESO" },
      {
        property: "og:description",
        content: "Collaborate, volunteer, or get in touch with the ATESO team.",
      },
      { property: "og:url", content: "https://ateso.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://ateso.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [tab, setTab] = useState<"collab" | "volunteer">("collab");

  return (
    <SiteLayout>
      <section className="bg-hero grain">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <span className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
            Contact
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            Let's <span className="text-gradient-lime">build something</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Whether you're a faculty member, industry partner, fellow student
            org, or want to volunteer with us — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-border bg-card p-7 sm:p-9">
          <div className="inline-flex rounded-md border border-border bg-surface p-1">
            <button
              onClick={() => setTab("collab")}
              className={
                "rounded-sm px-4 py-1.5 text-xs font-medium transition-colors " +
                (tab === "collab"
                  ? "bg-gradient-lime text-lime-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              Collaborate
            </button>
            <button
              onClick={() => setTab("volunteer")}
              className={
                "rounded-sm px-4 py-1.5 text-xs font-medium transition-colors " +
                (tab === "volunteer"
                  ? "bg-gradient-lime text-lime-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              Volunteer
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message received — we'll get back to you soon.");
              (e.target as HTMLFormElement).reset();
            }}
            className="mt-6 grid gap-4"
          >
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            {tab === "collab" ? (
              <Field label="Organization" name="org" required />
            ) : (
              <Field label="Programme / Year" name="programme" required />
            )}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                {tab === "collab" ? "What would you like to collaborate on?" : "How would you like to help?"}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded-md border border-input bg-surface px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-lime focus:outline-none focus:ring-2 focus:ring-ring/40"
                placeholder="A short message…"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-lime px-5 py-3 text-sm font-semibold text-lime-foreground shadow-lime-glow hover:scale-[1.01]"
            >
              Send <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <SectionHeading eyebrow="Where to find us" title="On campus, online, on the field." />
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-lime" />
              <div>
                <div className="font-display font-semibold">LPU School of Agriculture</div>
                <div className="text-sm text-muted-foreground">
                  Lovely Professional University, Phagwara, Punjab, India
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-lime" />
              <div>
                <div className="font-display font-semibold">Email</div>
                <a href="mailto:ateso@lpu.in" className="text-sm text-muted-foreground hover:text-lime">
                  ateso@lpu.in
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <QrCode className="h-5 w-5 text-lime" />
              <div className="font-display font-semibold">Scan-to-Join QR</div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Campus posters and event banners will feature a QR linking
              directly to <span className="font-mono-brand text-foreground">/register</span>.
            </p>
            <div className="mt-4 grid aspect-square w-full max-w-[200px] place-items-center rounded-xl border border-dashed border-border bg-surface">
              <QrCode className="h-16 w-16 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}{required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="h-10 w-full rounded-md border border-input bg-surface px-3 text-sm placeholder:text-muted-foreground focus:border-lime focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}

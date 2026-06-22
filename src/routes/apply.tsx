import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";

import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { DOMAINS } from "@/lib/team";
import { PROGRAMMES } from "@/lib/interests";
import { submitApplication } from "@/lib/applications.functions";
import templateAsset from "@/assets/applications-template.xlsx.asset.json";

const searchSchema = z.object({
  domain: z.string().optional(),
});

export const Route = createFileRoute("/apply")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Apply for an ATESO team" },
      { name: "description", content: "Apply to join an ATESO domain team as a lead or member." },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const { domain: preset } = useSearch({ from: "/apply" });
  const submit = useServerFn(submitApplication);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultDomain = useMemo(
    () => DOMAINS.find((d) => d.label === preset)?.label ?? DOMAINS[0].label,
    [preset],
  );

  const [form, setForm] = useState({
    domain: defaultDomain,
    role: "Member" as "Lead" | "Member",
    fullName: "",
    lpuRegNo: "",
    email: "",
    phone: "",
    programme: PROGRAMMES[0] as string,
    semester: 1,
    why: "",
    portfolioUrl: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submit({ data: form });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Application submitted");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Could not submit. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
          <CheckCircle2 className="mx-auto h-14 w-14 text-lime" />
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground">
            Application received
          </h1>
          <p className="mt-3 text-muted-foreground">
            Thanks, {form.fullName}. The {form.domain} domain head will reach out
            on {form.email} once shortlisting begins.
          </p>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="bg-hero grain">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <span className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
            Apply · ATESO 2026
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
            Apply to join a <span className="text-gradient-lime">domain team</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            All applications land in one consolidated spreadsheet (one sheet per
            domain plus a combined view).{" "}
            <a
              href={templateAsset.url}
              className="font-semibold text-lime underline-offset-4 hover:underline"
            >
              Preview the template structure →
            </a>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <form
          onSubmit={onSubmit}
          className="space-y-5 rounded-2xl border border-border bg-card p-7 shadow-elevated"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Domain">
              <select
                value={form.domain}
                onChange={(e) => setForm({ ...form, domain: e.target.value })}
                className="h-11 w-full rounded-md border border-input bg-surface px-3 text-sm"
              >
                {DOMAINS.map((d) => (
                  <option key={d.key} value={d.label}>{d.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Applying as">
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as "Lead" | "Member" })}
                className="h-11 w-full rounded-md border border-input bg-surface px-3 text-sm"
              >
                <option value="Member">Member</option>
                <option value="Lead">Domain Lead</option>
              </select>
            </Field>
            <Field label="Full name">
              <Input value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
            </Field>
            <Field label="LPU Registration No.">
              <Input
                value={form.lpuRegNo}
                onChange={(v) => setForm({ ...form, lpuRegNo: v.replace(/\D/g, "").slice(0, 11) })}
                placeholder="12508293"
              />
            </Field>
            <Field label="Email">
              <Input type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            </Field>
            <Field label="Phone">
              <Input
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v.replace(/\D/g, "").slice(0, 10) })}
                placeholder="10 digit"
              />
            </Field>
            <Field label="Programme">
              <select
                value={form.programme}
                onChange={(e) => setForm({ ...form, programme: e.target.value })}
                className="h-11 w-full rounded-md border border-input bg-surface px-3 text-sm"
              >
                {PROGRAMMES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Semester">
              <select
                value={form.semester}
                onChange={(e) => setForm({ ...form, semester: Number(e.target.value) })}
                className="h-11 w-full rounded-md border border-input bg-surface px-3 text-sm"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Why do you want to join this domain?">
            <textarea
              value={form.why}
              onChange={(e) => setForm({ ...form, why: e.target.value.slice(0, 1500) })}
              rows={4}
              className="w-full rounded-md border border-input bg-surface p-3 text-sm"
            />
          </Field>
          <Field label="Portfolio / Resume URL (optional)">
            <Input
              value={form.portfolioUrl}
              onChange={(v) => setForm({ ...form, portfolioUrl: v })}
              placeholder="https://…"
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-gradient-lime text-sm font-semibold text-lime-foreground shadow-lime-glow hover:scale-[1.01] disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Submit application
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono-brand text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Input({
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
      className="h-11 w-full rounded-md border border-input bg-surface px-3 text-sm"
    />
  );
}

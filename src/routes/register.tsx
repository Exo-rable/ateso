import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  PartyPopper,
  Sparkles,
} from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { INTEREST_CATEGORIES, PROGRAMMES } from "@/lib/interests";
import {
  RegistrationInput,
  submitRegistration,
  type RegistrationInputT,
  type RegistrationResult,
} from "@/lib/registration.functions";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Join ATESO — Member Registration" },
      {
        name: "description",
        content:
          "Become an ATESO member. Pick your skill domains and get assigned to a batch. First-come-first-serve registration.",
      },
      { property: "og:title", content: "Join ATESO" },
      {
        property: "og:description",
        content: "Member registration — pick your interests and join a batch.",
      },
      { property: "og:url", content: "https://ateso.lovable.app/register" },
    ],
    links: [{ rel: "canonical", href: "https://ateso.lovable.app/register" }],
  }),
  component: RegisterPage,
});

const STEPS = ["Personal", "Interests", "Review"] as const;

type Form = {
  fullName: string;
  lpuRegNo: string;
  email: string;
  phone: string;
  programme: string;
  semester: number;
  section: string;
  interestTags: string[];
};

const EMPTY: Form = {
  fullName: "",
  lpuRegNo: "",
  email: "",
  phone: "",
  programme: "",
  semester: 1,
  section: "",
  interestTags: [],
};

function RegisterPage() {
  const navigate = useNavigate();
  const submit = useServerFn(submitRegistration);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [result, setResult] = useState<RegistrationResult | null>(null);

  const mutation = useMutation({
    mutationFn: async (payload: RegistrationInputT) => submit({ data: payload }),
    onSuccess: (res) => {
      setResult(res);
      if (res.ok) {
        toast.success(`You're in, ${res.fullName.split(" ")[0]} — queue position #${res.queuePosition}.`);
      } else {
        toast.error(res.message);
      }
    },
    onError: (e: unknown) => {
      const msg = e instanceof Error ? e.message : "Registration failed";
      toast.error(msg);
    },
  });

  function update<K extends keyof Form>(k: K, v: Form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function toggleInterest(t: string) {
    setForm((f) => ({
      ...f,
      interestTags: f.interestTags.includes(t)
        ? f.interestTags.filter((x) => x !== t)
        : [...f.interestTags, t],
    }));
    setErrors((e) => ({ ...e, interestTags: undefined }));
  }

  function validateStep(s: number): boolean {
    const errs: Partial<Record<keyof Form, string>> = {};
    if (s === 0) {
      if (form.fullName.trim().length < 2) errs.fullName = "Enter your full name";
      if (!/^\d{8,11}$/.test(form.lpuRegNo)) errs.lpuRegNo = "8–11 digit LPU number";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Valid email required";
      if (!/^\d{10}$/.test(form.phone)) errs.phone = "10-digit phone";
      if (!form.programme) errs.programme = "Pick a programme";
      if (form.semester < 1 || form.semester > 10) errs.semester = "Semester 1–10";
    }
    if (s === 1) {
      if (form.interestTags.length === 0) errs.interestTags = "Pick at least one interest";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function onSubmit() {
    const parsed = RegistrationInput.safeParse({
      ...form,
      section: form.section || undefined,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid form");
      return;
    }
    mutation.mutate(parsed.data);
  }

  // Success screen
  if (result?.ok) {
    return (
      <SiteLayout>
        <section className="bg-hero grain">
          <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8 sm:py-32">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-lime shadow-lime-glow">
              <PartyPopper className="h-8 w-8 text-lime-foreground" />
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold sm:text-5xl">
              Welcome to ATESO, {result.fullName.split(" ")[0]}.
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              Your registration is confirmed. We'll email batch and onboarding
              details before the first workshop.
            </p>

            <div className="mx-auto mt-10 grid max-w-md gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5 text-left">
                <div className="font-mono-brand text-[11px] uppercase tracking-[0.2em] text-lime">
                  Queue position
                </div>
                <div className="mt-1 font-display text-3xl font-bold text-foreground">
                  #{result.queuePosition}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 text-left">
                <div className="font-mono-brand text-[11px] uppercase tracking-[0.2em] text-lime">
                  Starting badge
                </div>
                <div className="mt-1 font-display text-3xl font-bold text-foreground">Seed</div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/services"
                className="rounded-md border border-border bg-surface px-5 py-3 text-sm font-semibold hover:bg-card"
              >
                Explore skill tracks
              </Link>
              <Link
                to="/"
                className="rounded-md bg-gradient-lime px-5 py-3 text-sm font-semibold text-lime-foreground shadow-lime-glow"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="bg-hero grain">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <span className="inline-flex items-center gap-2 font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
            <Sparkles className="h-3 w-3" /> Member registration
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Join ATESO. <span className="text-gradient-lime">First come, first serve.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Three quick steps. Your queue position is assigned by the server the
            moment you submit — no cheating, no overrides.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        {/* Stepper */}
        <ol className="mb-8 flex items-center justify-between gap-2">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={label} className="flex flex-1 items-center gap-2">
                <span
                  className={
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono-brand text-xs font-bold transition-colors " +
                    (done
                      ? "bg-gradient-lime text-lime-foreground"
                      : active
                        ? "bg-lime/15 text-lime ring-2 ring-lime"
                        : "bg-secondary text-muted-foreground")
                  }
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={
                    "hidden text-xs font-medium sm:inline " +
                    (active ? "text-foreground" : "text-muted-foreground")
                  }
                >
                  {label}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="ml-2 h-px flex-1 bg-border" />
                )}
              </li>
            );
          })}
        </ol>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-elevated">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.fullName}>
                <input
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  className={inputCls}
                  placeholder="Parth Aneja"
                />
              </Field>
              <Field label="LPU registration number" error={errors.lpuRegNo}>
                <input
                  value={form.lpuRegNo}
                  onChange={(e) => update("lpuRegNo", e.target.value.replace(/\D/g, ""))}
                  className={inputCls}
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="12504001"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  type="email"
                  className={inputCls}
                  placeholder="parth.aneja@lpu.in"
                />
              </Field>
              <Field label="Phone (10 digits)" error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
                  className={inputCls}
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="9876543210"
                />
              </Field>
              <Field label="Programme" error={errors.programme}>
                <select
                  value={form.programme}
                  onChange={(e) => update("programme", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select programme</option>
                  {PROGRAMMES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </Field>
              <Field label="Current semester" error={errors.semester}>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.semester}
                  onChange={(e) => update("semester", Number(e.target.value))}
                  className={inputCls}
                />
              </Field>
              <Field label="Section / Division (optional)">
                <input
                  value={form.section}
                  onChange={(e) => update("section", e.target.value)}
                  className={inputCls}
                  placeholder="K23AG"
                />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-xl font-semibold">Pick your interests</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose at least one. You can change these later from your dashboard.
                </p>
                {errors.interestTags && (
                  <p className="mt-2 text-xs text-destructive">{errors.interestTags}</p>
                )}
                <p className="mt-3 font-mono-brand text-[11px] uppercase tracking-[0.18em] text-lime">
                  Selected · {form.interestTags.length}
                </p>
              </div>

              {INTEREST_CATEGORIES.map((cat) => (
                <div key={cat.key}>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/80">
                    {cat.label}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.items.map((item) => {
                      const on = form.interestTags.includes(item);
                      return (
                        <button
                          type="button"
                          key={item}
                          onClick={() => toggleInterest(item)}
                          className={
                            "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all " +
                            (on
                              ? "border-lime bg-lime text-lime-foreground shadow-lime-glow"
                              : "border-border bg-surface text-muted-foreground hover:border-lime/40 hover:text-foreground")
                          }
                        >
                          {on && <Check className="h-3 w-3" />}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold">Review &amp; submit</h2>

              {result && !result.ok && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                  {result.message}
                </div>
              )}

              <dl className="grid gap-3 rounded-xl border border-border bg-surface p-5 text-sm sm:grid-cols-2">
                <Row label="Full name" value={form.fullName} />
                <Row label="LPU reg no" value={form.lpuRegNo} mono />
                <Row label="Email" value={form.email} />
                <Row label="Phone" value={form.phone} mono />
                <Row label="Programme" value={form.programme} />
                <Row label="Semester" value={String(form.semester)} mono />
                {form.section && <Row label="Section" value={form.section} />}
              </dl>

              <div>
                <div className="font-mono-brand text-[11px] uppercase tracking-[0.2em] text-lime">
                  Interests · {form.interestTags.length}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {form.interestTags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-lime/40 bg-lime/10 px-3 py-1 text-xs text-lime"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-border bg-surface accent-lime"
                  id="consent"
                />
                <span>
                  I confirm the information above is accurate and I consent to
                  ATESO contacting me about activities, batches and events.
                </span>
              </label>
            </div>
          )}

          {/* Footer nav */}
          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <button
              type="button"
              onClick={() => {
                if (step === 0) navigate({ to: "/" });
                else setStep((s) => s - 1);
              }}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> {step === 0 ? "Cancel" : "Back"}
            </button>

            {step < 2 ? (
              <button
                type="button"
                onClick={() => {
                  if (validateStep(step)) setStep((s) => s + 1);
                }}
                className="inline-flex items-center gap-1.5 rounded-md bg-gradient-lime px-5 py-2.5 text-sm font-semibold text-lime-foreground shadow-lime-glow"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={mutation.isPending}
                onClick={onSubmit}
                className="inline-flex items-center gap-2 rounded-md bg-gradient-lime px-5 py-2.5 text-sm font-semibold text-lime-foreground shadow-lime-glow disabled:opacity-60"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Submit registration
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

const inputCls =
  "h-10 w-full rounded-md border border-input bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-lime focus:outline-none focus:ring-2 focus:ring-ring/40";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
      <dd className={"mt-0.5 text-sm text-foreground " + (mono ? "font-mono-brand" : "")}>
        {value}
      </dd>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, KeyRound, Loader2 } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in to ATESO" },
      {
        name: "description",
        content:
          "Sign in to ATESO with Google or an email OTP to register for events, track your queue position, manage your skill domains and earn member badges.",
      },
      { property: "og:title", content: "Sign in to ATESO" },
      {
        property: "og:description",
        content:
          "Sign in with Google or email OTP to register, track events and manage your ATESO membership.",
      },
      { property: "og:url", content: "https://ateso.lovable.app/auth" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://ateso.lovable.app/auth" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        toast.success("Signed in");
        navigate({ to: "/" });
      }
    });
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed. Please try again.");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    setLoading(false);
  }

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true, emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("OTP sent — check your email");
    setStage("otp");
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
    setLoading(false);
    if (error) {
      toast.error("Invalid code. Try again.");
      return;
    }
  }

  return (
    <SiteLayout>
      <section className="bg-hero grain">
        <div className="mx-auto flex max-w-md flex-col items-center px-5 py-20 sm:px-8 sm:py-28">
          <span className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-lime">
            ATESO 2026
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground">Sign in</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Use your LPU/Google account or sign in with an email OTP.
          </p>

          <div className="mt-8 w-full rounded-2xl border border-border bg-card p-7 shadow-elevated">
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-semibold text-foreground hover:bg-secondary disabled:opacity-60"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3 text-[11px] font-mono-brand uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or email <span className="h-px flex-1 bg-border" />
            </div>

            {stage === "email" ? (
              <form onSubmit={sendOtp} className="space-y-3">
                <label className="block">
                  <span className="font-mono-brand text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Email
                  </span>
                  <div className="mt-1 flex items-center gap-2 rounded-md border border-input bg-surface px-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@lpu.in"
                      className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-gradient-lime text-sm font-semibold text-lime-foreground shadow-lime-glow hover:scale-[1.01] disabled:opacity-60"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />} Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={verifyOtp} className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  We sent a 6-digit code to <span className="font-semibold text-foreground">{email}</span>.
                </p>
                <label className="block">
                  <span className="font-mono-brand text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    OTP code
                  </span>
                  <div className="mt-1 flex items-center gap-2 rounded-md border border-input bg-surface px-3">
                    <KeyRound className="h-4 w-4 text-muted-foreground" />
                    <input
                      inputMode="numeric"
                      maxLength={6}
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="123456"
                      className="h-11 w-full bg-transparent text-sm tracking-[0.4em] outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </label>
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-gradient-lime text-sm font-semibold text-lime-foreground shadow-lime-glow disabled:opacity-60"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />} Verify & sign in
                </button>
                <button
                  type="button"
                  onClick={() => { setStage("email"); setOtp(""); }}
                  className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
                >
                  Use a different email
                </button>
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By signing in you agree to the ATESO student code of conduct.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

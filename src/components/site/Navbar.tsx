import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import atesoLogo from "@/assets/ateso-logo.jpeg.asset.json";
import lpuLogo from "@/assets/lpu-logo.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/events", label: "Events" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={atesoLogo.url}
            alt="ATESO"
            className="h-12 w-12 rounded-lg object-cover ring-1 ring-lime/30 transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              ATESO
            </span>
            <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              LPU · Agriculture · 2026
            </span>
          </div>
          <span className="mx-2 hidden h-9 w-px bg-border sm:block" />
          <img
            src={lpuLogo.url}
            alt="Lovely Professional University"
            className="hidden h-9 w-auto object-contain sm:block"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/auth"
            className="inline-flex h-10 items-center rounded-md border border-border bg-surface px-4 text-sm font-semibold text-foreground hover:bg-secondary"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="inline-flex h-10 items-center rounded-md bg-gradient-lime px-4 text-sm font-semibold text-lime-foreground shadow-lime-glow transition-transform hover:scale-[1.02]"
          >
            Join ATESO
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-md border border-border p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-surface px-5 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "text-foreground bg-secondary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-semibold text-foreground"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex h-10 items-center justify-center rounded-md bg-gradient-lime px-4 text-sm font-semibold text-lime-foreground"
            >
              Join ATESO
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

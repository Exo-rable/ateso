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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navbar">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={atesoLogo.url}
            alt="ATESO organization logo"
            className="h-12 w-12 rounded-lg object-cover ring-1 ring-white/20 transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-navbar-foreground">
              ATESO
            </span>
            <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-navbar-foreground/60">
              LPU · Agriculture · 2026
            </span>
          </div>
          <span className="mx-2 hidden h-9 w-px bg-white/20 sm:block" />
          <img
            src={lpuLogo.url}
            alt="Lovely Professional University logo"
            className="hidden h-9 w-auto object-contain sm:block"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm text-navbar-foreground/70 transition-colors hover:bg-white/10 hover:text-navbar-foreground"
              activeProps={{ className: "text-navbar-foreground bg-white/15" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/auth"
            className="inline-flex h-10 items-center rounded-md border border-white/20 bg-white/10 px-4 text-sm font-semibold text-navbar-foreground hover:bg-white/20"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="inline-flex h-10 items-center rounded-md bg-white px-4 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-[1.02] hover:bg-primary-foreground"
          >
            Join ATESO
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-md border border-white/20 p-2 text-navbar-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-navbar px-5 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-navbar-foreground/70 hover:bg-white/10 hover:text-navbar-foreground"
                activeProps={{ className: "text-navbar-foreground bg-white/15" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-10 items-center justify-center rounded-md border border-white/20 bg-white/10 px-4 text-sm font-semibold text-navbar-foreground"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-semibold text-primary"
            >
              Join ATESO
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

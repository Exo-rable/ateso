import { Link } from "@tanstack/react-router";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";

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
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-lime text-lime-foreground shadow-lime-glow transition-transform group-hover:rotate-[-8deg]">
            <Leaf className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight">ATESO</span>
            <span className="font-mono-brand text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              LPU · Agriculture
            </span>
          </div>
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

        <div className="hidden md:block">
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
        <nav className="border-t border-border/50 bg-surface px-5 py-3 md:hidden">
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
              to="/register"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-gradient-lime px-4 text-sm font-semibold text-lime-foreground"
            >
              Join ATESO
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

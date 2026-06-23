import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Instagram, Linkedin } from "lucide-react";

import atesoLogo from "@/assets/ateso-logo.jpeg.asset.json";
import lpuLogo from "@/assets/lpu-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={atesoLogo.url} alt="ATESO organization logo" className="h-11 w-11 rounded-lg object-cover" />
            <span className="font-display text-xl font-bold text-foreground">ATESO</span>
            <span className="mx-1 h-7 w-px bg-border" />
            <img src={lpuLogo.url} alt="Lovely Professional University logo" className="h-8 w-auto object-contain" />
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Agro-Technology Entrepreneurial Skill Organization — a student-driven
            innovation body at the LPU School of Agriculture. Where agriculture
            meets innovation.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-lime" />
            School of Agriculture, Lovely Professional University, Phagwara
          </div>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-lime" />
            ateso@lpu.in
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-lime">About</Link></li>
            <li><Link to="/services" className="hover:text-lime">Services</Link></li>
            <li><Link to="/events" className="hover:text-lime">Events</Link></li>
            <li><Link to="/team" className="hover:text-lime">Team</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            Get involved
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/register" className="hover:text-lime">Join ATESO</Link></li>
            <li><Link to="/apply" className="hover:text-lime">Apply for a team</Link></li>
            <li><Link to="/contact" className="hover:text-lime">Collaborate</Link></li>
          </ul>
          <div className="mt-5 flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-lime"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-lime"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:px-8">
          <span className="font-mono-brand">
            © {new Date().getFullYear()} ATESO · LPU School of Agriculture
          </span>
          <span className="font-mono-brand">President · Parth · ATESO 2026</span>
        </div>
      </div>
    </footer>
  );
}

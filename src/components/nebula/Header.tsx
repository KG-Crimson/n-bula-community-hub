import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const NAV = [
  { label: "INICIO", to: "/" as const },
  { label: "TORNEOS", to: "/torneos" as const },
  { label: "AVENTURA", to: "/aventura" as const },
  { label: "CALENDARIO", to: "/calendario" as const },
  { label: "ANUNCIOS", to: "/anuncios" as const },
  { label: "MULTIMEDIA", to: "/multimedia" as const },
  { label: "SALÓN DE LA FAMA", to: "/salon" as const },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-gold/20 bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl tracking-widest text-gold-gradient">
          <span className="inline-block h-2 w-2 rounded-full bg-pink animate-pulse-gold" />
          NÉBULA
        </Link>
        <nav className="hidden lg:flex items-center gap-1 lg:gap-2">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-gold-bright bg-gold/10 shadow-[0_0_12px_-2px_var(--gold-bright)]" }}
              inactiveProps={{ className: "text-foreground/70 hover:text-gold hover:bg-gold/5" }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] transition-all duration-200 whitespace-nowrap"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href="https://discord.gg/GDPyeD7A3R"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold tracking-widest btn-gold hover:btn-gold-hover whitespace-nowrap"
        >
          UNIRSE AL DISCORD
        </a>
        <button
          className="lg:hidden text-gold p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-gold/20 bg-background/95 px-4 py-4 flex flex-col gap-2">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-gold-bright bg-gold/10" }}
              inactiveProps={{ className: "text-foreground/80" }}
              className="px-3 py-2 rounded-lg text-sm font-semibold tracking-widest transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <a href="https://discord.gg/GDPyeD7A3R" target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2 text-xs font-bold tracking-widest btn-gold text-center">
            UNIRSE AL DISCORD
          </a>
        </div>
      )}
    </header>
  );
}

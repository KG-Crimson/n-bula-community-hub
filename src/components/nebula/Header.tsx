import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "INICIO", href: "#inicio" },
  { label: "TORNEOS", href: "#torneos" },
  { label: "SALÓN DE LA FAMA", href: "#salon" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-gold/20 bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-2 font-display text-xl tracking-widest text-gold-gradient">
          <span className="inline-block h-2 w-2 rounded-full bg-pink animate-pulse-gold" />
          NÉBULA
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-xs font-semibold tracking-[0.2em] text-foreground/80 hover:text-gold transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#"
          className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold tracking-widest btn-gold hover:btn-gold-hover"
        >
          UNIRSE AL DISCORD
        </a>
        <button
          className="md:hidden text-gold"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gold/20 bg-background/95 px-4 py-4 flex flex-col gap-4">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-semibold tracking-widest text-foreground/90">
              {n.label}
            </a>
          ))}
          <a href="#" className="rounded-full px-5 py-2 text-xs font-bold tracking-widest btn-gold text-center">
            UNIRSE AL DISCORD
          </a>
        </div>
      )}
    </header>
  );
}

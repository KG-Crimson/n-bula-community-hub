import logoAsset from "@/assets/nebula-logo-v2.png.asset.json";
import { assetUrl } from "@/lib/asset-url";
import { Bell, Users, Activity } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section id="inicio" className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/40 px-4 py-1.5 text-[10px] font-semibold tracking-[0.3em] text-gold mb-8 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-pink animate-pulse" />
          COMUNIDAD OFICIAL · POKÉMON
        </div>

        <div className="relative animate-float-slow">
          <img
            src={assetUrl(logoAsset.url)}
            alt="Nébula"
            width={1152}
            height={576}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="mx-auto w-full max-w-3xl drop-shadow-[0_0_60px_oklch(0.65_0.24_305/0.55)]"
          />
        </div>

        <p className="mt-6 text-lg md:text-xl text-foreground/85 max-w-2xl mx-auto font-light">
          Bienvenido a <span className="text-gold font-medium">Nébula</span>, el lugar favorito de los fans de Pokémon.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/torneos" className="btn-gold hover:btn-gold-hover rounded-full px-7 py-3 text-xs font-bold tracking-widest">
            VER TORNEOS
          </Link>
          <a href="https://discord.gg/GDPyeD7A3R" target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/40 px-7 py-3 text-xs font-bold tracking-widest text-foreground hover:bg-gold/10 transition-colors">
            UNIRSE AL DISCORD
          </a>
        </div>

        <div className="mt-14 sm:mt-16 mx-auto max-w-3xl card-nebula rounded-2xl p-5 sm:p-6 md:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-[0_0_24px_oklch(0.65_0.24_305/0.6)]">
                <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" fill="currentColor">
                  <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zm0 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              </div>
              <div className="min-w-0 text-left">
                <div className="text-[10px] font-semibold tracking-[0.25em] text-gold">SERVIDOR EN VIVO</div>
                <div className="truncate font-display text-base sm:text-lg md:text-xl text-foreground">Nébula · Pokémon Hub</div>
              </div>
            </div>
            <div className="flex items-center gap-6 sm:gap-6 pl-1 sm:pl-0">
              <Stat icon={<Users size={16} />} value="771" label="MIEMBROS" tone="gold" />
              <Stat icon={<Activity size={16} />} value="148" label="ONLINE" tone="green" />
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-gold/15 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <Badge icon={<PinkBoost />} label="16 Boosts" />
              <Badge icon={<Bell size={14} className="text-gold" />} label="Notificaciones" />
            </div>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground">COMMUNITY SERVER · NIVEL 3</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label, tone }: { icon: React.ReactNode; value: string; label: string; tone: "gold" | "green" }) {
  return (
    <div className="text-left">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className={tone === "green" ? "text-emerald-400" : "text-gold"}>{icon}</span>
        <span className="tracking-[0.2em] text-[10px]">{label}</span>
      </div>
      <div className="font-display text-2xl text-foreground">{value}</div>
    </div>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-background/50 border border-gold/20 px-3 py-1.5 text-xs text-foreground/90">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}

function PinkBoost() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="oklch(0.72 0.24 350)">
      <path d="M12 2l3 6 6 1-4.5 4 1 6L12 16l-5.5 3 1-6L3 9l6-1 3-6z" />
    </svg>
  );
}

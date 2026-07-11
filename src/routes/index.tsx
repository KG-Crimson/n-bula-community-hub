import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/nebula/Hero";
import { Trophy, CalendarDays, Megaphone, Image as ImageIcon, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nébula — Comunidad Discord de Pokémon" },
      { name: "description", content: "Bienvenido a Nébula: torneos, calendario, anuncios, multimedia y Salón de la Fama para fans de Pokémon." },
      { property: "og:title", content: "Nébula — Comunidad Discord de Pokémon" },
      { property: "og:description", content: "Torneos, calendario, anuncios, multimedia y Salón de la Fama para fans de Pokémon." },
    ],
  }),
  component: Index,
});

// Star positions form the silhouette of Cosmog (viewBox 800 x 560):
// two little "ears" on top, round head/body in the middle, tuft at the bottom.
type StarNode = {
  to: "/torneos" | "/calendario" | "/anuncios" | "/multimedia" | "/salon";
  title: string;
  desc: string;
  icon: LucideIcon;
  x: number;
  y: number;
  labelAnchor: "start" | "middle" | "end";
  labelDx: number;
  labelDy: number;
};

const STARS: StarNode[] = [
  { to: "/salon",      title: "SALÓN DE LA FAMA", desc: "Los campeones legendarios.",       icon: Award,       x: 200, y: 90,  labelAnchor: "end",    labelDx: -18, labelDy: 6 },
  { to: "/multimedia", title: "MULTIMEDIA",       desc: "Galería de dibujos y arte.",       icon: ImageIcon,   x: 600, y: 90,  labelAnchor: "start",  labelDx: 18,  labelDy: 6 },
  { to: "/anuncios",   title: "ANUNCIOS",         desc: "Novedades de la comunidad.",       icon: Megaphone,   x: 400, y: 235, labelAnchor: "middle", labelDx: 0,   labelDy: -28 },
  { to: "/torneos",    title: "TORNEOS",          desc: "Bracket, posiciones y eventos.",   icon: Trophy,      x: 250, y: 400, labelAnchor: "end",    labelDx: -18, labelDy: 6 },
  { to: "/calendario", title: "CALENDARIO",       desc: "Jornadas en tiempo real.",         icon: CalendarDays,x: 550, y: 400, labelAnchor: "start",  labelDx: 18,  labelDy: 6 },
];

// Extra outline anchor points (not clickable) that shape Cosmog's silhouette.
const OUTLINE: { x: number; y: number }[] = [
  { x: 310, y: 180 }, // between left ear and head
  { x: 490, y: 180 }, // between right ear and head
  { x: 400, y: 490 }, // bottom tuft
];

// Star index shortcuts
const S = {
  salon:      0,
  multimedia: 1,
  anuncios:   2,
  torneos:    3,
  calendario: 4,
} as const;

// Lines that connect the constellation into Cosmog's outline.
// Each edge references either a STAR index (s) or an OUTLINE index (o).
const EDGES: { a: { k: "s" | "o"; i: number }; b: { k: "s" | "o"; i: number } }[] = [
  { a: { k: "s", i: S.salon },      b: { k: "o", i: 0 } },
  { a: { k: "o", i: 0 },            b: { k: "s", i: S.anuncios } },
  { a: { k: "s", i: S.anuncios },   b: { k: "o", i: 1 } },
  { a: { k: "o", i: 1 },            b: { k: "s", i: S.multimedia } },
  { a: { k: "s", i: S.anuncios },   b: { k: "s", i: S.torneos } },
  { a: { k: "s", i: S.anuncios },   b: { k: "s", i: S.calendario } },
  { a: { k: "s", i: S.torneos },    b: { k: "o", i: 2 } },
  { a: { k: "o", i: 2 },            b: { k: "s", i: S.calendario } },
  { a: { k: "s", i: S.salon },      b: { k: "s", i: S.torneos } },
  { a: { k: "s", i: S.multimedia }, b: { k: "s", i: S.calendario } },
];

// Background sparkle stars (purely decorative)
const SPARKLES = Array.from({ length: 42 }, (_, i) => {
  // deterministic pseudo-random so SSR & client match
  const seed = (i + 1) * 9301 + 49297;
  const rx = ((seed * 233) % 1000) / 1000;
  const ry = ((seed * 787) % 1000) / 1000;
  const rs = ((seed * 131) % 1000) / 1000;
  return {
    x: 40 + rx * 720,
    y: 30 + ry * 500,
    r: 0.6 + rs * 1.6,
    o: 0.25 + rs * 0.5,
  };
});

function pt(ref: { k: "s" | "o"; i: number }) {
  return ref.k === "s" ? STARS[ref.i] : OUTLINE[ref.i];
}

function Index() {
  return (
    <>
      <Hero />
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">EXPLORA</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-purple-gradient">
              LA CONSTELACIÓN NÉBULA
            </h2>
            <p className="text-muted-foreground text-sm mt-3">
              Sigue las estrellas de Cosmog para navegar la comunidad
            </p>
          </div>

          <div className="relative mx-auto card-nebula rounded-3xl bg-background/30 border border-gold/15 p-4 sm:p-6">
            <svg
              viewBox="0 0 800 560"
              className="w-full h-auto"
              role="img"
              aria-label="Constelación con forma de Cosmog"
            >
              <defs>
                <radialGradient id="nebula-bg" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="oklch(0.65 0.24 305)" stopOpacity="0.28" />
                  <stop offset="60%" stopColor="oklch(0.55 0.22 285)" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="oklch(0.2 0.05 280)" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.95 0.18 90)" stopOpacity="1" />
                  <stop offset="60%" stopColor="oklch(0.85 0.20 90)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="oklch(0.85 0.20 90)" stopOpacity="0" />
                </radialGradient>
                <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Nebula haze */}
              <ellipse cx="400" cy="290" rx="360" ry="230" fill="url(#nebula-bg)" />

              {/* Cosmog silhouette — single path so overlaps don't stack alpha */}
              <path
                d="
                  M 200 90
                  L 285 195
                  Q 340 220 400 232
                  Q 460 220 515 195
                  L 600 90
                  L 555 190
                  Q 625 215 655 300
                  Q 665 410 570 475
                  Q 490 510 400 510
                  Q 310 510 230 475
                  Q 135 410 145 300
                  Q 175 215 245 190
                  Z
                "
                fill="oklch(0.65 0.22 300)"
                fillOpacity="0.10"
                stroke="oklch(0.85 0.18 90)"
                strokeOpacity="0.35"
                strokeWidth="1.25"
                strokeDasharray="2 6"
                strokeLinejoin="round"
              />
              {/* Inner shading to hint at Cosmog's cloud volume */}
              <ellipse cx="400" cy="360" rx="180" ry="110" fill="oklch(0.65 0.22 300)" fillOpacity="0.07" />


              {/* Background sparkles */}
              {SPARKLES.map((s, i) => (
                <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="oklch(0.95 0.05 90)" opacity={s.o}>
                  <animate attributeName="opacity" values={`${s.o};${s.o * 0.3};${s.o}`} dur={`${2 + (i % 5) * 0.4}s`} repeatCount="indefinite" />
                </circle>
              ))}

              {/* Constellation lines */}
              {EDGES.map((e, i) => {
                const a = pt(e.a);
                const b = pt(e.b);
                return (
                  <line
                    key={i}
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke="oklch(0.85 0.18 90)"
                    strokeOpacity="0.35"
                    strokeWidth="1.25"
                    strokeDasharray="3 5"
                  />
                );
              })}

              {/* Tiny outline anchor dots */}
              {OUTLINE.map((o, i) => (
                <circle key={i} cx={o.x} cy={o.y} r="2" fill="oklch(0.85 0.18 90)" opacity="0.45" />
              ))}

              {/* Interactive stars */}
              {STARS.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="group outline-none"
                  aria-label={s.title}
                >
                  <g className="cursor-pointer">
                    {/* halo */}
                    <circle cx={s.x} cy={s.y} r="34" fill="url(#star-glow)" className="transition-all duration-300 group-hover:opacity-100 opacity-70" />
                    {/* hit area */}
                    <circle cx={s.x} cy={s.y} r="30" fill="transparent" />
                    {/* star shape */}
                    <g filter="url(#soft-glow)" className="transition-transform duration-300 origin-center group-hover:[transform:scale(1.15)]" style={{ transformBox: "fill-box", transformOrigin: `${s.x}px ${s.y}px` }}>
                      <path
                        d={starPath(s.x, s.y, 12, 5)}
                        fill="oklch(0.95 0.18 92)"
                        stroke="oklch(0.75 0.20 90)"
                        strokeWidth="0.75"
                      />
                    </g>
                    <animate
                      xlinkHref={`#pulse-${s.to.slice(1)}`}
                      attributeName="opacity"
                      values="0.7;1;0.7"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    {/* label */}
                    <text
                      x={s.x + s.labelDx}
                      y={s.y + s.labelDy}
                      textAnchor={s.labelAnchor}
                      className="font-display fill-[oklch(0.95_0.12_90)] transition-all"
                      style={{ fontSize: 14, letterSpacing: "0.18em" }}
                    >
                      {s.title}
                    </text>
                    <text
                      x={s.x + s.labelDx}
                      y={s.y + s.labelDy + 16}
                      textAnchor={s.labelAnchor}
                      className="fill-muted-foreground"
                      style={{ fontSize: 10, opacity: 0.75 }}
                    >
                      {s.desc}
                    </text>
                  </g>
                </Link>
              ))}
            </svg>
          </div>

          {/* Fallback grid on small screens for accessibility */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:hidden gap-2">
            {STARS.map(({ to, title, icon: Icon }) => (
              <Link key={to} to={to} className="card-nebula rounded-xl p-3 flex items-center gap-2 text-xs font-bold tracking-widest text-gold-gradient">
                <Icon className="h-4 w-4 text-gold" />
                {title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Build a 5-point star SVG path around (cx, cy)
function starPath(cx: number, cy: number, rOuter: number, rInner: number) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
  }
  return `M${points.join(" L")} Z`;
}

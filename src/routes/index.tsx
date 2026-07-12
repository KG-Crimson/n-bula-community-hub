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

type OutlinePoint = { x: number; y: number };

type ConstellationConfig = {
  viewBox: string;
  width: number;
  height: number;
  stars: StarNode[];
  outline: OutlinePoint[];
  silhouette: string;
  cloudPuffs: string;
  topGem: string;
  bottomGem: string;
  starOuter: number;
  starInner: number;
  titleSize: number;
  descSize: number;
  labelOffset: number;
};

// Scalloped-circle path (cloud puff / fluffy body) — one closed subpath.
function scallop(cx: number, cy: number, r: number, bumps: number, amp: number, phase = 0) {
  const n = bumps * 2;
  const step = (Math.PI * 2) / n;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < n; i++) {
    const a = i * step - Math.PI / 2 + phase;
    const rr = i % 2 === 0 ? r + amp : r - amp * 0.25;
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  const mid = (a: [number, number], b: [number, number]): [number, number] => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
  ];
  const start = mid(pts[n - 1], pts[0]);
  let d = `M ${start[0].toFixed(2)} ${start[1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const nx = mid(p, pts[(i + 1) % n]);
    d += ` Q ${p[0].toFixed(2)} ${p[1].toFixed(2)} ${nx[0].toFixed(2)} ${nx[1].toFixed(2)}`;
  }
  return d + " Z";
}

const STAR_INDEX = {
  salon: 0,
  multimedia: 1,
  anuncios: 2,
  torneos: 3,
  calendario: 4,
} as const;

const STARS_DESKTOP: StarNode[] = [
  { to: "/salon",      title: "SALÓN DE LA FAMA", desc: "Los campeones legendarios.",       icon: Award,       x: 400, y: 250, labelAnchor: "middle", labelDx: 0,   labelDy: -30 },
  { to: "/multimedia", title: "MULTIMEDIA",       desc: "Galería de dibujos y arte.",       icon: ImageIcon,   x: 620, y: 130, labelAnchor: "start",  labelDx: 22,  labelDy: 6 },
  { to: "/anuncios",   title: "ANUNCIOS",         desc: "Novedades de la comunidad.",       icon: Megaphone,   x: 180, y: 130, labelAnchor: "end",    labelDx: -22, labelDy: 6 },
  { to: "/torneos",    title: "TORNEOS",          desc: "Bracket, posiciones y eventos.",   icon: Trophy,      x: 280, y: 405, labelAnchor: "end",    labelDx: -22, labelDy: 6 },
  { to: "/calendario", title: "CALENDARIO",       desc: "Jornadas en tiempo real.",         icon: CalendarDays,x: 520, y: 405, labelAnchor: "start",  labelDx: 22,  labelDy: 6 },
];

const OUTLINE_DESKTOP: OutlinePoint[] = [
  { x: 300, y: 220 },
  { x: 500, y: 220 },
  { x: 400, y: 500 },
];

const SILHOUETTE_DESKTOP = [
  scallop(180, 165, 110, 7, 14, 0.2),
  scallop(620, 165, 110, 7, 14, -0.2),
  scallop(400, 400, 155, 9, 16, 0),
].join(" ");

const CLOUD_PUFFS_DESKTOP = [
  scallop(180, 165, 110, 7, 14, 0.2),
  scallop(620, 165, 110, 7, 14, -0.2),
].join(" ");

// Mobile layout: taller viewBox so Cosmog stretches vertically and labels don't collide.
const STARS_MOBILE: StarNode[] = [
  { to: "/salon",      title: "SALÓN",   desc: "Campeones legendarios.",           icon: Award,       x: 400, y: 240, labelAnchor: "middle", labelDx: 0,   labelDy: -28 },
  { to: "/multimedia", title: "MULTI",   desc: "Dibujos y arte.",                  icon: ImageIcon,   x: 640, y: 130, labelAnchor: "start",  labelDx: 18,  labelDy: 5 },
  { to: "/anuncios",   title: "ANUNCIOS",desc: "Novedades.",                       icon: Megaphone,   x: 160, y: 130, labelAnchor: "end",    labelDx: -18, labelDy: 5 },
  { to: "/torneos",    title: "TORNEOS", desc: "Bracket y eventos.",               icon: Trophy,      x: 240, y: 510, labelAnchor: "end",    labelDx: -18, labelDy: 5 },
  { to: "/calendario", title: "CALENDARIO", desc: "Jornadas en vivo.",             icon: CalendarDays,x: 560, y: 510, labelAnchor: "start",  labelDx: 18,  labelDy: 5 },
];

const OUTLINE_MOBILE: OutlinePoint[] = [
  { x: 300, y: 210 },
  { x: 500, y: 210 },
  { x: 400, y: 620 },
];

const SILHOUETTE_MOBILE = [
  scallop(160, 155, 105, 7, 14, 0.2),
  scallop(640, 155, 105, 7, 14, -0.2),
  scallop(400, 430, 165, 9, 16, 0),
].join(" ");

const CLOUD_PUFFS_MOBILE = [
  scallop(160, 155, 105, 7, 14, 0.2),
  scallop(640, 155, 105, 7, 14, -0.2),
].join(" ");

const CONFIG_DESKTOP: ConstellationConfig = {
  viewBox: "0 0 800 560",
  width: 800,
  height: 560,
  stars: STARS_DESKTOP,
  outline: OUTLINE_DESKTOP,
  silhouette: SILHOUETTE_DESKTOP,
  cloudPuffs: CLOUD_PUFFS_DESKTOP,
  topGem: "M 400 218 L 414 258 L 400 298 L 386 258 Z",
  bottomGem: "M 400 502 L 414 542 L 400 550 L 386 542 Z",
  starOuter: 12,
  starInner: 5,
  titleSize: 14,
  descSize: 10,
  labelOffset: 16,
};

const CONFIG_MOBILE: ConstellationConfig = {
  viewBox: "0 0 800 720",
  width: 800,
  height: 720,
  stars: STARS_MOBILE,
  outline: OUTLINE_MOBILE,
  silhouette: SILHOUETTE_MOBILE,
  cloudPuffs: CLOUD_PUFFS_MOBILE,
  topGem: "M 400 258 L 414 298 L 400 338 L 386 298 Z",
  bottomGem: "M 400 562 L 414 602 L 400 610 L 386 602 Z",
  starOuter: 15,
  starInner: 6,
  titleSize: 13,
  descSize: 9,
  labelOffset: 14,
};

const EDGES: { a: { k: "s" | "o"; i: number }; b: { k: "s" | "o"; i: number } }[] = [
  { a: { k: "s", i: STAR_INDEX.anuncios },   b: { k: "o", i: 0 } },
  { a: { k: "o", i: 0 },                     b: { k: "s", i: STAR_INDEX.salon } },
  { a: { k: "s", i: STAR_INDEX.salon },      b: { k: "o", i: 1 } },
  { a: { k: "o", i: 1 },                     b: { k: "s", i: STAR_INDEX.multimedia } },
  { a: { k: "s", i: STAR_INDEX.anuncios },   b: { k: "s", i: STAR_INDEX.torneos } },
  { a: { k: "s", i: STAR_INDEX.multimedia }, b: { k: "s", i: STAR_INDEX.calendario } },
  { a: { k: "s", i: STAR_INDEX.torneos },    b: { k: "o", i: 2 } },
  { a: { k: "o", i: 2 },                     b: { k: "s", i: STAR_INDEX.calendario } },
  { a: { k: "s", i: STAR_INDEX.salon },      b: { k: "s", i: STAR_INDEX.torneos } },
  { a: { k: "s", i: STAR_INDEX.salon },      b: { k: "s", i: STAR_INDEX.calendario } },
];

const SPARKLES = Array.from({ length: 42 }, (_, i) => {
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

function pt(config: ConstellationConfig, ref: { k: "s" | "o"; i: number }) {
  return ref.k === "s" ? config.stars[ref.i] : config.outline[ref.i];
}

function Constellation({ config, className }: { config: ConstellationConfig; className?: string }) {
  return (
    <svg
      viewBox={config.viewBox}
      className={`w-full h-auto ${className ?? ""}`}
      role="img"
      aria-label="Constelación con forma de Cosmog"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={`nebula-bg-${config.viewBox.replace(/\s/g, "-")}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="oklch(0.65 0.24 305)" stopOpacity="0.28" />
          <stop offset="60%" stopColor="oklch(0.55 0.22 285)" stopOpacity="0.10" />
          <stop offset="100%" stopColor="oklch(0.2 0.05 280)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`star-glow-${config.viewBox.replace(/\s/g, "-")}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.95 0.18 90)" stopOpacity="1" />
          <stop offset="60%" stopColor="oklch(0.85 0.20 90)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.85 0.20 90)" stopOpacity="0" />
        </radialGradient>
        <filter id={`soft-glow-${config.viewBox.replace(/\s/g, "-")}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx={config.width / 2} cy={config.height / 2 - 10} rx={config.width * 0.45} ry={config.height * 0.42} fill={`url(#nebula-bg-${config.viewBox.replace(/\s/g, "-")})`} />

      <g>
        <path d={config.silhouette} fill="oklch(0.55 0.24 315)" fillOpacity="0.12" fillRule="nonzero" />
        <path d={config.cloudPuffs} fill="oklch(0.60 0.18 240)" fillOpacity="0.10" />
        <path d={config.silhouette} fill="none" stroke="oklch(0.85 0.18 90)" strokeOpacity="0.42" strokeWidth="1.25" strokeDasharray="2 6" strokeLinejoin="round" />
        <path d={config.topGem} fill="oklch(0.85 0.16 90)" fillOpacity="0.55" stroke="oklch(0.90 0.18 92)" strokeOpacity="0.7" strokeWidth="1" />
        <path d={config.bottomGem} fill="oklch(0.85 0.16 90)" fillOpacity="0.55" stroke="oklch(0.90 0.18 92)" strokeOpacity="0.7" strokeWidth="1" />
      </g>

      {SPARKLES.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="oklch(0.95 0.05 90)" opacity={s.o}>
          <animate attributeName="opacity" values={`${s.o};${s.o * 0.3};${s.o}`} dur={`${2 + (i % 5) * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {EDGES.map((e, i) => {
        const a = pt(config, e.a);
        const b = pt(config, e.b);
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

      {config.outline.map((o, i) => (
        <circle key={i} cx={o.x} cy={o.y} r="2" fill="oklch(0.85 0.18 90)" opacity="0.45" />
      ))}

      {config.stars.map((s) => (
        <Link
          key={s.to}
          to={s.to}
          className="group outline-none"
          aria-label={s.title}
        >
          <g className="cursor-pointer">
            <circle cx={s.x} cy={s.y} r="34" fill={`url(#star-glow-${config.viewBox.replace(/\s/g, "-")})`} className="transition-all duration-300 group-hover:opacity-100 opacity-70" />
            <circle cx={s.x} cy={s.y} r="30" fill="transparent" />
            <g filter={`url(#soft-glow-${config.viewBox.replace(/\s/g, "-")})`} className="transition-transform duration-300 origin-center group-hover:[transform:scale(1.15)]" style={{ transformBox: "fill-box", transformOrigin: `${s.x}px ${s.y}px` }}>
              <path
                d={starPath(s.x, s.y, config.starOuter, config.starInner)}
                fill="oklch(0.95 0.18 92)"
                stroke="oklch(0.75 0.20 90)"
                strokeWidth="0.75"
              />
            </g>
            <text
              x={s.x + s.labelDx}
              y={s.y + s.labelDy}
              textAnchor={s.labelAnchor}
              className="font-display fill-[oklch(0.95_0.12_90)] transition-all"
              style={{ fontSize: config.titleSize, letterSpacing: "0.18em" }}
            >
              {s.title}
            </text>
            <text
              x={s.x + s.labelDx}
              y={s.y + s.labelDy + config.labelOffset}
              textAnchor={s.labelAnchor}
              className="fill-muted-foreground"
              style={{ fontSize: config.descSize, opacity: 0.75 }}
            >
              {s.desc}
            </text>
          </g>
        </Link>
      ))}
    </svg>
  );
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

          <div className="relative mx-auto card-nebula rounded-3xl bg-background/30 border border-gold/15 p-2 sm:p-4 md:p-6">
            {/* Desktop constellation */}
            <div className="hidden md:block">
              <Constellation config={CONFIG_DESKTOP} />
            </div>

            {/* Mobile / tablet constellation — taller, roomier layout */}
            <div className="md:hidden">
              <Constellation config={CONFIG_MOBILE} className="min-h-[460px] sm:min-h-[520px]" />
            </div>
          </div>



        </div>
      </section>
    </>
  );
}

function starPath(cx: number, cy: number, rOuter: number, rInner: number) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
  }
  return `M${points.join(" L")} Z`;
}

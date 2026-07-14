import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Lock, CheckCircle2, Swords, Trophy, Zap, MapPin } from "lucide-react";

export const Route = createFileRoute("/aventura")({
  head: () => ({
    meta: [
      { title: "Aventura — Nébula" },
      { name: "description", content: "Roadmap de tramos del torneo actual de Nébula. Sigue el progreso de la aventura, gimnasios, medallas y combates." },
      { property: "og:title", content: "Aventura — Nébula" },
      { property: "og:description", content: "Recorre los tramos, gimnasios y combates del torneo Nébula V5." },
    ],
  }),
  component: AventuraPage,
});

type GymLeader = {
  name: string;
  level: number;
  note?: string;
};

type Tramo = {
  id: number;
  title: string;
  status: "completado" | "en-curso" | "bloqueado";
  gyms: GymLeader[];
  combate: { label: string; level: number };
  rutas: string[];
  isLiga?: boolean;
};

const TRAMOS: Tramo[] = [
  {
    id: 1,
    title: "Primeros pasos",
    status: "completado",
    gyms: [
      { name: "Pegaso", level: 16 },
      { name: "Antón", level: 20 },
    ],
    combate: { label: "Combate 1", level: 21 },
    rutas: [
      "Starter Pueblo Primavera",
      "Huevo Elm",
      "Ruta 29",
      "Ciudad Cerezo",
      "Ruta 46",
      "Ruta 30",
      "Ruta 31",
      "Cueva Oscura",
      "Torre Bellsprout",
      "Ruta 32",
      "Ciudad Malva",
      "Ruinas Alfa",
      "Cueva Unión",
      "Ruta 33",
      "Pozo Slowpoke",
      "Lapras (viernes, Pozo Slowpoke)",
    ],
  },
  {
    id: 2,
    title: "Consolidando el equipo",
    status: "completado",
    gyms: [
      { name: "Blanca", level: 23 },
      { name: "Morti", level: 30 },
      { name: "Anibal", level: 37 },
    ],
    combate: { label: "Combate 2", level: 39 },
    rutas: [
      "Encinar (captura extra por combate en Showdown)",
      "Ruta 34",
      "Ruta 35",
      "Ruta 36",
      "Ruta 37",
      "Ciudad Iris",
      "Torre Quemada",
      "Ruta 38",
      "Ruta 39",
      "Ciudad Olivo",
      "Ruta 40",
      "Ruta 41",
      "Ciudad Orquídea",
      "Shuckle (regalo en Orquídea)",
      "Spearow (regalo al salir de Trigal hacia arriba)",
    ],
  },
  {
    id: 3,
    title: "Mitad del camino",
    status: "completado",
    gyms: [
      { name: "Yasmina", level: 42 },
      { name: "Fredo", level: 42, note: "Nivel real 38, se ajusta a 42 (no menor al anterior)" },
    ],
    combate: { label: "Combate 3", level: 45 },
    rutas: [
      "Ruta 42 (captura extra por combate en Showdown)",
      "Monte Mortero",
      "Ruta 43",
      "Lago Furia + Gyarados Rojo",
      "Zona Safari",
      "Guarida Rocket (baldosas)",
      "Ruta 47",
      "Ruta 48",
      "Cueva Acantilado",
    ],
  },
  {
    id: 4,
    title: "La Liga Pokémon",
    status: "en-curso",
    isLiga: true,
    gyms: [
      { name: "Débora", level: 49 },
      { name: "Mento (Alto Mando)", level: 50 },
      { name: "Koga (Alto Mando)", level: 53 },
      { name: "Bruno (Alto Mando)", level: 55 },
      { name: "Karen (Alto Mando)", level: 57 },
      { name: "Lance (Campeón)", level: 60 },
    ],
    combate: { label: "Combate 4 · Final", level: 100 },
    rutas: [
      "Ruta 44 (captura extra por combate en Showdown)",
      "Ruta 45",
      "Cueva Hielo",
      "Ciudad Endrino",
      "Guarida Dragón",
      "Ruta 27",
      "Ruta 26",
      "Calle Victoria",
      "Islas Remolino",
      "Monte Plateado",
      "Torre Campana + Ho-Oh",
      "Cataratas Tohjo",
    ],
  },
];

const STATUS_STYLES: Record<Tramo["status"], { badge: string; label: string; icon: ReactNode; ring: string }> = {
  "completado": {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    label: "COMPLETADO",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    ring: "border-emerald-500/30",
  },
  "en-curso": {
    badge: "bg-gold/10 text-gold border-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.25)]",
    label: "EN CURSO",
    icon: <Zap className="h-3.5 w-3.5" />,
    ring: "border-gold/50 shadow-[0_0_25px_rgba(212,175,55,0.15)]",
  },
  "bloqueado": {
    badge: "bg-muted/20 text-muted-foreground border-muted-foreground/20",
    label: "BLOQUEADO",
    icon: <Lock className="h-3.5 w-3.5" />,
    ring: "border-gold/10",
  },
};

function AventuraPage() {
  const [expanded, setExpanded] = useState<number | null>(4);

  return (
    <div className="pt-10 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">TORNEO V5 · HEARTGOLD</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-purple-gradient mb-4">
            LA AVENTURA
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto px-4">
            Sigue el roadmap del torneo dividido en tramos semanales. Cada tramo se habilita cuando terminan los combates del anterior.
          </p>
        </div>

        <div className="relative">
          {/* Línea vertical de conexión */}
          <div className="absolute left-4 sm:left-8 top-8 bottom-8 w-px bg-gradient-to-b from-emerald-500/40 via-gold/40 to-gold/5" aria-hidden />

          <div className="space-y-6">
            {TRAMOS.map((tramo) => {
              const style = STATUS_STYLES[tramo.status];
              const isOpen = expanded === tramo.id;
              return (
                <div key={tramo.id} className="relative pl-12 sm:pl-20">
                  {/* Nodo circular */}
                  <div className={`absolute left-0 sm:left-4 top-4 h-8 w-8 rounded-full border-2 bg-background flex items-center justify-center ${style.ring}`}>
                    {tramo.isLiga ? (
                      <Trophy className="h-4 w-4 text-gold" />
                    ) : (
                      <span className="font-display text-sm text-gold">{tramo.id}</span>
                    )}
                  </div>

                  <div
                    className={`card-nebula rounded-2xl bg-background/50 border transition-all ${style.ring}`}
                  >
                    <button
                      onClick={() => setExpanded(isOpen ? null : tramo.id)}
                      className="w-full text-left p-5 sm:p-6 hover:bg-background/30 transition-colors rounded-2xl"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div>
                          <div className="text-[10px] font-bold tracking-[0.3em] text-gold/70 mb-1">
                            TRAMO {tramo.id}
                          </div>
                          <h2 className="font-display text-xl sm:text-2xl text-white">
                            {tramo.title}
                          </h2>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border ${style.badge}`}>
                          {style.icon}
                          {style.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>{tramo.gyms.length} {tramo.isLiga ? "líderes / Alto Mando" : "gimnasios"}</span>
                        <span className="text-gold/40">·</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{tramo.rutas.length} rutas</span>
                        <span className="text-gold/40">·</span>
                        <span className="text-gold">{tramo.combate.label}</span>
                      </div>

                      <div className="mt-3 text-[11px] text-gold/60 tracking-wider">
                        {isOpen ? "▲ Ocultar detalles" : "▼ Ver detalles del tramo"}
                      </div>
                    </button>

                    {isOpen && (
                      <TramoDetails tramo={tramo} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-muted-foreground/70 italic">
          Cada tramo dura aproximadamente una semana y se desbloquea al finalizar los combates del tramo anterior.
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Lock, CheckCircle2, Swords, Trophy, Zap, MapPin, Scroll, Heart, Skull, ShieldAlert, Ban, Pickaxe, Egg, Gem, Gavel } from "lucide-react";

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
  status: "completado" | "en-curso" | "bloqueado";
  gyms: GymLeader[];
  combate: { label: string; level: number };
  rutas: string[];
  isLiga?: boolean;
};

const TRAMOS: Tramo[] = [
  {
    id: 1,
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

function TramoDetails({ tramo }: { tramo: Tramo }) {
  const [tab, setTab] = useState<"lideres" | "rutas">("lideres");

  return (
    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1">
      <div className="flex gap-2 mb-4 border-t border-gold/10 pt-4">
        <button
          onClick={() => setTab("lideres")}
          className={`flex-1 px-3 py-2 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all border ${
            tab === "lideres"
              ? "bg-gold/10 text-gold border-gold/40"
              : "bg-transparent text-muted-foreground border-transparent hover:text-white"
          }`}
        >
          <Swords className="h-3 w-3 inline mr-1.5 -mt-0.5" />
          {tramo.isLiga ? "Líderes / Alto Mando" : "Gimnasios"}
        </button>
        <button
          onClick={() => setTab("rutas")}
          className={`flex-1 px-3 py-2 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all border ${
            tab === "rutas"
              ? "bg-gold/10 text-gold border-gold/40"
              : "bg-transparent text-muted-foreground border-transparent hover:text-white"
          }`}
        >
          <MapPin className="h-3 w-3 inline mr-1.5 -mt-0.5" />
          Rutas ({tramo.rutas.length})
        </button>
      </div>

      {tab === "lideres" && (
        <div className="space-y-2">
          {tramo.gyms.map((gym) => (
            <div
              key={gym.name}
              className="flex items-center justify-between p-3 rounded-lg bg-background/60 border border-gold/5"
            >
              <div>
                <div className="text-sm font-semibold text-white">{gym.name}</div>
                {gym.note && (
                  <div className="text-[11px] text-muted-foreground italic mt-0.5">{gym.note}</div>
                )}
              </div>
              <span className="px-3 py-1 rounded-md bg-gold/10 border border-gold/20 text-gold text-xs font-bold whitespace-nowrap">
                Nv. {gym.level}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/5 border border-purple-500/20 mt-3">
            <div className="flex items-center gap-2">
              <Swords className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-bold text-white">{tramo.combate.label}</span>
            </div>
            <span className="px-3 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold whitespace-nowrap">
              Nv. {tramo.combate.level}
            </span>
          </div>
        </div>
      )}

      {tab === "rutas" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {tramo.rutas.map((ruta) => (
            <div
              key={ruta}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-background/60 border border-gold/5"
            >
              <MapPin className="h-3.5 w-3.5 text-gold/70 shrink-0" />
              <span className="text-xs text-white/90">{ruta}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
                        <h2 className="font-display text-xl sm:text-2xl text-white">
                          TRAMO {tramo.id}
                        </h2>
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

        <div className="mt-16 card-nebula rounded-2xl bg-background/50 border border-gold/10 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gold/10">
            <div className="flex items-center gap-3 mb-3">
              <Scroll className="h-5 w-5 text-gold" />
              <h2 className="font-display text-2xl sm:text-3xl text-white">Normas del torneo</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              El torneo se juega en formato <span className="text-gold font-semibold">Random Nuzlocke</span>. Todos los participantes deben respetar las siguientes reglas.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            <section>
              <h3 className="font-display text-lg text-gold mb-4 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" />
                Reglas generales
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white/90">
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <Heart className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>20 vidas iniciales más la vida 0. Si pierdes todas las vidas, quedas eliminado.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <span className="text-gold font-bold shrink-0">Aa</span>
                  <span>Motes obligatorios para todos los Pokémon.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <Ban className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>No se pueden comprar pociones ni objetos curativos. Solo los que aparezcan en la aventura, y únicamente si el rival los usa primero.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <span className="text-gold font-bold shrink-0">1º</span>
                  <span>Solo se puede capturar el primer Pokémon de cada ruta. Si al entrar el nombre cambia a la anterior, es nueva ruta.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <Skull className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Si un Pokémon se debilita, muere y no se puede volver a usar en la aventura.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <Egg className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Prohibida la crianza de Pokémon.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <Pickaxe className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>No se pueden farmear rocas del mundo con Golpe Roca para conseguir objetos.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <Ban className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>No se pueden farmear objetos de Pokémon salvaje con ataques como Ladrón (sí en combate de entrenador).</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <Gem className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Prohibido el Shiny Hunt. Si sale uno de forma natural, cuenta como captura extra.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <Egg className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>No se puede reclamar ningún huevo del centro Pokémon de Ciudad Malva (primer gimnasio).</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5 md:col-span-2">
                  <Gem className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Los fósiles equivalen a captura extra.</span>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-display text-lg text-gold mb-4 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Sistema de vidas
              </h3>
              <div className="space-y-3 text-sm text-white/90">
                <p>Todos los participantes comienzan con <span className="text-gold font-semibold">20 vidas</span>. Cada vez que un Pokémon muere, se pierde <span className="text-rose-400 font-semibold">1 vida</span>, sin importar la causa.</p>
                <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20">
                  <p className="font-semibold text-white mb-2">¿Cómo se recuperan vidas?</p>
                  <p>Al finalizar cada tramo se revisan las muertes del período. Si murieron <span className="text-gold font-semibold">4 o más Pokémon</span>, se recuperan <span className="text-emerald-400 font-semibold">+2 vidas</span>. Si murieron 3 o menos, no se recupera ninguna vida.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-background/60 border border-gold/5 text-center">
                    <div className="text-rose-400 font-bold">2 muertes</div>
                    <div className="text-xs text-muted-foreground">+0 vidas</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background/60 border border-gold/5 text-center">
                    <div className="text-rose-400 font-bold">3 muertes</div>
                    <div className="text-xs text-muted-foreground">+0 vidas</div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-center">
                    <div className="text-emerald-400 font-bold">4+ muertes</div>
                    <div className="text-xs text-muted-foreground">+2 vidas</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">Las vidas recuperadas se suman únicamente al finalizar el tramo correspondiente, no de manera inmediata. La caja de muertos es obligatoria al finalizar cada tramo.</p>
              </div>
            </section>

            <section>
              <h3 className="font-display text-lg text-gold mb-4 flex items-center gap-2">
                <Swords className="h-4 w-4" />
                Objetos de tienda (Random)
              </h3>
              <p className="text-sm text-white/90 mb-3">Se podrán comprar los objetos que se deseen con estas restricciones:</p>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">•</span>
                  <span><span className="font-semibold text-white">Objetos competitivos:</span> solo uno por tienda (incluye bayas).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">•</span>
                  <span><span className="font-semibold text-white">Master Ball:</span> solo una en toda la aventura.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">•</span>
                  <span><span className="font-semibold text-white">Objetos para atrapar Pokémon</span> (mieles, flautas): no se pueden comprar.</span>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-display text-lg text-gold mb-4 flex items-center gap-2">
                <Gavel className="h-4 w-4" />
                Penalizaciones
              </h3>
              <p className="text-sm text-white/90 mb-3">Quien no cumpla con las reglas establecidas se le aplicarán las siguientes penalizaciones:</p>
              <ul className="space-y-3 text-sm text-white/90">
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <span className="text-gold font-bold shrink-0">1.</span>
                  <span><span className="font-semibold text-white">Infracción leve:</span> solo se te dará el aviso pertinente y se exigirá que no vuelva a pasar. La reincidencia se convierte en moderada.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <span className="text-gold font-bold shrink-0">2.</span>
                  <span><span className="font-semibold text-white">Infracción moderada:</span> se penalizará en el torneo, pudiendo ir desde la reducción de puntos hasta perder el combate por default. La reincidencia se convierte en grave.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-gold/5">
                  <span className="text-gold font-bold shrink-0">3.</span>
                  <span><span className="font-semibold text-white">Infracción grave:</span> se penalizará con expulsión del torneo o shadow ban en el server.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/5 border border-rose-500/20">
                  <span className="text-rose-400 font-bold shrink-0">4.</span>
                  <span><span className="font-semibold text-white">Ban:</span> reincidencia de infracción grave o hacer algo irremediable conllevará la expulsión del server.</span>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-muted-foreground/70 italic">
          Cada tramo dura aproximadamente una semana y se desbloquea al finalizar los combates del tramo anterior.
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { TournamentBracket } from "@/components/nebula/TournamentBracket";
import { Calendar, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/torneos")({
  head: () => ({
    meta: [
      { title: "Torneos — Nébula" },
      { name: "description", content: "Estado del torneo actual, bracket en vivo, posiciones y próximos eventos de la comunidad Nébula." },
      { property: "og:title", content: "Torneos — Nébula" },
      { property: "og:description", content: "Bracket, posiciones y próximos eventos competitivos de Nébula." },
    ],
  }),
  component: TorneosPage,
});

const STANDINGS = [
  { pos: 1, name: "Cynthia_99", pts: 128, w: 14, l: 1 },
  { pos: 2, name: "Leon Ch.", pts: 121, w: 13, l: 2 },
  { pos: 3, name: "N. Harmonia", pts: 108, w: 11, l: 3 },
  { pos: 4, name: "Entrenador A", pts: 96, w: 10, l: 4 },
  { pos: 5, name: "Steven S.", pts: 88, w: 9, l: 5 },
  { pos: 6, name: "Volt Rider", pts: 74, w: 7, l: 6 },
  { pos: 7, name: "Miss Pika", pts: 65, w: 6, l: 7 },
  { pos: 8, name: "Red Shadow", pts: 52, w: 5, l: 8 },
];

const EVENTS = [
  { date: "12 JUL", title: "Copa Solgaleo · Fase de grupos", time: "20:00 CEST", players: 32 },
  { date: "19 JUL", title: "Torneo Draft Lunala", time: "21:00 CEST", players: 16 },
  { date: "26 JUL", title: "VGC Nébula Open", time: "19:30 CEST", players: 64 },
];

function TorneosPage() {
  return (
    <div className="pt-10">
      {/* Estado actual */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">EN CURSO</div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl text-purple-gradient">
              COPA CELESTIAL · JULIO 2026
            </h1>
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Semifinales en juego · próxima ronda: <span className="text-gold">Final este domingo 20:00 CEST</span>
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
            <StatBox label="JUGADORES" value="16" />
            <StatBox label="RONDA" value="SEMI" />
            <StatBox label="PARTIDAS" value="24" />
            <StatBox label="ESTADO" value="EN VIVO" glow />
          </div>
        </div>
      </section>

      <TournamentBracket />

      {/* Tabla de posiciones */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">CLASIFICACIÓN GLOBAL</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-purple-gradient">TABLA DE POSICIONES</h2>
          </div>
          <div className="card-nebula rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[60px_1fr_80px_80px_80px] gap-2 px-4 sm:px-6 py-3 border-b border-gold/20 text-[10px] font-bold tracking-[0.2em] text-gold/80">
              <div>POS</div>
              <div>ENTRENADOR</div>
              <div className="text-right">V</div>
              <div className="text-right">D</div>
              <div className="text-right">PTS</div>
            </div>
            {STANDINGS.map((r) => (
              <div
                key={r.pos}
                className={`grid grid-cols-[60px_1fr_80px_80px_80px] gap-2 px-4 sm:px-6 py-3 border-b border-gold/10 items-center ${
                  r.pos <= 3 ? "bg-gold/5" : ""
                }`}
              >
                <div className={`font-display text-lg ${r.pos === 1 ? "text-gold" : r.pos <= 3 ? "text-gold/80" : "text-foreground/60"}`}>
                  #{r.pos}
                </div>
                <div className="font-semibold text-foreground truncate">{r.name}</div>
                <div className="text-right text-emerald-400 font-medium">{r.w}</div>
                <div className="text-right text-pink font-medium">{r.l}</div>
                <div className="text-right font-display text-lg text-gold">{r.pts}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground text-center">
            Datos de ejemplo · próximamente sincronizado con la hoja de cálculo oficial
          </p>
        </div>
      </section>

      {/* Próximos eventos */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">CALENDARIO</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-purple-gradient">PRÓXIMOS EVENTOS</h2>
          </div>
          <div className="space-y-3">
            {EVENTS.map((e) => (
              <div key={e.title} className="card-nebula rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2 sm:w-24">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span className="font-display text-lg text-gold">{e.date}</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{e.title}</div>
                  <div className="mt-1 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</span>
                    <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {e.players} jugadores</span>
                  </div>
                </div>
                <button className="rounded-full border border-gold/40 px-5 py-2 text-[10px] font-bold tracking-widest text-foreground hover:bg-gold/10 transition-colors">
                  INSCRIBIRSE
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatBox({ label, value, glow }: { label: string; value: string; glow?: boolean }) {
  return (
    <div className={`card-nebula rounded-2xl p-4 text-center ${glow ? "shadow-[0_0_30px_oklch(0.83_0.16_85/0.3)] border-gold/50" : ""}`}>
      <div className="text-[10px] font-bold tracking-[0.2em] text-gold/80 mb-1">{label}</div>
      <div className={`font-display text-2xl ${glow ? "text-gold animate-pulse-gold" : "text-foreground"}`}>{value}</div>
    </div>
  );
}

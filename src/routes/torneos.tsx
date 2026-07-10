import { createFileRoute } from "@tanstack/react-router";
import { TournamentBracket } from "@/components/nebula/TournamentBracket";
import { Calendar, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/torneos")({
  head: () => ({
    meta: [
      { title: "Torneos — Nébula" },
      { name: "description", content: "Estado del torneo actual, posiciones en vivo por grupos y próximos eventos de la comunidad Nébula." },
      { property: "og:title", content: "Torneos — Nébula" },
      { property: "og:description", content: "Posiciones en vivo y próximos eventos competitivos de Nébula." },
    ],
  }),
  component: TorneosPage,
});

const EVENTS = [
  { date: "AGOSTO", title: "Torneo Nébula V6 · Próxima Edición", time: "Por determinar CEST", players: 80 },
];

function TorneosPage() {
  return (
    <div className="pt-10">
      
      {/* Tabla automatizada del torneo actual */}
      <TournamentBracket />

      {/* Próximos eventos de la comunidad */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 pt-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">CALENDARIO</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-purple-gradient">PRÓXIMOS EVENTOS</h2>
          </div>
          <div className="space-y-3">
            {EVENTS.map((e) => (
              <div key={e.title} className="card-nebula rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2 sm:w-32">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span className="font-display text-lg text-gold">{e.date}</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{e.title}</div>
                  <div className="mt-1 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</span>
                    <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {e.players} jugadores max</span>
                  </div>
                </div>
                <button className="rounded-full border border-gold/40 px-5 py-2 text-[10px] font-bold tracking-widest text-foreground bg-gold/5 cursor-default">
                  PRÓXIMAMENTE
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

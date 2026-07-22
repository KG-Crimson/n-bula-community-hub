import { Trophy } from "lucide-react";

/**
 * ============================================================
 *  LLAVES DE PLAY OFF · TORNEO NÉBULA V5
 * ============================================================
 *  Para actualizar los resultados: solo edita los nombres en
 *  las rondas siguientes (octavos, cuartos, semis, final).
 *  Deja "" (string vacío) en los slots aún por definir y
 *  aparecerán como "Por definir".
 *
 *  Estructura de cada llave (izquierda / derecha):
 *    dieciseisavos: 8 emparejamientos  → 16 jugadores
 *    octavos:       4 emparejamientos  →  8 jugadores
 *    cuartos:       2 emparejamientos  →  4 jugadores
 *    semifinal:     1 emparejamiento   →  2 jugadores
 *    finalista:     1 jugador          →  pasa a la GRAN FINAL
 * ============================================================
 */

type Match = { p1: string; p2: string; winner?: string };

type BracketSide = {
  dieciseisavos: Match[];
  octavos: Match[];
  cuartos: Match[];
  semifinal: Match[];
  finalista: string;
};

const LLAVE_IZQUIERDA: BracketSide = {
  dieciseisavos: [
    { p1: "Therobert_03", p2: "SouthSeba" },
    { p1: "Yoni",         p2: "Zihul" },
    { p1: "Elyoru",       p2: "Nico" },
    { p1: "toto",         p2: "Atomic" },
    { p1: "Heartless2202", p2: "Sotogamer" },
    { p1: "Sebax",        p2: "Alexis" },
    { p1: "Escueltel",    p2: "JoseEduby" },
    { p1: "Tezcat",       p2: "Alastor" },
  ],
  octavos: [
    { p1: "", p2: "" },
    { p1: "", p2: "" },
    { p1: "", p2: "" },
    { p1: "", p2: "" },
  ],
  cuartos: [
    { p1: "", p2: "" },
    { p1: "", p2: "" },
  ],
  semifinal: [
    { p1: "", p2: "" },
  ],
  finalista: "",
};

const LLAVE_DERECHA: BracketSide = {
  dieciseisavos: [
    { p1: "Uyitoo",     p2: "Duque" },
    { p1: "Fher-Mrtz",  p2: "Carcrak" },
    { p1: "Just-TKZ",   p2: "Lanfirer" },
    { p1: "Daren",      p2: "Ral" },
    { p1: "Desca",      p2: "Andueza" },
    { p1: "Nikolas",    p2: "Zanenuss" },
    { p1: "Aroyuuki",   p2: "Crimson" },
    { p1: "Josk",       p2: "JoseVGC" },
  ],
  octavos: [
    { p1: "", p2: "" },
    { p1: "", p2: "" },
    { p1: "", p2: "" },
    { p1: "", p2: "" },
  ],
  cuartos: [
    { p1: "", p2: "" },
    { p1: "", p2: "" },
  ],
  semifinal: [
    { p1: "", p2: "" },
  ],
  finalista: "",
};

// GRAN FINAL: se rellena con los finalistas de cada llave.
const CAMPEON: string = "";

// ============================================================

function Slot({ name, align = "left", highlight = false }: { name: string; align?: "left" | "right"; highlight?: boolean }) {
  const empty = !name;
  return (
    <div
      className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium truncate border transition-colors ${
        highlight
          ? "bg-gold/15 text-gold border-gold/40"
          : empty
            ? "bg-background/40 text-muted-foreground/50 border-gold/5 italic"
            : "bg-background/70 text-white border-gold/10"
      } ${align === "right" ? "text-right" : "text-left"}`}
    >
      {name || "Por definir"}
    </div>
  );
}

function MatchCard({ match, align = "left" }: { match: Match; align?: "left" | "right" }) {
  const { p1, p2, winner } = match;
  return (
    <div className="space-y-1">
      <Slot name={p1} align={align} highlight={!!winner && winner === p1} />
      <Slot name={p2} align={align} highlight={!!winner && winner === p2} />
    </div>
  );
}

function RoundColumn({
  title,
  matches,
  align = "left",
  gap = "gap-3",
}: {
  title: string;
  matches: Match[];
  align?: "left" | "right";
  gap?: string;
}) {
  return (
    <div className="flex-1 min-w-[150px]">
      <div className={`text-[10px] font-bold tracking-[0.3em] text-gold/70 mb-3 ${align === "right" ? "text-right" : "text-left"}`}>
        {title}
      </div>
      <div className={`flex flex-col justify-around h-full ${gap}`}>
        {matches.map((m, i) => (
          <MatchCard key={i} match={m} align={align} />
        ))}
      </div>
    </div>
  );
}

function SideBracket({ side, orientation }: { side: BracketSide; orientation: "left" | "right" }) {
  const align = orientation === "left" ? "left" : "right";
  const cols = (
    <>
      <RoundColumn title="16vos" matches={side.dieciseisavos} align={align} gap="gap-2" />
      <RoundColumn title="Octavos" matches={side.octavos} align={align} gap="gap-8" />
      <RoundColumn title="Cuartos" matches={side.cuartos} align={align} gap="gap-24" />
      <RoundColumn title="Semifinal" matches={side.semifinal} align={align} gap="gap-4" />
    </>
  );
  return (
    <div className="flex gap-3 sm:gap-4">
      {orientation === "left" ? cols : <div className="flex gap-3 sm:gap-4 flex-row-reverse w-full">{cols}</div>}
    </div>
  );
}

export function PlayoffBracket() {
  return (
    <div className="mt-12">
      <div className="text-center mb-8">
        <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">PLAY OFF</div>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-purple-gradient">
          LLAVES DE ELIMINACIÓN
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm mt-3 px-4">
          16vos de final · 32 clasificados
        </p>
      </div>

      <div className="card-nebula rounded-3xl p-4 md:p-8 bg-background/40 border border-gold/15 shadow-xl">
        {/* Llaves apiladas: izquierda arriba, final al medio, derecha abajo */}

        <div className="lg:hidden space-y-8">
          <SideMobile title="Llave Izquierda" side={LLAVE_IZQUIERDA} />
          <div className="flex flex-col items-center gap-2 py-4 border-y border-gold/10">
            <Trophy className="w-7 h-7 text-gold" />
            <div className="text-[10px] font-bold tracking-[0.4em] text-gold/80">GRAN FINAL</div>
            <div className="w-full max-w-sm space-y-2">
              <Slot name={LLAVE_IZQUIERDA.finalista} highlight={!!CAMPEON && CAMPEON === LLAVE_IZQUIERDA.finalista} />
              <div className="text-center text-[10px] text-gold/60 font-bold">VS</div>
              <Slot name={LLAVE_DERECHA.finalista} highlight={!!CAMPEON && CAMPEON === LLAVE_DERECHA.finalista} />
            </div>
            <div className="mt-2 w-full max-w-sm text-center">
              <div className="text-[10px] font-bold tracking-[0.3em] text-gold/70 mb-2">CAMPEÓN</div>
              <div className={`px-3 py-2 rounded-md text-sm font-bold border ${
                CAMPEON
                  ? "bg-gold/20 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  : "bg-background/40 text-muted-foreground/50 border-gold/10 italic"
              }`}>
                {CAMPEON || "Por definir"}
              </div>
            </div>
          </div>
          <SideMobile title="Llave Derecha" side={LLAVE_DERECHA} />
        </div>

        <p className="text-center text-[11px] text-muted-foreground/60 italic mt-6 border-t border-gold/10 pt-4">
          Los nombres de las rondas siguientes se irán completando conforme avancen los combates.
        </p>
      </div>
    </div>
  );
}

function SideMobile({ title, side }: { title: string; side: BracketSide }) {
  const rounds: { label: string; matches: Match[] }[] = [
    { label: "16vos de final", matches: side.dieciseisavos },
    { label: "Octavos de final", matches: side.octavos },
    { label: "Cuartos de final", matches: side.cuartos },
    { label: "Semifinal", matches: side.semifinal },
  ];
  return (
    <div>
      <div className="text-center text-[10px] font-bold tracking-[0.4em] text-gold/80 mb-4">
        {title.toUpperCase()}
      </div>
      <div className="space-y-4">
        {rounds.map((r) => (
          <div key={r.label}>
            <div className="text-[10px] font-bold tracking-[0.3em] text-gold/70 mb-2">{r.label.toUpperCase()}</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {r.matches.map((m, i) => (
                <div key={i} className="rounded-lg border border-gold/10 bg-background/60 p-2 space-y-1">
                  <Slot name={m.p1} highlight={!!m.winner && m.winner === m.p1} />
                  <div className="text-center text-[10px] text-gold/50 font-bold">VS</div>
                  <Slot name={m.p2} highlight={!!m.winner && m.winner === m.p2} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

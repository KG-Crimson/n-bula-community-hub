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
    { p1: "Yoni", p2: "Zihul" },
    { p1: "Elyoru", p2: "Nico" },
    { p1: "toto", p2: "Atomic" },
    { p1: "Heartless2202", p2: "Sotogamer" },
    { p1: "Sebax", p2: "Alexis" },
    { p1: "Escueltel", p2: "JoseEduby" },
    { p1: "Tezcat", p2: "Alastor" },
  ],
  octavos: [
    { p1: "SouthSeba", p2: "" },
    { p1: "", p2: "" },
    { p1: "", p2: "" },
    { p1: "", p2: "" },
  ],
  cuartos: [
    { p1: "", p2: "" },
    { p1: "", p2: "" },
  ],
  semifinal: [{ p1: "", p2: "" }],
  finalista: "",
};

const LLAVE_DERECHA: BracketSide = {
  dieciseisavos: [
    { p1: "Uyitoo", p2: "Duque" },
    { p1: "Fher-Mrtz", p2: "Carcrak" },
    { p1: "Just-TKZ", p2: "Lanfirer" },
    { p1: "Daren", p2: "Ral" },
    { p1: "Desca", p2: "Andueza" },
    { p1: "Nikolas", p2: "Zanenuss" },
    { p1: "Aroyuuki", p2: "Crimson" },
    { p1: "Josk", p2: "JoseVGC" },
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
  semifinal: [{ p1: "", p2: "" }],
  finalista: "",
};

// GRAN FINAL: se rellena con los finalistas de cada llave.
const CAMPEON: string = "";

// ============================================================

function Slot({ name, highlight = false, compact = false }: { name: string; highlight?: boolean; compact?: boolean }) {
  const empty = !name;
  return (
    <div
      className={`${compact ? "px-2 py-1 text-[11px] sm:text-xs" : "px-3 py-2 text-xs sm:text-sm"} rounded-md font-medium truncate border transition-colors ${
        highlight
          ? "bg-gold/15 text-gold border-gold/40"
          : empty
            ? "bg-background/40 text-muted-foreground/50 border-gold/5 italic"
            : "bg-background/70 text-white border-gold/10"
      }`}
      title={name || undefined}
    >
      {name || "—"}
    </div>
  );
}

function BracketMatch({ m, showConnector }: { m: Match; showConnector?: boolean }) {
  return (
    <div className="relative flex flex-col justify-center">
      <div className="rounded-md border border-gold/15 bg-background/60 p-1 space-y-1 shadow-sm">
        <Slot name={m.p1} highlight={!!m.winner && m.winner === m.p1} compact />
        <Slot name={m.p2} highlight={!!m.winner && m.winner === m.p2} compact />
      </div>
      {showConnector && <div className="absolute left-full top-1/2 -translate-y-1/2 w-2 sm:w-3 h-px bg-gold/25" />}
    </div>
  );
}

function BracketColumn({ label, matches, isLast }: { label: string; matches: Match[]; isLast?: boolean }) {
  return (
    <div className="flex flex-col shrink-0 w-[110px] sm:w-[140px]">
      <div className="text-[9px] font-bold tracking-[0.25em] text-gold/70 mb-3 text-center uppercase">{label}</div>
      <div className="flex flex-col justify-around flex-1 gap-1">
        {matches.map((m, i) => (
          <BracketMatch key={i} m={m} showConnector={!isLast} />
        ))}
      </div>
    </div>
  );
}

function BracketTree({ title, side }: { title: string; side: BracketSide }) {
  const finalistMatch: Match = { p1: side.finalista, p2: "" };
  return (
    <div>
      <div className="text-center text-[10px] font-bold tracking-[0.4em] text-gold/80 mb-4">{title.toUpperCase()}</div>
      <div className="overflow-x-auto -mx-2 px-2 pb-2">
        <div className="flex gap-2 sm:gap-3 min-w-[620px] h-[520px] sm:h-[600px]">
          <BracketColumn label="16vos" matches={side.dieciseisavos} />
          <BracketColumn label="Octavos" matches={side.octavos} />
          <BracketColumn label="Cuartos" matches={side.cuartos} />
          <BracketColumn label="Semifinal" matches={side.semifinal} />
          <BracketColumn label="Finalista" matches={[finalistMatch]} isLast />
        </div>
      </div>
    </div>
  );
}

export function PlayoffBracket() {
  return (
    <div className="mt-12">
      <div className="text-center mb-8">
        <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">PLAY OFF</div>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-purple-gradient">LLAVES DE ELIMINACIÓN</h3>
        <p className="text-muted-foreground text-xs sm:text-sm mt-3 px-4">16vos de final · 32 clasificados</p>
      </div>

      <div className="card-nebula rounded-3xl p-4 md:p-8 bg-background/40 border border-gold/15 shadow-xl">
        <div className="space-y-10">
          <BracketTree title="Llave Izquierda" side={LLAVE_IZQUIERDA} />

          <div className="flex flex-col items-center gap-2 py-6 border-y border-gold/10">
            <Trophy className="w-7 h-7 text-gold" />
            <div className="text-[10px] font-bold tracking-[0.4em] text-gold/80">GRAN FINAL</div>
            <div className="w-full max-w-sm space-y-2">
              <Slot name={LLAVE_IZQUIERDA.finalista} highlight={!!CAMPEON && CAMPEON === LLAVE_IZQUIERDA.finalista} />
              <div className="text-center text-[10px] text-gold/60 font-bold">VS</div>
              <Slot name={LLAVE_DERECHA.finalista} highlight={!!CAMPEON && CAMPEON === LLAVE_DERECHA.finalista} />
            </div>
            <div className="mt-2 w-full max-w-sm text-center">
              <div className="text-[10px] font-bold tracking-[0.3em] text-gold/70 mb-2">CAMPEÓN</div>
              <div
                className={`px-3 py-2 rounded-md text-sm font-bold border ${
                  CAMPEON
                    ? "bg-gold/20 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    : "bg-background/40 text-muted-foreground/50 border-gold/10 italic"
                }`}
              >
                {CAMPEON || "Por definir"}
              </div>
            </div>
          </div>

          <BracketTree title="Llave Derecha" side={LLAVE_DERECHA} />
        </div>

        <p className="text-center text-[11px] text-muted-foreground/60 italic mt-6 border-t border-gold/10 pt-4">
          Los nombres de las rondas siguientes se irán completando conforme avancen los combates.
        </p>
      </div>
    </div>
  );
}

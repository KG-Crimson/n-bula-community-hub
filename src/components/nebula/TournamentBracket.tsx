import { Trophy, Medal } from "lucide-react";

type Match = { a: string; b: string; winner?: "a" | "b" };

const R1: Match[] = [
  { a: "Entrenador A", b: "Entrenador B", winner: "a" },
  { a: "Red Shadow", b: "Miss Pika", winner: "b" },
  { a: "Ash K.", b: "Cynthia_99", winner: "b" },
  { a: "Volt Rider", b: "Umbreon", winner: "a" },
  { a: "Steven S.", b: "Team Rocket", winner: "a" },
  { a: "Iris Q.", b: "N. Harmonia", winner: "b" },
  { a: "Lance", b: "Blue Oak", winner: "a" },
  { a: "Leon Ch.", b: "Wallace", winner: "a" },
];

const QF: Match[] = [
  { a: "Entrenador A", b: "Miss Pika", winner: "a" },
  { a: "Cynthia_99", b: "Volt Rider", winner: "a" },
  { a: "Steven S.", b: "N. Harmonia", winner: "b" },
  { a: "Lance", b: "Leon Ch.", winner: "b" },
];

const SF: Match[] = [
  { a: "Entrenador A", b: "Cynthia_99", winner: "b" },
  { a: "N. Harmonia", b: "Leon Ch.", winner: "b" },
];

const FINAL: Match = { a: "Cynthia_99", b: "Leon Ch.", winner: "b" };

export function TournamentBracket() {
  return (
    <section id="torneos" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">COMPETICIÓN</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-purple-gradient mb-4">
            GESTIÓN DE TORNEOS
          </h2>
          <p className="text-muted-foreground text-sm md:text-base px-4">
            Largo torneo <span className="text-gold">·</span> 16 jugadores o 32 jugadores
          </p>
        </div>

        {/* DESKTOP BRACKET (lg+) */}
        <div className="hidden lg:block card-nebula rounded-3xl p-4 md:p-8">
          <div className="grid grid-cols-[1fr_1fr_1fr_1.2fr_1fr_1fr_1fr] gap-3 items-stretch">
            <Round title="Ronda 1" matches={R1.slice(0, 4)} align="left" />
            <Round title="Cuartos" matches={QF.slice(0, 2)} align="left" />
            <Round title="Semifinal" matches={[SF[0]]} align="left" />
            <FinalCard />
            <Round title="Semifinal" matches={[SF[1]]} align="right" />
            <Round title="Cuartos" matches={QF.slice(2)} align="right" />
            <Round title="Ronda 1" matches={R1.slice(4)} align="right" />
          </div>
        </div>

        {/* MOBILE / TABLET BRACKET (<lg) */}
        <div className="lg:hidden space-y-6">
          {/* Final on top */}
          <div className="card-nebula rounded-2xl p-5 sm:p-6">
            <FinalCard />
          </div>

          <BracketRow title="Semifinales" matches={SF} />
          <BracketRow title="Cuartos de final" matches={QF} />
          <BracketRow title="Ronda 1" matches={R1} />
        </div>

        <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="btn-gold hover:btn-gold-hover rounded-full px-6 sm:px-7 py-3 text-xs font-bold tracking-widest"
          >
            VER PRÓXIMO TORNEO
          </a>
          <a
            href="#"
            className="rounded-full border border-gold/40 px-6 sm:px-7 py-3 text-xs font-bold tracking-widest text-foreground hover:bg-gold/10 transition-colors"
          >
            INSCRIPCIÓN
          </a>
        </div>
      </div>
    </section>
  );
}

function FinalCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-[10px] font-bold tracking-[0.3em] text-gold">FINAL</div>
      <div className="relative w-full max-w-sm mx-auto">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
          <div className="h-12 w-12 rounded-full grid place-items-center btn-gold animate-pulse-gold">
            <Trophy className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-8 rounded-xl border-2 border-gold bg-gradient-to-b from-background/70 to-primary/20 p-4 shadow-[0_0_40px_oklch(0.83_0.16_85/0.4)]">
          <MatchRow name={FINAL.a} winner={FINAL.winner === "a"} big />
          <div className="h-px bg-gold/40 my-2" />
          <MatchRow name={FINAL.b} winner={FINAL.winner === "b"} big />
        </div>
        {FINAL.winner && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 border border-gold/40 px-4 py-2">
              <Medal className="h-4 w-4 text-gold" />
              <span className="text-xs font-bold tracking-widest text-gold">
                {FINAL.winner === "a" ? FINAL.a : FINAL.b}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BracketRow({ title, matches }: { title: string; matches: Match[] }) {
  return (
    <div className="card-nebula rounded-2xl p-4 sm:p-6">
      <div className="text-[10px] font-bold tracking-[0.3em] text-gold/90 mb-4">
        {title.toUpperCase()}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {matches.map((m, i) => (
          <MatchCard key={i} match={m} />
        ))}
      </div>
    </div>
  );
}

function Round({ title, matches, align }: { title: string; matches: Match[]; align: "left" | "right" }) {
  return (
    <div className="flex flex-col justify-around gap-3">
      <div className={`text-[10px] font-bold tracking-[0.3em] text-gold/80 ${align === "right" ? "text-right" : ""}`}>
        {title.toUpperCase()}
      </div>
      {matches.map((m, i) => (
        <MatchCard key={i} match={m} />
      ))}
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  return (
    <div className="rounded-lg border border-gold/25 bg-background/60 p-2.5 shadow-[0_0_20px_oklch(0.65_0.24_305/0.15)]">
      <MatchRow name={match.a} winner={match.winner === "a"} />
      <div className="h-px bg-gold/15 my-1.5" />
      <MatchRow name={match.b} winner={match.winner === "b"} />
    </div>
  );
}

function MatchRow({ name, winner, big }: { name: string; winner?: boolean; big?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span
        className={`truncate ${big ? "text-base md:text-lg font-display" : "text-xs"} ${
          winner ? "text-gold font-semibold" : "text-foreground/60"
        }`}
      >
        {name}
      </span>
      {winner && (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_10px_oklch(0.83_0.16_85)]" />
      )}
    </div>
  );
}

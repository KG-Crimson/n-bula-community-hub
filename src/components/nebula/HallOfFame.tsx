import solgaleo from "@/assets/const-solgaleo.png";
import lunala from "@/assets/const-lunala.png";
import { Crown } from "lucide-react";

const POKE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

type Champion = {
  handle: string;
  avatarSeed: string;
  tournament: string;
  date: string;
  team: { id: number; name: string }[];
};

const CHAMPS: Champion[] = [
  {
    handle: "@Tezcat",
    avatarSeed: "tezcat",
    tournament: "Copa Nebula V1 · Pokémon Negro",
    date: "16 personas",
    team: [],
  },
  {
    handle: "@Tezcat",
    avatarSeed: "tezcat2",
    tournament: "Copa Nebula V2 · Pokémon Platino",
    date: "40 personas",
    team: [],
  },
  {
    handle: "@Tezcat",
    avatarSeed: "tezcat3",
    tournament: "Copa Nebula V3 · Pokémon Ultra Sol",
    date: "60 personas",
    team: [
      { id: 778, name: "Mimikyu" },
      { id: 289, name: "Slaking" },
      { id: 567, name: "Archeops" },
      { id: 282, name: "Mega Gardevoir" },
      { id: 639, name: "Terrakion" },
      { id: 260, name: "Swampert" },
    ],
  },
  {
    handle: "@No fue Tezcat",
    avatarSeed: "otro",
    tournament: "Copa Nebula V4 · Pokémon X",
    date: "80 personas",
    team: [],
  },
  {
    handle: "En curso",
    avatarSeed: "current",
    tournament: "Copa Nebula V5 · Pokémon HeartGold",
    date: "80 personas",
    team: [],
  },
];

export function HallOfFame() {
  return (
    <section id="salon" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Constellation decorations - responsive scale/position so they never overlap content */}
      <img
        src={solgaleo}
        alt=""
        aria-hidden
        loading="lazy"
        width={512}
        height={512}
        className="pointer-events-none absolute -left-12 sm:left-0 top-20 sm:top-24 md:top-32 lg:top-40 w-40 sm:w-48 md:w-64 lg:w-72 opacity-15 sm:opacity-20 lg:opacity-25 animate-float-slow z-0"
      />
      <img
        src={lunala}
        alt=""
        aria-hidden
        loading="lazy"
        width={512}
        height={512}
        className="pointer-events-none absolute -right-12 sm:right-0 top-32 sm:top-40 md:top-56 lg:top-72 w-44 sm:w-52 md:w-72 lg:w-80 opacity-15 sm:opacity-20 lg:opacity-25 animate-float-slow z-0"
        style={{ animationDelay: "2s" }}
      />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.4em] text-gold mb-3">
            <Crown className="h-3.5 w-3.5" /> LEGADO
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-gold-gradient mb-4">
            SALÓN DE LA FAMA
          </h2>
          <p className="text-muted-foreground text-sm md:text-base px-4">
            Conoce a nuestros campeones legendarios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {CHAMPS.map((c) => (
            <ChampionCard key={c.tournament} champ={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChampionCard({ champ }: { champ: Champion }) {
  return (
    <article className="group card-nebula rounded-2xl p-4 sm:p-6 relative overflow-hidden transition-transform hover:-translate-y-1">
      <div className="absolute inset-0 rounded-2xl border border-gold/40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />

      <header className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:gap-4 mb-5">
        <div className="relative shrink-0">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full btn-gold p-[2px]">
            <div className="h-full w-full rounded-full bg-background grid place-items-center overflow-hidden">
              <img
                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${champ.avatarSeed}&backgroundColor=6b21a8,7c3aed,9333ea`}
                alt=""
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-pink grid place-items-center shadow-[0_0_12px_oklch(0.72_0.24_350/0.8)]">
            <Crown className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-background" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="font-display text-lg sm:text-xl text-foreground truncate">{champ.handle}</div>
          <div className="text-xs text-muted-foreground truncate">
            {champ.tournament} <span className="text-gold">·</span> {champ.date}
          </div>
        </div>
      </header>

      <div className="relative">
        {champ.team.length > 0 ? (
          <>
            <div className="text-[10px] font-bold tracking-[0.3em] text-gold/80 mb-3">EQUIPO CAMPEÓN</div>
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
              {champ.team.map((p) => (
                <div
                  key={p.id}
                  title={p.name}
                  className="aspect-square rounded-lg border border-gold/25 bg-background/60 p-1 hover:border-gold hover:shadow-[0_0_16px_oklch(0.83_0.16_85/0.5)] transition-all"
                >
                  <img
                    src={`${POKE}/${p.id}.png`}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-contain drop-shadow-[0_2px_6px_oklch(0.65_0.24_305/0.6)]"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-[72px] sm:h-[84px]" aria-hidden />
        )}
      </div>
    </article>
  );
}

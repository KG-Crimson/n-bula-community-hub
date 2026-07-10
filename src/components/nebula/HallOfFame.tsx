import { useState } from "react";
import solgaleo from "@/assets/const-solgaleo.png";
import lunala from "@/assets/const-lunala.png";
import tezcatWinner from "@/assets/tezcat-winner.png.asset.json";
import copaV2 from "@/assets/copa-nebula-v2.jpeg.asset.json";
import { Crown, ChevronDown, Users, Gamepad2, Trophy, Sparkles } from "lucide-react";

const PMD_PORTRAIT = "https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait";

type Champion = {
  volume: string;
  handle: string;
  avatarSeed: string;
  avatarSrc?: string;
  logoSrc?: string;
  game: string;
  players: string;
  status?: "completed" | "ongoing";
  team: { id: number; name: string }[];
};

const CHAMPS: Champion[] = [
  {
    volume: "V1",
    handle: "@Tezcat",
    avatarSeed: "tezcat",
    avatarSrc: tezcatWinner.url,
    game: "Pokémon Negro",
    players: "16 personas",
    team: [
      { id: 409, name: "Rampardos" },
      { id: 135, name: "Jolteon" },
      { id: 9, name: "Blastoise" },
      { id: 169, name: "Crobat" },
      { id: 230, name: "Kingdra" },
      { id: 625, name: "Bisharp" },
    ],
  },
  {
    volume: "V2",
    handle: "@Tezcat",
    avatarSeed: "tezcat2",
    avatarSrc: tezcatWinner.url,
    logoSrc: copaV2.url,
    game: "Pokémon Platino",
    players: "40 personas",
    team: [],
  },
  {
    volume: "V3",
    handle: "@Tezcat",
    avatarSeed: "tezcat3",
    avatarSrc: tezcatWinner.url,
    game: "Pokémon Ultra Sol",
    players: "60 personas",
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
    volume: "V4",
    handle: "Roll",
    avatarSeed: "roll",
    game: "Pokémon X",
    players: "80 personas",
    team: [
      { id: 169, name: "Crobat" },
      { id: 465, name: "Tangrowth" },
      { id: 282, name: "Mega Gardevoir" },
      { id: 242, name: "Blissey" },
      { id: 34, name: "Nidoking" },
      { id: 445, name: "Garchomp" },
    ],
  },
  {
    volume: "V5",
    handle: "En curso",
    avatarSeed: "current",
    game: "Pokémon HeartGold",
    players: "80 personas",
    status: "ongoing",
    team: [],
  },
];

export function HallOfFame() {
  return (
    <section id="salon" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            Toca una tarjeta para ver los detalles del torneo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
          {CHAMPS.map((c) => (
            <ChampionCard key={c.volume} champ={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TournamentLogo({ champ }: { champ: Champion }) {
  if (champ.logoSrc) {
    return (
      <img
        src={champ.logoSrc}
        alt={`Logo Copa Nebula ${champ.volume}`}
        width={160}
        height={160}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    );
  }
  // Stylized placeholder for tournaments without a logo yet
  return (
    <div className="relative h-full w-full grid place-items-center bg-[radial-gradient(circle_at_30%_30%,oklch(0.55_0.22_305/0.9),oklch(0.15_0.05_290)_70%)]">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_70%_70%,oklch(0.83_0.16_85/0.4),transparent_60%)]" />
      <Sparkles className="absolute top-2 left-2 h-3 w-3 text-gold/70" />
      <Sparkles className="absolute bottom-3 right-3 h-2.5 w-2.5 text-pink/70" />
      <div className="relative text-center">
        <div className="text-[9px] font-bold tracking-[0.3em] text-gold/90">COPA</div>
        <div className="font-display text-2xl sm:text-3xl text-gold-gradient leading-none">
          {champ.volume}
        </div>
        <div className="text-[8px] tracking-[0.25em] text-white/70 mt-0.5">NEBULA</div>
      </div>
    </div>
  );
}

function ChampionCard({ champ }: { champ: Champion }) {
  const [open, setOpen] = useState(false);
  const isOngoing = champ.status === "ongoing";

  return (
    <article
      className={`group card-nebula rounded-2xl relative overflow-hidden transition-all duration-500 ${
        open ? "ring-2 ring-gold/60 shadow-[0_0_40px_oklch(0.83_0.16_85/0.25)]" : "hover:-translate-y-1"
      }`}
    >
      <div className="absolute inset-0 rounded-2xl border border-gold/40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/30 blur-3xl pointer-events-none" />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="relative w-full text-left p-4 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
      >
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4">
          {/* Tournament logo */}
          <div className="relative shrink-0">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl btn-gold p-[2px]">
              <div className="h-full w-full rounded-[10px] overflow-hidden bg-background">
                <TournamentLogo champ={champ} />
              </div>
            </div>
            {isOngoing && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink" />
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold tracking-[0.3em] text-gold/80">COPA NEBULA</span>
              <span className="text-[10px] font-black text-gold">{champ.volume}</span>
            </div>
            <div className="font-display text-lg sm:text-xl text-foreground truncate">
              {champ.game}
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />{champ.players}</span>
              {isOngoing ? (
                <span className="text-pink font-bold tracking-wider">EN CURSO</span>
              ) : (
                <span className="flex items-center gap-1 text-gold truncate">
                  <Trophy className="h-3 w-3" />
                  <span className="truncate">{champ.handle}</span>
                </span>
              )}
            </div>
          </div>

          <ChevronDown
            className={`h-5 w-5 text-gold shrink-0 transition-transform duration-500 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Expandable body */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 relative">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-4" />

            {/* Winner + game info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl border border-gold/25 bg-background/50 p-3">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-gold/80 mb-2">
                  <Trophy className="h-3 w-3" /> GANADOR
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-full overflow-hidden bg-background border border-gold/40 shrink-0">
                    <img
                      src={champ.avatarSrc || `https://api.dicebear.com/9.x/adventurer/svg?seed=${champ.avatarSeed}&backgroundColor=6b21a8,7c3aed,9333ea`}
                      alt=""
                      width={36}
                      height={36}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="font-display text-base text-foreground truncate">{champ.handle}</div>
                </div>
              </div>
              <div className="rounded-xl border border-gold/25 bg-background/50 p-3">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-gold/80 mb-2">
                  <Gamepad2 className="h-3 w-3" /> JUEGO
                </div>
                <div className="font-display text-base text-foreground truncate">{champ.game}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{champ.players}</div>
              </div>
            </div>

            {/* Champion team */}
            {champ.team.length > 0 ? (
              <>
                <div className="text-[10px] font-bold tracking-[0.3em] text-gold/80 mb-3">EQUIPO CAMPEÓN</div>
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2 place-items-center">
                  {champ.team.map((p) => (
                  <div key={p.id} className="group/poke flex flex-col items-center">
                    <div
                      title={p.name}
                      className="relative inline-flex items-center justify-center rounded-md bg-background/60 p-0.5 overflow-hidden hover:shadow-[0_0_16px_oklch(0.83_0.16_85/0.5)] transition-all"
                    >
                      <img
                        src={`${PMD_PORTRAIT}/${String(p.id).padStart(4, "0")}/Normal.png`}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        width={40}
                        height={40}
                        style={{ imageRendering: "pixelated" }}
                        className="block h-10 w-10 sm:h-12 sm:w-12 object-contain"
                      />
                      <div className="absolute inset-0 rounded-md border border-gold/30 group-hover/poke:border-gold pointer-events-none z-10" />
                    </div>
                      <div className="mt-1 text-[9px] text-muted-foreground truncate max-w-[64px] text-center">
                        {p.name}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-xs text-muted-foreground italic text-center py-3">
                {isOngoing
                  ? "El torneo aún está en curso. ¡Pronto conoceremos al equipo campeón!"
                  : "Equipo campeón no registrado."}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

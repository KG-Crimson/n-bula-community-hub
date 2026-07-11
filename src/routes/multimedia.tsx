import { createFileRoute } from "@tanstack/react-router";
import { Heart, Palette } from "lucide-react";
import parceExpulsado from "@/assets/parce-expulsado.png.asset.json";
import parceKiss from "@/assets/parce-kiss.png.asset.json";
import parceObedezcan from "@/assets/parce-obedezcan.png.asset.json";
import parceSoff from "@/assets/parce-soff.png.asset.json";

type Artwork = {
  title: string;
  artist: string;
  likes: number;
  gradient?: string;
  tall?: boolean;
  image?: string;
};

export const Route = createFileRoute("/multimedia")({
  head: () => ({
    meta: [
      { title: "Multimedia — Nébula" },
      { name: "description", content: "Galería con los mejores dibujos y obras de los artistas de la comunidad Nébula." },
      { property: "og:title", content: "Multimedia — Nébula" },
      { property: "og:description", content: "Galería de arte de la comunidad Nébula." },
    ],
  }),
  component: MultimediaPage,
});

const ARTWORKS: Artwork[] = [
  { title: "EXPULSADO.", artist: "@parce", likes: 512, image: parceExpulsado.url, tall: true },
  { title: "Amor Greninja", artist: "@parce", likes: 342, image: parceKiss.url, tall: true },
  { title: "¡Obedezcan!", artist: "@parce", likes: 289, image: parceObedezcan.url },
  { title: "La Funa a SOFF", artist: "@parce", likes: 415, image: parceSoff.url },
  { title: "Lunala nocturna", artist: "@stellaria", likes: 128, gradient: "from-indigo-500 via-purple-600 to-pink-500", tall: true },
  { title: "Solgaleo dorado", artist: "@auralite", likes: 96, gradient: "from-amber-400 via-orange-500 to-rose-500" },
  { title: "Necrozma prisma", artist: "@nyxbyte", likes: 210, gradient: "from-cyan-400 via-fuchsia-500 to-violet-600" },
  { title: "Rayquaza celeste", artist: "@dracopix", likes: 74, gradient: "from-emerald-400 via-teal-500 to-sky-600" },
  { title: "Gengar violeta", artist: "@umbrart", likes: 143, gradient: "from-violet-600 via-fuchsia-600 to-indigo-800" },
  { title: "Umbreon lunar", artist: "@nightowl", likes: 89, gradient: "from-slate-700 via-purple-800 to-yellow-500" },
  { title: "Charizard sombras", artist: "@ember", likes: 167, gradient: "from-red-500 via-orange-600 to-amber-500" },
  { title: "Mew estelar", artist: "@stellaria", likes: 202, gradient: "from-pink-400 via-rose-400 to-purple-500" },
  { title: "Zoroark ilusión", artist: "@auralite", likes: 118, gradient: "from-gray-800 via-red-700 to-pink-600" },
];

function MultimediaPage() {
  return (
    <section className="pt-10 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">GALERÍA</div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl text-purple-gradient">MULTIMEDIA</h1>
          <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Los mejores dibujos y obras de los artistas de la comunidad Nébula.
            <span className="block mt-1 text-xs text-gold/80">Enseña tu arte en el canal #galería de Discord.</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {ARTWORKS.map((a) => (
            <figure
              key={a.title}
              className={`group relative overflow-hidden rounded-2xl border border-gold/20 shadow-[0_0_30px_oklch(0.65_0.24_305/0.15)] ${
                a.tall ? "row-span-2 aspect-[3/5]" : "aspect-square"
              }`}
            >
              {a.image ? (
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${a.gradient}`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0/0.25),transparent_60%)]" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <Palette className="h-16 w-16 text-white/80" />
                  </div>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-90" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <div className="font-display text-sm sm:text-base md:text-lg text-foreground truncate">{a.title}</div>
                <div className="flex items-center justify-between mt-1 gap-2">
                  <span className="text-[10px] sm:text-xs text-gold tracking-widest truncate">{a.artist}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-pink shrink-0">
                    <Heart className="h-3 w-3 fill-current" /> {a.likes}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://discord.gg/GDPyeD7A3R"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-bold tracking-widest btn-gold hover:btn-gold-hover"
          >
            SUBE TU ARTE EN DISCORD
          </a>
        </div>
      </div>
    </section>
  );
}

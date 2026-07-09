import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/nebula/Hero";
import { Trophy, Megaphone, Image as ImageIcon, Award } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nébula — Comunidad Discord de Pokémon" },
      { name: "description", content: "Bienvenido a Nébula: torneos, anuncios, multimedia y Salón de la Fama para fans de Pokémon." },
      { property: "og:title", content: "Nébula — Comunidad Discord de Pokémon" },
      { property: "og:description", content: "Torneos, anuncios, multimedia y Salón de la Fama para fans de Pokémon." },
    ],
  }),
  component: Index,
});

const CARDS = [
  { to: "/torneos" as const, icon: Trophy, title: "TORNEOS", desc: "Sigue el bracket, posiciones y próximos eventos." },
  { to: "/anuncios" as const, icon: Megaphone, title: "ANUNCIOS", desc: "Novedades y comunicados de la comunidad." },
  { to: "/multimedia" as const, icon: ImageIcon, title: "MULTIMEDIA", desc: "Galería con los mejores dibujos de artistas." },
  { to: "/salon" as const, icon: Award, title: "SALÓN DE LA FAMA", desc: "Los campeones legendarios de Nébula." },
];

function Index() {
  return (
    <>
      <Hero />
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">EXPLORA</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-purple-gradient">
              LA CONSTELACIÓN NÉBULA
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CARDS.map(({ to, icon: Icon, title, desc }) => (
              <Link
                key={to}
                to={to}
                className="card-nebula rounded-2xl p-6 group hover:border-gold/60 transition-all"
              >
                <div className="h-12 w-12 grid place-items-center rounded-xl btn-gold mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-display text-lg tracking-widest text-gold-gradient mb-2">{title}</div>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

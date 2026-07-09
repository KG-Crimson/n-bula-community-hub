import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Pin, Sparkles, Trophy, Users } from "lucide-react";

export const Route = createFileRoute("/anuncios")({
  head: () => ({
    meta: [
      { title: "Anuncios — Nébula" },
      { name: "description", content: "Últimas novedades, comunicados y actualizaciones de la comunidad Nébula." },
      { property: "og:title", content: "Anuncios — Nébula" },
      { property: "og:description", content: "Últimas novedades y comunicados de Nébula." },
    ],
  }),
  component: AnunciosPage,
});

const ANNOUNCEMENTS = [
  {
    tag: "IMPORTANTE",
    icon: Pin,
    date: "8 JUL 2026",
    title: "Inscripciones abiertas · Copa Celestial",
    body: "Ya puedes inscribirte para la próxima Copa Celestial. 16 plazas disponibles, formato BO3, sistema suizo + eliminatorias. Inscripción hasta el 11 de julio a las 22:00 CEST.",
    pinned: true,
  },
  {
    tag: "COMUNIDAD",
    icon: Users,
    date: "5 JUL 2026",
    title: "Superamos los 750 miembros",
    body: "Gracias a toda la comunidad por hacerlo posible. Como celebración desbloqueamos un nuevo canal de estrategia competitiva y roles cosméticos para todos.",
  },
  {
    tag: "EVENTOS",
    icon: Trophy,
    date: "1 JUL 2026",
    title: "Resultados Torneo Draft Junio",
    body: "Enhorabuena a Cynthia_99 por ganar el torneo Draft de junio, con Leon Ch. como subcampeón. Ambos entran directos al Salón de la Fama estacional.",
  },
  {
    tag: "NOVEDAD",
    icon: Sparkles,
    date: "28 JUN 2026",
    title: "Nuevo formato: VGC Regulation H",
    body: "A partir de julio incorporamos partidas VGC Regulation H a las noches temáticas de los miércoles. Consulta las reglas en el canal #reglas-vgc.",
  },
  {
    tag: "COMUNIDAD",
    icon: Megaphone,
    date: "22 JUN 2026",
    title: "Renovación de moderación",
    body: "Damos la bienvenida a tres nuevos moderadores elegidos por la comunidad. Puedes consultar el equipo completo en el canal #staff.",
  },
];

function AnunciosPage() {
  return (
    <section className="pt-10 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">COMUNICADOS</div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl text-purple-gradient">ANUNCIOS</h1>
          <p className="mt-4 text-sm md:text-base text-muted-foreground">
            Todo lo importante que ocurre en Nébula, en un solo sitio.
          </p>
        </div>

        <div className="space-y-4">
          {ANNOUNCEMENTS.map((a) => {
            const Icon = a.icon;
            return (
              <article
                key={a.title}
                className={`card-nebula rounded-2xl p-5 sm:p-6 ${
                  a.pinned ? "border-gold/50 shadow-[0_0_30px_oklch(0.83_0.16_85/0.15)]" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 shrink-0 rounded-xl grid place-items-center btn-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold tracking-[0.25em] text-gold bg-gold/10 border border-gold/30 rounded-full px-2.5 py-0.5">
                        {a.tag}
                      </span>
                      {a.pinned && (
                        <span className="text-[10px] font-bold tracking-[0.25em] text-pink">FIJADO</span>
                      )}
                      <span className="text-[10px] tracking-[0.2em] text-muted-foreground ml-auto">{a.date}</span>
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl text-foreground mb-2">{a.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

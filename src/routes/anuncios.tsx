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
    date: "12 JUL 2026",
    title: "Comunicado oficial: Juego limpio en el torneo",
    body: "Hemos detectado trampas en participantes que han modificado habilidades, añadido movimientos ilegales en la ROM base o ignorado las reglas de captura de ruta. Se han analizado las ROMs una por una y sabemos quiénes son. Si has cometido alguna ilegalidad, abre un ticket de forma sincera para evitar la expulsión inmediata; solo se aplicará una advertencia y la retirada de la presente edición. Buscamos una competencia justa y honesta para todos.",
    pinned: true,
  },
  {
    tag: "TIKTOK",
    icon: Users,
    date: "3 JUN 2026",
    title: "CUENTA DE TIKTOK OFICIAL",
    body: "Por fin después de tanto tiempo tenemos cuenta. Desde ahora, se subirán clips de los torneos, batallas, eventos etc. Quiénes tengan ideas para videos no duden en comentarlo, nos encantaría saberlo. ¡Vayan a seguirla! Enlace: ",
    link: "https://www.tiktok.com/@servernebula", 
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
                    
                    {/* El párrafo ahora junta el texto y el enlace clickeable directamente */}
                    <p className="text-sm text-muted-foreground leading-relaxed break-all">
                      {a.body}
                      {a.link && (
                        <a 
                          href={a.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-gold hover:underline font-medium inline-block ml-1"
                        >
                          {a.link}
                        </a>
                      )}
                    </p>
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

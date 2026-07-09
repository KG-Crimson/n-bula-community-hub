import { createFileRoute } from "@tanstack/react-router";
import { HallOfFame } from "@/components/nebula/HallOfFame";

export const Route = createFileRoute("/salon")({
  head: () => ({
    meta: [
      { title: "Salón de la Fama — Nébula" },
      { name: "description", content: "Los entrenadores legendarios que han dejado huella en la comunidad Nébula." },
      { property: "og:title", content: "Salón de la Fama — Nébula" },
      { property: "og:description", content: "Los campeones legendarios de Nébula." },
    ],
  }),
  component: () => (
    <div className="pt-10">
      <HallOfFame />
    </div>
  ),
});

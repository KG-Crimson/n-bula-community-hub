import { createFileRoute } from "@tanstack/react-router";
import bg from "@/assets/nebula-bg.jpg";
import { Header } from "@/components/nebula/Header";
import { Hero } from "@/components/nebula/Hero";
import { TournamentBracket } from "@/components/nebula/TournamentBracket";
import { HallOfFame } from "@/components/nebula/HallOfFame";
import { Footer } from "@/components/nebula/Footer";
import { StarField } from "@/components/nebula/StarField";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen text-foreground">
      {/* Cosmic background */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden
      />
      <div
        className="fixed inset-0 -z-10"
        style={{ background: "var(--gradient-cosmic)" }}
        aria-hidden
      />
      <div className="fixed inset-0 -z-10 bg-background/55" aria-hidden />
      <StarField />

      <Header />
      <main>
        <Hero />
        <TournamentBracket />
        <HallOfFame />
      </main>
      <Footer />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { TournamentCalendar } from "../components/nebula/TournamentCalendar";

export const Route = createFileRoute("/calendario")({
  component: () => <TournamentCalendar />,
});

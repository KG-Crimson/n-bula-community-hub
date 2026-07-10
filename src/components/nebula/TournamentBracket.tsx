import { useEffect, useState } from "react";

type Jugador = {
  grupo: string;
  nombre: string;
  victorias: string;
  derrotas: string;
  puntos: number;
  diferenciaMuertes: number;
};

export function TournamentBracket() {
  const [todosLosJugadores, setTodosLosJugadores] = useState<Jugador[]>([]);
  const [jugadoresFiltrados, setJugadoresFiltrados] = useState<Jugador[]>([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<string>("Global");
  const [jugadoresVivos, setJugadoresVivos] = useState<number>(75);

  useEffect(() => {
    const urlSheets = "https://docs.google.com/spreadsheets/d/19CwPqm2npxVcPpB9D1zC-BYlw-mBcbbSnlSflQYtjNc/export?format=csv&gid=1224590720";

    fetch(urlSheets)
      .then((res) => res.text())
      .then((text) => {
        const lineas = text.split("\n");
        
        if (lineas[11]) {
          const columnasFila12 = lineas[11].split(",");
          const valorN12 = parseInt(columnasFila12[13]?.trim());
          if (!isNaN(valorN12)) {
            setJugadoresVivos(valorN12);
          }
        }

        const datosLimpios: Jugador[] = lineas
          .slice(1)
          .map((linea) => {
            const columnas = linea.split(",");
            return {
              grupo: columnas[0]?.trim() || "",
              nombre: columnas[1]?.trim() || "",
              victorias: columnas[2]?.trim() || "0",
              derrotas: columnas[3]?.trim() || "0",
              puntos: parseInt(columnas[4]?.trim()) || 0,
              diferenciaMuertes: parseInt(columnas[5]?.trim()) || 0,
            };
          })
          .filter((p) => p.nombre !== "" && p.grupo !== "" && !p.grupo.startsWith("CONTEO") && p.puntos !== undefined);

        const datosOrdenados = datosLimpios.sort((a, b) => {
          if (b.puntos !== a.puntos) {
            return b.puntos - a.puntos;
          }
          return b.diferenciaMuertes - a.diferenciaMuertes;
        });

        setTodosLosJugadores(datosOrdenados);
        setJugadoresFiltrados(datosOrdenados);
      })
      .catch((err) => console.error("Error cargando el Sheets:", err));
  }, []);

  const filtrarPorGrupo = (grupo: string) => {
    setGrupoSeleccionado(grupo);
    if (grupo === "Global") {
      setJugadoresFiltrados(todosLosJugadores);
    } else {
      const filtrados = todosLosJugadores.filter(
        (j) => j.grupo.toLowerCase() === grupo.toLowerCase()
      );
      setJugadoresFiltrados(filtrados);
    }
  };

  const listaGrupos = ["Global", "Grupo 1", "Grupo 2", "Grupo 3", "Grupo 4", "Grupo 5", "Grupo 6", "Grupo 7", "Grupo 8"];

  return (
    <section id="torneos" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">COMPETICIÓN</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-purple-gradient mb-4">
            TORNEO NÉBULA V5
          </h2>
          <p className="text-muted-foreground text-sm md:text-base px-4">
            Fase de Grupos <span className="text-gold">·</span> <span className="text-gold">{jugadoresVivos}</span> Jugadores Restantes de <span className="text-gold">80</span>
          </p>
        </div>

        <div className="card-nebula rounded-3xl p-4 md:p-8 bg-background/40 border border-gold/15 shadow-xl">
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {listaGrupos.map((grupo) => (
              <button
                key={grupo}
                onClick={() => filtrarPorGrupo(grupo)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider border transition-all duration-200 ${
                  grupoSeleccionado === grupo
                    ? "bg-gold text-background border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    : "bg-transparent text-foreground/80 border-gold/30 hover:bg-gold/10 hover:text-white"
                }`}
              >
                {grupo.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gold/30 text-gold/90 text-xs font-bold tracking-widest uppercase">
                  <th className="py-3 px-4 text-left">{grupoSeleccionado === "Global" ? "Grupo" : "Pos"}</th>
                  <th className="py-3 px-4 text-left">Entrenador</th>
                  <th className="py-3 px-4 text-center">V</th>
                  <th className="py-3 px-4 text-center">D</th>
                  <th className="py-3 px-4 text-center">DIFF</th>
                  <th className="py-3 px-4 text-center">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10 text-sm">
                {jugadoresFiltrados.map((entrenador, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gold/5 transition-colors duration-150 text-foreground/80"
                  >
                    <td className="py-3.5 px-4 font-medium text-gold/70">
                      {grupoSeleccionado === "Global" ? entrenador.grupo : `#${index + 1}`}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">{entrenador.nombre}</td>
                    <td className="py-3.5 px-4 text-center font-semibold text-emerald-400">{entrenador.victorias}</td>
                    <td className="py-3.5 px-4 text-center font-semibold text-rose-500">{entrenador.derrotas}</td>
                    <td className={`py-3.5 px-4 text-center font-semibold ${entrenador.diferenciaMuertes > 0 ? "text-emerald-400" : entrenador.diferenciaMuertes < 0 ? "text-rose-500" : "text-foreground/40"}`}>
                      {entrenador.diferenciaMuertes > 0 ? `+${entrenador.diferenciaMuertes}` : entrenador.diferenciaMuertes}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-gold">{entrenador.puntos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right mt-4 text-[11px] text-muted-foreground/60 italic">
        Automatización de Excel: @pillz4ndueza 
      </div>
        </div>
      </div>
    </section>
  );
}

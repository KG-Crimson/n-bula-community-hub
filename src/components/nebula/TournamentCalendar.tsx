import { useEffect, useState } from "react";
import { ChevronDown, Swords, Trophy, Shield, Sparkles, Gauge } from "lucide-react";

type Partido = {
  ronda: string;
  jugador1: string;
  jugador2: string;
  resultado: string;
};

const GIDS_GRUPOS: { [key: string]: string } = {
  "grupo 1": "1378077087",
  "grupo 2": "746623117",
  "grupo 3": "901345571",
  "grupo 4": "1737966147",
  "grupo 5": "1781364789",
  "grupo 6": "1013452997",
  "grupo 7": "1014627392",
  "grupo 8": "1960676240"
};

export function TournamentCalendar() {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<string>("Grupo 1");
  const [rondaSeleccionada, setRondaSeleccionada] = useState<string>("Ronda 1");
  const [todosLosPartidos, setTodosLosPartidos] = useState<Partido[]>([]);
  const [partidosFiltrados, setPartidosFiltrados] = useState<Partido[]>([]);

  const cargarEnfrontamientos = (grupo: string) => {
    const gid = GIDS_GRUPOS[grupo.toLowerCase()];
    if (!gid) return;

    const urlPartidos = `https://docs.google.com/spreadsheets/d/19CwPqm2npxVcPpB9D1zC-BYlw-mBcbbSnlSflQYtjNc/export?format=csv&gid=${gid}`;
    
    fetch(urlPartidos)
      .then((res) => res.text())
      .then((text) => {
        const lineas = text.split("\n");
        let rondaActual = "";

        const partidosLimpios: Partido[] = lineas
          .slice(1)
          .map((linea) => {
            const columnas = linea.split(",");
            
            if (columnas[1] && columnas[1].trim() !== "") {
              rondaActual = columnas[1].trim();
            }

            return {
              ronda: rondaActual ? `Ronda ${rondaActual}` : "Ronda 1",
              jugador1: columnas[3]?.trim() || "",
              jugador2: columnas[4]?.trim() || "",
              resultado: columnas[5]?.trim() || ""
            };
          })
          .filter((p) => p.jugador1 !== "" && p.jugador2 !== "" && !p.jugador1.toLowerCase().includes("participante"));
        
        setTodosLosPartidos(partidosLimpios);
        
        const filtradosPorRonda = partidosLimpios.filter(
          (p) => p.ronda.toLowerCase() === rondaSeleccionada.toLowerCase()
        );
        setPartidosFiltrados(filtradosPorRonda);
      })
      .catch((err) => console.error("Error cargando partidos:", err));
  };

  useEffect(() => {
    cargarEnfrontamientos(grupoSeleccionado);
  }, [grupoSeleccionado]);

  useEffect(() => {
    const filtrados = todosLosPartidos.filter(
      (p) => p.ronda.toLowerCase() === rondaSeleccionada.toLowerCase()
    );
    setPartidosFiltrados(filtrados);
  }, [rondaSeleccionada, todosLosPartidos]);

  const cambiarGrupo = (grupo: string) => {
    setGrupoSeleccionado(grupo);
  };

  const listaGrupos = ["Grupo 1", "Grupo 2", "Grupo 3", "Grupo 4", "Grupo 5", "Grupo 6", "Grupo 7", "Grupo 8"];
  const listaRondas = ["Ronda 1", "Ronda 2", "Ronda 3", "Ronda 4"];

  return (
    <section id="calendario" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">CALENDARIO</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-purple-gradient mb-4">
            ENFRENTAMIENTOS
          </h2>
          <p className="text-muted-foreground text-sm md:text-base px-4">
            Sigue las jornadas en tiempo real de cada grupo
          </p>
        </div>

        <div className="card-nebula rounded-3xl p-4 md:p-8 bg-background/40 border border-gold/15 shadow-xl">
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {listaGrupos.map((grupo) => (
              <button
                key={grupo}
                onClick={() => cambiarGrupo(grupo)}
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

          <div className="flex justify-center gap-3 border-t border-b border-gold/10 py-4 mb-8 overflow-x-auto balance-flat">
            {listaRondas.map((ronda) => (
              <button
                key={ronda}
                onClick={() => setRondaSeleccionada(ronda)}
                className={`px-5 py-1.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${
                  rondaSeleccionada === ronda
                    ? "text-gold bg-gold/10 border border-gold/30"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {ronda}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {partidosFiltrados.length > 0 ? (
              partidosFiltrados.map((partido, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-background/60 border border-gold/5 hover:border-gold/15 transition-all text-sm md:text-base">
                  <span className="text-white font-medium truncate w-5/12 text-left">{partido.jugador1}</span>
                  <div className="flex flex-col items-center min-w-[120px] sm:min-w-[180px] px-2 shrink-0">
                    <span className={`px-3 py-1 rounded font-bold text-xs border text-center w-full block whitespace-nowrap ${
                    partido.resultado 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : "bg-gold/5 text-gold/70 border-gold/10"
                    }`}>
                    {partido.resultado ? `Ganador: ${partido.resultado}` : "VS"}
                    </span>
                </div>
                  <span className="text-white font-medium truncate w-5/12 text-right">{partido.jugador2}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm italic">
                No hay emparejamientos registrados para esta ronda
              </div>
            )}
          </div>
          
          <div className="text-right mt-6 text-[11px] text-muted-foreground/60 italic border-t border-gold/10 pt-4">
            Automatización de Excel: @pillz4ndueza 
          </div>

        </div>
      </div>
    </section>
  );
}

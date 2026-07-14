import { useEffect, useState } from "react";
import { ChevronDown, Swords, Trophy, Shield, Sparkles, Gauge, Gavel } from "lucide-react";

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

type RulesSection = {
  id: string;
  icon: React.ReactNode;
  title: string;
  items: string[];
};

function RulesAccordion() {
  const [openSection, setOpenSection] = useState<string | null>("general");

  const sections: RulesSection[] = [
    {
      id: "general",
      icon: <Swords className="w-5 h-5 text-gold" />,
      title: "Reglas generales",
      items: [
        "Se realizarán 4 combates en showdown en los horarios designados entre los participantes.",
        "Se ganarán 3 puntos por victoria, 1 punto por derrota y 0 si no se presenta al combate.",
        "Se tendrá que respetar el level cap establecido.",
        "Los IVS en 31 y los EVS en 1.",
        "Se usará exactamente el mismo equipo, ataques y naturalezas que en la rom a la hora de pasar el Main del juego. Cualquier cambio se penalizará (puede ser distinto al de la aventura).",
        "Los combates se realizarán los días sábado a las 7:00 p.m. hora chilena.",
        "Formato: los participantes estarán divididos en 8 grupos de 10 personas, por lo que sólo combatirá con gente de su grupo y los enfrentamientos serán aleatorios.",
        "Clasificación: tras realizarse los 4 combates correspondientes, pasarán a los play off los 4 primeros participantes que hayan conseguido más puntos de cada grupo.",
      ],
    },
    {
      id: "restricciones",
      icon: <Shield className="w-5 h-5 text-gold" />,
      title: "Restricciones de combate",
      items: [
        "Se pueden usar un máximo de 2 Pokémon especiales en cada equipo, los cuales están definidos más adelante.",
        "Sleep clause: sólo se puede dormir a un Pokémon a la vez, de lo contrario se perderá por default. Si el rival se duerme así mismo, no contará y el entrenador podrá dormir.",
        "Habilidades no permitidas por estar desbalanceadas: superguarda y veleta. Los Pokémon que tengan estas habilidades no podrán usarse.",
        "MTs: la MT esquema no se puede utilizar.",
        "1 hit KO: movimientos como frío polar, guillotina o fisura no se pueden utilizar.",
      ],
    },
    {
      id: "boosteo",
      icon: <Gauge className="w-5 h-5 text-gold" />,
      title: "Reglas de boosteo",
      items: [
        "Un Pokémon solo puede aumentar o disminuir una misma estadística hasta un máximo de 2 niveles mediante movimientos que modifican estadísticas de forma directa.",
        "Ejemplo: Danza Espada aumenta el Ataque en 2 niveles, por lo que solo puede usarse una vez. Danza Dragón aumenta el Ataque en 1 nivel, por lo que puede usarse hasta dos veces.",
        "Los aumentos o reducciones que ocurren como efecto secundario con probabilidad no cuentan para este límite. Por ejemplo, Puño Meteoro puede seguir aumentando el Ataque aunque el Pokémon ya haya alcanzado el máximo permitido mediante boosteos directos.",
        "Del mismo modo, Psíquico puede seguir intentando bajar la Defensa Especial del rival sin restricciones.",
        "La misma regla se aplica a los movimientos que reducen estadísticas: Llanto Falso reduce la Defensa Especial en 2 niveles, por lo que solo puede utilizarse una vez sobre el mismo objetivo. Látigo reduce la Defensa en 1 nivel, por lo que puede usarse hasta dos veces sobre el mismo objetivo.",
      ],
    },
    {
      id: "especiales",
      icon: <Sparkles className="w-5 h-5 text-gold" />,
      title: "Pokémon especiales",
      items: [
        "Para que la competencia sea lo más justa posible, se permiten ciertos Pokémon 'especiales' que pueden ocupar desde 1 hasta 2 espacios permitidos.",
        "Pseudos: Dragonite, Tyranitar, Salamence, Metagross, Garchomp.",
        "Singulares: Celebi, Manaphy, Shaymin.",
        "Excepciones que cuentan como 2 especiales: Slaking, Darkrai, Mew, Jirachi, Shaymin (Forma Cielo), Deoxys (Forma Velocidad).",
      ],
    },
    {
      id: "penalizaciones",
      icon: <Gavel className="w-5 h-5 text-gold" />,
      title: "Penalizaciones",
      items: [
        "Infracción leve: se dará un aviso y se exigirá que no vuelva a ocurrir. La reincidencia eleva la infracción a moderada.",
        "Infracción moderada: penalización en el torneo, que puede ir desde la reducción de puntos hasta perder el combate por default. La reincidencia eleva la infracción a grave.",
        "Infracción grave: expulsión del torneo o shadow ban en el servidor.",
        "Ban: la reincidencia de una infracción grave o cualquier acto irremediable conllevará la expulsión definitiva del servidor.",
      ],
    },
  ];

  return (
    <div className="mt-10">
      <div className="text-center mb-8">
        <div className="text-[10px] font-bold tracking-[0.4em] text-gold mb-3">NORMATIVA</div>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-purple-gradient">
          REGLAS DE COMBATE
        </h3>
      </div>

      <div className="card-nebula rounded-3xl p-4 md:p-8 bg-background/40 border border-gold/15 shadow-xl">
        <div className="space-y-3">
          {sections.map((section) => {
            const isOpen = openSection === section.id;
            return (
              <div
                key={section.id}
                className="rounded-2xl border border-gold/10 bg-background/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenSection(isOpen ? null : section.id)}
                  className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-gold/5"
                >
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <span className="font-display text-base sm:text-lg text-white">
                      {section.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-0">
                    <ul className="space-y-3">
                      {section.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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

        <RulesAccordion />
      </div>
    </section>
  );
}

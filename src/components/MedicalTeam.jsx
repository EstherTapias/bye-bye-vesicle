import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const team = [
  {
    name: "Mamá",
    role: "Jefa de Cocina",
    detail: "Responsable del menú oficial de caldos, purés y gelatinas. Inspecciona cada plato antes de servirlo. Su palabra es ley en la cocina.",
    photo: "/assets/mama.jpeg",
    initial: "M",
    accent: "#dcfce7",
  },
  {
    name: "Marijose",
    role: "Supervisora de Reposo",
    detail: "Evita a toda costa que papá se levante del sofá sin autorización escrita. Gestiona el suministro de cojines y mantas.",
    photo: "/assets/marijose.jpeg",
    initial: "MJ",
    accent: "#fef3c7",
  },
  {
    name: "Esther",
    role: "Dir. Tecnología",
    detail: "Creadora de esta web y responsable oficial del mando a distancia. Gestiona el catálogo de series aprobadas. Disponible 24/7.",
    photo: "/assets/esther.png",
    initial: "E",
    accent: "#fee2e2",
  },
  {
    name: "Nahko",
    role: "Jefe de Fisioterapia",
    detail: "Especialista en terapia de contacto por aplastamiento de piernas. Consiste en no moverse durante horas. Tarifa: una caricia.",
    photo: "/assets/nahko.png",
    initial: "N",
    accent: "#ede9fe",
  },
  {
    name: "Kalah",
    role: "Supervisora de Dieta",
    detail: "Vigila todo lo que comes con mirada inquisidora. Detecta chorizo a metros de distancia. No acepta sobornos (casi nunca).",
    photo: "/assets/kalah.jpeg",
    initial: "K",
    accent: "#fce7f3",
  },
];

function MemberCard({ member }) {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`
        border-2 border-black bg-white cursor-pointer select-none
        transition-all duration-100 overflow-hidden
        ${expanded
          ? "translate-x-[4px] translate-y-[4px] shadow-none"
          : "shadow-[4px_4px_0px_#000]"
        }
      `}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 p-4">
        <div
          className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-black flex items-center justify-center"
          style={{ background: member.accent }}
        >
          {!imageError ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="font-sans font-black text-base text-black">
              {member.initial}
            </span>
          )}
        </div>

        {/* Name + role */}
        <div className="flex-1 min-w-0">
          <p className="font-sans text-base font-black leading-tight truncate text-black">
            {member.name}
          </p>
          <p className="font-mono text-[11px] text-[var(--color-ink-soft)] leading-tight mt-0.5">
            {member.role}
          </p>
        </div>

        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className="flex-shrink-0 text-black"
        >
          <ChevronDown size={18} strokeWidth={2.5} />
        </motion.div>
      </div>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 pt-2 border-t-2 border-black"
              style={{ background: member.accent }}
            >
              <p className="font-sans text-sm leading-relaxed text-black">
                {member.detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MedicalTeam() {
  return (
    <section className="pt-10 pb-2 border-t-4 border-black mt-8">
      <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-ink-soft)] uppercase mb-1">
        DIRECTORIO
      </p>
      <h2 className="font-sans text-5xl md:text-6xl font-black uppercase leading-none mb-6">
        Equipo<br />médico
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
        {team.map((m) => (
          <MemberCard key={m.name} member={m} />
        ))}
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";

const equipo = [
  {
    nombre: "Mamá",
    rol: "Jefa de Cocina y Control de Calidad",
    detalle: "Encargada del menú Michelin de caldos y gelatinas.",
    emoji: "👩‍🍳",
    color: "from-rose-400 to-pink-500",
  },
  {
    nombre: "Hermana",
    rol: "Supervisora de Reposo y Logística",
    detalle: "Evita a toda costa que papá se mueva del sofá.",
    emoji: "🕵️‍♀️",
    color: "from-violet-400 to-indigo-500",
  },
  {
    nombre: "Yo",
    rol: "Directora de Tecnología y Entretenimiento",
    detalle: "Creadora de la app y encargada oficial del mando de la tele.",
    emoji: "👩‍💻",
    color: "from-cyan-400 to-blue-500",
  },
  {
    nombre: "Nahko",
    rol: "Jefe de Fisioterapia y Calor Humano",
    detalle:
      "Especialista en siestas terapéuticas pegado a tus piernas. Tarifa: 1 caricia por minuto. Si te intentas levantar, te ladrará.",
    emoji: "🐶",
    color: "from-amber-400 to-orange-500",
  },
  {
    nombre: "Kalah",
    rol: "Supervisora de Dieta Absoluta y Vegetales",
    detalle:
      "Juzga minuciosamente con la mirada todo lo que comes. Si intentas meter chorizo a escondidas, dará la alarma.",
    emoji: "🐰",
    color: "from-emerald-400 to-teal-500",
  },
];

function TarjetaMiembro({ miembro }) {
  const [abierta, setAbierta] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setAbierta(!abierta)}
      className="rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 overflow-hidden cursor-pointer shadow-lg active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center gap-3 p-4">
        <div
          className={`w-14 h-14 rounded-full flex-shrink-0 bg-gradient-to-br ${miembro.color} flex items-center justify-center text-2xl shadow-md`}
        >
          {/* Placeholder de imagen — sustituye por foto real si quieres */}
          {miembro.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm">{miembro.nombre}</p>
          <p className="text-cyan-300 text-xs font-medium leading-tight">
            {miembro.rol}
          </p>
        </div>
        <motion.span
          animate={{ rotate: abierta ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-slate-400 text-sm flex-shrink-0"
        >
          ▼
        </motion.span>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: abierta ? "auto" : 0,
          opacity: abierta ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-4 pb-4 text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-3">
          {miembro.detalle}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function EquipoMedico() {
  return (
    <section className="w-full px-4 py-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-white font-bold text-lg mb-1 text-center">
          🏆 Equipo Médico VIP
        </h2>
        <p className="text-slate-400 text-xs text-center mb-5">
          Toca cada tarjeta para ver el rol completo
        </p>

        <div className="flex flex-col gap-3">
          {equipo.map((miembro) => (
            <TarjetaMiembro key={miembro.nombre} miembro={miembro} />
          ))}
        </div>
      </div>
    </section>
  );
}

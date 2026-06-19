import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Siren, CheckCircle2 } from "lucide-react";

export default function BotonPanico() {
  const [activado, setActivado] = useState(false);

  const handlePulsar = () => {
    setActivado(true);
    setTimeout(() => setActivado(false), 4000);
  };

  return (
    <section className="w-full px-4 py-10 flex flex-col items-center">
      <h2 className="text-white font-bold text-lg mb-1 text-center">
        🚨 Botón del Pánico
      </h2>
      <p className="text-slate-400 text-xs text-center mb-6 max-w-xs">
        Pulsa solo en caso de emergencia real (o de antojo de mimos urgente)
      </p>

      <motion.button
        onClick={handlePulsar}
        disabled={activado}
        whileTap={{ scale: 0.9 }}
        animate={
          activado
            ? { scale: [1, 1.1, 1] }
            : { scale: [1, 1.04, 1] }
        }
        transition={
          activado
            ? { duration: 0.4 }
            : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
        className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center gap-1 shadow-2xl border-4 transition-colors ${
          activado
            ? "bg-emerald-500 border-emerald-300 shadow-emerald-500/40"
            : "bg-rose-600 border-rose-400 shadow-rose-600/40"
        }`}
      >
        {activado ? (
          <CheckCircle2 size={42} className="text-white" />
        ) : (
          <Siren size={42} className="text-white" />
        )}
        <span className="text-white font-bold text-sm">
          {activado ? "¡ENVIADO!" : "PÁNICO"}
        </span>
      </motion.button>

      <AnimatePresence>
        {activado && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="mt-6 max-w-xs text-center rounded-2xl bg-emerald-500/10 border border-emerald-400/30 px-4 py-3"
          >
            <p className="text-emerald-300 text-sm font-semibold">
              ¡Alerta recibida! 🚑 Enfermeras de camino al sofá con un vaso de
              agua y mimos.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

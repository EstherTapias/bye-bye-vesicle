import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { calcularDiaActual } from "./ConsejoDelDia";

export default function Vesiculometro() {
  const [dia, setDia] = useState(0);

  useEffect(() => {
    setDia(calcularDiaActual());
  }, []);

  const diaVisible = Math.max(1, Math.min(dia, 30));
  const porcentaje = Math.round((diaVisible / 30) * 100);

  return (
    <section className="w-full px-4 py-6">
      <div className="max-w-md mx-auto rounded-3xl bg-slate-900/80 backdrop-blur-md border border-cyan-400/20 p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
            <Heart className="text-rose-400" size={18} fill="currentColor" />
            VESICULÓMETRO
          </h2>
          <span className="text-cyan-300 font-mono text-xs font-semibold">
            DÍA {diaVisible}/30
          </span>
        </div>

        {/* Pista de la barra */}
        <div className="relative h-7 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
          {/* Relleno animado */}
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${porcentaje}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Marcas de fases (líneas sutiles) */}
          <div className="absolute inset-0 flex">
            <div className="w-[10%] border-r border-slate-900/40" />
            <div className="w-[23.3%] border-r border-slate-900/40" />
          </div>
        </div>

        {/* Avatar flotante que recorre la barra */}
        <div className="relative h-12 mt-1">
          <motion.div
            className="absolute top-0 -translate-x-1/2"
            initial={{ left: "0%" }}
            animate={{ left: `${porcentaje}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="w-10 h-10 rounded-full border-2 border-cyan-300 shadow-lg shadow-cyan-400/40 overflow-hidden bg-slate-700 flex items-center justify-center">
              {/* Placeholder de imagen — sustituye por la foto real */}
              <img
                src="/assets/cabeza-papa.png"
                alt="Avatar de papá"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span className="text-lg hidden">🧔</span>
            </div>
          </motion.div>
        </div>

        <p className="text-center text-slate-400 text-xs mt-1">
          {porcentaje}% de vida recuperada
        </p>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import { calcularDiaActual } from "./ConsejoDelDia";

const fases = [
  {
    id: 1,
    titulo: "Fase 1",
    subtitulo: "Días 1-3",
    nombre: "Dieta Líquida",
    items: [
      "Caldo claritos de la casa, receta secreta de mamá",
      "Agua mineral premium (del grifo, pero con cariño)",
      "Gelatinas artesanales de sabores variados",
      "Infusiones reconfortantes a demanda",
    ],
    diaInicio: 1,
    diaFin: 3,
  },
  {
    id: 2,
    titulo: "Fase 2",
    subtitulo: "Días 4-10",
    nombre: "Dieta Blanda",
    items: [
      "Purés gourmet de verdura de temporada",
      "Pollo hervido con amor (y poca sal)",
      "Tortilla francesa al punto",
      "Arroz blanco de guarnición elegante",
    ],
    diaInicio: 4,
    diaFin: 10,
  },
  {
    id: 3,
    titulo: "Fase 3",
    subtitulo: "Días 11-30",
    nombre: "Vuelta a la Normalidad",
    items: [
      "Comida casera variada, ya sin restricciones especiales",
      "Raciones normales, buen ritmo de recuperación",
      "🔒 Premio de Meta: tu antojo prohibido (bloqueado hasta el Día 30)",
    ],
    diaInicio: 11,
    diaFin: 30,
  },
];

export default function MenusMichelin() {
  const [diaActual, setDiaActual] = useState(0);
  const [tabActiva, setTabActiva] = useState(1);

  useEffect(() => {
    const dia = calcularDiaActual();
    setDiaActual(dia);
    // Abre por defecto la pestaña correspondiente al día actual
    const faseActual = fases.find(
      (f) => dia >= f.diaInicio && dia <= f.diaFin
    );
    if (faseActual) setTabActiva(faseActual.id);
  }, []);

  const fase = fases.find((f) => f.id === tabActiva);
  const premioDesbloqueado = diaActual >= 30;

  return (
    <section className="w-full px-4 py-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-white font-bold text-lg mb-1 text-center">
          🍽️ Menú Michelin Postoperatorio
        </h2>
        <p className="text-slate-400 text-xs text-center mb-5">
          Alta cocina de recuperación, temporada {new Date().getFullYear()}
        </p>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-900/60 rounded-2xl p-1 mb-4 border border-white/10">
          {fases.map((f) => (
            <button
              key={f.id}
              onClick={() => setTabActiva(f.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                tabActiva === f.id
                  ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-900 shadow-md"
                  : "text-slate-400"
              }`}
            >
              {f.titulo}
              <span className="block text-[10px] font-normal opacity-80">
                {f.subtitulo}
              </span>
            </button>
          ))}
        </div>

        {/* Contenido de la tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={fase.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-400/20 p-5 shadow-xl"
          >
            <p className="text-amber-300 text-[11px] font-semibold tracking-widest uppercase mb-1">
              {fase.titulo} · {fase.subtitulo}
            </p>
            <h3 className="text-white font-bold text-base mb-3">
              {fase.nombre}
            </h3>

            <ul className="space-y-2">
              {fase.items.map((item, i) => {
                const esPremio = item.includes("🔒");
                return (
                  <li
                    key={i}
                    className={`flex items-start gap-2 text-sm ${
                      esPremio
                        ? "text-amber-300 font-semibold"
                        : "text-slate-300"
                    }`}
                  >
                    {esPremio ? (
                      premioDesbloqueado ? (
                        <span className="text-emerald-400 mt-0.5">🎉</span>
                      ) : (
                        <Lock size={14} className="mt-0.5 flex-shrink-0" />
                      )
                    ) : (
                      <span className="text-cyan-400 mt-0.5">•</span>
                    )}
                    <span>
                      {esPremio
                        ? premioDesbloqueado
                          ? item.replace("🔒 ", "") + " ¡DESBLOQUEADO!"
                          : item.replace("🔒 ", "")
                        : item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

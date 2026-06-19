import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { consejos } from "../data/consejos";

// 🔧 FECHA DE INICIO — cámbiala aquí para hacer pruebas en desarrollo.
// Formato: "YYYY-MM-DDT00:00:00"
export const FECHA_OPERACION = new Date("2026-06-22T00:00:00");

// Calcula el día de recuperación (1 al 30). Antes del día 1 devuelve 0,
// después del día 30 se queda fijo en 30.
export function calcularDiaActual(fechaInicio = FECHA_OPERACION) {
  const hoy = new Date();
  const inicio = new Date(fechaInicio);
  // Normalizamos horas para comparar solo fechas
  hoy.setHours(0, 0, 0, 0);
  inicio.setHours(0, 0, 0, 0);

  const diffMs = hoy - inicio;
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1; // Día de la operación = Día 1

  if (diffDias < 0) return 0;
  if (diffDias > 30) return 30;
  return diffDias;
}

export default function ConsejoDelDia() {
  const [diaActual, setDiaActual] = useState(0);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  useEffect(() => {
    const dia = calcularDiaActual();
    setDiaActual(dia);

    if (dia >= 1 && dia <= 30) {
      const yaVistoHoy = localStorage.getItem(`consejo-visto-dia-${dia}`);
      if (!yaVistoHoy) {
        // pequeño delay para que la entrada se sienta como una aparición, no un salto brusco
        const timer = setTimeout(() => setMostrarPopup(true), 600);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const cerrarPopup = () => {
    setMostrarPopup(false);
    if (diaActual >= 1 && diaActual <= 30) {
      localStorage.setItem(`consejo-visto-dia-${diaActual}`, "true");
    }
  };

  if (diaActual < 1 || diaActual > 30) return null;

  const consejo = consejos[diaActual - 1];

  return (
    <AnimatePresence>
      {mostrarPopup && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={cerrarPopup}
        >
          <motion.div
            className="relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-400/30 shadow-2xl p-6 text-center"
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 18, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={cerrarPopup}
              className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-400/30">
                <Sparkles className="text-slate-900" size={26} />
              </div>
            </div>

            <p className="text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-2">
              Consejito del Día {diaActual}/30
            </p>

            <p className="text-white text-base font-medium leading-relaxed mb-5">
              {consejo}
            </p>

            <button
              onClick={cerrarPopup}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-900 font-bold tracking-wide active:scale-95 transition-transform"
            >
              ¡Recibido, jefe! 💪
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

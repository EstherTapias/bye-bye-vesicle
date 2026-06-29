import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Diploma({ onClose }) {
  return createPortal(
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Área imprimible — id usado por @media print ── */}
        <div
          id="diploma-container"
          className="bg-[var(--color-base)] border-[6px] border-black"
          style={{ boxShadow: "10px 10px 0px #000" }}
        >
          {/* Inner decorative frame */}
          <div className="m-3 border-4 border-black p-6 sm:p-8">

            {/* Top rule */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-black" />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase whitespace-nowrap">
                Documento Oficial · Clínica del Sofá · 2026
              </span>
              <div className="flex-1 h-px bg-black" />
            </div>

            {/* Main title */}
            <div className="text-center mb-5">
              <h2 className="font-sans font-black text-2xl sm:text-3xl uppercase leading-[1.05] tracking-tight">
                Diploma de Excelencia<br />en Reposo Absoluto
              </h2>
            </div>

            {/* Stars divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-black" />
              <span className="font-mono text-base tracking-[0.4em]">★ ★ ★</span>
              <div className="flex-1 h-px bg-black" />
            </div>

            {/* Recipient */}
            <div className="text-center mb-5">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3">
                Otorgado con orgullo a:
              </p>
              <div className="border-b-4 border-black pb-3">
                <p className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight leading-none">
                  José Manuel<br />Tapias Alonso
                </p>
              </div>
            </div>

            {/* Body text */}
            <div className="border-4 border-black bg-white p-4 mb-5">
              <p className="font-sans text-sm leading-relaxed text-black">
                Por haber superado con éxito y un aguante <strong>heroico</strong> los{" "}
                <strong>30 días de postoperatorio oficial</strong> en el sofá. Certificamos
                que ha sobrevivido a los caldos de Mamá, a la estricta supervisión de
                Marijose, al control tecnológico de Esther, a la terapia de aplastamiento
                de piernas de Nahko y a las miradas inquisidoras de Kahla.
              </p>
            </div>

            {/* Highlight */}
            <div className="border-4 border-black bg-[var(--color-amber)] p-4 mb-7 text-center">
              <p className="font-sans font-black text-sm uppercase leading-snug">
                ¡Oficialmente libre de vesícula y listo para volver a las andadas
                (y a los churritos de La Cremita)!
              </p>
            </div>

            {/* Seals + signature row */}
            <div className="flex items-end justify-between border-t-2 border-black pt-5">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center bg-[var(--color-clinical)] text-white font-black text-[10px] text-center leading-tight uppercase">
                  SELLO<br />VIP<br />★
                </div>
                <p className="font-mono text-[8px] mt-1.5 uppercase tracking-wider">Equipo Médico</p>
              </div>

              <div className="text-center flex-1 px-4">
                <p className="font-mono text-[8px] text-black/40 mb-7 uppercase tracking-widest">
                  San Fernando, junio 2026
                </p>
                <div className="border-b-2 border-black mb-1 mx-2" />
                <p className="font-mono text-[8px] uppercase tracking-wider">Firma y Rúbrica Oficial</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center bg-[var(--color-alert)] text-white font-black text-xs text-center leading-tight uppercase">
                  30/30<br />DÍAS
                </div>
                <p className="font-mono text-[8px] mt-1.5 uppercase tracking-wider">Completado</p>
              </div>
            </div>

            {/* Bottom rule */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex-1 h-px bg-black" />
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase whitespace-nowrap">
                Válido por siempre · Sin caducidad
              </span>
              <div className="flex-1 h-px bg-black" />
            </div>

          </div>
        </div>

        {/* Botones de acción — ocultos en impresión */}
        <div className="no-print flex gap-3 mt-4">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-black text-white font-sans font-black uppercase text-sm py-4
                       border-4 border-black shadow-[4px_4px_0px_#555]
                       active:shadow-none active:translate-x-1 active:translate-y-1
                       transition-all duration-75"
          >
            ¡Imprimir Diploma!
          </button>
          <button
            onClick={onClose}
            className="border-4 border-black bg-[var(--color-base)] font-mono font-bold
                       uppercase text-xs px-5
                       shadow-[4px_4px_0px_#000]
                       active:shadow-none active:translate-x-1 active:translate-y-1
                       transition-all duration-75"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById("diploma-portal")
  );
}

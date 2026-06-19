import { useState } from "react";

export default function DevMode({ activeDay, devDay, realDay, onChangeDay }) {
  const [open, setOpen] = useState(false);
  const simulated = devDay !== null;

  const label =
    activeDay === 0  ? "PRE-OPERATORIO" :
    activeDay > 30   ? "RECUPERACIÓN COMPLETA" :
    `DÍA ${activeDay} DE 30`;

  return (
    <div className="border-t-4 border-black mt-12 mb-4">
      {/* Toggle header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-black text-white font-mono text-xs tracking-[0.2em] uppercase py-3 px-4 flex justify-between items-center"
      >
        <span>
          ⚙ DEV MODE
          {simulated && (
            <span className="ml-2 text-[var(--color-clinical)]">· DÍA {activeDay} SIMULADO</span>
          )}
        </span>
        <span className="text-white/60">{open ? "▲ CERRAR" : "▼ ABRIR"}</span>
      </button>

      {open && (
        <div className="bg-[#0d0d0d] text-[#22c55e] font-mono p-5 border-x-4 border-b-4 border-black">
          {/* Day display */}
          <div className="mb-5">
            <p className="text-[9px] text-white/30 tracking-[0.3em] uppercase mb-1">
              DÍA SIMULADO
            </p>
            <p className="text-7xl font-black tabular-nums leading-none text-[#22c55e]">
              {activeDay === 0
                ? "00"
                : activeDay > 30
                ? "30+"
                : String(activeDay).padStart(2, "0")}
            </p>
            <p className="text-xs text-white/40 mt-1">{label}</p>
            {simulated && (
              <p className="text-[10px] text-white/25 mt-0.5">
                Fecha real del dispositivo → Día {realDay === 0 ? "PRE-OP" : realDay > 30 ? "POST-30" : realDay}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 mb-5">
            <button
              onClick={() => onChangeDay(-1)}
              className="border-2 border-[#22c55e] text-[#22c55e] px-5 py-2.5 text-sm font-bold
                         shadow-[3px_3px_0px_#22c55e]
                         active:shadow-none active:translate-x-[3px] active:translate-y-[3px]
                         transition-all duration-75"
            >
              ← −1 DÍA
            </button>
            <button
              onClick={() => onChangeDay(1)}
              className="border-2 border-[#22c55e] text-[#22c55e] px-5 py-2.5 text-sm font-bold
                         shadow-[3px_3px_0px_#22c55e]
                         active:shadow-none active:translate-x-[3px] active:translate-y-[3px]
                         transition-all duration-75"
            >
              +1 DÍA →
            </button>
            <button
              onClick={() => onChangeDay("reset")}
              className="border-2 border-white/25 text-white/40 px-5 py-2.5 text-sm font-bold
                         active:opacity-60 transition-opacity"
            >
              RESET
            </button>
          </div>

          {/* Info */}
          <div className="border-t border-white/10 pt-4 space-y-1">
            <p className="text-[10px] text-white/25 tracking-wide">
              · Los consejos vistos se guardan en localStorage por día.
            </p>
            <p className="text-[10px] text-white/25 tracking-wide">
              · Para limpiarlos: <span className="text-white/50">localStorage.clear()</span> en consola del navegador.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

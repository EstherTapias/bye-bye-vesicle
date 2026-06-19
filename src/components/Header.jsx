import { useState } from "react";
import PanicButton from "./PanicButton";

const phaseLabel = (day) => {
  if (day === 0) return "Operación: lunes 22 de junio · Preparando el sofá";
  if (day <= 3)  return "Fase 1 — Reposo absoluto y caldo";
  if (day <= 10) return "Fase 2 — Movilidad progresiva";
  if (day <= 29) return "Fase 3 — Recuperación avanzada";
  return "¡Recuperación completada!";
};

export default function Header({ alertActive, onPress, activeDay }) {
  const [imageError, setImageError] = useState(false);

  return (
    <header className="bg-[#E6B940] text-black border-b-4 border-black">
      <div className="max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 pt-12 pb-8">

        {/* Photo + title */}
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden flex-shrink-0
                       border-4 border-black bg-[var(--color-clinical-soft)] flex items-center justify-center"
            style={{ boxShadow: "5px 5px 0px #000" }}
          >
            {!imageError ? (
              <img
                src="/assets/cabeza-papa.png"
                alt="El paciente"
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-4xl select-none">🧔</span>
            )}
          </div>

          <div className="pt-1 flex-1">
            <p className="font-mono text-[10px] tracking-[0.25em] text-black/60 uppercase mb-2">
              PACIENTE VIP · VESÍCULA
            </p>
            <h1 className="font-sans font-black leading-[0.95] uppercase tracking-tight">
              <span className="block text-4xl sm:text-5xl">Plan de</span>
              <span className="block text-3xl sm:text-4xl whitespace-nowrap">Recuperación</span>
            </h1>
          </div>
        </div>

        <p className="font-mono text-xs text-black tracking-wide mb-7">
          {phaseLabel(activeDay)}
        </p>

        <PanicButton variant="card" active={alertActive} onPress={onPress} />
      </div>
    </header>
  );
}

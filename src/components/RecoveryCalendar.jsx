import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Check } from "lucide-react";
import { tips } from "../data/tips";

function useAlreadySeen(day) {
  const key = `tip-seen-day-${day}`;
  const [alreadySeen, setAlreadySeen] = useState(false);

  useEffect(() => {
    if (day >= 1 && day <= 30) {
      setAlreadySeen(!!localStorage.getItem(key));
    } else {
      setAlreadySeen(false);
    }
  }, [day, key]);

  const markAsSeen = () => {
    localStorage.setItem(key, "true");
    setAlreadySeen(true);
  };

  return [alreadySeen, markAsSeen];
}

// ─── Individual day cell ───────────────────────────────────────────────────
function DayCell({ number, activeDay, alreadySeen, onOpen }) {
  const isPast      = activeDay > 0 && number < activeDay;
  const isCurrent   = activeDay > 0 && number === activeDay;
  const isFuture    = activeDay === 0 || number > activeDay;
  const isSeen      = isCurrent && alreadySeen;
  const isClickable = isPast || isCurrent;

  return (
    <button
      onClick={() => isClickable && onOpen(number)}
      disabled={!isClickable}
      className={`
        relative aspect-square border-2 border-black
        flex flex-col items-center justify-center gap-0.5
        select-none transition-all duration-75
        ${isPast || isSeen
          ? "bg-[var(--color-clinical)] shadow-[2px_2px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          : isCurrent
          ? "bg-[var(--color-amber)] shadow-[3px_3px_0px_#000] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] cursor-pointer"
          : "bg-[var(--color-surface)] cursor-default"
        }
      `}
    >
      {/* Pulse only on current unseen day */}
      {isCurrent && !isSeen && (
        <motion.div
          className="absolute inset-0 border-2 border-black"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      )}

      {(isPast || isSeen) && (
        <Check size={11} strokeWidth={3} className="text-white" />
      )}
      {isFuture && (
        <Lock size={9} strokeWidth={2.5} className="text-black/30" />
      )}

      <span
        className={`font-mono font-black tabular-nums leading-none
          ${isPast || isSeen ? "text-white text-[10px]"
          : isCurrent        ? "text-black text-[12px]"
          : "text-black/25 text-[10px]"}
        `}
      >
        {number}
      </span>
    </button>
  );
}

// ─── Tip modal ────────────────────────────────────────────────────────────
function TipModal({ day, onClose }) {
  const tip = tips[day - 1];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-4 pb-6 sm:pb-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-sm bg-white border-4 border-black overflow-hidden"
        style={{ boxShadow: "8px 8px 0px #000" }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-black text-white px-5 py-4">
          <p className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase mb-1">
            INDICACIÓN OFICIAL
          </p>
          <p className="font-sans text-3xl font-black uppercase leading-none">
            Día {day}
          </p>
        </div>

        <div className="px-5 py-5">
          <p className="font-sans text-base font-semibold text-black leading-snug mb-6">
            {tip}
          </p>
          <button
            onClick={onClose}
            className="w-full border-4 border-black bg-black text-white
                       font-sans font-black uppercase text-sm py-3.5
                       shadow-[4px_4px_0px_#555] active:shadow-none active:translate-x-1 active:translate-y-1
                       transition-all duration-75"
          >
            ENTENDIDO, DOCTOR
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────
export default function RecoveryCalendar({ onBoost, activeDay }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [alreadySeen, markAsSeen] = useAlreadySeen(activeDay);

  const openTip = (dayNumber) => {
    setSelectedDay(dayNumber);
    if (dayNumber === activeDay && !alreadySeen) {
      onBoost();
    }
  };

  const closeModal = () => {
    if (selectedDay === activeDay) {
      markAsSeen();
    }
    setSelectedDay(null);
  };

  const subtitle =
    activeDay === 0  ? "La operación es el lunes 22 de junio. Prepara el sofá." :
    activeDay > 30   ? "¡30 días completados! Misión cumplida." :
    !alreadySeen     ? "Pulsa el día de hoy para tu indicación médica." :
                       "Consejo del día leído. Vuelve mañana.";

  return (
    <section className="pt-10 pb-2 border-t-4 border-black mt-8">
      <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-ink-soft)] uppercase mb-1">
        CALENDARIO DE RECUPERACIÓN
      </p>
      <h2 className="font-sans text-5xl md:text-6xl font-black uppercase leading-none mb-2">
        30 días<br />al sofá
      </h2>
      <p className="font-mono text-xs text-[var(--color-ink-soft)] mb-6">{subtitle}</p>

      {/* Grid: 5 cols mobile, 6 cols sm+ */}
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
          <DayCell
            key={n}
            number={n}
            activeDay={activeDay}
            alreadySeen={alreadySeen && n === activeDay}
            onOpen={openTip}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-[var(--color-clinical)] border-2 border-black inline-block" />
          <span className="font-mono text-[10px] text-[var(--color-ink-soft)]">Completado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-[var(--color-amber)] border-2 border-black inline-block" />
          <span className="font-mono text-[10px] text-[var(--color-ink-soft)]">Hoy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-[var(--color-surface)] border-2 border-black inline-block" />
          <span className="font-mono text-[10px] text-[var(--color-ink-soft)]">Bloqueado</span>
        </div>
      </div>

      <AnimatePresence>
        {selectedDay !== null && (
          <TipModal day={selectedDay} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
}

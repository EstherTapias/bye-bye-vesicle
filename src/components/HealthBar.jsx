import { useState } from "react";
import { motion } from "framer-motion";

export default function HealthBar({ boost, activeDay }) {
  const [imageError, setImageError] = useState(false);

  const day = Math.max(0, Math.min(activeDay, 30));
  const basePct = (day / 30) * 100;
  const displayPct = boost ? Math.min(basePct + 6, 100) : basePct;
  const avatarPct = Math.min(displayPct, 96);

  const phaseTag =
    day === 0  ? "PRE·OP" :
    day <= 3   ? "FASE·1" :
    day <= 10  ? "FASE·2" :
    day < 30   ? "FASE·3" : "FINAL";

  return (
    <div className="sticky top-0 z-30 bg-white border-b-4 border-black">
      <div className="max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 py-3">

        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
            VESICULÓMETRO
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-[var(--color-ink-soft)] tracking-widest">
              {phaseTag}
            </span>
            <span className="font-mono text-xl font-black tabular-nums leading-none">
              {day >= 30 ? "30" : day}
              <span className="text-[var(--color-ink-soft)] font-normal text-sm">/30</span>
            </span>
          </div>
        </div>

        {/* Bar container */}
        <div className="relative" style={{ height: 44 }}>
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 border-4 border-black bg-[var(--color-surface)] overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[var(--color-clinical)]"
              animate={{ width: `${displayPct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <div className="absolute inset-y-0 w-px bg-black/20 z-10" style={{ left: "10%" }} />
            <div className="absolute inset-y-0 w-px bg-black/20 z-10" style={{ left: "33.3%" }} />
          </div>

          {/* Sliding avatar — left edge tracks left% linearly, sin offset */}
          <motion.div
            className="absolute top-1/2 z-20"
            animate={{ left: `${avatarPct}%` }}
            style={{ translateY: "-50%", translateX: "0%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-11 h-11 rounded-full overflow-hidden border-4 border-black bg-[var(--color-clinical-soft)] flex items-center justify-center shadow-[3px_3px_0px_#000]">
              {!imageError ? (
                <img
                  src="/assets/cabeza-papa.png"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-base select-none">🧔</span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

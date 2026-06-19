import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock } from "lucide-react";

const phases = [
  {
    id: 1,
    title: "FASE 1",
    subtitle: "Días 1–3",
    name: "Dieta líquida",
    description: "Solo líquidos. La pringá, el choco y el jamoncito siguen vetados.",
    items: [
      "Caldo claro de pollo. El desayuno en la Cremita tendrá que esperar",
      "Agua e infusiones. Sin rebujito, sin tinto de verano, sin nada",
      "Gelatina sin grasa. Y sin membrillo también, por si acaso",
    ],
    dayStart: 1,
    dayEnd: 3,
  },
  {
    id: 2,
    title: "FASE 2",
    subtitle: "Días 4–10",
    name: "Dieta blanda",
    description: "Sabores suaves. El pollo asado mira desde la distancia.",
    items: [
      "Puré de verduras. Prohibido mencionar el jamoncito en su presencia",
      "Pollo hervido sin aliñar. Sin pringá, sin escabeche, sin nada de nada",
      "Tortilla francesa de huevo. La de morcilla de Burgos queda suspendida",
      "Arroz blanco. El arroz con choco y gambas sigue en lista de espera",
    ],
    dayStart: 4,
    dayEnd: 10,
  },
  {
    id: 3,
    title: "FASE 3",
    subtitle: "Días 11–30",
    name: "Reintroducción",
    description: "Comida de verdad. Con cabeza, que el cochinillo ya está ahí.",
    items: [
      "Comida casera variada. Los chicharrones también son variados, pero no",
      "Raciones normales. El cochinillo asado te está esperando pacientemente",
      "PREMIO: El antojo vetado — jamoncito, choco frito o lo que pida el cuerpo",
    ],
    dayStart: 11,
    dayEnd: 30,
  },
];

export default function RecoveryMenus({ activeDay }) {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const currentPhase = phases.find((p) => activeDay >= p.dayStart && activeDay <= p.dayEnd);
    if (currentPhase) setActiveTab(currentPhase.id);
  }, [activeDay]);

  const phase = phases.find((p) => p.id === activeTab);
  const rewardUnlocked = activeDay >= 30;

  return (
    <section className="pt-10 pb-10 border-t-4 border-black mt-8 -mx-4 px-4 bg-[#D4E6F1]">
      <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-ink-soft)] uppercase mb-1">
        PLAN NUTRICIONAL
      </p>
      <h2 className="font-sans text-3xl md:text-6xl font-black uppercase leading-none mb-6">
        Menú de<br />recuperación
      </h2>

      {/* Retro block tabs */}
      <div className="flex gap-0 mb-0 border-2 border-black">
        {phases.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveTab(p.id)}
            className={`
              flex-1 py-3 px-1 text-center border-r-2 border-black last:border-r-0
              transition-colors duration-75 font-mono
              ${activeTab === p.id
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-[var(--color-surface)]"
              }
            `}
          >
            <span className="block text-[9px] tracking-[0.15em] uppercase opacity-70 mb-0.5">
              {p.title}
            </span>
            <span className="block text-[11px] font-bold">{p.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="bg-white border-2 border-t-0 border-black p-5"
        >
          <h3 className="font-sans text-xl font-black uppercase mb-1">{phase.name}</h3>
          <p className="font-mono text-xs text-[var(--color-ink-soft)] mb-5">{phase.description}</p>

          <ul className="space-y-3">
            {phase.items.map((item, i) => {
              const isReward = item.startsWith("PREMIO");
              return (
                <li key={i} className="flex items-start gap-3">
                  {isReward ? (
                    <>
                      <span
                        className={`
                          w-6 h-6 border-2 border-black flex-shrink-0 mt-0.5
                          flex items-center justify-center
                          ${rewardUnlocked ? "bg-[var(--color-amber)]" : "bg-[var(--color-surface)]"}
                        `}
                      >
                        {rewardUnlocked
                          ? <span className="text-white text-xs font-black">★</span>
                          : <Lock size={10} className="text-[var(--color-ink-soft)]" />
                        }
                      </span>
                      <span className={`text-sm font-bold ${rewardUnlocked ? "text-[var(--color-amber)]" : "text-[var(--color-ink-soft)]"}`}>
                        {rewardUnlocked
                          ? "¡ANTOJO DESBLOQUEADO! Disfrútalo, campeón."
                          : item.replace("PREMIO: ", "")}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 border-2 border-black bg-[var(--color-clinical)] flex-shrink-0 mt-1.5" />
                      <span className="text-sm text-black leading-relaxed">{item}</span>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

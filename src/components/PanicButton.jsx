import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check } from "lucide-react";

// Web Audio API singleton — decoded into memory for zero-latency playback
let audioCtx = null;
let audioBuf = null;

async function preloadAudio() {
  if (audioBuf) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const res = await fetch("/assets/aullido-nahko-1.m4a");
    const ab = await res.arrayBuffer();
    audioBuf = await audioCtx.decodeAudioData(ab);
  } catch { }
}

function playAudio() {
  if (!audioCtx || !audioBuf) return;
  try {
    const play = () => {
      const src = audioCtx.createBufferSource();
      src.buffer = audioBuf;
      src.connect(audioCtx.destination);
      src.start(0);
    };
    if (audioCtx.state === "suspended") {
      audioCtx.resume().then(play);
    } else {
      play();
    }
  } catch { }
}

export default function PanicButton({ variant = "fab", active, onPress }) {
  useEffect(() => {
    preloadAudio();
  }, []);

  const handlePress = async () => {
    if (!active) {
      await preloadAudio(); // ensures AudioContext init inside user gesture on mobile
      playAudio();
      onPress();
    }
  };

  // ─── Card variant (inside header) ────────────────────────────────────────
  if (variant === "card") {
    return (
      <div>
        <button
          onClick={handlePress}
          disabled={active}
          className={`
            w-full border-4 border-black px-5 py-4
            flex items-center justify-between gap-4
            font-sans font-black text-white uppercase tracking-tight
            transition-all duration-75 select-none
            ${active
              ? "bg-green-700 border-green-400"
              : "bg-[var(--color-alert)] shadow-[6px_6px_0px_#000] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"
            }
          `}
        >
          <div className="text-left">
            <p className="font-mono text-[10px] tracking-[0.2em] text-white/60 font-normal mb-0.5">
              ASISTENCIA INMEDIATA
            </p>
            <p className="text-xl sm:text-2xl font-black leading-tight">
              {active ? "AVISO ENVIADO" : "SOLICITAR AYUDA AL SOFÁ"}
            </p>
          </div>
          <div className="flex-shrink-0">
            {active
              ? <Check size={28} strokeWidth={3} />
              : <Bell size={28} strokeWidth={2.5} />
            }
          </div>
        </button>

        <AnimatePresence>
          {active && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="font-mono text-xs text-black/60 pt-2 px-1 overflow-hidden"
            >
              Alerta recibida — Nahko y el equipo van de camino.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ─── FAB variant (always visible) ────────────────────────────────────────
  return (
    <>
      <button
        onClick={handlePress}
        disabled={active}
        className={`
          fixed bottom-6 right-4 z-40
          w-16 h-16 border-4 border-black
          flex items-center justify-center
          font-black text-white
          transition-all duration-75 select-none
          ${active
            ? "bg-[var(--color-clinical)] shadow-none"
            : "bg-[var(--color-alert)] shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1"
          }
        `}
        aria-label="Solicitar ayuda"
      >
        {active
          ? <Check size={24} strokeWidth={3} className="text-white" />
          : <Bell size={22} strokeWidth={2.5} className="text-white" />
        }
      </button>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-[88px] right-4 z-40 bg-black text-white font-mono text-xs
                       border-2 border-white px-4 py-2.5 max-w-[180px] leading-relaxed"
            style={{ boxShadow: "3px 3px 0 #fff" }}
          >
            ALERTA RECIBIDA.<br />Enfermeras de camino.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

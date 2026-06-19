import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { getCurrentDay } from "./utils/date";
import Header from "./components/Header";
import HealthBar from "./components/HealthBar";
import RecoveryCalendar from "./components/RecoveryCalendar";
import MedicalTeam from "./components/MedicalTeam";
import RecoveryMenus from "./components/RecoveryMenus";
import PanicButton from "./components/PanicButton";
import DevMode from "./components/DevMode";
import Diploma from "./components/Diploma";

function App() {
  const [alertActive, setAlertActive] = useState(false);
  const [boost, setBoost] = useState(false);
  const [devDay, setDevDay] = useState(null); // null = use real device date
  const [showDiploma, setShowDiploma] = useState(false);

  const realDay = getCurrentDay();
  const activeDay = devDay !== null ? devDay : realDay;

  const triggerAlert = () => {
    if (alertActive) return;
    setAlertActive(true);
    setTimeout(() => setAlertActive(false), 4000);
  };

  const triggerBoost = () => {
    setBoost(true);
    setTimeout(() => setBoost(false), 1800);
  };

  const changeDevDay = (delta) => {
    if (delta === "reset") {
      setDevDay(null);
      return;
    }
    const base = devDay !== null ? devDay : realDay;
    setDevDay(Math.max(0, Math.min(base + delta, 31)));
  };

  return (
    <div className="min-h-screen bg-[var(--color-base)]">
      <Header
        alertActive={alertActive}
        onPress={triggerAlert}
        activeDay={activeDay}
      />

      <HealthBar boost={boost} activeDay={activeDay} />

      <main className="max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4">

        {/* Completion banner — unlocks at day 30 */}
        {activeDay >= 30 && (
          <div className="mt-8 border-t-4 border-black pt-8">
            <div
              className="border-4 border-black bg-[var(--color-amber)] p-5 sm:p-7"
              style={{ boxShadow: "6px 6px 0px #000" }}
            >
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-1">
                ✦ Misión cumplida ✦
              </p>
              <h2 className="font-sans font-black text-4xl sm:text-5xl uppercase leading-none mb-3">
                ¡30 días<br />completados!
              </h2>
              <p className="font-mono text-xs mb-6 leading-relaxed">
                El equipo médico certifica la recuperación oficial.<br />
                Tu diploma está esperando.
              </p>
              <button
                onClick={() => setShowDiploma(true)}
                className="w-full border-4 border-black bg-black text-white
                           font-sans font-black uppercase text-sm py-4
                           shadow-[4px_4px_0px_#555]
                           active:shadow-none active:translate-x-1 active:translate-y-1
                           transition-all duration-75"
              >
                Ver Diploma Oficial →
              </button>
            </div>
          </div>
        )}

        <RecoveryCalendar onBoost={triggerBoost} activeDay={activeDay} />
        <MedicalTeam />
        <RecoveryMenus activeDay={activeDay} />

        <DevMode
          activeDay={activeDay}
          devDay={devDay}
          realDay={realDay}
          onChangeDay={changeDevDay}
        />
      </main>

      <PanicButton variant="fab" active={alertActive} onPress={triggerAlert} />

      <AnimatePresence>
        {showDiploma && (
          <Diploma onClose={() => setShowDiploma(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

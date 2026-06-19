import { useState } from "react";
import { getCurrentDay } from "./utils/date";
import Header from "./components/Header";
import HealthBar from "./components/HealthBar";
import RecoveryCalendar from "./components/RecoveryCalendar";
import MedicalTeam from "./components/MedicalTeam";
import RecoveryMenus from "./components/RecoveryMenus";
import PanicButton from "./components/PanicButton";
import DevMode from "./components/DevMode";

function App() {
  const [alertActive, setAlertActive] = useState(false);
  const [boost, setBoost] = useState(false);
  const [devDay, setDevDay] = useState(null); // null = use real device date

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
    </div>
  );
}

export default App;

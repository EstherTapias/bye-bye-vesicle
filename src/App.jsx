import ConsejoDelDia from "./components/ConsejoDelDia";
import Vesiculometro from "./components/Vesiculometro";
import EquipoMedico from "./components/EquipoMedico";
import MenusMichelin from "./components/MenusMichelin";
import BotonPanico from "./components/BotonPanico";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Popup diario — se monta una vez y gestiona su propia lógica */}
      <ConsejoDelDia />

      {/* Cabecera tipo "portal médico VIP" */}
      <header className="px-4 pt-8 pb-4 text-center">
        <p className="text-cyan-300 text-xs font-bold tracking-[0.2em] uppercase mb-2">
          Portal Médico VIP
        </p>
        <h1 className="text-white font-extrabold text-2xl leading-tight">
          Recuperación Express
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            de Papá 🦸
          </span>
        </h1>
      </header>

      <main className="max-w-md mx-auto">
        <Vesiculometro />
        <EquipoMedico />
        <MenusMichelin />
        <BotonPanico />
      </main>

      <footer className="text-center text-slate-500 text-xs py-8">
        Hecho con 💙 por tu Directora de Tecnología y Entretenimiento
      </footer>
    </div>
  );
}

export default App;

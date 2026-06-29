# Plan de Recuperación — Dashboard VIP del Paciente

Un tracker de recuperación postoperatoria hecho con mucho amor y bastante cachondeo para un paciente muy especial: mi padre, al que le quitaron la vesícula el 22 de junio de 2026 y que en ningún momento pidió que le hicieran una aplicación web al respecto.

## ¿Qué es esto?

Una cuenta atrás de 30 días disfrazada de panel médico. Incluye:

- **Calendario de Recuperación** — 30 días desbloqueables, cada uno con un consejo médico personalizado (aprobado por la familia, 0% avalado por ningún colegio de médicos)
- **Vesiculómetro** — una barra de vida neo-brutalista que mide el progreso sin vesícula
- **Equipo Médico** — tarjetas expandibles con el equipo de apoyo real: mi madre,mi hermana Marijose, Esther, Nahko mi perro y Kahla la conejita
- **Menús Michelin** — el plan de alimentación postoperatoria convertido en carta de restaurante de lujo
- **Botón de Pánico** — reproduce un aullido de mi perro Nahko y avisa a la enfermera de turno del sofá

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 + Vite 8 | Framework de la app |
| Tailwind CSS v4 | Estilos (con bloques `@theme {}`) |
| Framer Motion v12 | Animaciones |
| Lucide React | Iconos |
| Web Audio API | Reproducción de audio sin latencia |
| Vercel | Despliegue automático |

Sistema de diseño: **Neo-Brutalista** — bordes negros gruesos, sombras planas, Inter Black para títulos, JetBrains Mono para etiquetas, fondo crema envejecido.

## Instalación rápida

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) y visita al paciente.

## Despliegue

Cada push a `main` despliega automáticamente en Vercel.

## Estructura del proyecto

```
src/
├── components/
│   ├── Cabecera.jsx            # Header + botón de pánico en tarjeta
│   ├── Vesiculometro.jsx       # Barra de progreso fija
│   ├── CalendarioAdviento.jsx  # Calendario de 30 días + modal de consejos
│   ├── EquipoMedico.jsx        # Tarjetas expandibles del equipo médico
│   ├── MenusMichelin.jsx       # Menús de recuperación por fase
│   ├── BotonPanico.jsx         # Alerta de emergencia (Web Audio API singleton)
│   └── DevMode.jsx             # Panel para saltar días en desarrollo
├── data/
│   └── consejos.js             # 30 consejos diarios personalizados
└── utils/
    └── fecha.js                # Lógica de fechas: día de operación → día actual
```

## Notas técnicas

- El audio usa el patrón singleton de Web Audio API: el archivo se carga una vez, se decodifica en un buffer PCM y cada pulsación crea un nuevo `AudioBufferSourceNode` — sin petición de red ni decodificación en el momento de reproducir
- `handlePulsar` es `async` y hace `await precargarAudio()` para garantizar la inicialización del `AudioContext` dentro de un gesto de usuario en móvil
- El día actual se calcula automáticamente con `calcularDiaActual()` a partir de la fecha de operación, sin necesidad de configuración manual
- Los días pasados son clicables en el calendario para que el paciente pueda releer consejos anteriores
- El panel DevMode permite saltar al día que se quiera para probar cualquier estado de la app

---

*Hecho con amor, bastante cachondeo y demasiadas clases de Tailwind. Que te recuperes pronto, papá.*

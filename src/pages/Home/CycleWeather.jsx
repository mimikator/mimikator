import { useCycle } from "../../hooks/useCycle.js";

/**
 * CycleWeather — météo émotionnelle basée sur le cycle menstruel
 */
export function CycleWeather() {
  const phase = useCycle();

    return (
    <div className="flex flex-col gap-2">
        {/* Titre */}
        <div className="px-1">
        <h3
            className="text-sm font-semibold text-cerise"
            style={{
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.02em",
            }}
        >
            🌤️ Météo du jour de Mimi
        </h3>
        </div>

        {/* Card météo */}
        <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{
            background: `linear-gradient(135deg, ${phase.color}22, ${phase.color}11)`,
            border: `1px solid ${phase.color}44`,
            backdropFilter: "blur(8px)",
        }}
        >
        <span className="text-2xl">{phase.emoji}</span>

        <div className="flex-1 min-w-0">
            <p
            className="text-xs font-semibold truncate"
            style={{
                color: phase.color,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.05em",
            }}
            >
            {phase.label}
            </p>

            <p
            className="text-xs text-[#7D0507]/60 mt-0.5"
            style={{ fontFamily: "'Dancing Script', cursive" }}
            >
            {phase.mood}
            </p>
        </div>

        <div className="text-right flex-shrink-0">
            <p
            className="text-[10px] text-rosy/50 uppercase tracking-wider"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
            J.{phase.dayInCycle}
            </p>
        </div>
        </div>
    </div>
    );
}

export default CycleWeather;
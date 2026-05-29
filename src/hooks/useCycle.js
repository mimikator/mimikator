import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import APP_CONFIG from "../config/app.js";

/**
 * Phases du cycle (en jours depuis début des règles)
 */
const PHASES = [
  { id: "menstrual",   label: "Règles 🌊",         emoji: "🌊", start: 0,  end: 4,  color: "#D77374", mood: "Faire attention à bidou" },
  { id: "follicular",  label: "Énergie 🌱",          emoji: "🌱", start: 5,  end: 12, color: "#7B7E0F", mood: "Pleine d'énergie !" },
  { id: "ovulation",   label: "Pic d'énergie ✨",    emoji: "✨", start: 13, end: 16, color: "#C00F3D", mood: "Au top" },
  { id: "luteal",      label: "Phase calme 🍂",      emoji: "🍂", start: 17, end: 25, color: "#FB8BA3", mood: "Mode cocooning" },
];

export function useCycle() {
  const [config] = useLocalStorage("cycleConfig", APP_CONFIG.CYCLE_DEFAULT);

  const phase = useMemo(() => {
    const start = new Date(config.lastPeriodStart);
    const today = new Date();
    const diffDays = Math.floor((today - start) / 86400000);
    const dayInCycle = diffDays % config.cycleDuration;

    const current = PHASES.find(
      (p) => dayInCycle >= p.start && dayInCycle <= p.end
    ) ?? PHASES[3];

    return {
      ...current,
      dayInCycle,
      daysUntilNext: config.cycleDuration - dayInCycle,
    };
  }, [config]);

  return phase;
}

export default useCycle;
import { useEffect, useRef } from "react";

// Icônes flottantes mélangées
const ICONS = ["🌸", "🙀", "​🏍️"];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

/**
 * FloatingHearts — canvas de particules flottantes en arrière-plan
 * Pure CSS/JS, pas de dépendance externe
 */
export function FloatingHearts({ count = 18 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Crée les particules
    const particles = Array.from({ length: count }, (_, i) => {
      const el = document.createElement("span");
      el.textContent = ICONS[i % ICONS.length];
      el.style.cssText = `
        position: absolute;
        left: ${randomBetween(0, 100)}%;
        bottom: -40px;
        font-size: ${randomBetween(14, 26)}px;
        opacity: ${randomBetween(0.25, 0.55)};
        pointer-events: none;
        user-select: none;
        animation: floatUp ${randomBetween(8, 18)}s linear ${randomBetween(0, 12)}s infinite;
        will-change: transform;
      `;
      return el;
    });

    particles.forEach((p) => container.appendChild(p));
    return () => particles.forEach((p) => p.remove());
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

export default FloatingHearts;
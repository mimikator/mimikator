import { useEffect, useRef } from "react";

const COLORS = ["#C00F3D", "#FB8BA3", "#FFB1C2", "#FFD4C9", "#D77374", "#7B7E0F"];
const SHAPES = ["●", "★", "♥", "✦", "▲"];

/**
 * Confetti — explosion de confettis depuis un point central
 * Appelé en one-shot : monte/descend puis disparaît
 */
export function triggerConfetti(originEl) {
  const rect = originEl
    ? originEl.getBoundingClientRect()
    : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };

  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  Array.from({ length: 22 }).forEach(() => {
    const el = document.createElement("span");
    el.textContent = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const angle = Math.random() * 360;
    const dist  = 60 + Math.random() * 100;
    const dx = Math.cos((angle * Math.PI) / 180) * dist;
    const dy = Math.sin((angle * Math.PI) / 180) * dist - 60;
    el.style.cssText = `
      position: fixed;
      left: ${cx}px;
      top: ${cy}px;
      font-size: ${8 + Math.random() * 10}px;
      color: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94),
                  opacity 0.7s ease;
      opacity: 1;
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${angle * 2}deg)`;
        el.style.opacity = "0";
      });
    });
    setTimeout(() => el.remove(), 750);
  });
}
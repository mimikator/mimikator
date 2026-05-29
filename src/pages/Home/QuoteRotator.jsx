import { useState, useEffect, useCallback } from "react";
import QUOTES from "../../data/quotes.js";

/**
 * QuoteRotator — citation romantique animée en CSS pur
 * Change toutes les 8 secondes, cliquable pour passer à la suivante
 */
export function QuoteRotator() {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * QUOTES.length)
  );
  const [visible, setVisible] = useState(true);

  const next = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
      setVisible(true);
    }, 400);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 8000);
    return () => clearInterval(id);
  }, [next]);

  const quote = QUOTES[index];

  return (
    <button
      onClick={next}
      className="w-full text-center px-6 py-5 rounded-3xl cursor-pointer transition-all active:scale-[0.97]"
      style={{
        background: "rgba(255,177,194,0.12)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,177,194,0.25)",
        boxShadow: "0 2px 20px rgba(192,15,61,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
      aria-label="Citation suivante"
    >
      <p
        className="text-base leading-relaxed text-cerise/80 italic"
        style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.1rem" }}
      >
        "{quote.text}"
      </p>
      {quote.author && (
        <p
          className="mt-2 text-xs text-rosy/60"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          — {quote.author}
        </p>
      )}
      <p
        className="mt-3 text-[10px] text-powder/50 uppercase tracking-widest"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        appuie pour changer ✨
      </p>
    </button>
  );
}

export default QuoteRotator;
import { useState, useRef } from "react";
import { triggerConfetti } from "../../components/animations/Confetti.js";
import { CATEGORIES } from "../../data/rules.js";

const CATS = CATEGORIES.filter((c) => c.id !== "tous");

/**
 * RuleEditor — formulaire d'ajout de règle avec animation d'apparition
 */
export function RuleEditor({ onAdd, onClose }) {
  const [text, setText]   = useState("");
  const [cat,  setCat]    = useState("serieuse");
  const btnRef            = useRef(null);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    triggerConfetti(btnRef.current);

    onAdd({
      id:        `r${Date.now()}`,
      text:      trimmed,
      category:  cat,
      hearts:    0,
      createdAt: new Date().toISOString().slice(0, 10),
    });

    setText("");
    onClose();
  };

  return (
    <div
      className="rounded-3xl px-5 py-6 flex flex-col gap-4"
      style={{
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(18px)",
        border: "1.5px solid rgba(255,177,194,0.4)",
        boxShadow: "0 8px 40px rgba(192,15,61,0.10)",
      }}
    >
      <h3
        className="text-base font-bold text-cerise"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        ✍️ Nouvelle règle
      </h3>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écrire la règle ici…"
        rows={3}
        className="w-full rounded-2xl px-4 py-3 text-sm text-cerise/80 resize-none outline-none placeholder:text-rosy/40"
        style={{
          background: "rgba(255,177,194,0.10)",
          border: "1.5px solid rgba(255,177,194,0.35)",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.5,
        }}
        autoFocus
      />

      {/* Catégories */}
      <div className="flex gap-2 flex-wrap">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all active:scale-95"
            style={{
              background: cat === c.id ? c.color : `${c.color}18`,
              color:      cat === c.id ? "#fff"  : c.color,
              border:     `1.5px solid ${c.color}44`,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-3 rounded-2xl text-sm font-semibold text-rosy/60 transition-all active:scale-95"
          style={{
            background: "rgba(255,177,194,0.12)",
            border: "1px solid rgba(255,177,194,0.25)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Annuler
        </button>
        <button
          ref={btnRef}
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-40"
          style={{
            background: "linear-gradient(135deg, #C00F3D, #D77374)",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 4px 16px rgba(192,15,61,0.30)",
          }}
        >
          Ajouter ✨
        </button>
      </div>
    </div>
  );
}

export default RuleEditor;
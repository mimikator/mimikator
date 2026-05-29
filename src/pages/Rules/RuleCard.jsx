import { useState, useRef } from "react";
import { triggerConfetti } from "../../components/animations/Confetti.js";
import { CATEGORIES } from "../../data/rules.js";

const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

/**
 * RuleCard — carte avec flip 3D, vote cœur, suppression
 */
export function RuleCard({ rule, onHeart, onDelete }) {
  const [flipped, setFlipped]   = useState(false);
  const [beating, setBeating]   = useState(false);
  const [leaving, setLeaving]   = useState(false);
  const heartBtnRef             = useRef(null);

  const cat = CAT_MAP[rule.category] ?? CAT_MAP["serieuse"];

  const handleHeart = (e) => {
    e.stopPropagation();
    if (beating) return;
    setBeating(true);
    triggerConfetti(heartBtnRef.current);
    onHeart(rule.id);
    setTimeout(() => setBeating(false), 600);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setLeaving(true);
    setTimeout(() => onDelete(rule.id), 380);
  };

  return (
    <div
      className="w-full cursor-pointer select-none"
      style={{
        perspective: "800px",
        opacity: leaving ? 0 : 1,
        transform: leaving ? "translateX(60px) scale(0.9)" : "none",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
      onClick={() => setFlipped((f) => !f)}
    >
      {/* Conteneur flip */}
      <div
        className="relative w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
          height: "170px",
        }}
      >
        {/* ── FACE AVANT ── */}
        <div
          className="absolute inset-0 rounded-3xl px-5 py-4 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(14px)",
            border: `1.5px solid ${cat.color}33`,
            boxShadow: `0 4px 24px ${cat.color}14`,
            height: "170px",
          }}
        >
          {/* Catégorie */}
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: `${cat.color}18`,
                color: cat.color,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {cat.emoji} {cat.label}
            </span>
            <span
              className="text-[10px] text-rosy/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              touche pour retourner
            </span>
          </div>

          {/* Texte */}
          <p
            className="text-[15px] leading-snug text-cerise/85 flex-1 flex items-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {rule.text}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3">
            <button
              ref={heartBtnRef}
              onClick={handleHeart}
              className="flex items-center gap-1.5 transition-all active:scale-90"
              style={{
                transform: beating ? "scale(1.35)" : "scale(1)",
                transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <span className="text-lg">{beating ? "💖" : "🤍"}</span>
              <span
                className="text-xs font-semibold"
                style={{ color: cat.color, fontFamily: "'DM Sans', sans-serif" }}
              >
                {rule.hearts}
              </span>
            </button>

            <button
              onClick={handleDelete}
              className="text-xs text-rosy/30 hover:text-fraise/60 transition-colors px-2 py-1 rounded-xl"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── FACE ARRIÈRE ── */}
        <div
          className="absolute inset-0 rounded-3xl px-5 py-4 flex flex-col items-center justify-center gap-3"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${cat.color}22, ${cat.color}0a)`,
            border: `1.5px solid ${cat.color}44`,
            height: "170px",
          }}
        >
          <span className="text-4xl">{cat.emoji}</span>
          <p
            className="text-xs text-center uppercase tracking-widest font-semibold"
            style={{ color: cat.color, fontFamily: "'DM Sans', sans-serif" }}
          >
            {cat.label}
          </p>
          <p
            className="text-[10px] text-rosy/40 text-center"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            ajoutée le {new Date(rule.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RuleCard;
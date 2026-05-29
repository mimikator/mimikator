import { useState, useRef } from "react";
import { PRIORITIES, TAG_COLORS } from "../../data/todos.js";

const PRIO_MAP = Object.fromEntries(PRIORITIES.map((p) => [p.id, p]));

/**
 * TodoItem — checkbox animée + swipe gauche pour supprimer (mobile)
 */
export function TodoItem({ item, onToggle, onDelete }) {
  const [leaving,   setLeaving]   = useState(false);
  const [checking,  setChecking]  = useState(false);
  // Swipe
  const touchStartX = useRef(null);
  const [swipeX,    setSwipeX]    = useState(0);
  const [swiping,   setSwiping]   = useState(false);

  const prio     = PRIO_MAP[item.priority] ?? PRIO_MAP["peche"];
  const tagColor = TAG_COLORS[item.tag] ?? "#D77374";

  /* ── Toggle ── */
  const handleToggle = () => {
    setChecking(true);
    setTimeout(() => {
      onToggle(item.id);
      setChecking(false);
    }, 280);
  };

  /* ── Delete avec animation ── */
  const triggerDelete = () => {
    setLeaving(true);
    setTimeout(() => onDelete(item.id), 350);
  };

  /* ── Swipe handlers ── */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setSwiping(true);
  };
  const onTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    if (dx < 0) setSwipeX(Math.max(dx, -90));
  };
  const onTouchEnd = () => {
    setSwiping(false);
    if (swipeX < -60) {
      triggerDelete();
    } else {
      setSwipeX(0);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        opacity:   leaving ? 0 : 1,
        transform: leaving ? "translateX(60px) scale(0.95)" : "none",
        transition: "opacity 0.32s ease, transform 0.32s ease",
        marginBottom: "0px",
      }}
    >
      {/* Fond rouge derrière (révélé au swipe) */}
      <div
        className="absolute inset-0 rounded-2xl flex items-center justify-end pr-5"
        style={{ background: "linear-gradient(90deg, transparent, #C00F3D)" }}
      >
        <span className="text-white text-lg">🗑️</span>
      </div>

      {/* Carte principale */}
      <div
        className="relative flex items-center gap-3 px-4 py-3.5 rounded-2xl"
        style={{
          background: item.done
            ? "rgba(255,255,255,0.30)"
            : "rgba(255,255,255,0.55)",
          backdropFilter: "blur(12px)",
          border: item.done
            ? "1px solid rgba(255,177,194,0.15)"
            : `1px solid ${prio.color}28`,
          boxShadow: item.done ? "none" : `0 2px 16px ${prio.color}0e`,
          transform: `translateX(${swipeX}px)`,
          transition: swiping ? "none" : "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          touchAction: "pan-y",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
          style={{
            borderColor:  item.done ? "#C00F3D" : `${prio.color}80`,
            background:   item.done ? "#C00F3D" : "transparent",
            transform:    checking  ? "scale(1.3)" : "scale(1)",
            transition:   "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, border-color 0.2s",
          }}
        >
          {item.done && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* Texte + tags */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm leading-snug"
            style={{
              fontFamily:      "'DM Sans', sans-serif",
              color:           item.done ? "rgba(125,5,7,0.35)" : "#7D0507",
              textDecoration:  item.done ? "line-through" : "none",
              fontWeight:      item.done ? 400 : 500,
            }}
          >
            {item.text}
          </p>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            {/* Tag */}
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{
                background: `${tagColor}18`,
                color:       tagColor,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {item.tag}
            </span>
            {/* Priorité dot */}
            <span className="text-[10px]">{prio.dot}</span>
          </div>
        </div>

        {/* Bouton supprimer (desktop / fallback) */}
        <button
          onClick={triggerDelete}
          className="flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-rosy/30 hover:text-fraise/60 transition-colors"
          aria-label="Supprimer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
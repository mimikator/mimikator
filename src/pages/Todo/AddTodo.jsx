import { useState } from "react";
import { PRIORITIES } from "../../data/todos.js";

const QUICK_TAGS = ["romantique", "voyage", "activité", "sortie", "vie", "moto", "musique", "souvenirs"];

/**
 * AddTodo — formulaire ajout rapide (entrée clavier + options)
 */
export function AddTodo({ onAdd, accentColor }) {
  const [text,     setText]     = useState("");
  const [priority, setPriority] = useState("rose");
  const [tag,      setTag]      = useState("activité");
  const [expanded, setExpanded] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && text.trim()) submit();
  };

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd({
      id:        `t${Date.now()}`,
      text:      trimmed,
      done:      false,
      priority,
      tag,
      createdAt: new Date().toISOString().slice(0, 10),
    });
    setText("");
    setExpanded(false);
  };

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(14px)",
        border: `1.5px solid ${accentColor}30`,
        boxShadow: `0 4px 20px ${accentColor}0e`,
      }}
    >
      {/* Ligne principale */}
      <div className="flex items-center gap-2 px-4 py-3">
        <span className="text-lg flex-shrink-0">✏️</span>
        <input
          type="text"
          value={text}
          onChange={(e) => { setText(e.target.value); if (!expanded && e.target.value) setExpanded(true); }}
          onKeyDown={handleKeyDown}
          onFocus={() => setExpanded(true)}
          placeholder="Ajouter un élément…"
          className="flex-1 bg-transparent outline-none text-sm text-cerise/80 placeholder:text-rosy/40"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        {text.trim() && (
          <button
            onClick={submit}
            className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm transition-all active:scale-90"
            style={{ background: accentColor }}
          >
            ↵
          </button>
        )}
      </div>

      {/* Options étendues */}
      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-rosy/10 pt-3">
          {/* Priorité */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-rosy/50 w-14 flex-shrink-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>Priorité</span>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all active:scale-95"
                  style={{
                    background: priority === p.id ? p.color : `${p.color}20`,
                    color:      priority === p.id ? (p.id === "peche" ? "#7D0507" : "#fff") : p.color,
                    border:     `1.5px solid ${p.color}44`,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {p.dot} {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tag */}
          <div className="flex items-start gap-2">
            <span className="text-[10px] uppercase tracking-wider text-rosy/50 w-14 flex-shrink-0 pt-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Tag</span>
            <div className="flex gap-1.5 flex-wrap">
              {QUICK_TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className="text-[10px] px-2.5 py-1 rounded-full transition-all active:scale-95"
                  style={{
                    background: tag === t ? accentColor : `${accentColor}14`,
                    color:      tag === t ? "#fff"      : accentColor,
                    border:     `1px solid ${accentColor}30`,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTodo;
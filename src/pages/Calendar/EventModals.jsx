import { useState } from "react";
import { EVENT_TYPES } from "../../data/calendar.js";

const TYPE_MAP = Object.fromEntries(EVENT_TYPES.map((t) => [t.id, t]));

// ── Modale de détail d'un événement existant ──
export function EventDetailModal({ event, onClose, onDelete }) {
  const type    = TYPE_MAP[event.type] ?? EVENT_TYPES[0];
  const dateObj = new Date(event.date + "T12:00:00");
  const dateStr = dateObj.toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  // Jours depuis / dans combien de jours
  const today     = new Date(); today.setHours(0,0,0,0);
  const evDate    = new Date(event.date + "T00:00:00");
  const diffDays  = Math.round((today - evDate) / 86400000);
  const isPast    = diffDays > 0;
  const isToday   = diffDays === 0;

  // Prochain anniversaire annuel
  const nextAnniv = (() => {
    const d = new Date(event.date + "T00:00:00");
    const next = new Date(today.getFullYear(), d.getMonth(), d.getDate());
    if (next < today) next.setFullYear(today.getFullYear() + 1);
    const daysLeft = Math.round((next - today) / 86400000);
    return daysLeft;
  })();

  const years = Math.floor(Math.abs(diffDays) / 365);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4"
      style={{ background: "rgba(125,5,7,0.25)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,248,250,0.98)",
          border: "1.5px solid rgba(255,177,194,0.4)",
          boxShadow: "0 -8px 50px rgba(192,15,61,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bandeau coloré */}
        <div className="px-6 py-6 flex flex-col items-center text-center gap-2"
          style={{ background: `linear-gradient(135deg, ${event.color}22, ${event.color}0a)` }}>
          <span className="text-5xl">{event.emoji}</span>
          <h2 className="text-xl font-bold text-cerise mt-1"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {event.title}
          </h2>
          <span className="text-xs px-3 py-1 rounded-full font-semibold capitalize"
            style={{ background: `${event.color}20`, color: event.color, fontFamily: "'DM Sans', sans-serif" }}>
            {type.emoji} {type.label}
          </span>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Date */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: "rgba(255,177,194,0.10)", border: "1px solid rgba(255,177,194,0.20)" }}>
            <span className="text-xl">📅</span>
            <div>
              <p className="text-sm font-semibold text-cerise/80 capitalize"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>{dateStr}</p>
              <p className="text-[11px] text-rosy/60 mt-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {isToday
                  ? "🎉 C'est aujourd'hui !"
                  : isPast
                    ? `Il y a ${diffDays === 1 ? "1 jour" : diffDays < 365 ? `${diffDays} jours` : `${years} an${years > 1 ? "s" : ""}`}`
                    : `Dans ${Math.abs(diffDays)} jour${Math.abs(diffDays) > 1 ? "s" : ""}`
                }
                {isPast && !isToday && nextAnniv > 0 && (
                  <span className="ml-2 text-fraise/60">· prochain dans {nextAnniv} j</span>
                )}
              </p>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="px-4 py-3 rounded-2xl"
              style={{ background: "rgba(255,177,194,0.08)", border: "1px solid rgba(255,177,194,0.15)" }}>
              <p className="text-sm leading-relaxed text-cerise/70 italic"
                style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1rem" }}>
                "{event.description}"
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-1">
            <button onClick={() => onDelete(event.id)}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-95 text-rosy/50"
              style={{ background: "rgba(255,177,194,0.12)", border: "1px solid rgba(255,177,194,0.20)", fontFamily: "'DM Sans', sans-serif" }}>
              🗑️ Supprimer
            </button>
            <button onClick={onClose}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #C00F3D, #D77374)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px rgba(192,15,61,0.25)" }}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Modale d'ajout d'un événement ──
export function AddEventModal({ selectedDate, onAdd, onClose }) {
  const [title,       setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [date,        setDate]        = useState(
    selectedDate ?? new Date().toISOString().slice(0, 10)
  );
  const [type,        setType]        = useState("anniversaire");
  const [emoji,       setEmoji]       = useState("💑");

  const EMOJI_OPTIONS = ["💑","🎂","🏍️","✈️","🌸","✨","🎉","💕","🌟","🥂","🏠","🐱"];

  const selectedType = EVENT_TYPES.find((t) => t.id === type) ?? EVENT_TYPES[0];

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({
      id:          `e${Date.now()}`,
      title:       title.trim(),
      description: description.trim(),
      date,
      emoji,
      color:       selectedType.color,
      type,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4"
      style={{ background: "rgba(125,5,7,0.25)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl px-6 py-6 flex flex-col gap-4"
        style={{
          background: "rgba(255,248,250,0.98)",
          border: "1.5px solid rgba(255,177,194,0.4)",
          boxShadow: "0 -8px 50px rgba(192,15,61,0.18)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-cerise" style={{ fontFamily: "'Playfair Display', serif" }}>
            ✨ Nouvelle date importante
          </h3>
          <button onClick={onClose} className="text-rosy/40 text-xl w-8 h-8 flex items-center justify-center">×</button>
        </div>

        {/* Emoji picker */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-rosy/50 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Emoji</p>
          <div className="flex flex-wrap gap-2">
            {EMOJI_OPTIONS.map((e) => (
              <button key={e} onClick={() => setEmoji(e)}
                className="w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all active:scale-90"
                style={{
                  background: emoji === e ? "rgba(192,15,61,0.15)" : "rgba(255,177,194,0.10)",
                  border: `1.5px solid ${emoji === e ? "#C00F3D" : "rgba(255,177,194,0.25)"}`,
                }}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Titre */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-rosy/50 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Titre *</p>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Notre premier jour ensemble…"
            className="w-full rounded-2xl px-4 py-3 text-sm text-cerise/80 outline-none placeholder:text-rosy/30"
            style={{ background: "rgba(255,177,194,0.10)", border: "1.5px solid rgba(255,177,194,0.30)", fontFamily: "'DM Sans', sans-serif" }}
            autoFocus
          />
        </div>

        {/* Date */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-rosy/50 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Date *</p>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-2xl px-4 py-3 text-sm text-cerise/80 outline-none"
            style={{ background: "rgba(255,177,194,0.10)", border: "1.5px solid rgba(255,177,194,0.30)", fontFamily: "'DM Sans', sans-serif" }}
          />
        </div>

        {/* Type */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-rosy/50 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Catégorie</p>
          <div className="flex gap-2 flex-wrap">
            {EVENT_TYPES.map((t) => (
              <button key={t.id} onClick={() => setType(t.id)}
                className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all active:scale-95"
                style={{
                  background: type === t.id ? t.color : `${t.color}15`,
                  color:      type === t.id ? "#fff"  : t.color,
                  border:     `1.5px solid ${t.color}40`,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-rosy/50 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Description</p>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Raconte ce moment… 🌸"
            rows={3}
            className="w-full rounded-2xl px-4 py-3 text-sm text-cerise/80 outline-none resize-none placeholder:text-rosy/30"
            style={{ background: "rgba(255,177,194,0.10)", border: "1.5px solid rgba(255,177,194,0.30)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
          />
        </div>

        {/* Boutons */}
        <div className="flex gap-3 pt-1">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-2xl text-sm font-semibold text-rosy/50 transition-all active:scale-95"
            style={{ background: "rgba(255,177,194,0.12)", border: "1px solid rgba(255,177,194,0.22)", fontFamily: "'DM Sans', sans-serif" }}>
            Annuler
          </button>
          <button onClick={handleSubmit} disabled={!title.trim()}
            className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #C00F3D, #D77374)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px rgba(192,15,61,0.28)" }}>
            Ajouter ✨
          </button>
        </div>
      </div>
    </div>
  );
}
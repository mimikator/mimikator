import { useMemo } from "react";
import { EVENT_TYPES } from "../../data/calendar.js";

const TYPE_MAP = Object.fromEntries(EVENT_TYPES.map((t) => [t.id, t]));

/**
 * UpcomingEvents — liste triée des dates importantes avec countdown
 */
export function UpcomingEvents({ events, onEventClick }) {
  const today = new Date(); today.setHours(0,0,0,0);

  const sorted = useMemo(() => {
    return events
      .map((ev) => {
        const evDate = new Date(ev.date + "T00:00:00");
        const diffDays = Math.round((today - evDate) / 86400000);
        const isPast = diffDays > 0;
        const isToday = diffDays === 0;

        // Prochain anniversaire annuel
        const next = new Date(today.getFullYear(), evDate.getMonth(), evDate.getDate());
        if (next < today) next.setFullYear(today.getFullYear() + 1);
        const daysUntilNext = Math.round((next - today) / 86400000);

        const years = Math.floor(Math.abs(diffDays) / 365);

        return { ...ev, evDate, diffDays, isPast, isToday, daysUntilNext, years };
      })
      .sort((a, b) => a.daysUntilNext - b.daysUntilNext);
  }, [events]);

  if (sorted.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-rosy/50 px-1"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Dates importantes
      </p>

      {sorted.map((ev) => {
        const type = TYPE_MAP[ev.type] ?? EVENT_TYPES[0];
        const dateStr = ev.evDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });

        return (
          <button
            key={ev.id}
            onClick={() => onEventClick(ev)}
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all active:scale-[0.98]"
            style={{
              background: "rgba(255,255,255,0.50)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${ev.color}28`,
              boxShadow: `0 2px 16px ${ev.color}0a`,
            }}
          >
            {/* Emoji */}
            <span className="text-2xl flex-shrink-0">{ev.emoji}</span>

            {/* Infos */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-cerise/85 truncate"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {ev.title}
              </p>
              <p className="text-[11px] text-rosy/55 mt-0.5 capitalize"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {dateStr}
                {ev.years > 0 && ` · ${ev.years} an${ev.years > 1 ? "s" : ""}`}
              </p>
            </div>

            {/* Countdown */}
            <div className="flex-shrink-0 text-right">
              {ev.isToday ? (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ background: "#C00F3D", fontFamily: "'DM Sans', sans-serif" }}>
                  Aujourd'hui 🎉
                </span>
              ) : ev.daysUntilNext === 0 ? (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ background: "#C00F3D", fontFamily: "'DM Sans', sans-serif" }}>
                  🎉
                </span>
              ) : (
                <div>
                  <p className="text-base font-bold"
                    style={{ color: ev.color, fontFamily: "'Playfair Display', serif" }}>
                    {ev.daysUntilNext}j
                  </p>
                  <p className="text-[9px] text-rosy/40 uppercase tracking-wider"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    dans
                  </p>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default UpcomingEvents;
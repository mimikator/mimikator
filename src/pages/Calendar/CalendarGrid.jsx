import { MONTHS_FR, DAYS_FR } from "../../data/calendar.js";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year, month) {
  // 0=lun … 6=dim
  return (new Date(year, month, 1).getDay() + 6) % 7;
}

/**
 * CalendarGrid — grille mensuelle avec points d'événements
 */
export function CalendarGrid({ year, month, events, onDayClick, onPrev, onNext }) {
  const today      = new Date();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay   = getFirstDayOfWeek(year, month);

  // Index events par jour
  const eventsByDay = {};
  events.forEach((ev) => {
    const d = new Date(ev.date + "T12:00:00");
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(ev);
    }
  });

  const isToday = (d) =>
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === d;

  const cells = [];
  // Cellules vides avant le 1er
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.50)",
        backdropFilter: "blur(16px)",
        border: "1.5px solid rgba(255,177,194,0.30)",
        boxShadow: "0 4px 24px rgba(192,15,61,0.07)",
      }}
    >
      {/* Navigation mois */}
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={onPrev}
          className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all active:scale-90"
          style={{ background: "rgba(255,177,194,0.18)", border: "1px solid rgba(255,177,194,0.30)" }}>
          <span className="text-sm text-cerise/70">‹</span>
        </button>

        <div className="text-center">
          <p className="text-base font-bold text-cerise"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {MONTHS_FR[month]}
          </p>
          <p className="text-xs text-rosy/50"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>{year}</p>
        </div>

        <button onClick={onNext}
          className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all active:scale-90"
          style={{ background: "rgba(255,177,194,0.18)", border: "1px solid rgba(255,177,194,0.30)" }}>
          <span className="text-sm text-cerise/70">›</span>
        </button>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 px-3 pb-1">
        {DAYS_FR.map((d) => (
          <div key={d} className="text-center py-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-rosy/50"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>{d}</span>
          </div>
        ))}
      </div>

      {/* Grille */}
      <div className="grid grid-cols-7 gap-0.5 px-3 pb-4">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const evs    = eventsByDay[day] ?? [];
          const hasEv  = evs.length > 0;
          const todayDay = isToday(day);

          return (
            <button
              key={day}
              onClick={() => onDayClick(day, evs)}
              className="relative flex flex-col items-center justify-center rounded-xl py-1.5 transition-all active:scale-90"
              style={{
                background: todayDay
                  ? "linear-gradient(135deg, #C00F3D, #D77374)"
                  : hasEv
                    ? "rgba(192,15,61,0.08)"
                    : "transparent",
                minHeight: "40px",
              }}
            >
              <span
                className="text-sm font-semibold leading-none"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: todayDay ? "#fff" : hasEv ? "#C00F3D" : "#7D0507",
                  opacity: todayDay ? 1 : 0.8,
                }}
              >
                {day}
              </span>

              {/* Points événements */}
              {hasEv && (
                <div className="flex gap-0.5 mt-1">
                  {evs.slice(0, 3).map((ev, idx) => (
                    <span key={idx} className="w-1 h-1 rounded-full"
                      style={{ background: todayDay ? "rgba(255,255,255,0.8)" : ev.color }} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;
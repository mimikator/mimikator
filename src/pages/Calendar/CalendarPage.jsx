import { useState } from "react";
import { Link }                     from "react-router-dom";
import { useGitHub }                from "../../hooks/useGitHub.js";
import { DEFAULT_EVENTS }           from "../../data/calendar.js";
import { CalendarGrid }             from "./CalendarGrid.jsx";
import { UpcomingEvents }           from "./UpcomingEvents.jsx";
import { EventDetailModal, AddEventModal } from "./EventModals.jsx";
import { SyncBadge }                from "../../components/ui/SyncBadge.jsx";
import { GitHubSetup }              from "../../components/ui/GitHubSetup.jsx";

/**
 * CalendarPage — calendrier des dates importantes
 */
export function CalendarPage() {
  const today = new Date();

  const { data: events, save, loading, error, synced } = useGitHub(
    "data/calendar/events.json",
    "coupleCalendar",
    DEFAULT_EVENTS
  );

  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const [selectedEvent,  setSelectedEvent]  = useState(null); // EventDetailModal
  const [addDate,        setAddDate]        = useState(null); // AddEventModal (date présélectionnée ou "")
  const [showSetup,      setShowSetup]      = useState(false);

  /* ── Navigation mois ── */
  const prevMonth = () => {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); }
    else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); }
    else setMonth((m) => m + 1);
  };

  /* ── Clic sur un jour ── */
  const handleDayClick = (day, evs) => {
    if (evs.length === 1) {
      setSelectedEvent(evs[0]);
    } else if (evs.length > 1) {
      setSelectedEvent(evs[0]); // pour l'instant on affiche le 1er
    } else {
      // Jour vide → ouvrir ajout avec date présélectionnée
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      setAddDate(dateStr);
    }
  };

  /* ── Mutations ── */
  const handleAdd = (event) => {
    save([...(events ?? []), event]);
    setAddDate(null);
  };

  const handleDelete = (id) => {
    save((events ?? []).filter((e) => e.id !== id));
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #FFF0F4 0%, #FFD4C9 40%, #FFB1C2 75%, #F9F8FE 100%)" }}>

      {showSetup    && <GitHubSetup onClose={() => setShowSetup(false)} />}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onDelete={handleDelete}
        />
      )}
      {addDate !== null && (
        <AddEventModal
          selectedDate={addDate}
          onAdd={handleAdd}
          onClose={() => setAddDate(null)}
        />
      )}

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 px-4 pt-safe pb-3"
        style={{ background: "rgba(255,240,244,0.82)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,177,194,0.22)" }}>
        <div className="max-w-md mx-auto flex items-center gap-3 pt-4 pb-2">
          <Link to="/"
            className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
            style={{ background: "rgba(255,177,194,0.20)", border: "1px solid rgba(255,177,194,0.35)" }}>
            <span className="text-sm">←</span>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-cerise"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                📅 Calendrier
              </h1>
              <button onClick={() => setShowSetup(true)}>
                <SyncBadge synced={synced} loading={loading} error={error} />
              </button>
            </div>
            <p className="text-[11px] text-rosy/60"
              style={{ fontFamily: "'Dancing Script', cursive" }}>
              {(events ?? []).length} date{(events ?? []).length > 1 ? "s" : ""} importante{(events ?? []).length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Bouton ajout */}
          <button
            onClick={() => setAddDate("")}
            className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
            style={{ background: "linear-gradient(135deg, #C00F3D, #D77374)", boxShadow: "0 3px 12px rgba(192,15,61,0.30)" }}>
            <span className="text-white text-lg font-bold leading-none">+</span>
          </button>
        </div>
      </header>

      {/* ── Contenu ── */}
      <main className="flex-1 px-4 py-4 max-w-md mx-auto w-full flex flex-col gap-5">

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <span className="text-3xl animate-pulse">🌸</span>
            <p className="text-sm text-rosy/50" style={{ fontFamily: "'Dancing Script', cursive" }}>Chargement…</p>
          </div>
        ) : (
          <>
            {/* Calendrier */}
            <CalendarGrid
              year={year}
              month={month}
              events={events ?? []}
              onDayClick={handleDayClick}
              onPrev={prevMonth}
              onNext={nextMonth}
            />

            {/* Liste dates importantes */}
            <UpcomingEvents
              events={events ?? []}
              onEventClick={setSelectedEvent}
            />

            {(events ?? []).length === 0 && (
              <div className="flex flex-col items-center py-10 gap-3">
                <span className="text-5xl">📭</span>
                <p className="text-base text-cerise/50 text-center"
                  style={{ fontFamily: "'Dancing Script', cursive" }}>
                  Ajoutez vos premières dates importantes 🌸
                </p>
                <button onClick={() => setAddDate("")}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #C00F3D, #D77374)", fontFamily: "'DM Sans', sans-serif" }}>
                  + Ajouter une date
                </button>
              </div>
            )}
          </>
        )}

        <div className="h-6" />
      </main>
    </div>
  );
}

export default CalendarPage;
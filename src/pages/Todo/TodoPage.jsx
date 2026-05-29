import { useState } from "react";
import { Link }                       from "react-router-dom";
import { useGitHub }                  from "../../hooks/useGitHub.js";
import { DEFAULT_TODOS, TABS }        from "../../data/todos.js";
import { TodoItem }                   from "./TodoItem.jsx";
import { AddTodo }                    from "./AddTodo.jsx";
import { TodoStats }                  from "./TodoStats.jsx";
import { SyncBadge }                  from "../../components/ui/SyncBadge.jsx";
import { GitHubSetup }                from "../../components/ui/GitHubSetup.jsx";

/**
 * TodoPage — To-do & Bucket list (3 onglets) — sync GitHub
 */
export function TodoPage() {
  const { data, save, loading, error, synced } = useGitHub(
    "data/todos/todos.json",
    "coupleTodos",
    DEFAULT_TODOS
  );

  const [activeTab, setActiveTab]   = useState("dates");
  const [showDone, setShowDone]     = useState(false);
  const [showSetup, setShowSetup]   = useState(false);

  const tab     = TABS.find((t) => t.id === activeTab);
  const items   = data?.[activeTab] ?? [];
  const pending = items.filter((i) => !i.done);
  const done    = items.filter((i) => i.done);

  /* ── Mutations ── */
  const mutate = (fn) => {
    const next = { ...data, [activeTab]: fn(data?.[activeTab] ?? []) };
    save(next);
  };

  const handleAdd    = (item) => mutate((list) => [item, ...list]);
  const handleToggle = (id)   => mutate((list) => list.map((i) => i.id === id ? { ...i, done: !i.done } : i));
  const handleDelete = (id)   => mutate((list) => list.filter((i) => i.id !== id));
  const handleClearDone = ()  => mutate((list) => list.filter((i) => !i.done));

  const displayed = showDone ? items : pending;

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #FFF0F4 0%, #FFD4C9 40%, #FFB1C2 75%, #F9F8FE 100%)" }}>

      {/* Setup GitHub modal */}
      {showSetup && <GitHubSetup onClose={() => setShowSetup(false)} />}

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 px-4 pt-safe pb-3"
        style={{ background: "rgba(255,240,244,0.82)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,177,194,0.22)" }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 pt-4 pb-3">
            <Link to="/"
              className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
              style={{ background: "rgba(255,177,194,0.20)", border: "1px solid rgba(255,177,194,0.35)" }}>
              <span className="text-sm">←</span>
            </Link>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-cerise" style={{ fontFamily: "'Playfair Display', serif" }}>
                  📝 To-do
                </h1>
                {/* Badge sync cliquable → ouvre setup */}
                <button onClick={() => setShowSetup(true)}>
                  <SyncBadge synced={synced} loading={loading} error={error} />
                </button>
              </div>
              <p className="text-[11px] text-rosy/60" style={{ fontFamily: "'Dancing Script', cursive" }}>
                {pending.length} à faire · {done.length} fait{done.length !== 1 ? "s" : ""}
              </p>
            </div>

            <button onClick={() => setShowDone((s) => !s)}
              className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
              style={{
                background: showDone ? `${tab.color}22` : "rgba(255,177,194,0.15)",
                border: `1px solid ${showDone ? tab.color + "44" : "rgba(255,177,194,0.30)"}`,
              }}>
              <span className="text-sm">{showDone ? "👁️" : "✅"}</span>
            </button>
          </div>

          {/* Onglets */}
          <div className="flex rounded-2xl p-1 gap-1" style={{ background: "rgba(255,177,194,0.14)" }}>
            {TABS.map((t) => {
              const isActive  = activeTab === t.id;
              const tabPending = (data?.[t.id] ?? []).filter((i) => !i.done).length;
              return (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className="flex-1 flex flex-col items-center py-2 rounded-xl transition-all active:scale-95"
                  style={{ background: isActive ? t.color : "transparent", boxShadow: isActive ? `0 2px 12px ${t.color}30` : "none" }}>
                  <span className="text-base leading-none">{t.emoji}</span>
                  <span className="text-[10px] font-semibold mt-0.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: isActive ? "#fff" : t.color }}>
                    {t.label}
                  </span>
                  {tabPending > 0 && (
                    <span className="text-[9px] font-bold leading-none mt-0.5"
                      style={{ color: isActive ? "rgba(255,255,255,0.75)" : `${t.color}99`, fontFamily: "'DM Sans', sans-serif" }}>
                      {tabPending}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ── Contenu ── */}
      <main className="flex-1 px-4 py-4 max-w-md mx-auto w-full flex flex-col gap-4">
        <TodoStats items={items} color={tab.color} />
        <AddTodo onAdd={handleAdd} accentColor={tab.color} />

        {loading ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <span className="text-3xl animate-pulse">🌸</span>
            <p className="text-sm text-rosy/50" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Chargement…
            </p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-5xl">{pending.length === 0 && done.length > 0 ? "🎉" : "✨"}</span>
            <p className="text-base text-cerise/50 text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>
              {pending.length === 0 && done.length > 0 ? "Tout est fait, bravo vous ! 🥳" : "Rien ici pour l'instant…"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {displayed.filter((i) => !i.done).map((item) => (
              <TodoItem key={item.id} item={item} onToggle={handleToggle} onDelete={handleDelete} />
            ))}

            {showDone && done.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center justify-between px-1">
                  <p className="text-[10px] uppercase tracking-widest text-rosy/45"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Déjà faits ({done.length})
                  </p>
                  <button onClick={handleClearDone}
                    className="text-[10px] text-rosy/45 underline"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Tout supprimer
                  </button>
                </div>
                {done.map((item) => (
                  <TodoItem key={item.id} item={item} onToggle={handleToggle} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="h-8" />
      </main>
    </div>
  );
}

export default TodoPage;
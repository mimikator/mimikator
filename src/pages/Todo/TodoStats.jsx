/**
 * TodoStats — mini barre de progression + compteurs
 */
export function TodoStats({ items, color }) {
  const total = items.length;
  const done  = items.filter((i) => i.done).length;
  const pct   = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="flex items-center gap-3">
      {/* Barre */}
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: `${color}20` }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width:      `${pct}%`,
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
          }}
        />
      </div>
      {/* Texte */}
      <span
        className="text-[11px] flex-shrink-0 font-semibold"
        style={{ color, fontFamily: "'DM Sans', sans-serif" }}
      >
        {done}/{total}
        {pct === 100 && total > 0 && " 🎉"}
      </span>
    </div>
  );
}

export default TodoStats;
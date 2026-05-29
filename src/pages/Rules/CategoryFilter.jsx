import { CATEGORIES } from "../../data/rules.js";

/**
 * CategoryFilter — pills de filtre par catégorie
 */
export function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all active:scale-95"
          style={{
            background: active === cat.id ? cat.color : `${cat.color}14`,
            color:      active === cat.id ? "#fff"    : cat.color,
            border:     `1.5px solid ${active === cat.id ? cat.color : cat.color + "30"}`,
            fontFamily: "'DM Sans', sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { route: "/calendrier",    emoji: "📅", label: "Calendrier",   color: "#C00F3D" },
  { route: "/souvenirs",     emoji: "📸", label: "Dossiers",    color: "#D77374" },
  { route: "/galerie", emoji: "😂", label: "Galerie",      color: "#FB8BA3" },
  { route: "/regles",        emoji: "📖", label: "Bible",        color: "#E0B2AC" },
  { route: "/jeux",          emoji: "🥜", label: "Jeux",         color: "#7B7E0F" },
  { route: "/shop",          emoji: "🛍️", label: "Shop",         color: "#C00F3D" },
  { route: "/hongrois",      emoji: "🇭🇺", label: "Hongrois",    color: "#3E4423" },
  { route: "/moto",          emoji: "🏍️", label: "Moto",         color: "#7D0507" },
  { route: "/moments",       emoji: "✨", label: "Moments",      color: "#FB8BA3" },
  { route: "/todo",          emoji: "📝", label: "To-do",        color: "#D77374" },
  { route: "/profil",        emoji: "👤", label: "Profil",       color: "#E0B2AC" },
  { route: "/tribunal",      emoji: "​🏦​", label: "Tribunal",    color: "#D77374" },
];

/**
 * HomeNav — grille de navigation vers tous les modules
 */
export function HomeNav() {
  return (
    <div className="w-full">
      <p
        className="text-center text-[10px] uppercase tracking-[0.22em] text-rosy/50 mb-4"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Espaces
      </p>
      <div className="grid grid-cols-4 gap-3">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.route}
            to={item.route}
            className="flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all active:scale-90"
            style={{
              background: `${item.color}14`,
              border: `1px solid ${item.color}30`,
              backdropFilter: "blur(6px)",
            }}
          >
            <span className="text-2xl leading-none">{item.emoji}</span>
            <span
              className="text-[10px] text-center leading-tight"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: item.color,
                fontWeight: 600,
                letterSpacing: "0.03em",
              }}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeNav;
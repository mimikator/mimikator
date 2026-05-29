// Dates importantes par défaut
export const DEFAULT_EVENTS = [
  {
    id: "e1",
    title: "Notre premier jour 💑",
    date: "2024-01-01",
    description: "Le jour où tout a commencé. Le jour où j'ai su que tu étais quelqu'un de spécial pour moi.",
    emoji: "💑",
    color: "#C00F3D",
    type: "anniversaire",
  },
  {
    id: "e2",
    title: "Premier voyage ensemble 🏍️",
    date: "2024-06-15",
    description: "Notre première escapade en moto. Le vent, la route, et toi derrière moi.",
    emoji: "🏍️",
    color: "#7B7E0F",
    type: "souvenir",
  },
];

export const EVENT_TYPES = [
  { id: "anniversaire", label: "Anniversaire", emoji: "🎂", color: "#C00F3D" },
  { id: "souvenir",     label: "Souvenir",     emoji: "📸", color: "#D77374" },
  { id: "rendez-vous",  label: "Rendez-vous",  emoji: "📅", color: "#FB8BA3" },
  { id: "voyage",       label: "Voyage",       emoji: "✈️",  color: "#7B7E0F" },
  { id: "special",      label: "Spécial",      emoji: "✨", color: "#7D0507" },
];

export const MONTHS_FR = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
];

export const DAYS_FR = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
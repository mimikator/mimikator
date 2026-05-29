// Règles par défaut — remplacées par localStorage dès que l'utilisateur modifie
export const DEFAULT_RULES = [
  {
    id: "r1",
    text: "Mimi à toujours raison.",
    category: "serieuse",
    hearts: 12,
    createdAt: "2024-01-15",
  },
  {
    id: "r2",
    text: "Si boudage alors explication obligatoire (sauf si c'est pour faire une surprise).",
    category: "drole",
    hearts: 8,
    createdAt: "2024-02-03",
  },
  {
    id: "r3",
    text: "Si il a raison se référer à la règle n°1.",
    category: "serieuse",
    hearts: 21,
    createdAt: "2024-01-20",
  },
  {
    id: "r4",
    text: "Le partage de nourriture est conseillé sauf cas majeur.",
    category: "serieuse",
    hearts: 21,
    createdAt: "2024-01-20",
  },
  {
    id: "r4",
    text: "Dire la vérité et être honnête.",
    category: "serieuse",
    hearts: 21,
    createdAt: "2024-01-20",
  },
  {
    id: "r5",
    text: "Comprendre l'autre et communiquer sinon ca va finir en bagarre.",
    category: "serieuse",
    hearts: 21,
    createdAt: "2024-01-20",
  },
  {
    id: "r6",
    text: "Bagarre autorisé à n'importe quel moment.",
    category: "serieuse",
    hearts: 21,
    createdAt: "2024-01-20",
  }
];

export const CATEGORIES = [
  { id: "tous",     label: "Toutes",    emoji: "📚", color: "#C00F3D" },
  { id: "serieuse", label: "Sérieuses", emoji: "💎", color: "#7D0507" },
  { id: "drole",    label: "Drôles",    emoji: "😂", color: "#D77374" },
  { id: "defi",     label: "Défis",     emoji: "🏆", color: "#7B7E0F" },
  { id: "promesse", label: "Promesses", emoji: "🤝", color: "#FB8BA3" },
];
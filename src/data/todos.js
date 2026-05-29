// Données par défaut — 3 onglets
export const DEFAULT_TODOS = {
  dates: [
    { id: "d1", text: "Soirée pique-nique au coucher du soleil", done: false, priority: "rose",  tag: "romantique", createdAt: "2026-01-10" },
    { id: "d2", text: "Week-end surprise à Bruges",              done: false, priority: "fraise", tag: "voyage",     createdAt: "2026-02-14" },
    { id: "d3", text: "Cours de cuisine ensemble",               done: true,  priority: "peche",  tag: "activité",   createdAt: "2026-01-20" },
    { id: "d4", text: "Cinéma en plein air cet été",             done: false, priority: "peche",  tag: "sortie",     createdAt: "2026-03-05" },
  ],
  afaire: [
    { id: "a1", text: "Choisir le fond d'écran de l'appli",     done: false, priority: "fraise", tag: "appli",      createdAt: "2026-04-01" },
    { id: "a2", text: "Créer notre playlist Spotify commune",   done: true,  priority: "rose",   tag: "musique",    createdAt: "2026-03-15" },
    { id: "a3", text: "Imprimer nos photos préférées",          done: false, priority: "peche",  tag: "souvenirs",  createdAt: "2026-04-10" },
  ],
  bucket: [
    { id: "b1", text: "Voir les aurores boréales en Islande",   done: false, priority: "fraise", tag: "voyage",     createdAt: "2026-01-01" },
    { id: "b2", text: "Apprendre à danser ensemble",            done: false, priority: "rose",   tag: "activité",   createdAt: "2026-02-01" },
    { id: "b3", text: "Faire un road trip en moto en Europe",   done: false, priority: "fraise", tag: "moto",       createdAt: "2026-01-15" },
    { id: "b4", text: "Adopter un chat ensemble 🐱",            done: false, priority: "peche",  tag: "vie",        createdAt: "2026-03-01" },
  ],
};

export const TABS = [
  { id: "dates",  label: "Dates",       emoji: "💑", color: "#C00F3D" },
  { id: "afaire", label: "À faire",     emoji: "📋", color: "#D77374" },
  { id: "bucket", label: "Bucket list", emoji: "🌟", color: "#7B7E0F" },
];

export const PRIORITIES = [
  { id: "fraise", label: "Urgent",  color: "#C00F3D", dot: "🔴" },
  { id: "rose",   label: "Normal",  color: "#FB8BA3", dot: "🩷" },
  { id: "peche",  label: "Un jour", color: "#FFD4C9", dot: "🤍" },
];

export const TAG_COLORS = {
  romantique: "#C00F3D",
  voyage:     "#7B7E0F",
  activité:   "#D77374",
  sortie:     "#FB8BA3",
  musique:    "#7D0507",
  souvenirs:  "#E0B2AC",
  appli:      "#3E4423",
  moto:       "#7D0507",
  vie:        "#D77374",
};
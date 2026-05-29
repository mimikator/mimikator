export const GALLERY_CATEGORIES = [
  { id: "tous",      label: "Toutes",    emoji: "🖼️", color: "#C00F3D" },
  { id: "nous",      label: "Nous",      emoji: "💑", color: "#C00F3D" },
  { id: "voyages",   label: "Voyages",   emoji: "✈️",  color: "#7B7E0F" },
  { id: "moto",      label: "Moto",      emoji: "🏍️", color: "#7D0507" },
  { id: "sorties",   label: "Sorties",   emoji: "🎉", color: "#D77374" },
  { id: "quotidien", label: "Quotidien", emoji: "☀️", color: "#FB8BA3" },
  { id: "drole",     label: "Drôles",    emoji: "😂", color: "#E0B2AC" },
];

export const REACTIONS_LIST = ["❤️", "😂", "🥰", "😍", "🔥", "💕"];

// Structure d'une photo dans github:data/gallery/photos.json
// {
//   id:           "p1234567890",
//   cloudinaryId: "couple-app/abc123",
//   url:          "https://res.cloudinary.com/...",
//   thumbUrl:     "https://...",   ← w_400,c_fill,q_auto,f_auto
//   caption:      "Notre premier pique-nique",
//   category:     "nous",
//   uploadedBy:   "elle" | "lui",
//   reactions:    { "❤️": 2, "🥰": 1 },
//   createdAt:    "2026-05-27",
// }

export const DEFAULT_PHOTOS = [];
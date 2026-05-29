export const PLAIGNANTS = [
  { id: "elle", label: "Joana", emoji: "👩‍⚖️" },
  { id: "lui",  label: "Balint", emoji: "🧑‍💻" },
];

export const STATUTS = [
  { id: "en_cours",  label: "En cours",      emoji: "⚖️",  color: "#7B7E0F" },
  { id: "defense",   label: "Défense rendue", emoji: "🛡️",  color: "#D77374" },
  { id: "clos",      label: "Affaire close",  emoji: "🔨",  color: "#7D0507" },
];

export const GRAVITES = [
  { id: "mineure",  label: "Mineure",  emoji: "🟡", color: "#FFB1C2" },
  { id: "serieuse", label: "Sérieuse", emoji: "🟠", color: "#D77374" },
  { id: "grave",    label: "Grave",    emoji: "🔴", color: "#C00F3D" },
];

export const PEINES_SUGGÉREES = [
  "Câlin obligatoire de 30 secondes minimum",
  "Préparation du repas pendant 3 jours",
  "Massage de 20 minutes sans négociation",
  "Vaisselle pendant une semaine",
  "Séance cinéma au choix de la victime",
  "Interdiction de téléphone pendant le dîner (1 semaine)",
  "Déclaration d'amour publique",
  "Petit-déjeuner au lit livré",
  "Excuse formelle rédigée et signée",
  "50 cacahouètes versées à la victime",
];

export const DEFAULT_AFFAIRES = [
  {
    id: "a1",
    numero: "TCP-2026-001",
    titre: "L'affaire du film regardé sans l'autre",
    plaignant: "elle",
    accusé: "lui",
    gravite: "serieuse",
    statut: "clos",
    faits: "L'accusé a regardé 3 épisodes de la série commune sans attendre la plaignante, privant celle-ci du plaisir de la découverte et brisant le pacte sacré du visionnage commun.",
    defense: "En ma défense, il était tard et je pensais qu'elle dormait. Je reconnais les faits mais conteste la gravité.",
    verdict: "L'accusé est reconnu coupable. Il devra préparer le repas pendant 3 jours et s'engage solennellement à ne plus jamais recommencer.",
    peine: "Préparation du repas pendant 3 jours",
    createdAt: "2026-03-15",
    verdictAt: "2026-03-16",
  },
];
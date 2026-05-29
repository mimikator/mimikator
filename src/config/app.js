// ============================================================
//  Notre Appli Couple — Configuration globale
// ============================================================

export const APP_CONFIG = {
  APP_NAME: "Mimi-kator 1.0",

  // 📅 Date de votre première rencontre (format ISO)
  MEETING_DATE: "2026-04-02T19:57:00",

  // 🐙 GitHub (données partagées)
  GITHUB_OWNER: "rakou-fr",
  GITHUB_REPO: "app-mimi",
  GITHUB_TOKEN_KEY: "",

  // 🌸 Cycle menstruel (fallback si pas en localStorage)
  CYCLE_DEFAULT: {
    lastPeriodStart: "2026-05-12",
    cycleDuration: 26,
  },

  CLOUDINARY_CLOUD_NAME:   "ddkfivyia",    // ← à remplacer
  CLOUDINARY_UPLOAD_PRESET: "mimi-app",
  CLOUDINARY_API_KEY: "",


  // 🚀 Base URL pour GitHub Pages
  BASE_URL: "/couple-app",
};

// Palette couleurs (aussi dans tailwind.config.js)
export const PALETTE = {
  cerise:      "#7D0507",
  fraise:      "#C00F3D",
  rose_fonce:  "#D77374",
  rosy:        "#FB8BA3",
  powder:      "#FFB1C2",
  peche:       "#FFD4C9",
  ancien_rose: "#E0B2AC",
  olive:       "#7B7E0F",
  fougere:     "#3E4423",
  white_lilac: "#F9F8FE",
};

export default APP_CONFIG;
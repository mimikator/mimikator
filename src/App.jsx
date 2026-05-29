import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect }       from "react";
import { HomePage }  from "./pages/Home/HomePage.jsx";
import { RulesPage } from "./pages/Rules/RulesPage.jsx";
import { TodoPage }  from "./pages/Todo/TodoPage.jsx";
import { GitHubSetup } from "./components/ui/GitHubSetup.jsx";
import { CalendarPage } from "./pages/Calendar/CalendarPage.jsx";
import { TribunalPage } from "./pages/Tribunal/TribunalPage.jsx";
import { GalleryPage } from "./pages/Gallery/GalleryPage.jsx";
import APP_CONFIG from "./config/app.js";

// ── Vérifie si le token est déjà configuré ──
function hasToken() {
  try {
    return !!JSON.parse(localStorage.getItem(APP_CONFIG.GITHUB_TOKEN_KEY));
  } catch {
    return false;
  }
}

// Pages à créer (stubs)
const Placeholder = ({ title }) => (
  <div
    className="min-h-screen flex flex-col items-center justify-center gap-4 px-6"
    style={{ background: "linear-gradient(160deg, #FFF0F4, #FFD4C9)" }}
  >
    <span className="text-5xl">🚧</span>
    <h1 className="text-2xl text-cerise font-bold text-center"
      style={{ fontFamily: "'Playfair Display', serif" }}>
      {title}
    </h1>
    <p className="text-sm text-rosy/60 text-center"
      style={{ fontFamily: "'Dancing Script', cursive" }}>
      Bientôt disponible dans notre appli 🌸
    </p>
    <a href="/" className="mt-4 px-5 py-2.5 rounded-full text-sm text-white font-semibold"
      style={{ background: "#C00F3D", fontFamily: "'DM Sans', sans-serif" }}>
      ← Retour à l'accueil
    </a>
  </div>
);

function App() {
  // true = montrer le setup, false = déjà configuré
  const [showSetup, setShowSetup] = useState(() => !hasToken());

  // Sécurité : si le token disparaît (clear localStorage), on re-affiche
  useEffect(() => {
    if (!hasToken()) setShowSetup(true);
  }, []);

  return (
    <HashRouter>
      {/* ── Setup GitHub — affiché UNE SEULE FOIS au premier lancement ── */}
      {showSetup && (
        <GitHubSetup onClose={() => setShowSetup(false)} />
      )}

      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/calendrier"    element={<CalendarPage />} />
        <Route path="/tribunal"      element={<TribunalPage />} />
        <Route path="/galerie" element={<GalleryPage />} />
        <Route path="/regles"        element={<RulesPage />} />
        <Route path="/souvenirs"     element={<Placeholder title="Galerie souvenirs 📸" />} />
        <Route path="/hongrois"      element={<Placeholder title="Apprentissage du hongrois 🇭🇺" />} />
        <Route path="/jeux"          element={<Placeholder title="Mini-jeux Cacahouètes 🥜" />} />
        <Route path="/shop"          element={<Placeholder title="Shop de dates 🛍️" />} />
        <Route path="/moments"       element={<Placeholder title="Moments mignons ✨" />} />
        <Route path="/profil"        element={<Placeholder title="Profil 👤" />} />
        <Route path="/moto"          element={<Placeholder title="Module Moto 🏍️" />} />
        <Route path="/todo"          element={<TodoPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
import { useState } from "react";
import APP_CONFIG from "../../config/app.js";

/**
 * GitHubSetup — affiché une seule fois au premier lancement
 * Owner et repo sont pré-remplis depuis app.js
 * La personne n'a qu'à coller son token
 */
export function GitHubSetup({ onClose }) {
  const [token,      setToken]      = useState("");
  const [testing,    setTesting]    = useState(false);
  const [testResult, setTestResult] = useState(null); // "ok" | "error" | null
  const [showToken,  setShowToken]  = useState(false);

  const owner = APP_CONFIG.GITHUB_OWNER;
  const repo  = APP_CONFIG.GITHUB_REPO;

  const handleSave = async () => {
    if (!token.trim()) return;
    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
            Accept: "application/vnd.github+json",
          },
        }
      );
      if (!res.ok) throw new Error();

      // Succès → sauvegarder le token
      localStorage.setItem(APP_CONFIG.GITHUB_TOKEN_KEY, JSON.stringify(token.trim()));
      setTestResult("ok");
      setTimeout(() => onClose?.(), 1000);
    } catch {
      setTestResult("error");
    } finally {
      setTesting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(125,5,7,0.30)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="w-full max-w-sm rounded-3xl px-6 py-8 flex flex-col gap-6"
        style={{
          background: "rgba(255,248,250,0.98)",
          border: "1.5px solid rgba(255,177,194,0.45)",
          boxShadow: "0 16px 60px rgba(192,15,61,0.18)",
        }}
      >
        {/* Titre */}
        <div className="text-center">
          <p className="text-4xl mb-3">🔗</p>
          <h2 className="text-xl font-bold text-cerise"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Connexion GitHub
          </h2>
          <p className="text-xs text-rosy/60 mt-1.5 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Pour synchroniser vos données entre vous deux.
            À faire une seule fois 🌸
          </p>
        </div>

        {/* Repo pré-rempli (info, non modifiable) */}
        <div
          className="rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{ background: "rgba(255,177,194,0.12)", border: "1px solid rgba(255,177,194,0.25)" }}
        >
          <span className="text-lg">📦</span>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-rosy/50"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Repo connecté
            </p>
            <p className="text-sm font-semibold text-cerise/80"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {owner}/{repo}
            </p>
          </div>
        </div>

        {/* Champ token */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-cerise/70 uppercase tracking-wider"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Personal Access Token
          </label>
          <div className="relative">
            <input
              type={showToken ? "text" : "password"}
              value={token}
              onChange={(e) => { setToken(e.target.value); setTestResult(null); }}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full rounded-2xl px-4 py-3 pr-12 text-sm text-cerise/80 outline-none placeholder:text-rosy/30"
              style={{
                background: "rgba(255,177,194,0.10)",
                border: "1.5px solid rgba(255,177,194,0.35)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => setShowToken((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-rosy/40 text-lg"
            >
              {showToken ? "🙈" : "👁️"}
            </button>
          </div>
          <a
            href="https://github.com/settings/tokens/new?scopes=repo&description=couple-app"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-fraise/60 underline"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            → Créer un token sur GitHub (permission : repo)
          </a>
        </div>

        {/* Résultat */}
        {testResult === "ok" && (
          <div className="rounded-2xl px-4 py-3 text-center"
            style={{ background: "rgba(123,126,15,0.10)", border: "1px solid rgba(123,126,15,0.25)" }}>
            <p className="text-sm font-semibold" style={{ color: "#7B7E0F", fontFamily: "'DM Sans', sans-serif" }}>
              ✅ Connecté ! Bienvenue 🌸
            </p>
          </div>
        )}
        {testResult === "error" && (
          <div className="rounded-2xl px-4 py-3 text-center"
            style={{ background: "rgba(192,15,61,0.08)", border: "1px solid rgba(192,15,61,0.20)" }}>
            <p className="text-sm font-semibold text-fraise" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              ❌ Token invalide ou repo introuvable
            </p>
          </div>
        )}

        {/* Boutons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleSave}
            disabled={!token.trim() || testing || testResult === "ok"}
            className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg, #C00F3D, #D77374)",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 18px rgba(192,15,61,0.30)",
            }}
          >
            {testing ? "Vérification…" : "Se connecter 🔗"}
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl text-sm text-rosy/50 transition-all active:scale-95"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Ignorer pour l'instant
          </button>
        </div>
      </div>
    </div>
  );
}

export default GitHubSetup;
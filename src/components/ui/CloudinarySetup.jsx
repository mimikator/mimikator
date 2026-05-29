import { useState } from "react";

export const CLOUDINARY_KEY = "coupleApp_cloudinaryKey";
export const CLOUDINARY_PRESET_KEY = "coupleApp_cloudinaryPreset";

/**
 * CloudinarySetup — modale de config Cloudinary (premier accès galerie)
 * Stocke cloud_name + upload_preset en localStorage.
 * L'api_secret n'est JAMAIS demandé — on utilise un unsigned preset.
 */
export function CloudinarySetup({ onClose, onSaved }) {
  const [cloudName, setCloudName] = useState(
    localStorage.getItem(CLOUDINARY_KEY) || "ddkfivyia"
  );
  const [preset, setPreset] = useState(
    localStorage.getItem(CLOUDINARY_PRESET_KEY) || "mimi-app"
  );
  const [saved, setSaved] = useState(false);
  const [step,  setStep]  = useState(0); // 0 = intro, 1 = form

  const handleSave = () => {
    if (!cloudName.trim() || !preset.trim()) return;
    localStorage.setItem(CLOUDINARY_KEY,        cloudName.trim());
    localStorage.setItem(CLOUDINARY_PRESET_KEY, preset.trim());
    setSaved(true);
    setTimeout(() => {
      onSaved?.();
      onClose?.();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6"
      style={{ background: "rgba(10,2,3,0.65)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: "#FFF0F4", border: "1px solid rgba(255,177,194,0.4)" }}
      >
        {step === 0 ? (
          /* ── Écran d'intro ── */
          <div className="px-6 py-7 flex flex-col items-center text-center gap-4">
            <div className="text-5xl">☁️</div>
            <h2
              className="text-xl font-semibold text-cerise"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Configurer la galerie
            </h2>
            <p
              className="text-sm text-rosy/70 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Les photos sont stockées sur <strong style={{ color: "#C00F3D" }}>Cloudinary</strong> —
              un service gratuit. Il te faut juste ton <em>cloud name</em> et un{" "}
              <em>upload preset unsigned</em>.
            </p>

            {/* Étapes rapides */}
            <div
              className="w-full rounded-2xl p-4 text-left flex flex-col gap-2"
              style={{ background: "rgba(255,177,194,0.12)", border: "1px solid rgba(255,177,194,0.25)" }}
            >
              {[
                ["1", "Va sur cloudinary.com → Dashboard"],
                ["2", "Copie ton Cloud Name (ex: ddkfivyia)"],
                ["3", "Settings → Upload → Add upload preset"],
                ["4", "Nom: mimi-app · Mode: Unsigned → Save"],
              ].map(([n, txt]) => (
                <div key={n} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5"
                    style={{ background: "#C00F3D", color: "#FFD4C9", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {n}
                  </span>
                  <span
                    className="text-xs text-cerise/80 leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {txt}
                  </span>
                </div>
              ))}
            </div>

            <p
              className="text-[10px] text-rosy/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              ⚠️ L'API secret ne sera jamais demandé — uniquement le cloud name et le preset.
            </p>

            <button
              onClick={() => setStep(1)}
              className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #C00F3D, #D77374)",
                color: "#FFD4C9",
                boxShadow: "0 6px 20px rgba(192,15,61,0.28)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              J'ai mon preset, on configure →
            </button>
          </div>
        ) : (
          /* ── Formulaire ── */
          <div className="px-6 py-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(0)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-rosy/60"
                style={{ background: "rgba(255,177,194,0.2)" }}
              >
                ←
              </button>
              <h2
                className="text-lg font-semibold text-cerise"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Tes infos Cloudinary
              </h2>
            </div>

            {/* Cloud name */}
            <div>
              <label
                className="text-xs font-medium text-cerise/70 mb-1.5 block"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Cloud Name
              </label>
              <input
                type="text"
                value={cloudName}
                onChange={(e) => setCloudName(e.target.value)}
                placeholder="ddkfivyia"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,177,194,0.4)",
                  color: "#7D0507",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              <p
                className="text-[10px] text-rosy/50 mt-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Visible en haut à gauche de ton Dashboard Cloudinary
              </p>
            </div>

            {/* Upload preset */}
            <div>
              <label
                className="text-xs font-medium text-cerise/70 mb-1.5 block"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Nom du preset unsigned
              </label>
              <input
                type="text"
                value={preset}
                onChange={(e) => setPreset(e.target.value)}
                placeholder="mimi-app"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,177,194,0.4)",
                  color: "#7D0507",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              <p
                className="text-[10px] text-rosy/50 mt-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Settings → Upload → Upload presets → ton preset unsigned
              </p>
            </div>

            {/* Info sécurité */}
            <div
              className="rounded-xl px-4 py-2.5 flex items-start gap-2"
              style={{ background: "rgba(123,126,15,0.08)", border: "1px solid rgba(123,126,15,0.2)" }}
            >
              <span className="text-sm flex-shrink-0">🔒</span>
              <p
                className="text-[11px] leading-relaxed"
                style={{ color: "#7B7E0F", fontFamily: "'DM Sans', sans-serif" }}
              >
                Ces infos sont stockées uniquement dans ton <strong>localStorage</strong>.
                Elles ne transitent jamais par un serveur.
              </p>
            </div>

            {/* Bouton save */}
            <button
              onClick={handleSave}
              disabled={!cloudName.trim() || !preset.trim()}
              className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all active:scale-95 disabled:opacity-40"
              style={{
                background: saved
                  ? "linear-gradient(135deg, #7B7E0F, #3E4423)"
                  : "linear-gradient(135deg, #C00F3D, #D77374)",
                color: "#FFD4C9",
                boxShadow: "0 6px 20px rgba(192,15,61,0.28)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {saved ? "✓ Sauvegardé !" : "Sauvegarder et accéder à la galerie"}
            </button>

            <p
              className="text-[10px] text-rosy/40 text-center"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Tu pourras modifier ça plus tard dans les réglages.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CloudinarySetup;
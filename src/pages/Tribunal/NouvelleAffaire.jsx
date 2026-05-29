import { useState } from "react";
import { PLAIGNANTS, GRAVITES } from "../../data/tribunal.js";

export function NouvelleAffaire({ onSubmit, onClose }) {
  const [plaignant, setPlaignant] = useState("elle");
  const [gravite,   setGravite]   = useState("mineure");
  const [titre,     setTitre]     = useState("");
  const [faits,     setFaits]     = useState("");

  const plaig  = PLAIGNANTS.find((p) => p.id === plaignant);
  const accuse = PLAIGNANTS.find((p) => p.id !== plaignant);

  const handleSubmit = () => {
    if (!titre.trim() || !faits.trim()) return;
    const now = new Date();
    onSubmit({
      id:        `a${Date.now()}`,
      numero:    `TCP-${now.getFullYear()}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`,
      titre:     titre.trim(),
      plaignant,
      accusé:    accuse.id,
      gravite,
      statut:    "en_cours",
      faits:     faits.trim(),
      defense:   null,
      verdict:   null,
      peine:     null,
      createdAt: now.toISOString().slice(0, 10),
      verdictAt: null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4"
      style={{ background: "rgba(30,10,5,0.40)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl px-6 py-6 flex flex-col gap-5"
        style={{
          background: "rgba(255,248,250,0.99)",
          border: "1.5px solid rgba(125,5,7,0.20)",
          boxShadow: "0 -10px 60px rgba(125,5,7,0.18)",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="text-center border-b border-cerise/10 pb-4">
          <p className="text-3xl mb-2">⚖️</p>
          <h2 className="text-lg font-bold text-cerise"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Tribunal du Couple
          </h2>
          <p className="text-xs text-cerise/50 mt-0.5 italic"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Dépôt de plainte officiel
          </p>
        </div>

        {/* Plaignant */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-cerise/50 mb-2 font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Le/La plaignant·e
          </p>
          <div className="flex gap-3">
            {PLAIGNANTS.map((p) => (
              <button key={p.id} onClick={() => setPlaignant(p.id)}
                className="flex-1 py-3 rounded-2xl flex flex-col items-center gap-1 transition-all active:scale-95"
                style={{
                  background: plaignant === p.id ? "rgba(192,15,61,0.12)" : "rgba(255,177,194,0.08)",
                  border: `2px solid ${plaignant === p.id ? "#C00F3D" : "rgba(255,177,194,0.25)"}`,
                }}>
                <span className="text-2xl">{p.emoji}</span>
                <span className="text-xs font-bold"
                  style={{ color: plaignant === p.id ? "#C00F3D" : "#7D0507aa", fontFamily: "'DM Sans', sans-serif" }}>
                  {p.label}
                </span>
              </button>
            ))}
          </div>
          {plaig && accuse && (
            <p className="text-[11px] text-cerise/40 text-center mt-2 italic"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {plaig.label} c/ {accuse.label}
            </p>
          )}
        </div>

        {/* Gravité */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-cerise/50 mb-2 font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Gravité des faits
          </p>
          <div className="flex gap-2">
            {GRAVITES.map((g) => (
              <button key={g.id} onClick={() => setGravite(g.id)}
                className="flex-1 py-2.5 rounded-2xl text-xs font-semibold transition-all active:scale-95"
                style={{
                  background: gravite === g.id ? g.color : `${g.color}18`,
                  color:      gravite === g.id ? "#fff"  : g.color,
                  border:     `1.5px solid ${g.color}50`,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                {g.emoji} {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Titre de l'affaire */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-cerise/50 mb-1.5 font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Intitulé de l'affaire *
          </p>
          <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)}
            placeholder="L'affaire du film regardé sans l'autre…"
            className="w-full rounded-2xl px-4 py-3 text-sm text-cerise/80 outline-none placeholder:text-rosy/30"
            style={{ background: "rgba(255,177,194,0.10)", border: "1.5px solid rgba(125,5,7,0.12)", fontFamily: "'DM Sans', sans-serif" }}
          />
        </div>

        {/* Exposé des faits */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-cerise/50 mb-1.5 font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Exposé des faits *
          </p>
          <textarea value={faits} onChange={(e) => setFaits(e.target.value)}
            placeholder="Exposez les faits de manière précise et circonstanciée…"
            rows={4}
            className="w-full rounded-2xl px-4 py-3 text-sm text-cerise/80 outline-none resize-none placeholder:text-rosy/30"
            style={{ background: "rgba(255,177,194,0.10)", border: "1.5px solid rgba(125,5,7,0.12)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
          />
        </div>

        {/* Boutons */}
        <div className="flex gap-3 pt-1">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-2xl text-sm font-semibold text-cerise/40 transition-all active:scale-95"
            style={{ background: "rgba(255,177,194,0.10)", border: "1px solid rgba(255,177,194,0.20)", fontFamily: "'DM Sans', sans-serif" }}>
            Annuler
          </button>
          <button onClick={handleSubmit} disabled={!titre.trim() || !faits.trim()}
            className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #7D0507, #C00F3D)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 18px rgba(125,5,7,0.30)" }}>
            📋 Déposer la plainte
          </button>
        </div>
      </div>
    </div>
  );
}

export default NouvelleAffaire;
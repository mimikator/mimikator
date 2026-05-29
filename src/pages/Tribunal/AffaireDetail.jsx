import { useState } from "react";
import { STATUTS, GRAVITES, PLAIGNANTS, PEINES_SUGGÉREES } from "../../data/tribunal.js";

const STATUT_MAP  = Object.fromEntries(STATUTS.map((s) => [s.id, s]));
const GRAVITE_MAP = Object.fromEntries(GRAVITES.map((g) => [g.id, g]));
const PLAIG_MAP   = Object.fromEntries(PLAIGNANTS.map((p) => [p.id, p]));

function Section({ title, icon, children, color = "#C00F3D" }) {
  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${color}20` }}>
      <div className="px-4 py-2.5 flex items-center gap-2"
        style={{ background: `${color}10` }}>
        <span className="text-base">{icon}</span>
        <p className="text-[11px] font-bold uppercase tracking-widest"
          style={{ color, fontFamily: "'DM Sans', sans-serif" }}>
          {title}
        </p>
      </div>
      <div className="px-4 py-3 bg-white/30">
        {children}
      </div>
    </div>
  );
}

export function AffaireDetail({ affaire, onClose, onUpdate, onDelete }) {
  const [showDefense,  setShowDefense]  = useState(false);
  const [showVerdict,  setShowVerdict]  = useState(false);
  const [defenseText,  setDefenseText]  = useState(affaire.defense ?? "");
  const [verdictText,  setVerdictText]  = useState(affaire.verdict ?? "");
  const [peineText,    setPeineText]    = useState(affaire.peine   ?? "");

  const statut  = STATUT_MAP[affaire.statut]   ?? STATUTS[0];
  const gravite = GRAVITE_MAP[affaire.gravite]  ?? GRAVITES[0];
  const plaig   = PLAIG_MAP[affaire.plaignant]  ?? PLAIGNANTS[0];
  const accuse  = PLAIG_MAP[affaire.accusé]     ?? PLAIGNANTS[1];

  const handleDefense = () => {
    if (!defenseText.trim()) return;
    onUpdate({ ...affaire, defense: defenseText.trim(), statut: "defense" });
    setShowDefense(false);
  };

  const handleVerdict = () => {
    if (!verdictText.trim() || !peineText.trim()) return;
    onUpdate({
      ...affaire,
      verdict:   verdictText.trim(),
      peine:     peineText.trim(),
      statut:    "clos",
      verdictAt: new Date().toISOString().slice(0, 10),
    });
    setShowVerdict(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "linear-gradient(160deg, #1a0305 0%, #3d0a0f 50%, #1a0305 100%)" }}>

      {/* Header style tribunal */}
      <div className="px-4 pt-safe pb-4 flex items-center gap-3 border-b border-white/10">
        <button onClick={onClose}
          className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,177,194,0.12)", border: "1px solid rgba(255,177,194,0.20)" }}>
          <span className="text-sm text-powder">←</span>
        </button>
        <div className="flex-1">
          <p className="text-[10px] font-mono text-powder/40 uppercase tracking-widest">
            {affaire.numero}
          </p>
          <p className="text-xs font-semibold text-powder/70"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Tribunal du Couple — Chambre Romantique
          </p>
        </div>
        <span className="text-xl px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ background: `${statut.color}25`, color: statut.color }}>
          {statut.emoji}
        </span>
      </div>

      {/* Contenu scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-5 max-w-md mx-auto w-full flex flex-col gap-4">

        {/* Titre affaire */}
        <div className="text-center py-4">
          <p className="text-2xl mb-2">⚖️</p>
          <h2 className="text-lg font-bold text-powder leading-snug"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {affaire.titre}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: `${gravite.color}25`, color: gravite.color, fontFamily: "'DM Sans', sans-serif" }}>
              {gravite.emoji} Faits {gravite.label}s
            </span>
          </div>
        </div>

        {/* Parties */}
        <div className="flex items-center justify-between px-2">
          <div className="text-center">
            <p className="text-2xl">{plaig.emoji}</p>
            <p className="text-xs font-bold text-powder/80 mt-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>{plaig.label}</p>
            <p className="text-[10px] text-powder/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>Plaignant·e</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-powder/30 text-sm font-light">contre</span>
            <div className="w-16 h-px bg-white/10" />
          </div>
          <div className="text-center">
            <p className="text-2xl">{accuse.emoji}</p>
            <p className="text-xs font-bold text-powder/80 mt-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>{accuse.label}</p>
            <p className="text-[10px] text-powder/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>Accusé·e</p>
          </div>
        </div>

        {/* Exposé des faits */}
        <Section title="Exposé des faits" icon="📋" color="#C00F3D">
          <p className="text-sm text-cerise/80 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {affaire.faits}
          </p>
          <p className="text-[10px] text-rosy/40 mt-2 italic"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Déposé le {new Date(affaire.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </Section>

        {/* Défense */}
        {affaire.defense ? (
          <Section title="Mémoire en défense" icon="🛡️" color="#7B7E0F">
            <p className="text-sm text-cerise/80 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {affaire.defense}
            </p>
          </Section>
        ) : affaire.statut === "en_cours" ? (
          showDefense ? (
            <div className="rounded-2xl px-4 py-4 flex flex-col gap-3"
              style={{ background: "rgba(123,126,15,0.10)", border: "1px solid rgba(123,126,15,0.25)" }}>
              <p className="text-xs font-bold uppercase tracking-wider text-olive"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                🛡️ Mémoire en défense
              </p>
              <textarea value={defenseText} onChange={(e) => setDefenseText(e.target.value)}
                placeholder="Présentez vos arguments de défense…"
                rows={4}
                className="w-full rounded-xl px-3 py-2.5 text-sm text-cerise/80 outline-none resize-none placeholder:text-rosy/30"
                style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(123,126,15,0.20)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
              />
              <div className="flex gap-2">
                <button onClick={() => setShowDefense(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-cerise/40"
                  style={{ background: "rgba(255,177,194,0.10)", fontFamily: "'DM Sans', sans-serif" }}>
                  Annuler
                </button>
                <button onClick={handleDefense} disabled={!defenseText.trim()}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white disabled:opacity-40"
                  style={{ background: "#7B7E0F", fontFamily: "'DM Sans', sans-serif" }}>
                  Déposer la défense
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowDefense(true)}
              className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all active:scale-95"
              style={{ background: "rgba(123,126,15,0.12)", border: "1.5px dashed rgba(123,126,15,0.30)", color: "#7B7E0F", fontFamily: "'DM Sans', sans-serif" }}>
              🛡️ Rédiger sa défense
            </button>
          )
        ) : null}

        {/* Verdict */}
        {affaire.verdict ? (
          <Section title="Verdict & Peine" icon="🔨" color="#7D0507">
            <p className="text-sm text-cerise/80 leading-relaxed mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {affaire.verdict}
            </p>
            <div className="rounded-xl px-3 py-2.5 mt-2"
              style={{ background: "rgba(192,15,61,0.08)", border: "1px solid rgba(192,15,61,0.15)" }}>
              <p className="text-[10px] uppercase tracking-wider text-fraise/60 mb-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>Peine prononcée</p>
              <p className="text-sm font-semibold text-fraise"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>⚖️ {affaire.peine}</p>
            </div>
            {affaire.verdictAt && (
              <p className="text-[10px] text-rosy/40 mt-2 italic"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Rendu le {new Date(affaire.verdictAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            )}
          </Section>
        ) : affaire.statut === "defense" ? (
          showVerdict ? (
            <div className="rounded-2xl px-4 py-4 flex flex-col gap-3"
              style={{ background: "rgba(125,5,7,0.08)", border: "1px solid rgba(125,5,7,0.20)" }}>
              <p className="text-xs font-bold uppercase tracking-wider text-cerise"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                🔨 Rendre le verdict
              </p>
              <textarea value={verdictText} onChange={(e) => setVerdictText(e.target.value)}
                placeholder="Motivations du jugement…"
                rows={3}
                className="w-full rounded-xl px-3 py-2.5 text-sm text-cerise/80 outline-none resize-none placeholder:text-rosy/30"
                style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(125,5,7,0.15)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
              />
              {/* Peines suggérées */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-cerise/50 mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>Peine (ou saisir librement)</p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {PEINES_SUGGÉREES.slice(0, 5).map((p) => (
                    <button key={p} onClick={() => setPeineText(p)}
                      className="text-[10px] px-2.5 py-1 rounded-full transition-all"
                      style={{
                        background: peineText === p ? "#C00F3D" : "rgba(192,15,61,0.08)",
                        color:      peineText === p ? "#fff"    : "#C00F3D",
                        border:     "1px solid rgba(192,15,61,0.20)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}>
                      {p}
                    </button>
                  ))}
                </div>
                <input type="text" value={peineText} onChange={(e) => setPeineText(e.target.value)}
                  placeholder="Ou rédiger une peine personnalisée…"
                  className="w-full rounded-xl px-3 py-2.5 text-sm text-cerise/80 outline-none placeholder:text-rosy/30"
                  style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(125,5,7,0.15)", fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowVerdict(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-cerise/40"
                  style={{ background: "rgba(255,177,194,0.10)", fontFamily: "'DM Sans', sans-serif" }}>
                  Annuler
                </button>
                <button onClick={handleVerdict} disabled={!verdictText.trim() || !peineText.trim()}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg, #7D0507, #C00F3D)", fontFamily: "'DM Sans', sans-serif" }}>
                  🔨 Prononcer le verdict
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowVerdict(true)}
              className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all active:scale-95"
              style={{ background: "rgba(125,5,7,0.10)", border: "1.5px dashed rgba(125,5,7,0.25)", color: "#7D0507", fontFamily: "'DM Sans', sans-serif" }}>
              🔨 Rendre le verdict
            </button>
          )
        ) : null}

        {/* Supprimer */}
        <button onClick={() => onDelete(affaire.id)}
          className="w-full py-3 rounded-2xl text-xs text-powder/20 transition-all active:scale-95"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Classer sans suite
        </button>

        <div className="h-6" />
      </div>
    </div>
  );
}

export default AffaireDetail;
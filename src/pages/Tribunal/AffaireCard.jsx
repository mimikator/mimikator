import { STATUTS, GRAVITES, PLAIGNANTS } from "../../data/tribunal.js";

const STATUT_MAP  = Object.fromEntries(STATUTS.map((s) => [s.id, s]));
const GRAVITE_MAP = Object.fromEntries(GRAVITES.map((g) => [g.id, g]));
const PLAIG_MAP   = Object.fromEntries(PLAIGNANTS.map((p) => [p.id, p]));

export function AffaireCard({ affaire, onClick }) {
  const statut  = STATUT_MAP[affaire.statut]   ?? STATUTS[0];
  const gravite = GRAVITE_MAP[affaire.gravite]  ?? GRAVITES[0];
  const plaig   = PLAIG_MAP[affaire.plaignant]  ?? PLAIGNANTS[0];
  const accuse  = PLAIG_MAP[affaire.accusé]     ?? PLAIGNANTS[1];

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-3xl px-5 py-4 flex flex-col gap-3 transition-all active:scale-[0.98]"
      style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(14px)",
        border: `1.5px solid ${gravite.color}30`,
        boxShadow: `0 3px 20px ${gravite.color}0c`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-widest text-rosy/50 mb-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {affaire.numero}
          </p>
          <p className="text-sm font-bold text-cerise leading-snug"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {affaire.titre}
          </p>
        </div>
        <span className="text-lg flex-shrink-0">{gravite.emoji}</span>
      </div>

      {/* Parties */}
      <div className="flex items-center gap-2 text-xs"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <span className="px-2.5 py-1 rounded-full font-semibold"
          style={{ background: "rgba(192,15,61,0.10)", color: "#C00F3D" }}>
          {plaig.emoji} {plaig.label}
        </span>
        <span className="text-rosy/40 text-[10px]">contre</span>
        <span className="px-2.5 py-1 rounded-full font-semibold"
          style={{ background: "rgba(125,5,7,0.08)", color: "#7D0507" }}>
          {accuse.emoji} {accuse.label}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
          style={{ background: `${statut.color}15`, color: statut.color, fontFamily: "'DM Sans', sans-serif" }}>
          {statut.emoji} {statut.label}
        </span>
        <span className="text-[10px] text-rosy/40"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {new Date(affaire.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      </div>
    </button>
  );
}

export default AffaireCard;
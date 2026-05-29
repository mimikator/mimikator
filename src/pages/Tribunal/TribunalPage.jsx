import { useState, useMemo } from "react";
import { Link }                   from "react-router-dom";
import { useGitHub }              from "../../hooks/useGitHub.js";
import { DEFAULT_AFFAIRES, STATUTS } from "../../data/tribunal.js";
import { AffaireCard }            from "./AffaireCard.jsx";
import { AffaireDetail }          from "./AffaireDetail.jsx";
import { NouvelleAffaire }        from "./NouvelleAffaire.jsx";
import { SyncBadge }              from "../../components/ui/SyncBadge.jsx";
import { GitHubSetup }            from "../../components/ui/GitHubSetup.jsx";

const FILTRES = [
  { id: "tous",      label: "Toutes",        emoji: "📚" },
  { id: "en_cours",  label: "En cours",      emoji: "⚖️" },
  { id: "defense",   label: "Défense",       emoji: "🛡️" },
  { id: "clos",      label: "Closes",        emoji: "🔨" },
];

export function TribunalPage() {
  const { data: affaires, save, loading, error, synced } = useGitHub(
    "data/tribunal/affaires.json",
    "coupleTribunal",
    DEFAULT_AFFAIRES
  );

  const [filtre,        setFiltre]        = useState("tous");
  const [selected,      setSelected]      = useState(null);
  const [showNouvelle,  setShowNouvelle]  = useState(false);
  const [showSetup,     setShowSetup]     = useState(false);

  const displayed = useMemo(() => {
    const list = affaires ?? [];
    const filtered = filtre === "tous" ? list : list.filter((a) => a.statut === filtre);
    return [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [affaires, filtre]);

  const handleAdd    = (a)   => save([...(affaires ?? []), a]);
  const handleUpdate = (a)   => save((affaires ?? []).map((x) => x.id === a.id ? a : x));
  const handleDelete = (id)  => { save((affaires ?? []).filter((a) => a.id !== id)); setSelected(null); };

  // Compteurs par statut
  const counts = useMemo(() => {
    const list = affaires ?? [];
    return {
      en_cours: list.filter((a) => a.statut === "en_cours").length,
      defense:  list.filter((a) => a.statut === "defense").length,
      clos:     list.filter((a) => a.statut === "clos").length,
    };
  }, [affaires]);

  // Vue détail
  if (selected) {
    return (
      <AffaireDetail
        affaire={selected}
        onClose={() => setSelected(null)}
        onUpdate={(updated) => { handleUpdate(updated); setSelected(updated); }}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #1a0305 0%, #2d0608 40%, #3d0a0f 75%, #1a0305 100%)" }}>

      {showSetup    && <GitHubSetup onClose={() => setShowSetup(false)} />}
      {showNouvelle && <NouvelleAffaire onSubmit={handleAdd} onClose={() => setShowNouvelle(false)} />}

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 px-4 pt-safe pb-4"
        style={{ background: "rgba(26,3,5,0.90)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,177,194,0.10)" }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 pt-4 pb-3">
            <Link to="/"
              className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
              style={{ background: "rgba(255,177,194,0.10)", border: "1px solid rgba(255,177,194,0.15)" }}>
              <span className="text-sm text-powder/60">←</span>
            </Link>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-powder"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  ⚖️ Tribunal du Couple
                </h1>
                <button onClick={() => setShowSetup(true)}>
                  <SyncBadge synced={synced} loading={loading} error={error} />
                </button>
              </div>
              <p className="text-[11px] text-powder/30 italic"
                style={{ fontFamily: "'Dancing Script', cursive" }}>
                Chambre Romantique — Justice & Amour
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "En cours",  count: counts.en_cours, color: "#7B7E0F", emoji: "⚖️" },
              { label: "Défense",   count: counts.defense,  color: "#D77374", emoji: "🛡️" },
              { label: "Closes",    count: counts.clos,     color: "#FB8BA3", emoji: "🔨" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl px-3 py-2.5 text-center"
                style={{ background: `${s.color}18`, border: `1px solid ${s.color}25` }}>
                <p className="text-lg font-bold leading-none"
                  style={{ color: s.color, fontFamily: "'Playfair Display', serif" }}>
                  {s.count}
                </p>
                <p className="text-[9px] uppercase tracking-wider mt-0.5"
                  style={{ color: `${s.color}99`, fontFamily: "'DM Sans', sans-serif" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Filtres */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            {FILTRES.map((f) => (
              <button key={f.id} onClick={() => setFiltre(f.id)}
                className="flex-shrink-0 text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all active:scale-95"
                style={{
                  background: filtre === f.id ? "#C00F3D"              : "rgba(255,177,194,0.08)",
                  color:      filtre === f.id ? "#fff"                  : "rgba(255,177,194,0.50)",
                  border:     `1px solid ${filtre === f.id ? "#C00F3D" : "rgba(255,177,194,0.12)"}`,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                {f.emoji} {f.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Contenu ── */}
      <main className="flex-1 px-4 py-5 max-w-md mx-auto w-full flex flex-col gap-3">

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <span className="text-3xl animate-pulse">⚖️</span>
            <p className="text-sm text-powder/30" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Consultation du dossier…
            </p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="text-5xl">📭</span>
            <p className="text-base text-powder/30 text-center"
              style={{ fontFamily: "'Dancing Script', cursive" }}>
              {filtre === "tous" ? "Aucune affaire enregistrée" : "Aucune affaire dans cette catégorie"}
            </p>
          </div>
        ) : (
          displayed.map((a) => (
            <AffaireCard key={a.id} affaire={a} onClick={() => setSelected(a)} />
          ))
        )}

        <div className="h-24" />
      </main>

      {/* ── FAB ── */}
      <button onClick={() => setShowNouvelle(true)}
        className="fixed bottom-8 right-5 z-30 flex items-center gap-2 px-5 py-3.5 rounded-full transition-all active:scale-95"
        style={{
          background: "linear-gradient(135deg, #7D0507, #C00F3D)",
          boxShadow: "0 6px 28px rgba(125,5,7,0.50)",
          fontFamily: "'DM Sans', sans-serif",
        }}>
        <span className="text-lg leading-none">📋</span>
        <span className="text-sm font-semibold text-white">Déposer une plainte</span>
      </button>
    </div>
  );
}

export default TribunalPage;
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

import { useGitHub } from "../../hooks/useGitHub.js";
import { GALLERY_CATEGORIES, DEFAULT_PHOTOS } from "../../data/gallery.js";

import { PhotoCard }   from "./PhotoCard.jsx";
import { UploadModal } from "./UploadModal.jsx";
import { SyncBadge }   from "../../components/ui/SyncBadge.jsx";
import { GitHubSetup } from "../../components/ui/GitHubSetup.jsx";
import { CloudinarySetup, CLOUDINARY_KEY } from "../../components/ui/CloudinarySetup.jsx";

export function GalleryPage() {
  const { data: photos, save, loading, error, synced } = useGitHub(
    "data/gallery/photos.json",
    "couplePhotos",
    DEFAULT_PHOTOS
  );

  const [activeCat,      setActiveCat]      = useState("tous");
  const [showUpload,     setShowUpload]      = useState(false);
  const [showGitSetup,   setShowGitSetup]    = useState(false);
  const [showCloudSetup, setShowCloudSetup]  = useState(false);

  // ─── Premier accès : ouvre la config Cloudinary auto ────
  useEffect(() => {
    if (!localStorage.getItem(CLOUDINARY_KEY)) {
      setShowCloudSetup(true);
    }
  }, []);

  // ─── Filtrage ────────────────────────────────────────────
  const displayed = useMemo(() => {
    if (!photos) return [];
    const sorted = [...photos].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    if (activeCat === "tous") return sorted;
    return sorted.filter((p) => p.category === activeCat);
  }, [photos, activeCat]);

  const handleAdd    = (photo) => save([...(photos ?? []), photo]);
  const handleDelete = (id)    => save((photos ?? []).filter((p) => p.id !== id));
  const handleReact  = (id, emoji) =>
    save(
      (photos ?? []).map((p) =>
        p.id === id
          ? { ...p, reactions: { ...p.reactions, [emoji]: (p.reactions?.[emoji] ?? 0) + 1 } }
          : p
      )
    );

  const totalPhotos          = (photos ?? []).length;
  const cloudinaryConfigured = !!localStorage.getItem(CLOUDINARY_KEY);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #FFF0F4 0%, #FFD4C9 40%, #FFB1C2 75%, #F9F8FE 100%)" }}
    >
      {/* ── Modales ─────────────────────────────────────── */}
      {showCloudSetup && (
        <CloudinarySetup
          onClose={() => setShowCloudSetup(false)}
          onSaved={() => setShowCloudSetup(false)}
        />
      )}

      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} onAdd={handleAdd} />
      )}

      {showGitSetup && (
        <GitHubSetup onClose={() => setShowGitSetup(false)} />
      )}

      {/* ── HEADER ──────────────────────────────────────── */}
      <header
        className="sticky top-0 z-30 px-4 pt-safe pb-3"
        style={{
          background: "rgba(255,240,244,0.82)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,177,194,0.25)",
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 pt-4 pb-2">
            <Link
              to="/"
              className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
              style={{ background: "rgba(255,177,194,0.20)", border: "1px solid rgba(255,177,194,0.35)" }}
            >
              <span className="text-sm">←</span>
            </Link>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1
                  className="text-xl font-bold text-cerise leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Galerie 📸
                </h1>

                {/* Badge GitHub sync */}
                <button onClick={() => setShowGitSetup(true)}>
                  <SyncBadge synced={synced} loading={loading} error={error} />
                </button>

                {/* Badge Cloudinary */}
                <button
                  onClick={() => setShowCloudSetup(true)}
                  className="text-[10px] px-2 py-0.5 rounded-full transition-all"
                  style={{
                    background: cloudinaryConfigured ? "rgba(123,126,15,0.12)" : "rgba(192,15,61,0.10)",
                    color: cloudinaryConfigured ? "#7B7E0F" : "#C00F3D",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {cloudinaryConfigured ? "☁️ cloud ok" : "☁️ configurer"}
                </button>
              </div>

              <p
                className="text-[11px] text-rosy/60"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {totalPhotos} souvenir{totalPhotos > 1 ? "s" : ""}
                {activeCat !== "tous" &&
                  ` · ${GALLERY_CATEGORIES.find((c) => c.id === activeCat)?.label}`}
              </p>
            </div>
          </div>

          {/* Filtres */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mt-1">
            {GALLERY_CATEGORIES.map((cat) => {
              const count =
                cat.id === "tous"
                  ? totalPhotos
                  : (photos ?? []).filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95"
                  style={{
                    background: activeCat === cat.id ? cat.color : "rgba(255,255,255,0.55)",
                    color: activeCat === cat.id ? "#FFD4C9" : cat.color,
                    border: `1px solid ${activeCat === cat.id ? cat.color : "rgba(255,177,194,0.30)"}`,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                  {count > 0 && (
                    <span className="text-[10px] opacity-70" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ── CONTENU ─────────────────────────────────────── */}
      <main className="flex-1 px-4 py-4 max-w-md mx-auto w-full">
        {loading ? (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl animate-pulse"
                style={{ aspectRatio: "1/1", background: "rgba(255,177,194,0.15)", animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-6xl">🌸</span>
            <p className="text-base text-cerise/50 text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>
              {activeCat === "tous"
                ? "Ajoutez votre première photo ensemble !"
                : `Pas encore de photos "${GALLERY_CATEGORIES.find((c) => c.id === activeCat)?.label}"`}
            </p>
            {activeCat !== "tous" && (
              <button
                onClick={() => setActiveCat("tous")}
                className="text-xs px-4 py-2 rounded-full"
                style={{ background: "rgba(192,15,61,0.08)", color: "#C00F3D", fontFamily: "'DM Sans', sans-serif" }}
              >
                Voir toutes les photos
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {displayed.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} onReact={handleReact} onDelete={handleDelete} />
            ))}
          </div>
        )}
        <div className="h-24" />
      </main>

      {/* ── BOUTON AJOUT ────────────────────────────────── */}
      <button
        onClick={() => cloudinaryConfigured ? setShowUpload(true) : setShowCloudSetup(true)}
        className="fixed bottom-8 right-5 z-30 flex items-center gap-2 px-5 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
        style={{
          background: "linear-gradient(135deg, #C00F3D, #D77374)",
          boxShadow: "0 6px 28px rgba(192,15,61,0.38)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <span className="text-lg leading-none">📸</span>
        <span className="text-sm font-semibold text-white">Ajouter</span>
      </button>
    </div>
  );
}

export default GalleryPage;
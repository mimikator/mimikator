import { useState } from "react";
import { REACTIONS_LIST, GALLERY_CATEGORIES } from "../../data/gallery.js";

const CAT_MAP = Object.fromEntries(GALLERY_CATEGORIES.map((c) => [c.id, c]));

// ── Lightbox plein écran ─────────────────────────────────────
function Lightbox({ photo, onClose, onReact, onDelete }) {
  const cat = CAT_MAP[photo.category] ?? GALLERY_CATEGORIES[0];

  return (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(10,2,3,0.97)" }}
      onClick={onClose}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-safe pb-3 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}
          className="w-9 h-9 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,177,194,0.12)" }}>
          <span className="text-powder/70 text-sm">←</span>
        </button>
        <div className="text-center">
          <p className="text-xs font-semibold text-powder/60"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {cat.emoji} {cat.label}
          </p>
        </div>
        <button onClick={() => { onDelete(photo.id); onClose(); }}
          className="w-9 h-9 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(192,15,61,0.15)" }}>
          <span className="text-sm">🗑️</span>
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center px-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        <img src={photo.url} alt={photo.caption}
          className="max-w-full max-h-full rounded-2xl object-contain"
          style={{ maxHeight: "calc(100vh - 220px)" }}
        />
      </div>

      {/* Footer */}
      <div className="px-4 pb-safe pt-3 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}>
        {photo.caption && (
          <p className="text-sm text-center text-powder/70 mb-3 italic"
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1rem" }}>
            "{photo.caption}"
          </p>
        )}

        {/* Réactions */}
        <div className="flex justify-center gap-3 pb-2">
          {REACTIONS_LIST.map((emoji) => {
            const count = photo.reactions?.[emoji] ?? 0;
            return (
              <button key={emoji} onClick={() => onReact(photo.id, emoji)}
                className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all active:scale-90"
                style={{
                  background: count > 0 ? "rgba(192,15,61,0.15)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${count > 0 ? "rgba(192,15,61,0.30)" : "rgba(255,255,255,0.10)"}`,
                }}>
                <span className="text-xl leading-none">{emoji}</span>
                {count > 0 && (
                  <span className="text-[10px] font-bold text-powder/60"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>{count}</span>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-powder/25 mt-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {new Date(photo.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>
    </div>
  );
}

// ── Carte miniature ──────────────────────────────────────────
export function PhotoCard({ photo, onReact, onDelete }) {
  const [open, setOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const totalReactions = Object.values(photo.reactions ?? {}).reduce((s, v) => s + v, 0);

  return (
    <>
      {open && (
        <Lightbox
          photo={photo}
          onClose={() => setOpen(false)}
          onReact={onReact}
          onDelete={onDelete}
        />
      )}

      <button
        onClick={() => setOpen(true)}
        className="relative rounded-2xl overflow-hidden w-full transition-all active:scale-95"
        style={{ aspectRatio: "1 / 1", background: "rgba(255,177,194,0.12)" }}
      >
        {/* Skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse"
            style={{ background: "linear-gradient(135deg, rgba(255,177,194,0.15), rgba(255,177,194,0.08))" }} />
        )}

        <img
          src={photo.thumbUrl || photo.url}
          alt={photo.caption}
          className="w-full h-full object-cover"
          style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.3s ease" }}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />

        {/* Overlay infos */}
        {imgLoaded && (
          <div className="absolute inset-0 flex flex-col justify-end"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }}>
            <div className="px-2 pb-2">
              {photo.caption && (
                <p className="text-[10px] text-white/80 leading-tight line-clamp-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {photo.caption}
                </p>
              )}
              {totalReactions > 0 && (
                <p className="text-[10px] text-white/60 mt-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {Object.entries(photo.reactions ?? {})
                    .filter(([, v]) => v > 0)
                    .map(([e, v]) => `${e}${v > 1 ? v : ""}`)
                    .join(" ")}
                </p>
              )}
            </div>
          </div>
        )}
      </button>
    </>
  );
}

export default PhotoCard;
import { useState, useRef } from "react";
import { useCloudinary } from "../../hooks/useCloudinary.js";
import { GALLERY_CATEGORIES } from "../../data/gallery.js";
import { v4 as uuidv4 } from "uuid";

const CATS_NO_ALL = GALLERY_CATEGORIES.filter((c) => c.id !== "tous");

export function UploadModal({ onClose, onAdd }) {
  const [file,      setFile]      = useState(null);
  const [preview,   setPreview]   = useState(null);
  const [caption,   setCaption]   = useState("");
  const [category,  setCategory]  = useState("nous");
  const [uploadedBy, setUploadedBy] = useState("lui");
  const [error,     setError]     = useState(null);
  const inputRef = useRef(null);

  const { upload, uploading, progress } = useCloudinary();

  // ─── Sélection fichier ──────────────────────────────────
  const handleFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  // ─── Upload ─────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!file) { setError("Choisis une photo d'abord 📸"); return; }
    setError(null);

    try {
      const result = await upload(file);

      const photo = {
        id:           `p${Date.now()}`,
        cloudinaryId: result.cloudinaryId,
        url:          result.url,
        thumbUrl:     result.thumbUrl,
        caption:      caption.trim(),
        category,
        uploadedBy,
        reactions:    {},
        createdAt:    new Date().toISOString().slice(0, 10),
      };

      onAdd(photo);
      onClose();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6"
      style={{ background: "rgba(10,2,3,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: "#FFF0F4", border: "1px solid rgba(255,177,194,0.35)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2
            className="text-lg font-semibold text-cerise"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ajouter une photo
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-rosy/60 transition-all active:scale-90"
            style={{ background: "rgba(255,177,194,0.2)" }}
          >
            ✕
          </button>
        </div>

        <div className="px-5 pb-6 flex flex-col gap-4">
          {/* Drop zone */}
          <div
            className="relative rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer transition-all"
            style={{
              height: preview ? "220px" : "140px",
              background: preview ? "transparent" : "rgba(255,177,194,0.1)",
              border: `2px dashed ${preview ? "rgba(255,177,194,0.3)" : "rgba(192,15,61,0.25)"}`,
            }}
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">📸</span>
                <p
                  className="text-sm text-rosy/60 text-center"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Glisse une photo ici<br />ou clique pour choisir
                </p>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>

          {/* Progression upload */}
          {uploading && (
            <div className="w-full rounded-full overflow-hidden" style={{ height: "6px", background: "rgba(255,177,194,0.25)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg, #C00F3D, #FB8BA3)" }}
              />
            </div>
          )}

          {/* Caption */}
          <div>
            <label
              className="text-xs font-medium text-cerise/70 mb-1.5 block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Légende (optionnelle)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Notre plus beau moment..."
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(255,177,194,0.35)",
                color: "#7D0507",
                fontFamily: "'Dancing Script', cursive",
                fontSize: "0.95rem",
              }}
            />
          </div>

          {/* Catégorie */}
          <div>
            <label
              className="text-xs font-medium text-cerise/70 mb-2 block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Catégorie
            </label>
            <div className="flex flex-wrap gap-2">
              {CATS_NO_ALL.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95"
                  style={{
                    background:
                      category === cat.id
                        ? cat.color
                        : "rgba(255,177,194,0.12)",
                    color: category === cat.id ? "#FFD4C9" : cat.color,
                    border: `1px solid ${category === cat.id ? cat.color : "rgba(255,177,194,0.25)"}`,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Qui uploade */}
          <div>
            <label
              className="text-xs font-medium text-cerise/70 mb-2 block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Ajouté par
            </label>
            <div className="flex gap-2">
              {["lui", "elle"].map((who) => (
                <button
                  key={who}
                  onClick={() => setUploadedBy(who)}
                  className="flex-1 py-2 rounded-xl text-sm font-medium transition-all active:scale-95"
                  style={{
                    background:
                      uploadedBy === who
                        ? "linear-gradient(135deg, #C00F3D, #D77374)"
                        : "rgba(255,177,194,0.12)",
                    color: uploadedBy === who ? "#FFD4C9" : "#C00F3D",
                    border: "1px solid rgba(255,177,194,0.25)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {who === "lui" ? "👨 Lui" : "👩 Elle"}
                </button>
              ))}
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <p
              className="text-xs text-center rounded-xl px-4 py-2"
              style={{
                background: "rgba(192,15,61,0.08)",
                color: "#C00F3D",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={uploading || !file}
            className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all active:scale-95 disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #C00F3D, #D77374)",
              color: "#FFD4C9",
              boxShadow: "0 6px 20px rgba(192,15,61,0.3)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {uploading ? `Upload... ${progress}%` : "Ajouter la photo 📸"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
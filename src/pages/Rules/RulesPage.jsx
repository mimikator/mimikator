import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import { useGitHub } from "../../hooks/useGitHub.js";
import { DEFAULT_RULES } from "../../data/rules.js";

import { RuleCard } from "./RuleCard.jsx";
import { RuleEditor } from "./RuleEditor.jsx";

import { SyncBadge } from "../../components/ui/SyncBadge.jsx";
import { GitHubSetup } from "../../components/ui/GitHubSetup.jsx";

function fixEncoding(text) {
  try {
    return decodeURIComponent(escape(text));
  } catch {
    return text;
  }
}

export function RulesPage() {
  const {
    data: rules,
    save,
    loading,
    error,
    synced,
  } = useGitHub(
    "data/rules/rules.json",
    "coupleRules",
    DEFAULT_RULES
  );

  const [showEditor, setShowEditor] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  // ─────────────────────────────
  // TRI : PLUS ANCIEN → PLUS RÉCENT
  // ─────────────────────────────
  const displayed = useMemo(() => {
    if (!rules) return [];

    return [...rules].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
    );
  }, [rules]);

  // ─────────────────────────────
  // AJOUT
  // ─────────────────────────────
  const handleAdd = (rule) => {
    save([...(rules ?? []), rule]);
  };

  // ─────────────────────────────
  // LIKE
  // ─────────────────────────────
  const handleHeart = (id) => {
    save(
      (rules ?? []).map((r) =>
        r.id === id
          ? { ...r, hearts: r.hearts + 1 }
          : r
      )
    );
  };

  // ─────────────────────────────
  // DELETE
  // ─────────────────────────────
  const handleDelete = (id) => {
    save(
      (rules ?? []).filter((r) => r.id !== id)
    );
  };

  const totalHearts = (rules ?? []).reduce(
    (sum, r) => sum + r.hearts,
    0
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, #FFF0F4 0%, #FFD4C9 40%, #FFB1C2 75%, #F9F8FE 100%)",
      }}
    >
      {showSetup && (
        <GitHubSetup
          onClose={() => setShowSetup(false)}
        />
      )}

      {/* HEADER */}
      <header
        className="sticky top-0 z-30 px-4 pt-safe pb-4"
        style={{
          background: "rgba(255,240,244,0.80)",
          backdropFilter: "blur(20px)",
          borderBottom:
            "1px solid rgba(255,177,194,0.25)",
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 pt-4 pb-3">
            {/* BACK */}
            <Link
              to="/"
              className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
              style={{
                background:
                  "rgba(255,177,194,0.20)",
                border:
                  "1px solid rgba(255,177,194,0.35)",
              }}
            >
              <span className="text-sm">
                ←
              </span>
            </Link>

            {/* TITLE */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1
                  className="text-xl font-bold text-cerise leading-tight"
                  style={{
                    fontFamily:
                      "'Playfair Display', serif",
                  }}
                >
                  Bible des règles
                </h1>

                <button
                  onClick={() =>
                    setShowSetup(true)
                  }
                >
                  <SyncBadge
                    synced={synced}
                    loading={loading}
                    error={error}
                  />
                </button>
              </div>

              <p
                className="text-[11px] text-rosy/60"
                style={{
                  fontFamily:
                    "'Dancing Script', cursive",
                }}
              >
                {(rules ?? []).length} règle
                {(rules ?? []).length > 1
                  ? "s"
                  : ""}{" "}
                · {totalHearts} ❤️
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENU */}
      <main className="flex-1 px-4 py-5 max-w-md mx-auto w-full">
        {showEditor && (
          <div className="mb-5">
            <RuleEditor
              onAdd={handleAdd}
              onClose={() =>
                setShowEditor(false)
              }
            />
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <span className="text-3xl animate-pulse">
              🌸
            </span>

            <p
              className="text-sm text-rosy/50"
              style={{
                fontFamily:
                  "'Dancing Script', cursive",
              }}
            >
              Chargement...
            </p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-5xl">
              📭
            </span>

            <p
              className="text-base text-cerise/50 text-center"
              style={{
                fontFamily:
                  "'Dancing Script', cursive",
              }}
            >
              Aucune règle
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {displayed.map((rule) => (
              <RuleCard
                key={rule.id}
                rule={{
                  ...rule,
                  text: fixEncoding(rule.text),
                }}
                onHeart={handleHeart}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <div className="h-24" />
      </main>

      {/* FLOAT BUTTON */}
      {!showEditor && (
        <button
          onClick={() =>
            setShowEditor(true)
          }
          className="fixed bottom-8 right-5 z-30 flex items-center gap-2 px-5 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, #C00F3D, #D77374)",
            boxShadow:
              "0 6px 28px rgba(192,15,61,0.38)",
            fontFamily:
              "'DM Sans', sans-serif",
          }}
        >
          <span className="text-lg leading-none">
            ✍️
          </span>

          <span className="text-sm font-semibold text-white">
            Nouvelle règle
          </span>
        </button>
      )}
    </div>
  );
}

export default RulesPage;
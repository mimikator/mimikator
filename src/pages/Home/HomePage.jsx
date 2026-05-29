import { useState, useCallback } from "react";
import { FloatingHearts } from "../../components/animations/FloatingHearts.jsx";
import { CounterTimer }    from "./CounterTimer.jsx";
import { QuoteRotator }    from "./QuoteRotator.jsx";
import { CycleWeather }    from "./CycleWeather.jsx";
import { HomeNav }         from "./HomeNav.jsx";
import APP_CONFIG          from "../../config/app.js";

// Cœurs au clic
function spawnClickHeart(e) {
  const EMOJIS = ["🌸", "🙀", "​🏍️", "🌟​"];
  const el = document.createElement("span");
  el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
  el.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    font-size: ${16 + Math.random() * 12}px;
    pointer-events: none;
    z-index: 9999;
    animation: clickHeart 0.9s ease forwards;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

/**
 * HomePage — page d'accueil romantique
 */
export function HomePage() {
  const [heartCount, setHeartCount] = useState(0);

  const handleClick = useCallback((e) => {
    spawnClickHeart(e);
    setHeartCount((c) => c + 1);
  }, []);

  return (
    <>
      {/* ── Fond animé ── */}
      <FloatingHearts count={22} />

      {/* ── Page ── */}
      <div
        className="relative z-10 min-h-screen flex flex-col items-center px-4 pb-10 pt-safe"
        onClick={handleClick}
        style={{
          background:
            "linear-gradient(160deg, #FFF0F4 0%, #FFD4C9 35%, #FFB1C2 65%, #F9F8FE 100%)",
        }}
      >
        {/* Header */}
        <header className="w-full max-w-md flex items-center justify-between pt-10 pb-2">
          <div>
            <h1
              className="text-2xl text-cerise font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {APP_CONFIG.APP_NAME}
            </h1>
            <p
              className="text-xs text-rosy/70 mt-0.5"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Entre lecture, moto et dev. 🌸
            </p>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="w-full max-w-md flex flex-col gap-6 mt-6">

          {/* ── Section héro ── */}
          <section
            className="rounded-3xl px-6 py-8 text-center relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.45)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid rgba(255,177,194,0.4)",
              boxShadow: "0 8px 40px rgba(192,15,61,0.10)",
            }}
          >
            {/* Décoration */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #C00F3D, transparent)" }}
            />
            <div
              className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-15 pointer-events-none"
              style={{ background: "radial-gradient(circle, #FB8BA3, transparent)" }}
            />

            <p
              className="text-4xl mb-3 leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              🙀​
            </p>
            <h2
              className="text-xl font-bold text-cerise mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Oi
            </h2>

            {heartCount > 0 && (
              <p
                className="mt-2 text-[10px] text-rosy/50"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {heartCount} cœur{heartCount > 1 ? "s" : ""} envoyé{heartCount > 1 ? "s" : ""} 💕
              </p>
            )}
          </section>

          {/* ── Compteur ── */}
          <section
            className="rounded-3xl px-5 py-6"
            style={{
              background: "rgba(255,255,255,0.40)",
              backdropFilter: "blur(16px)",
              border: "1.5px solid rgba(255,177,194,0.3)",
              boxShadow: "0 4px 24px rgba(192,15,61,0.07)",
            }}
          >
            <CounterTimer meetingDate={APP_CONFIG.MEETING_DATE} />
          </section>

          {/* ── Météo cycle ── */}
          <section>
            <CycleWeather />
          </section>

          {/* ── Citation ── */}
          <section>
            <QuoteRotator />
          </section>

          {/* ── Navigation modules ── */}
          <section
            className="rounded-3xl px-5 py-6"
            style={{
              background: "rgba(255,255,255,0.40)",
              backdropFilter: "blur(16px)",
              border: "1.5px solid rgba(255,177,194,0.3)",
              boxShadow: "0 4px 24px rgba(192,15,61,0.07)",
            }}
          >
            <HomeNav />
          </section>
        </main>
      </div>
    </>
  );
}

export default HomePage;
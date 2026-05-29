import { useTimer } from "../../hooks/useTimer.js";

function Digit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-fraise"
          style={{
            background: "rgba(255,177,194,0.18)",
            backdropFilter: "blur(8px)",
            border: "1.5px solid rgba(255,177,194,0.35)",
            fontFamily: "'Playfair Display', serif",
            boxShadow: "0 4px 24px rgba(192,15,61,0.10)",
          }}
        >
          {String(value).padStart(2, "0")}
        </div>
      </div>
      <span
        className="mt-1.5 text-[10px] uppercase tracking-widest text-rosy/70"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * CounterTimer — affiche le temps depuis la rencontre
 */
export function CounterTimer({ meetingDate }) {
  const { days, hours, minutes, seconds } = useTimer(meetingDate);

  return (
    <div className="flex flex-col items-center gap-3">
      <p
        className="text-xs uppercase tracking-[0.2em] text-rosy/60"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Se connais depuis
      </p>
      <div className="flex items-start gap-2.5">
        <Digit value={days}    label="jours"     />
        <span className="text-rosy/50 text-xl font-light mt-4">:</span>
        <Digit value={hours}   label="heures"    />
        <span className="text-rosy/50 text-xl font-light mt-4">:</span>
        <Digit value={minutes} label="minutes"   />
        <span className="text-rosy/50 text-xl font-light mt-4">:</span>
        <Digit value={seconds} label="secondes"  />
      </div>
    </div>
  );
}

export default CounterTimer;
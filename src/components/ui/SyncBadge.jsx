/**
 * SyncBadge — pastille discrète indiquant l'état de synchronisation GitHub
 */
export function SyncBadge({ synced, loading, error }) {
  if (loading) return (
    <span className="text-[10px] px-2 py-1 rounded-full"
      style={{ background: "rgba(255,177,194,0.15)", color: "#FB8BA3", fontFamily: "'DM Sans', sans-serif" }}>
      ⏳ sync…
    </span>
  );
  if (error) return (
    <span className="text-[10px] px-2 py-1 rounded-full"
      style={{ background: "rgba(192,15,61,0.10)", color: "#C00F3D", fontFamily: "'DM Sans', sans-serif" }}
      title={error}>
      ⚠️ local
    </span>
  );
  if (synced) return (
    <span className="text-[10px] px-2 py-1 rounded-full"
      style={{ background: "rgba(123,126,15,0.12)", color: "#7B7E0F", fontFamily: "'DM Sans', sans-serif" }}>
      ☁️ sync
    </span>
  );
  return (
    <span className="text-[10px] px-2 py-1 rounded-full"
      style={{ background: "rgba(255,177,194,0.12)", color: "#FB8BA3", fontFamily: "'DM Sans', sans-serif" }}>
      💾 local
    </span>
  );
}

export default SyncBadge;
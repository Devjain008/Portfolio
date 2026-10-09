import { useState } from "react";
import { getKey, setKey, uid } from "./adminHelpers";

const ICONS = ["trophy", "award", "code", "zap"];
const BLANK = () => ({
  id: uid(),
  title: "",
  metric: "",
  description: "",
  icon: "trophy",
});

export default function AdminAchievements({ showToast }) {
  const [items, setItems] = useState(() => getKey("achievements").map((a) => ({ ...a })));

  const upd = (i, k, v) => setItems((xs) => xs.map((x, j) => j === i ? { ...x, [k]: v } : x));
  const del = (i) => setItems((xs) => xs.filter((_, j) => j !== i));
  const add = () => setItems((xs) => [...xs, BLANK()]);

  const save = (e) => {
    e.preventDefault();
    setKey("achievements", items);
    showToast("Achievements saved.");
  };

  return (
    <section aria-label="Edit achievements">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg" style={{ color: "var(--text)" }}>Achievements</h2>
        <button type="button" onClick={add} className="btn btn-ghost text-xs py-1.5 px-3">+ Add Achievement</button>
      </div>

      <form onSubmit={save} className="space-y-4">
        {items.map((a, i) => (
          <div key={a.id} className="admin-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="mono text-xs text-[--accent]">Achievement {i + 1}</span>
              <button type="button" onClick={() => del(i)} className="text-red-400 hover:text-red-300 p-1" aria-label={`Delete: ${a.title}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Title</label>
                <input className="field text-sm" value={a.title} onChange={(e) => upd(i, "title", e.target.value)} placeholder="Achievement title" />
              </div>
              <div>
                <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Metric (short)</label>
                <input className="field text-sm" value={a.metric} onChange={(e) => upd(i, "metric", e.target.value)} placeholder="Rating: 1845" />
              </div>
              <div>
                <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Icon</label>
                <select className="field text-sm" value={a.icon} onChange={(e) => upd(i, "icon", e.target.value)}>
                  {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Description</label>
              <textarea className="field resize-none text-sm" rows={2} value={a.description} onChange={(e) => upd(i, "description", e.target.value)} placeholder="What this achievement means" />
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary">Save Achievements</button>
      </form>
    </section>
  );
}

import { useState } from "react";
import { getKey, setKey } from "./adminHelpers";
import { useTheme } from "../hooks/useTheme";

export default function AdminAbout({ showToast }) {
  const { isDark } = useTheme();
  const def = getKey("about");

  const [paras, setParas] = useState([...def.paragraphs]);
  const [stats, setStats] = useState(def.stats.map((s) => ({ ...s })));

  const savePara   = (i, v) => setParas((p) => p.map((x, j) => j === i ? v : x));
  const addPara    = () => setParas((p) => [...p, ""]);
  const delPara    = (i) => setParas((p) => p.filter((_, j) => j !== i));
  const saveStat   = (i, k, v) => setStats((s) => s.map((x, j) => j === i ? { ...x, [k]: v } : x));
  const addStat    = () => setStats((s) => [...s, { label: "New Stat", value: "0" }]);
  const delStat    = (i) => setStats((s) => s.filter((_, j) => j !== i));

  const save = (e) => {
    e.preventDefault();
    setKey("about", { paragraphs: paras.filter(Boolean), stats });
    showToast("About section saved.");
  };

  return (
    <section aria-label="Edit about section">
      <h2 className="font-bold text-lg mb-6" style={{ color: "var(--text)" }}>About Section</h2>
      <form onSubmit={save} className="space-y-6">
        {/* Paragraphs */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>Bio Paragraphs</h3>
            <button type="button" onClick={addPara} className="btn btn-ghost text-xs py-1 px-2">+ Add</button>
          </div>
          <div className="space-y-3">
            {paras.map((p, i) => (
              <div key={i} className="flex gap-2">
                <textarea
                  className="field flex-1 resize-none"
                  rows={3}
                  value={p}
                  onChange={(e) => savePara(i, e.target.value)}
                  aria-label={`Paragraph ${i + 1}`}
                />
                <button type="button" onClick={() => delPara(i)}
                  className="text-red-400 hover:text-red-300 p-1 shrink-0"
                  aria-label={`Delete paragraph ${i + 1}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ borderColor: "var(--border)" }} />

        {/* Stats */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>Stats Row</h3>
            <button type="button" onClick={addStat} className="btn btn-ghost text-xs py-1 px-2">+ Add Stat</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <div key={i} className="admin-card flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <input className="field text-xs py-1.5" value={s.value} onChange={(e) => saveStat(i, "value", e.target.value)} placeholder="Value (e.g. 1100+)" />
                  <input className="field text-xs py-1.5" value={s.label} onChange={(e) => saveStat(i, "label", e.target.value)} placeholder="Label" />
                </div>
                <button type="button" onClick={() => delStat(i)}
                  className="text-red-400 hover:text-red-300 p-1 shrink-0 mt-1"
                  aria-label={`Delete stat: ${s.label}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Save About Section</button>
      </form>
    </section>
  );
}

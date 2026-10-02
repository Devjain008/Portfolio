import { useState } from "react";
import { getKey, setKey, uid } from "./adminHelpers";
import { useTheme } from "../hooks/useTheme";

const BLANK = () => ({
  id: uid(),
  degree: "",
  institution: "",
  location: "",
  period: "",
  score: "",
  status: "completed",
});

export default function AdminEducation({ showToast }) {
  const { isDark } = useTheme();
  const [items, setItems] = useState(() => getKey("education").map((e) => ({ ...e })));
  const [coursework, setCoursework] = useState(() => [...getKey("coursework")]);
  const [cwDraft, setCwDraft] = useState("");

  const upd = (i, k, v) => setItems((xs) => xs.map((x, j) => j === i ? { ...x, [k]: v } : x));
  const del = (i) => setItems((xs) => xs.filter((_, j) => j !== i));
  const add = () => setItems((xs) => [...xs, BLANK()]);

  const addCw = () => {
    const v = cwDraft.trim();
    if (v && !coursework.includes(v)) setCoursework((c) => [...c, v]);
    setCwDraft("");
  };
  const delCw = (i) => setCoursework((c) => c.filter((_, j) => j !== i));

  const save = (e) => {
    e.preventDefault();
    setKey("education",  items);
    setKey("coursework", coursework);
    showToast("Education saved.");
  };

  return (
    <section aria-label="Edit education">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg" style={{ color: "var(--text)" }}>Education</h2>
        <button type="button" onClick={add} className="btn btn-ghost text-xs py-1.5 px-3">+ Add Entry</button>
      </div>

      <form onSubmit={save} className="space-y-5">
        {items.map((edu, i) => (
          <div key={edu.id} className="admin-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="mono text-xs text-[--accent]">Entry {i + 1}</span>
              <button type="button" onClick={() => del(i)} className="text-red-400 hover:text-red-300 p-1" aria-label={`Delete entry: ${edu.degree}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Degree / Level", "degree", "text"],
                ["Institution",    "institution", "text"],
                ["Location",       "location", "text"],
                ["Period",         "period", "text"],
                ["Score / Grade",  "score",  "text"],
              ].map(([label, key, type]) => (
                <div key={key}>
                  <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>{label}</label>
                  <input type={type} className="field text-sm" value={edu[key]} onChange={(e) => upd(i, key, e.target.value)} />
                </div>
              ))}
              <div>
                <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Status</label>
                <select className="field text-sm" value={edu.status} onChange={(e) => upd(i, "status", e.target.value)}>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        <hr style={{ borderColor: "var(--border)" }} />

        {/* Coursework */}
        <div>
          <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--text)" }}>Relevant Coursework</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {coursework.map((c, i) => (
              <span key={i} className="chip flex items-center gap-1 pr-1">
                {c}
                <button type="button" onClick={() => delCw(i)} className="text-[--accent]/50 hover:text-red-400" aria-label={`Remove ${c}`}>×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="field text-sm flex-1"
              value={cwDraft}
              onChange={(e) => setCwDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCw(); } }}
              placeholder="New course (press Enter to add)"
            />
            <button type="button" onClick={addCw} className="btn btn-ghost text-xs py-1.5 px-3">Add</button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Save Education</button>
      </form>
    </section>
  );
}

import { useState } from "react";
import { getKey, setKey, uid } from "./adminHelpers";

export default function AdminSkills({ showToast }) {
  const [groups, setGroups] = useState(() =>
    getKey("skills").map((g) => ({ ...g, items: [...g.items] }))
  );

  const updGroup = (i, k, v) => setGroups((gs) => gs.map((g, j) => j === i ? { ...g, [k]: v } : g));
  const addGroup = () => setGroups((gs) => [...gs, { id: uid(), category: "New Category", icon: "◆", items: [] }]);
  const delGroup = (i) => setGroups((gs) => gs.filter((_, j) => j !== i));

  const updItem = (gi, ii, v) =>
    setGroups((gs) => gs.map((g, j) =>
      j === gi ? { ...g, items: g.items.map((it, k) => k === ii ? v : it) } : g
    ));
  const addItem = (gi) =>
    setGroups((gs) => gs.map((g, j) => j === gi ? { ...g, items: [...g.items, "New Skill"] } : g));
  const delItem = (gi, ii) =>
    setGroups((gs) => gs.map((g, j) => j === gi ? { ...g, items: g.items.filter((_, k) => k !== ii) } : g));

  const save = (e) => {
    e.preventDefault();
    setKey("skills", groups);
    showToast("Skills saved.");
  };

  return (
    <section aria-label="Edit skills">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg" style={{ color: "var(--text)" }}>Skills</h2>
        <button type="button" onClick={addGroup} className="btn btn-ghost text-xs py-1.5 px-3">
          + Add Group
        </button>
      </div>

      <form onSubmit={save} className="space-y-4">
        {groups.map((g, gi) => (
          <div key={g.id} className="admin-card space-y-3">
            <div className="flex items-center gap-2">
              <input
                className="field text-sm py-1.5 w-16"
                value={g.icon}
                onChange={(e) => updGroup(gi, "icon", e.target.value)}
                aria-label="Category icon/emoji"
              />
              <input
                className="field text-sm py-1.5 flex-1"
                value={g.category}
                onChange={(e) => updGroup(gi, "category", e.target.value)}
                aria-label="Category name"
              />
              <button
                type="button"
                onClick={() => delGroup(gi)}
                className="text-red-400 hover:text-red-300 p-1 shrink-0"
                aria-label={`Delete group: ${g.category}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {g.items.map((item, ii) => (
                <div key={ii} className="flex items-center gap-1 chip pr-1">
                  <input
                    className="bg-transparent border-none outline-none w-20 text-[--accent] font-mono text-xs"
                    value={item}
                    onChange={(e) => updItem(gi, ii, e.target.value)}
                    aria-label={`Skill: ${item}`}
                  />
                  <button
                    type="button"
                    onClick={() => delItem(gi, ii)}
                    className="text-[--accent]/50 hover:text-red-400 ml-0.5"
                    aria-label={`Remove ${item}`}
                  >×</button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem(gi)}
                className="mono text-xs text-[--accent]/60 hover:text-[--accent] transition-colors"
              >
                + skill
              </button>
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary mt-2">Save Skills</button>
      </form>
    </section>
  );
}

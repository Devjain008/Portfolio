import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import * as defaults from "../data/data";
import { saveAdminData, clearAdminData, loadAdminData } from "../hooks/useData";
import AdminProjects     from "./AdminProjects";
import AdminSkills       from "./AdminSkills";
import AdminEducation    from "./AdminEducation";
import AdminAchievements from "./AdminAchievements";
import AdminPersonal     from "./AdminPersonal";
import AdminAbout        from "./AdminAbout";

// ── Tab list ──────────────────────────────────────────────────
const TABS = [
  { id: "personal",     label: "Personal"     },
  { id: "about",        label: "About"        },
  { id: "skills",       label: "Skills"       },
  { id: "projects",     label: "Projects"     },
  { id: "education",    label: "Education"    },
  { id: "achievements", label: "Achievements" },
];

// ── Passcode gate ─────────────────────────────────────────────
function PasscodeGate({ onUnlock }) {
  const { isDark } = useTheme();
  const [val, setVal] = useState("");
  const [err, setErr] = useState("");

  const attempt = (e) => {
    e.preventDefault();
    if (val === defaults.adminConfig.passcode) {
      onUnlock();
    } else {
      setErr("Incorrect passcode. Hint: check data.js → adminConfig.passcode");
      setVal("");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? "" : "bg-slate-50"}`}>
      <div className="w-full max-w-sm">
        <div className="admin-card text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.2)] flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="font-bold text-xl mb-1" style={{ color: "var(--text)" }}>Admin Panel</h1>
          <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>Enter your passcode to continue.</p>
          <p className="mono text-xs mb-5 text-[--accent]/70">
            ⚠️ Client-side only — not real security
          </p>

          <form onSubmit={attempt} className="space-y-3">
            <input
              type="password"
              value={val}
              onChange={(e) => { setVal(e.target.value); setErr(""); }}
              placeholder="Passcode"
              className="field text-center"
              aria-label="Admin passcode"
              autoFocus
            />
            {err && <p role="alert" className="mono text-xs text-red-400">{err}</p>}
            <button type="submit" className="btn btn-primary w-full justify-center">
              Unlock
            </button>
          </form>

          <a href="/" className="mt-5 block mono text-xs text-[--accent] hover:underline">
            ← Back to portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main admin layout ─────────────────────────────────────────
export default function AdminPage() {
  const { isDark } = useTheme();
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState("personal");
  const [toast, setToast] = useState("");

  if (!unlocked) return <PasscodeGate onUnlock={() => setUnlocked(true)} />;

  // ── Data actions ──────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const exportJSON = () => {
    const current = loadAdminData() || {};
    const merged  = { ...defaults, ...current };
    // Remove non-serialisable exports (functions, etc. — data.js is all plain data)
    const safe = Object.fromEntries(
      Object.entries(merged).filter(([, v]) => typeof v !== "function")
    );
    const blob = new Blob([JSON.stringify(safe, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "portfolio-data.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("JSON exported! Paste it into src/data/data.js and redeploy.");
  };

  const importJSON = () => {
    const input = document.createElement("input");
    input.type  = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target.result);
          saveAdminData(parsed);
          showToast("Data imported! Refresh to see changes.");
        } catch {
          showToast("Invalid JSON file.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const resetData = () => {
    if (!window.confirm("Reset all edits to defaults? This cannot be undone.")) return;
    clearAdminData();
    showToast("Reset to defaults. Refresh to see changes.");
  };

  return (
    <div className={`min-h-screen ${isDark ? "" : "bg-slate-50"}`}>
      {/* Header */}
      <header className={`border-b px-6 py-4 flex items-center justify-between gap-4 flex-wrap ${
        isDark ? "bg-[--bg] border-[--border]" : "bg-white border-slate-200"
      }`}>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="mono text-xs text-[--accent] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] rounded"
          >
            ← Portfolio
          </a>
          <span style={{ color: "var(--border)" }}>|</span>
          <h1 className="font-bold text-base" style={{ color: "var(--text)" }}>
            Admin Panel
            <span className="ml-2 mono text-xs px-1.5 py-0.5 rounded bg-[rgba(34,211,238,0.08)] text-[--accent] border border-[rgba(34,211,238,0.2)]">
              localStorage
            </span>
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={exportJSON} className="btn btn-primary text-xs py-1.5 px-3">
            Export JSON
          </button>
          <button onClick={importJSON} className="btn btn-ghost text-xs py-1.5 px-3">
            Import JSON
          </button>
          <button
            onClick={resetData}
            className="btn text-xs py-1.5 px-3 border border-red-500/40 text-red-400 hover:bg-red-500/10 bg-transparent"
          >
            Reset to Defaults
          </button>
        </div>
      </header>

      {/* Workflow notice */}
      <div className={`px-6 py-3 border-b text-xs flex items-center gap-2 ${
        isDark ? "bg-[rgba(34,211,238,0.04)] border-[--border] text-[--text-muted]" : "bg-cyan-50 border-cyan-100 text-slate-600"
      }`}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>
          <strong>Workflow:</strong> Edit here → changes saved to localStorage for preview →
          click <strong>Export JSON</strong> → paste into <code className="mono text-[--accent]">src/data/data.js</code> → redeploy to Vercel.
        </span>
      </div>

      <div className="flex">
        {/* Sidebar tabs */}
        <aside className={`w-44 shrink-0 border-r min-h-[calc(100vh-88px)] py-4 px-3 ${
          isDark ? "border-[--border] bg-[--bg-card2]" : "border-slate-200 bg-white"
        }`}>
          <nav aria-label="Admin sections">
            <ul className="space-y-1" role="list">
              {TABS.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => setTab(t.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] ${
                      tab === t.id
                        ? "bg-[rgba(34,211,238,0.08)] text-[--accent] border border-[rgba(34,211,238,0.2)]"
                        : isDark
                        ? "text-slate-400 hover:text-white hover:bg-white/5"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                    aria-current={tab === t.id ? "page" : undefined}
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 max-w-3xl">
          {tab === "personal"     && <AdminPersonal     showToast={showToast} />}
          {tab === "about"        && <AdminAbout        showToast={showToast} />}
          {tab === "skills"       && <AdminSkills       showToast={showToast} />}
          {tab === "projects"     && <AdminProjects     showToast={showToast} />}
          {tab === "education"    && <AdminEducation    showToast={showToast} />}
          {tab === "achievements" && <AdminAchievements showToast={showToast} />}
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl bg-[--bg-card] border border-[rgba(34,211,238,0.3)] text-[--accent] mono text-sm shadow-xl z-50"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { getKey, setKey, uid } from "./adminHelpers";
import { useTheme } from "../hooks/useTheme";

const BLANK_PROJECT = () => ({
  id: uid(),
  title: "",
  subtitle: "",
  year: new Date().getFullYear().toString(),
  description: "",
  longDescription: "",
  highlights: [],
  stack: [],
  github: "",
  live: "",
  image: "",
  isPlaceholder: false,
});

function Tag({ value, onRemove }) {
  return (
    <span className="chip flex items-center gap-1 pr-1">
      {value}
      <button type="button" onClick={onRemove} className="text-[--accent]/50 hover:text-red-400 ml-0.5" aria-label={`Remove ${value}`}>×</button>
    </span>
  );
}

function TagInput({ values, onChange, placeholder }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const v = draft.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setDraft("");
  };
  return (
    <div className="flex flex-wrap gap-2 items-center p-2 rounded-lg border" style={{ borderColor: "var(--border)", background: "var(--bg-card2)" }}>
      {values.map((v, i) => (
        <Tag key={i} value={v} onRemove={() => onChange(values.filter((_, j) => j !== i))} />
      ))}
      <input
        className="bg-transparent outline-none mono text-xs text-[--accent] w-32"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } if (e.key === "," || e.key === "Tab") { e.preventDefault(); add(); } }}
        placeholder={placeholder}
      />
    </div>
  );
}

function ProjectForm({ project, onChange, onDelete }) {
  const { isDark } = useTheme();
  const set = (k) => (e) => onChange({ ...project, [k]: e.target.value });
  const setDirect = (k, v) => onChange({ ...project, [k]: v });

  const addHighlight = () => onChange({ ...project, highlights: [...project.highlights, ""] });
  const updHighlight = (i, v) => onChange({ ...project, highlights: project.highlights.map((h, j) => j === i ? v : h) });
  const delHighlight = (i) => onChange({ ...project, highlights: project.highlights.filter((_, j) => j !== i) });

  return (
    <div className="admin-card space-y-4">
      <div className="flex items-start gap-2 justify-between">
        <div className="flex items-center gap-2">
          <input type="checkbox" id={`ph-${project.id}`} checked={project.isPlaceholder}
            onChange={(e) => setDirect("isPlaceholder", e.target.checked)}
            className="accent-[#22d3ee]" />
          <label htmlFor={`ph-${project.id}`} className="mono text-xs" style={{ color: "var(--text-muted)" }}>Placeholder</label>
        </div>
        <button type="button" onClick={onDelete} className="text-red-400 hover:text-red-300 p-1" aria-label={`Delete project: ${project.title}`}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Title</label>
          <input className="field text-sm" value={project.title} onChange={set("title")} placeholder="Project Name" />
        </div>
        <div>
          <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Subtitle</label>
          <input className="field text-sm" value={project.subtitle} onChange={set("subtitle")} placeholder="Short tagline" />
        </div>
        <div>
          <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Year</label>
          <input className="field text-sm" value={project.year} onChange={set("year")} placeholder="2026" />
        </div>
        <div>
          <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Image path (in /public)</label>
          <input className="field text-sm" value={project.image} onChange={set("image")} placeholder="/projects/screenshot.png" />
        </div>
        <div>
          <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>GitHub URL</label>
          <input className="field text-sm" type="url" value={project.github} onChange={set("github")} placeholder="https://github.com/..." />
        </div>
        <div>
          <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Live URL</label>
          <input className="field text-sm" type="url" value={project.live} onChange={set("live")} placeholder="https://..." />
        </div>
      </div>

      <div>
        <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Short Description (card)</label>
        <textarea className="field resize-none text-sm" rows={2} value={project.description} onChange={set("description")} placeholder="One-paragraph summary for the card" />
      </div>
      <div>
        <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Long Description (modal)</label>
        <textarea className="field resize-none text-sm" rows={3} value={project.longDescription} onChange={set("longDescription")} placeholder="Detailed description shown in the modal" />
      </div>

      <div>
        <label className="block mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>Tech Stack (press Enter or Tab to add)</label>
        <TagInput values={project.stack} onChange={(v) => setDirect("stack", v)} placeholder="React…" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="mono text-xs" style={{ color: "var(--text-muted)" }}>Highlights (bullet points in modal)</label>
          <button type="button" onClick={addHighlight} className="mono text-xs text-[--accent] hover:underline">+ add</button>
        </div>
        <div className="space-y-2">
          {project.highlights.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input className="field flex-1 text-sm" value={h} onChange={(e) => updHighlight(i, e.target.value)} placeholder="Highlight" />
              <button type="button" onClick={() => delHighlight(i)} className="text-red-400 hover:text-red-300 p-1" aria-label="Remove highlight">×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminProjects({ showToast }) {
  const [projects, setProjects] = useState(() => getKey("projects").map((p) => ({ ...p })));

  const updProject = (i, v) => setProjects((ps) => ps.map((p, j) => j === i ? v : p));
  const addProject = () => setProjects((ps) => [...ps, BLANK_PROJECT()]);
  const delProject = (i) => setProjects((ps) => ps.filter((_, j) => j !== i));

  const save = (e) => {
    e.preventDefault();
    setKey("projects", projects);
    showToast("Projects saved.");
  };

  return (
    <section aria-label="Edit projects">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg" style={{ color: "var(--text)" }}>Projects</h2>
        <button type="button" onClick={addProject} className="btn btn-ghost text-xs py-1.5 px-3">+ Add Project</button>
      </div>

      <form onSubmit={save} className="space-y-5">
        {projects.map((p, i) => (
          <ProjectForm
            key={p.id}
            project={p}
            onChange={(v) => updProject(i, v)}
            onDelete={() => delProject(i)}
          />
        ))}
        <button type="submit" className="btn btn-primary">Save Projects</button>
      </form>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData }  from "../hooks/useData";
import { GithubIcon, ExternalLinkIcon } from "../components/Icons";
import { ScrollReveal, Stagger, StaggerItem } from "../components/ScrollReveal";

// ── Project card ──────────────────────────────────────────────
function ProjectCard({ project, onOpen }) {
  if (project.isPlaceholder) return null;

  return (
    <article
      className="card flex flex-col cursor-pointer group overflow-hidden"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
    >
      {/* Thumbnail */}
      <div className="h-40 sm:h-44 relative overflow-hidden flex items-center justify-center bg-[--bg-card2]">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : null}
        <span className="absolute text-[4.5rem] sm:text-[5rem] font-black text-[--accent]/10 select-none group-hover:text-[--accent]/18 transition-colors">
          {project.title.charAt(0)}
        </span>
        <span className="absolute top-3 right-3 mono text-xs px-2 py-0.5 rounded bg-black/40 text-[--accent] backdrop-blur-sm">
          {project.year}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <h3 className="font-bold text-base mb-0.5 group-hover:text-[--accent] transition-colors" style={{ color: "var(--text)" }}>
          {project.title}
        </h3>
        <p className="mono text-xs text-[--accent]/70 mb-2.5 sm:mb-3">{project.subtitle}</p>
        <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "var(--text-muted)" }}>
          {project.description}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4 pt-3 border-t border-dashed" style={{ borderColor: "var(--border)" }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`GitHub repository for ${project.title}`}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[--accent]"
              style={{ color: "var(--text-dimmed)" }}
            >
              <GithubIcon size={13} /> Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Live demo for ${project.title}`}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[--accent]"
              style={{ color: "var(--text-dimmed)" }}
            >
              <ExternalLinkIcon size={13} /> Live
            </a>
          )}
          <span className="ml-auto mono text-xs text-[--accent] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
            Details
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}

// ── Detail Modal ──────────────────────────────────────────────
function Modal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} — project details`}
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{ opacity: 0, scale: 0.92, y: 18 }}
          transition={{ duration: 0.22 }}
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border bg-[--bg-card2] border-[--border]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] text-slate-400 hover:text-white hover:bg-white/8"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Header image */}
          <div className="h-36 sm:h-48 relative bg-[--bg-card]">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <div className="absolute bottom-3.5 left-4 sm:bottom-4 sm:left-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h2>
              <p className="mono text-xs sm:text-sm text-[--accent]">{project.subtitle}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div>
              <h3 className="font-semibold text-sm mb-1.5 sm:mb-2" style={{ color: "var(--text-muted)" }}>Overview</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {project.longDescription || project.description}
              </p>
            </div>

            {project.highlights.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm mb-1.5 sm:mb-2" style={{ color: "var(--text-muted)" }}>Key Features</h3>
                <ul className="space-y-1.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" className="mt-0.5 shrink-0" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-sm mb-1.5 sm:mb-2" style={{ color: "var(--text-muted)" }}>Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.stack.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                   className="btn btn-outline text-xs sm:text-sm py-2 px-3 sm:px-4" aria-label={`GitHub for ${project.title}`}>
                  <GithubIcon size={14} /> View on GitHub
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                   className="btn btn-primary text-xs sm:text-sm py-2 px-3 sm:px-4" aria-label={`Live demo for ${project.title}`}>
                  <ExternalLinkIcon size={14} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Section ───────────────────────────────────────────────────
export default function Projects() {
  const { projects }  = useData();
  const [sel, setSel] = useState(null);

  const displayProjects = projects.filter((p) => !p.isPlaceholder);

  const open  = (p) => { setSel(p); document.body.style.overflow = "hidden"; };
  const close = ()  => { setSel(null); document.body.style.overflow = ""; };

  return (
    <section
      id="projects"
      aria-label="Featured projects"
      className="section"
    >
      <div className="container">
        <ScrollReveal preset="fadeUp" className="flex items-center gap-5 mb-12">
          <div>
            <span className="section-label">03. projects</span>
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <div className="divider" aria-hidden="true" />
        </ScrollReveal>

        <Stagger
          className={`grid gap-5 sm:gap-6 ${
            displayProjects.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
          gap={0.1}
        >
          {displayProjects.map((p) => (
            <StaggerItem key={p.id}>
              <ProjectCard project={p} onOpen={open} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {sel && !sel.isPlaceholder && <Modal project={sel} onClose={close} />}
    </section>
  );
}

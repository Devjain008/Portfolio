import { useTheme } from "../hooks/useTheme";
import { useData }  from "../hooks/useData";
import { ScrollReveal, Stagger, StaggerItem } from "../components/ScrollReveal";

export default function Education() {
  const { isDark }          = useTheme();
  const { education, coursework } = useData();

  return (
    <section
      id="education"
      aria-label="Education history"
      className={`section ${isDark ? "" : "bg-slate-50/60"}`}
    >
      <div className="container">
        <ScrollReveal preset="fadeUp" className="flex items-center gap-5 mb-12">
          <div>
            <span className="section-label">05. education</span>
            <h2 className="section-title">Education</h2>
          </div>
          <div className="divider" aria-hidden="true" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <ol className="relative pl-10" aria-label="Education timeline">
              <div className="timeline-bar" aria-hidden="true" />
              <Stagger staggerDelay={0.12}>
                {education.map((edu, i) => (
                  <StaggerItem key={edu.id}>
                    <li className="relative pb-10 last:pb-0">
                      {/* Dot */}
                      <div
                        className={`absolute -left-[2.55rem] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 ${
                          edu.status === "ongoing"
                            ? "border-[--accent] bg-[rgba(34,211,238,0.15)]"
                            : isDark
                            ? "border-[--border] bg-[--bg]"
                            : "border-slate-300 bg-white"
                        }`}
                        aria-hidden="true"
                      >
                        {edu.status === "ongoing" ? (
                          <span className="w-2 h-2 rounded-full bg-[--accent] animate-pulse" />
                        ) : (
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ color: "var(--text-dimmed)" }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>

                      {/* Card */}
                      <article className="card p-5 ml-3 hover:border-[rgba(34,211,238,0.2)]">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-base" style={{ color: "var(--text)" }}>
                              {edu.degree}
                            </h3>
                            <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                              {edu.institution}
                            </p>
                            <p className="mono text-xs mt-0.5" style={{ color: "var(--text-dimmed)" }}>
                              {edu.location}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <span
                              className={`mono text-xs px-2 py-0.5 rounded-full ${
                                edu.status === "ongoing"
                                  ? "bg-[rgba(34,211,238,0.08)] text-[--accent] border border-[rgba(34,211,238,0.25)]"
                                  : isDark
                                  ? "bg-white/5 text-[--text-dimmed] border border-[--border]"
                                  : "bg-slate-100 text-slate-400 border border-slate-200"
                              }`}
                            >
                              {edu.period}
                            </span>
                            {edu.score && (
                              <p className="mono text-xs text-[--accent] mt-1 font-semibold">
                                {edu.score}
                              </p>
                            )}
                          </div>
                        </div>
                        {edu.status === "ongoing" && (
                          <div className="flex items-center gap-1.5 mt-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[--accent] animate-pulse" aria-hidden="true" />
                            <span className="mono text-xs text-[--accent]">Currently enrolled</span>
                          </div>
                        )}
                      </article>
                    </li>
                  </StaggerItem>
                ))}
              </Stagger>
            </ol>
          </div>

          {/* Coursework */}
          <ScrollReveal preset="fadeRight" delay={0.15}>
            <aside aria-label="Relevant coursework">
              <div className={`card p-5 sticky top-24`}>
                <div className="flex items-center gap-2 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                  <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                    Relevant Coursework
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2" role="list">
                  {coursework.map((c) => (
                    <span key={c} className="chip" role="listitem">{c}</span>
                  ))}
                </div>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

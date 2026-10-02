import { useData }  from "../hooks/useData";
import { ScrollReveal, Stagger, StaggerItem } from "../components/ScrollReveal";

const ICON_MAP = {
  trophy: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  award: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  code: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  zap: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

export default function Achievements() {
  const { achievements } = useData();

  return (
    <section
      id="achievements"
      aria-label="Achievements and milestones"
      className="section bg-[--bg-card2]"
    >
      <div className="container">
        <ScrollReveal preset="fadeUp" className="flex items-center gap-5 mb-12">
          <div>
            <span className="section-label">06. achievements</span>
            <h2 className="section-title">Achievements</h2>
          </div>
          <div className="divider" aria-hidden="true" />
        </ScrollReveal>

        <Stagger className="grid md:grid-cols-3 gap-6" gap={0.1}>
          {achievements.map((a) => (
            <StaggerItem key={a.id}>
              <article
                className="card group p-6 flex flex-col justify-between h-full hover:border-[--accent]/40 transition-all duration-300"
                aria-label={a.title}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.18)] text-[--accent] group-hover:scale-110 transition-transform duration-200">
                      {ICON_MAP[a.icon] || ICON_MAP.trophy}
                    </div>
                    <span className="mono text-xs font-semibold px-2.5 py-1 rounded-full bg-[--accent]/10 border border-[--accent]/25 text-[--accent]">
                      {a.metric}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[--accent] transition-colors" style={{ color: "var(--text)" }}>
                    {a.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {a.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

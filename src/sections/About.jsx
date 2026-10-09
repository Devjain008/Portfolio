import { useData }  from "../hooks/useData";
import { ScrollReveal, Stagger, StaggerItem } from "../components/ScrollReveal";

function SectionHeader({ num, slug, title }) {
  return (
    <ScrollReveal preset="fadeUp" className="flex items-center gap-5 mb-12">
      <div>
        <span className="section-label">{num}. {slug}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="divider" aria-hidden="true" />
    </ScrollReveal>
  );
}

export default function About() {
  const { about } = useData();

  return (
    <section
      id="about"
      aria-label="About Dev Jain"
      className="section"
    >
      <div className="container">
        <SectionHeader num="01" slug="about" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Bio */}
          <div className="space-y-4 sm:space-y-5">
            {about.paragraphs.map((p, i) => (
              <ScrollReveal key={i} preset="fadeLeft" delay={i * 0.1}>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {p}
                </p>
              </ScrollReveal>
            ))}

            <ScrollReveal preset="fadeLeft" delay={0.3}>
              <div className="mt-4 p-3.5 sm:p-4 rounded-xl border border-[rgba(34,211,238,0.2)] bg-[rgba(34,211,238,0.04)]">
                <p className="mono text-xs text-[--accent] font-semibold mb-0.5">🎓 Currently</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  B.Tech Data Science @ BIRT Bhopal (2024–2028)
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats grid */}
          <Stagger className="grid grid-cols-2 gap-3 sm:gap-4" gap={0.08}>
            {about.stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="card p-4 sm:p-6 text-center cursor-default">
                  <div className="text-2xl sm:text-3xl font-extrabold mb-1 gradient-text">{s.value}</div>
                  <div className="mono text-[11px] sm:text-xs font-medium" style={{ color: "var(--text-dimmed)" }}>
                    {s.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

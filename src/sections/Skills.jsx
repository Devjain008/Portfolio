import { useTheme } from "../hooks/useTheme";
import { useData }  from "../hooks/useData";
import { ScrollReveal, Stagger, StaggerItem } from "../components/ScrollReveal";

export default function Skills() {
  const { isDark }  = useTheme();
  const { skills }  = useData();

  return (
    <section
      id="skills"
      aria-label="Skills and technologies"
      className={`section ${isDark ? "bg-[--bg-card2]" : "bg-white"}`}
    >
      <div className="container">
        <ScrollReveal preset="fadeUp" className="flex items-center gap-5 mb-12">
          <div>
            <span className="section-label">02. skills</span>
            <h2 className="section-title">Tech Stack</h2>
          </div>
          <div className="divider" aria-hidden="true" />
        </ScrollReveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" gap={0.07}>
          {skills.map((group) => (
            <StaggerItem key={group.id}>
              <article
                className="card p-5 h-full"
                aria-label={`${group.category} skills`}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="mono text-[--accent] text-sm font-bold" aria-hidden="true">
                    {group.icon}
                  </span>
                  <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                    {group.category}
                  </h3>
                </div>
                <div
                  className="flex flex-wrap gap-2"
                  role="list"
                  aria-label={`${group.category} technologies`}
                >
                  {group.items.map((skill) => (
                    <span key={skill} className="chip" role="listitem">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

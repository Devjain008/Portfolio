import { useData }  from "../hooks/useData";
import { ExternalLinkIcon } from "../components/Icons";
import { ScrollReveal, Stagger, StaggerItem } from "../components/ScrollReveal";

// ── LeetCode SVG ──────────────────────────────────────────────
function LCIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H19.48a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

// ── Codeforces SVG ────────────────────────────────────────────
function CFIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.5 7.5C3.12 7.5 2 8.62 2 10v10c0 1.38 1.12 2.5 2.5 2.5S7 21.38 7 20V10C7 8.62 5.88 7.5 4.5 7.5zm7.5-5C10.62 2.5 9.5 3.62 9.5 5v15c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-1.38-1.12-2.5-2.5-2.5zm7.5 9C18.12 11.5 17 12.62 17 14v6c0 1.38 1.12 2.5 2.5 2.5S22 21.38 22 20v-6c0-1.38-1.12-2.5-2.5-2.5z"/>
    </svg>
  );
}

// ── Badge pill ────────────────────────────────────────────────
function Badge({ label, color }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 mono text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full shrink-0"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}40`,
        color: color,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
      {label}
    </span>
  );
}

// ── Stat block ────────────────────────────────────────────────
function Stat({ value, label, color }) {
  return (
    <div className="flex flex-col items-center justify-center py-3.5 sm:py-5 px-1.5 sm:px-4 rounded-xl bg-white/4 border border-white/5 text-center min-w-0">
      <span
        className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-0.5 sm:mb-1 truncate max-w-full"
        style={{ color }}
      >
        {value}
      </span>
      <span className="mono text-[10px] sm:text-xs truncate max-w-full" style={{ color: "var(--text-dimmed)" }}>
        {label}
      </span>
    </div>
  );
}

// ── Platform card ─────────────────────────────────────────────
function PlatformCard({ platform, handle, badge, badgeColor, accentColor, icon: Icon, statsList, profileUrl, highlights }) {
  return (
    <article
      className="card p-5 sm:p-6 flex flex-col gap-5 sm:gap-6 h-full"
      aria-label={`${platform} competitive programming stats`}
    >
      {/* Platform header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="p-2 sm:p-2.5 rounded-xl shrink-0"
            style={{ background: `${accentColor}14`, border: `1px solid ${accentColor}30`, color: accentColor }}
          >
            <Icon size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-base truncate" style={{ color: "var(--text)" }}>
              {platform}
            </h3>
            <p className="mono text-xs mt-0.5 truncate" style={{ color: "var(--text-dimmed)" }}>
              @{handle}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <Badge label={badge} color={badgeColor || accentColor} />
        </div>
      </div>

      {/* Stats row */}
      <div className={`grid gap-2 sm:gap-3 ${statsList.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
        {statsList.map((s) => (
          <Stat key={s.label} value={s.value} label={s.label} color={s.color || accentColor} />
        ))}
      </div>

      {/* Highlights */}
      {highlights && highlights.length > 0 && (
        <ul className="space-y-2">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke={accentColor} strokeWidth="2.5" strokeLinecap="round"
                className="mt-0.5 shrink-0" aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {h}
            </li>
          ))}
        </ul>
      )}

      {/* Spacer pushes button to bottom */}
      <div className="flex-1" />

      {/* Profile button */}
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline w-full justify-center text-sm py-2"
        style={{ borderColor: `${accentColor}60`, color: accentColor }}
        aria-label={`Open ${platform} profile`}
      >
        <ExternalLinkIcon size={13} />
        View {platform} Profile
      </a>
    </article>
  );
}

// ── Section ───────────────────────────────────────────────────
export default function CP() {
  const { cp }     = useData();
  const { leetcode, codeforces } = cp;

  return (
    <section
      id="cp"
      aria-label="Competitive programming"
      className="section bg-[--bg-card2]"
    >
      <div className="container">
        {/* Header */}
        <ScrollReveal preset="fadeUp" className="flex items-center gap-5 mb-12">
          <div>
            <span className="section-label">04. competitive programming</span>
            <h2 className="section-title">Competitive Programming</h2>
          </div>
          <div className="divider" aria-hidden="true" />
        </ScrollReveal>

        <Stagger className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6" gap={0.1}>
          {/* LeetCode */}
          <StaggerItem preset="fadeLeft">
            <PlatformCard
              platform={leetcode.platform}
              handle={leetcode.handle}
              badge={leetcode.badge}
              accentColor="#FFA116"
              icon={LCIcon}
              profileUrl={leetcode.profileUrl}
              statsList={[
                { label: "Rating",       value: leetcode.rating,  color: "#FFA116" },
                { label: "Problems",     value: leetcode.solved,  color: "var(--accent)" },
                { label: "Badge",        value: leetcode.badge,   color: "#FFA116" },
              ]}
              highlights={[
                "Knight badge — top competitive tier",
                "1100+ problems across Easy, Medium & Hard",
                "Focus on DSA patterns, graphs, DP & greedy",
              ]}
            />
          </StaggerItem>

          {/* Codeforces */}
          <StaggerItem preset="fadeRight">
            <PlatformCard
              platform={codeforces.platform}
              handle={codeforces.handle}
              badge={codeforces.badge}
              badgeColor="#22c55e"
              accentColor="#1890ff"
              icon={CFIcon}
              profileUrl={codeforces.profileUrl}
              statsList={[
                { label: "Max Rating",   value: codeforces.maxRating || codeforces.rating || 1372, color: "#22c55e" },
                { label: "Problems",     value: codeforces.solved || "354", color: "var(--accent)" },
                { label: "Max Streak",   value: codeforces.streak || "67 days", color: "#38bdf8" },
              ]}
              highlights={[
                "Pupil rank with a max rating of 1372",
                "354 problems solved (24 in the last month)",
                "Max consistency streak of 67 consecutive days",
              ]}
            />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

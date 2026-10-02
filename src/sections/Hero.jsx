import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useData }  from "../hooks/useData";
import { GithubIcon, LinkedinIcon, MailIcon, LeetcodeIcon, ExternalLinkIcon, CodeforcesIcon } from "../components/Icons";

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

const FADE = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function Hero() {
  const { isDark } = useTheme();
  const { personal } = useData();

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const socials = [
    { href: personal.socials.github,      Icon: GithubIcon,      label: "GitHub"      },
    { href: personal.socials.leetcode,    Icon: LeetcodeIcon,    label: "LeetCode"    },
    { href: personal.socials.codeforces,  Icon: CodeforcesIcon,  label: "Codeforces"  },
    { href: personal.socials.linkedin,    Icon: LinkedinIcon,    label: "LinkedIn"    },
    { href: personal.socials.email,       Icon: MailIcon,        label: "Email"       },
  ];

  return (
    <section
      id="hero"
      aria-label="Hero introduction"
      className={`relative min-h-screen flex flex-col justify-center hero-grid ${
        isDark ? "" : "bg-gradient-to-b from-slate-50 to-white"
      }`}
    >
      {/* Decorative blobs */}
      <div className="blob w-[480px] h-[480px] bg-cyan-400/20 -top-32 -left-32 opacity-[0.12]" aria-hidden="true" />
      <div className="blob w-[360px] h-[360px] bg-indigo-500/20 top-1/2 -right-24 opacity-[0.10]" aria-hidden="true" />

      <div className="container relative z-10 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Status badge */}
          <motion.div {...FADE(0.05)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(34,211,238,0.3)] bg-[rgba(34,211,238,0.05)] mb-7">
            <span className="w-2 h-2 rounded-full bg-[--accent] animate-pulse" aria-hidden="true" />
            <span className="mono text-xs text-[--accent] font-medium">Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...FADE(0.15)}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-4"
            style={{ color: "var(--text)" }}
          >
            {personal.name}<span className="text-[--accent]">.</span>
          </motion.h1>

          {/* Title */}
          <motion.p {...FADE(0.25)} className="mono text-[--accent] text-sm sm:text-base font-medium mb-5 tracking-wide">
            &gt;&nbsp;{personal.title}
          </motion.p>

          {/* Pitch */}
          <motion.p
            {...FADE(0.35)}
            className="text-base sm:text-lg leading-relaxed mb-9 max-w-xl"
            style={{ color: "var(--text-muted)" }}
          >
            {personal.pitch}
          </motion.p>

          {/* CTAs */}
          <motion.div {...FADE(0.45)} className="flex flex-wrap gap-3 mb-11">
            <button
              onClick={() => scrollTo("projects")}
              className="btn btn-primary"
              aria-label="View my projects"
            >
              <ExternalLinkIcon size={15} />
              View Projects
            </button>
            <a
              href={personal.resume}
              download
              className="btn btn-outline"
              aria-label="Download my resume PDF"
            >
              <DownloadIcon />
              Download Resume
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="btn btn-ghost"
              aria-label="Go to contact section"
            >
              <MailIcon size={15} />
              Contact Me
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div {...FADE(0.55)} className="flex items-center gap-4">
            <span className="mono text-xs" style={{ color: "var(--text-dimmed)" }}>find me on</span>
            <div className="flex gap-3" role="list" aria-label="Social media links">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  role="listitem"
                  className={`p-2 rounded-lg border transition-all duration-200 hover:-translate-y-0.5
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] ${
                    isDark
                      ? "border-[--border] text-slate-400 hover:text-[--accent] hover:border-[rgba(34,211,238,0.35)] hover:bg-[rgba(34,211,238,0.05)]"
                      : "border-slate-200 text-slate-500 hover:text-cyan-600 hover:border-cyan-200 hover:bg-cyan-50"
                  }`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="mono text-xs" style={{ color: "var(--text-dimmed)" }}>scroll</span>
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" style={{ color: "var(--text-dimmed)" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.div>
    </section>
  );
}

import { useData }  from "../hooks/useData";
import { GithubIcon, LinkedinIcon, MailIcon, LeetcodeIcon, CodeforcesIcon } from "./Icons";

export default function Footer() {
  const { personal } = useData();

  const socials = [
    { href: personal.socials.github,      Icon: GithubIcon,      label: "GitHub"      },
    { href: personal.socials.leetcode,    Icon: LeetcodeIcon,    label: "LeetCode"    },
    { href: personal.socials.codeforces,  Icon: CodeforcesIcon,  label: "Codeforces"  },
    { href: personal.socials.linkedin,    Icon: LinkedinIcon,    label: "LinkedIn"    },
    { href: personal.socials.email,       Icon: MailIcon,        label: "Email"       },
  ];

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      role="contentinfo"
      className="border-t py-8 sm:py-10 border-[--border] bg-[--bg]"
    >
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <button
              onClick={scrollTop}
              className="font-extrabold text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] rounded"
              aria-label="Back to top"
            >
              <span style={{ color: "var(--text)" }}>Dev<span className="text-[--accent]">.</span>Jain</span>
            </button>
            <p className="mono text-xs" style={{ color: "var(--text-dimmed)" }}>
              © {new Date().getFullYear()} Dev Jain. All rights reserved.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3" role="list" aria-label="Social media links">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                role="listitem"
                className="p-2 rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] text-slate-500 hover:text-[--accent]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollTop}
            aria-label="Back to top of page"
            className="flex items-center gap-1.5 mono text-xs transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] rounded text-slate-500 hover:text-[--accent]"
          >
            back to top
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData }  from "../hooks/useData";

// Inline icons to avoid import overhead in the nav chunk
function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
export default function Navbar() {
  const data = useData();
  const navLinks = data.navLinks;

  const [open,    setOpen]    = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active,  setActive]  = useState("");

  // Shadow on scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const obs = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, [navLinks]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const bg = scrolled
    ? "bg-[#0a0f1e]/90 backdrop-blur-md border-b border-[#1e293b] shadow-lg shadow-black/20"
    : "bg-transparent";

  const linkBase =
    "px-3 py-1.5 rounded-md text-sm font-medium mono transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent]";
  const linkActive   = "text-[--accent] bg-[rgba(34,211,238,0.08)]";
  const linkInactive = "text-slate-400 hover:text-white hover:bg-white/5";

  return (
    <header role="banner" className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${bg}`}>
      <nav
        className="container flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => go(e, "#hero")}
          className="flex items-center gap-2 font-extrabold text-lg focus-visible:outline-none"
          aria-label="Dev Jain — scroll to top"
        >
          <span className="p-1.5 rounded-lg bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.2)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </span>
          <span style={{ color: "var(--text)" }}>
            Dev<span className="text-[--accent]">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map(({ label, href }) => {
            const id = href.slice(1);
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => go(e, href)}
                  className={`${linkBase} ${active === id ? linkActive : linkInactive}`}
                  aria-current={active === id ? "page" : undefined}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {data.personal?.resume && (
            <a
              href={data.personal.resume}
              download
              className="!hidden sm:!inline-flex btn btn-outline text-xs py-1 px-3"
              aria-label="Download resume PDF"
            >
              Resume
            </a>
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden p-2 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] text-slate-400 hover:text-white hover:bg-white/5 shrink-0"
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t bg-[#0a0f1e]/95 backdrop-blur-md border-[#1e293b]"
          >
            <ul className="flex flex-col px-4 py-3 gap-1" role="list">
              {navLinks.map(({ label, href }) => {
                const id = href.slice(1);
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => go(e, href)}
                      className={`block ${linkBase} ${active === id ? linkActive : linkInactive}`}
                      aria-current={active === id ? "page" : undefined}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
              {data.personal?.resume && (
                <li className="pt-2">
                  <a
                    href={data.personal.resume}
                    download
                    className="btn btn-outline text-xs w-full justify-center py-2"
                    aria-label="Download resume PDF"
                  >
                    Download Resume
                  </a>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

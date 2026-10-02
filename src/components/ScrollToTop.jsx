import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 450);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="stt"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className={`fixed bottom-6 right-6 z-40 p-3 rounded-full border shadow-lg transition-colors
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] focus-visible:ring-offset-2 ${
            isDark
              ? "bg-[--bg-card] border-[--border] text-[--accent] hover:bg-[rgba(34,211,238,0.08)] hover:border-[rgba(34,211,238,0.35)] focus-visible:ring-offset-[--bg]"
              : "bg-white border-slate-200 text-cyan-500 hover:bg-cyan-50 hover:border-cyan-300 focus-visible:ring-offset-white"
          }`}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

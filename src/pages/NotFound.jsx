import { useTheme } from "../hooks/useTheme";

export default function NotFound() {
  const { isDark } = useTheme();
  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center text-center px-6 ${isDark ? "" : "bg-slate-50"}`}
      aria-label="404 page not found"
    >
      <span className="section-label mb-3">404 error</span>
      <h1 className="text-7xl font-extrabold mb-4" style={{ color: "var(--text)" }}>
        Oops<span className="text-[--accent]">.</span>
      </h1>
      <p className="text-lg mb-8 max-w-sm" style={{ color: "var(--text-muted)" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" className="btn btn-primary">
        ← Back to Home
      </a>
    </main>
  );
}

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import Navbar      from "./components/Navbar";
import Footer      from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// ── Lazy-loaded sections (code splitting) ────────────────────
const Hero         = lazy(() => import("./sections/Hero"));
const About        = lazy(() => import("./sections/About"));
const Skills       = lazy(() => import("./sections/Skills"));
const Projects     = lazy(() => import("./sections/Projects"));
const CP           = lazy(() => import("./sections/CP"));
const Education    = lazy(() => import("./sections/Education"));
const Achievements = lazy(() => import("./sections/Achievements"));
const Contact      = lazy(() => import("./sections/Contact"));

// ── Admin & 404 ──────────────────────────────────────────────
const AdminPage  = lazy(() => import("./admin/AdminPage"));
const NotFound   = lazy(() => import("./pages/NotFound"));

function Loader() {
  return (
    <div
      className="flex items-center justify-center py-24"
      aria-label="Loading section"
      role="status"
    >
      <span className="w-8 h-8 rounded-full border-2 border-[--accent] border-t-transparent animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

// ── The single-page portfolio ─────────────────────────────────
function Portfolio() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<Loader />}><Hero /></Suspense>
        <Suspense fallback={<Loader />}><About /></Suspense>
        <Suspense fallback={<Loader />}><Skills /></Suspense>
        <Suspense fallback={<Loader />}><Projects /></Suspense>
        <Suspense fallback={<Loader />}><CP /></Suspense>
        <Suspense fallback={<Loader />}><Education /></Suspense>
        <Suspense fallback={<Loader />}><Achievements /></Suspense>
        <Suspense fallback={<Loader />}><Contact /></Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

// ── App root ─────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Skip-to-content for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] btn btn-primary"
        >
          Skip to main content
        </a>

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/"      element={<Portfolio />} />
            <Route path="/admin" element={<AdminPage  />} />
            <Route path="*"      element={<NotFound   />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

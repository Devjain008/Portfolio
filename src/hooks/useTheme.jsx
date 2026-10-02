// src/hooks/useTheme.jsx
import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext({ isDark: true, toggle: () => {} });

export function ThemeProvider({ children }) {
  useEffect(() => {
    // Enforce dark mode permanently across sessions
    document.body.classList.remove("light");
    localStorage.removeItem("portfolio_theme");
    localStorage.removeItem("theme");
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark: true, toggle: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

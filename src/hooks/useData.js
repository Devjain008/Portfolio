// src/hooks/useData.js
// ─────────────────────────────────────────────────────────────
// Returns data merged from localStorage (admin edits) over the
// default data.js exports. Admin edits only affect THIS browser
// until you export the JSON and paste it back into data.js.
// ─────────────────────────────────────────────────────────────
import { useMemo } from "react";
import * as defaults from "../data/data";

const LS_KEY = "portfolio_admin_data";

export function useData() {
  return useMemo(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return defaults;
      const overrides = JSON.parse(raw);
      // Deep-merge: override top-level keys that exist in LS
      return { ...defaults, ...overrides };
    } catch {
      return defaults;
    }
  }, []);
}

// ─── Helpers used by the admin panel ─────────────────────────
export const ADMIN_LS_KEY = LS_KEY;

export function loadAdminData() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAdminData(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function clearAdminData() {
  localStorage.removeItem(LS_KEY);
}

export function getFullData() {
  const overrides = loadAdminData() || {};
  return { ...defaults, ...overrides };
}

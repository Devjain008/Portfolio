// src/admin/adminHelpers.js
// Shared utilities for admin sub-panels
import { loadAdminData, saveAdminData } from "../hooks/useData";
import * as defaults from "../data/data";

/** Get current effective value of a top-level key */
export function getKey(key) {
  const overrides = loadAdminData() || {};
  return key in overrides ? overrides[key] : defaults[key];
}

/** Save an updated value for a top-level key to localStorage */
export function setKey(key, value) {
  const overrides = loadAdminData() || {};
  saveAdminData({ ...overrides, [key]: value });
}

/** Generate a simple unique id */
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

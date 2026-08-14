import { NEWS, IMAGES } from "./content.js";

export const ADMIN_KEYS = {
  news: "acu_news_items",
  settings: "acu_site_settings",
};

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read image file."));
    reader.readAsDataURL(file);
  });
}

export const DEFAULT_SITE_SETTINGS = {
  heroImage: IMAGES.hero,
  heroImage2: IMAGES.campusWide,
  heroImage3: IMAGES.aboutSecondary,
};

export function getStoredNews() {
  try {
    const raw = localStorage.getItem(ADMIN_KEYS.news);
    if (!raw) return NEWS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : NEWS;
  } catch {
    return NEWS;
  }
}

export function saveStoredNews(items) {
  localStorage.setItem(ADMIN_KEYS.news, JSON.stringify(items));
  return items;
}

export function getStoredSettings() {
  try {
    const raw = localStorage.getItem(ADMIN_KEYS.settings);
    if (!raw) return DEFAULT_SITE_SETTINGS;
    return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export function saveStoredSettings(settings) {
  localStorage.setItem(ADMIN_KEYS.settings, JSON.stringify(settings));
  return settings;
}

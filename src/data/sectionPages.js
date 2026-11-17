// Content for the informational pages reached from the primary navigation
// (Academics > Resources, Admissions, Student Life, Student Services, Research,
// News & Events).
//
// The copy lives in sectionPages.json so the API seed can read the same file.
// Pages are edited in the admin (Pages) once the site is connected to the API;
// this file is the bundled fallback used when the API is unreachable, and the
// starting point for a fresh database. Each entry is keyed by its exact route.

import PAGES from "./sectionPages.json";

export const SECTION_PAGES = PAGES;

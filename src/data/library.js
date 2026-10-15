// Shared vocabulary and fallbacks for the University Library. Imported by the
// library app and the admin schema so the two never drift, and by cms.js as the
// bundled fallback when the API is unavailable.

export const RESOURCE_TYPES = [
  "Book",
  "Journal",
  "Reference",
  "Thesis",
  "Project",
  "E-book",
];

export const ERESOURCE_CATEGORIES = [
  "Database",
  "E-journal",
  "E-book",
  "Open access",
  "Repository",
  "Other",
];

export const AVAILABILITY = [
  { value: "available", label: "Available" },
  { value: "reference", label: "Reference only" },
  { value: "on-loan", label: "On loan" },
  { value: "withdrawn", label: "Withdrawn" },
];

const AVAILABILITY_BY_VALUE = new Map(
  AVAILABILITY.map(({ value, label }) => [value, label]),
);

export function availabilityLabel(value) {
  return AVAILABILITY_BY_VALUE.get(value) || value || "";
}

// A link helper so the same pages can render at "/" on the library subdomain and
// under "/library" when previewed from the main site.
export function libraryPath(base, path = "") {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}` || "/";
}

export const LIBRARY_NAV = [
  { label: "Home", path: "" },
  { label: "Catalogue", path: "/catalogue" },
  { label: "E-Resources", path: "/e-resources" },
  { label: "Repository", path: "/repository" },
  { label: "Services", path: "/services" },
  { label: "About & Hours", path: "/about" },
  { label: "Ask a Librarian", path: "/contact" },
];

export const LIBRARY_SETTINGS_FALLBACK = {
  eyebrow: "University Library",
  title: "Knowledge, research and lifelong learning",
  intro:
    "The Ajayi Crowther University Library supports teaching, learning and research across every faculty — with print and electronic collections, reading rooms, research support and an open-access institutional repository.",
  searchPlaceholder: "Search the catalogue by title, author, ISBN or subject",
  hoursNote:
    "Opening hours vary by branch. The main library is open throughout the semester; vacation hours are shorter.",
  enquiryEmail: "library@acu.edu.ng",
  requestIntro:
    "Can't find a title, or need help with research? Send the library a request and a librarian will get back to you.",
  quickLinks: [
    { label: "Search the catalogue", path: "/catalogue" },
    { label: "Electronic resources", path: "/e-resources" },
    { label: "Institutional repository", path: "/repository" },
    { label: "Ask a librarian", path: "/contact" },
  ],
};

export const LIBRARY_FALLBACKS = {
  settings: LIBRARY_SETTINGS_FALLBACK,
  books: [],
  eResources: [],
  branches: [],
  services: [],
};

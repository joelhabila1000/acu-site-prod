// Shared vocabulary for the Institutional Repository. Imported by both the
// admin schema (the "Type" dropdown) and the public repository pages (the
// collection grid and the browse filters), so the two never drift apart.

export const COLLECTIONS = [
  {
    key: "theses",
    title: "Theses & Dissertations",
    text: "Undergraduate projects, master's dissertations and doctoral theses examined and approved by the University.",
  },
  {
    key: "articles",
    title: "Journal Articles & Preprints",
    text: "Peer-reviewed articles and preprints authored or co-authored by ACU academic staff.",
  },
  {
    key: "conference",
    title: "Conference Papers",
    text: "Papers, abstracts and proceedings presented by staff and students at local and international meetings.",
  },
  {
    key: "books",
    title: "Books & Book Chapters",
    text: "Monographs, edited volumes and contributed chapters published by the University community.",
  },
  {
    key: "reports",
    title: "Reports & Policies",
    text: "Institutional reports, annual reviews, working papers and policy documents of lasting value.",
  },
  {
    key: "datasets",
    title: "Datasets & Creative Works",
    text: "Research datasets, audio-visual material and other creative outputs supporting scholarship.",
  },
];

export const REPOSITORY_TYPES = [
  { value: "Thesis", collection: "theses" },
  { value: "Dissertation", collection: "theses" },
  { value: "Undergraduate project", collection: "theses" },
  { value: "Journal article", collection: "articles" },
  { value: "Preprint", collection: "articles" },
  { value: "Conference paper", collection: "conference" },
  { value: "Book", collection: "books" },
  { value: "Book chapter", collection: "books" },
  { value: "Report", collection: "reports" },
  { value: "Policy", collection: "reports" },
  { value: "Dataset", collection: "datasets" },
  { value: "Creative work", collection: "datasets" },
];

const COLLECTION_BY_TYPE = new Map(
  REPOSITORY_TYPES.map(({ value, collection }) => [value, collection]),
);

export function collectionForType(type) {
  return COLLECTION_BY_TYPE.get(type) || "";
}

export function collectionTitle(key) {
  const match = COLLECTIONS.find((collection) => collection.key === key);
  return match ? match.title : "";
}

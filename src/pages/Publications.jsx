import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { usePublications } from "../data/cms.js";
import "./Publications.css";

const TYPE_FILTERS = [
  { label: "All", value: "all" },
  { label: "Journal articles", value: "Journal article" },
  { label: "Books", value: "Book" },
  { label: "Book chapters", value: "Book chapter" },
  { label: "Conference papers", value: "Conference paper" },
  { label: "Theses", value: "Thesis" },
];

// A stable reference for the empty case, so the memoised filters below do not
// recompute on every render.
const NO_PUBLICATIONS = [];

// Build the "Journal, 12(3), 145–160" line from whichever parts are present.
function citation(publication) {
  const volume = publication.volume
    ? `${publication.volume}${publication.issue ? `(${publication.issue})` : ""}`
    : publication.issue;
  return [publication.venue, volume, publication.pages].filter(Boolean).join(", ");
}

function paperLink(publication) {
  if (publication.url) return publication.url;
  if (publication.doi) {
    return `https://doi.org/${publication.doi.replace(
      /^https?:\/\/(dx\.)?doi\.org\//i,
      "",
    )}`;
  }
  return "";
}

export default function Publications() {
  const publications = usePublications() || NO_PUBLICATIONS;
  const [type, setType] = useState("all");
  const [year, setYear] = useState("all");

  const years = useMemo(() => {
    const found = new Set();
    publications.forEach((item) => {
      if (item.year) found.add(item.year);
    });
    return [...found].sort((a, b) => b - a);
  }, [publications]);

  const visible = useMemo(
    () =>
      publications
        .filter((item) => type === "all" || item.type === type)
        .filter((item) => year === "all" || String(item.year) === year)
        .sort((a, b) => {
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return (b.year || 0) - (a.year || 0);
        }),
    [publications, type, year],
  );

  return (
    <>
      <PageHeader
        crumb="Research"
        title="Research & Publications"
        lede="Books, journal articles, chapters and conference papers produced by Ajayi Crowther University's scholars."
      />

      <section className="section">
        <div className="container pubs-intro">
          <p className="eyebrow">Our scholarship</p>
          <h2>Research that serves Church and society</h2>
          <p>
            ACU's staff and postgraduate researchers publish across the
            humanities, the sciences, the social sciences and the professions.
            This catalogue records their output; where a publisher or repository
            link is available it is shown with the entry.
          </p>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="pubs-head">
            <h2>Publications</h2>
            <span className="pubs-count">
              {visible.length} {visible.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          <div className="pubs-filters">
            <div className="pubs-chips" role="group" aria-label="Filter by type">
              {TYPE_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  className={`pubs-chip ${
                    type === filter.value ? "is-active" : ""
                  }`}
                  aria-pressed={type === filter.value}
                  onClick={() => setType(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {years.length > 0 && (
              <label className="pubs-year">
                <span>Year</span>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="all">All years</option>
                  {years.map((value) => (
                    <option key={value} value={String(value)}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          {visible.length === 0 ? (
            <p className="pubs-empty">
              No publications match this filter yet.
            </p>
          ) : (
            <ol className="pubs-list">
              {visible.map((publication) => {
                const link = paperLink(publication);
                const line = citation(publication);
                return (
                  <li className="pub-card" key={publication.id}>
                    <div className="pub-top">
                      {publication.featured && (
                        <span className="pub-badge pub-badge--featured">
                          Featured
                        </span>
                      )}
                      {publication.type && (
                        <span className="pub-badge">{publication.type}</span>
                      )}
                      {publication.year && (
                        <span className="pub-year">{publication.year}</span>
                      )}
                    </div>

                    <h3 className="pub-title">{publication.title}</h3>

                    {publication.authors && (
                      <p className="pub-authors">{publication.authors}</p>
                    )}

                    {(line || publication.faculty) && (
                      <p className="pub-venue">
                        {line}
                        {publication.faculty && (
                          <span className="pub-faculty">
                            {line ? " · " : ""}
                            {publication.faculty}
                          </span>
                        )}
                      </p>
                    )}

                    {publication.abstract && (
                      <p className="pub-abstract">{publication.abstract}</p>
                    )}

                    {(link || publication.fileUrl) && (
                      <div className="pub-links">
                        {link && (
                          <a
                            className="btn btn-navy btn-sm"
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View paper
                          </a>
                        )}
                        {publication.fileUrl && (
                          <a
                            className="pub-btn-outline"
                            href={publication.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Full text (PDF)
                          </a>
                        )}
                      </div>
                    )}

                    {publication.doi && (
                      <p className="pub-doi">DOI: {publication.doi}</p>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}

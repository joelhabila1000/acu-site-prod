import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import { COLLECTIONS } from "../data/repository.js";
import { useRepository } from "../data/cms.js";
import "./Repository.css";

const depositSteps = [
  {
    title: "Prepare your files",
    text: "Have the final, approved version of your work ready as a PDF (or the accepted file type for the material).",
  },
  {
    title: "Contact the library",
    text: "Submit your work to the University Library, who manage deposits on behalf of staff and students.",
  },
  {
    title: "Upload and describe",
    text: "Library staff upload the file and complete the metadata — title, authors, abstract, faculty, department and keywords.",
  },
  {
    title: "Review and publish",
    text: "The submission is checked for rights before it is published with a permanent, citable link.",
  },
];

const NO_ITEMS = [];

export default function Repository() {
  const items = useRepository() || NO_ITEMS;
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("all");
  const [faculty, setFaculty] = useState("all");
  const [year, setYear] = useState("all");

  const faculties = useMemo(() => {
    const found = new Set();
    items.forEach((item) => {
      if (item.faculty) found.add(item.faculty);
    });
    return [...found].sort((a, b) => a.localeCompare(b));
  }, [items]);

  const years = useMemo(() => {
    const found = new Set();
    items.forEach((item) => {
      if (item.year) found.add(item.year);
    });
    return [...found].sort((a, b) => b - a);
  }, [items]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (collection !== "all" && item.collection !== collection) return false;
      if (faculty !== "all" && item.faculty !== faculty) return false;
      if (year !== "all" && String(item.year) !== year) return false;
      if (!needle) return true;
      return [item.title, item.authors, item.abstract, item.keywords]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [items, query, collection, faculty, year]);

  const filtering =
    query.trim() !== "" ||
    collection !== "all" ||
    faculty !== "all" ||
    year !== "all";

  function clearFilters() {
    setQuery("");
    setCollection("all");
    setFaculty("all");
    setYear("all");
  }

  return (
    <div className="repository-page">
      <section className="repository-hero">
        <div className="container repository-hero-inner">
          <div className="repository-hero-copy">
            <span className="repository-tag">Open access</span>
            <h1>ACU Institutional Repository</h1>
            <p>
              A permanent, open-access home for the research, scholarship and
              creative work of Ajayi Crowther University — freely searchable by
              students, staff and the wider public.
            </p>
            <div className="repository-hero-actions">
              <a className="btn btn-gold" href="#browse">
                Browse the Repository
              </a>
              <a className="btn btn-outline-light" href="#deposit">
                How to deposit
              </a>
            </div>
          </div>

          <div className="repository-hero-visual" aria-hidden="true">
            <div className="repository-shelf">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="repository-shelf">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="repository-shelf">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      <section className="section repository-about">
        <div className="container repository-about-grid">
          <Reveal className="repository-about-copy">
            <p className="eyebrow">About the repository</p>
            <h2>Preserving ACU scholarship and opening it to the world</h2>
            <p>
              The ACU Institutional Repository collects, preserves and makes
              openly available the intellectual output of the University. It
              brings together theses and dissertations, journal articles,
              conference papers, books and other research materials in one
              searchable archive.
            </p>
            <p>
              Managed by the University Library, the repository supports
              discovery, citation and long-term access, and gives ACU
              researchers a citable, permanent home for their work.
            </p>
          </Reveal>

          <Reveal className="repository-about-card" variant="scale" delay={140}>
            <h3>Managed by the University Library</h3>
            <ul>
              <li>Open access — free to search and read</li>
              <li>Permanent links that can be cited</li>
              <li>Preserved and backed up for the long term</li>
              <li>Discoverable through search engines</li>
            </ul>
            <a className="btn btn-navy" href="#browse">
              Search the Repository
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">What you will find</p>
            <h2>Collections across every faculty</h2>
            <p>
              Materials are organised so readers can browse by type, faculty,
              department, author or year.
            </p>
          </div>

          <div className="repository-collections">
            {COLLECTIONS.map((item, index) => (
              <Reveal key={item.key} delay={(index % 3) * 80}>
                <article className="repository-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="browse">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Browse &amp; search</p>
            <h2>Search the repository</h2>
            <p>
              Find works by title, author or keyword, or narrow the list by
              collection, faculty and year.
            </p>
          </div>

          <div className="repository-filters">
            <label className="repository-search">
              <span className="repository-visually-hidden">
                Search the repository
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, author or keyword…"
              />
            </label>

            <div className="repository-chips" role="group" aria-label="Filter by collection">
              <button
                type="button"
                className={`repository-chip ${collection === "all" ? "is-active" : ""}`}
                aria-pressed={collection === "all"}
                onClick={() => setCollection("all")}
              >
                All
              </button>
              {COLLECTIONS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`repository-chip ${
                    collection === item.key ? "is-active" : ""
                  }`}
                  aria-pressed={collection === item.key}
                  onClick={() => setCollection(item.key)}
                >
                  {item.title}
                </button>
              ))}
            </div>

            <div className="repository-selects">
              {faculties.length > 0 && (
                <label className="repository-select">
                  <span>Faculty</span>
                  <select
                    value={faculty}
                    onChange={(event) => setFaculty(event.target.value)}
                  >
                    <option value="all">All faculties</option>
                    {faculties.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {years.length > 0 && (
                <label className="repository-select">
                  <span>Year</span>
                  <select
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                  >
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
          </div>

          <div className="repository-results-head">
            <span className="repository-count">
              {visible.length} {visible.length === 1 ? "record" : "records"}
            </span>
            {filtering && (
              <button
                type="button"
                className="repository-clear"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="repository-empty">
              No works have been deposited in the repository yet. Please check
              back soon, or contact the library to deposit your work.
            </p>
          ) : visible.length === 0 ? (
            <p className="repository-empty">
              No records match your search. Try different keywords or clear the
              filters.
            </p>
          ) : (
            <div className="repository-results">
              {visible.map((item) => (
                <Link
                  key={item.id}
                  className="repository-result"
                  to={`/directory/library/repository/${item.slug}`}
                >
                  <div className="repository-result-top">
                    {item.itemType && (
                      <span className="repository-result-type">
                        {item.itemType}
                      </span>
                    )}
                    {item.year && (
                      <span className="repository-result-year">{item.year}</span>
                    )}
                  </div>
                  <h3>{item.title}</h3>
                  {item.authors && (
                    <p className="repository-result-authors">{item.authors}</p>
                  )}
                  {item.faculty && (
                    <p className="repository-result-meta">{item.faculty}</p>
                  )}
                  <span className="repository-result-cta">
                    {item.fileUrl ? "View & download" : "View record"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-navy" id="deposit">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Open access</p>
            <h2>How to deposit your work</h2>
            <p>
              Staff and students can add their research to the repository in
              four steps.
            </p>
          </div>

          <div className="repository-steps">
            {depositSteps.map((step, index) => (
              <Reveal key={step.title} delay={(index % 4) * 80}>
                <article className="repository-step">
                  <span className="repository-step-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section repository-cta">
        <div className="container repository-cta-inner">
          <div>
            <p className="eyebrow">Get started</p>
            <h2>Explore the ACU Institutional Repository</h2>
            <p>
              Search the collections, or contact the library for help with
              depositing and using the records.
            </p>
          </div>
          <div className="repository-cta-actions">
            <a className="btn btn-gold" href="#browse">
              Browse the Repository
            </a>
            <Link className="btn btn-outline-dark" to="/contact">
              Contact the Library
            </Link>
            <Link className="btn btn-outline-dark" to="/directory/library">
              Back to the Library
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

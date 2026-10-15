import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLibraryBooks, useLibraryBranches } from "../../data/cms.js";
import { RESOURCE_TYPES, AVAILABILITY } from "../../data/library.js";
import BookCard from "../components/BookCard.jsx";

const EMPTY = [];

export default function Catalogue({ base }) {
  const books = useLibraryBooks() || EMPTY;
  const branches = useLibraryBranches() || EMPTY;
  const [params, setParams] = useSearchParams();

  const [query, setQuery] = useState(params.get("q") || "");
  const [type, setType] = useState(params.get("type") || "");
  const [subject, setSubject] = useState(params.get("subject") || "");
  const [branch, setBranch] = useState(params.get("branch") || "");
  const [availability, setAvailability] = useState(params.get("availability") || "");

  const subjects = useMemo(
    () => [...new Set(books.map((book) => book.subject).filter(Boolean))].sort(),
    [books],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((book) => {
      if (type && book.resourceType !== type) return false;
      if (subject && book.subject !== subject) return false;
      if (branch && String(book.branchId) !== String(branch)) return false;
      if (availability && book.availability !== availability) return false;
      if (q) {
        const haystack = [book.title, book.authors, book.isbn, book.subject, book.description]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [books, query, type, subject, branch, availability]);

  function apply(next) {
    const merged = { q: query, type, subject, branch, availability, ...next };
    const sp = new URLSearchParams();
    for (const [key, value] of Object.entries(merged)) {
      if (value) sp.set(key, value);
    }
    setParams(sp, { replace: true });
  }

  function onSearch(event) {
    event.preventDefault();
    apply({});
  }

  function reset() {
    setQuery("");
    setType("");
    setSubject("");
    setBranch("");
    setAvailability("");
    setParams(new URLSearchParams(), { replace: true });
  }

  const filtering = Boolean(query || type || subject || branch || availability);

  return (
    <>
      <section className="lib-section lib-section--tight" style={{ paddingBottom: 0 }}>
        <div className="lib-container">
          <div className="lib-section-head">
            <h2>Catalogue</h2>
            <p>
              Search books, journals, reference works and theses held across the
              campus libraries.
            </p>
          </div>
        </div>
      </section>

      <section className="lib-section" style={{ paddingTop: 20 }}>
        <div className="lib-container">
          <form className="lib-filters" onSubmit={onSearch}>
            <div className="lib-field">
              <label htmlFor="cat-q">Search</label>
              <input
                id="cat-q"
                type="search"
                placeholder="Title, author, ISBN or subject"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="lib-field">
              <label htmlFor="cat-type">Type</label>
              <select id="cat-type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">All types</option>
                {RESOURCE_TYPES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="lib-field">
              <label htmlFor="cat-subject">Subject</label>
              <select
                id="cat-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">All subjects</option>
                {subjects.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="lib-field">
              <label htmlFor="cat-branch">Branch</label>
              <select
                id="cat-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="">All branches</option>
                {branches.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="lib-field">
              <label htmlFor="cat-availability">Availability</label>
              <select
                id="cat-availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option value="">Any</option>
                {AVAILABILITY.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="lib-filters-reset">
              {filtering ? (
                <button type="button" className="lib-btn-link" onClick={reset}>
                  Clear filters
                </button>
              ) : null}
            </div>
          </form>

          <div className="lib-results-head">
            <span>
              {filtered.length} {filtered.length === 1 ? "record" : "records"}
            </span>
          </div>

          {filtered.length ? (
            <div className="lib-grid lib-grid--4">
              {filtered.map((book) => (
                <BookCard key={book.id} book={book} base={base} />
              ))}
            </div>
          ) : (
            <div className="lib-empty">
              {books.length
                ? "No records match your search. Try clearing some filters."
                : "No catalogue records are available yet."}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

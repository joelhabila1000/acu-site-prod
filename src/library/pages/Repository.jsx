import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useRepository } from "../../data/cms.js";
import { COLLECTIONS } from "../../data/repository.js";
import { libraryPath } from "../../data/library.js";

const EMPTY = [];

export default function Repository({ base }) {
  const items = useRepository() || EMPTY;
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (collection && item.collection !== collection) return false;
      if (q) {
        const haystack = [item.title, item.authors, item.abstract, item.keywords]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [items, query, collection]);

  return (
    <>
      <section className="lib-section lib-section--tight" style={{ paddingBottom: 0 }}>
        <div className="lib-container">
          <div className="lib-section-head">
            <h2>Institutional repository</h2>
            <p>
              Theses, dissertations, journal articles, conference papers and other
              research outputs from ACU staff and students — free to search and
              read.
            </p>
          </div>
        </div>
      </section>

      <section className="lib-section" style={{ paddingTop: 24 }}>
        <div className="lib-container">
          <form className="lib-filters" onSubmit={(event) => event.preventDefault()}>
            <div className="lib-field" style={{ gridColumn: "1 / span 2" }}>
              <label htmlFor="repo-q">Search</label>
              <input
                id="repo-q"
                type="search"
                placeholder="Title, author, keyword or abstract"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="lib-field">
              <label htmlFor="repo-collection">Collection</label>
              <select
                id="repo-collection"
                value={collection}
                onChange={(event) => setCollection(event.target.value)}
              >
                <option value="">All collections</option>
                {COLLECTIONS.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <div className="lib-results-head">
            <span>
              {filtered.length} {filtered.length === 1 ? "record" : "records"}
            </span>
          </div>

          {filtered.length ? (
            <div className="lib-grid lib-grid--3">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  to={libraryPath(base, `/repository/${item.slug}`)}
                  className="lib-tile"
                >
                  <span className="lib-tile-provider">
                    {item.itemType}
                    {item.year ? ` · ${item.year}` : ""}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.authors}</p>
                  <div className="lib-tile-note">
                    <span className="lib-tile-go">View record →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="lib-empty">
              {items.length
                ? "No records match your search."
                : "No works have been deposited yet."}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

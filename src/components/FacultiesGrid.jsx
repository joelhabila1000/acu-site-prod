import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FACULTIES, IMAGES } from "../data/content.js";
import "./FacultiesGrid.css";

export default function FacultiesGrid({ limit }) {
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState("");
  const source = limit ? FACULTIES.slice(0, limit) : FACULTIES;
  const letters = [...new Set(source.map((faculty) => faculty.name[0]))].sort();
  const cardImages = [
    IMAGES.heroCampusOne,
    IMAGES.heroCampusTwo,
    IMAGES.heroCampusThree,
    IMAGES.heroCampusFour,
    IMAGES.heroCampusFive,
    IMAGES.heroCampusSix,
    IMAGES.students,
  ];

  const list = useMemo(() => {
    const query = search.trim().toLowerCase();

    return source.filter((faculty) => {
      const matchesSearch =
        !query ||
        faculty.name.toLowerCase().includes(query) ||
        faculty.summary.toLowerCase().includes(query) ||
        faculty.programmes.some((programme) =>
          programme.toLowerCase().includes(query),
        );
      const matchesLetter = !letter || faculty.name.startsWith(letter);

      return matchesSearch && matchesLetter;
    });
  }, [letter, search, source]);

  return (
    <>
      {!limit && (
        <div className="faculty-directory-controls">
          <label className="faculty-search">
            <span className="sr-only">Search faculties</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search faculties or programmes"
            />
          </label>

          <div className="faculty-letter-filter" aria-label="Filter faculties by letter">
            <button
              type="button"
              className={!letter ? "is-active" : ""}
              onClick={() => setLetter("")}
            >
              All
            </button>
            {letters.map((item) => (
              <button
                type="button"
                key={item}
                className={letter === item ? "is-active" : ""}
                onClick={() => setLetter(letter === item ? "" : item)}
              >
                {item}
              </button>
            ))}
          </div>

          <p className="faculty-result-count" aria-live="polite">
            {list.length} {list.length === 1 ? "faculty" : "faculties"}
          </p>
        </div>
      )}

      {list.length ? (
        <div className="faculties-grid">
          {list.map((faculty, index) => (
            <Link key={faculty.slug} to={faculty.url} className="faculty-card">
              <div className="faculty-card-image">
                <img
                  src={cardImages[index % cardImages.length]}
                  alt=""
                />
                <span>ACU Academics</span>
              </div>
              <div className="faculty-card-content">
              <span className="faculty-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>Faculty of {faculty.name}</h3>
              <p>{faculty.tagline}</p>
              <span className="faculty-link">Explore faculty →</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="faculty-empty-state">
          <p>No faculties match that search.</p>
          <button type="button" onClick={() => { setSearch(""); setLetter(""); }}>
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}

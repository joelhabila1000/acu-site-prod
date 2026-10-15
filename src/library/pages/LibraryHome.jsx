import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useLibrarySettings,
  useLibraryBooks,
  useLibraryEResources,
  useLibraryServices,
  useLibraryBranches,
} from "../../data/cms.js";
import { libraryPath } from "../../data/library.js";
import BookCard from "../components/BookCard.jsx";
import ResourceCard from "../components/ResourceCard.jsx";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// The seed stores ranges like "Monday – Friday" and single days like "Saturday",
// so match by whether the row mentions today's name.
function todayRow(hours) {
  const today = DAYS[new Date().getDay()];
  if (!Array.isArray(hours)) return null;
  return hours.find((entry) => String(entry.day || "").includes(today)) || null;
}

export default function LibraryHome({ base }) {
  const settings = useLibrarySettings();
  const books = useLibraryBooks() || [];
  const resources = useLibraryEResources() || [];
  const services = useLibraryServices() || [];
  const branches = useLibraryBranches() || [];
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const featured = books.filter((book) => book.featured).slice(0, 4);
  const latest = (featured.length ? featured : books).slice(0, 4);
  const mainBranch = branches[0];
  const today = mainBranch ? todayRow(mainBranch.hours) : null;

  function search(event) {
    event.preventDefault();
    const q = query.trim();
    navigate(libraryPath(base, `/catalogue${q ? `?q=${encodeURIComponent(q)}` : ""}`));
  }

  return (
    <>
      <section className="lib-hero">
        <div className="lib-container lib-hero-inner">
          <span className="lib-eyebrow">{settings.eyebrow}</span>
          <h1>{settings.title}</h1>
          <p>{settings.intro}</p>
          <form className="lib-hero-search lib-search" onSubmit={search} role="search">
            <input
              type="search"
              aria-label="Search the catalogue"
              placeholder={settings.searchPlaceholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit">Search catalogue</button>
          </form>
        </div>
      </section>

      <div className="lib-container">
        <div className="lib-hours-strip">
          <span className="lib-hours-badge">{mainBranch ? mainBranch.name : "Library"}</span>
          {today ? (
            <span
              className={
                today.opens ? "lib-hours-open" : "lib-hours-closed"
              }
            >
              {today.opens ? `Open today ${today.opens} – ${today.closes}` : "Closed today"}
            </span>
          ) : null}
          <Link className="lib-link-more" to={libraryPath(base, "/about")}>
            All branches & hours
          </Link>
          <span className="lib-hours-note">{settings.hoursNote}</span>
        </div>
      </div>

      <section className="lib-section">
        <div className="lib-container">
          <div className="lib-section-head lib-section-head--row">
            <div>
              <h2>New &amp; featured in the catalogue</h2>
              <p>Recent titles and highlighted resources across the collections.</p>
            </div>
            <Link className="lib-link-more" to={libraryPath(base, "/catalogue")}>
              Browse the full catalogue
            </Link>
          </div>
          {latest.length ? (
            <div className="lib-grid lib-grid--4">
              {latest.map((book) => (
                <BookCard key={book.id} book={book} base={base} />
              ))}
            </div>
          ) : (
            <div className="lib-empty">No catalogue records yet.</div>
          )}
        </div>
      </section>

      {settings.quickLinks?.length ? (
        <section className="lib-section lib-section--tight lib-section--cream">
          <div className="lib-container">
            <div className="lib-grid lib-grid--4">
              {settings.quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={libraryPath(base, link.path)}
                  className="lib-service-card"
                >
                  <h3>{link.label}</h3>
                  <p>Jump straight to {link.label.toLowerCase()}.</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {resources.length ? (
        <section className="lib-section">
          <div className="lib-container">
            <div className="lib-section-head lib-section-head--row">
              <div>
                <h2>Electronic resources</h2>
                <p>Databases, e-journals and open-access collections.</p>
              </div>
              <Link className="lib-link-more" to={libraryPath(base, "/e-resources")}>
                All e-resources
              </Link>
            </div>
            <div className="lib-grid lib-grid--4">
              {resources.slice(0, 4).map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {services.length ? (
        <section className="lib-section lib-section--cream">
          <div className="lib-container">
            <div className="lib-section-head">
              <h2>Library services</h2>
              <p>Support for reading, research and scholarship at every level.</p>
            </div>
            <div className="lib-grid lib-grid--3">
              {services.slice(0, 3).map((service) => (
                <article key={service.id} className="lib-service-card">
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </article>
              ))}
            </div>
            <p style={{ marginTop: 22 }}>
              <Link className="lib-link-more" to={libraryPath(base, "/services")}>
                See all services
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      <section className="lib-section">
        <div className="lib-container">
          <div className="lib-section-head">
            <h2>Institutional repository</h2>
            <p>
              Theses, dissertations, articles and other research outputs from ACU
              staff and students — preserved and free to search and read.
            </p>
          </div>
          <Link className="lib-btn" to={libraryPath(base, "/repository")}>
            Explore the repository
          </Link>
        </div>
      </section>
    </>
  );
}

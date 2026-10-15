import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../../pages/NotFound.jsx";
import { useContentReady, useLibraryBooks } from "../../data/cms.js";
import {
  libraryPath,
  availabilityLabel,
} from "../../data/library.js";
import { formatFileSize } from "../../lib/format.js";

const EMPTY = [];

export default function CatalogueItem({ base }) {
  const { slug } = useParams();
  const ready = useContentReady();
  const books = useLibraryBooks() || EMPTY;
  const book = books.find((entry) => entry.slug === slug);

  useEffect(() => {
    if (!book) return;
    document.title = `${book.title} | ACU Library Catalogue`;
  }, [book]);

  if (!book) {
    return ready ? <NotFound /> : null;
  }

  const details = [
    ["Type", book.resourceType],
    ["Author(s)", book.authors],
    ["Publisher", book.publisher],
    ["Year", book.publishedYear],
    ["Edition", book.edition],
    ["ISBN", book.isbn],
    ["Subject", book.subject],
    ["Call number", book.callNumber],
    ["Language", book.language],
    ["Branch", book.branchName],
    [
      "Availability",
      book.availability === "available" && book.availableCopies
        ? `Available (${book.availableCopies} of ${book.copies})`
        : availabilityLabel(book.availability),
    ],
  ].filter(([, value]) => value !== "" && value !== null && value !== undefined);

  const size = formatFileSize(book.fileSize);
  const requestHref = `${libraryPath(base, "/contact")}?book=${encodeURIComponent(
    book.title,
  )}`;

  return (
    <>
      <section className="lib-detail-hero">
        <div className="lib-container">
          <nav className="lib-crumb" aria-label="Breadcrumb">
            <Link to={libraryPath(base, "")}>Library</Link>
            <span aria-hidden="true">/</span>
            <Link to={libraryPath(base, "/catalogue")}>Catalogue</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{book.title}</span>
          </nav>
          <span className="lib-badge lib-badge--available">{book.resourceType}</span>
          <h1>{book.title}</h1>
          <p className="lib-detail-author">{book.authors}</p>
        </div>
      </section>

      <section className="lib-section">
        <div className="lib-container lib-detail-grid">
          <div>
            {book.description ? (
              <>
                <h2>About this record</h2>
                <p className="lib-detail-desc">{book.description}</p>
              </>
            ) : null}
          </div>

          <aside className="lib-detail-aside">
            <div className="lib-actions">
              {book.fileUrl ? (
                <a
                  className="lib-btn lib-btn--brass"
                  href={book.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={book.fileName || undefined}
                >
                  Download e-copy
                </a>
              ) : null}
              {book.externalUrl ? (
                <a
                  className="lib-btn lib-btn--ghost"
                  href={book.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View online
                </a>
              ) : null}
              <Link className="lib-btn lib-btn--ghost" to={requestHref}>
                Request this title
              </Link>
            </div>

            {size || book.fileType ? (
              <p style={{ fontSize: "0.82rem", color: "var(--lib-muted)", marginTop: 0 }}>
                {[String(book.fileType || "").toUpperCase(), size]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : null}

            <h2 style={{ fontSize: "1.05rem" }}>Holdings & details</h2>
            <dl className="lib-details-list">
              {details.map(([label, value]) => (
                <div className="lib-details-row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <Link className="lib-btn-link" to={libraryPath(base, "/catalogue")}>
              ← Back to the catalogue
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

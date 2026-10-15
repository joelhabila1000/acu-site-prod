import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../../pages/NotFound.jsx";
import { useContentReady, useRepository } from "../../data/cms.js";
import { collectionTitle } from "../../data/repository.js";
import { formatFileSize } from "../../lib/format.js";
import { libraryPath } from "../../data/library.js";

const EMPTY = [];

export default function RepositoryRecord({ base }) {
  const { slug } = useParams();
  const ready = useContentReady();
  const items = useRepository() || EMPTY;
  const item = items.find((entry) => entry.slug === slug);

  useEffect(() => {
    if (!item) return;
    document.title = `${item.title} | ACU Institutional Repository`;
  }, [item]);

  if (!item) {
    return ready ? <NotFound /> : null;
  }

  const keywords = (item.keywords || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const collection = collectionTitle(item.collection);

  const details = [
    ["Type", item.itemType],
    ["Authors", item.authors],
    ["Faculty", item.faculty],
    ["Department", item.department],
    ["Year", item.year],
    ["Degree / award", item.degree],
    ["Supervisor", item.supervisor],
    ["Journal / publisher", item.publisher],
    ["Language", item.language],
    ["DOI", item.doi],
    ["Deposited", item.date],
  ].filter(([, value]) => value);

  const size = formatFileSize(item.fileSize);

  return (
    <>
      <section className="lib-detail-hero">
        <div className="lib-container">
          <nav className="lib-crumb" aria-label="Breadcrumb">
            <Link to={libraryPath(base, "")}>Library</Link>
            <span aria-hidden="true">/</span>
            <Link to={libraryPath(base, "/repository")}>Repository</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{item.title}</span>
          </nav>
          <span className="lib-badge lib-badge--available">
            {collection || item.itemType}
          </span>
          <h1>{item.title}</h1>
          <p className="lib-detail-author">{item.authors}</p>
        </div>
      </section>

      <section className="lib-section">
        <div className="lib-container lib-detail-grid">
          <div>
            {item.abstract ? (
              <>
                <h2>Abstract</h2>
                <p className="lib-detail-desc">{item.abstract}</p>
              </>
            ) : null}

            {keywords.length ? (
              <>
                <h2>Keywords</h2>
                <p>{keywords.join(" · ")}</p>
              </>
            ) : null}
          </div>

          <aside className="lib-detail-aside">
            {item.fileUrl ? (
              <div className="lib-actions">
                <a
                  className="lib-btn lib-btn--brass"
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={item.fileName || undefined}
                >
                  Download full text
                </a>
                {size || item.fileType ? (
                  <span style={{ fontSize: "0.82rem", color: "var(--lib-muted)" }}>
                    {[String(item.fileType || "").toUpperCase(), size]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                ) : null}
              </div>
            ) : null}

            <h2 style={{ fontSize: "1.05rem" }}>Record details</h2>
            <dl className="lib-details-list">
              {details.map(([label, value]) => (
                <div className="lib-details-row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <Link className="lib-btn-link" to={libraryPath(base, "/repository")}>
              ← Back to the repository
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

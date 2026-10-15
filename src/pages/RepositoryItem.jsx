import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound.jsx";
import { useContentReady, useRepository } from "../data/cms.js";
import { formatFileSize } from "../lib/format.js";
import { collectionTitle } from "../data/repository.js";
import "./Repository.css";

const NO_ITEMS = [];

function describe(item) {
  return item.abstract
    ? item.abstract.slice(0, 180)
    : `${item.itemType} deposited in the ACU Institutional Repository.`;
}

export default function RepositoryItem() {
  const { slug } = useParams();
  const ready = useContentReady();
  const items = useRepository() || NO_ITEMS;
  const item = items.find((entry) => entry.slug === slug);

  useEffect(() => {
    if (!item) return;
    document.title = `${item.title} | ACU Institutional Repository`;
    let tag = document.head.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", describe(item));
  }, [item]);

  if (!item) {
    return ready ? <NotFound /> : null;
  }

  const keywords = (item.keywords || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const meta = [
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

  const citation = [
    item.authors && `${item.authors}`,
    item.year && `(${item.year})`,
    item.title && `${item.title}.`,
    item.publisher && `${item.publisher}.`,
    item.doi && `https://doi.org/${String(item.doi).replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")}`,
  ]
    .filter(Boolean)
    .join(" ");

  const collection = collectionTitle(item.collection);
  const size = formatFileSize(item.fileSize);

  return (
    <div className="repository-page">
      <section className="repository-item-hero">
        <div className="container">
          <nav className="repository-item-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/directory/library">Library</Link>
            <span aria-hidden="true">/</span>
            <Link to="/directory/library/repository">Repository</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{item.title}</span>
          </nav>

          <div className="repository-item-tags">
            {item.itemType && (
              <span className="repository-result-type">{item.itemType}</span>
            )}
            {collection && (
              <span className="repository-item-collection">{collection}</span>
            )}
          </div>

          <h1>{item.title}</h1>
          {item.authors && <p className="repository-item-authors">{item.authors}</p>}

          {item.fileUrl && (
            <div className="repository-item-actions">
              <a
                className="btn btn-gold"
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={item.fileName || undefined}
              >
                Download full text
              </a>
              {(size || item.fileType) && (
                <span className="repository-item-filemeta">
                  {[String(item.fileType || "").toUpperCase(), size]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container repository-item-grid">
          <div className="repository-item-main">
            {item.abstract && (
              <>
                <h2>Abstract</h2>
                <p className="repository-item-abstract">{item.abstract}</p>
              </>
            )}

            {keywords.length > 0 && (
              <>
                <h2>Keywords</h2>
                <ul className="repository-keywords">
                  {keywords.map((keyword) => (
                    <li key={keyword}>{keyword}</li>
                  ))}
                </ul>
              </>
            )}

            {citation && (
              <>
                <h2>Suggested citation</h2>
                <p className="repository-citation">{citation}</p>
              </>
            )}
          </div>

          <aside className="repository-item-aside">
            <h2>Record details</h2>
            <dl className="repository-details">
              {meta.map(([label, value]) => (
                <div className="repository-details-row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <Link
              className="btn btn-outline-dark btn-sm"
              to="/directory/library/repository"
            >
              Back to the repository
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}

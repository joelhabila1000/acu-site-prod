import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNewsEvents } from "../data/cms.js";
import "./NewsArticle.css";

function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return String(iso);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsArticle() {
  const { slug } = useParams();
  const items = useNewsEvents();
  const [photoIndex, setPhotoIndex] = useState(0);

  const item = useMemo(
    () => items.find((entry) => entry.slug === slug),
    [items, slug],
  );

  // Each article gets its own page title so links shared or indexed show the
  // story rather than the site-wide default.
  useEffect(() => {
    if (!item) return undefined;
    const previous = document.title;
    document.title = `${item.title} | Ajayi Crowther University`;
    return () => {
      document.title = previous;
    };
  }, [item]);

  if (!item) {
    return (
      <section className="section">
        <div className="container article-missing">
          <h1>Story not found</h1>
          <p>
            We couldn't find that story. It may have been removed, or the link
            may be incorrect.
          </p>
          <Link to="/news" className="btn btn-navy">
            Back to News &amp; Events
          </Link>
        </div>
      </section>
    );
  }

  const photos =
    item.images && item.images.length
      ? item.images
      : item.image
        ? [{ url: item.image, caption: "" }]
        : [];
  const hero = photos[photoIndex] || photos[0] || null;

  const paragraphs = String(item.body || "")
    .split(/\n\n+/)
    .filter((paragraph) => paragraph.trim().length > 0);

  const related = items
    .filter((entry) => entry.slug !== item.slug)
    .slice(0, 3);

  return (
    <article className="article">
      <div className="container article-inner">
        <nav className="article-crumb" aria-label="Breadcrumb">
          <Link to="/news">News &amp; Events</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{item.title}</span>
        </nav>

        <header className="article-header">
          <span className={`news-badge news-badge--${item.type}`}>
            {item.type === "news" ? "News" : "Event"}
          </span>
          <h1>{item.title}</h1>
          <div className="article-meta">
            <time>{formatDate(item.date)}</time>
            {item.category && <span>{item.category}</span>}
          </div>
        </header>

        {hero && (
          <figure className="article-hero">
            <img src={hero.url} alt={hero.caption || item.title} />
            {hero.caption && <figcaption>{hero.caption}</figcaption>}
          </figure>
        )}

        {photos.length > 1 && (
          <div className="article-thumbs">
            {photos.map((photo, index) => (
              <button
                key={`${photo.url}-${index}`}
                type="button"
                className={`article-thumb ${index === photoIndex ? "is-active" : ""}`}
                onClick={() => setPhotoIndex(index)}
                aria-label={`Show photo ${index + 1} of ${photos.length}`}
                aria-current={index === photoIndex}
              >
                <img src={photo.url} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        <div className="article-body">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="article-actions">
          <Link to="/news" className="btn btn-navy">
            ← All news &amp; events
          </Link>
          <a
            className="btn btn-outline"
            href={typeof window !== "undefined" ? window.location.href : "#"}
            onClick={(event) => {
              if (navigator.clipboard) {
                event.preventDefault();
                navigator.clipboard.writeText(window.location.href);
                event.currentTarget.textContent = "Link copied";
              }
            }}
          >
            Copy link
          </a>
        </div>

        {related.length > 0 && (
          <section className="article-related">
            <h2>More from ACU</h2>
            <div className="article-related-grid">
              {related.map((entry) => (
                <Link
                  key={entry.id}
                  to={`/news/${entry.slug}`}
                  className="article-related-card"
                >
                  {entry.image && (
                    <img src={entry.image} alt="" loading="lazy" />
                  )}
                  <span className={`news-badge news-badge--${entry.type}`}>
                    {entry.type === "news" ? "News" : "Event"}
                  </span>
                  <h3>{entry.title}</h3>
                  <time>{formatDate(entry.date)}</time>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

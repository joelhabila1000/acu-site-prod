import { useState, useMemo, useEffect } from "react";
import PageHeader from "../components/PageHeader.jsx";


const API_BASE = "/api/acu/wp-json/wp/v2";


function stripHtml(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").trim();
}

function decodeEntities(str) {
  if (!str) return "";
  const el = document.createElement("textarea");
  el.innerHTML = str;
  return el.value;
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}


async function fetchPosts() {
  const url = `${API_BASE}/posts?per_page=20&_embed`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API responded with ${res.status}`);
  const data = await res.json();

  return data.map((post) => {
    const featured =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
    const categoryNames =
      post._embedded?.["wp:term"]?.[0]?.map((t) => t.name) || [];
    const isEvent = categoryNames.some((n) =>
      n.toLowerCase().includes("event")
    );

    return {
      id: post.id,
      type: isEvent ? "event" : "news",
      title: decodeEntities(post.title?.rendered || ""),
      date: post.date,
      link: post.link,
      excerpt: stripHtml(post.excerpt?.rendered || "")
        .replace(/\[…\]|\[\.\.\.\]/g, "")
        .trim(),
      body: stripHtml(post.content?.rendered || ""),
      image: featured,
      categories: categoryNames,
    };
  });
}

/* ---------------------------------------------------------------
   PAGE
---------------------------------------------------------------- */
export default function NewsEventsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const posts = await fetchPosts();
        if (!cancelled) {
          setItems(posts);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!activeItem) return;
    const onKey = (e) => e.key === "Escape" && setActiveItem(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  const filtered = useMemo(() => {
    return items
      .filter((item) => filter === "all" || item.type === filter)
      .filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [items, filter, searchTerm]);

  return (
    <>
      <PageHeader
        crumb="News & Events"
        title="News & Events"
        lede="Stay informed about the latest happenings, announcements, and upcoming activities at Ajayi Crowther University."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="news-controls">
            <div className="news-tabs" role="tablist">
              {[
                { key: "all", label: "All" },
                { key: "news", label: "News" },
                { key: "event", label: "Events" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={filter === tab.key}
                  className={`news-tab ${
                    filter === tab.key ? "is-active" : ""
                  }`}
                  onClick={() => setFilter(tab.key)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="news-search">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search news and events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search news and events"
              />
            </div>
          </div>

          {loading && (
            <div className="news-status">
              <div className="news-spinner" aria-hidden="true" />
              <p>Loading latest news from acu.edu.ng…</p>
            </div>
          )}

          {error && (
            <div className="news-status news-status--error">
              <p>Could not load news: {error}</p>
              <button
                type="button"
                className="news-cta"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <p className="news-count">
                Showing <strong>{filtered.length}</strong> of {items.length}{" "}
                items
              </p>

              {filtered.length > 0 ? (
                <div className="news-grid">
                  {filtered.map((item) => (
                    <article
                      className="news-card"
                      key={item.id}
                      onClick={() => setActiveItem(item)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Read: ${item.title}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveItem(item);
                        }
                      }}
                    >
                      {item.image && (
                        <div className="news-card-image">
                          <img
                            src={item.image}
                            alt=""
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                      <div className="news-card-body">
                        <div className="news-card-top">
                          <span
                            className={`news-badge news-badge--${item.type}`}
                          >
                            {item.type === "news" ? "News" : "Event"}
                          </span>
                          <span className="news-date">
                            {formatDate(item.date)}
                          </span>
                        </div>
                        <h3 className="news-title">{item.title}</h3>
                        <p className="news-excerpt">{item.excerpt}</p>
                        <span className="news-read-more">Read more →</span>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="news-empty">
                  <p>No items match your search.</p>
                  <button
                    type="button"
                    className="news-cta"
                    onClick={() => {
                      setSearchTerm("");
                      setFilter("all");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {activeItem && (
        <div
          className="news-modal-overlay"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
        >
          <div className="news-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="news-modal-close"
              onClick={() => setActiveItem(null)}
              aria-label="Close"
            >
              ×
            </button>

            {activeItem.image && (
              <div className="news-modal-hero">
                <img src={activeItem.image} alt="" />
              </div>
            )}

            <div className="news-modal-header">
              <span className={`news-badge news-badge--${activeItem.type}`}>
                {activeItem.type === "news" ? "News" : "Event"}
              </span>
              <h2 id="news-modal-title">{activeItem.title}</h2>
              <p className="news-modal-date">
                {formatDate(activeItem.date)}
              </p>
            </div>

            <div className="news-modal-body">
              {activeItem.body
                .split(/\n\n+/)
                .filter((p) => p.trim().length > 0)
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>

            <div className="news-modal-footer">
              <button
                type="button"
                className="news-cta news-cta--ghost"
                onClick={() => setActiveItem(null)}
              >
                Close
              </button>
              <a
                className="news-cta"
                href={activeItem.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read on acu.edu.ng →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
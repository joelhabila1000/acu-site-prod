import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNewsEvents } from "../data/cms.js";
import "./NewsSection.css";

function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return String(iso);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NewsSection() {
  // Pull from the same source as the News & Events page so the home highlights
  // and that page never drift apart.
  const items = useNewsEvents();
  const news = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const firstCard = carouselRef.current.querySelector(".news-card");
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 320;
    const gap = 24;

    carouselRef.current.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container || items.length === 0) return undefined;

    // An earlier version cloned the cards to fake a seamless loop, which made
    // every story appear twice when there were only a few. Clear any left over.
    container
      .querySelectorAll('[data-clone="true"]')
      .forEach((node) => node.remove());

    const timer = window.setInterval(() => {
      const firstCard = container.querySelector(".news-card");
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 320;
      const gap = 24;
      const step = cardWidth + gap;
      const maxScroll = container.scrollWidth - container.clientWidth;

      // Nothing to scroll through — a short list on a wide screen.
      if (maxScroll <= 8) return;

      if (container.scrollLeft >= maxScroll - 8) {
        container.scrollTo({ left: 0, behavior: "auto" });
      }

      container.scrollBy({ left: step, behavior: "smooth" });
    }, 2500);

    return () => window.clearInterval(timer);
  }, [items]);

  return (
    <section className="section" aria-labelledby="news-heading">
      <div className="container">
        <div className="news-head">
          <div>
            <p className="eyebrow">Highlights</p>
            <h2 id="news-heading">Latest News &amp; Events</h2>
          </div>
          <div className="news-controls">
            <button
              type="button"
              className="news-arrow"
              aria-label="Previous news"
              onClick={() => scrollCarousel(-1)}
            >
              ←
            </button>
            <button
              type="button"
              className="news-arrow"
              aria-label="Next news"
              onClick={() => scrollCarousel(1)}
            >
              →
            </button>
            <Link to="/news" className="btn btn-navy btn-sm">
              View All News
            </Link>
          </div>
        </div>

        <div className="news-carousel" ref={carouselRef}>
          {news.map((item) => (
            <Link
              key={item.slug || item.id}
              to={`/news/${item.slug || item.id}`}
              className="news-card"
            >
              <div
                className={`news-image ${item.image ? "" : "news-image--empty"}`}
              >
                {item.image ? (
                  <img src={item.image} alt={item.title} loading="lazy" />
                ) : (
                  <span className="news-image-fallback">
                    {item.type === "event" ? "Event" : "News"}
                  </span>
                )}
              </div>
              <div className="news-body">
                <div className="news-meta">
                  <span className={`news-tag news-tag--${item.type}`}>
                    {item.type === "event" ? "Event" : "News"}
                  </span>
                  <time>{formatDate(item.date)}</time>
                </div>
                <h3>{item.title}</h3>
                {item.excerpt && <p className="news-excerpt">{item.excerpt}</p>}
                <span className="news-link">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

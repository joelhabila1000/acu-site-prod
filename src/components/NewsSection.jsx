import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNews } from "../data/cms.js";
import "./NewsSection.css";

export default function NewsSection() {
  const news = useNews();
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
    if (!container || news.length === 0) return undefined;

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
  }, [news]);

  return (
    <section className="section" aria-labelledby="news-heading">
      <div className="container">
        <div className="news-head">
          <div>
            <p className="eyebrow">Highlights</p>
            <h2 id="news-heading">Latest News from Campus</h2>
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
          {news.map((n) => (
            <Link
              key={`${n.title}-${n.date}`}
              to={n.url}
              className="news-card"
            >
              <div className="news-image">
                <img src={n.image} alt={n.title} loading="lazy" />
              </div>
              <div className="news-body">
                <time>{n.date}</time>
                <h3>{n.title}</h3>
                <span className="news-link">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

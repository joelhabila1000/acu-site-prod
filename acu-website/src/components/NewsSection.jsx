import { useEffect, useState } from "react";
import { getStoredNews } from "../data/admin.js";
import "./NewsSection.css";

export default function NewsSection() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews(getStoredNews());
    const onStorage = () => setNews(getStoredNews());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <section className="section" aria-labelledby="news-heading">
      <div className="container">
        <div className="news-head">
          <div>
            <p className="eyebrow">Highlights</p>
            <h2 id="news-heading">Latest News from Campus</h2>
          </div>
          <a
            href="https://acu.edu.ng/news"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-navy btn-sm"
          >
            View All News
          </a>
        </div>

        <div className="news-grid">
          {news.map((n) => (
            <a
              key={`${n.title}-${n.date}`}
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

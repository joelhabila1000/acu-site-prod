import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSite } from "../data/cms.js";
import "./Hero.css";

export default function Hero() {
  const { site, slides } = useSite();
  const [activeSlide, setActiveSlide] = useState(0);

  const list = slides && slides.length ? slides : [];
  const currentSlide = list[activeSlide % (list.length || 1)] || {
    title: "",
    subtitle: "",
    description: "",
    image: "",
  };

  useEffect(() => {
    if (list.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % list.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [list.length]);

  return (
    <section className="hero" aria-label="Welcome to Ajayi Crowther University">
      <div className="hero-media" aria-live="polite">
        {list.map((slide, index) => (
          <img
            key={`${slide.title}-${index}`}
            src={slide.image}
            alt={`Ajayi Crowther University campus view ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
            className={index === activeSlide ? "is-active" : ""}
          />
        ))}
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-dots" aria-label="Hero image navigation">
          {list.map((slide, index) => (
            <button
              key={`${slide.title}-dot-${index}`}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              className={index === activeSlide ? "is-active" : ""}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="container hero-content">
        <p className="eyebrow" style={{ color: "var(--gold-400)" }}>
          {site.motto} · {site.mottoMeaning}
        </p>
        <h1>
          {currentSlide.title}
          <span className="hero-sub">{currentSlide.subtitle}</span>
        </h1>
        <p className="hero-lede">{currentSlide.description}</p>
        <div className="hero-actions">
          <a
            href={site.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            Apply for Admission
          </a>
          <Link to="/about" className="btn btn-outline">
            Discover ACU
          </Link>
        </div>
      </div>

      <div className="hero-ribbon" role="note" aria-label="Admissions status">
        <div className="container hero-ribbon-inner">
          <span>Admission is open for the 2026/2027 Session</span>
          <Link to="/listofcourses">View Courses →</Link>
        </div>
      </div>
    </section>
  );
}

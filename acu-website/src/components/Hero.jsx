import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SITE, IMAGES } from "../data/content.js";
import "./Hero.css";

const slides = [IMAGES.hero, IMAGES.campusWide, IMAGES.aboutSecondary];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" aria-label="Welcome to Ajayi Crowther University">
      <div className="hero-media" aria-live="polite">
        {slides.map((slide, index) => (
          <img
            key={slide}
            src={slide}
            alt={`Ajayi Crowther University campus view ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            fetchpriority={index === 0 ? "high" : "low"}
            className={index === activeSlide ? "is-active" : ""}
          />
        ))}
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-dots" aria-label="Hero image navigation">
          {slides.map((slide, index) => (
            <button
              key={`${slide}-${index}`}
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
          {SITE.motto} · {SITE.mottoMeaning}
        </p>
        <h1>
          Welcome to Ajayi Crowther University, Oyo
          <span className="hero-sub">Where We Raise Godly Intellectuals</span>
        </h1>
        <p className="hero-lede">
          A faith-based Anglican institution forming scholars of sound
          character, deep knowledge and lifelong integrity across thirteen
          faculties on four strategic campuses in Oyo State, Nigeria.
        </p>
        <div className="hero-actions">
          <a
            href={SITE.applyUrl}
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
          <a
            href="https://acu.edu.ng/courses"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Courses →
          </a>
        </div>
      </div>
    </section>
  );
}

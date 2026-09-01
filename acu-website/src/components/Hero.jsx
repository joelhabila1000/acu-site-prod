import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SITE, IMAGES } from "../data/content.js";
import "./Hero.css";

const slides = [
  {
    image: IMAGES.heroCampusOne,
    eyebrow: "A Community of Excellence",
    title: "Welcome to Ajayi Crowther University, Oyo",
    subtitle: "Where We Raise Godly Intellectuals",
    description:
      "A faith-based Anglican institution forming scholars of sound character, deep knowledge and lifelong integrity across thirteen faculties on four strategic campuses in Oyo State, Nigeria.",
  },
  {
    image: IMAGES.heroCampusTwo,
    eyebrow: "Faith, Learning and Service",
    title: "Shaping Purposeful Leaders for a Better Tomorrow",
    subtitle: "Academic excellence rooted in character",
    description:
      "From the classroom to the community, ACU equips students to lead with wisdom, confidence and integrity in every field of life and service.",
  },
  {
    image: IMAGES.heroCampusThree,
    eyebrow: "A Future Built on Vision",
    title: "Discover an Environment That Inspires Greatness",
    subtitle: "Innovation, scholarship and spiritual growth",
    description:
      "Our students learn in a vibrant, values-driven environment designed to unlock potential, expand opportunity and nurture a life of impact.",
  },
  {
    image: IMAGES.heroCampusFour,
    eyebrow: "Purpose in Motion",
    title: "A Campus Experience Designed for Growth",
    subtitle: "Learning that inspires action and excellence",
    description:
      "ACU brings together mentorship, discipline and opportunity so every student can build a life of meaning, leadership and lasting impact.",
  },
  {
    image: IMAGES.heroCampusFive,
    eyebrow: "Rooted in Vision",
    title: "A Place Where Dreams Take Shape",
    subtitle: "Character, scholarship and service",
    description:
      "With a strong academic culture and a faith-centered foundation, ACU empowers students to pursue excellence in every calling.",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = slides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" aria-label="Welcome to Ajayi Crowther University">
      <div className="hero-media" aria-live="polite">
        {slides.map((slide, index) => (
          <img
            key={`${slide.title}-${index}`}
            src={slide.image}
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
          {SITE.motto} · {SITE.mottoMeaning}
        </p>
        <h1>
          {currentSlide.title}
          <span className="hero-sub">{currentSlide.subtitle}</span>
        </h1>
        <p className="hero-lede">{currentSlide.description}</p>
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

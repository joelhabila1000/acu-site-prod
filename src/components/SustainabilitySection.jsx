import { Link } from "react-router-dom";
import { IMAGES } from "../data/content.js";
import { useSustainability } from "../data/cms.js";
import Reveal from "./Reveal.jsx";
import "./SustainabilitySection.css";

// Homepage teaser for the Sustainability page. Copy and figures come from the
// same content the /sustainability page renders, so the two never drift.
export default function SustainabilitySection() {
  const s = useSustainability();
  const stats = Array.isArray(s.stats) ? s.stats.slice(0, 3) : [];
  const lede = Array.isArray(s.body) && s.body.length ? s.body[0] : "";

  return (
    <section
      className="section section-navy sustain"
      aria-labelledby="sustain-heading"
    >
      <div className="container sustain-grid">
        <Reveal className="sustain-copy">
          <p className="eyebrow">Sustainability</p>
          <h2 id="sustain-heading">
            Sustainability at Ajayi Crowther University
          </h2>
          {lede && <p className="sustain-lede">{lede}</p>}

          {stats.length > 0 && (
            <ul className="sustain-stats">
              {stats.map((stat) => (
                <li key={stat.label} className="sustain-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          )}

          <Link to="/sustainability" className="btn btn-gold">
            Explore Our Sustainability Work
          </Link>
        </Reveal>

        <Reveal className="sustain-media" variant="scale" delay={120}>
          <div className="sustain-wheel">
            <img
              src={s.introImage || IMAGES.sdgWheel}
              alt="United Nations Sustainable Development Goals wheel"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

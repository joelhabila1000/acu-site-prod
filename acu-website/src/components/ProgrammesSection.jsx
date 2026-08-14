import { PROGRAMMES } from "../data/content.js";
import "./ProgrammesSection.css";

export default function ProgrammesSection() {
  return (
    <section className="section" aria-labelledby="programmes-heading">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            Study at ACU
          </p>
          <h2 id="programmes-heading">Programmes for Every Stage of Your Journey</h2>
        </div>

        <div className="programme-grid">
          {PROGRAMMES.map((p) => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="programme-card"
            >
              <span className="programme-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <span className="programme-link">Explore programme →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

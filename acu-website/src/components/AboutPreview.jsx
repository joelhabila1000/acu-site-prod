import { Link } from "react-router-dom";
import { IMAGES, PILLARS } from "../data/content.js";
import "./AboutPreview.css";

export default function AboutPreview() {
  return (
    <section className="section section-cream" aria-labelledby="about-heading">
      <div className="container about-grid">
        <div className="about-media">
          <img src={IMAGES.vc} alt="ACU leadership addressing the university community" loading="lazy" />
          <div className="about-media-frame" aria-hidden="true" />
        </div>

        <div className="about-copy">
          <p className="eyebrow">Who We Are</p>
          <h2 id="about-heading">A Legacy Rooted in Faith and Scholarship</h2>
          <p className="drop-cap">
            Ajayi Crowther University was established by the Supra Diocesan Board (West) of
            the Church of Nigeria (Anglican Communion), tracing its origins to the defunct
            CMS Training Institution, Abeokuta, and St. Andrew's College, Oyo. We emphasise
            the fear of God, sound academic development, excellent character formation,
            hard work, diligence and entrepreneurship.
          </p>
          <Link to="/about" className="btn btn-navy">
            Read Our Full Story
          </Link>

          <ul className="pillars-list">
            {PILLARS.map((p) => (
              <li key={p.title}>
                <div className="crest-divider">
                  <span className="diamond" aria-hidden="true" />
                </div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

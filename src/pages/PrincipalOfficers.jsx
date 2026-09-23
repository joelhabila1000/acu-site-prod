import { Link } from "react-router-dom";
import { usePrincipalOfficers } from "../data/cms.js";
import "./PrincipalOfficers.css";

export default function PrincipalOfficers() {
  const officers = usePrincipalOfficers();
  return (
    <>
      <section className="principal-officers-hero">
        <div className="container">
          <p className="eyebrow">University Administration</p>
          <h1>Principal Officers</h1>
          <p>
            Meet the administrative leaders serving Ajayi Crowther University
            with integrity, academic distinction and a shared commitment to
            raising Godly intellectuals.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container principal-officers-grid">
          {officers.map((officer) => (
            <Link
              to={`/principal-officers/${officer.slug}`}
              className="principal-officer-card"
              key={officer.slug}
            >
              <img src={officer.image} alt={officer.name} />
              <div className="principal-officer-card-content">
                <p>{officer.role}</p>
                <h2>{officer.name}</h2>
                <span className="principal-officer-divider" aria-hidden="true" />
                <p>{officer.summary}</p>
                <span className="principal-officer-cta">
                  View Profile <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-navy" aria-labelledby="leadership-message">
        <div className="container principal-officers-message">
          <p className="eyebrow">Leadership</p>
          <h2 id="leadership-message">
            Committed to mission, excellence and transformation
          </h2>
          <p>
            ACU's principal officers work together to uphold the University's
            mission of raising Godly intellectuals equipped for scholarship,
            leadership, service and meaningful contribution to society.
          </p>
          <Link to="/about" className="btn btn-outline">
            Back to About
          </Link>
        </div>
      </section>
    </>
  );
}
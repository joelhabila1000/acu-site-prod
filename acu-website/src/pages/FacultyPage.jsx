import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { FACULTIES } from "../data/content.js";
import "./FacultyPage.css";

export default function FacultyPage() {
  const { slug } = useParams();
  const faculty = FACULTIES.find((item) => item.slug === slug);

  if (!faculty) {
    return (
      <section className="section">
        <div className="container">
          <div className="not-found-panel">
            <p className="eyebrow">Faculty not found</p>
            <h1>Faculty Page Unavailable</h1>
            <p>
              The faculty you are looking for does not exist yet or has not been
              published.
            </p>
            <Link to="/academics" className="btn btn-navy">
              Back to Faculties
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader
        crumb="Academics"
        title={`Faculty of ${faculty.name}`}
        lede={faculty.tagline}
      />

      <section className="section faculty-page">
        <div className="container faculty-hero">
          <div className="faculty-hero-copy">
            <p className="eyebrow">Faculty Overview</p>
            <h2>{faculty.tagline}</h2>
            <p>{faculty.summary}</p>
            <div className="faculty-actions">
              <Link to="/admissions" className="btn btn-gold">
                Apply Now
              </Link>
              <Link
                to="/academics"
                className="btn btn-outline btn-outline-navy"
              >
                View All Faculties
              </Link>
            </div>
          </div>

          <div
            className="faculty-hero-image placeholder-panel"
            aria-label="Faculty image placeholder"
          >
            <span>Faculty image placeholder</span>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              At a glance
            </p>
            <h2>Programme Focus</h2>
          </div>

          <div className="info-grid three-up">
            <div className="value-card">
              <h3>Dean</h3>
              <p>{faculty.dean}</p>
            </div>
            <div className="value-card">
              <h3>Core Programmes</h3>
              <p>{faculty.programmes.join(" • ")}</p>
            </div>
            <div className="value-card">
              <h3>Career Pathways</h3>
              <p>{faculty.careerOutcomes.join(" • ")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column-layout">
          <div className="panel-block">
            <p className="eyebrow">Programmes</p>
            <h3>Academic offerings</h3>
            <ul className="check-list">
              {faculty.programmes.map((programme) => (
                <li key={programme}>{programme}</li>
              ))}
            </ul>
          </div>

          <div className="panel-block">
            <p className="eyebrow">Research</p>
            <h3>Areas of focus</h3>
            <ul className="check-list">
              {faculty.researchAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Facilities
            </p>
            <h2>Laboratories, spaces and practical learning</h2>
          </div>

          <div className="facility-grid">
            {faculty.facilities.map((facility) => (
              <div key={facility} className="facility-card">
                <div
                  className="facility-image placeholder-panel small"
                  aria-hidden="true"
                >
                  <span>Image placeholder</span>
                </div>
                <h3>{facility}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Why ACU
            </p>
            <h2>Value proposition</h2>
          </div>

          <div className="info-grid">
            {faculty.highlights.map((highlight) => (
              <div key={highlight} className="value-card">
                <h3>{highlight}</h3>
                <p>
                  Students in this faculty benefit from practical learning,
                  mentorship and an academic culture built on excellence,
                  discipline and service.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-navy">
        <div className="container callout-box">
          <div>
            <p
              className="eyebrow"
              style={{ justifyContent: "flex-start", color: "var(--gold-400)" }}
            >
              Admissions
            </p>
            <h2>Ready to join {faculty.name}?</h2>
            <p>
              Discover how our faculty combines academic excellence with values,
              innovation and practical training to prepare graduates for a
              meaningful future.
            </p>
          </div>
          <div className="callout-actions">
            <Link to="/admissions" className="btn btn-gold">
              Apply for Admission
            </Link>
            <a
              href="mailto:info@acu.edu.ng"
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Faculty
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

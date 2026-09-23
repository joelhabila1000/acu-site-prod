import { Link, useParams, Navigate } from "react-router-dom";
import { usePrincipalOfficers } from "../data/cms.js";
import "./PrincipalOfficerDetail.css";

export default function PrincipalOfficerDetail() {
  const officers = usePrincipalOfficers();
  const { slug } = useParams();
  const officer = officers.find((o) => o.slug === slug);

  if (!officer) {
    return <Navigate to="/principal-officers" replace />;
  }

  const currentIndex = officers.findIndex((o) => o.slug === slug);
  const prevOfficer =
    officers[(currentIndex - 1 + officers.length) % officers.length];
  const nextOfficer = officers[(currentIndex + 1) % officers.length];

  return (
    <>
      <section className="officer-detail-hero">
        <div className="container">
          <nav className="officer-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/principal-officers">Principal Officers</Link>
            <span aria-hidden="true">/</span>
            <span>{officer.role}</span>
          </nav>
        </div>
      </section>

      <section className="section officer-detail-section">
        <div className="container officer-detail-grid">
          <aside className="officer-detail-sidebar">
            <div className="officer-detail-photo">
              <img src={officer.image} alt={officer.name} />
            </div>
            <div className="officer-detail-meta">
              <p className="officer-detail-role">{officer.role}</p>
              <h1>{officer.name}</h1>
            </div>

            {officer.qualifications?.length > 0 && (
              <div className="officer-detail-block">
                <h3>Qualifications</h3>
                <ul>
                  {officer.qualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {officer.memberships?.length > 0 && (
              <div className="officer-detail-block">
                <h3>Professional Memberships</h3>
                <ul>
                  {officer.memberships.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          <div className="officer-detail-content">
            <p className="eyebrow">About</p>
            <h2>Biography</h2>
            <span className="officer-detail-divider" aria-hidden="true" />
            {officer.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <div className="officer-detail-actions">
              <Link to="/principal-officers" className="btn btn-outline">
                ← Back to Principal Officers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section officer-nav-section">
        <div className="container officer-nav-grid">
          <Link
            to={`/principal-officers/${prevOfficer.slug}`}
            className="officer-nav-card officer-nav-prev"
          >
            <span className="officer-nav-label">← Previous</span>
            <span className="officer-nav-role">{prevOfficer.role}</span>
            <span className="officer-nav-name">{prevOfficer.name}</span>
          </Link>
          <Link
            to={`/principal-officers/${nextOfficer.slug}`}
            className="officer-nav-card officer-nav-next"
          >
            <span className="officer-nav-label">Next →</span>
            <span className="officer-nav-role">{nextOfficer.role}</span>
            <span className="officer-nav-name">{nextOfficer.name}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
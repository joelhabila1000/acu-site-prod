import FacultiesGrid from "../components/FacultiesGrid.jsx";
import ProgrammesSection from "../components/ProgrammesSection.jsx";
import AdmissionCTA from "../components/AdmissionCTA.jsx";
import { STATS } from "../data/content.js";
import "./Academics.css";

export default function Academics() {
  return (
    <>
      <section className="academics-hero">
        <div className="container academics-hero-content">
          <p className="eyebrow">Academic distinction</p>
          <h1>Explore Our Faculties</h1>
          <p>
            Discover the faculties, programmes and learning communities shaping
            the next generation of leaders at Ajayi Crowther University.
          </p>
          <div className="academics-stat-strip">
            {STATS.slice(0, 2).map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}+</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow" style={{ justifyContent: "center" }}>Faculties</p>
            <h2>Find Your Academic Path</h2>
            <p>
              Search by faculty or programme, then select a faculty to explore
              its academic offerings, facilities and career pathways.
            </p>
          </div>
          <FacultiesGrid />
        </div>
      </section>

      <ProgrammesSection />

      <section className="section section-cream">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Resources
            </p>
            <h2>Library &amp; Research</h2>
          </div>
          <div className="library-grid">
            <div className="value-card">
              <h3>Three Fully Stocked Libraries</h3>
              <p>
                Not just a mere assemblage of books, our libraries are a sanctum
                for scholarly aspirations, supporting both undergraduate and
                postgraduate research.
              </p>
              <a
                href="https://acu.edu.ng/libraries"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-navy btn-sm"
                style={{ marginTop: 12 }}
              >
                Visit Library
              </a>
            </div>
            <div className="value-card">
              <h3>Institutional Repository &amp; Journals</h3>
              <p>
                Access theses, dissertations and faculty publications through
                our online repository and peer-reviewed journals.
              </p>
              <a
                href="https://repository.acu.edu.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-navy btn-sm"
                style={{ marginTop: 12 }}
              >
                Visit Repository
              </a>
            </div>
          </div>
        </div>
      </section>

      <AdmissionCTA />
    </>
  );
}

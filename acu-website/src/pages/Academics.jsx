import PageHeader from "../components/PageHeader.jsx";
import FacultiesGrid from "../components/FacultiesGrid.jsx";
import ProgrammesSection from "../components/ProgrammesSection.jsx";
import AdmissionCTA from "../components/AdmissionCTA.jsx";

export default function Academics() {
  return (
    <>
      <PageHeader
        crumb="Academics"
        title="Thirteen Faculties. Fifty-One Accredited Courses."
        lede="From Agriculture to Law, our faculties are staffed by distinguished scholars committed to rigorous, faith-grounded scholarship."
      />

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Faculties
            </p>
            <h2>Explore Our Faculties</h2>
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

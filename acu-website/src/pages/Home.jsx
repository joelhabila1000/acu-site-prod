import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import StatsBar from "../components/StatsBar.jsx";
import ProgrammesSection from "../components/ProgrammesSection.jsx";
import AboutPreview from "../components/AboutPreview.jsx";
import FacultiesGrid from "../components/FacultiesGrid.jsx";
import NewsSection from "../components/NewsSection.jsx";
import AdmissionCTA from "../components/AdmissionCTA.jsx";
import { SITE } from "../data/content.js";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProgrammesSection />
      <AboutPreview />

      <section className="section section-cream" aria-labelledby="faculties-heading">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Academic Excellence
            </p>
            <h2 id="faculties-heading">Thirteen Faculties, One Standard of Excellence</h2>
          </div>
          <FacultiesGrid limit={6} />
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link to="/academics" className="btn btn-oxblood">
              View All Faculties
            </Link>
          </div>
        </div>
      </section>

      <NewsSection />
      <AdmissionCTA />

      <section className="section" aria-labelledby="map-heading">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Find Us
            </p>
            <h2 id="map-heading">Our Campus in Oyo Town</h2>
          </div>
          <div className="map-frame">
            <iframe
              title={`${SITE.name} location map`}
              src={SITE.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}

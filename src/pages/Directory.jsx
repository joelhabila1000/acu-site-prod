import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import "./Directory.css";

// More areas can be added here later (student directory, departmental
// contacts, offices) — the nav already nests under /directory.
const AREAS = [
  {
    label: "Staff Directory",
    path: "/directory/staff",
    desc: "Find academic and administrative staff by name, faculty or department, with contact details for each member of staff.",
  },
  {
    label: "Gallery",
    path: "/gallery",
    desc: "Photographs from around the Ajayi Crowther University campuses — academic life, ceremonies and everyday campus scenes.",
  },
];

export default function Directory() {
  return (
    <>
      <PageHeader
        title="Directory"
        lede="Find the people and offices that make up Ajayi Crowther University."
      />

      <section className="section">
        <div className="container">
          <div className="directory-grid">
            {AREAS.map((area, index) => (
              <Reveal key={area.path} delay={index * 80}>
                <Link to={area.path} className="directory-card">
                  <h2>{area.label}</h2>
                  <p>{area.desc}</p>
                  <span className="directory-card-cta">
                    Open directory <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

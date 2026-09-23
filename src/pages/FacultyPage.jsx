import { Link, useParams } from "react-router-dom";
import { useFaculties, useSite } from "../data/cms.js";
import "./FacultyPage.css";

export default function FacultyPage() {
  const faculties = useFaculties();
  const { site } = useSite();
  const { slug } = useParams();
  const faculty = faculties.find((item) => item.slug === slug);

  if (!faculty) {
    return <section className="section"><div className="container"><div className="not-found-panel"><p className="eyebrow">Faculty not found</p><h1>Faculty Page Unavailable</h1><p>The faculty you are looking for does not exist or has not been published.</p><Link to="/academics" className="btn btn-navy">Back to Faculties</Link></div></div></section>;
  }

  const programmeCount = faculty.programmes.length;

  return (
    <div className="faculty-page">
      <section className="faculty-detail-hero"><div className="container">
        <Link to="/academics" className="faculty-back-link">← Back to Faculties</Link>
        <h1>Faculty of {faculty.name}</h1><p>{faculty.tagline}</p>
        <div className="faculty-detail-stats">
          <div><strong>{programmeCount}</strong><span>Programmes</span></div>
          <div><strong>{faculty.researchAreas.length}</strong><span>Research Areas</span></div>
          <div><strong>{faculty.facilities.length}</strong><span>Learning Facilities</span></div>
        </div>
        <div className="faculty-hero-image-placeholder" role="img" aria-label={`${faculty.name} faculty image placeholder`}>Faculty image placeholder</div>
      </div></section>

      <div className="container faculty-detail-layout">
        <div className="faculty-detail-main">
          <section><p className="eyebrow">Overview</p><h2>Faculty Overview</h2><p className="faculty-detail-intro">{faculty.summary}</p></section>
          <section className="faculty-leadership-card"><p className="eyebrow">Faculty Leadership</p><h2>{faculty.dean}</h2><p>Leading the faculty’s academic community, teaching and research priorities.</p></section>
          <section><p className="eyebrow">Programmes</p><h2>Academic Programmes</h2><div className="faculty-programme-list">{faculty.programmes.map((programme) => <div key={programme}><span>{programme}</span><span aria-hidden="true">→</span></div>)}</div></section>
          <section><p className="eyebrow">Research</p><h2>Research Areas</h2><ol className="faculty-research-list">{faculty.researchAreas.map((area) => <li key={area}>{area}</li>)}</ol></section>
          <section><p className="eyebrow">Facilities</p><h2>Practical Learning Spaces</h2><div className="faculty-facility-list">{faculty.facilities.map((facility) => <div key={facility}><span className="faculty-facility-image-placeholder" aria-hidden="true">Image placeholder</span><strong>{facility}</strong></div>)}</div></section>
        </div>

        <aside className="faculty-detail-sidebar">
          <div className="faculty-apply-card"><h2>Ready to Join Us?</h2><p>Take the first step toward an exceptional academic career.</p><a href={site.applyUrl} className="btn btn-gold" target="_blank" rel="noopener noreferrer">Apply Now</a><Link to="/academics" className="btn btn-outline">Explore Faculties</Link></div>
          <div className="faculty-side-card"><h2>Contact Faculty</h2><dl><div><dt>Phone</dt><dd>{site.phone}</dd></div><div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div><div><dt>Location</dt><dd>{site.address}</dd></div></dl></div>
          <div className="faculty-side-card"><h2>Quick Facts</h2><dl><div><dt>Programmes</dt><dd>{programmeCount}</dd></div><div><dt>Research Areas</dt><dd>{faculty.researchAreas.length}</dd></div><div><dt>Facilities</dt><dd>{faculty.facilities.length}</dd></div></dl></div>
        </aside>
      </div>

      <section className="faculty-bottom-cta"><div className="container"><h2>Begin Your Journey</h2><p>Join a faculty where excellence, discovery and purpose converge.</p><div><a href={site.applyUrl} className="btn btn-navy" target="_blank" rel="noopener noreferrer">Apply Now</a><Link to="/academics" className="btn btn-outline-navy">View All Faculties</Link></div></div></section>
    </div>
  );
}

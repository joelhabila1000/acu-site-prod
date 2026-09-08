import { SITE } from "../data/content.js";
import "./AdmissionCTA.css";

export default function AdmissionCTA() {
  return (
    <section className="cta-band" aria-labelledby="cta-heading">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow" style={{ color: "var(--gold-400)" }}>
            2026/2027 Session
          </p>
          <h2 id="cta-heading">Admission Is Currently Open</h2>
          <p>Take the first step toward becoming a Godly intellectual at ACU, Oyo.</p>
        </div>
        <div className="cta-actions">
          <a href="https://acu.edu.ng/courses" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            View Courses
          </a>
          <a href={SITE.applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}

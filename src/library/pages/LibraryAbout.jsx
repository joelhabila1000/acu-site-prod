import { Link } from "react-router-dom";
import { useLibraryBranches, useLibrarySettings } from "../../data/cms.js";
import { libraryPath } from "../../data/library.js";
import BranchCard from "../components/BranchCard.jsx";

const EMPTY = [];

export default function LibraryAbout({ base }) {
  const branches = useLibraryBranches() || EMPTY;
  const settings = useLibrarySettings();

  return (
    <>
      <section className="lib-section lib-section--tight" style={{ paddingBottom: 0 }}>
        <div className="lib-container">
          <div className="lib-section-head">
            <h2>{settings.eyebrow}</h2>
            <p>{settings.intro}</p>
          </div>
        </div>
      </section>

      <section className="lib-section" style={{ paddingTop: 24 }}>
        <div className="lib-container">
          <div className="lib-section-head">
            <h2>Our branches</h2>
            <p>
              The library serves every faculty across the campus. Contact details
              and opening hours for each branch are below.
            </p>
          </div>
          {branches.length ? (
            <div className="lib-grid lib-grid--2">
              {branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))}
            </div>
          ) : (
            <div className="lib-empty">Branch information is not available yet.</div>
          )}
        </div>
      </section>

      <section className="lib-section lib-section--cream">
        <div className="lib-container">
          <div className="lib-grid lib-grid--2">
            <div>
              <div className="lib-section-head">
                <h2>Contact the library</h2>
              </div>
              <div className="lib-branch-contact" style={{ fontSize: "1rem" }}>
                <a href={`mailto:${settings.enquiryEmail}`}>{settings.enquiryEmail}</a>
              </div>
              <p style={{ color: "var(--lib-muted)" }}>{settings.hoursNote}</p>
              <Link className="lib-btn" to={libraryPath(base, "/contact")}>
                Ask a librarian
              </Link>
            </div>
            <div>
              <div className="lib-section-head">
                <h2>Using the library</h2>
              </div>
              <p style={{ color: "var(--lib-muted)" }}>
                Students and staff register with a valid ID. Most collections are
                open shelves; reference and special collections are consulted in
                the reading room. Silence is observed in the main reading rooms.
              </p>
              <Link className="lib-link-more" to={libraryPath(base, "/services")}>
                See library services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

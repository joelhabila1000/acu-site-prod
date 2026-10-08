import { useDocuments } from "../data/cms.js";
import { formatFileSize } from "../lib/format.js";
import "./Library.css";

const serviceCards = [
  {
    title: "Print & digital collections",
    text: "Books, journals, reference titles and subject resources built to support teaching, learning and research at every level.",
  },
  {
    title: "Research support",
    text: "Guidance on literature searching, citation, referencing, thesis preparation and identifying relevant academic databases.",
  },
  {
    title: "Study spaces",
    text: "Quiet reading rooms, discussion areas and reading-friendly spaces for individual study and group learning.",
  },
  {
    title: "Reader services",
    text: "Borrowing, renewals, inter-library enquiry support and help with access to collections across the University system.",
  },
];

const libraryHours = [
  ["Monday - Friday", "8:00 AM - 6:00 PM"],
  ["Saturday", "9:00 AM - 3:00 PM"],
  ["Sunday", "Closed"],
];

function documentLabel(doc) {
  const ext = (doc.fileName || "").split(".").pop();
  if (ext && ext !== doc.fileName && ext.length <= 5) return ext.toUpperCase();
  const sub = (doc.fileType || "").split("/").pop();
  return (sub || "FILE").toUpperCase().slice(0, 4);
}

export default function Library() {
  const documents = useDocuments() || [];
  const libraryDocs = documents.filter((doc) => {
    const haystack = `${doc.title} ${doc.description || ""} ${doc.category || ""}`.toLowerCase();
    return /library|catalog|resource|guide|reading|manual|report|research/i.test(haystack);
  });

  return (
    <div className="library-page">
      <section className="library-hero">
        <div className="container library-hero-inner">
          <div className="library-hero-copy">
            <span className="library-tag">Ajayi Crowther University</span>
            <h1>
              Discover Knowledge
              <strong>Beyond Limits</strong>
            </h1>
            <p>
              The library is the centre of academic life at ACU, supporting
              reading, innovation, research and lifelong learning in every faculty.
            </p>
            <div className="library-cta-row">
              <a className="btn btn-gold" href="#library-resources">
                Explore resources
              </a>
              <a className="btn btn-outline-light" href="/contact">
                Contact library
              </a>
            </div>
          </div>

          <div className="library-visual" aria-hidden="true">
            <div className="library-building">
              <div className="library-window-row">
                <span />
                <span />
                <span />
              </div>
              <div className="library-window-row">
                <span />
                <span />
                <span />
              </div>
              <div className="library-window-row">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="library-summary section">
        <div className="container library-summary-grid">
          <div className="library-summary-copy">
            <p className="eyebrow">Our mission</p>
            <h2>Learning spaces built for curiosity, study and scholarship</h2>
            <p>
              We provide access to knowledge that shapes lives and institutions,
              from course reading lists and digital resources to research support and
              quiet study spaces.
            </p>
          </div>

          <div className="library-hours-card">
            <h3>Library Hours</h3>
            <ul>
              {libraryHours.map(([day, time]) => (
                <li key={day}>
                  <span>{day}</span>
                  <strong>{time}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">What we offer</p>
            <h2>Library services for every stage of study</h2>
          </div>

          <div className="library-services">
            {serviceCards.map((card) => (
              <article key={card.title} className="library-service-card">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="library-resources">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Resources</p>
            <h2>Library documents and reading materials</h2>
          </div>

          {libraryDocs.length > 0 ? (
            <div className="library-documents">
              {libraryDocs.map((doc, index) => (
                <a
                  key={doc.id || `${doc.title}-${index}`}
                  className="library-document-card"
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={doc.fileName || undefined}
                >
                  <span className="library-document-badge" aria-hidden="true">
                    {documentLabel(doc)}
                  </span>

                  <div className="library-document-body">
                    {doc.category && (
                      <span className="library-document-tag">{doc.category}</span>
                    )}
                    <h3>{doc.title}</h3>
                    {doc.description && <p>{doc.description}</p>}
                    <span className="library-document-meta">
                      {[doc.date, formatFileSize(doc.fileSize)]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </div>

                  <span className="library-document-arrow" aria-hidden="true">
                    ↓
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="library-empty-state">
              <div className="library-empty-box">
                <span className="library-empty-icon" aria-hidden="true">
                  LIB
                </span>
                <div>
                  <h3>No library materials uploaded yet</h3>
                  <p>
                    Library guides, catalogues and related resources will appear here
                    once they are added from the admin dashboard.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

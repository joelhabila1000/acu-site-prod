import { Link } from "react-router-dom";
import { useLibraryServices, useDocuments } from "../../data/cms.js";
import { libraryPath } from "../../data/library.js";

const EMPTY = [];

export default function Services({ base }) {
  const services = useLibraryServices() || EMPTY;
  const documents = useDocuments() || EMPTY;
  const libraryDocs = documents.filter((doc) =>
    /librar/i.test(`${doc.category} ${doc.title}`),
  );

  return (
    <>
      <section className="lib-section lib-section--tight" style={{ paddingBottom: 0 }}>
        <div className="lib-container">
          <div className="lib-section-head">
            <h2>Library services</h2>
            <p>
              Everything the library offers readers, researchers and staff —
              borrowing, research support, study spaces and information literacy.
            </p>
          </div>
        </div>
      </section>

      <section className="lib-section" style={{ paddingTop: 24 }}>
        <div className="lib-container">
          {services.length ? (
            <div className="lib-grid lib-grid--2">
              {services.map((service) => (
                <article key={service.id} className="lib-service-card">
                  <h3>{service.title}</h3>
                  {service.summary ? <p>{service.summary}</p> : null}
                  {service.description ? (
                    <p style={{ marginTop: 8 }}>{service.description}</p>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="lib-empty">No services have been listed yet.</div>
          )}
        </div>
      </section>

      {libraryDocs.length ? (
        <section className="lib-section lib-section--cream">
          <div className="lib-container">
            <div className="lib-section-head">
              <h2>Policies, forms &amp; guides</h2>
              <p>Download the library&apos;s policies and request forms.</p>
            </div>
            <div className="lib-grid lib-grid--3">
              {libraryDocs.map((doc) => (
                <article key={doc.id} className="lib-service-card">
                  <h3>{doc.title}</h3>
                  {doc.description ? <p>{doc.description}</p> : null}
                  <p style={{ marginTop: 10 }}>
                    <a
                      className="lib-link-more"
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="lib-section">
        <div className="lib-container">
          <div className="lib-section-head">
            <h2>Need something?</h2>
            <p>
              Request a title, ask about your membership, or get help with
              research — a librarian will get back to you.
            </p>
          </div>
          <Link className="lib-btn" to={libraryPath(base, "/contact")}>
            Ask a librarian
          </Link>
        </div>
      </section>
    </>
  );
}

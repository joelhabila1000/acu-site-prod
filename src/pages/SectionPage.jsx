import { Link, useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import NotFound from "./NotFound.jsx";
import { SECTION_PAGES } from "../data/sectionPages.js";

// Renders the informational pages reached from the primary navigation. Each
// route looks its content up in SECTION_PAGES by path, so a new page needs only
// a data entry and a route rather than a new component.
export default function SectionPage() {
  const { pathname } = useLocation();
  const content = SECTION_PAGES[pathname];

  if (!content) return <NotFound />;

  const { crumb, title, lede, sections = [], links, facts, cta } = content;

  return (
    <>
      <PageHeader crumb={crumb} title={title} lede={lede} />
      <section className="section">
        <div className="container" style={{ maxWidth: 940 }}>
          {sections.map((section) => (
            <article key={section.heading} style={{ marginBottom: 42 }}>
              <div className="crest-divider">
                <span className="diamond" aria-hidden="true" />
              </div>
              {section.heading && <h2>{section.heading}</h2>}
              {(section.paragraphs || []).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {section.list && (
                <ul className="value-list" style={{ marginTop: 20 }}>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          {links && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 8,
              }}
            >
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="btn btn-navy btn-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {facts && (
            <div className="value-card">
              {facts.map(([label, value]) => (
                <p key={label}>
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>
          )}

          {cta && (
            <p style={{ marginTop: 28 }}>
              {cta.external ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-oxblood"
                >
                  {cta.label}
                </a>
              ) : (
                <Link to={cta.href} className="btn btn-oxblood">
                  {cta.label}
                </Link>
              )}
            </p>
          )}
        </div>
      </section>
    </>
  );
}

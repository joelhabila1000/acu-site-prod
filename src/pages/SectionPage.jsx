import { Link, useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import NotFound from "./NotFound.jsx";
import { usePages } from "../data/cms.js";
import "./SectionPage.css";

// Renders the informational pages reached from the primary navigation. Each
// route looks its content up by path, so a page is an admin record (with the
// bundled copy as fallback) rather than a component of its own.
export default function SectionPage() {
  const { pathname } = useLocation();
  const pages = usePages();
  const content = pages[pathname];

  if (!content) return <NotFound />;

  const { crumb, title, lede, calendar, sections = [], links, facts, cta, attachment } =
    content;

  // A PDF is shown on the page as well as offered as a download, so a fee
  // schedule or form can be read without leaving the site.
  const isPdf = Boolean(
    attachment &&
      (attachment.type === "application/pdf" ||
        /\.pdf($|\?)/i.test(attachment.url || "")),
  );

  // A section the editor emptied out should not leave a divider and blank space
  // behind, and an empty calendar/facts/links block should not draw a box.
  const visibleSections = sections.filter(
    (section) =>
      section &&
      (section.heading ||
        (section.paragraphs || []).length > 0 ||
        (section.list || []).length > 0),
  );

  return (
    <>
      <PageHeader crumb={crumb} title={title} lede={lede} />
      <section className="section">
        <div className="container" style={{ maxWidth: 940 }}>
          {calendar && calendar.semesters && calendar.semesters.length > 0 && (
            <div className="calendar">
              {calendar.session && (
                <p className="calendar-session">
                  <span className="eyebrow">Session</span>
                  <strong>{calendar.session}</strong>
                </p>
              )}
              {calendar.note && <p className="calendar-note">{calendar.note}</p>}
              {calendar.semesters.map((semester, index) => (
                <div className="calendar-semester" key={semester.name}>
                  <h2 id={`semester-${index}`}>{semester.name}</h2>
                  <div className="calendar-table-wrap">
                    <table
                      className="calendar-table"
                      aria-labelledby={`semester-${index}`}
                    >
                      <thead>
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Activity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semester.events.map((event) => (
                          <tr key={event.label}>
                            <td className="calendar-date">
                              {event.date ? (
                                event.date
                              ) : (
                                <span className="calendar-tbc">TBC</span>
                              )}
                            </td>
                            <td>{event.label}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {visibleSections.map((section) => (
            <article key={section.heading} style={{ marginBottom: 42 }}>
              <div className="crest-divider">
                <span className="diamond" aria-hidden="true" />
              </div>
              {section.heading && <h2>{section.heading}</h2>}
              {(section.paragraphs || []).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {section.list && section.list.length > 0 && (
                <ul className="value-list" style={{ marginTop: 20 }}>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          {links && links.length > 0 && (
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

          {facts && facts.length > 0 && (
            <div className="value-card">
              {facts.map((fact) => (
                <p key={fact.label}>
                  <strong>{fact.label}:</strong> {fact.value}
                </p>
              ))}
            </div>
          )}

          {attachment && (
            <div className="download">
              <p>
                <a
                  href={attachment.url}
                  className="btn btn-navy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {attachment.name
                    ? `Download ${attachment.name}`
                    : "Download the document"}
                </a>
              </p>
              {isPdf && (
                <div className="pdf-embed">
                  <iframe
                    src={attachment.url}
                    title={attachment.name || "Document"}
                    loading="lazy"
                  />
                </div>
              )}
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

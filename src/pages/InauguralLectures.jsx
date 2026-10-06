import PageHeader from "../components/PageHeader.jsx";
import { useLectures } from "../data/cms.js";
import "./InauguralLectures.css";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isUpcoming(value) {
  if (!value) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date >= new Date();
}

function ordinalSuffix(n) {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = n % 100;
  return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
}

export default function InauguralLectures() {
  const lectures = useLectures() || [];
  const ordered = [...lectures]
    .filter((lecture) => lecture.status !== "hidden")
    .sort((a, b) => (b.number ?? 0) - (a.number ?? 0));

  return (
    <>
      <PageHeader
        crumb="Academics"
        title="Inaugural Lectures"
        lede="Professorial inaugural lectures are a milestone in the academic life of Ajayi Crowther University. Each newly appointed professor presents a lecture drawn from their life's research before the university community."
      />

      <section className="section">
        <div className="container lectures-intro">
          <p className="eyebrow">The Series</p>
          <h2>A Tradition of Scholarship</h2>
          <p>
            Since its establishment, Ajayi Crowther University has hosted a
            growing series of inaugural lectures spanning the sciences, the
            humanities, law, education and the professions. The lectures are open
            to students, staff and the general public, and are held at the
            Modupe and Folorunso Alakija Faculty of Law Auditorium unless
            otherwise announced.
          </p>
          <p className="lectures-note">
            Full texts and downloadable proceedings are published by the
            university as they become available.{" "}
            <a
              href="https://acu.edu.ng/inaugural-lectures/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the official archive
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="lectures-head">
            <h2>Upcoming and Recent Lectures</h2>
            <span className="lectures-count">
              {ordered.length} {ordered.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {ordered.length === 0 ? (
            <p className="lectures-empty">
              No inaugural lectures have been published yet.
            </p>
          ) : (
            <ol className="lectures-list">
              {ordered.map((lecture) => {
                const upcoming = isUpcoming(lecture.date);
                return (
                  <li className="lecture-card" key={lecture.id ?? lecture.number}>
                    <div className="lecture-number" aria-hidden="true">
                      <span>{lecture.number}</span>
                      <em>{ordinalSuffix(lecture.number)}</em>
                    </div>
                    <div className="lecture-body">
                      <div className="lecture-meta">
                        {upcoming && (
                          <span className="lecture-badge">Upcoming</span>
                        )}
                        {formatDate(lecture.date) && (
                          <span className="lecture-date">
                            {formatDate(lecture.date)}
                          </span>
                        )}
                      </div>

                      <h3 className="lecture-title">
                        {lecture.title || "Title to be confirmed"}
                      </h3>

                      {lecture.lecturer && (
                        <p className="lecture-lecturer">
                          <strong>{lecture.lecturer}</strong>
                          {lecture.lecturerRole && (
                            <span className="lecture-role">
                              {" "}
                              — {lecture.lecturerRole}
                            </span>
                          )}
                        </p>
                      )}

                      {lecture.venue && (
                        <p className="lecture-venue">{lecture.venue}</p>
                      )}

                      {lecture.fileUrl && (
                        <a
                          className="btn btn-navy btn-sm lecture-download"
                          href={lecture.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download proceedings
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}

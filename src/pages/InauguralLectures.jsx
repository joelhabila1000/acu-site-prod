import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { useLectures } from "../data/cms.js";
import "./InauguralLectures.css";

const LIST_PATH = "/academics/inaugural-lectures";

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

function lecturePath(lecture) {
  return `${LIST_PATH}/${lecture.number}`;
}

function visibleLectures(lectures) {
  return [...(lectures || [])]
    .filter((lecture) => lecture.status !== "hidden")
    .sort((a, b) => (b.number ?? 0) - (a.number ?? 0));
}

function writeUpFor(lecture, ordinal) {
  if (lecture.summary) return lecture.summary;
  const who = lecture.lecturer || "the inaugural lecturer";
  const where = lecture.venue ? ` at ${lecture.venue}` : "";
  return `The ${ordinal} Professorial Inaugural Lecture of Ajayi Crowther University was delivered by ${who}${where}. A full write-up of the lecture, together with the paper itself, is published here for students, staff and the general public.`;
}

export default function InauguralLectures() {
  const lectures = visibleLectures(useLectures());

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
            Open any lecture to read a short write-up and the full paper.
          </p>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="lectures-head">
            <h2>Upcoming and Recent Lectures</h2>
            <span className="lectures-count">
              {lectures.length} {lectures.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {lectures.length === 0 ? (
            <p className="lectures-empty">
              No inaugural lectures have been published yet.
            </p>
          ) : (
            <ol className="lectures-list">
              {lectures.map((lecture) => {
                const upcoming = isUpcoming(lecture.date);
                const path = lecturePath(lecture);
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
                        <Link to={path}>
                          {lecture.title || "Title to be confirmed"}
                        </Link>
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

                      <div className="lecture-actions">
                        <Link className="btn btn-navy btn-sm" to={path}>
                          Read lecture
                        </Link>
                        {lecture.fileUrl && (
                          <a
                            className="btn btn-outline btn-sm"
                            href={lecture.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            Download PDF
                          </a>
                        )}
                      </div>
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

export function LectureDetail() {
  const { number } = useParams();
  const lecture = visibleLectures(useLectures()).find(
    (item) => String(item.number) === String(number),
  );

  if (!lecture) {
    return (
      <>
        <PageHeader
          crumb="Academics"
          title="Lecture not found"
          lede="We couldn't find that inaugural lecture. It may have been removed or is not published yet."
        />
        <section className="section">
          <div className="container">
            <Link className="btn btn-navy" to={LIST_PATH}>
              Back to Inaugural Lectures
            </Link>
          </div>
        </section>
      </>
    );
  }

  const ordinal = `${lecture.number}${ordinalSuffix(lecture.number)}`;

  return (
    <>
      <PageHeader
        crumb="Inaugural Lectures"
        title={lecture.title || `${ordinal} Inaugural Lecture`}
        lede={
          lecture.lecturer
            ? `Delivered by ${lecture.lecturer}${
                lecture.lecturerRole ? ` — ${lecture.lecturerRole}` : ""
              }`
            : undefined
        }
      />

      <section className="section">
        <div className="container lecture-detail">
          <div className="lecture-detail-meta">
            <span className="lecture-detail-chip">
              {ordinal} Inaugural Lecture
            </span>
            {formatDate(lecture.date) && (
              <span className="lecture-detail-chip">
                {formatDate(lecture.date)}
              </span>
            )}
            {lecture.venue && (
              <span className="lecture-detail-chip">{lecture.venue}</span>
            )}
          </div>

          <div className="lecture-detail-grid">
            <article className="lecture-detail-writing">
              <p className="eyebrow">About this lecture</p>
              <h2>Lecture overview</h2>
              <p>{writeUpFor(lecture, ordinal)}</p>
            </article>

            <aside className="lecture-detail-doc">
              <p className="eyebrow">Lecture document</p>
              <h2>Read the paper</h2>

              {lecture.fileUrl ? (
                <>
                  <div className="lecture-pdf">
                    <iframe
                      src={lecture.fileUrl}
                      title={`${lecture.title || `${ordinal} lecture`} — document`}
                      loading="lazy"
                    />
                  </div>
                  <div className="lecture-doc-actions">
                    <a
                      className="btn btn-navy btn-sm"
                      href={lecture.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      Download PDF
                    </a>
                    <a
                      className="btn btn-outline btn-sm"
                      href={lecture.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in new tab
                    </a>
                  </div>
                </>
              ) : (
                <p className="lecture-doc-empty">
                  The paper for this lecture has not been published yet. Check
                  back soon — it will appear here to read and download.
                </p>
              )}
            </aside>
          </div>

          <Link className="lecture-back" to={LIST_PATH}>
            ← Back to all inaugural lectures
          </Link>
        </div>
      </section>
    </>
  );
}

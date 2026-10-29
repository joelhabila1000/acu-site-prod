import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import { WEBINARS, WEBINAR_CATEGORIES } from "../data/webinars.js";
import "./Webinars.css";

function parseDate(value) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value) {
  const date = parseDate(value);
  if (!date) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function dateParts(value) {
  const date = parseDate(value);
  if (!date) return { day: "", month: "", year: "" };
  return {
    day: date.toLocaleDateString("en-GB", { day: "numeric" }),
    month: date.toLocaleDateString("en-GB", { month: "short" }),
    year: date.toLocaleDateString("en-GB", { year: "numeric" }),
  };
}

function byDateAscending(a, b) {
  return (parseDate(a.date)?.getTime() ?? 0) - (parseDate(b.date)?.getTime() ?? 0);
}

function WebinarDate({ value }) {
  const parts = dateParts(value);
  return (
    <time className="webinar-date" dateTime={value}>
      <strong>{parts.day}</strong>
      <span>{parts.month}</span>
      <em>{parts.year}</em>
    </time>
  );
}

function WebinarCard({ webinar }) {
  const isPast = webinar.status === "past";
  return (
    <article className="webinar-card">
      <div className="webinar-card-head">
        <WebinarDate value={webinar.date} />
        <div className="webinar-card-tags">
          <span className="webinar-tag">{webinar.category}</span>
          {!isPast && webinar.platform && (
            <span className="webinar-platform">{webinar.platform}</span>
          )}
        </div>
      </div>

      <h3 className="webinar-title">{webinar.title}</h3>

      <p className="webinar-speaker">
        <strong>{webinar.speaker}</strong>
        {webinar.speakerRole && (
          <span className="webinar-speaker-role">, {webinar.speakerRole}</span>
        )}
      </p>

      <p className="webinar-summary">{webinar.summary}</p>

      <dl className="webinar-facts">
        {webinar.time && (
          <>
            <dt>Time</dt>
            <dd>{webinar.time} (WAT)</dd>
          </>
        )}
        {webinar.duration && (
          <>
            <dt>Length</dt>
            <dd>{webinar.duration}</dd>
          </>
        )}
      </dl>

      <div className="webinar-actions">
        {isPast ? (
          webinar.recordingUrl && (
            <a
              className="btn btn-navy btn-sm"
              href={webinar.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch recording
            </a>
          )
        ) : (
          webinar.registerUrl && (
            <a
              className="btn btn-gold btn-sm"
              href={webinar.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register
            </a>
          )
        )}
        <span className="webinar-status">
          {isPast ? "Recording available" : "Free · Open to all"}
        </span>
      </div>
    </article>
  );
}

export default function Webinars() {
  const [category, setCategory] = useState("All");

  const { upcoming, past, next } = useMemo(() => {
    const sorted = [...WEBINARS].sort(byDateAscending);
    const up = sorted.filter((item) => item.status !== "past");
    const done = sorted
      .filter((item) => item.status === "past")
      .sort((a, b) => byDateAscending(b, a));
    return { upcoming: up, past: done, next: up[0] || null };
  }, []);

  const filters = ["All", ...WEBINAR_CATEGORIES];

  const matches = (item) => category === "All" || item.category === category;
  const shownUpcoming = upcoming.filter(matches);
  const shownPast = past.filter(matches);

  return (
    <>
      <PageHeader
        crumb="Academics"
        title="Webinars"
        lede="Live and on-demand sessions for students, staff and the wider public. Each webinar is free to attend, recorded where possible, and hosted by members of the university and guests."
      />

      <section className="section">
        <div className="container webinars-intro">
          <p className="eyebrow">The Series</p>
          <h2>Ideas You Can Use</h2>
          <p>
            Our webinar series brings research, teaching and professional
            practice into an hour that fits your day. Sessions run throughout the
            academic year on research methods, careers, faith and ethics, and
            sustainability, among other themes.
          </p>
          <p>
            Registration is free and open to everyone. Where a session is
            recorded, the video is published here afterwards so you can catch up.
          </p>
        </div>
      </section>

      {next && (
        <Reveal as="section" variant="lift" className="section-tight">
          <div className="container">
            <div className="webinar-feature">
              <div className="webinar-feature-copy">
                <p className="eyebrow">Next up</p>
                <h2>{next.title}</h2>
                <p className="webinar-feature-meta">
                  {formatDate(next.date)} · {next.time} (WAT) · {next.platform}
                </p>
                <p className="webinar-feature-speaker">
                  <strong>{next.speaker}</strong>
                  {next.speakerRole ? `, ${next.speakerRole}` : ""}
                </p>
                <p className="webinar-feature-summary">{next.summary}</p>
                {next.registerUrl && (
                  <a
                    className="btn btn-gold"
                    href={next.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register for this webinar
                  </a>
                )}
              </div>
              <div className="webinar-feature-date" aria-hidden="true">
                {(() => {
                  const parts = dateParts(next.date);
                  return (
                    <>
                      <span className="webinar-feature-month">{parts.month}</span>
                      <span className="webinar-feature-day">{parts.day}</span>
                      <span className="webinar-feature-year">{parts.year}</span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </Reveal>
      )}

      <Reveal as="section" variant="up" className="section section-cream">
        <div className="container">
          <div className="webinars-head">
            <div>
              <p className="eyebrow">Browse the series</p>
              <h2>Upcoming and past sessions</h2>
            </div>
          </div>

          <div
            className="webinar-filters"
            role="group"
            aria-label="Filter webinars by category"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={`webinar-filter${category === item ? " is-active" : ""}`}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <h3 className="webinar-group-heading">Upcoming</h3>
          {shownUpcoming.length ? (
            <div className="webinar-grid">
              {shownUpcoming.map((webinar) => (
                <WebinarCard key={webinar.id} webinar={webinar} />
              ))}
            </div>
          ) : (
            <p className="webinar-empty">
              No upcoming webinars in this category yet. Choose another category
              or check back soon.
            </p>
          )}

          <h3 className="webinar-group-heading">Past sessions</h3>
          {shownPast.length ? (
            <div className="webinar-grid">
              {shownPast.map((webinar) => (
                <WebinarCard key={webinar.id} webinar={webinar} />
              ))}
            </div>
          ) : (
            <p className="webinar-empty">
              No recorded sessions in this category yet.
            </p>
          )}
        </div>
      </Reveal>

      <Reveal as="section" variant="fade" className="webinar-cta">
        <div className="container webinar-cta-inner">
          <div>
            <p className="eyebrow" style={{ color: "var(--gold-400)" }}>
              Take part
            </p>
            <h2>Host a session or suggest a topic</h2>
            <p>
              Staff, alumni and partners are welcome to propose a webinar. Tell
              us the subject, the audience you have in mind and a date that
              works, and the team will help you set it up.
            </p>
          </div>
          <div className="webinar-cta-actions">
            <Link className="btn btn-gold" to="/contact">
              Suggest a topic
            </Link>
            <Link className="btn btn-outline" to="/news">
              See news and events
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}

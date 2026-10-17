import { Link } from "react-router-dom";
import { useNewsEvents } from "../data/cms.js";
import Reveal from "./Reveal.jsx";
import "./UpcomingEventsSection.css";

// Reads dates in the same tolerant way the rest of the site does: real ISO
// values from the API, or the human-readable strings in the bundled fallback.
function dateParts(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return {
    iso: date.toISOString(),
    time: date.getTime(),
    day: date.toLocaleDateString("en-GB", { day: "numeric" }),
    month: date.toLocaleDateString("en-GB", { month: "short" }),
    year: date.toLocaleDateString("en-GB", { year: "numeric" }),
  };
}

export default function UpcomingEventsSection() {
  const items = useNewsEvents();
  const now = Date.now();

  const events = items
    .filter((item) => item.type === "event")
    .map((item) => ({ item, when: dateParts(item.date) }))
    .filter((row) => row.when);

  const upcoming = events
    .filter((row) => row.when.time >= now)
    .sort((a, b) => a.when.time - b.when.time);

  // When the calendar has no future dates, fall back to the most recent events
  // and say so ("Latest Events") rather than leaving an empty section.
  const isUpcoming = upcoming.length > 0;
  const shown = (
    isUpcoming ? upcoming : [...events].sort((a, b) => b.when.time - a.when.time)
  ).slice(0, 3);

  return (
    <section className="section section-cream" aria-labelledby="events-heading">
      <div className="container">
        <div className="events-head">
          <div>
            <p className="eyebrow">{isUpcoming ? "What's On" : "Recently"}</p>
            <h2 id="events-heading">
              {isUpcoming ? "Upcoming Events" : "Latest Events"}
            </h2>
          </div>
          <Link to="/news" className="btn btn-navy btn-sm">
            View All Events
          </Link>
        </div>

        {shown.length === 0 ? (
          <div className="events-empty">
            <p>No events are listed yet.</p>
            <Link to="/news" className="btn btn-navy btn-sm">
              See News &amp; Events
            </Link>
          </div>
        ) : (
          <ul className="events-grid">
            {shown.map(({ item, when }, index) => (
              <Reveal
                as="li"
                key={item.slug || item.id}
                className="event-card"
                delay={index * 80}
              >
                <Link
                  to={`/news/${item.slug || item.id}`}
                  className="event-card-link"
                >
                  <time className="event-date" dateTime={when.iso}>
                    <strong>{when.day}</strong>
                    <span>{when.month}</span>
                    <em>{when.year}</em>
                  </time>
                  <div className="event-body">
                    <h3>{item.title}</h3>
                    {item.excerpt && <p>{item.excerpt}</p>}
                    <span className="event-more">Event details →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

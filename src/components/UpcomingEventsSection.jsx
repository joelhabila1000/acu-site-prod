import { Link } from "react-router-dom";
import { useNewsEvents } from "../data/cms.js";
import Reveal from "./Reveal.jsx";
import "./UpcomingEventsSection.css";

// Dates arrive either as real ISO values from the API or as the human-readable
// strings in the bundled fallback, so parse tolerantly.
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

// How many rows the list shows at most.
const LIMIT = 6;

export default function UpcomingEventsSection() {
  const items = useNewsEvents();
  const now = Date.now();

  const events = items
    .filter((item) => item.type === "event")
    .map((item) => ({ item, when: dateParts(item.date) }))
    .filter((row) => row.when);

  // Forthcoming only, soonest first — so the list re-orders itself as the
  // calendar moves. When nothing is scheduled yet it falls back to the most
  // recent events and says so, rather than showing an empty homepage section.
  const forthcoming = events
    .filter((row) => row.when.time >= now)
    .sort((a, b) => a.when.time - b.when.time);

  const isForthcoming = forthcoming.length > 0;
  const shown = (
    isForthcoming
      ? forthcoming
      : [...events].sort((a, b) => b.when.time - a.when.time)
  ).slice(0, LIMIT);

  return (
    <section className="section section-cream" aria-labelledby="events-heading">
      <div className="container">
        <div className="events-head">
          <div>
            <p className="eyebrow">{isForthcoming ? "What's On" : "Recently"}</p>
            <h2 id="events-heading">
              {isForthcoming ? "Forthcoming Events" : "Latest Events"}
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
          <ul className="events-list">
            {shown.map(({ item, when }, index) => (
              <Reveal
                as="li"
                key={item.slug || item.id}
                className="event-row"
                delay={index * 60}
              >
                <Link
                  to={`/news/${item.slug || item.id}`}
                  className="event-row-link"
                >
                  <time className="event-date" dateTime={when.iso}>
                    <strong>{when.day}</strong>
                    <span>{when.month}</span>
                    <em>{when.year}</em>
                  </time>

                  <div className="event-body">
                    <h3>{item.title}</h3>
                    {item.category && (
                      <p className="event-venue">{item.category}</p>
                    )}
                    {item.excerpt && (
                      <p className="event-excerpt">{item.excerpt}</p>
                    )}
                  </div>

                  <span className="event-more" aria-hidden="true">
                    Details →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

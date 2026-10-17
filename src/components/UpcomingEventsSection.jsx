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

  // Forthcoming events only, soonest first, so the list re-orders and drops rows
  // by itself as the calendar moves. Populated from events added in the admin;
  // until any are scheduled the section shows its "nothing yet" state.
  const forthcoming = items
    .filter((item) => item.type === "event")
    .map((item) => ({ item, when: dateParts(item.date) }))
    .filter((row) => row.when && row.when.time >= now)
    .sort((a, b) => a.when.time - b.when.time)
    .slice(0, LIMIT);

  return (
    <section className="section section-cream" aria-labelledby="events-heading">
      <div className="container">
        <div className="events-head">
          <div>
            <p className="eyebrow">What&apos;s On</p>
            <h2 id="events-heading">Forthcoming Events</h2>
          </div>
          <Link to="/news" className="btn btn-navy btn-sm">
            View All Events
          </Link>
        </div>

        {forthcoming.length === 0 ? (
          <div className="events-empty">
            <svg
              className="events-empty-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
            </svg>
            <h3>Nothing on the calendar yet</h3>
            <p>
              New events appear here, soonest first, as soon as they are
              scheduled. Check back soon, or catch up on recent news and events.
            </p>
          </div>
        ) : (
          <ul className="events-list">
            {forthcoming.map(({ item, when }, index) => (
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

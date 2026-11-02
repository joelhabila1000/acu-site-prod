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
  return { iso: date.toISOString(), time: date.getTime() };
}

function formatEventDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// "09:00 – 14:00", "09:00", or "" when the event has no time set.
function timeRange(item) {
  const start = (item.startTime || "").trim();
  const end = (item.endTime || "").trim();
  if (start && end) return `${start} – ${end}`;
  return start || end;
}

function CalendarIcon() {
  return (
    <svg
      className="event-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="event-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      className="event-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
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
    <Reveal
      as="section"
      variant="rise"
      className="section section-cream"
      aria-labelledby="events-heading"
    >
      <div className="container">
        <div className="events-head">
          <div>
            <p className="eyebrow">What&apos;s On</p>
            <h2 id="events-heading">Upcoming Events</h2>
          </div>
          <Link to="/news?type=event" className="btn btn-navy btn-sm">
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
          <ol className="events-list">
            {forthcoming.map(({ item, when }, index) => {
              const time = timeRange(item);
              return (
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
                    <span className="event-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="event-body">
                      <span className="event-title">{item.title}</span>
                      <span className="event-meta">
                        <time
                          className="event-meta-item"
                          dateTime={when.iso}
                        >
                          <CalendarIcon />
                          {formatEventDate(item.date)}
                        </time>
                        {time && (
                          <span className="event-meta-item">
                            <ClockIcon />
                            {time}
                          </span>
                        )}
                        {item.venue && (
                          <span className="event-meta-item">
                            <PinIcon />
                            {item.venue}
                          </span>
                        )}
                      </span>
                    </span>

                    <span className="event-more" aria-hidden="true">
                      Details →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ol>
        )}
      </div>
    </Reveal>
  );
}

import { useEffect, useMemo, useState } from "react";
import Reveal from "../components/Reveal.jsx";
import { useStaff } from "../data/cms.js";
import "./StaffDirectory.css";

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

// Academic (teaching) and non-academic (ICT, bursary, bookshop…) staff are
// shown as separate groups.
const STAFF_TYPES = [
  { key: "academic", label: "Academic Staff" },
  { key: "non-academic", label: "Non-Academic Staff" },
];

const TABS = [{ key: "all", label: "All staff" }, ...STAFF_TYPES];

function typeOf(person) {
  return person.staffType === "non-academic" ? "non-academic" : "academic";
}

// Where a person sits: a unit for non-academic staff, department + faculty
// for academic staff.
function placeOf(person) {
  return person.unit || person.departmentName || "";
}

// Academic and professional profiles shown on each card, in display order.
// Anything left blank is simply not rendered.
const PROFILE_LINKS = [
  { key: "orcid", label: "ORCID" },
  { key: "googleScholar", label: "Google Scholar" },
  { key: "scopus", label: "Scopus" },
  { key: "researchGate", label: "ResearchGate" },
  { key: "academia", label: "Academia.edu" },
  { key: "webOfScience", label: "Web of Science" },
  { key: "ssrn", label: "SSRN" },
  { key: "linkedin", label: "LinkedIn" },
];

// People paste bare domains as often as full URLs.
function profileHref(value) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function linksFor(person) {
  return PROFILE_LINKS.filter((link) => person[link.key]);
}

// The card only carries the headline details, so the popup is worth opening
// when there is a biography or a profile to show.
function hasMoreDetails(person) {
  return Boolean(person.biography) || linksFor(person).length > 0;
}

export default function StaffDirectory() {
  const staff = useStaff();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [faculty, setFaculty] = useState("");
  const [place, setPlace] = useState("");
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  // Faculties and departments/units are derived from the staff records
  // themselves, so the filters never offer an option that returns nothing.
  const faculties = useMemo(() => {
    const names = new Set();
    staff.forEach((person) => {
      if (person.facultyName) names.add(person.facultyName);
    });
    return [...names].sort();
  }, [staff]);

  const places = useMemo(() => {
    const names = new Set();
    staff.forEach((person) => {
      if (faculty && person.facultyName !== faculty) return;
      const where = placeOf(person);
      if (where) names.add(where);
    });
    return [...names].sort();
  }, [staff, faculty]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return staff.filter((person) => {
      if (type !== "all" && typeOf(person) !== type) return false;
      if (faculty && person.facultyName !== faculty) return false;
      if (place && placeOf(person) !== place) return false;
      if (!q) return true;
      return [
        person.name,
        person.position,
        person.departmentName,
        person.facultyName,
        person.unit,
        person.email,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [staff, query, type, faculty, place]);

  // Bucket by type so a record can never fall outside every group.
  const counts = useMemo(() => {
    const tally = { academic: 0, "non-academic": 0 };
    results.forEach((person) => {
      tally[typeOf(person)] += 1;
    });
    return tally;
  }, [results]);

  const groups = useMemo(() => {
    return STAFF_TYPES.filter((group) => type === "all" || type === group.key)
      .map((group) => ({
        ...group,
        people: results.filter((person) => typeOf(person) === group.key),
      }))
      .filter((group) => group.people.length > 0);
  }, [results, type]);

  function resetFilters() {
    setQuery("");
    setType("all");
    setFaculty("");
    setPlace("");
  }

  const activeLinks = active ? linksFor(active) : [];
  const hasFilters = Boolean(query || faculty || place || type !== "all");

  function renderCard(person, index) {
    return (
      <Reveal key={person.id} delay={(index % 3) * 70}>
        <article className="staff-card">
          <div className="staff-card-media">
            {person.image ? (
              <img src={person.image} alt={person.name} loading="lazy" />
            ) : (
              <span className="staff-card-initials" aria-hidden="true">
                {initials(person.name)}
              </span>
            )}
          </div>

          <div className="staff-card-body">
            <h3>
              {person.title ? `${person.title} ` : ""}
              {person.name}
            </h3>
            {person.position && (
              <p className="staff-card-position">{person.position}</p>
            )}
            {(placeOf(person) || person.facultyName) && (
              <p className="staff-card-unit">
                {[placeOf(person), person.facultyName]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}

            {(person.email || person.phone) && (
              <div className="staff-card-contact">
                {person.email && (
                  <a href={`mailto:${person.email}`}>{person.email}</a>
                )}
                {person.phone && (
                  <a href={`tel:${person.phone.replace(/\s/g, "")}`}>
                    {person.phone}
                  </a>
                )}
              </div>
            )}

            {linksFor(person).length > 0 && (
              <div className="staff-card-profiles">
                {linksFor(person).map((link) => (
                  <a
                    key={link.key}
                    className="staff-profile-link"
                    href={profileHref(person[link.key])}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {hasMoreDetails(person) && (
              <button
                type="button"
                className="staff-read-more"
                onClick={() => setActive(person)}
              >
                Read more
                <span aria-hidden="true"> →</span>
              </button>
            )}
          </div>
        </article>
      </Reveal>
    );
  }

  return (
    <>
      <section className="staff-hero">
        <div className="container">
          <p className="eyebrow">Directory</p>
          <h1>Staff Directory</h1>
          <p>
            Find academic and non-academic staff by name, faculty, department or
            unit, with contact details for each member of staff.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="staff-tabs" role="tablist" aria-label="Filter by staff type">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={type === tab.key}
                className={`staff-tab ${type === tab.key ? "is-active" : ""}`}
                onClick={() => setType(tab.key)}
              >
                {tab.label}
                <span className="staff-tab-count">
                  {tab.key === "all" ? results.length : counts[tab.key]}
                </span>
              </button>
            ))}
          </div>

          <div className="staff-controls">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, role or department…"
              aria-label="Search staff"
            />
            <select
              value={faculty}
              aria-label="Filter by faculty"
              onChange={(e) => {
                setFaculty(e.target.value);
                setPlace("");
              }}
            >
              <option value="">All faculties</option>
              {faculties.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <select
              value={place}
              aria-label="Filter by department or unit"
              onChange={(e) => setPlace(e.target.value)}
            >
              <option value="">All departments &amp; units</option>
              {places.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="staff-summary">
            <p className="staff-count">
              {results.length} {results.length === 1 ? "member" : "members"} of
              staff
            </p>
            {hasFilters && (
              <button type="button" className="staff-reset" onClick={resetFilters}>
                Clear filters
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="staff-empty">
              {staff.length === 0
                ? "No staff have been added yet. Staff are managed in the admin under Staff Directory."
                : "No staff match your search. Try a different name or clear the filters."}
            </div>
          ) : (
            groups.map((group) => (
              <div className="staff-group" key={group.key}>
                <h2 className="staff-group-title">
                  {group.label}
                  <span className="staff-group-count">{group.people.length}</span>
                </h2>
                <div className="staff-grid">
                  {group.people.map((person, index) => renderCard(person, index))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {active && (
        <div
          className="staff-modal-overlay"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="staff-modal-title"
        >
          <div className="staff-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="staff-modal-close"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="staff-modal-head">
              <div className="staff-modal-photo">
                {active.image ? (
                  <img src={active.image} alt={active.name} />
                ) : (
                  <span className="staff-card-initials" aria-hidden="true">
                    {initials(active.name)}
                  </span>
                )}
              </div>

              <div className="staff-modal-headings">
                <span className="staff-modal-type">
                  {typeOf(active) === "non-academic"
                    ? "Non-Academic Staff"
                    : "Academic Staff"}
                </span>
                {active.position && (
                  <p className="staff-modal-position">{active.position}</p>
                )}
                <h2 id="staff-modal-title">
                  {active.title ? `${active.title} ` : ""}
                  {active.name}
                </h2>
                {active.unit && <p className="staff-modal-unit">{active.unit}</p>}
                {active.departmentName && (
                  <p className="staff-modal-unit">{active.departmentName}</p>
                )}
                {active.facultyName && (
                  <p className="staff-modal-unit">{active.facultyName}</p>
                )}
                {(active.email || active.phone) && (
                  <div className="staff-modal-contact">
                    {active.email && (
                      <a href={`mailto:${active.email}`}>{active.email}</a>
                    )}
                    {active.phone && (
                      <a href={`tel:${active.phone.replace(/\s/g, "")}`}>
                        {active.phone}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {activeLinks.length > 0 && (
              <div className="staff-modal-section">
                <h3>Research &amp; professional profiles</h3>
                <ul className="staff-modal-links">
                  {activeLinks.map((link) => (
                    <li key={link.key}>
                      <span className="staff-modal-link-label">{link.label}</span>
                      <a
                        href={profileHref(active[link.key])}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {active[link.key]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {active.biography && (
              <div className="staff-modal-section">
                <h3>Biography</h3>
                {String(active.biography)
                  .split(/\n\n+/)
                  .filter((para) => para.trim().length > 0)
                  .map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
              </div>
            )}

            <div className="staff-modal-footer">
              <button
                type="button"
                className="staff-modal-done"
                onClick={() => setActive(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

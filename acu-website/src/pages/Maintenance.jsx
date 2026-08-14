import { useMemo } from "react";
import { useLocation, Link, useParams } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function titleCaseSlug(slug) {
  return slug
    .split(/[-_ ]+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

export default function Maintenance() {
  const { portal: portalParam } = useParams();
  const query = useQuery();
  const portal = portalParam ? titleCaseSlug(portalParam) : query.get("portal") || "Portal";

  return (
    <section className="section section-cream">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="value-card">
          <h2>{portal} — Maintenance</h2>
          <p>
            The {portal} is temporarily unavailable for maintenance. Please
            check back shortly or use the links below to reach other parts of
            the site.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
            <Link to="/" className="btn btn-navy">
              Back to Home
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

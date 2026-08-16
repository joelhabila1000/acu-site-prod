import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center", padding: "140px 24px" }}>
      <p className="eyebrow" style={{ justifyContent: "center" }}>
        Error 404
      </p>
      <h1>This Page Could Not Be Found</h1>
      <p style={{ color: "var(--ink-500)", maxWidth: 420, margin: "0 auto 28px" }}>
        The page you're looking for is currently under maintainance.
      </p>
      <Link to="/" className="btn btn-navy">
        Back to Homepage
      </Link>
    </section>
  );
}

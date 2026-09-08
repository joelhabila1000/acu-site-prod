import "../admin.css";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <header className="admin-topbar">
      <div className="u-flex">
        <div style={{ fontSize: 16, fontWeight: 600 }}>ACU Admin</div>
      </div>
      <div className="u-flex">
        <div className="search">
          <input
            placeholder="Search admin..."
            style={{ padding: 8, borderRadius: 6, border: "1px solid #e6eef6" }}
          />
        </div>
        <Link to="/" className="btn secondary">
          View Site
        </Link>
      </div>
    </header>
  );
}

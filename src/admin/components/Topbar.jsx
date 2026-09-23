import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../admin.css";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="admin-topbar">
      <div className="u-flex">
        <div style={{ fontSize: 16, fontWeight: 600 }}>ACU Admin</div>
      </div>
      <div className="u-flex">
        {user && <span className="small muted">{user.name}</span>}
        <Link to="/" className="btn secondary">
          View Site
        </Link>
        <button type="button" className="btn secondary" onClick={logout}>
          Sign out
        </button>
      </div>
    </header>
  );
}

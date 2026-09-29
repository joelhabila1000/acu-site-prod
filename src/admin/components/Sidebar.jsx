import { Link, useLocation } from "react-router-dom";
import { ADMIN_NAV } from "../schema/resources.js";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../../assets/acu-logo-new-1.png";
import "../admin.css";

// Users & Roles talks to admin-only endpoints, so it is hidden from editors.
const ADMIN_ROLE = "Super Admin";

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const roleName = (user && user.role && user.role.name) || "";
  const pathname = (location.pathname || "/admin").replace(/\/$/, "") || "/admin";

  const items = ADMIN_NAV.filter(
    (item) => !item.adminOnly || roleName === ADMIN_ROLE,
  );

  return (
    <aside className="admin-sidebar">
      <div className="brand">
        <img src={logo} alt="ACU" style={{ width: 40 }} />
        <div>
          <div style={{ fontWeight: 700 }}>Ajayi Crowther Univ.</div>
          <div className="small muted">Admin Dashboard</div>
        </div>
      </div>
      <nav>
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={pathname === item.path ? "active" : ""}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

import { Link, useLocation } from "react-router-dom";
import { ADMIN_NAV } from "../schema/resources.js";
import logo from "../../assets/acu-logo-new-1.png";
import "../admin.css";

export default function Sidebar() {
  const location = useLocation();
  const pathname = (location.pathname || "/admin").replace(/\/$/, "") || "/admin";

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
        {ADMIN_NAV.map((item) => (
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

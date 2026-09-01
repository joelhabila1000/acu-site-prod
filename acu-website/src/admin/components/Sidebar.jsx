import { Link, useLocation } from "react-router-dom";
import "../admin.css";

const LINKS = [
  ["/admin", "Dashboard"],
  ["/admin/pages", "Website Pages"],
  ["/admin/news", "News"],
  ["/admin/events", "Events"],
  ["/admin/faculties", "Faculties & Departments"],
  ["/admin/programmes", "Programmes"],
  ["/admin/admissions", "Admissions"],
  ["/admin/staff", "Staff"],
  ["/admin/gallery", "Gallery"],
  ["/admin/documents", "Documents"],
  ["/admin/announcements", "Announcements"],
  ["/admin/homepage", "Homepage"],
  ["/admin/contact", "Contact Information"],
  ["/admin/users", "Users & Roles"],
  ["/admin/settings", "Settings"],
];

export default function Sidebar() {
  const loc = useLocation();
  return (
    <aside className="admin-sidebar">
      <div className="brand">
        <img
          src="/src/assets/acu-logo-new-1.png"
          alt="ACU"
          style={{ width: 40 }}
        />
        <div>
          <div style={{ fontWeight: 700 }}>Ajayi Crowther Univ.</div>
          <div className="small muted">Admin Dashboard</div>
        </div>
      </div>
      <nav>
        {LINKS.map(([path, label]) => (
          <Link
            key={path}
            to={path}
            className={loc.pathname === path ? "active" : ""}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext.jsx";
import "../admin.css";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

export default function Dashboard() {
  const { authGet } = useAuth();
  const [stats, setStats] = useState({
    news: 0,
    events: 0,
    faculties: 0,
    officers: 0,
  });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [news, events, faculties, officers] = await Promise.all([
          authGet("/api/news"),
          authGet("/api/events"),
          authGet("/api/faculties"),
          authGet("/api/principal-officers"),
        ]);
        if (cancelled) return;
        const newsItems = (news && news.data) || [];
        setStats({
          news: newsItems.length,
          events: ((events && events.data) || []).length,
          faculties: ((faculties && faculties.data) || []).length,
          officers: ((officers && officers.data) || []).length,
        });
        setRecent(newsItems.slice(0, 5));
      } catch {
        /* leave zeros */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [authGet]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Dashboard</h2>
        </div>
        <div className="quick-actions">
          <Link to="/admin/news" className="btn btn-primary">
            Add News
          </Link>
          <Link to="/admin/events" className="btn btn-secondary">
            Add Event
          </Link>
        </div>
      </div>

      <div className="dashboard-stats">
        <Card className="stat-card accent-blue" title="News Articles">
          <div className="stat-value">{loading ? "—" : stats.news}</div>
          <div className="muted small">Total news</div>
        </Card>
        <Card className="stat-card accent-green" title="Events">
          <div className="stat-value">{loading ? "—" : stats.events}</div>
          <div className="muted small">Total events</div>
        </Card>
        <Card className="stat-card accent-orange" title="Faculties">
          <div className="stat-value">{loading ? "—" : stats.faculties}</div>
          <div className="muted small">Faculties</div>
        </Card>
        <Card className="stat-card accent-purple" title="Principal Officers">
          <div className="stat-value">{loading ? "—" : stats.officers}</div>
          <div className="muted small">Officers</div>
        </Card>
      </div>

      <div className="dashboard-panels">
        <Card title="Recent News">
          {recent.length === 0 ? (
            <div className="empty">No news yet</div>
          ) : (
            <ul className="overview-list">
              {recent.map((n) => (
                <li key={n.id}>
                  <strong>{n.title}</strong>
                  <div className="muted small">
                    {formatDate(n.publishedAt || n.createdAt)}
                    {n.category ? ` — ${n.category}` : ""}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card title="Quick Links">
          <ul className="overview-list">
            <li>
              <Link to="/admin/faculties">Manage faculties &amp; programmes →</Link>
            </li>
            <li>
              <Link to="/admin/principal-officers">Manage principal officers →</Link>
            </li>
            <li>
              <Link to="/admin/settings">Edit site settings →</Link>
            </li>
            <li>
              <Link to="/admin/users">Manage users &amp; roles →</Link>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

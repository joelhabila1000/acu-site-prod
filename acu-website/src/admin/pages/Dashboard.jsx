import Card from "../components/Card";
import { SAMPLE_STATS, SAMPLE_NEWS, SAMPLE_EVENTS } from "../sampleData";
import "../admin.css";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Dashboard</h2>
        </div>
        <div className="quick-actions">
          <button className="btn btn-primary">Add News</button>
          <button className="btn btn-secondary">Add Event</button>
        </div>
      </div>

      <div className="dashboard-stats">
        <Card className="stat-card accent-blue" title="News Articles">
          <div className="stat-value">{SAMPLE_STATS.newsCount}</div>
          <div className="muted small">Total news</div>
        </Card>
        <Card className="stat-card accent-green" title="Upcoming Events">
          <div className="stat-value">{SAMPLE_STATS.eventsUpcoming}</div>
          <div className="muted small">Events</div>
        </Card>
        <Card className="stat-card accent-orange" title="Programmes">
          <div className="stat-value">{SAMPLE_STATS.programmes}</div>
          <div className="muted small">Total programmes</div>
        </Card>
        <Card className="stat-card accent-purple" title="Faculties">
          <div className="stat-value">{SAMPLE_STATS.faculties}</div>
          <div className="muted small">Faculties</div>
        </Card>
      </div>

      <div className="dashboard-panels">
        <Card title="Recent News">
          <ul className="overview-list">
            {SAMPLE_NEWS.map((n) => (
              <li key={n.id}>
                <strong>{n.title}</strong>
                <div className="muted small">
                  {n.date} — {n.author}
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Upcoming Events">
          <ul className="overview-list">
            {SAMPLE_EVENTS.map((e) => (
              <li key={e.id}>
                <strong>{e.title}</strong>
                <div className="muted small">
                  {e.date} {e.time} — {e.venue}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

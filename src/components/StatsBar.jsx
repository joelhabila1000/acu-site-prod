import Counter from "./Counter.jsx";
import { useSite } from "../data/cms.js";
import "./StatsBar.css";

export default function StatsBar() {
  const { stats } = useSite();
  return (
    <section className="stats-bar" aria-label="Ajayi Crowther University at a glance">
      <div className="container stats-grid">
        {stats.map((s) => (
          <div className="stat-item" key={s.label}>
            <Counter value={s.value} />
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

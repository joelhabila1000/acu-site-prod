import { FACULTIES } from "../data/content.js";
import "./FacultiesGrid.css";

export default function FacultiesGrid({ limit }) {
  const list = limit ? FACULTIES.slice(0, limit) : FACULTIES;

  return (
    <div className="faculties-grid">
      {list.map((f, i) => (
        <a
          key={f.name}
          href={f.url}
          target="_blank"
          rel="noopener noreferrer"
          className="faculty-card"
        >
          <span className="faculty-index">{String(i + 1).padStart(2, "0")}</span>
          <h3>Faculty of {f.name}</h3>
          <span className="faculty-link">Visit page →</span>
        </a>
      ))}
    </div>
  );
}

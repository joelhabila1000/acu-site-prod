import "../admin.css";
export default function Card({ children, title, className = "" }) {
  return (
    <div className={`card ${className}`.trim()}>
      {title && <h4 className="card-title">{title}</h4>}
      <div>{children}</div>
    </div>
  );
}

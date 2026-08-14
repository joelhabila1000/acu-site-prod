import { Link } from "react-router-dom";

export default function PageHeader({ crumb, title, lede }) {
  return (
    <section className="page-header">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{crumb}</span>
        </div>
        <p className="eyebrow">Ajayi Crowther University</p>
        <h1>{title}</h1>
        {lede && <p>{lede}</p>}
      </div>
    </section>
  );
}

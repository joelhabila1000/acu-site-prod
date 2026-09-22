import { Link } from "react-router-dom";

export default function PageHeader({ crumb, title, lede }) {
  return (
    <section className="page-header">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumb && (
            <>
              <span className="breadcrumb-sep" aria-hidden="true">
                /
              </span>
              <span>{crumb}</span>
            </>
          )}
          <span className="breadcrumb-sep" aria-hidden="true">
            /
          </span>
          <span aria-current="page">{title}</span>
        </nav>

        <h1>{title}</h1>

        {lede && <p className="page-lede">{lede}</p>}
      </div>
    </section>
  );
}
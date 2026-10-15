import HoursTable from "./HoursTable.jsx";

export default function BranchCard({ branch }) {
  return (
    <article className="lib-branch-card">
      {branch.campus ? <span className="lib-branch-campus">{branch.campus}</span> : null}
      <h3>{branch.name}</h3>
      {branch.address ? <p>{branch.address}</p> : null}

      <div className="lib-branch-contact">
        {branch.phone ? <a href={`tel:${String(branch.phone).replace(/\s/g, "")}`}>{branch.phone}</a> : null}
        {branch.email ? <a href={`mailto:${branch.email}`}>{branch.email}</a> : null}
      </div>

      <HoursTable hours={branch.hours} />

      {branch.mapEmbed ? (
        <div className="lib-branch-map">
          <iframe
            src={branch.mapEmbed}
            title={`${branch.name} location`}
            loading="lazy"
            allowFullScreen
          />
        </div>
      ) : null}
    </article>
  );
}

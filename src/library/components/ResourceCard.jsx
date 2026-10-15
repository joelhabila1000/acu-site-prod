export default function ResourceCard({ resource }) {
  const external = /^https?:\/\//i.test(resource.accessUrl || "");
  return (
    <article className="lib-tile">
      <span className="lib-tile-provider">{resource.category}</span>
      <h3>{resource.name}</h3>
      {resource.provider ? (
        <span style={{ fontSize: "0.9rem", color: "var(--lib-slate)" }}>
          {resource.provider}
        </span>
      ) : null}
      {resource.description ? <p>{resource.description}</p> : null}
      <div className="lib-tile-note">
        {resource.accessNote ? <div>{resource.accessNote}</div> : null}
        <a
          className="lib-tile-go"
          href={resource.accessUrl}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          Open resource →
        </a>
      </div>
    </article>
  );
}

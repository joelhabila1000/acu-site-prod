import { useLibraryEResources } from "../../data/cms.js";
import { ERESOURCE_CATEGORIES } from "../../data/library.js";
import ResourceCard from "../components/ResourceCard.jsx";

const EMPTY = [];

export default function EResources() {
  const resources = useLibraryEResources() || EMPTY;

  const groups = ERESOURCE_CATEGORIES.map((category) => ({
    category,
    items: resources.filter((resource) => resource.category === category),
  })).filter((group) => group.items.length);

  const other = resources.filter(
    (resource) => !ERESOURCE_CATEGORIES.includes(resource.category),
  );
  if (other.length) groups.push({ category: "Other", items: other });

  return (
    <>
      <section className="lib-section lib-section--tight" style={{ paddingBottom: 0 }}>
        <div className="lib-container">
          <div className="lib-section-head">
            <h2>Electronic resources</h2>
            <p>
              Databases, e-journals, e-books and open-access collections available
              to students and staff. Subscribed titles are accessible on campus or
              by signing in with your university account.
            </p>
          </div>
        </div>
      </section>

      {groups.length ? (
        groups.map((group) => (
          <section key={group.category} className="lib-section" style={{ paddingTop: 24 }}>
            <div className="lib-container">
              <div className="lib-section-head">
                <h2 style={{ fontSize: "1.3rem" }}>{group.category}</h2>
              </div>
              <div className="lib-grid lib-grid--3">
                {group.items.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="lib-section">
          <div className="lib-container">
            <div className="lib-empty">No electronic resources have been listed yet.</div>
          </div>
        </section>
      )}
    </>
  );
}

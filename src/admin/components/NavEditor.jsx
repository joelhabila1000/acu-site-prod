import { Field } from "./fields.jsx";

const TYPES = [
  { value: "link", label: "Single link" },
  { value: "dropdown", label: "Dropdown list" },
  { value: "mega", label: "Mega menu (columns)" },
];

function typeOf(item) {
  if (Array.isArray(item.megaMenu)) return "mega";
  if (Array.isArray(item.children)) return "dropdown";
  return "link";
}

function replaceAt(list, index, next) {
  return list.map((entry, i) => (i === index ? next : entry));
}

function move(list, index, delta) {
  const target = index + delta;
  if (target < 0 || target >= list.length) return list;
  const copy = list.slice();
  const [moved] = copy.splice(index, 1);
  copy.splice(target, 0, moved);
  return copy;
}

// Strips blank URLs so a menu with no destination reads as a group heading on
// the site, rather than a link to an empty path.
function toLinks(items) {
  return (Array.isArray(items) ? items : []).map((link) => {
    const next = { label: link.label || "" };
    if (link.path) next.path = link.path;
    return next;
  });
}

function toNav(items) {
  return (Array.isArray(items) ? items : []).map((item) => {
    const next = { label: item.label || "" };
    if (item.path) next.path = item.path;
    // The site renders `megaMenu` in preference to `children`, so save the
    // same way round — otherwise a menu carrying both would lose its columns.
    if (Array.isArray(item.megaMenu))
      next.megaMenu = item.megaMenu.map((column) => ({
        heading: column.heading || "",
        items: toLinks(column.items),
      }));
    else if (Array.isArray(item.children))
      next.children = toLinks(item.children);
    return next;
  });
}

function LinkRows({ rows, onChange }) {
  const list = Array.isArray(rows) ? rows : [];
  return (
    <>
      {list.map((row, index) => (
        <div className="nav-editor-row" key={index}>
          <input
            type="text"
            aria-label={`Link ${index + 1} name`}
            placeholder="Link name"
            value={row.label || ""}
            onChange={(e) =>
              onChange(replaceAt(list, index, { ...row, label: e.target.value }))
            }
          />
          <input
            type="text"
            aria-label={`Link ${index + 1} URL`}
            placeholder="/page, https://… or #"
            value={row.path || ""}
            onChange={(e) =>
              onChange(replaceAt(list, index, { ...row, path: e.target.value }))
            }
          />
          <div className="actions">
            <button
              type="button"
              className="btn secondary"
              onClick={() => onChange(move(list, index, -1))}
            >
              ↑
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => onChange(move(list, index, 1))}
            >
              ↓
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => onChange(list.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div>
        <button
          type="button"
          className="btn secondary"
          onClick={() => onChange([...list, { label: "", path: "" }])}
        >
          + Add link
        </button>
      </div>
    </>
  );
}

function MegaColumns({ columns, onChange }) {
  const list = Array.isArray(columns) ? columns : [];
  return (
    <div className="nav-editor-group">
      <div className="nav-editor-group-head">
        <span className="muted small">Columns</span>
        <button
          type="button"
          className="btn secondary"
          onClick={() =>
            onChange([
              ...list,
              { heading: `Column ${list.length + 1}`, items: [] },
            ])
          }
        >
          + Add column
        </button>
      </div>

      {list.map((column, index) => (
        <div className="nav-editor-column" key={index}>
          <div className="nav-editor-column-head">
            <input
              type="text"
              aria-label={`Column ${index + 1} heading`}
              placeholder="Column heading"
              value={column.heading || ""}
              onChange={(e) =>
                onChange(
                  replaceAt(list, index, { ...column, heading: e.target.value }),
                )
              }
            />
            <div className="actions">
              <button
                type="button"
                className="btn secondary"
                onClick={() => onChange(move(list, index, -1))}
              >
                ↑
              </button>
              <button
                type="button"
                className="btn secondary"
                onClick={() => onChange(move(list, index, 1))}
              >
                ↓
              </button>
              <button
                type="button"
                className="btn secondary"
                onClick={() => onChange(list.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
          </div>
          <LinkRows
            rows={column.items}
            onChange={(items) =>
              onChange(replaceAt(list, index, { ...column, items }))
            }
          />
        </div>
      ))}
    </div>
  );
}

export default function NavEditor({ value, onChange }) {
  const items = Array.isArray(value) ? value : [];

  function update(index, next) {
    onChange(toNav(replaceAt(items, index, next)));
  }

  function changeType(index, type) {
    const item = items[index];
    const next = { label: item.label || "" };
    if (item.path) next.path = item.path;
    if (type === "dropdown")
      next.children = Array.isArray(item.children) ? item.children : [];
    if (type === "mega")
      next.megaMenu = Array.isArray(item.megaMenu)
        ? item.megaMenu
        : [{ heading: "Column 1", items: [] }];
    onChange(toNav(replaceAt(items, index, next)));
  }

  return (
    <div className="nav-editor">
      <p className="field-help nav-editor-intro">
        These entries build the main menu, top to bottom. A URL can be a site
        path (“/admissions”), a full address for another site, or “#” while the
        page is not ready — “#” entries show as plain text and cannot be
        clicked. Leave the URL blank to turn a menu into a heading that opens on
        hover or tap.
      </p>

      <div className="list-field">
        {items.map((item, index) => {
          const type = typeOf(item);
          return (
            <div className="list-item" key={index}>
              <div className="list-item-head">
                <span className="muted small">Menu #{index + 1}</span>
                <div className="actions">
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => onChange(toNav(move(items, index, -1)))}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => onChange(toNav(move(items, index, 1)))}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() =>
                      onChange(toNav(items.filter((_, i) => i !== index)))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>

              <Field
                field={{ type: "text", label: "Menu label" }}
                value={item.label}
                onChange={(label) => update(index, { ...item, label })}
              />

              <div className="form-row">
                <label>Menu type</label>
                <select
                  value={type}
                  onChange={(e) => changeType(index, e.target.value)}
                >
                  {TYPES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Field
                field={{
                  type: "text",
                  label: "Link URL",
                  help: "A site path, a full URL, “#” for a placeholder, or blank for a dropdown heading.",
                }}
                value={item.path}
                onChange={(path) => update(index, { ...item, path })}
              />

              {type === "dropdown" && (
                <div className="nav-editor-group">
                  <div className="nav-editor-group-head">
                    <span className="muted small">Dropdown links</span>
                  </div>
                  <LinkRows
                    rows={item.children}
                    onChange={(children) =>
                      update(index, { ...item, children })
                    }
                  />
                </div>
              )}

              {type === "mega" && (
                <MegaColumns
                  columns={item.megaMenu}
                  onChange={(megaMenu) => update(index, { ...item, megaMenu })}
                />
              )}
            </div>
          );
        })}

        <button
          type="button"
          className="btn secondary"
          onClick={() => onChange(toNav([...items, { label: "", path: "" }]))}
        >
          + Add menu
        </button>
      </div>
    </div>
  );
}

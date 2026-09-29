import { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import Modal from "./Modal";
import { Field } from "./fields.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function formatCell(value, format) {
  if (value === null || value === undefined || value === "") return "—";
  if (format === "date") {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? String(value)
      : date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export default function ResourcePage({ resource }) {
  const { authGet, authSend } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await authGet(resource.endpoint);
        if (!cancelled) setItems(Array.isArray(res && res.data) ? res.data : []);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [resource.endpoint, authGet]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) =>
      resource.columns.some((column) =>
        String(item[column.key] ?? "").toLowerCase().includes(query),
      ),
    );
  }, [items, q, resource.columns]);

  function openCreate() {
    setFormError("");
    setEditing({ ...resource.defaults });
  }

  function openEdit(item) {
    setFormError("");
    const next = { ...item };
    // A `file` field edits one object but lives on several columns; rebuild it
    // from the row so the uploader shows the current file.
    for (const field of resource.fields) {
      if (field.type === "file" && field.targets) {
        const targets = field.targets;
        next[field.name] = {
          url: item[targets.url] || "",
          name: (targets.name && item[targets.name]) || "",
          size: (targets.size && item[targets.size]) || 0,
          type: (targets.type && item[targets.type]) || "",
        };
      }

      // A list field can hold plain strings from before it gained sub-fields.
      // Convert them on open so saving the form cannot silently drop them.
      if (field.type === "list" && Array.isArray(item[field.name])) {
        const first = (field.itemFields || [])[0];
        if (first) {
          next[field.name] = item[field.name].map((entry) =>
            typeof entry === "string" ? { [first.name]: entry } : entry,
          );
        }
      }
    }
    setEditing(next);
  }

  function setField(name, value) {
    setEditing((prev) => ({ ...prev, [name]: value }));
  }

  async function save(event) {
    event.preventDefault();
    for (const field of resource.fields) {
      const value = editing[field.name];
      const empty =
        field.type === "file" ? !(value && value.url) : !String(value ?? "").trim();
      if (field.required && empty) {
        setFormError(`${field.label} is required.`);
        return;
      }
    }
    setSaving(true);
    setFormError("");
    const payload = {};
    for (const field of resource.fields) {
      if (field.type === "file" && field.targets) {
        const v = editing[field.name] || {};
        for (const [source, column] of Object.entries(field.targets)) {
          if (!column) continue;
          payload[column] = source === "size" ? Number(v.size) || 0 : v[source] || "";
        }
      } else {
        payload[field.name] = editing[field.name];
      }
    }
    try {
      if (editing.id) {
        await authSend(`${resource.endpoint}/${editing.id}`, "PUT", payload);
      } else {
        await authSend(resource.endpoint, "POST", payload);
      }
      setEditing(null);
      const res = await authGet(resource.endpoint);
      setItems(Array.isArray(res && res.data) ? res.data : []);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(item) {
    if (!confirm(`Delete this ${resource.singular.toLowerCase()}? This cannot be undone.`))
      return;
    try {
      await authSend(`${resource.endpoint}/${item.id}`, "DELETE");
      setItems((prev) => prev.filter((row) => row.id !== item.id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <div className="page-head">
        <h2>{resource.title}</h2>
        <div className="page-head-actions">
          <input
            className="search-input"
            placeholder={`Search ${resource.title.toLowerCase()}...`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="btn" onClick={openCreate} hidden={resource.noCreate}>
            Add {resource.singular}
          </button>
        </div>
      </div>

      <Card>
        {loading ? (
          <div className="empty">Loading…</div>
        ) : error ? (
          <div className="empty">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="empty">No items found</div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  {resource.columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    {resource.columns.map((column) => (
                      <td key={column.key}>
                        {formatCell(item[column.key], column.format)}
                      </td>
                    ))}
                    <td className="actions">
                      <button className="btn secondary" onClick={() => openEdit(item)}>
                        Edit
                      </button>
                      <button className="btn" onClick={() => remove(item)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <h3>
            {editing.id ? `Edit ${resource.singular}` : `Add ${resource.singular}`}
          </h3>
          {formError && <div className="login-error">{formError}</div>}
          <form onSubmit={save}>
            <div className="modal-scroll">
              {resource.fields.map((field) => (
                <Field
                  key={field.name}
                  field={field}
                  value={editing[field.name]}
                  onChange={(value) => setField(field.name, value)}
                />
              ))}
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="btn secondary"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button className="btn" type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

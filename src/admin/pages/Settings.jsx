import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Field } from "../components/fields.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function getPath(object, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), object);
}

function setPath(object, path, value) {
  const keys = path.split(".");
  const copy = { ...(object || {}) };
  let cursor = copy;
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];
    cursor[key] = { ...(cursor[key] || {}) };
    cursor = cursor[key];
  }
  cursor[keys[keys.length - 1]] = value;
  return copy;
}

const SECTIONS = [
  {
    key: "site",
    label: "Site & Branding",
    kind: "object",
    fields: [
      { name: "name", label: "Site name", type: "text" },
      { name: "shortName", label: "Short name", type: "text" },
      { name: "motto", label: "Motto", type: "text" },
      { name: "mottoMeaning", label: "Motto meaning", type: "text" },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "address", label: "Address", type: "textarea" },
      { name: "applyUrl", label: "Application URL", type: "text" },
      { name: "mapEmbed", label: "Map embed URL", type: "textarea" },
      { name: "social.facebook", label: "Facebook", type: "text" },
      { name: "social.instagram", label: "Instagram", type: "text" },
      { name: "social.linkedin", label: "LinkedIn", type: "text" },
      { name: "social.x", label: "X (Twitter)", type: "text" },
      { name: "social.youtube", label: "YouTube", type: "text" },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    kind: "object",
    fields: [
      { name: "address", label: "Address", type: "textarea" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "mapEmbed", label: "Map embed URL", type: "textarea" },
      { name: "social.facebook", label: "Facebook", type: "text" },
      { name: "social.instagram", label: "Instagram", type: "text" },
      { name: "social.linkedin", label: "LinkedIn", type: "text" },
      { name: "social.x", label: "X (Twitter)", type: "text" },
      { name: "social.youtube", label: "YouTube", type: "text" },
    ],
  },
  {
    key: "stats",
    label: "Stats Bar",
    kind: "array",
    itemLabel: "stat",
    itemFields: [
      { name: "value", label: "Value", type: "number" },
      { name: "label", label: "Label", type: "text" },
    ],
  },
  {
    key: "portals",
    label: "Portals",
    kind: "array",
    itemLabel: "portal",
    itemFields: [
      { name: "label", label: "Label", type: "text" },
      { name: "url", label: "URL", type: "text" },
    ],
  },
  {
    key: "programmes",
    label: "Programmes",
    kind: "array",
    itemLabel: "programme",
    itemFields: [
      { name: "title", label: "Title", type: "text" },
      { name: "tag", label: "Tag", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
      { name: "url", label: "URL", type: "text" },
    ],
  },
  {
    key: "pillars",
    label: "Pillars",
    kind: "array",
    itemLabel: "pillar",
    itemFields: [
      { name: "title", label: "Title", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
    ],
  },
  {
    key: "homepage",
    label: "Homepage",
    kind: "homepage",
    itemLabel: "slide",
    itemFields: [
      { name: "image", label: "Image", type: "image" },
      { name: "imageKey", label: "Fallback image key", type: "text" },
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  { key: "nav", label: "Navigation (read-only)", kind: "raw" },
];

export default function Settings() {
  const { authGet, authSend } = useAuth();
  const [docs, setDocs] = useState({});
  const [active, setActive] = useState("site");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await authGet("/api/settings");
        if (!cancelled) setDocs(res || {});
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [authGet]);

  const section = SECTIONS.find((s) => s.key === active);

  function updateDoc(key, value) {
    setDocs((prev) => ({ ...prev, [key]: value }));
    setMessage("");
  }

  async function saveSection() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await authSend(`/api/settings/${section.key}`, "PUT", docs[section.key]);
      setMessage("Saved.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function renderEditor() {
    if (!section) return null;
    const value = docs[section.key];

    if (section.kind === "raw") {
      return (
        <textarea
          className="raw-json"
          readOnly
          rows={18}
          value={JSON.stringify(value ?? [], null, 2)}
        />
      );
    }

    if (section.kind === "array") {
      return (
        <Field
          field={{
            type: "list",
            label: section.label,
            itemLabel: section.itemLabel,
            itemFields: section.itemFields,
          }}
          value={Array.isArray(value) ? value : []}
          onChange={(next) => updateDoc(section.key, next)}
        />
      );
    }

    if (section.kind === "homepage") {
      const slides = (value && value.slides) || [];
      return (
        <Field
          field={{
            type: "list",
            label: "Hero slides",
            itemLabel: "slide",
            itemFields: section.itemFields,
          }}
          value={slides}
          onChange={(next) => updateDoc(section.key, { ...(value || {}), slides: next })}
        />
      );
    }

    return section.fields.map((field) => (
      <Field
        key={field.name}
        field={field}
        value={getPath(value, field.name)}
        onChange={(next) => updateDoc(section.key, setPath(value, field.name, next))}
      />
    ));
  }

  if (loading) return <Card><div className="empty">Loading settings…</div></Card>;

  return (
    <div>
      <div className="page-head">
        <h2>Site Settings</h2>
      </div>

      <div className="settings-layout">
        <div className="settings-tabs">
          {SECTIONS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={item.key === active ? "is-active" : ""}
              onClick={() => {
                setActive(item.key);
                setMessage("");
                setError("");
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Card>
          <div className="settings-panel-head">
            <h3>{section.label}</h3>
            {section.kind !== "raw" && (
              <div className="settings-save">
                {message && <span className="settings-saved">{message}</span>}
                {error && <span className="field-error">{error}</span>}
                <button className="btn" onClick={saveSection} disabled={saving}>
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            )}
          </div>
          <div className="modal-scroll">{renderEditor()}</div>
        </Card>
      </div>
    </div>
  );
}

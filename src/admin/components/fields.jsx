import { useState } from "react";
import { apiUpload } from "../../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";

function toDateInput(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function TagsField({ field, value, onChange }) {
  const text = Array.isArray(value) ? value.join("\n") : value || "";
  return (
    <div className="form-row">
      <label>{field.label}</label>
      <textarea
        rows={field.rows || 4}
        value={text}
        placeholder={field.placeholder || "One item per line"}
        onChange={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean),
          )
        }
      />
      {field.help && <span className="field-help">{field.help}</span>}
    </div>
  );
}

function ImageField({ field, value, onChange }) {
  const { token } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const res = await apiUpload("/api/uploads", file, { token });
      onChange(res.url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  }

  return (
    <div className="form-row">
      <label>{field.label}</label>
      <div className="image-field">
        {value ? (
          <img className="image-field-preview" src={value} alt="" />
        ) : (
          <div className="image-field-placeholder">No image</div>
        )}
        <div className="image-field-controls">
          <input
            type="text"
            value={value || ""}
            placeholder="Image URL"
            onChange={(e) => onChange(e.target.value)}
          />
          <label className="btn secondary upload-btn">
            {busy ? "Uploading…" : "Upload"}
            <input type="file" accept="image/*" onChange={handleFile} hidden />
          </label>
        </div>
      </div>
      {error && <span className="field-error">{error}</span>}
      {field.help && <span className="field-help">{field.help}</span>}
    </div>
  );
}

function ListField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const blank = () =>
    Object.fromEntries((field.itemFields || []).map((f) => [f.name, f.default ?? ""]));

  function updateItem(index, name, next) {
    onChange(items.map((item, i) => (i === index ? { ...item, [name]: next } : item)));
  }

  function addItem() {
    onChange([...items, blank()]);
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index));
  }

  function move(index, delta) {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const copy = items.slice();
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    onChange(copy);
  }

  return (
    <div className="form-row">
      <label>{field.label}</label>
      <div className="list-field">
        {items.map((item, index) => (
          <div className="list-item" key={index}>
            <div className="list-item-head">
              <span className="muted small">#{index + 1}</span>
              <div className="actions">
                <button type="button" className="btn secondary" onClick={() => move(index, -1)}>↑</button>
                <button type="button" className="btn secondary" onClick={() => move(index, 1)}>↓</button>
                <button type="button" className="btn secondary" onClick={() => removeItem(index)}>Remove</button>
              </div>
            </div>
            {(field.itemFields || []).map((sub) => (
              <Field
                key={sub.name}
                field={sub}
                value={item[sub.name]}
                onChange={(next) => updateItem(index, sub.name, next)}
              />
            ))}
          </div>
        ))}
        <button type="button" className="btn secondary" onClick={addItem}>
          + Add {field.itemLabel || "item"}
        </button>
      </div>
      {field.help && <span className="field-help">{field.help}</span>}
    </div>
  );
}

export function Field({ field, value, onChange }) {
  if (field.type === "tags") return <TagsField field={field} value={value} onChange={onChange} />;
  if (field.type === "image") return <ImageField field={field} value={value} onChange={onChange} />;
  if (field.type === "list") return <ListField field={field} value={value} onChange={onChange} />;

  if (field.type === "boolean") {
    return (
      <div className="form-row form-row-inline">
        <label>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span>{field.label}</span>
        </label>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="form-row">
        <label>{field.label}</label>
        <select value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">—</option>
          {(field.options || []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "textarea" || field.type === "richtext") {
    return (
      <div className="form-row">
        <label>{field.label}</label>
        <textarea
          rows={field.rows || (field.type === "richtext" ? 10 : 4)}
          value={value ?? ""}
          spellCheck={field.type === "richtext" ? "false" : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
        {field.help && <span className="field-help">{field.help}</span>}
      </div>
    );
  }

  if (field.type === "number") {
    return (
      <div className="form-row">
        <label>{field.label}</label>
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        />
        {field.help && <span className="field-help">{field.help}</span>}
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <div className="form-row">
        <label>{field.label}</label>
        <input
          type="date"
          value={toDateInput(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="form-row">
      <label>{field.label}</label>
      <input
        type="text"
        value={value ?? ""}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {field.help && <span className="field-help">{field.help}</span>}
    </div>
  );
}

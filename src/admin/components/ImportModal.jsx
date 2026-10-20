import { useState } from "react";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext.jsx";

// Builds a ready-to-edit CSV from the resource's column list: the header row
// plus one example record, so the expected shape is obvious.
function templateCsv({ columns, sample }) {
  const header = columns.join(",");
  const example = columns
    .map((column) => (sample && sample[column]) || "")
    .join(",");
  return `${header}\n${example}`;
}

function ImportSummary({ result }) {
  return (
    <div className="import-summary">
      <strong>
        {result.dryRun ? "Preview" : "Imported"} — {result.ready} of{" "}
        {result.total} {result.total === 1 ? "row" : "rows"} ready
        {result.dryRun ? "" : `, ${result.created} created`}
        {result.skipped ? `, ${result.skipped} skipped` : ""}
      </strong>

      {result.errors.length > 0 && (
        <ul className="import-list import-list-error">
          {result.errors.slice(0, 50).map((item) => (
            <li key={`error-${item.line}`}>
              Row {item.line}: {item.message}
            </li>
          ))}
        </ul>
      )}

      {result.warnings.length > 0 && (
        <ul className="import-list">
          {result.warnings.slice(0, 50).map((item, index) => (
            <li key={`warning-${item.line}-${index}`}>
              Row {item.line}: {item.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ImportModal({ config, onClose, onDone }) {
  const { authSend } = useAuth();
  const [csv, setCsv] = useState("");
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function run(dryRun) {
    if (!csv.trim()) {
      setError("Choose a CSV file or paste its contents first.");
      return;
    }
    setBusy(dryRun ? "preview" : "import");
    setError("");
    try {
      const res = await authSend(config.endpoint, "POST", { csv, dryRun });
      setResult(res);
      // Refresh the table only once the rows are actually in the database.
      if (!dryRun) onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy("");
    }
  }

  async function handleFile(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    setError("");
    try {
      setCsv(await file.text());
    } catch {
      setError("That file could not be read.");
    }
    // Allow re-picking the same file after a fix.
    event.target.value = "";
  }

  return (
    <Modal onClose={onClose}>
      <h3>Bulk import staff</h3>
      {error && <div className="login-error">{error}</div>}

      <div className="modal-scroll">
        <p className="field-help">
          Upload a CSV with a header row — only <strong>name</strong> is required.
          {config.help ? ` ${config.help}` : ""}
        </p>

        <div className="form-row">
          <label>CSV file</label>
          <div className="import-file">
            <label className="btn secondary upload-btn">
              Choose file
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFile}
                hidden
              />
            </label>
            <span className="muted small">{fileName || "No file chosen"}</span>
            <button
              type="button"
              className="btn secondary"
              onClick={() => {
                setCsv(templateCsv(config));
                setResult(null);
                setError("");
              }}
            >
              Use template
            </button>
          </div>
        </div>

        <div className="form-row">
          <label>CSV contents</label>
          <textarea
            rows={10}
            value={csv}
            spellCheck="false"
            placeholder="name,position,email,…"
            onChange={(e) => {
              setCsv(e.target.value);
              setResult(null);
            }}
          />
          <span className="field-help">
            You can paste rows here instead of choosing a file.
          </span>
        </div>

        {result && <ImportSummary result={result} />}
      </div>

      <div className="modal-actions">
        <button type="button" className="btn secondary" onClick={onClose}>
          Close
        </button>
        <button
          type="button"
          className="btn secondary"
          onClick={() => run(true)}
          disabled={Boolean(busy)}
        >
          {busy === "preview" ? "Checking…" : "Preview"}
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => run(false)}
          disabled={Boolean(busy)}
        >
          {busy === "import" ? "Importing…" : "Import"}
        </button>
      </div>
    </Modal>
  );
}

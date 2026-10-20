import { useState } from "react";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext.jsx";

// The template as rows: the header row plus one worked example, so the expected
// shape is obvious. Used for both the CSV textarea and the Excel download.
function templateRows({ columns, sample }) {
  return [
    columns,
    columns.map((column) => (sample && sample[column]) || ""),
  ];
}

function templateCsv(config) {
  return rowsToCsv(templateRows(config));
}

// Quotes any cell containing a comma, quote or newline so the result is valid
// CSV whatever the user typed.
function rowsToCsv(rows) {
  return rows
    .filter((row) => row.some((cell) => String(cell ?? "").trim() !== ""))
    .map((row) =>
      row
        .map((cell) => {
          const value = cell == null ? "" : String(cell);
          return /[",\r\n]/.test(value)
            ? `"${value.replace(/"/g, '""')}"`
            : value;
        })
        .join(","),
    )
    .join("\n");
}

// Builds a real .xlsx so it can be filled in Excel and uploaded again. The
// libraries are imported on demand, keeping them out of the site's main bundle.
async function downloadTemplate(config) {
  const { default: writeXlsxFile } = await import("write-excel-file/browser");
  await writeXlsxFile(templateRows(config), { sheet: "Staff" }).toFile(
    config.templateName || "template.xlsx",
  );
}

// Reads an .xlsx into the same CSV the textarea holds, so the rest of the
// dialog (preview, import) works unchanged whichever way the data arrived.
async function xlsxToCsv(file) {
  const { readSheet } = await import("read-excel-file/browser");
  const rows = await readSheet(file);
  return rowsToCsv(rows);
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
      if (/\.xlsx$/i.test(file.name)) {
        setCsv(await xlsxToCsv(file));
      } else if (/\.xls$/i.test(file.name)) {
        setCsv("");
        setError(
          "Legacy .xls files are not supported — re-save the sheet as .xlsx and try again.",
        );
      } else {
        setCsv(await file.text());
      }
    } catch (err) {
      setError(err.message || "That file could not be read.");
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
          Download the Excel template, fill it in, and upload it back — or paste
          CSV rows. Only <strong>name</strong> is required.
          {config.help ? ` ${config.help}` : ""}
        </p>

        <div className="form-row">
          <label>Spreadsheet (.xlsx) or CSV</label>
          <div className="import-file">
            <label className="btn secondary upload-btn">
              Choose file
              <input
                type="file"
                accept=".xlsx,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFile}
                hidden
              />
            </label>
            <span className="muted small">{fileName || "No file chosen"}</span>
            <button
              type="button"
              className="btn secondary"
              onClick={() => downloadTemplate(config)}
            >
              Download Excel template
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => {
                setCsv(templateCsv(config));
                setResult(null);
                setError("");
              }}
            >
              Fill from template
            </button>
          </div>
        </div>

        <div className="form-row">
          <label>Rows</label>
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
            An uploaded .xlsx is converted here so you can check it before
            importing. You can also paste rows directly.
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

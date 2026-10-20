// Minimal RFC 4180 CSV reader. Handles quoted fields, escaped quotes ("") and
// newlines inside quotes. Written by hand so the server needs no extra
// dependency for what is a small, well-defined format.

function parse(text) {
  const input = typeof text === "string" ? text : "";
  // A BOM is common in files exported from Excel and would otherwise become
  // part of the first header name.
  const source = input.charCodeAt(0) === 0xfeff ? input.slice(1) : input;

  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];

    if (quoted) {
      if (char === '"') {
        if (source[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  // Trailing field/row, unless the file ended on a newline.
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

// Uses the first row as the header and returns { header, records } where each
// record carries the spreadsheet row number (header is row 1) so errors can
// point the user at the offending line. Blank rows are dropped.
function toObjects(rows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return { header: [], records: [] };
  }

  const header = rows[0].map((cell) => String(cell).trim());
  const records = [];

  for (let i = 1; i < rows.length; i += 1) {
    const cells = rows[i];
    if (cells.every((cell) => String(cell).trim() === "")) continue;

    const record = {};
    header.forEach((key, index) => {
      record[key] = cells[index] === undefined ? "" : String(cells[index]).trim();
    });

    records.push({ line: i + 1, record });
  }

  return { header, records };
}

module.exports = { parse, toObjects };

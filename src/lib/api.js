// Thin fetch client for the ACU CMS API.
// - Local dev: empty base, Vite proxies /api to the local Express server.
// - Same origin (API on the same Vercel project): empty base.
// - Split hosting (static site on Hostinger, API on Vercel): set
//   VITE_API_BASE=https://your-api.vercel.app at build time.

export const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");

async function parse(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function apiGet(path, { token } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok) {
    const body = await parse(res);
    throw new Error((body && body.error) || `Request failed (${res.status})`);
  }
  return parse(res);
}

export async function apiSend(path, method, body, { token } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    const payload = await parse(res);
    throw new Error((payload && payload.error) || `Request failed (${res.status})`);
  }
  return parse(res);
}

export async function apiUpload(path, file, { token } = {}) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: form,
  });
  if (!res.ok) {
    const payload = await parse(res);
    throw new Error((payload && payload.error) || `Upload failed (${res.status})`);
  }
  return parse(res);
}

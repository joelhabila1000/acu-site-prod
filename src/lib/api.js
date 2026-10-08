// Thin fetch client for the ACU CMS API.
// - Local dev: empty base, Vite proxies /api to the local Express server.
// - Same origin (API on the same Vercel project): empty base.
// - Split hosting (static site on Hostinger, API on Vercel): set
//   VITE_API_BASE=https://your-api.vercel.app at build time.

import { upload as putToBlob } from "@vercel/blob/client";

export const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");

// Uploaded assets are stored as paths (`/uploads/<file>`), but older rows may
// carry an absolute URL with the host that happened to serve the upload. Either
// way, rebase the `/uploads/` path onto the API origin so it is fetched from
// the same place as the rest of the API: through the dev proxy locally (empty
// base) or from the deployed API host when VITE_API_BASE is set.
function resolveUploadUrl(value) {
  if (typeof value === "string") {
    const index = value.indexOf("/uploads/");
    return index === -1 ? value : `${API_BASE}${value.slice(index)}`;
  }
  if (Array.isArray(value)) return value.map(resolveUploadUrl);
  if (value && typeof value === "object") {
    const out = {};
    for (const key of Object.keys(value)) out[key] = resolveUploadUrl(value[key]);
    return out;
  }
  return value;
}

async function parse(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return resolveUploadUrl(JSON.parse(text));
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

// Uploads a file straight from the browser to Vercel Blob. The bytes never pass
// through the API, so they are not subject to the serverless request-body limit
// that rejects large uploads with a bare 413. The API route only issues the
// short-lived token. Throws if the host has no Blob store configured, which
// lets the caller fall back to apiUpload().
export async function apiClientUpload(path, file, { token, kind = "image" } = {}) {
  const safe = String(file.name || "file").replace(/[^\w.-]+/g, "_");
  const blob = await putToBlob(`acu/${Date.now()}-${safe}`, file, {
    access: "public",
    contentType: file.type || undefined,
    handleUploadUrl: `${API_BASE}${path}`,
    clientPayload: JSON.stringify({ kind }),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return { url: blob.url, name: file.name, size: file.size, type: file.type };
}

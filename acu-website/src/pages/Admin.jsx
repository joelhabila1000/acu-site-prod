import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  DEFAULT_SITE_SETTINGS,
  getStoredNews,
  getStoredSettings,
  saveStoredNews,
  saveStoredSettings,
  readFileAsDataUrl,
} from "../data/admin.js";

const ADMIN_PASSWORD = "ACUadmin2026";

const emptyItem = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  image: "",
  url: "",
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [newsItems, setNewsItems] = useState([]);
  const [draft, setDraft] = useState(emptyItem);
  const [editingIndex, setEditingIndex] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    setNewsItems(getStoredNews());
    setSettings(getStoredSettings());
  }, []);

  const canSubmit = useMemo(
    () => draft.title.trim() && draft.image.trim() && draft.url.trim(),
    [draft],
  );

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
    }
  }

  async function handleCreateNews(e) {
    e.preventDefault();
    if (!canSubmit) return;

    const cleanDraft = {
      ...draft,
      title: draft.title.trim(),
      image: draft.image.trim(),
      url: draft.url.trim(),
    };

    let nextItems;
    if (editingIndex !== null) {
      nextItems = newsItems.map((item, index) =>
        index === editingIndex ? cleanDraft : item,
      );
    } else {
      nextItems = [cleanDraft, ...newsItems];
    }

    setNewsItems(nextItems);
    saveStoredNews(nextItems);
    setDraft({ ...emptyItem, date: new Date().toISOString().slice(0, 10) });
    setEditingIndex(null);
  }

  async function handleNewsImageUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const result = await readFileAsDataUrl(file);
    setDraft((current) => ({ ...current, image: result }));
  }

  function handleDeleteNews(id) {
    const nextItems = newsItems.filter((_, index) => index !== id);
    setNewsItems(nextItems);
    saveStoredNews(nextItems);

    if (editingIndex === id) {
      setEditingIndex(null);
      setDraft({ ...emptyItem, date: new Date().toISOString().slice(0, 10) });
    }
  }

  function handleEditNews(item, index) {
    setDraft({ ...item });
    setEditingIndex(index);
  }

  function handleSaveSettings(e) {
    e.preventDefault();
    saveStoredSettings(settings);
  }

  function handleInputChange(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  if (!isAuthenticated) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 480 }}>
          <div className="value-card">
            <h2>Admin Login</h2>
            <p>Use the site admin password to manage uploads.</p>
            <form onSubmit={handleLogin} style={{ display: "grid", gap: 16 }}>
              <div className="form-row">
                <label htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-oxblood btn-block">
                Enter Dashboard
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-cream">
      <div className="container" style={{ display: "grid", gap: 28 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p className="eyebrow">Admin</p>
            <h2>Content Dashboard</h2>
          </div>
          <Link to="/" className="btn btn-navy btn-sm">
            Back to site
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gap: 28,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          <div className="value-card">
            <h3>Add news item</h3>
            <form
              onSubmit={handleCreateNews}
              style={{ display: "grid", gap: 14 }}
            >
              <div className="form-row">
                <label htmlFor="news-title">Title</label>
                <input
                  id="news-title"
                  type="text"
                  value={draft.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div className="form-row">
                <label htmlFor="news-date">Date</label>
                <input
                  id="news-date"
                  type="date"
                  value={draft.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>

              <div className="form-row">
                <label htmlFor="news-image">Upload news image</label>
                <input
                  id="news-image"
                  type="file"
                  accept="image/*"
                  onChange={handleNewsImageUpload}
                />
                {draft.image && (
                  <img
                    src={draft.image}
                    alt="News preview"
                    style={{
                      width: "100%",
                      maxHeight: 120,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                )}
                <input
                  type="url"
                  value={draft.image}
                  placeholder="Or paste image URL"
                  onChange={(e) => handleInputChange("image", e.target.value)}
                />
              </div>

              <div className="form-row">
                <label htmlFor="news-url">Read more URL</label>
                <input
                  id="news-url"
                  type="url"
                  value={draft.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-oxblood btn-block"
                disabled={!canSubmit}
              >
                {editingIndex !== null ? "Update news" : "Publish news"}
              </button>

              {editingIndex !== null && (
                <button
                  type="button"
                  className="btn btn-outline btn-block"
                  onClick={() => {
                    setDraft({
                      ...emptyItem,
                      date: new Date().toISOString().slice(0, 10),
                    });
                    setEditingIndex(null);
                  }}
                >
                  Cancel edit
                </button>
              )}
            </form>
          </div>

          <div className="value-card">
            <h3>Site hero images</h3>
            <form
              onSubmit={handleSaveSettings}
              style={{ display: "grid", gap: 14 }}
            >
              <div className="form-row">
                <label htmlFor="hero-1">Hero slide 1</label>
                <input
                  id="hero-1"
                  type="url"
                  value={settings.heroImage}
                  onChange={(e) =>
                    setSettings((current) => ({
                      ...current,
                      heroImage: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-row">
                <label htmlFor="hero-2">Hero slide 2</label>
                <input
                  id="hero-2"
                  type="url"
                  value={settings.heroImage2}
                  onChange={(e) =>
                    setSettings((current) => ({
                      ...current,
                      heroImage2: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-row">
                <label htmlFor="hero-3">Hero slide 3</label>
                <input
                  id="hero-3"
                  type="url"
                  value={settings.heroImage3}
                  onChange={(e) =>
                    setSettings((current) => ({
                      ...current,
                      heroImage3: e.target.value,
                    }))
                  }
                />
              </div>

              <button type="submit" className="btn btn-navy btn-block">
                Save hero settings
              </button>
            </form>
          </div>
        </div>

        <div className="value-card">
          <h3>Published news</h3>
          <div style={{ display: "grid", gap: 12 }}>
            {newsItems.length === 0 ? (
              <p>No news items yet.</p>
            ) : (
              newsItems.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "center",
                    borderBottom: "1px solid rgba(12,35,64,0.08)",
                    paddingBottom: 8,
                  }}
                >
                  <div>
                    <strong>{item.title}</strong>
                    <div style={{ fontSize: 12, color: "var(--ink-500)" }}>
                      {item.date}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={() => handleEditNews(item, index)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={() => handleDeleteNews(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";

export default function News() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => setItems(d.data || []))
      .catch(() => setItems([]));
  }, []);

  function deleteItem(id) {
    if (!confirm("Delete this news item?")) return;
    setItems(items.filter((i) => i.id !== id));
  }

  function toggleFeatured(id) {
    setItems(
      items.map((i) => (i.id === id ? { ...i, featured: !i.featured } : i)),
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <h2>News</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            placeholder="Search news..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: "1px solid #e6eef6" }}
          />
          <button className="btn">Add News</button>
        </div>
      </div>

      <Card>
        {items.filter((i) => i.title.toLowerCase().includes(q.toLowerCase()))
          .length === 0 ? (
          <div className="empty">No news found</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter((i) => i.title.toLowerCase().includes(q.toLowerCase()))
                .map((i) => (
                  <tr key={i.id}>
                    <td>
                      {i.title}
                      {i.featured && (
                        <span className="badge" style={{ marginLeft: 8 }}>
                          Featured
                        </span>
                      )}
                    </td>
                    <td>{i.category}</td>
                    <td>{i.author}</td>
                    <td className="small muted">{i.date}</td>
                    <td className="actions">
                      <button
                        className="btn secondary"
                        onClick={() => toggleFeatured(i.id)}
                      >
                        ★
                      </button>
                      <button
                        className="btn secondary"
                        onClick={() => setEditing(i)}
                      >
                        Edit
                      </button>
                      <button className="btn" onClick={() => deleteItem(i.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </Card>

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <h3>Edit News</h3>
          <div className="form-row">
            <label>Title</label>
            <input defaultValue={editing.title} />
          </div>
          <div className="form-row">
            <label>Content</label>
            <textarea defaultValue={editing.content} />
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="btn secondary" onClick={() => setEditing(null)}>
              Cancel
            </button>
            <button className="btn">Save</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

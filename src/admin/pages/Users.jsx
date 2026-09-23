import { useEffect, useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext.jsx";

export default function Users() {
  const { authGet, authSend } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const data = await authGet("/api/users");
      setUsers(Array.isArray(data && data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this user? This cannot be undone.")) return;
    try {
      await authSend(`/api/users/${id}`, "DELETE");
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  }

  async function saveUser(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const isEdit = editing && editing.id;
    const url = isEdit ? `/api/users/${editing.id}` : "/api/users";
    try {
      await authSend(url, isEdit ? "PUT" : "POST", data);
      setEditing(null);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  }

  const filtered = users.filter(
    (u) =>
      !q ||
      u.name.toLowerCase().includes(q.toLowerCase()) ||
      u.email.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div>
      <div className="page-head">
        <h2>Users &amp; Roles</h2>
        <div className="page-head-actions">
          <input
            className="search-input"
            placeholder="Search users..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="btn" onClick={() => setEditing({})}>
            Add Admin
          </button>
        </div>
      </div>

      <Card>
        {loading ? (
          <div className="empty">Loading users…</div>
        ) : error ? (
          <div className="empty">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="empty">No users found</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role?.name || "—"}</td>
                  <td className="small muted">{u.status}</td>
                  <td className="actions">
                    <button className="btn secondary" onClick={() => setEditing(u)}>
                      Edit
                    </button>
                    <button className="btn" onClick={() => handleDelete(u.id)}>
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
          <h3>{editing.id ? "Edit Admin" : "Create Admin"}</h3>
          <form onSubmit={saveUser}>
            <div className="form-row">
              <label>Name</label>
              <input name="name" defaultValue={editing.name || ""} required />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input
                name="email"
                type="email"
                defaultValue={editing.email || ""}
                required
              />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder={editing.id ? "Leave blank to keep current" : ""}
              />
            </div>
            <div className="form-row">
              <label>Role ID</label>
              <input
                name="roleId"
                defaultValue={editing.role?.id || ""}
                placeholder="Role ID (use seed roles)"
              />
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="btn secondary"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button className="btn" type="submit">
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

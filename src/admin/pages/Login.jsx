import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import "../admin.css";

export default function Login() {
  const { login, sessionExpired } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(username.trim(), password);
    } catch (err) {
      setError(err.message || "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <p className="eyebrow">ACU Admin</p>
        <h1>Sign in</h1>
        <p className="muted small" style={{ marginBottom: 18 }}>
          Manage news, events, faculties and site content.
        </p>

        {sessionExpired && !error && (
          <div className="login-notice">
            Your session has expired. Please sign in again.
          </div>
        )}

        {error && <div className="login-error">{error}</div>}

        <div className="form-row">
          <label htmlFor="login-username">Username</label>
          <input
            id="login-username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span className="field-help">
            Your username, or the email address on your account.
          </span>
        </div>

        <div className="form-row">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-block" type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { apiGet, apiSend, apiUpload, apiClientUpload } from "../../lib/api.js";
import { clearSession, getToken, getUser, setSession } from "../lib/auth.js";

const AuthContext = createContext(null);

const AUTH_ERROR_RE = /not authenticated|invalid token|401/i;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(() => getUser());
  const [sessionExpired, setSessionExpired] = useState(false);

  const logout = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
    setSessionExpired(false);
  }, []);

  // The server rejected our token. Drop the session and flag why, so the login
  // screen can explain itself instead of leaving a dead session in place.
  const endExpiredSession = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
    setSessionExpired(true);
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await apiSend("/api/auth/login", "POST", { email, password });
    setSession(res.token, res.user);
    setToken(res.token);
    setUser(res.user);
    setSessionExpired(false);
    return res.user;
  }, []);

  // Every authenticated request goes through here: falls back to the stored
  // token if the React state is empty, and signs the user out on a 401.
  const runAuthed = useCallback(
    async (request) => {
      const active = token || getToken();
      try {
        return await request(active);
      } catch (error) {
        if (AUTH_ERROR_RE.test(error.message)) endExpiredSession();
        throw error;
      }
    },
    [token, endExpiredSession],
  );

  const authGet = useCallback(
    (path) => runAuthed((active) => apiGet(path, { token: active })),
    [runAuthed],
  );

  const authSend = useCallback(
    (path, method, body) =>
      runAuthed((active) => apiSend(path, method, body, { token: active })),
    [runAuthed],
  );

  const authUpload = useCallback(
    (path, file) => runAuthed((active) => apiUpload(path, file, { token: active })),
    [runAuthed],
  );

  // Direct-to-Blob upload; the file bypasses the API entirely. Used in
  // preference to authUpload so large files clear the serverless body limit.
  const authClientUpload = useCallback(
    (path, file, kind) =>
      runAuthed((active) => apiClientUpload(path, file, { token: active, kind })),
    [runAuthed],
  );

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthed: Boolean(token),
      sessionExpired,
      login,
      logout,
      authGet,
      authSend,
      authUpload,
      authClientUpload,
    }),
    [
      token,
      user,
      sessionExpired,
      login,
      logout,
      authGet,
      authSend,
      authUpload,
      authClientUpload,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

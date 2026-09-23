import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { apiGet, apiSend } from "../../lib/api.js";
import { clearSession, getToken, getUser, setSession } from "../lib/auth.js";

const AuthContext = createContext(null);

const AUTH_ERROR_RE = /not authenticated|invalid token|401/i;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(() => getUser());

  const logout = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await apiSend("/api/auth/login", "POST", { email, password });
    setSession(res.token, res.user);
    setToken(res.token);
    setUser(res.user);
    return res.user;
  }, []);

  const authGet = useCallback(
    async (path) => {
      const active = token || getToken();
      try {
        return await apiGet(path, { token: active });
      } catch (error) {
        if (AUTH_ERROR_RE.test(error.message)) logout();
        throw error;
      }
    },
    [token, logout],
  );

  const authSend = useCallback(
    async (path, method, body) => {
      const active = token || getToken();
      try {
        return await apiSend(path, method, body, { token: active });
      } catch (error) {
        if (AUTH_ERROR_RE.test(error.message)) logout();
        throw error;
      }
    },
    [token, logout],
  );

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthed: Boolean(token),
      login,
      logout,
      authGet,
      authSend,
    }),
    [token, user, login, logout, authGet, authSend],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

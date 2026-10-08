// Student session for the hostel portal.
//
// Kept separate from the admin AuthContext: students sign in against
// /api/hostel/auth/* with their own token and their own storage keys, so the
// two sessions can coexist in one browser without clobbering each other.

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { apiGet, apiSend } from "../lib/api.js";

const TOKEN_KEY = "acu_hostel_token";
const STUDENT_KEY = "acu_hostel_student";

const AUTH_ERROR_RE = /not authenticated|invalid token|disabled|401|403/i;

function readToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function readStudent() {
  try {
    const raw = localStorage.getItem(STUDENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(token, student) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(STUDENT_KEY, JSON.stringify(student || {}));
  } catch {
    /* storage unavailable */
  }
}

function clearStored() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(STUDENT_KEY);
  } catch {
    /* storage unavailable */
  }
}

const HostelAuthContext = createContext(null);

export function HostelAuthProvider({ children }) {
  const [token, setToken] = useState(readToken);
  const [student, setStudent] = useState(readStudent);

  const applySession = useCallback((res) => {
    saveSession(res.token, res.student);
    setToken(res.token);
    setStudent(res.student);
    return res.student;
  }, []);

  const login = useCallback(
    async (identifier, password) => {
      const res = await apiSend("/api/hostel/auth/login", "POST", {
        email: identifier,
        password,
      });
      return applySession(res);
    },
    [applySession],
  );

  const register = useCallback(
    async (payload) => {
      const res = await apiSend("/api/hostel/auth/register", "POST", payload);
      return applySession(res);
    },
    [applySession],
  );

  const logout = useCallback(() => {
    clearStored();
    setToken(null);
    setStudent(null);
  }, []);

  // Any authenticated call that comes back unauthorised means the session is
  // dead, so clear it rather than leaving a broken token behind.
  const runAuthed = useCallback(
    async (request) => {
      const active = token || readToken();
      try {
        return await request(active);
      } catch (error) {
        if (AUTH_ERROR_RE.test(error.message)) logout();
        throw error;
      }
    },
    [token, logout],
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

  const value = useMemo(
    () => ({
      token,
      student,
      isAuthed: Boolean(token),
      login,
      register,
      logout,
      authGet,
      authSend,
    }),
    [token, student, login, register, logout, authGet, authSend],
  );

  return (
    <HostelAuthContext.Provider value={value}>
      {children}
    </HostelAuthContext.Provider>
  );
}

export function useHostelAuth() {
  return useContext(HostelAuthContext);
}

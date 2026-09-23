import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ResourcePage from "./components/ResourcePage";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { RESOURCES } from "./schema/resources.js";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import "./admin.css";

function AdminShell() {
  const { isAuthed } = useAuth();
  const location = useLocation();

  if (!isAuthed) return <Login />;

  const page =
    (location.pathname || "/admin").replace(/^\/admin\/?/, "") || "dashboard";

  let content = <Dashboard />;
  if (page === "news") content = <ResourcePage key="news" resource={RESOURCES.news} />;
  else if (page === "events")
    content = <ResourcePage key="events" resource={RESOURCES.events} />;
  else if (page === "principal-officers")
    content = <ResourcePage key="officers" resource={RESOURCES.principalOfficers} />;
  else if (page === "faculties")
    content = <ResourcePage key="faculties" resource={RESOURCES.faculties} />;
  else if (page === "gallery")
    content = <ResourcePage key="gallery" resource={RESOURCES.gallery} />;
  else if (page === "settings") content = <Settings />;
  else if (page === "users") content = <Users />;

  return (
    <div className="admin-shell">
      <Sidebar />
      <Topbar />
      <main className="admin-content">{content}</main>
    </div>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminShell />
    </AuthProvider>
  );
}

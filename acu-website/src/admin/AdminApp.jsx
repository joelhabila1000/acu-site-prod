import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import Users from "./pages/Users";
import "./admin.css";

export default function AdminApp() {
  const location = useLocation();
  const pathname = location.pathname || "/admin";
  const page = pathname.replace(/^\/admin\/?/, "") || "dashboard";

  let content = <Dashboard />;
  if (page === "news") content = <News />;
  if (page === "users") content = <Users />;
  if (page === "pages") content = <div>Pages coming soon</div>;

  return (
    <div className="admin-shell">
      <Sidebar />
      <Topbar />
      <main className="admin-content">{content}</main>
    </div>
  );
}

import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Academics from "./pages/Academics.jsx";
import FacultyPage from "./pages/FacultyPage.jsx";
import Admissions from "./pages/Admissions.jsx";
import Contact from "./pages/Contact.jsx";
import PostgraduatePortal from "./pages/PostgraduatePortal.jsx";
import Admin from "./admin/AdminApp.jsx";
import Maintenance from "./pages/Maintenance.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <Admin />;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/faculties/:slug" element={<FacultyPage />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route
            path="/portal/postgraduate/*"
            element={<PostgraduatePortal />}
          />
          <Route path="/portal/:portal" element={<Maintenance />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

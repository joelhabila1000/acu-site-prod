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
import PrincipalOfficers from "./pages/PrincipalOfficers.jsx";
import AboutDetail from "./pages/AboutDetail.jsx";
import PostgraduatePortal from "./pages/PostgraduatePortal.jsx";
import Admin from "./admin/AdminApp.jsx";
import Maintenance from "./pages/Maintenance.jsx";
import NotFound from "./pages/NotFound.jsx";
import Listofcourses from "./pages/ListOfCourses.jsx";
import BackToTop from "./components/BackToTop.jsx";
import NewsEventsPage from "./pages/NewsEventsPage.jsx";
import Gallery from "./pages/Gallery.jsx";
import PrincipalOfficerDetail from "./pages/PrincipalOfficerDetail";

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
          <Route path="/about/principal-officers" element={<PrincipalOfficers />} />
          <Route path="/about/:page" element={<AboutDetailRoute />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/faculties/:slug" element={<FacultyPage />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/listofcourses" element={<Listofcourses />} />
          <Route
            path="/portal/postgraduate/*"
            element={<PostgraduatePortal />}
          />
          <Route path="/portal/:portal" element={<Maintenance />} />
          <Route path="/news" element={<NewsEventsPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/principal-officers/:slug"
            element={<PrincipalOfficerDetail />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BackToTop />

      <Footer />
    </>
  );
}

function AboutDetailRoute() {
  const location = useLocation();
  return <AboutDetail page={location.pathname.split("/").pop()} />;
}

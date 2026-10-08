import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import Footer from "./components/Footer.jsx";
import Preloader from "./components/Preloader.jsx";
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
import NewsArticle from "./pages/NewsArticle.jsx";
import Gallery from "./pages/Gallery.jsx";
import Sustainability from "./pages/Sustainability.jsx";
import Directory from "./pages/Directory.jsx";
import StaffDirectory from "./pages/StaffDirectory.jsx";
import PrincipalOfficerDetail from "./pages/PrincipalOfficerDetail.jsx";
import InauguralLectures from "./pages/InauguralLectures.jsx";
import SectionPage from "./pages/SectionPage.jsx";
import Publications from "./pages/Publications.jsx";
import Library from "./pages/Library.jsx";
import { useRefreshContent } from "./data/cms.js";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const refreshContent = useRefreshContent();
  const wasAdminRoute = useRef(isAdminRoute);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const finishLoading = () => {
      if (!isMounted) return;
      setIsLoading(false);
      document.body.style.overflow = "";
    };

    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(finishLoading, 1400);

    return () => {
      isMounted = false;
      document.body.style.overflow = "";
      window.clearTimeout(timer);
    };
  }, []);

  // CMS content is pulled once per page load, so edits made in the admin would
  // otherwise not show until a hard refresh. Re-pull when the editor leaves the
  // admin for the public site.
  useEffect(() => {
    if (wasAdminRoute.current && !isAdminRoute) refreshContent();
    wasAdminRoute.current = isAdminRoute;
  }, [isAdminRoute, refreshContent]);

  if (isAdminRoute) {
    return <Admin />;
  }

  return (
    <>
      <Preloader active={isLoading} />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar />
      <AnnouncementBar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/principal-officers" element={<PrincipalOfficers />} />
          <Route path="/about/:page" element={<AboutDetailRoute />} />
          <Route path="/academics" element={<Academics />} />
          <Route
            path="/academics/inaugural-lectures"
            element={<InauguralLectures />}
          />
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
          {/* Section pages must precede /news/:slug or they'd be read as articles */}
          <Route path="/admissions/:page" element={<SectionPage />} />
          <Route path="/resources" element={<SectionPage />} />
          <Route path="/resources/library" element={<Library />} />
          <Route path="/directory/library" element={<Library />} />
          <Route path="/resources/:page" element={<SectionPage />} />
          <Route path="/student-life" element={<SectionPage />} />
          <Route path="/student-life/:page" element={<SectionPage />} />
          <Route path="/research" element={<SectionPage />} />
          <Route path="/research/publications" element={<Publications />} />
          <Route path="/research/:page" element={<SectionPage />} />
          <Route path="/news/events" element={<SectionPage />} />
          <Route path="/news/press-releases" element={<SectionPage />} />
          <Route path="/news/convocation" element={<SectionPage />} />
          <Route path="/news/:slug" element={<NewsArticle />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/directory/staff" element={<StaffDirectory />} />
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

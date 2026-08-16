import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Academics from "./pages/Academics.jsx";
import Admissions from "./pages/Admissions.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";
import Maintenance from "./pages/Maintenance.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  useEffect(() => {
    function handleLinkClick(event) {
      const anchor = event.target.closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (!href) return;

      const isInternalFragment = href.startsWith("#");
      const isRelativeOrAppPath =
        href.startsWith("/") ||
        href.startsWith("./") ||
        href.startsWith("../") ||
        href.startsWith("?");
      const isNonBrowserProtocol =
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:");

      if (isInternalFragment || isRelativeOrAppPath || isNonBrowserProtocol) {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.href);
        const isExternalHttpLink =
          (targetUrl.protocol === "http:" || targetUrl.protocol === "https:") &&
          targetUrl.origin !== window.location.origin;

        if (isExternalHttpLink) {
          event.preventDefault();
          event.stopPropagation();
        }
      } catch {
        // Ignore malformed URLs and keep default browser behavior.
      }
    }

    document.addEventListener("click", handleLinkClick, true);

    return () => {
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, []);

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
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/portal/:portal" element={<Maintenance />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

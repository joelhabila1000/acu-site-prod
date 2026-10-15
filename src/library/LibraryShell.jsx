import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSite, useLibraryBranches, useLibrarySettings } from "../data/cms.js";
import { LIBRARY_NAV, libraryPath } from "../data/library.js";
import "./library.css";

function isActive(pathname, base, path) {
  const full = base + path;
  if (!path) return pathname === base || pathname === `${base}/`;
  return pathname === full || pathname.startsWith(`${full}/`);
}

export default function LibraryShell({ base, children }) {
  const { site } = useSite();
  const settings = useLibrarySettings();
  const branches = useLibraryBranches() || [];
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const home = libraryPath(base, "");
  const mainCouncil = site.shortName || site.name;

  // The library owns its own document title (the shared RouteMeta table is an
  // exact match and would clash with the main site's "/" and "/catalogue").
  // Detail pages set a more specific title in their own effect, so skip those.
  useEffect(() => {
    if (/\/(catalogue|repository)\/[^/]+$/.test(location.pathname)) return;
    const item = LIBRARY_NAV.find((nav) => isActive(location.pathname, base, nav.path));
    const prefix = item && item.label !== "Home" ? `${item.label} · ` : "";
    document.title = `${prefix}ACU University Library | ${mainCouncil}`;
  }, [location.pathname, base, mainCouncil]);

  return (
    <div className="library-app">
      <a href="#library-main" className="lib-skip">
        Skip to main content
      </a>

      <div className="lib-topbar">
        <div className="lib-container lib-topbar-inner">
          <span>
            <a href={`mailto:${settings.enquiryEmail}`}>{settings.enquiryEmail}</a>
            {site.phone ? (
              <>
                {" · "}
                <a href={`tel:${String(site.phone).replace(/\s/g, "")}`}>
                  {site.phone}
                </a>
              </>
            ) : null}
          </span>
          <span className="lib-topbar-links">
            <a href={site.applyUrl || "https://apply.acu.edu.ng"} target="_blank" rel="noopener noreferrer">
              University home
            </a>
            <Link to={libraryPath(base, "/contact")}>Ask a librarian</Link>
          </span>
        </div>
      </div>

      <header className="lib-header">
        <div className="lib-container lib-header-inner">
          <Link to={home} className="lib-brand" onClick={() => setOpen(false)}>
            <img
              className="lib-brand-crest"
              src={site.logo}
              alt={`${mainCouncil} crest`}
              width="46"
              height="46"
            />
            <span className="lib-brand-text">
              <strong>ACU Library</strong>
              <em>{mainCouncil}</em>
            </span>
          </Link>

          <nav className={`lib-nav ${open ? "is-open" : ""}`} aria-label="Library">
            <ul className="lib-nav-list">
              {LIBRARY_NAV.map((item) => (
                <li key={item.path || "home"}>
                  <Link
                    to={libraryPath(base, item.path)}
                    className={`lib-nav-link ${
                      isActive(location.pathname, base, item.path) ? "is-active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="lib-nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="library-main">{children}</main>

      <footer className="lib-footer">
        <div className="lib-container">
          <div className="lib-footer-grid">
            <div>
              <h3>ACU University Library</h3>
              <p style={{ color: "rgba(237, 235, 220, 0.78)", fontSize: "0.9rem", maxWidth: 320 }}>
                {settings.intro}
              </p>
            </div>
            <div>
              <h3>Explore</h3>
              <ul className="lib-footer-list">
                {LIBRARY_NAV.slice(1).map((item) => (
                  <li key={item.path}>
                    <Link to={libraryPath(base, item.path)}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Branches</h3>
              <ul className="lib-footer-list">
                {branches.length ? (
                  branches.map((branch) => (
                    <li key={branch.id}>
                      <Link to={libraryPath(base, "/about")}>{branch.name}</Link>
                    </li>
                  ))
                ) : (
                  <li>University Main Library</li>
                )}
              </ul>
            </div>
          </div>
          <div className="lib-footer-bottom">
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
            <span>
              <a href={`mailto:${settings.enquiryEmail}`}>{settings.enquiryEmail}</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

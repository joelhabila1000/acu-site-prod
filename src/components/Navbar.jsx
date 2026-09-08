import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SITE, NAV_LINKS, PORTALS } from "../data/content.js";
import "./Navbar.css";

function hasChildren(item) {
  return Array.isArray(item.children) && item.children.length > 0;
}

function DesktopMenuItems({ items }) {
  return items.map((item) => {
    if (!hasChildren(item)) {
      return (
        <NavLink
          key={`${item.label}-${item.path}`}
          to={item.path}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {item.label}
        </NavLink>
      );
    }

    return (
      <div key={`${item.label}-${item.path}`} className="nav-submenu-item">
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `nav-submenu-toggle ${isActive ? "is-open" : ""}`
          }
        >
          {item.label}
          <span aria-hidden="true">›</span>
        </NavLink>
        <div className="nav-submenu-menu">
          <DesktopMenuItems items={item.children} />
        </div>
      </div>
    );
  });
}

function DesktopMegaMenu({ columns }) {
  return (
    <div className="nav-mega-menu">
      {columns.map((column) => (
        <div key={column.heading} className="nav-mega-column">
          <h3>{column.heading}</h3>
          {column.items.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-contact">
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            <span className="dot" aria-hidden="true">
              •
            </span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <nav
            className="topbar-portals"
            aria-label="Student and staff portals"
          >
            {PORTALS.map((p) =>
              p.url && p.url.startsWith("/") ? (
                <NavLink key={p.label} to={p.url}>
                  {p.label}
                </NavLink>
              ) : (
                <a
                  key={p.label}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.label}
                </a>
              ),
            )}
          </nav>
        </div>
      </div>

      <div className="container navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <img
            src={SITE.logo}
            alt={`${SITE.name} crest`}
            width="48"
            height="48"
            loading="lazy"
          />
          <span className="brand-text">
            <strong>{SITE.name}</strong>
            <em>{SITE.tagline}</em>
          </span>
        </NavLink>

        <nav className="primary-nav" aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => {
              const hasChildren = Array.isArray(link.children) && link.children.length > 0;

              if (!hasChildren) {
                return (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => (isActive ? "active" : "")}
                      end={link.path === "/"}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                );
              }

              return (
                <li key={link.path} className="nav-dropdown">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-dropdown-toggle ${isActive ? "is-open" : ""}`
                    }
                    end={link.path === "/"}
                  >
                    {link.label}
                    <span aria-hidden="true">▾</span>
                  </NavLink>

                  {link.megaMenu ? (
                    <DesktopMegaMenu columns={link.megaMenu} />
                  ) : (
                    <div className="nav-dropdown-menu">
                      <DesktopMenuItems items={link.children} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="navbar-actions">
          <a
            href={SITE.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-oxblood btn-sm"
          >
            Apply Now
          </a>
          <button
            className={`menu-toggle ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`}>
        <ul>
          {NAV_LINKS.map((link) => {
            if (hasChildren(link)) {
              return (
                <li key={link.path}>
                  <div className="mobile-dropdown-group">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                    <div className="mobile-submenu">
                      {link.children.map((child) => (
                        <div key={`${child.label}-${child.path}`} className="mobile-submenu-group">
                          <NavLink
                            to={child.path}
                            className={({ isActive }) => (isActive ? "active" : "")}
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </NavLink>
                          {hasChildren(child) && (
                            <div className="mobile-submenu nested">
                              {child.children.map((grandchild) => (
                                <NavLink
                                  key={`${grandchild.label}-${grandchild.path}`}
                                  to={grandchild.path}
                                  className={({ isActive }) => (isActive ? "active" : "")}
                                  onClick={() => setOpen(false)}
                                >
                                  {grandchild.label}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => setOpen(false)}
                  end={link.path === "/"}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="mobile-portals">
          {PORTALS.map((p) =>
            p.url && p.url.startsWith("/") ? (
              <NavLink key={p.label} to={p.url} onClick={() => setOpen(false)}>
                {p.label} Portal
              </NavLink>
            ) : (
              <a
                key={p.label}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.label} Portal
              </a>
            ),
          )}
        </div>
        <a
          href={SITE.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-oxblood btn-block"
          onClick={() => setOpen(false)}
        >
          Apply for Admission
        </a>
      </div>
    </header>
  );
}

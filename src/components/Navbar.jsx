import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSite } from "../data/cms.js";
import "./Navbar.css";

function hasChildren(item) {
  return (
    (Array.isArray(item.children) && item.children.length > 0) ||
    (Array.isArray(item.megaMenu) && item.megaMenu.length > 0)
  );
}

// Menu entries may point off-site (student portals). Those need a plain anchor
// rather than a router link, which would treat them as an internal path.
function isExternal(path) {
  return /^https?:\/\//i.test(path || "");
}

function DesktopMegaMenu({ columns }) {
  return (
    <div className="nav-mega-menu">
      {columns.map((column) => (
        <div key={column.heading} className="nav-mega-column">
          <h3>{column.heading}</h3>
          {column.items.map((item) =>
            isExternal(item.path) ? (
              <a
                key={`${item.label}-${item.path}`}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
                <span className="nav-external" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : (
              <NavLink
                key={`${item.label}-${item.path}`}
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </div>
      ))}
    </div>
  );
}

// Children of a dropdown: internal ones route, off-site ones open in a tab.
function DesktopChildren({ items, onNavigate }) {
  return items.map((item) =>
    isExternal(item.path) ? (
      <a
        key={`${item.label}-${item.path}`}
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {item.label}
        <span className="nav-external" aria-hidden="true">
          ↗
        </span>
      </a>
    ) : (
      <NavLink
        key={`${item.label}-${item.path}`}
        to={item.path}
        className={({ isActive }) => (isActive ? "active" : "")}
        onClick={onNavigate}
      >
        {item.label}
      </NavLink>
    ),
  );
}

// One row in the mobile menu — off-site entries open in a new tab, internal
// ones close the menu and route.
function MobileChild({ item, onNavigate }) {
  return isExternal(item.path) ? (
    <a
      href={item.path}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
    >
      {item.label}
    </a>
  ) : (
    <NavLink
      to={item.path}
      className={({ isActive }) => (isActive ? "active" : "")}
      onClick={onNavigate}
    >
      {item.label}
    </NavLink>
  );
}

export default function Navbar() {
  const { site, nav, portals } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Only used by the non-clickable grouping headings (e.g. Student Services),
  // so touch and keyboard users can open the menu without hovering.
  const [openGroup, setOpenGroup] = useState(null);

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
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            <span className="dot" aria-hidden="true">
              •
            </span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <nav
            className="topbar-portals"
            aria-label="Student and staff portals"
          >
            {portals.map((p) =>
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
            src={site.logo}
            alt={`${site.name} crest`}
            width="48"
            height="48"
            loading="lazy"
          />
          <span className="brand-text">
            <strong>{site.name}</strong>
            <em>{site.tagline}</em>
          </span>
        </NavLink>

        <nav className="primary-nav" aria-label="Primary">
          <ul>
            {nav.map((link) => {
              const children = hasChildren(link);
              const isGroupLabel = children && !link.path;

              if (!children) {
                return (
                  <li key={link.path || link.label}>
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

              const menuOpen = openGroup === link.label;

              return (
                <li
                  key={link.path || link.label}
                  className={`nav-dropdown ${
                    link.highlight ? "nav-dropdown--cta" : ""
                  } ${menuOpen ? "is-open" : ""}`}
                >
                  {isGroupLabel ? (
                    <button
                      type="button"
                      className="nav-dropdown-toggle"
                      aria-expanded={menuOpen}
                      onClick={() =>
                        setOpenGroup((current) =>
                          current === link.label ? null : link.label,
                        )
                      }
                    >
                      {link.label}
                      <span aria-hidden="true">▾</span>
                    </button>
                  ) : (
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
                  )}

                  {link.megaMenu ? (
                    <DesktopMegaMenu columns={link.megaMenu} />
                  ) : (
                    <div className="nav-dropdown-menu">
                      <DesktopChildren
                        items={link.children}
                        onNavigate={() => setOpenGroup(null)}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="navbar-actions">
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
          {nav.map((link) => {
            if (hasChildren(link)) {
              const isGroupLabel = !link.path;
              return (
                <li key={link.path || link.label}>
                  <div
                    className={`mobile-dropdown-group ${
                      link.highlight ? "mobile-cta" : ""
                    }`}
                  >
                    {isGroupLabel ? (
                      <span className="mobile-group-label">{link.label}</span>
                    ) : (
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          isActive ? "active" : ""
                        }
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </NavLink>
                    )}
                    {link.megaMenu ? (
                      <div className="mobile-submenu mobile-mega">
                        {link.megaMenu.map((column) => (
                          <div
                            key={column.heading}
                            className="mobile-mega-column"
                          >
                            <span className="mobile-mega-heading">
                              {column.heading}
                            </span>
                            {column.items.map((child) => (
                              <MobileChild
                                key={`${child.label}-${child.path}`}
                                item={child}
                                onNavigate={() => setOpen(false)}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mobile-submenu">
                        {link.children.map((child) => (
                          <MobileChild
                            key={`${child.label}-${child.path}`}
                            item={child}
                            onNavigate={() => setOpen(false)}
                          />
                        ))}
                      </div>
                    )}
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
          {portals.map((p) =>
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
          href={site.applyUrl}
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

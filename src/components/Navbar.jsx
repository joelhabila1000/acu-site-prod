import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSite } from "../data/cms.js";
import "./Navbar.css";

function hasChildren(item) {
  return Array.isArray(item.children) && item.children.length > 0;
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

// A single mobile drawer entry: off-site links open in a new tab, everything
// else routes and closes the drawer on tap.
function MobileNavLink({ item, onNavigate }) {
  if (isExternal(item.path)) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {item.label}
      </a>
    );
  }
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => (isActive ? "active" : "")}
      onClick={onNavigate}
      end={item.path === "/"}
    >
      {item.label}
    </NavLink>
  );
}

// A stacked list of items for the mobile drawer. Recurses into nested children
// so every level the desktop menu shows is also reachable on a phone.
function MobileChildren({ items, onNavigate }) {
  return (
    <div className="mobile-submenu">
      {items.map((item) => {
        if (!hasChildren(item)) {
          return (
            <MobileNavLink
              key={item.path || item.label}
              item={item}
              onNavigate={onNavigate}
            />
          );
        }
        return (
          <div key={item.path || item.label}>
            <span className="mobile-group-label">{item.label}</span>
            <MobileChildren items={item.children} onNavigate={onNavigate} />
          </div>
        );
      })}
    </div>
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
            {nav.map((link, index) => {
              const children = hasChildren(link);
              const isGroupLabel = children && !link.path;
              // Menus near the right edge open leftwards so they stay on screen.
              const alignRight = index >= nav.length - 2;

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
                  className={`nav-dropdown ${alignRight ? "nav-dropdown--right" : ""} ${
                    menuOpen ? "is-open" : ""
                  }`}
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
          <a
            href={site.applyUrl}
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
          {nav.map((link) => {
            const children = hasChildren(link);
            const megaMenu =
              Array.isArray(link.megaMenu) && link.megaMenu.length > 0;

            if (!children && !megaMenu) {
              return (
                <li key={link.path || link.label}>
                  <MobileNavLink
                    item={link}
                    onNavigate={() => setOpen(false)}
                  />
                </li>
              );
            }

            return (
              <li
                key={link.path || link.label}
                className="mobile-dropdown-group"
              >
                {link.path ? (
                  <MobileNavLink
                    item={link}
                    onNavigate={() => setOpen(false)}
                  />
                ) : (
                  <span className="mobile-group-label">{link.label}</span>
                )}
                {megaMenu ? (
                  link.megaMenu.map((column) => (
                    <div key={column.heading}>
                      <span className="mobile-group-label">
                        {column.heading}
                      </span>
                      <MobileChildren
                        items={column.items}
                        onNavigate={() => setOpen(false)}
                      />
                    </div>
                  ))
                ) : (
                  <MobileChildren
                    items={link.children}
                    onNavigate={() => setOpen(false)}
                  />
                )}
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

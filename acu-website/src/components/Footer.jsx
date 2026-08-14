import { Link } from "react-router-dom";
import { SITE, FACULTIES } from "../data/content.js";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <img
              src={SITE.logo}
              alt={`${SITE.name} crest`}
              width="52"
              height="52"
              loading="lazy"
            />
            <div>
              <strong>{SITE.name}</strong>
              <span>
                {SITE.motto} {SITE.mottoMeaning}
              </span>
            </div>
          </div>
          <p>
            A faith-based Anglican university raising Godly intellectuals who
            become agents of positive change in their environment, the nation,
            and the world.
          </p>
          <div className="footer-social">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href={SITE.social.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              X
            </a>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href={SITE.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              YouTube
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li>
              <Link to="/about">About ACU</Link>
            </li>
            <li>
              <Link to="/academics">Academics</Link>
            </li>
            <li>
              <Link to="/admissions">Admissions</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Faculties</h4>
          <ul>
            {FACULTIES.slice(0, 6).map((f) => (
              <li key={f.name}>
                <a href={f.url} target="_blank" rel="noopener noreferrer">
                  {f.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <address>
            {SITE.address}
            <br />
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            <br />
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © {year} {SITE.name}, Oyo. All rights reserved.
          </p>
          <p className="footer-note">
            Concept redesign for demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}

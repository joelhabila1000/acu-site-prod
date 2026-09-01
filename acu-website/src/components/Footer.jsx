import { Link } from "react-router-dom";
import { SITE } from "../data/content.js";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-brand-panel">
          <div className="footer-brand-lockup">
            <img
              src={SITE.logo}
              alt={`${SITE.name} crest`}
              width="78"
              height="78"
              loading="lazy"
            />
            <div className="brand-text-stack">
              <strong>{SITE.name}</strong>
              <span>{SITE.tagline}</span>
            </div>
          </div>

          <div className="footer-address-block">
            <p>Ajayi Crowther University</p>
            <p>PMB 1066, Oyo Town</p>
            <p>Oyo State, Nigeria</p>
            <p>{SITE.phone}</p>
          </div>
        </div>

        <div className="footer-main-panel">
          <div className="footer-search">
            <input
              type="text"
              placeholder="Search ACU"
              aria-label="Search ACU"
            />
            <button type="button" aria-label="Search">
              ⌕
            </button>
          </div>

          <div className="footer-actions">
            <Link to="/admissions" className="action-card">
              Apply
            </Link>
            <a
              href="https://maps.google.com/?q=Ajayi+Crowther+University+Oyo"
              className="action-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit
            </a>
            <a href="mailto:info@acu.edu.ng" className="action-card">
              Contact Admissions
            </a>
          </div>

          <div className="footer-links-wrap">
            <div className="footer-links-col">
              <a href="/contact">Contact Us</a>
              <a href="/admissions">Employment</a>
              <a href="/about">Offices &amp; Centers</a>
            </div>
            <div className="footer-links-col">
              <a href="/about">Emergency Information</a>
              <a href="/news">News &amp; Events</a>
              <a href="/contact">Website Feedback</a>
            </div>
          </div>

          <div className="footer-meta-row">
            <p>
              Ajayi Crowther University does not discriminate on the basis of
              race, color, national and ethnic origin in its educational
              policies, admissions policies, scholarships, loan programs,
              athletic and other programs. Read Nondiscrimination Policy.
            </p>

            <div className="footer-social-row" aria-label="Social media links">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                ◎
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href={SITE.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                ▶
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <div className="bottom-links">
            <a href="/privacy">Website Policies</a>
            <span>|</span>
            <a href="/privacy">Privacy Statement</a>
            <span>|</span>
            <a href="/contact">Site by: ACU Standard</a>
          </div>
          <p>
            © {year} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

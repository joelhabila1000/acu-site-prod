
import { Link } from "react-router-dom";
import { useSite } from "../data/cms.js";
import "./Footer.css";

const SOCIALS = [
  {
    platform: "facebook",
    label: "Facebook",
    path: "M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V3.6c-.8-.1-1.7-.2-2.6-.2-2.6 0-4.4 1.6-4.4 4.5v2H7v3.1h3v8h3.5z",
  },
  {
    platform: "instagram",
    label: "Instagram",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.36 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.58V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z",
  },
  {
    platform: "x",
    label: "X",
    path: "M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.43L5.55 22H2.4l7.25-8.29L1.8 2h6.4l4.43 6.77L18.9 2zm-1.1 18h1.73L7.28 3.89H5.42L17.8 20z",
  },
  {
    platform: "youtube",
    label: "YouTube",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    path: "M19.6 6.2a5.7 5.7 0 0 1-3.5-1.2V15a6.4 6.4 0 1 1-5.5-6.3v3.5a2.9 2.9 0 1 0 2 2.8V2h3.5a5.8 5.8 0 0 0 3.5 3.3v.9z",
  },
];

export default function Footer() {
  const { site } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-brand-panel">
          <div className="footer-brand-lockup">
            <img
              src={site.logo}
              alt={`${site.name} crest`}
              width="78"
              height="78"
              loading="lazy"
            />
            <div className="brand-text-stack">
              <strong>{site.name}</strong>
              <span>{site.tagline}</span>
            </div>
          </div>

          <div className="footer-address-block">
            <p>Ajayi Crowther University</p>
            <p>PMB 1066, Oyo Town</p>
            <p>Oyo State, Nigeria</p>
            <p>{site.phone}</p>
          </div>
        </div>

        <div className="footer-main-panel">
          {/* <div className="footer-search">
            <input
              type="text"
              placeholder="Search ACU"
              aria-label="Search ACU"
            />
            <button type="button" aria-label="Search">
              ⌕
            </button>
            
          </div> */}

          {/* <div className="footer-actions">
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
          </div> */}

          <div className="footer-links-wrap">
            <div className="footer-links-col">
              <h1><span style={{ color: "white" }}>Quick Links</span></h1>
              <a href="/contact">Contact Us</a>
              <a href="/admissions">Admissions</a>
              <a href="/academics">Academics </a>
              <Link to="/news">News &amp; Events</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/">Staff Directory</Link>
              <Link to="/library">Library</Link>
      
            </div>
            <div className="footer-links-col">
              <h1><span style={{ color: "white" }}>Portals</span></h1>
              <Link to="apply.acu.edu.ng">Apply</Link>
              <Link to="portal.acu.edu.ng">Undergraduate</Link>
              <Link to="pgs.acu.edu.ng">Postgraduate</Link>
              <a href="cpfpapply.acu.edu.ng">Foundation</a>

            </div>
          </div>

          <div className="footer-meta-row">
            <div className="footer-social-row" aria-label="Social media links">
              {SOCIALS.map(({ platform, label, path }) => (
                <a
                  key={platform}
                  href={site.social[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <div className="bottom-links">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Site by : ACU-ICT
            </a>
          </div>
          <p>
            © {year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

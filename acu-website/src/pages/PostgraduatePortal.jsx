import { Link, Routes, Route, NavLink } from "react-router-dom";
import "./PostgraduatePortal.css";

const PROGRAMMES = [
  {
    title: "Postgraduate Diploma",
    description:
      "Advanced professional and disciplinary training designed for graduates seeking focused specialization and career advancement.",
    duration: "1 year",
    format: "Full-time / Part-time",
    slug: "pgd",
  },
  {
    title: "Master of Science (M.Sc.)",
    description:
      "Research-led and course-based master's programmes that bridge academic depth, field practice, and innovation.",
    duration: "18–24 months",
    format: "On-campus / Hybrid",
    slug: "msc",
  },
  {
    title: "Master of Business Administration",
    description:
      "A practice-oriented business degree for professionals seeking leadership, entrepreneurship, and strategic skills.",
    duration: "12–18 months",
    format: "Weekend / Evening",
    slug: "mba",
  },
  {
    title: "Doctor of Philosophy (Ph.D.)",
    description:
      "Original research programmes supported by faculty mentorship, rigorous methodology, and scholarly supervision.",
    duration: "36–60 months",
    format: "Research-based",
    slug: "phd",
  },
];

const STEPS = [
  "Choose a programme and confirm your area of interest.",
  "Check admission requirements and upload certified supporting documents.",
  "Submit your completed application online and pay the application fee.",
  "Track your admission status and follow the final enrollment instructions.",
];

const REQUIREMENTS = [
  "A recognized bachelor's degree with at least a Second Class Lower in a relevant field.",
  "Academic transcripts and degree certificate or provisional result.",
  "A valid statement of purpose and curriculum vitae.",
  "Two academic or professional referees.",
  "Evidence of research interest for master's by research and Ph.D. programmes.",
];

const FEATURES = [
  "Research supervision by experienced faculty and scholars",
  "Strong emphasis on Christian values, ethics, and leadership",
  "Accessible modern facilities and digital learning support",
  "Career-oriented curriculum with industry and public sector relevance",
];

const FAQS = [
  {
    q: "Who can apply for postgraduate study at ACU?",
    a: "Graduates with relevant academic qualifications and a strong interest in research, professional development, or advanced study can apply.",
  },
  {
    q: "Are part-time postgraduate options available?",
    a: "Yes. ACU offers flexible study modes for selected postgraduate programmes to support working professionals.",
  },
  {
    q: "Can I apply for a Ph.D. without an M.Sc.?",
    a: "Applicants must meet the specific departmental and faculty requirements for the Ph.D. route, which may include prior postgraduate study or equivalent research preparation.",
  },
];

const PROGRAMME_DETAILS = {
  pgd: {
    title: "Postgraduate Diploma",
    tagline: "Professional specialization for career acceleration.",
    duration: "1 year",
    mode: "Full-time / Part-time",
    summary:
      "This professional diploma is designed for graduates seeking targeted expertise, practical leadership capacity, and immediate workplace relevance.",
    outcomes: [
      "Strong subject-specific expertise",
      "Improved professional practice and confidence",
      "Focused advancement in a chosen field",
    ],
  },
  msc: {
    title: "Master of Science (M.Sc.)",
    tagline: "Research-driven advancement for analytical and scientific careers.",
    duration: "18–24 months",
    mode: "On-campus / Hybrid",
    summary:
      "ACU's M.Sc. programmes combine research excellence, faculty mentorship, and discipline-based expertise with real-world relevance.",
    outcomes: [
      "Research capability and critical inquiry",
      "Methodological and analytical competence",
      "Leadership in industry, policy, and academia",
    ],
  },
  mba: {
    title: "Master of Business Administration",
    tagline: "Executive leadership for strategic and entrepreneurial growth.",
    duration: "12–18 months",
    mode: "Weekend / Evening",
    summary:
      "Designed for professionals and aspiring leaders, the MBA develops decision-making, managerial capability, and strategic thinking.",
    outcomes: [
      "Leadership and management insight",
      "Innovation and organizational strategy",
      "Professional growth for executive pathways",
    ],
  },
  phd: {
    title: "Doctor of Philosophy (Ph.D.)",
    tagline: "Original scholarship and research leadership.",
    duration: "36–60 months",
    mode: "Research-based",
    summary:
      "The Ph.D. pathway supports significant original research and fosters intellectual independence, academic excellence, and scholarly contribution.",
    outcomes: [
      "Original research contribution",
      "Expert supervision and publication support",
      "Academic and intellectual leadership",
    ],
  },
};

function PostgraduateHome() {
  return (
    <div className="pg-portal">
      <section className="pg-hero">
        <div className="pg-shell pg-hero-inner">
          <div>
            <p className="pg-kicker">Postgraduate Admissions</p>
            <h1>Advance your career through research, leadership, and expertise.</h1>
            <p>
              ACU offers a vibrant postgraduate community where faith, academic excellence, and professional relevance meet to produce thinkers, researchers, and leaders for the future.
            </p>
            <div className="pg-hero-actions">
              <Link to="/portal/postgraduate/apply" className="btn btn-gold">
                Apply Now
              </Link>
              <Link to="/portal/postgraduate/login" className="btn btn-outline">
                Student Login
              </Link>
            </div>
          </div>

          <div className="pg-card pg-hero-panel">
            <div>
              <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 6 }}>Available programmes</div>
              <div style={{ fontSize: 42, fontWeight: 800 }}>4+</div>
            </div>
            <div className="pg-metric-grid">
              <div className="pg-metric">
                <strong>PGD</strong>
                <span>Professional</span>
              </div>
              <div className="pg-metric">
                <strong>MBA</strong>
                <span>Business</span>
              </div>
              <div className="pg-metric">
                <strong>M.Sc</strong>
                <span>Research</span>
              </div>
              <div className="pg-metric">
                <strong>Ph.D</strong>
                <span>Doctoral</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pg-section">
        <div className="pg-shell">
          <div className="pg-stats">
            {[
              ["18–24 months", "Average master's duration"],
              ["80+", "Faculty-led research pathways"],
              ["Hybrid", "Flexible study mode"],
              ["Full support", "Academic advising and supervision"],
            ].map(([value, label], idx) => (
              <div key={idx} className="pg-stat">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pg-section" style={{ background: "rgba(237, 244, 255, 0.7)" }}>
        <div className="pg-shell">
          <div className="pg-intro">
            <div>
              <p className="eyebrow">Programmes</p>
              <h2>Choose the route that fits your ambition</h2>
            </div>
          </div>

          <div className="pg-programmes">
            {PROGRAMMES.map((programme) => (
              <article key={programme.title} className="pg-programme">
                <div>
                  <div className="pg-programme-top">
                    <h3>{programme.title}</h3>
                    <span className="pg-badge">{programme.duration}</span>
                  </div>
                  <p>{programme.description}</p>
                </div>

                <div className="pg-programme-footer">
                  <div className="pg-programme-meta">{programme.format}</div>
                  <NavLink to={`/portal/postgraduate/programmes/${programme.slug}`} className="btn btn-navy btn-sm">
                    Learn More
                  </NavLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pg-section">
        <div className="pg-shell pg-columns">
          <div className="pg-panel">
            <p className="eyebrow">Requirements</p>
            <h2>What you need to apply</h2>
            <ul>
              {REQUIREMENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="pg-panel">
            <p className="eyebrow">Application guide</p>
            <h2>Simple 4-step process</h2>
            <ol>
              {STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="pg-section" style={{ background: "rgba(237, 244, 255, 0.7)" }}>
        <div className="pg-shell">
          <div className="pg-intro">
            <div>
              <p className="eyebrow">Why ACU</p>
              <h2>A postgraduate environment built for excellent scholarship</h2>
            </div>
          </div>

          <div className="pg-features">
            {FEATURES.map((feature) => (
              <div key={feature} className="pg-feature">
                <div className="check">✓</div>
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pg-section">
        <div className="pg-shell pg-faqs">
          <div>
            <p className="eyebrow">FAQs</p>
            <h2>Everything you need to know before applying</h2>
          </div>

          <div className="pg-faq-list">
            {FAQS.map((item) => (
              <div key={item.q} className="pg-faq">
                <strong>{item.q}</strong>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pg-section" style={{ paddingTop: 0 }}>
        <div className="pg-shell">
          <div className="pg-cta">
            <div>
              <p style={{ margin: 0, opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 12 }}>
                Ready to begin?
              </p>
              <h3 style={{ margin: "8px 0 0" }}>Take the next step toward your postgraduate journey.</h3>
            </div>
            <div className="pg-cta-actions">
              <Link to="/portal/postgraduate/apply" className="btn btn-gold">
                Apply to ACU
              </Link>
              <a href="mailto:info@acu.edu.ng" className="btn btn-outline">
                Contact Admissions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ApplyPage() {
  return (
    <div className="pg-form-shell">
      <div className="pg-auth">
        <div className="pg-auth-visual">
          <p className="pg-kicker">Application</p>
          <h2>Begin your postgraduate application.</h2>
          <p>
            Submit your academic details, upload supporting information, and begin your journey with Ajayi Crowther University.
          </p>
        </div>

        <div className="pg-auth-panel">
          <div className="pg-status">Application window is currently open for the new session.</div>
          <form>
            <div className="pg-form-grid">
              <div className="pg-form-field">
                <label>Full name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>
              <div className="pg-form-field">
                <label>Email address</label>
                <input type="email" placeholder="you@example.com" />
              </div>
              <div className="pg-form-field">
                <label>Phone number</label>
                <input type="tel" placeholder="0803 000 0000" />
              </div>
              <div className="pg-form-field">
                <label>Programme</label>
                <select defaultValue="">
                  <option value="" disabled>Select programme</option>
                  {PROGRAMMES.map((p) => (
                    <option key={p.slug} value={p.slug}>{p.title}</option>
                  ))}
                </select>
              </div>
              <div className="pg-form-field full">
                <label>Academic background</label>
                <textarea placeholder="Share your degree, institution, and relevant experience." />
              </div>
              <div className="pg-form-field full">
                <label>Statement of purpose</label>
                <textarea placeholder="Tell us why you want to study this programme." />
              </div>
            </div>

            <div className="pg-inline">
              <label><input type="checkbox" /> I agree to the admissions terms.</label>
            </div>

            <button type="button" className="btn btn-gold">Submit Application</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="pg-form-shell">
      <div className="pg-auth">
        <div className="pg-auth-visual">
          <p className="pg-kicker">Student portal</p>
          <h2>Welcome back.</h2>
          <p>
            Track your application, view your admission status, and manage your postgraduate student journey.
          </p>
        </div>

        <div className="pg-auth-panel">
          <h3 style={{ marginBottom: 20 }}>Login to your account</h3>
          <form>
            <div className="pg-form-field">
              <label>Email address</label>
              <input type="email" placeholder="student@acu.edu.ng" />
            </div>
            <div className="pg-form-field">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>

            <div className="pg-inline">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot password?</a>
            </div>

            <Link to="/portal/postgraduate/dashboard" className="btn btn-gold" style={{ width: "100%" }}>
              Sign In
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="pg-dashboard">
      <div className="pg-intro">
        <div>
          <p className="eyebrow">Student dashboard</p>
          <h2>Welcome back, Ada</h2>
        </div>
        <Link to="/portal/postgraduate" className="btn btn-navy btn-sm">
          Back to portal
        </Link>
      </div>

      <div className="pg-dashboard-grid">
        <div className="pg-dash-card">
          <div className="label">Application status</div>
          <strong>Under review</strong>
        </div>
        <div className="pg-dash-card">
          <div className="label">Programme</div>
          <strong>M.Sc. Computer Science</strong>
        </div>
        <div className="pg-dash-card">
          <div className="label">Deadline</div>
          <strong>12 Oct</strong>
        </div>
        <div className="pg-dash-card">
          <div className="label">Documents</div>
          <strong>03/05</strong>
        </div>
      </div>

      <div className="pg-dashboard-layout">
        <div className="pg-panel">
          <p className="eyebrow">Checklist</p>
          <div className="pg-list">
            <div className="pg-list-item">
              <strong>Academic transcript</strong>
              <span className="pg-step-pill">Uploaded</span>
            </div>
            <div className="pg-list-item">
              <strong>Reference letters</strong>
              <span className="pg-step-pill">Pending</span>
            </div>
            <div className="pg-list-item">
              <strong>Statement of purpose</strong>
              <span className="pg-step-pill">Approved</span>
            </div>
          </div>
        </div>

        <div className="pg-thread">
          <p className="eyebrow">Recent activity</p>
          <div className="pg-thread-item">
            <small>Today</small>
            <strong>Application acknowledgment sent</strong>
          </div>
          <div className="pg-thread-item">
            <small>2 days ago</small>
            <strong>Supplementary document requested</strong>
          </div>
          <div className="pg-thread-item">
            <small>1 week ago</small>
            <strong>Application received successfully</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgrammeDetailPage({ programme }) {
  const detail = PROGRAMME_DETAILS[programme];

  if (!detail) return <PostgraduateHome />;

  return (
    <div className="pg-programme-head">
      <div className="pg-shell pg-programme-layout">
        <div className="pg-programme-cover">
          <p className="pg-kicker">Programme</p>
          <h1>{detail.title}</h1>
          <p>{detail.tagline}</p>
          <div className="meta-row">
            <span className="meta-chip">{detail.duration}</span>
            <span className="meta-chip">{detail.mode}</span>
          </div>
        </div>

        <div className="pg-panel">
          <p className="eyebrow">Overview</p>
          <p>{detail.summary}</p>
          <ul>
            {detail.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
          <Link to="/portal/postgraduate/apply" className="btn btn-gold" style={{ marginTop: 12 }}>
            Apply to this programme
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PostgraduatePortal() {
  return (
    <Routes>
      <Route index element={<PostgraduateHome />} />
      <Route path="apply" element={<ApplyPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="programmes/:programme" element={<ProgrammeDetailPage />} />
    </Routes>
  );
}

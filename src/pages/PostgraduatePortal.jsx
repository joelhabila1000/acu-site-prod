import { Link, Routes, Route, NavLink, useParams } from "react-router-dom";
import "./PostgraduatePortal.css";

import pgHero from "../assets/Buildings/PG School.JPG";
import lectureRoom from "../assets/Buildings/University Lecture Room.JPG";
import lawBuilding from "../assets/Buildings/Faculty of Law Building.JPG";
import ictBuilding from "../assets/Buildings/Ict BUILDING.JPG";
import senateBuilding from "../assets/Buildings/Senate Building.JPG";

// The Postgraduate School runs its own admissions portal; the site links out to
// it rather than collecting applications itself.
const PGS_URL = "https://pgs.acu.edu.ng/";
const APPLY_URL = "https://pgs.acu.edu.ng/begin-application/";
const APPLICATION_FEE = "₦25,000";

const AWARDS = [
  {
    slug: "pgd",
    title: "Postgraduate Diploma (PGD)",
    short: "PGD",
    description:
      "Conversion and remedial training for graduates and HND holders, and the recognised route into a master's degree for candidates who need it.",
    duration: "12 months",
    format: "Full-time / Part-time",
  },
  {
    slug: "msc",
    title: "Master of Science / Arts (M.Sc. / M.A.)",
    short: "M.Sc / M.A",
    description:
      "Research-led and course-based master's degrees across the sciences, humanities and social sciences, with supervised dissertation work.",
    duration: "18–24 months",
    format: "Full-time / Part-time",
  },
  {
    slug: "mba",
    title: "Master of Business Administration (MBA)",
    short: "MBA",
    description:
      "A practice-oriented business degree for professionals seeking leadership, strategy and entrepreneurship skills without leaving work.",
    duration: "18–24 months",
    format: "Weekend / Evening",
  },
  {
    slug: "mpa",
    title: "Master of Public Administration (MPA)",
    short: "MPA",
    description:
      "Advanced training in public policy, governance and administration for civil servants, public managers and development practitioners.",
    duration: "18–24 months",
    format: "Weekend / Evening",
  },
  {
    slug: "mit",
    title: "Master of Information Technology (MIT)",
    short: "MIT",
    description:
      "A professional master's for computing practitioners, covering software engineering, data, networks and secure systems.",
    duration: "18–24 months",
    format: "Full-time / Hybrid",
  },
  {
    slug: "med",
    title: "Master of Education (M.Ed.)",
    short: "M.Ed.",
    description:
      "Postgraduate teacher formation in educational management, guidance and counselling, curriculum and instruction.",
    duration: "18–24 months",
    format: "Full-time / Part-time",
  },
  {
    slug: "dba",
    title: "Doctor of Business Administration (DBA)",
    short: "DBA",
    description:
      "An executive doctorate for senior managers, applying rigorous research to real organisational problems.",
    duration: "36 months",
    format: "Executive / Weekend",
  },
  {
    slug: "phd",
    title: "Doctor of Philosophy (Ph.D.)",
    short: "Ph.D",
    description:
      "Original research under faculty supervision, culminating in a thesis that makes a distinct contribution to knowledge.",
    duration: "36–48 months",
    format: "Research-based",
  },
];

const FACULTY_PROGRAMMES = [
  {
    faculty: "Faculty of Humanities",
    programmes: [
      "M.A. History",
      "Ph.D. History",
      "M.A. Christian Religious Studies",
      "PGD Christian Religious Studies",
      "Ph.D. Christian Religious Studies",
      "PGD Religious Studies",
      "Ph.D. Religious Studies",
      "Ph.D. English",
    ],
  },
  {
    faculty: "Faculty of Management Sciences",
    programmes: [
      "Master of Business Administration (MBA)",
      "Master of Public Administration (MPA)",
      "Doctor of Business Administration (DBA)",
      "M.Sc. Accounting",
      "PGD Accounting",
      "M.Sc. Business Administration",
      "PGD Business Administration",
      "Ph.D. Business Administration",
    ],
  },
  {
    faculty: "Faculty of Natural Sciences",
    programmes: [
      "M.Sc. Computer Science",
      "PGD Computer Science",
      "Ph.D. Computer Science",
      "Master of Information Technology (MIT)",
      "M.Sc. Microbiology",
      "PGD Microbiology",
      "Ph.D. Microbiology",
      "M.Sc. Biochemistry",
      "PGD Biochemistry",
      "Ph.D. Biochemistry",
      "M.Sc. Industrial Chemistry",
      "PGD Industrial Chemistry",
      "M.Sc. Geology",
      "PGD Geology",
      "Ph.D. Geology",
      "PGD Physics",
    ],
  },
  {
    faculty: "Faculty of Social Sciences & Communication",
    programmes: [
      "M.Sc. Mass Communication",
      "PGD Mass Communication",
      "Ph.D. Mass Communication",
    ],
  },
  {
    faculty: "Faculty of Education",
    programmes: ["M.Ed. Educational Management", "PGD Education"],
  },
];

const STEPS = [
  "Visit the Postgraduate School admission portal and create an account.",
  `Pay the non-refundable application fee of ${APPLICATION_FEE} to unlock the online form.`,
  "Complete the form and upload your transcript, certificates and NYSC documents.",
  "Track your admission status on the portal and follow the enrolment instructions.",
];

const REQUIREMENTS = [
  "Five O'Level credit passes, including English Language and Mathematics.",
  "A bachelor's degree from a recognised university — minimum of Second Class Lower for master's programmes.",
  "For PGD: a bachelor's degree (Third Class and above) or an HND with at least Lower Credit.",
  "For Ph.D. and DBA: a relevant master's degree with a strong academic record.",
  "Official academic transcript sent directly by your previous institution.",
  "NYSC discharge or exemption certificate.",
  "Statement of purpose, curriculum vitae and two academic or professional referees.",
];

const FEATURES = [
  "Supervision by experienced professors and research-active faculty",
  "Faith-based environment that holds ethics and integrity at its centre",
  "Regular, stable academic calendar so you finish on schedule",
  "Affordable fees that individuals and corporate sponsors can plan around",
  "Modern lecture rooms, laboratories and a dedicated postgraduate school building",
  "Flexible weekend and evening modes for working professionals",
];

const FAQS = [
  {
    q: "Who can apply for postgraduate study at ACU?",
    a: "Graduates of recognised universities and holders of Higher National Diplomas can apply. Master's programmes require at least a Second Class Lower degree; PGD programmes accept a Third Class degree or an HND with Lower Credit.",
  },
  {
    q: "Can I move from HND straight into a master's degree?",
    a: "No. All HND holders must first complete a Postgraduate Diploma (PGD) before proceeding to a master's programme.",
  },
  {
    q: "How long does a master's programme take?",
    a: "A minimum of three academic semesters and a maximum of four semesters (24 calendar months). PGD programmes run for three academic semesters.",
  },
  {
    q: "Are part-time and weekend options available?",
    a: "Yes. The MBA, MPA, DBA and several other programmes are taught at weekends and in the evenings for working professionals.",
  },
  {
    q: "Is my transcript required?",
    a: "Yes. An official transcript is required before admission can be finalised — you cannot be admitted without one.",
  },
  {
    q: "Do I need my NYSC certificate?",
    a: "Yes. A valid NYSC discharge or exemption certificate is required for admission.",
  },
];

const PROGRAMME_DETAILS = {
  pgd: {
    title: "Postgraduate Diploma (PGD)",
    tagline: "Conversion, specialisation and a route into master's study.",
    duration: "12 months (3 semesters)",
    mode: "Full-time / Part-time",
    summary:
      "The Postgraduate Diploma provides basic and remedial training in a discipline. It is the recognised bridge for HND holders and for graduates whose first degree is in an unrelated field, and it prepares candidates for higher study.",
    outcomes: [
      "A qualification that opens the door to master's programmes",
      "Focused, discipline-specific professional expertise",
      "Improved workplace practice and confidence",
    ],
    entry: [
      "Five O'Level credits including English Language and Mathematics",
      "Bachelor's degree not lower than Third Class, or HND with at least Lower Credit",
      "Relevant background may be required for some disciplines",
    ],
  },
  msc: {
    title: "Master of Science / Arts (M.Sc. / M.A.)",
    tagline: "Research-driven advancement for analytical and academic careers.",
    duration: "18–24 months (3–4 semesters)",
    mode: "Full-time / Part-time",
    summary:
      "ACU's master's degrees combine taught modules with supervised research. Candidates complete coursework, a seminar and a dissertation that demonstrates methodological competence and independent inquiry.",
    outcomes: [
      "Research capability and critical inquiry",
      "Methodological and analytical competence",
      "A pathway into doctoral study or specialist practice",
    ],
    entry: [
      "Five O'Level credits including English Language and Mathematics",
      "Bachelor's degree with a minimum of Second Class Lower in a relevant field",
      "Official transcript and NYSC discharge or exemption certificate",
    ],
  },
  mba: {
    title: "Master of Business Administration (MBA)",
    tagline: "Executive leadership for strategic and entrepreneurial growth.",
    duration: "18–24 months",
    mode: "Weekend / Evening",
    summary:
      "Designed for working professionals and aspiring executives, the MBA develops decision-making, managerial capability and strategic thinking across accounting, marketing, operations, finance and human resources.",
    outcomes: [
      "Leadership and management insight",
      "Strategy, finance and organisational analysis",
      "A professional network of fellow managers",
    ],
    entry: [
      "Five O'Level credits including English Language and Mathematics",
      "Bachelor's degree with a minimum of Second Class Lower",
      "Graduates of other disciplines may be required to complete a PGD first",
    ],
  },
  mpa: {
    title: "Master of Public Administration (MPA)",
    tagline: "Governance, policy and public sector leadership.",
    duration: "18–24 months",
    mode: "Weekend / Evening",
    summary:
      "The MPA equips public servants, local government staff and development practitioners with the tools of policy analysis, public finance, administration and ethical governance.",
    outcomes: [
      "Public policy analysis and implementation skills",
      "Public finance and administrative competence",
      "Capacity for leadership in government and NGOs",
    ],
    entry: [
      "Five O'Level credits including English Language and Mathematics",
      "Bachelor's degree with a minimum of Second Class Lower",
      "Preference for applicants with public service experience",
    ],
  },
  mit: {
    title: "Master of Information Technology (MIT)",
    tagline: "Professional mastery of modern computing systems.",
    duration: "18–24 months",
    mode: "Full-time / Hybrid",
    summary:
      "The MIT is a professional master's for computing practitioners. It covers software engineering, data management, networking, cybersecurity and the design of enterprise systems.",
    outcomes: [
      "Advanced software and systems engineering practice",
      "Data, network and security competence",
      "Capacity to lead technology projects in industry",
    ],
    entry: [
      "Five O'Level credits including English Language and Mathematics",
      "Bachelor's degree with a minimum of Second Class Lower in Computer Science or a related field",
      "Applicants from other disciplines may enter through PGD Computer Science",
    ],
  },
  med: {
    title: "Master of Education (M.Ed.)",
    tagline: "Advanced formation for teachers and school leaders.",
    duration: "18–24 months",
    mode: "Full-time / Part-time",
    summary:
      "The M.Ed. deepens professional practice in educational management, guidance and counselling, curriculum studies and instruction, for teachers and administrators at every level.",
    outcomes: [
      "Advanced knowledge of curriculum and assessment",
      "Leadership and management in education",
      "Guidance, counselling and learner support skills",
    ],
    entry: [
      "Five O'Level credits including English Language and Mathematics",
      "Bachelor's degree in Education, or a degree plus a teaching qualification",
      "Minimum of Second Class Lower, with teaching experience preferred",
    ],
  },
  dba: {
    title: "Doctor of Business Administration (DBA)",
    tagline: "An executive doctorate for senior practitioners.",
    duration: "36 months",
    mode: "Executive / Weekend",
    summary:
      "The DBA applies rigorous research methods to real organisational problems. It is designed for senior managers who want doctoral-level capability while continuing to work.",
    outcomes: [
      "Applied research competence at doctoral level",
      "Evidence-based solutions for your organisation",
      "Authority as a practitioner-scholar and consultant",
    ],
    entry: [
      "A relevant master's degree (MBA, M.Sc. or equivalent) from a recognised university",
      "Significant managerial or professional experience",
      "A viable research proposal and two referees",
    ],
  },
  phd: {
    title: "Doctor of Philosophy (Ph.D.)",
    tagline: "Original scholarship and research leadership.",
    duration: "36–48 months",
    mode: "Research-based",
    summary:
      "The Ph.D. is awarded for significant original research. Candidates work under faculty supervision, present seminars, and submit a thesis that makes a distinct contribution to knowledge in their field.",
    outcomes: [
      "An original contribution to knowledge",
      "Expert supervision and publication support",
      "Academic and intellectual leadership",
    ],
    entry: [
      "A relevant master's degree with a strong academic record",
      "A research proposal aligned with available supervision",
      "Official transcripts, NYSC certificate and two academic referees",
    ],
  },
};

function ApplyButton({ className = "btn btn-gold", children = "Apply Now" }) {
  return (
    <a
      className={className}
      href={APPLY_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function PostgraduateHome() {
  return (
    <div className="pg-portal">
      <section
        className="pg-hero pg-hero-photo"
        style={{ backgroundImage: `url(${pgHero})` }}
      >
        <div className="pg-shell pg-hero-inner">
          <div>
            <p className="pg-kicker">Postgraduate School</p>
            <h1>Advance your career through research, leadership and expertise.</h1>
            <p>
              The Postgraduate School of Ajayi Crowther University brings together
              scholars, professionals and researchers in a community where faith,
              academic rigour and professional relevance meet. Study for a PGD,
              master's, MBA, MPA, MIT, M.Ed., DBA or Ph.D. on a stable calendar and
              at a cost you can plan around.
            </p>
            <div className="pg-hero-actions">
              <ApplyButton />
              <Link to="/portal/postgraduate/programmes" className="btn btn-outline">
                Browse Programmes
              </Link>
            </div>
          </div>

          <div className="pg-card pg-hero-panel">
            <div>
              <div className="pg-panel-label">Programmes on offer</div>
              <div className="pg-panel-value">35+</div>
            </div>
            <div className="pg-metric-grid">
              <div className="pg-metric">
                <strong>PGD</strong>
                <span>Conversion</span>
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
              ["12–24 months", "PGD and master's duration"],
              ["Weekend & evening", "Study modes for professionals"],
              [APPLICATION_FEE, "Non-refundable application fee"],
              ["Online", "Apply through the PG portal"],
            ].map(([value, label], idx) => (
              <div key={idx} className="pg-stat">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pg-section pg-section-soft">
        <div className="pg-shell">
          <div className="pg-intro">
            <div>
              <p className="eyebrow">Programmes</p>
              <h2>Choose the route that fits your ambition</h2>
            </div>
            <ApplyButton className="btn btn-navy btn-sm">Start application</ApplyButton>
          </div>

          <div className="pg-programmes">
            {AWARDS.map((programme) => (
              <article key={programme.slug} className="pg-programme">
                <div>
                  <div className="pg-programme-top">
                    <h3>{programme.title}</h3>
                    <span className="pg-badge">{programme.duration}</span>
                  </div>
                  <p>{programme.description}</p>
                </div>

                <div className="pg-programme-footer">
                  <div className="pg-programme-meta">{programme.format}</div>
                  <NavLink
                    to={`/portal/postgraduate/programmes/${programme.slug}`}
                    className="btn btn-navy btn-sm"
                  >
                    Learn More
                  </NavLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pg-section">
        <div className="pg-shell pg-showcase">
          <div className="pg-showcase-media">
            <img
              src={lectureRoom}
              alt="Postgraduate lecture room at Ajayi Crowther University"
              loading="lazy"
            />
            <img
              src={ictBuilding}
              alt="ICT building at Ajayi Crowther University"
              loading="lazy"
            />
          </div>
          <div className="pg-showcase-copy">
            <p className="eyebrow">A place to think</p>
            <h2>Facilities that support serious scholarship</h2>
            <p>
              Postgraduate study at ACU takes place in a calm, well-equipped
              environment. Our lecture rooms, laboratories and ICT facilities sit
              alongside the dedicated Postgraduate School building, and the serene
              campus is designed to let you concentrate on your research.
            </p>
            <ul className="pg-check-list">
              <li>Dedicated Postgraduate School building and reading spaces</li>
              <li>Modern lecture rooms, laboratories and ICT facilities</li>
              <li>Supervision by experienced, research-active faculty</li>
              <li>Regular, stable academic calendar</li>
            </ul>
            <ApplyButton className="btn btn-navy">Apply to ACU</ApplyButton>
          </div>
        </div>
      </section>

      <section className="pg-section pg-section-soft">
        <div className="pg-shell">
          <div className="pg-intro">
            <div>
              <p className="eyebrow">Course list</p>
              <h2>Postgraduate programmes by faculty</h2>
            </div>
          </div>

          <div className="pg-faculty-grid">
            {FACULTY_PROGRAMMES.map((group) => (
              <article key={group.faculty} className="pg-faculty-card">
                <h3>{group.faculty}</h3>
                <ul className="pg-chip-list">
                  {group.programmes.map((programme) => (
                    <li key={programme}>{programme}</li>
                  ))}
                </ul>
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
            <h2>How to apply</h2>
            <ol>
              {STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <ApplyButton className="btn btn-navy">Go to the application portal</ApplyButton>
            <p className="pg-note">
              Applications are handled by the Postgraduate School at{" "}
              <a href={PGS_URL} target="_blank" rel="noopener noreferrer">
                pgs.acu.edu.ng
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="pg-section pg-section-soft">
        <div className="pg-shell pg-showcase pg-showcase-reverse">
          <div className="pg-showcase-copy">
            <p className="eyebrow">Why ACU</p>
            <h2>A postgraduate environment built for excellent scholarship</h2>
            <div className="pg-features">
              {FEATURES.map((feature) => (
                <div key={feature} className="pg-feature">
                  <div className="check">✓</div>
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="pg-showcase-media">
            <img
              src={lawBuilding}
              alt="Faculty of Law building at Ajayi Crowther University"
              loading="lazy"
            />
            <img
              src={senateBuilding}
              alt="Senate building at Ajayi Crowther University"
              loading="lazy"
            />
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

      <section className="pg-section pg-section-flush">
        <div className="pg-shell">
          <div className="pg-cta">
            <div>
              <p className="pg-cta-kicker">Ready to begin?</p>
              <h3>Take the next step toward your postgraduate journey.</h3>
            </div>
            <div className="pg-cta-actions">
              <ApplyButton />
              <a href="mailto:pgs@acu.edu.ng" className="btn btn-outline">
                Contact the School
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
        <div
          className="pg-auth-visual pg-auth-visual-photo"
          style={{ backgroundImage: `url(${pgHero})` }}
        >
          <p className="pg-kicker">Application</p>
          <h2>Begin your postgraduate application.</h2>
          <p>
            Applications for all postgraduate programmes are submitted through the
            Postgraduate School admission portal. The form is unlocked once the
            non-refundable application fee of {APPLICATION_FEE} has been paid.
          </p>
        </div>

        <div className="pg-auth-panel">
          <div className="pg-status">
            The application window is currently open for the new session.
          </div>
          <h3>How to apply</h3>
          <ol className="pg-steps">
            {STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <ApplyButton className="btn btn-navy">
            Open the application portal
          </ApplyButton>
          <p className="pg-note">
            You will be redirected to{" "}
            <a href={PGS_URL} target="_blank" rel="noopener noreferrer">
              pgs.acu.edu.ng
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="pg-form-shell">
      <div className="pg-auth">
        <div
          className="pg-auth-visual pg-auth-visual-photo"
          style={{ backgroundImage: `url(${senateBuilding})` }}
        >
          <p className="pg-kicker">Student portal</p>
          <h2>Welcome back.</h2>
          <p>
            Track your application, view your admission status and manage your
            postgraduate student journey on the Postgraduate School portal.
          </p>
        </div>

        <div className="pg-auth-panel">
          <h3>Postgraduate portal login</h3>
          <p className="pg-note">
            Account login is handled by the Postgraduate School portal.
          </p>
          <a
            className="btn btn-navy"
            href={PGS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Continue to the portal
          </a>
          <ApplyButton className="btn btn-gold">
            Create a new application
          </ApplyButton>
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

function ProgrammeDetailPage() {
  const { programme } = useParams();
  const detail = PROGRAMME_DETAILS[programme];

  if (!detail) return <ProgrammesIndex />;

  return (
    <div className="pg-programme-head">
      <div className="pg-shell pg-programme-layout">
        <div
          className="pg-programme-cover pg-programme-cover-photo"
          style={{ backgroundImage: `url(${pgHero})` }}
        >
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

          <h3 className="pg-subhead">What you gain</h3>
          <ul>
            {detail.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>

          <h3 className="pg-subhead">Entry requirements</h3>
          <ul>
            {detail.entry.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <ApplyButton className="btn btn-navy">Apply to this programme</ApplyButton>
          <p className="pg-note">
            Not sure this is the right route?{" "}
            <Link to="/portal/postgraduate/programmes">Compare all programmes</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProgrammesIndex() {
  return (
    <div className="pg-portal">
      <section className="pg-section pg-section-top">
        <div className="pg-shell">
          <div className="pg-intro">
            <div>
              <p className="eyebrow">Programmes</p>
              <h2>All postgraduate programmes</h2>
            </div>
            <ApplyButton className="btn btn-navy btn-sm">Start application</ApplyButton>
          </div>

          <div className="pg-programmes">
            {AWARDS.map((programme) => (
              <article key={programme.slug} className="pg-programme">
                <div>
                  <div className="pg-programme-top">
                    <h3>{programme.title}</h3>
                    <span className="pg-badge">{programme.duration}</span>
                  </div>
                  <p>{programme.description}</p>
                </div>
                <div className="pg-programme-footer">
                  <div className="pg-programme-meta">{programme.format}</div>
                  <NavLink
                    to={`/portal/postgraduate/programmes/${programme.slug}`}
                    className="btn btn-navy btn-sm"
                  >
                    Learn More
                  </NavLink>
                </div>
              </article>
            ))}
          </div>

          <div className="pg-faculty-grid">
            {FACULTY_PROGRAMMES.map((group) => (
              <article key={group.faculty} className="pg-faculty-card">
                <h3>{group.faculty}</h3>
                <ul className="pg-chip-list">
                  {group.programmes.map((programme) => (
                    <li key={programme}>{programme}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
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
      <Route path="programmes" element={<ProgrammesIndex />} />
      <Route path="programmes/:programme" element={<ProgrammeDetailPage />} />
    </Routes>
  );
}

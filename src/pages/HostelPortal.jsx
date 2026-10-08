import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { GENDER_LABELS, useHostels } from "../data/hostels.js";
import { HostelAuthProvider, useHostelAuth } from "../data/hostelAuth.jsx";
import "./HostelPortal.css";

import heroImage from "../assets/Buildings/Crowther Hall.JPG";
import complexImage from "../assets/Buildings/Complex.JPG";

const STUDENT_BASE = "/portal/hostel";

const AMENITIES = [
  {
    title: "Furnished rooms",
    text: "Beds, reading tables and storage in every room, with shared washrooms and common areas.",
  },
  {
    title: "24-hour security",
    text: "Gated halls with on-site porters, access control and a resident warden in each block.",
  },
  {
    title: "Power & water",
    text: "Stand-by generators and a steady water supply so study and daily life are never interrupted.",
  },
  {
    title: "Study-friendly",
    text: "Quiet hours, reading spaces and house rules that protect the calm needed to focus.",
  },
  {
    title: "Maintenance support",
    text: "Report repairs from your portal dashboard and follow them through to resolution.",
  },
  {
    title: "Faith & community",
    text: "Hall devotion, fellowship and mentoring that keep residents grounded and supported.",
  },
];

const ALLOCATION_STEPS = [
  {
    title: "Create your student account",
    text: "Register with your matric number and email, or sign in if you already have an account.",
  },
  {
    title: "Apply for accommodation",
    text: "Choose your preferred hall for the session and tell us anything we should know.",
  },
  {
    title: "Pay the hostel fee",
    text: "Submit your hostel fee payment through the portal so your application can be processed.",
  },
  {
    title: "Get your allocation",
    text: "Once approved, your room and bed are allocated and shown on your dashboard.",
  },
];

const RULES = [
  "Accommodation is allotted one room per student, each academic session.",
  "Hostel fees are paid before allocation; places are limited and filled in order of payment.",
  "Halls are single-gender unless designated mixed; allocation respects your registered gender.",
  "Guests are not permitted to stay overnight in the halls.",
  "Cooking is restricted to designated kitchen areas.",
  "Residents keep their rooms and shared facilities clean and report damage promptly.",
];

const FAQS = [
  {
    q: "Who can apply for a bed space?",
    a: "Every registered student of the University may apply. Applications are made per session, so returning students apply again each year.",
  },
  {
    q: "Can I choose my hall?",
    a: "Yes. You may state a preferred hall when you apply. Final allocation depends on availability and your registered gender, since most halls are single-gender.",
  },
  {
    q: "How is a bed allocated?",
    a: "Applications are reviewed by Student Affairs. Once your payment is confirmed, a room and bed are assigned to you and appear on your dashboard.",
  },
  {
    q: "What does the portal cost?",
    a: "The portal itself is free. You only pay the published hostel fee, which the portal records against your application.",
  },
  {
    q: "I have a maintenance problem — who do I tell?",
    a: "Report it from the maintenance section of your dashboard. The request goes straight to the hostel maintenance team.",
  },
  {
    q: "Can I apply for more than one hall?",
    a: "You may hold only one accommodation application per session, but you can apply again in a later session.",
  },
];

const STATUS_LABELS = {
  pending: "Pending review",
  approved: "Approved",
  rejected: "Not successful",
  allocated: "Allocated",
  checked_in: "Checked in",
  checked_out: "Checked out",
  paid: "Paid",
  failed: "Failed",
  open: "Open",
  in_progress: "In progress",
  resolved: "Resolved",
};

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function formatNaira(value) {
  return naira.format(Number(value) || 0);
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// The session starts in the autumn; before September we are still in the
// session that began the previous calendar year.
function sessionOptions() {
  const now = new Date();
  const year = now.getFullYear();
  const start = now.getMonth() >= 8 ? year : year - 1;
  return [
    `${start}/${start + 1}`,
    `${start + 1}/${start + 2}`,
    `${start + 2}/${start + 3}`,
  ];
}

function StatusPill({ status }) {
  const label = STATUS_LABELS[status] || status || "—";
  return <span className={`hp-pill hp-pill--${status || "default"}`}>{label}</span>;
}

function RequireStudent({ children }) {
  const { isAuthed } = useHostelAuth();
  const location = useLocation();
  if (!isAuthed) {
    return (
      <Navigate
        to={`${STUDENT_BASE}/login`}
        replace
        state={{ from: location.pathname }}
      />
    );
  }
  return children;
}

// Loads one of the student "mine" collections, re-running whenever the session
// changes and exposing a reload for after a form is submitted.
function useMine(path) {
  const { authGet, isAuthed } = useHostelAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    if (!isAuthed) {
      setData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    authGet(path)
      .then((res) => {
        setData(Array.isArray(res && res.data) ? res.data : []);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [authGet, isAuthed, path]);

  useEffect(load, [load]);

  return { data, loading, error, reload: load };
}

function HostelCard({ hostel }) {
  return (
    <article className="hp-hall-card">
      <div className="hp-hall-media">
        <img src={hostel.image} alt={hostel.name} loading="lazy" />
        <span className={`hp-gender hp-gender--${hostel.gender}`}>
          {GENDER_LABELS[hostel.gender] || "Hall of residence"}
        </span>
      </div>

      <div className="hp-hall-body">
        <div className="hp-hall-heading">
          <h3>{hostel.name}</h3>
          <span className="hp-hall-location">{hostel.location}</span>
        </div>
        {hostel.description && <p>{hostel.description}</p>}

        <div className="hp-hall-metrics">
          <div>
            <strong>{hostel.availableBeds}</strong>
            <span>Beds free</span>
          </div>
          <div>
            <strong>{hostel.roomCount}</strong>
            <span>Rooms</span>
          </div>
          <div>
            <strong>{hostel.bedCount}</strong>
            <span>Capacity</span>
          </div>
        </div>

        <Link
          to={`${STUDENT_BASE}/apply`}
          state={{ hostelId: hostel.id }}
          className="btn btn-navy btn-sm hp-hall-cta"
        >
          Apply for this hall
        </Link>
      </div>
    </article>
  );
}

function HostelHome() {
  const { hostels } = useHostels();
  const { isAuthed } = useHostelAuth();

  const totals = useMemo(
    () => ({
      halls: hostels.length,
      rooms: hostels.reduce((sum, h) => sum + (h.roomCount || 0), 0),
      beds: hostels.reduce((sum, h) => sum + (h.bedCount || 0), 0),
      available: hostels.reduce((sum, h) => sum + (h.availableBeds || 0), 0),
    }),
    [hostels],
  );

  return (
    <div className="hp-portal">
      <section
        className="hp-hero hp-hero-photo"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="container hp-hero-inner">
          <div className="hp-hero-copy">
            <p className="hp-kicker">Student Accommodation</p>
            <h1>Your home on campus, sorted in one place.</h1>
            <p>
              Apply for a bed space, track your allocation, pay your hostel fee
              and raise maintenance requests — all through the ACU hostel
              portal. Comfortable halls, gated security and a studious
              community, from your first application to check-out.
            </p>
            <div className="hp-hero-actions">
              {isAuthed ? (
                <Link to={`${STUDENT_BASE}/dashboard`} className="btn btn-gold">
                  Go to my dashboard
                </Link>
              ) : (
                <Link to={`${STUDENT_BASE}/apply`} className="btn btn-gold">
                  Apply for accommodation
                </Link>
              )}
              <Link to={`${STUDENT_BASE}/login`} className="btn btn-outline-light">
                Student login
              </Link>
            </div>

            <nav className="hp-anchor-nav" aria-label="On this page">
              {[
                ["halls", "Our halls"],
                ["how-it-works", "How it works"],
                ["facilities", "Facilities"],
                ["rules-faqs", "Rules & FAQs"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hp-hero-panel">
            <p className="hp-panel-label">Live availability</p>
            <div className="hp-panel-value">{totals.available}</div>
            <p className="hp-panel-caption">bed spaces free across our halls</p>
            <div className="hp-panel-grid">
              <div>
                <strong>{totals.halls}</strong>
                <span>Hall{totals.halls === 1 ? "" : "s"}</span>
              </div>
              <div>
                <strong>{totals.rooms}</strong>
                <span>Rooms</span>
              </div>
              <div>
                <strong>{totals.beds}</strong>
                <span>Bed capacity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section hp-summary">
        <div className="container hp-summary-inner">
          <div>
            <p className="eyebrow">Accommodation at ACU</p>
            <h2>A residential community built for focused study</h2>
            <p>
              Our halls of residence keep students close to lectures, the
              library and the chapel, in a supervised environment that supports
              both academic work and personal growth. Accommodation is allotted
              each session, so apply early — bed spaces are limited.
            </p>
          </div>
          <ul className="hp-check-list">
            <li>Separate halls for men and women, plus a postgraduate complex</li>
            <li>Warden supervision and on-site security in every block</li>
            <li>Stand-by power and a steady water supply</li>
            <li>Fees paid once per session, recorded on your dashboard</li>
          </ul>
        </div>
      </section>

      <section className="section section-cream" id="halls">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Our halls</p>
            <h2>Choose the hall that fits you</h2>
            <p className="hp-section-lede">
              Availability updates as allocations are made. Apply for any open
              hall — final placement respects your registered gender.
            </p>
          </div>

          <div className="hp-hall-grid">
            {hostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">How it works</p>
            <h2>From application to allocation</h2>
          </div>

          <ol className="hp-steps">
            {ALLOCATION_STEPS.map((step, index) => (
              <li key={step.title}>
                <span className="hp-step-number">{index + 1}</span>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="hp-steps-cta">
            <Link to={`${STUDENT_BASE}/apply`} className="btn btn-navy">
              Start your application
            </Link>
            <Link to={`${STUDENT_BASE}/register`} className="btn btn-outline">
              Create a student account
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-cream" id="facilities">
        <div className="container hp-showcase">
          <div className="hp-showcase-media">
            <img src={complexImage} alt="Student accommodation at ACU" loading="lazy" />
          </div>
          <div className="hp-showcase-copy">
            <p className="eyebrow">What's included</p>
            <h2>Facilities that make halls feel like home</h2>
            <div className="hp-amenities">
              {AMENITIES.map((item) => (
                <div key={item.title} className="hp-amenity">
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="rules-faqs">
        <div className="container hp-columns">
          <div className="hp-panel">
            <p className="eyebrow">House rules</p>
            <h2>Living well together</h2>
            <ul className="hp-rules">
              {RULES.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>

          <div className="hp-panel">
            <p className="eyebrow">FAQs</p>
            <h2>Questions, answered</h2>
            <div className="hp-faq-list">
              {FAQS.map((item) => (
                <div key={item.q} className="hp-faq">
                  <strong>{item.q}</strong>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="hp-cta">
            <div>
              <p className="hp-cta-kicker">Ready to move in?</p>
              <h3>Secure your bed space for the new session.</h3>
            </div>
            <div className="hp-cta-actions">
              <Link to={`${STUDENT_BASE}/apply`} className="btn btn-gold">
                Apply for accommodation
              </Link>
              <Link to={`${STUDENT_BASE}/login`} className="btn btn-outline-light">
                Student login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LoginPage() {
  const { login, isAuthed } = useHostelAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const redirectTo = location.state?.from || `${STUDENT_BASE}/dashboard`;

  if (isAuthed) return <Navigate to={redirectTo} replace />;

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(identifier.trim(), password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="hp-auth-shell">
      <div className="hp-auth">
        <div
          className="hp-auth-visual hp-auth-visual-photo"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <p className="hp-kicker">Hostel portal</p>
          <h2>Welcome back.</h2>
          <p>
            Sign in to apply for accommodation, track your allocation, pay your
            hostel fee and manage maintenance requests.
          </p>
        </div>

        <div className="hp-auth-panel">
          <h3>Student sign in</h3>
          <p className="hp-note">
            Use the email or matric number you registered with.
          </p>

          {error && <div className="hp-alert hp-alert--error">{error}</div>}

          <form onSubmit={onSubmit}>
            <div className="hp-field">
              <label htmlFor="login-identifier">Email or matric number</label>
              <input
                id="login-identifier"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="hp-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button className="btn btn-navy btn-block" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="hp-note hp-note--center">
            New student?{" "}
            <Link to={`${STUDENT_BASE}/register`}>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function RegisterPage() {
  const { register, isAuthed } = useHostelAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    matricNumber: "",
    email: "",
    password: "",
    phone: "",
    gender: "female",
    level: "100",
    department: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (isAuthed) return <Navigate to={`${STUDENT_BASE}/dashboard`} replace />;

  function set(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await register(form);
      navigate(`${STUDENT_BASE}/apply`, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="hp-auth-shell">
      <div className="hp-auth">
        <div
          className="hp-auth-visual hp-auth-visual-photo"
          style={{ backgroundImage: `url(${complexImage})` }}
        >
          <p className="hp-kicker">Hostel portal</p>
          <h2>Create your student account.</h2>
          <p>
            Register once with your matric number and email, then apply for
            accommodation and manage everything from your dashboard.
          </p>
        </div>

        <div className="hp-auth-panel">
          <h3>Student registration</h3>

          {error && <div className="hp-alert hp-alert--error">{error}</div>}

          <form onSubmit={onSubmit}>
            <div className="hp-field">
              <label htmlFor="reg-name">Full name</label>
              <input id="reg-name" value={form.name} onChange={set("name")} required />
            </div>

            <div className="hp-field-row">
              <div className="hp-field">
                <label htmlFor="reg-matric">Matric number</label>
                <input
                  id="reg-matric"
                  value={form.matricNumber}
                  onChange={set("matricNumber")}
                  required
                />
              </div>
              <div className="hp-field">
                <label htmlFor="reg-level">Level</label>
                <select id="reg-level" value={form.level} onChange={set("level")}>
                  {["100", "200", "300", "400", "500", "600"].map((level) => (
                    <option key={level} value={level}>
                      {level} Level
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="hp-field">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                value={form.email}
                onChange={set("email")}
                autoComplete="email"
                required
              />
            </div>

            <div className="hp-field">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                value={form.password}
                onChange={set("password")}
                autoComplete="new-password"
                minLength={6}
                required
              />
              <small>At least 6 characters.</small>
            </div>

            <div className="hp-field-row">
              <div className="hp-field">
                <label htmlFor="reg-phone">Phone</label>
                <input
                  id="reg-phone"
                  value={form.phone}
                  onChange={set("phone")}
                  autoComplete="tel"
                />
              </div>
              <div className="hp-field">
                <label htmlFor="reg-gender">Gender</label>
                <select id="reg-gender" value={form.gender} onChange={set("gender")}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
            </div>

            <div className="hp-field">
              <label htmlFor="reg-department">Department</label>
              <input
                id="reg-department"
                value={form.department}
                onChange={set("department")}
              />
            </div>

            <button className="btn btn-navy btn-block" disabled={busy}>
              {busy ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="hp-note hp-note--center">
            Already registered? <Link to={`${STUDENT_BASE}/login`}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function ApplyPage() {
  const { student, authSend } = useHostelAuth();
  const { hostels } = useHostels();
  const location = useLocation();
  const navigate = useNavigate();

  const sessions = useMemo(sessionOptions, []);
  const eligible = useMemo(() => {
    if (!student?.gender) return hostels;
    return hostels.filter(
      (h) => h.gender === student.gender || h.gender === "mixed",
    );
  }, [hostels, student]);

  const initialHostel = location.state?.hostelId;
  const [session, setSession] = useState(sessions[0]);
  const [hostelId, setHostelId] = useState(
    initialHostel != null ? String(initialHostel) : "",
  );
  const [preferredGender, setPreferredGender] = useState(student?.gender || "");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await authSend("/api/hostel/applications", "POST", {
        session,
        hostelId: hostelId || null,
        preferredGender: preferredGender || null,
        notes: notes.trim() || null,
      });
      navigate(`${STUDENT_BASE}/dashboard`, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="hp-form-shell">
      <div className="container hp-form-layout">
        <div className="hp-form-aside">
          <p className="hp-kicker">Application</p>
          <h1>Apply for accommodation</h1>
          <p>
            Confirm your session and preferred hall. Applications are reviewed by
            Student Affairs and a room is allocated once your payment is
            confirmed.
          </p>
          <ul className="hp-check-list hp-check-list--light">
            <li>One application per session</li>
            <li>Allocation respects your registered gender</li>
            <li>You can apply again in a later session</li>
          </ul>
        </div>

        <div className="hp-form-card">
          <div className="hp-applicant">
            <div>
              <span className="hp-applicant-label">Applicant</span>
              <strong>{student?.name}</strong>
            </div>
            <div>
              <span className="hp-applicant-label">Matric number</span>
              <strong>{student?.matricNumber}</strong>
            </div>
          </div>

          {error && <div className="hp-alert hp-alert--error">{error}</div>}

          <form onSubmit={onSubmit}>
            <div className="hp-field">
              <label htmlFor="apply-session">Session</label>
              <select
                id="apply-session"
                value={session}
                onChange={(event) => setSession(event.target.value)}
              >
                {sessions.map((option) => (
                  <option key={option} value={option}>
                    {option} session
                  </option>
                ))}
              </select>
            </div>

            <div className="hp-field">
              <label htmlFor="apply-hostel">Preferred hall</label>
              <select
                id="apply-hostel"
                value={hostelId}
                onChange={(event) => setHostelId(event.target.value)}
              >
                <option value="">No preference — allocate for me</option>
                {eligible.map((hostel) => (
                  <option key={hostel.id} value={hostel.id}>
                    {hostel.name} · {hostel.availableBeds} beds free
                  </option>
                ))}
              </select>
            </div>

            <div className="hp-field">
              <label htmlFor="apply-gender">Preferred hall gender</label>
              <select
                id="apply-gender"
                value={preferredGender}
                onChange={(event) => setPreferredGender(event.target.value)}
              >
                <option value="">No preference</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>

            <div className="hp-field">
              <label htmlFor="apply-notes">
                Notes for Student Affairs (optional)
              </label>
              <textarea
                id="apply-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Any health, accessibility or placement considerations."
              />
            </div>

            <div className="hp-form-actions">
              <button className="btn btn-navy" disabled={busy}>
                {busy ? "Submitting…" : "Submit application"}
              </button>
              <Link to={`${STUDENT_BASE}/dashboard`} className="btn btn-outline">
                Go to dashboard
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function PaymentPanel({ applications }) {
  const { authSend } = useHostelAuth();
  const { data: payments, reload } = useMine("/api/hostel/payments/mine");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("transfer");
  const [reference, setReference] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await authSend("/api/hostel/payments", "POST", {
        amount: Number(amount) || 0,
        method,
        reference: reference.trim() || null,
        applicationId: applicationId || null,
      });
      setAmount("");
      setReference("");
      reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="hp-panel">
      <p className="eyebrow">Payments</p>
      <h2>Hostel fee</h2>
      <p className="hp-panel-note">
        Submit your payment details and Student Affairs will verify them against
        your application.
      </p>

      {error && <div className="hp-alert hp-alert--error">{error}</div>}

      <form className="hp-inline-form" onSubmit={onSubmit}>
        <div className="hp-field-row">
          <div className="hp-field">
            <label htmlFor="pay-amount">Amount (₦)</label>
            <input
              id="pay-amount"
              type="number"
              min="1"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
            />
          </div>
          <div className="hp-field">
            <label htmlFor="pay-method">Method</label>
            <select
              id="pay-method"
              value={method}
              onChange={(event) => setMethod(event.target.value)}
            >
              <option value="transfer">Bank transfer</option>
              <option value="card">Card</option>
              <option value="cash">Cash / teller</option>
            </select>
          </div>
        </div>

        <div className="hp-field-row">
          <div className="hp-field">
            <label htmlFor="pay-ref">Reference</label>
            <input
              id="pay-ref"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="Teller or transaction number"
            />
          </div>
          {applications.length > 0 && (
            <div className="hp-field">
              <label htmlFor="pay-app">Application</label>
              <select
                id="pay-app"
                value={applicationId}
                onChange={(event) => setApplicationId(event.target.value)}
              >
                <option value="">Unassigned</option>
                {applications.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.session} · {app.hostelName || "No hall yet"}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <button className="btn btn-navy btn-sm" disabled={busy}>
          {busy ? "Submitting…" : "Record payment"}
        </button>
      </form>

      <div className="hp-record-list">
        {payments.length === 0 ? (
          <p className="hp-empty">No payments recorded yet.</p>
        ) : (
          payments.map((payment) => (
            <div key={payment.id} className="hp-record">
              <div>
                <strong>{formatNaira(payment.amount)}</strong>
                <span>
                  {payment.method || "payment"}
                  {payment.reference ? ` · ${payment.reference}` : ""}
                </span>
              </div>
              <div className="hp-record-side">
                <StatusPill status={payment.status} />
                <small>{formatDate(payment.createdAt)}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function MaintenancePanel() {
  const { authSend } = useHostelAuth();
  const { data: requests, reload } = useMine("/api/hostel/maintenance/mine");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("normal");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await authSend("/api/hostel/maintenance", "POST", {
        category,
        priority,
        description: description.trim(),
      });
      setDescription("");
      reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="hp-panel">
      <p className="eyebrow">Maintenance</p>
      <h2>Report a problem</h2>
      <p className="hp-panel-note">
        Tell us what needs fixing and the hostel maintenance team will follow it
        up.
      </p>

      {error && <div className="hp-alert hp-alert--error">{error}</div>}

      <form className="hp-inline-form" onSubmit={onSubmit}>
        <div className="hp-field-row">
          <div className="hp-field">
            <label htmlFor="mtn-category">Category</label>
            <select
              id="mtn-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="general">General</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="furniture">Furniture</option>
              <option value="cleaning">Cleaning</option>
              <option value="security">Security</option>
            </select>
          </div>
          <div className="hp-field">
            <label htmlFor="mtn-priority">Priority</label>
            <select
              id="mtn-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="hp-field">
          <label htmlFor="mtn-description">Description</label>
          <textarea
            id="mtn-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe the problem and where it is."
            required
          />
        </div>

        <button className="btn btn-navy btn-sm" disabled={busy}>
          {busy ? "Submitting…" : "Submit request"}
        </button>
      </form>

      <div className="hp-record-list">
        {requests.length === 0 ? (
          <p className="hp-empty">No maintenance requests yet.</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="hp-record">
              <div>
                <strong>{request.category}</strong>
                <span>{request.description}</span>
              </div>
              <div className="hp-record-side">
                <StatusPill status={request.status} />
                <small>{formatDate(request.createdAt)}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function DashboardPage() {
  const { student, logout } = useHostelAuth();
  const { data: applications, error, reload } = useMine(
    "/api/hostel/applications/mine",
  );

  const current = applications[0] || null;

  return (
    <div className="hp-dashboard">
      <div className="container">
        <div className="hp-dashboard-head">
          <div>
            <p className="eyebrow">Student dashboard</p>
            <h1>Welcome, {student?.name?.split(" ")[0] || "student"}</h1>
            <p className="hp-dashboard-sub">
              {student?.matricNumber}
              {student?.department ? ` · ${student.department}` : ""}
            </p>
          </div>
          <div className="hp-dashboard-actions">
            <Link to={`${STUDENT_BASE}/apply`} className="btn btn-gold btn-sm">
              Apply for a hall
            </Link>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={logout}
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="hp-dash-grid">
          <div className="hp-dash-card">
            <span className="hp-dash-label">Application</span>
            <strong>{current ? STATUS_LABELS[current.status] || current.status : "None"}</strong>
          </div>
          <div className="hp-dash-card">
            <span className="hp-dash-label">Session</span>
            <strong>{current?.session || "—"}</strong>
          </div>
          <div className="hp-dash-card">
            <span className="hp-dash-label">Hall</span>
            <strong>{current?.hostelName || "—"}</strong>
          </div>
          <div className="hp-dash-card">
            <span className="hp-dash-label">Room / bed</span>
            <strong>
              {current?.roomName
                ? `${current.roomName}${current.bedLabel ? ` · ${current.bedLabel}` : ""}`
                : "—"}
            </strong>
          </div>
        </div>

        {error && <div className="hp-alert hp-alert--error">{error}</div>}

        <div className="hp-panel">
          <p className="eyebrow">My applications</p>
          <h2>Accommodation status</h2>

          {applications.length === 0 ? (
            <div className="hp-empty-block">
              <p>
                You have not applied for accommodation yet. Apply for a hall to
                get started.
              </p>
              <Link to={`${STUDENT_BASE}/apply`} className="btn btn-navy btn-sm">
                Apply now
              </Link>
            </div>
          ) : (
            <div className="hp-record-list">
              {applications.map((app) => (
                <div key={app.id} className="hp-record">
                  <div>
                    <strong>{app.session} session</strong>
                    <span>
                      {app.hostelName || "Hall to be allocated"}
                      {app.roomName ? ` · ${app.roomName}` : ""}
                      {app.bedLabel ? ` · Bed ${app.bedLabel}` : ""}
                    </span>
                    {app.adminNote && (
                      <span className="hp-record-note">{app.adminNote}</span>
                    )}
                  </div>
                  <div className="hp-record-side">
                    <StatusPill status={app.status} />
                    <small>{formatDate(app.createdAt)}</small>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className="hp-link-button"
            onClick={reload}
          >
            Refresh
          </button>
        </div>

        <div className="hp-dashboard-columns">
          <PaymentPanel applications={applications} />
          <MaintenancePanel />
        </div>
      </div>
    </div>
  );
}

export default function HostelPortal() {
  return (
    <HostelAuthProvider>
      <Routes>
        <Route index element={<HostelHome />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="apply"
          element={
            <RequireStudent>
              <ApplyPage />
            </RequireStudent>
          }
        />
        <Route
          path="dashboard"
          element={
            <RequireStudent>
              <DashboardPage />
            </RequireStudent>
          }
        />
        <Route path="*" element={<Navigate to={STUDENT_BASE} replace />} />
      </Routes>
    </HostelAuthProvider>
  );
}

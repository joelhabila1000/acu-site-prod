import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { SITE } from "../data/content.js";

const STEPS = [
  {
    title: "Choose Your Programme",
    desc: "Review the list of accredited undergraduate, postgraduate, part-time or foundation courses.",
  },
  {
    title: "Meet the Requirements",
    desc: "Check UTME/O'Level or postgraduate entry requirements for your chosen course.",
  },
  {
    title: "Register on the Portal",
    desc: "Create an account on the admissions portal and complete your application form.",
  },
  {
    title: "Submit &amp; Pay",
    desc: "Upload your documents, pay the application fee, and submit before the deadline.",
  },
];

// Very small client-side email check — not a security boundary, just a UX nicety.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Admissions() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    programme: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.programme.trim())
      next.programme = "Please tell us which programme you're interested in.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // No backend is wired up in this demo project — swap this for a real POST
      // to your admissions API (over HTTPS) or an emailing service.
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", programme: "", message: "" });
    }
  }

  return (
    <>
      <PageHeader
        crumb="Admissions"
        title="Admission Is Currently Open for 2026/2027 Session"
        lede="Follow four simple steps to begin your journey as a Godly intellectual at ACU, Oyo."
      />

      <section className="section">
        <div className="container">
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div className="step-card" key={s.title}>
                <span className="step-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="admissions-actions">
            <a
              href={SITE.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-oxblood"
            >
              Start Undergraduate Application
            </a>
            <a
              href="https://pgs.acu.edu.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-navy"
            >
              Postgraduate Applications
            </a>
            <a
              href="https://acu.edu.ng/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-navy"
            >
              View Course List
            </a>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container form-grid">
          <div>
            <p className="eyebrow">Have a Question?</p>
            <h2>Talk to Admissions</h2>
            <p style={{ color: "var(--ink-500)", maxWidth: 420 }}>
              Send an inquiry and our admissions office will follow up by email
              or phone. For urgent matters, call {SITE.phone} directly.
            </p>
          </div>

          <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
            {submitted && (
              <div className="form-success" role="status">
                Thank you, your inquiry has been recorded. Our admissions team
                will reach out shortly.
              </div>
            )}

            <div className="form-row">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                maxLength={120}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span id="name-error" className="form-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-row-split">
              <div className="form-row">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  maxLength={160}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="form-error">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="form-row">
                <label htmlFor="phone">Phone (optional)</label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={20}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="programme">Programme of interest</label>
              <input
                id="programme"
                type="text"
                placeholder="e.g. B.Sc. Computer Science"
                maxLength={120}
                value={form.programme}
                onChange={(e) => update("programme", e.target.value)}
                aria-invalid={Boolean(errors.programme)}
                aria-describedby={
                  errors.programme ? "programme-error" : undefined
                }
              />
              {errors.programme && (
                <span id="programme-error" className="form-error">
                  {errors.programme}
                </span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="message">Message (optional)</label>
              <textarea
                id="message"
                rows={4}
                maxLength={1000}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-oxblood btn-block">
              Send Inquiry
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

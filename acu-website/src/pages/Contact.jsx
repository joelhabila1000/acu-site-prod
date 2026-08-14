import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { SITE } from "../data/content.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email.trim())) next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // Demo only — connect this to a real HTTPS endpoint before going live.
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  }

  return (
    <>
      <PageHeader
        crumb="Contact"
        title="Get in Touch"
        lede="Reach the university's central offices, or find the faculty and portal you're looking for."
      />

      <section className="section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <h3>Call Us</h3>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            </div>
            <div className="contact-info-card">
              <h3>Email Us</h3>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
            <div className="contact-info-card">
              <h3>Visit Us</h3>
              <p>{SITE.address}</p>
            </div>
          </div>

          <div className="form-grid">
            <div>
              <p className="eyebrow">Send a Message</p>
              <h2>We'd Love to Hear From You</h2>
              <p style={{ color: "var(--ink-500)", maxWidth: 420 }}>
                Whether you're a prospective student, parent, or partner institution, our
                team typically responds within one business day.
              </p>
              <div className="map-frame" style={{ marginTop: 28 }}>
                <iframe
                  title={`${SITE.name} location map`}
                  src={SITE.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
              {submitted && (
                <div className="form-success" role="status">
                  Message sent — thank you for reaching out. We'll respond shortly.
                </div>
              )}

              <div className="form-row">
                <label htmlFor="c-name">Full name</label>
                <input
                  id="c-name"
                  type="text"
                  autoComplete="name"
                  maxLength={120}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "c-name-error" : undefined}
                />
                {errors.name && <span id="c-name-error" className="form-error">{errors.name}</span>}
              </div>

              <div className="form-row">
                <label htmlFor="c-email">Email address</label>
                <input
                  id="c-email"
                  type="email"
                  autoComplete="email"
                  maxLength={160}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "c-email-error" : undefined}
                />
                {errors.email && <span id="c-email-error" className="form-error">{errors.email}</span>}
              </div>

              <div className="form-row">
                <label htmlFor="c-subject">Subject (optional)</label>
                <input
                  id="c-subject"
                  type="text"
                  maxLength={150}
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                />
              </div>

              <div className="form-row">
                <label htmlFor="c-message">Message</label>
                <textarea
                  id="c-message"
                  rows={5}
                  maxLength={1500}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "c-message-error" : undefined}
                />
                {errors.message && (
                  <span id="c-message-error" className="form-error">{errors.message}</span>
                )}
              </div>

              <button type="submit" className="btn btn-oxblood btn-block">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

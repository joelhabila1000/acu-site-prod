import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLibrarySettings } from "../../data/cms.js";
import { apiSend } from "../../lib/api.js";

const SUBJECTS = [
  "Ask a librarian",
  "Book request",
  "Membership / registration",
  "Research support",
  "Electronic resources access",
  "Other",
];

export default function AskLibrarian() {
  const settings = useLibrarySettings();
  const [params] = useSearchParams();
  const requestedBook = params.get("book") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: requestedBook ? "Book request" : "",
    programme: requestedBook,
    message: requestedBook
      ? `I would like to request the following title: ${requestedBook}.`
      : "",
  });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setOk("");
    if (!form.name.trim()) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return setError("Please enter a valid email address.");
    if (!form.message.trim()) return setError("Please enter a message.");

    setSending(true);
    try {
      await apiSend("/api/messages", "POST", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        programme: form.programme,
        message: form.message,
        source: "library",
      });
      setOk("Thank you — your message has reached the library. We will get back to you soon.");
      setForm({ name: "", email: "", phone: "", subject: "", programme: "", message: "" });
    } catch (err) {
      setError(err.message || "Sorry, the message could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <section className="lib-section lib-section--tight" style={{ paddingBottom: 0 }}>
        <div className="lib-container">
          <div className="lib-section-head">
            <h2>Ask a librarian</h2>
            <p>{settings.requestIntro}</p>
          </div>
        </div>
      </section>

      <section className="lib-section" style={{ paddingTop: 24 }}>
        <div className="lib-container">
          <form className="lib-form" onSubmit={submit}>
            {ok ? <div className="lib-form-msg lib-form-msg--ok">{ok}</div> : null}
            {error ? <div className="lib-form-msg lib-form-msg--err">{error}</div> : null}

            <div className="lib-form-row">
              <div className="lib-field">
                <label htmlFor="lib-name">Full name</label>
                <input
                  id="lib-name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                />
              </div>
              <div className="lib-field">
                <label htmlFor="lib-email">Email</label>
                <input
                  id="lib-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="lib-form-row">
              <div className="lib-field">
                <label htmlFor="lib-phone">Phone (optional)</label>
                <input
                  id="lib-phone"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              <div className="lib-field">
                <label htmlFor="lib-subject">Subject</label>
                <select
                  id="lib-subject"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                >
                  <option value="">Choose a topic</option>
                  {SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lib-field">
              <label htmlFor="lib-programme">Title / resource (optional)</label>
              <input
                id="lib-programme"
                value={form.programme}
                onChange={(e) => update("programme", e.target.value)}
                placeholder="e.g. the book or database you are asking about"
              />
            </div>

            <div className="lib-field">
              <label htmlFor="lib-message">Your message</label>
              <textarea
                id="lib-message"
                rows={6}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                required
              />
            </div>

            <div>
              <button className="lib-btn" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send to the library"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

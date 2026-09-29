import { useState } from "react";
import { useAnnouncements } from "../data/cms.js";
import "./AnnouncementBar.css";

const DISMISS_KEY = "acu_dismissed_announcements";

function readDismissed() {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function AnnouncementBar() {
  const announcements = useAnnouncements() || [];
  const [dismissed, setDismissed] = useState(readDismissed);

  const visible = announcements.filter(
    (item) => item.id !== undefined && !dismissed.includes(item.id),
  );
  if (visible.length === 0) return null;

  const current = visible[0];

  function dismiss() {
    const next = [...dismissed, current.id];
    setDismissed(next);
    try {
      localStorage.setItem(DISMISS_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }

  return (
    <div className="announcement-bar" role="status">
      <div className="container announcement-inner">
        <span className="announcement-tag">Notice</span>
        <p>
          <strong>{current.title}</strong>
          {current.content ? ` — ${current.content}` : ""}
        </p>
        <button
          type="button"
          className="announcement-close"
          onClick={dismiss}
          aria-label="Dismiss announcement"
        >
          ×
        </button>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import Counter from "../components/Counter.jsx";
import Reveal from "../components/Reveal.jsx";
import { IMAGES, SDG_GOALS } from "../data/content.js";
import { useDocuments, useSustainability } from "../data/cms.js";
import { formatFileSize } from "../lib/format.js";
import "./Sustainability.css";

const SDG_SITE = "https://www.un.org/sustainabledevelopment";
const goalUrl = (number) => `https://sdgs.un.org/goals/goal${number}`;

// Official UN SDG colours (goal 1 → 17). Rendered as the hero's colour ribbon,
// so the hero speaks the goals' own visual language instead of repeating the
// campus photography used elsewhere on the page.
const SDG_COLORS = [
  "#E5243B",
  "#DDA63A",
  "#4C9F38",
  "#C5192D",
  "#FF3A21",
  "#26BDE2",
  "#FCC30B",
  "#A21942",
  "#FD6925",
  "#DD1367",
  "#FD9D24",
  "#BF8B2E",
  "#3F7E44",
  "#0A97D9",
  "#56C02B",
  "#00689D",
  "#19486A",
];

// Official goal icon artwork, keyed by SDG number, from the bundled goal list.
const GOAL_IMAGES = Object.fromEntries(
  SDG_GOALS.map((goal) => [goal.number, goal.image]),
);
const goalImage = (number) => GOAL_IMAGES[Number(number)] || "";

// Short badge for a download card: the file extension if we have one,
// otherwise the MIME subtype.
function documentLabel(doc) {
  const ext = (doc.fileName || "").split(".").pop();
  if (ext && ext !== doc.fileName && ext.length <= 5) return ext.toUpperCase();
  const sub = (doc.fileType || "").split("/").pop();
  return (sub || "FILE").toUpperCase().slice(0, 4);
}

// Turns any YouTube link (watch, share, embed, shorts) into the embed player
// URL. A start time in the link (e.g. `&t=31s`) is carried over. A bare id is
// accepted too.
function youtubeEmbedUrl(url) {
  if (!url) return "";
  const text = String(url);
  const match = text.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  const id = match ? match[1] : /^[A-Za-z0-9_-]{6,}$/.test(text) ? text : "";
  if (!id) return "";
  const start = youtubeStartSeconds(text);
  return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`;
}

// Reads the `t` (start time) parameter, which YouTube writes as plain seconds
// (`t=31`) or as `h`/`m`/`s` parts (`t=1m30s`).
function youtubeStartSeconds(url) {
  const match = url.match(/[?&]t=([0-9hms]+)/i);
  if (!match) return 0;
  const value = match[1].toLowerCase();
  if (/^\d+$/.test(value)) return Number(value);
  const parts = value.match(/\d+[hms]/g) || [];
  return parts.reduce((total, part) => {
    const n = parseInt(part, 10);
    if (part.endsWith("h")) return total + n * 3600;
    if (part.endsWith("m")) return total + n * 60;
    return total + n;
  }, 0);
}

export default function Sustainability() {
  const s = useSustainability();
  const documents = useDocuments();
  // One static composition: the first hero entry supplies the copy, and the SDG
  // colour ribbon carries the theme instead of a rotating photo carousel.
  const hero = (s.heroSlides && s.heroSlides[0]) || {};
  const videoSrc = youtubeEmbedUrl(s.videoUrl);

  return (
    <div className="sustainability">
      <section className="sustainability-hero" aria-labelledby="hero-heading">
        <div className="sustainability-hero-pattern" aria-hidden="true" />

        <div className="container sustainability-hero-content">
          <div className="sustainability-hero-text">
            {hero.eyebrow && (
              <p className="eyebrow sustainability-hero-eyebrow">
                {hero.eyebrow}
              </p>
            )}
            <h1 id="hero-heading">{hero.title}</h1>
            {hero.lede && <p className="sustainability-hero-lede">{hero.lede}</p>}

            <div className="sustainability-hero-actions">
              <a className="btn btn-gold" href="#the-goals">
                Explore the Goals
              </a>
              <Link className="btn btn-outline" to="/contact">
                Get Involved
              </Link>
            </div>
          </div>
        </div>

        <div className="sustainability-hero-ribbon" aria-hidden="true">
          {SDG_COLORS.map((color) => (
            <span key={color} style={{ background: color }} />
          ))}
        </div>

        <span className="sustainability-scroll-cue" aria-hidden="true" />
      </section>

      <section className="sustainability-stats" aria-label="Sustainability at a glance">
        <div className="container sustainability-stats-grid">
          {s.stats.map((stat, index) => (
            <Reveal className="sustainability-stat" key={stat.label} delay={index * 90}>
              <Counter value={stat.value} className="sustainability-stat-value" />
              <span className="sustainability-stat-label">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container sustainability-intro">
          <Reveal className="sustainability-intro-copy">
            <p className="eyebrow">The 2030 Agenda</p>
            <h2>{s.title}</h2>
            {s.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal
            className="sustainability-intro-aside"
            variant="scale"
            delay={140}
          >
            <img
              src={s.introImage || IMAGES.sdgWheel}
              alt="United Nations Sustainable Development Goals wheel"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      {videoSrc && (
        <section
          className="section section-navy"
          aria-labelledby="video-heading"
        >
          <div className="container">
            <div className="section-head center">
              <p className="eyebrow">Watch</p>
              <h2 id="video-heading">{s.videoTitle}</h2>
              {s.videoIntro && <p>{s.videoIntro}</p>}
            </div>

            <Reveal variant="scale" delay={140}>
              <div className="sustainability-video">
                <iframe
                  src={videoSrc}
                  title={s.videoTitle || "Sustainability video"}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section
        className="section section-cream"
        id="the-goals"
        aria-labelledby="goals-heading"
      >
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">United Nations</p>
            <h2 id="goals-heading">{s.goalsTitle}</h2>
            <p>{s.goalsIntro}</p>
          </div>

          <div className="sdg-grid">
            {SDG_GOALS.map((goal, index) => (
              <Reveal key={goal.number} delay={(index % 3) * 80}>
                <a
                  className="sdg-card"
                  href={goalUrl(goal.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="sdg-card-head">
                    {goal.image && (
                      <img
                        className="sdg-icon"
                        src={goal.image}
                        alt=""
                        width="64"
                        height="64"
                        loading="lazy"
                      />
                    )}
                    <h3>{goal.title}</h3>
                  </div>
                  <p>{goal.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <p className="sdg-source">
            Goal icons and descriptions:{" "}
            <a href={SDG_SITE} target="_blank" rel="noopener noreferrer">
              United Nations — Sustainable Development Goals
            </a>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="priorities-heading">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Our focus</p>
            <h2 id="priorities-heading">{s.prioritiesTitle}</h2>
            <p>{s.prioritiesIntro}</p>
          </div>

          <div className="sustainability-priorities">
            {s.priorities.map((priority, index) => {
              const icon = goalImage(priority.goal);
              return (
                <Reveal key={priority.title} delay={(index % 3) * 80}>
                  <article className="priority-card">
                    {priority.goal && (
                      <a
                        className="priority-card-goal"
                        href={goalUrl(priority.goal)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`SDG ${priority.goal}`}
                      >
                        {icon ? (
                          <img
                            className="sdg-icon"
                            src={icon}
                            alt=""
                            width="64"
                            height="64"
                            loading="lazy"
                          />
                        ) : (
                          `SDG ${priority.goal}`
                        )}
                      </a>
                    )}
                    <h3>{priority.title}</h3>
                    <p>{priority.desc}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-navy" aria-labelledby="contrib-heading">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Our role</p>
            <h2 id="contrib-heading">{s.contributionsTitle}</h2>
            {s.contributionsIntro && <p>{s.contributionsIntro}</p>}
          </div>

          <div className="sustainability-contributions">
            {s.contributions.map((item, index) => (
              <Reveal key={item.title} delay={(index % 4) * 80}>
                <article className="contribution-card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="initiatives-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">On the ground</p>
            <h2 id="initiatives-heading">{s.initiativesTitle}</h2>
          </div>

          <div className="sustainability-initiatives">
            {s.initiatives.map((initiative, index) => (
              <Reveal key={initiative.title} delay={(index % 4) * 80}>
                <article className="step-card">
                  {initiative.goal && (
                    <a
                      className="sdg-chip"
                      href={goalUrl(initiative.goal)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SDG {initiative.goal}
                    </a>
                  )}
                  <h3>{initiative.title}</h3>
                  <p>{initiative.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream" aria-labelledby="stories-heading">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Impact</p>
            <h2 id="stories-heading">{s.storiesTitle}</h2>
            {s.storiesIntro && <p>{s.storiesIntro}</p>}
          </div>

          <div className="sustainability-stories">
            {s.stories.map((story, index) => {
              const src = story.image || IMAGES[story.imageKey];
              return (
                <Reveal key={story.title} delay={(index % 3) * 80}>
                  <article className="story-card">
                    {src && (
                      <div className="story-card-media">
                        <img src={src} alt="" loading="lazy" />
                      </div>
                    )}
                    <div className="story-card-body">
                      {story.category && (
                        <span className="story-card-tag">{story.category}</span>
                      )}
                      <h3>{story.title}</h3>
                      <p>{story.summary}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {s.gallery && s.gallery.length > 0 && (
        <section className="section" aria-labelledby="gallery-heading">
          <div className="container">
            <div className="section-head center">
              <p className="eyebrow">On campus</p>
              <h2 id="gallery-heading">{s.galleryTitle}</h2>
              {s.galleryIntro && <p>{s.galleryIntro}</p>}
            </div>

            <div className="sustainability-gallery">
              {s.gallery.map((item, index) => {
                const src = item.image || IMAGES[item.imageKey];
                if (!src) return null;
                return (
                  <Reveal
                    key={item.caption || `image-${index}`}
                    className="sustainability-gallery-item"
                    variant="scale"
                    delay={(index % 4) * 90}
                  >
                    <figure>
                      <img src={src} alt={item.caption || ""} loading="lazy" />
                      {item.caption && <figcaption>{item.caption}</figcaption>}
                    </figure>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section section-cream" aria-labelledby="collaborators-heading">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Partnerships</p>
            <h2 id="collaborators-heading">{s.collaboratorsTitle}</h2>
            {s.collaboratorsIntro && <p>{s.collaboratorsIntro}</p>}
          </div>

          <div className="sustainability-collaborators">
            {s.collaborators.map((name, index) => (
              <Reveal key={name} variant="scale" delay={index * 60}>
                <span className="collaborator-pill">{name}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="commitments-heading">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Our commitments</p>
            <h2 id="commitments-heading">{s.commitmentsTitle}</h2>
          </div>

          <div className="sustainability-commitments">
            {s.commitments.map((commitment, index) => (
              <Reveal key={commitment.title} delay={(index % 3) * 80}>
                <article className="sustainability-commitment">
                  <span className="sustainability-commitment-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{commitment.title}</h3>
                  <p>{commitment.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section-cream"
        id="documents"
        aria-labelledby="documents-heading"
      >
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Downloads</p>
            <h2 id="documents-heading">{s.documentsTitle}</h2>
            {s.documentsIntro && <p>{s.documentsIntro}</p>}
          </div>

          {documents.length > 0 ? (
            <div className="sustainability-documents">
              {documents.map((doc, index) => (
                <Reveal key={doc.id} delay={(index % 3) * 80}>
                  <a
                    className="document-card"
                    href={doc.url}
                    download={doc.fileName || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="document-card-badge" aria-hidden="true">
                      {documentLabel(doc)}
                    </span>
                    <span className="document-card-body">
                      {doc.category && (
                        <span className="document-card-tag">{doc.category}</span>
                      )}
                      <h3>{doc.title}</h3>
                      {doc.description && <p>{doc.description}</p>}
                      <span className="document-card-meta">
                        {[doc.date, formatFileSize(doc.fileSize)]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </span>
                    <span className="document-card-download" aria-hidden="true">
                      ↓
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="document-empty-state" delay={120}>
              <div className="document-empty-box">
                <span className="document-empty-icon" aria-hidden="true">
                  PDF
                </span>
                <div>
                  <h3>No sustainability reports uploaded yet</h3>
                  <p>
                    Reports, policies and annual documents will appear here once they
                    are uploaded from the admin dashboard.
                  </p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="involved-heading">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Get involved</p>
            <h2 id="involved-heading">{s.involvementTitle}</h2>
            {s.involvementIntro && <p>{s.involvementIntro}</p>}
          </div>

          <div className="sustainability-involvement">
            {s.involvement.map((item, index) => (
              <Reveal key={item.title} delay={(index % 3) * 80}>
                <article className="sustainability-card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="sustainability-actions" delay={120}>
            <a
              href={SDG_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-navy"
            >
              Explore the Goals
            </a>
            <Link to="/contact" className="btn btn-outline-dark">
              Talk to Our Team
            </Link>
          </Reveal>

          <p className="sdg-source">{s.sourceNote}</p>
        </div>
      </section>
    </div>
  );
}

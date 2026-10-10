import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import "./Repository.css";

const REPOSITORY_URL = "https://repository.acu.edu.ng";

const collections = [
  {
    title: "Theses & Dissertations",
    text: "Undergraduate projects, master's dissertations and doctoral theses examined and approved by the University.",
  },
  {
    title: "Journal Articles & Preprints",
    text: "Peer-reviewed articles and preprints authored or co-authored by ACU academic staff.",
  },
  {
    title: "Conference Papers",
    text: "Papers, abstracts and proceedings presented by staff and students at local and international meetings.",
  },
  {
    title: "Books & Book Chapters",
    text: "Monographs, edited volumes and contributed chapters published by the University community.",
  },
  {
    title: "Reports & Policies",
    text: "Institutional reports, annual reviews, working papers and policy documents of lasting value.",
  },
  {
    title: "Datasets & Creative Works",
    text: "Research datasets, audio-visual material and other creative outputs supporting scholarship.",
  },
];

const depositSteps = [
  {
    title: "Prepare your files",
    text: "Have the final, approved version of your work ready as a PDF (or the accepted file type for the material).",
  },
  {
    title: "Create an account",
    text: "Self-register in the repository with your ACU email address, or contact the library for staff-mediated deposit.",
  },
  {
    title: "Upload and describe",
    text: "Add your file and complete the metadata — title, authors, abstract, faculty, department and keywords.",
  },
  {
    title: "Review and publish",
    text: "Library staff check the submission and rights before it is published with a permanent, citable link.",
  },
];

export default function Repository() {
  return (
    <div className="repository-page">
      <section className="repository-hero">
        <div className="container repository-hero-inner">
          <div className="repository-hero-copy">
            <span className="repository-tag">Open access</span>
            <h1>ACU Institutional Repository</h1>
            <p>
              A permanent, open-access home for the research, scholarship and
              creative work of Ajayi Crowther University — freely searchable by
              students, staff and the wider public.
            </p>
            <div className="repository-hero-actions">
              <a
                className="btn btn-gold"
                href={REPOSITORY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse the Repository
              </a>
              <a className="btn btn-outline-light" href="#deposit">
                How to deposit
              </a>
            </div>
          </div>

          <div className="repository-hero-visual" aria-hidden="true">
            <div className="repository-shelf">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="repository-shelf">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="repository-shelf">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      <section className="section repository-about">
        <div className="container repository-about-grid">
          <Reveal className="repository-about-copy">
            <p className="eyebrow">About the repository</p>
            <h2>Preserving ACU scholarship and opening it to the world</h2>
            <p>
              The ACU Institutional Repository collects, preserves and makes
              openly available the intellectual output of the University. It
              brings together theses and dissertations, journal articles,
              conference papers, books and other research materials in one
              searchable archive.
            </p>
            <p>
              Managed by the University Library, the repository supports
              discovery, citation and long-term access, and gives ACU
              researchers a citable, permanent home for their work.
            </p>
          </Reveal>

          <Reveal className="repository-about-card" variant="scale" delay={140}>
            <h3>Managed by the University Library</h3>
            <ul>
              <li>Open access — free to search and read</li>
              <li>Permanent links that can be cited</li>
              <li>Preserved and backed up for the long term</li>
              <li>Discoverable through search engines</li>
            </ul>
            <a
              className="btn btn-navy"
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Search the Repository
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">What you will find</p>
            <h2>Collections across every faculty</h2>
            <p>
              Materials are organised so readers can browse by type, faculty,
              department, author or year.
            </p>
          </div>

          <div className="repository-collections">
            {collections.map((item, index) => (
              <Reveal key={item.title} delay={(index % 3) * 80}>
                <article className="repository-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-navy" id="deposit">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Open access</p>
            <h2>How to deposit your work</h2>
            <p>
              Staff and students can add their research to the repository in
              four steps.
            </p>
          </div>

          <div className="repository-steps">
            {depositSteps.map((step, index) => (
              <Reveal key={step.title} delay={(index % 4) * 80}>
                <article className="repository-step">
                  <span className="repository-step-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section repository-cta">
        <div className="container repository-cta-inner">
          <div>
            <p className="eyebrow">Get started</p>
            <h2>Explore the ACU Institutional Repository</h2>
            <p>
              Search thousands of records, or contact the library for help with
              depositing and using the collections.
            </p>
          </div>
          <div className="repository-cta-actions">
            <a
              className="btn btn-gold"
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse the Repository
            </a>
            <Link className="btn btn-outline-dark" to="/directory/library">
              Back to the Library
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

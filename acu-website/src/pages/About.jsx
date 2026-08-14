import PageHeader from "../components/PageHeader.jsx";
import AdmissionCTA from "../components/AdmissionCTA.jsx";
import { IMAGES } from "../data/content.js";

export default function About() {
  return (
    <>
      <PageHeader
        crumb="About"
        title="A Legacy of Faith, Knowledge and Probity"
        lede="Established by the Church of Nigeria (Anglican Communion), Ajayi Crowther University carries forward a century-old tradition of mission education in Yorubaland."
      />

      <section className="section">
        <div className="container about-grid">
          <div>
            <div className="crest-divider">
              <span className="diamond" aria-hidden="true" />
            </div>
            <h2>Our History</h2>
            <p>
              Ajayi Crowther University, Oyo, was established by the Supra
              Diocesan Board (West) of the Church of Nigeria (Anglican
              Communion). It has its origins in the defunct CMS Training
              Institution, Abeokuta, and the defunct St. Andrew's College, Oyo,
              two institutions with a long history of mission education in
              Nigeria.
            </p>
            <p>
              The University is named after the Right Reverend Samuel Ajayi
              Crowther, the first African Anglican Bishop, a scholar, linguist
              and pioneer of biblical translation into the Yoruba language, a
              namesake whose life of scholarship and service continues to
              inspire the university's motto.
            </p>

            <div className="crest-divider" style={{ marginTop: 40 }}>
              <span className="diamond" aria-hidden="true" />
            </div>
            <h2>Vision Statement</h2>
            <p>
              To be a top-class institution in the pursuit of knowledge and
              scholarship through teaching, learning, research and exemplary
              service to humanity.
            </p>

            <div className="crest-divider" style={{ marginTop: 40 }}>
              <span className="diamond" aria-hidden="true" />
            </div>
            <h2>Mission Statement</h2>
            <p>
              To raise Godly intellectuals who, in their lifelong experience,
              become agents of positive change and transformation in their
              immediate environment, the nation, and the world at large, while
              emphasising the fear of God, sound academic development, excellent
              character formation, hard work, diligence and entrepreneurship.
            </p>
          </div>

          <div>
            <img
              src={IMAGES.aboutSecondary}
              alt="Ajayi Crowther University campus buildings"
              loading="lazy"
              style={{
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-lg)",
                marginBottom: 24,
              }}
            />
            <div className="value-card">
              <h3>Core Values</h3>
              <ul className="value-list">
                <li>Fear of God</li>
                <li>Academic Excellence</li>
                <li>Integrity &amp; Probity</li>
                <li>Discipline &amp; Diligence</li>
                <li>Service to Humanity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-navy" aria-labelledby="motto-heading">
        <div
          className="container"
          style={{ textAlign: "center", maxWidth: 720 }}
        >
          <div className="crest-divider center-divider">
            <span className="diamond" aria-hidden="true" />
          </div>
          <h2 id="motto-heading">"Scientia Probitas"</h2>
          <p style={{ color: "rgba(248,244,233,0.82)" }}>
            Knowledge with Probity, our motto is a daily charge to every student
            and staff member: that learning, however advanced, must be matched
            by integrity of character.
          </p>
        </div>
      </section>

      <AdmissionCTA />
    </>
  );
}

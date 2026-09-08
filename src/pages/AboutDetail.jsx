import PageHeader from "../components/PageHeader.jsx";
import { SITE } from "../data/content.js";
import anthemAudio from "../assets/ACU-Anthem.mp3";

const ABOUT_PAGES = {
  "historical-background": {
    title: "Historical Background",
    lede: "A mission university shaped by a long tradition of Christian education in Nigeria.",
    sections: [
      {
        heading: "A tradition of learning and service",
        paragraphs: [
          "Ajayi Crowther University, Oyo, was established by the Supra Diocesan Board (West) of the Church of Nigeria (Anglican Communion). The University continues a tradition of mission education that has served generations of learners in Nigeria.",
          "Its roots are connected with the CMS Training Institution, Abeokuta, and St. Andrew's College, Oyo. The University is named after the Right Reverend Samuel Ajayi Crowther, the first African Anglican Bishop and a pioneer of biblical translation into Yoruba.",
          "Today, ACU brings scholarship, character formation, faith and service together in its work of raising Godly intellectuals.",
        ],
      },
    ],
  },
  "our-location": {
    title: "Our Location",
    lede: "Ajayi Crowther University is located in the historic town of Oyo, Oyo State, Nigeria.",
    map: true,
    sections: [
      {
        heading: "Visit ACU",
        paragraphs: [
          "The University is located at Ajayi Crowther University, PMB 1066, Oyo Town, Oyo State, Nigeria. Its campus provides a focused environment for learning, worship, research and community life.",
          "For directions, admissions enquiries and other visitor information, please use the University contact details below or visit the Contact page.",
        ],
      },
    ],
    facts: [
      ["Address", SITE.address],
      ["Email", SITE.email],
      ["Telephone", SITE.phone],
    ],
  },
  "vision-and-mission": {
    title: "Vision and Mission",
    lede: "ACU pursues knowledge and scholarship while forming graduates of character, competence and service.",
    sections: [
      {
        heading: "Vision statement",
        paragraphs: [
          "To be a top-class institution in the pursuit of knowledge and scholarship through teaching, learning, research and exemplary service to humanity.",
        ],
      },
      {
        heading: "Mission statement",
        paragraphs: [
          "To raise Godly intellectuals who, in their lifelong experience, become agents of positive change and transformation in their immediate environment, the nation, and the world at large.",
          "The mission emphasises the fear of God, sound academic development, excellent character formation, hard work, diligence and entrepreneurship.",
        ],
      },
    ],
  },
  "acu-anthem": {
    title: "ACU Anthem",
    lede: "The University anthem expresses ACU's calling to faith, learning, character and service.",
    anthem: {
      title: "Ajayi Crowther University Anthem",
      verses: [
        [
          "Hail to you this glorious day",
          "Ajayi Crowther University",
          "All the virtues that you preach",
          "Hard Work, truth, and Honesty",
          "And that what we learn or teach",
          "Must all serve Humanity",
          "All these make us proud to say",
          "Hail our great University!",
        ],
        [
          "Praise to you and those you train",
          "Ajayi Crowther University",
          "All your lessons we'll retain",
          "God grant us the capacity",
          "Your ideas will guide us on",
          "We'll pursue them as our own",
          "Now and till eternity",
          "Hail our great University!",
          "Hail our great University!!",
        ],
      ],
      audioSrc: anthemAudio,
    },
    sections: [
      {
        heading: "A shared identity",
        paragraphs: [
          "The anthem is part of the University's common life. It is sung at ceremonies and gatherings as a reminder that ACU's education is grounded in faith, intellectual effort, integrity and responsibility to society.",
          "Students, staff and alumni share in this tradition as members of a community committed to knowledge with probity.",
        ],
      },
    ],
  },
  "university-logo": {
    title: "University Logo",
    lede: "The ACU identity brings together the University's heritage, Christian foundation and commitment to learning.",
    image: true,
    sections: [
      {
        heading: "An emblem of the University",
        paragraphs: [
          "The University logo is used across official communications, academic materials and campus life. It represents Ajayi Crowther University's distinct identity and its heritage of faith-based higher education.",
          "The logo should be used consistently and respectfully in official University communications.",
        ],
      },
    ],
  },
  "core-values-motto": {
    title: "Core Values and Motto",
    lede: "Scientia Probitas: Knowledge with Probity.",
    values: [
      {
        name: "Fear of God",
        text: "We place reverence for God at the centre of learning, character and community life.",
      },
      {
        name: "Academic Excellence",
        text: "We pursue disciplined thinking, strong scholarship, useful research and a lifelong love of learning.",
      },
      {
        name: "Integrity and Probity",
        text: "We act truthfully, responsibly and transparently, matching knowledge with upright character.",
      },
      {
        name: "Discipline and Diligence",
        text: "We value consistency, hard work and the daily habits that turn purpose into achievement.",
      },
      {
        name: "Service to Humanity",
        text: "We use our education to contribute meaningfully to the University, the nation and the wider world.",
      },
    ],
    sections: [
      {
        heading: "A standard for life and learning",
        paragraphs: [
          "At Ajayi Crowther University, values are not simply words on a page. They shape how we teach, learn, lead, work and serve. They give our academic ambition a moral centre and help our graduates become agents of positive change.",
        ],
      },
    ],
    motto: "Knowledge with Probity",
  },
  "vice-chancellary": {
    title: "Vice-Chancellary",
    lede: "The Vice-Chancellary provides strategic leadership for the University's academic, administrative and spiritual mission.",
    sections: [
      {
        heading: "Leadership and coordination",
        paragraphs: [
          "Working with the Senate, Council, principal officers, staff and students, the Vice-Chancellary coordinates the University's direction and priorities.",
          "Its work supports excellence in teaching and research, staff development, student experience, institutional growth and service to the wider community.",
        ],
      },
    ],
  },
  registry: {
    title: "Registry",
    lede: "The Registry supports the University's academic administration and institutional governance.",
    sections: [
      {
        heading: "Academic and administrative services",
        paragraphs: [
          "The Registry provides administrative coordination for key University processes, including student records, academic governance, examinations, ceremonies and official correspondence.",
          "It helps students and staff navigate the University's regulations and ensures that institutional records are maintained with accuracy, confidentiality and continuity.",
        ],
      },
    ],
  },
  bursary: {
    title: "Bursary",
    lede: "The Bursary manages the University's financial operations and promotes responsible stewardship of institutional resources.",
    sections: [
      {
        heading: "Financial stewardship",
        paragraphs: [
          "The Bursary supports budgeting, accounting, financial reporting, payments and other services required for the effective running of the University.",
          "Its work is guided by accountability, transparency and careful resource management in support of ACU's teaching, research and service mission.",
        ],
      },
    ],
  },
};

export default function AboutDetail({ page }) {
  const content = ABOUT_PAGES[page];

  return (
    <>
      <PageHeader crumb="About" title={content.title} lede={content.lede} />
      <section className="section">
        <div className="container" style={{ maxWidth: 940 }}>
          {content.image && (
            <img
              src={SITE.logo}
              alt={`${SITE.name} logo`}
              style={{ width: 180, margin: "0 auto 42px" }}
            />
          )}
          {content.anthem && (
            <div className="anthem-layout">
              <article className="anthem-lyrics">
                <p className="eyebrow">University anthem</p>
                <h2>{content.anthem.title}</h2>
                {content.anthem.verses.map((verse, verseIndex) => (
                  <div className="anthem-verse" key={verseIndex}>
                    {verse.map((line) => <p key={line}>{line}</p>)}
                  </div>
                ))}
              </article>
              <div className="anthem-player">
                <p className="eyebrow">Listen</p>
                {content.anthem.audioSrc ? (
                  <audio controls preload="metadata">
                    <source src={content.anthem.audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio player.
                  </audio>
                ) : (
                  <p className="anthem-audio-note">
                    The official ACU recording will be available here once the
                    audio file is supplied by the University.
                  </p>
                )}
              </div>
            </div>
          )}
          {content.values && (
            <div className="core-values-grid" aria-label="ACU core values">
              {content.values.map((value, index) => (
                <article className="core-value-card" key={value.name}>
                  <span className="core-value-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h2>{value.name}</h2>
                  <p>{value.text}</p>
                </article>
              ))}
            </div>
          )}
          {content.sections.map((section) => (
            <article key={section.heading} style={{ marginBottom: 42 }}>
              <div className="crest-divider">
                <span className="diamond" aria-hidden="true" />
              </div>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list && (
                <ul className="value-list" style={{ marginTop: 20 }}>
                  {section.list.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </article>
          ))}
          {content.facts && (
            <div className="value-card">
              {content.facts.map(([label, value]) => (
                <p key={label}><strong>{label}:</strong> {value}</p>
              ))}
            </div>
          )}
          {content.map && (
            <div className="map-frame" style={{ marginTop: 28 }}>
              <iframe
                src={SITE.mapEmbed}
                title="Map showing Ajayi Crowther University"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </section>
      {content.motto && (
        <section className="section section-navy" aria-labelledby="motto-title">
          <div className="container motto-panel">
            <p className="eyebrow">Our motto</p>
            <h2 id="motto-title">“{content.motto}”</h2>
            <p>
              Knowledge becomes a force for good when it is guided by integrity,
              faith and service.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
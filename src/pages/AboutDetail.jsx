import PageHeader from "../components/PageHeader.jsx";
import { SITE } from "../data/content.js";
import anthemAudio from "../assets/ACU-Anthem.mp3";
import vcPhoto from "../assets/PRINCIPAL OFFICERS/Vice chancellor.png";

const ABOUT_PAGES = {
  "historical-background": {
    title: "Historical Background",
    lede: "A mission university shaped by a long tradition of Christian education in Nigeria.",
    sections: [
      {
        heading: "A tradition of learning and service",
        paragraphs: [
          "The Ajayi Crowther University, Oyo was established by the Supra Diocesan Board (West) of the Church of Nigeria (Anglican Communion), has its origins in the defunct CMS training institution, Abeokuta and the defunct St. Andrews College, Oyo.",
          "The University started as CMS Training Institution in Abeokuta in 1853 from where it was relocated to Lagos (1868 to 1896). In March 1896, it was transplanted to Oyo retrospectively in 1920.",
          "At inception, St. Andrews College, Oyo produced holders of Grade II Teachers Certificate while the Divinity Course for training church ministers was added to the curriculum between 1910 and 1942 and the proprietorship of the College was transferred from CMS, London to the Church of Nigeria (Anglican Communion). A salient feature in the History of St. Andrews is that it became welded to the church as a snail is inseparably linked with its shell.",
          "In 1977 Government took over the control and administration of all schools in the Nigerian Federation and with this development the Church of Nigeria was divested of her Proprietorship of the College. However, the St. Andrews College Old Boys Association (SACOBA) interest and by extension that of the Church, in the growth and development of St. Andrews did not wane. Thus, in response to SACOBA's petition, the erstwhile Oyo State Government upgraded the Institution to NCE campus in 1980 and to the full fledged College of Education in 1985.",
          "The dream of all Andrians (products of St. Andrews College) and their well wishers as well as the Church of Nigeria (Anglican Communion) was that St. Andrews College, Oyo, should ultimately be transformed into a full-fledged University, given her success story and her pioneering role as the Precursor of Tertiary Education in Nigeria. The final step towards fulfilling this dream was taken on 7 September, 1999 when the Church of Nigeria granted SACOBA's request for the establishment of Ajayi Crowther University, Oyo at the site of the former St. Andrews College, Oyo under the proprietorship of the Church. Having satisfied the rigorous criteria prescribed by the National Universities Commission (NUC) for the establishment of Universities in Nigeria, Ajayi Crowther University (ACU) was granted license to operate as a Private University in Nigeria on 7 January 2005.",
          "The University is named after the late Samuel Ajayi Crowther, the first African Bishop who first translated the Bible into Yoruba and some local languages. His Episcopal Ministry covered the entire West African sub-continent.",
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
    lede: "The ACU identity brings together the University's heritage, Christian foundation and commitment to learning. Blue, white and gold are the University's colours. The blue colour signifies love of humanity and the white, peace, while gold denotes treasure.",
    image: true,
    sections: [
      {
        heading: "DESCRIPTION",
        paragraphs: [
          "The logo has a blue background, bounded by a white format. On this is a white cross based on a golden square on which a book with a red trim and a beaming torch are superimposed. At the base, the logo shows a scroll which encloses the motto.",
        ],
      },
      {
        heading: "INTERPRETATION",
        paragraphs: [
          "The open book signifies knowledge and portends education in all its ramifications",
          "and the cross signifies an intersection of the meeting of people and minds seeking for knowledge, or a confluence of a group coming together.",
          "The beaming torch with its rays of light signifies life and inspiration engendered by knowledge, the golden square stands for high quality, endurance and academic distinction and excellence,",
          "the blue colour signifies love of humans,",
          "the white signifies peace while the red stands for the central role of education in national development.",
        ],
      },
      {
        heading: "UNIVERSITY COLOR",
        paragraphs: [
          <>
            Blue, white and gold. The{" "}
            <span style={{ color: "#1e6fdb", fontWeight: 600 }}>blue</span>{" "}
            colour signifies love of humanity and the{" "}
            <span
              style={{
                color: "#ffffff",
                background: "#0b1f4a",
                padding: "0 4px",
                borderRadius: 3,
                fontWeight: 600,
              }}
            >
              white
            </span>
            , peace, while{" "}
            <span
              style={{
                color: "#c9a227",
                fontWeight: 700,
                textShadow: "0 0 1px rgba(0,0,0,0.25)",
              }}
            >
              gold
            </span>{" "}
            denotes treasure.
          </>,
        ],
      },
    ],
  },
  "core-values-motto": {
    title: "Core Values and Motto",
    values: [
      {
        name: "Excellence",
        text: "We Empower students to achieve excellence through knowledge, discipline, and continuous learning.",
      },
      {
        name: "Spirituality",
        text: "We nurture faith, character, and spiritual growth for a purposeful life.",
      },
      {
        name: "Moral rectitude",
        text: "We promote integrity, discipline, and strong moral values in every student.",
      },
      {
        name: "Hardwork and Diligence",
        text: "We encourage dedication, perseverance, and a strong work ethic.",
      },
      {
        name: "Entrepreneurship",
        text: "We inspiring creativity, innovation, and self-reliance for a successful future.",
      },
    ],
    sections: [
      {
        heading: "",
        paragraphs: [],
      },
    ],
    motto: "Knowledge with Probity",
  },
  "vice-chancellary": {
    title: "Vice-Chancellary",
    lede: "The Vice-Chancellary provides strategic leadership for the University's academic, administrative and spiritual mission.",
    vcImage: {
      src: vcPhoto,
      alt: "Professor (Mrs.) Ebunoluwa Olufemi Oduwole, Vice Chancellor of Ajayi Crowther University",
      caption:
        "Professor (Mrs.) Ebunoluwa Olufemi Oduwole, FNAL, FCIA, FEMTAN — Vice Chancellor, Ajayi Crowther University",
    },
    sections: [
      {
        heading:
          "PROFESSOR (MRS.) EBUNOLUWA OLUFEMI ODUWOLE, FNAL, FCIA, FEMTAN, THE FIRST FEMALE AND 5TH VICE CHANCELLOR OF THE AJAYI CROWTHER UNIVERSITY, OYO",
        paragraphs: [
          <article key="vc-bio">
            <p>
              Professor (Mrs.) <strong>Ebunoluwa Olufemi Oduwole</strong>,
              Fellow of the Nigerian Academy of Letters (FNAL), Fellow of the
              Chartered Institute of Administration (FCIA), is a rare amalgam of
              scholarship, integrity, purpose, and vision. Her ascendancy as the{" "}
              <strong>
                fifth substantive and first female Vice Chancellor of Ajayi
                Crowther University
              </strong>{" "}
              is more than a milestone; it is a clarion call to the potential of
              every daughter of the Nigerian nation.
            </p>

            <p>
              From the Yoruba root of her names, <em>Ebunoluwa</em> ("God's
              gift") and <em>Olufemi</em> ("God loves me"), flows a life of
              service, intellect, and rooted dignity. She is indeed a gift to
              the academia; loved and respected, she walks in the heavy shoes of
              women of worth: women like Funmilayo Ransome-Kuti, Margaret Ekpo,
              Grace Alele-Williams, and Moremi Ajasoro, those who carved space
              where none existed. She now carves a legacy in a seat never before
              held by a woman in this University.
            </p>

            <h2>Early Life and Education</h2>
            <p>
              Professor (Mrs.) Ebunoluwa Olufemi Oduwole was born on{" "}
              <strong>September 10, 1962</strong>, into the family of the late
              Very Revd (Sir) Fredrick Oyenuga and Helen Olufunke Womiloju of
              Ogere–Remo, Ogun State, Nigeria. Her father was a principal of
              Christian schools (Methodist and Wesleyan), a Methodist priest, a
              Presbyterian in the Cathedral, and a Knight of the Order of
              Charles Wesley. Her mother was the daughter of the Baba Ijo of the
              Methodist Church in Ogere-Remo.
            </p>
            <p>
              She attended United Missionary College (UMC) Demonstration School,
              St Anne's School, Molete, Ibadan, and Remo Secondary School,
              Sagamu, Ogun State. She holds a{" "}
              <strong>PhD, M.A., and B.A. in Philosophy</strong> from the
              University of Ibadan, Nigeria, and an{" "}
              <strong>MSc in Bioethics</strong> from a consortium of
              universities, including Katholieke University, Leuven, Belgium;
              Radboud University, Nijmegen, Netherlands; and the University of
              Padova, Italy.
            </p>
            <p>
              As an accomplished Professor of repute, Prof. (Mrs.) Ebunoluwa
              Oduwole has been teaching, conducting research, and engaging in
              community development for <strong>forty years</strong> across
              universities in Nigeria and internationally, successfully
              graduating students at both undergraduate and postgraduate levels
              from at least five universities in Nigeria and other African
              countries. She has served as a visiting lecturer, external
              examiner, and external assessor for Professorial Cadre
              appointments to various Departments of Philosophy in and outside
              Nigeria.
            </p>
            <p>
              She is a torchbearer of intellect, ethics, and vision: a woman
              whose life and legacy embody the union of tradition and
              transformation. Her rise to the office of Vice Chancellor, the
              first woman to hold this position in the institution's history, is
              no accident of time, but the consequence of a life lived with
              unyielding purpose, deep-rooted discipline, and unwavering
              service. She comes not merely to occupy a seat, but to redefine
              what it means to lead: with scholarship as her scepter, integrity
              as her robe, and generational uplift as her charge. This is not
              just a new chapter; it is the turning of the page towards a future
              led by wisdom, guided by conscience, and grounded in a truth we
              must all now affirm: that excellence knows no gender, and destiny
              bows to no ceiling.
            </p>

            <h2>Contributions, Research and Thought Leadership</h2>
            <p>
              Since her promotion to the rank of Professor in{" "}
              <strong>October 2013</strong>, she has served with distinction,
              weaving together scholarship and leadership in African Philosophy,
              Ethics, and Bioethics, fields she has enriched by insisting on
              their cultural relevance and by interrogating colonial legacies in
              thought. Her works, books, chapters, journal articles, venture
              boldly into morally complex terrain: end-of-life decision-making,
              moral dignity, organ transplantation, gender equality, and the
              ethics of artificial intelligence, all viewed through African
              cultural lenses such as Omoluwabi, communitarianism, and
              Iku-ya-J'esin. She treats Philosophy not as ivory-tower
              abstraction, but as living discourse that comforts, challenges,
              and shapes society.
            </p>
            <p>
              Professor Oduwole is also an ethics practitioner: she is an
              accredited facilitator for the National Health Research Ethics
              Committee (NHREC), a mentor in research ethics and methodologies,
              and a consultant, serving in institutions across Nigeria and in
              The Gambia. Her current research agenda spans global issues,
              artificial intelligence, genome editing, gender-based violence,
              all the while maintaining intimate, local relevance.
            </p>
            <p>
              Prof. (Mrs.) Ebunoluwa Olufemi Oduwole has a remarkable teaching
              acumen and works with diverse, all-inclusive teaching methods. She
              is dedicated, organised, and committed; self-motivated and a
              successful administrator par excellence. She is resilient, a work
              in progress, a multitasker, result-driven, a goal-getter,
              energetic, honest, reliable, dependable, resourceful, ethical in
              all dealings, a team player, amiable, and God-fearing. She enjoys
              modelling for upcoming academics and youths in general, and is
              deeply engaging, welcoming feedback from students to enhance her
              academic and personal growth.
            </p>
            <p>
              Prof. (Mrs.) Ebunoluwa Olufemi Oduwole is deeply rooted in
              Anglican Christian values and ideals. She is a member of the
              Olabisi Onabanjo University Chaplaincy, a dutiful clergy wife,
              Bible study teacher, and a member and Matron of many Christian
              Societies within the Anglican Communion of Nigeria. She is also a
              matron to societies within her community, demonstrating her
              excellent relationship between town and gown.
            </p>

            <h3>Awards</h3>
            <ul>
              <li>
                <strong>Dean's Award:</strong> Certificate of Merit for the Best
                Student in the Faculty of Arts, University of Ibadan, Nigeria
                (1981/82 Session)
              </li>
              <li>
                <strong>Alvan Ikoku Prize in Philosophy:</strong> Best Graduating
                Student in Philosophy, University of Ibadan (1982/83 Session)
              </li>
              <li>
                <strong>Long Service Award,</strong> Olabisi Onabanjo University,
                Ago-Iwoye (February 9, 2006)
              </li>
              <li>
                <strong>Economic European Commission Scholarship Award</strong>{" "}
                (Erasmus Mundus Scholarship in Bioethics), 2011/2012
              </li>
            </ul>

            <h2>Leadership, Service, and Institutional Impact</h2>

            <h3>Overview</h3>
            <ol>
              <li>She has won several awards and grants to her credit.</li>
              <li>
                She has facilitated entrepreneurship training programmes for
                students within and outside her university.
              </li>
              <li>
                She has stewarded curriculum development, accreditation panels,
                institutional governance, committees on strategic planning, and
                oversight roles, always with discipline, vision, and ethical
                consistency.
              </li>
            </ol>

            <h3>Key Roles Held</h3>
            <ul>
              <li>
                <strong>Deputy Vice Chancellor</strong> (Academic and
                Administration, then Administration)
              </li>
              <li>
                <strong>Dean of the Faculty of Arts</strong>
              </li>
              <li>
                <strong>Head of Department</strong>
              </li>
              <li>And other institutional leadership roles</li>
            </ul>

            <h3>Projects, Grants, and Contributions</h3>
            <ul>
              <li>
                Primary Faculty Advisor for Olabisi Onabanjo University Students
                in Free Enterprise (SIFE)/ENACTUS, an entrepreneurial programme
                for students.
              </li>
              <li>
                Leader of the Ethics Safeguarding Committee for "The Application
                of an Artificial Intelligence (AI) Mobile Reporting Tool and
                Data Science to Mitigate Gender-Based Violence and Security
                Challenges During and Post-COVID-19 in Nigeria," a{" "}
                <strong>$1 million project</strong> executed by the
                International Development Research Centre (IDRC/CRDI, Canada),
                Towntalk, and the Social Science Academy of Nigeria (SSAN).
              </li>
              <li>
                Recipient of grants from various sponsors at multiple stages of
                her career.
              </li>
              <li>
                <strong>Principal Investigator,</strong> TETFund National
                Research Fund Project on "Developing an Ethical and
                Culture-Sensitive Framework for the Health Workforce and
                Stakeholders Implementing Quarantine and Isolation (Q&amp;I) in
                Nigeria."
              </li>
              <li>
                Co-researcher on three other institution-based research projects
                sponsored by TETFund.
              </li>
              <li>
                Co-lead on the Scaling Up Research Ethics and Research Integrity
                (SURER) Project, an NIH-sponsored project at the Centre for
                Bioethics, Ibadan, Nigeria, where she teaches a diverse range of
                topics.
              </li>
              <li>
                Co-researcher on a study of Jedi-Jedi in Nigeria and the risk of
                tooth decay, a multidisciplinary, quantitative, collaborative
                research project.
              </li>
              <li>
                Co-researcher in a collaborative qualitative study of Yoruba
                culture and the utilisation of modern dental services for oral
                health research.
              </li>
              <li>
                Co-researcher and Ethics Expert in the PROWASH Concept Team, a
                collaborative Water, Sanitation, and Hygiene (WASH) project.
              </li>
              <li>
                Key contact person and co-researcher on the British
                Council-sponsored project on Sustainable Funding Models in
                Higher Education, conducted by Swansea University's School of
                Entrepreneurship Studies and Olabisi Onabanjo University,
                involving numerous successful entrepreneurs and agropreneurs in
                Nigeria.
              </li>
              <li>
                Presenter at the 2020 WHO Satellite Meeting in Singapore on
                ethics and human genome editing.
              </li>
              <li>
                Presenter on the COVID-19 TRIPS Waiver at the SADC (South
                African Commission) in 2021.
              </li>
              <li>
                Advisory Board member, consultant, and mentor in research
                ethics, methodology, and curriculum development/evaluation for
                the Gambia Research Ethics and Methodology Training Initiative
                (GAMRETI), University of The Gambia, supported by the NIH
                Fogarty International Center.
              </li>
              <li>
                Recipient of Women of Travel Grants to attend the Global Forum
                on Bioethics Research (GFBR) meetings in Annecy, France; Cape
                Town, South Africa; and Singapore, and is due to attend the 2025
                GFBR Meeting in Ghana.
              </li>
            </ul>

            <h3>Memberships and Affiliations</h3>
            <ul>
              <li>
                Accredited Facilitator, National Health and Research Ethics
                Committee of Nigeria (NHREC), Abuja
              </li>
              <li>
                Member, Olabisi Onabanjo University Teaching Hospital Health
                Ethics Committee, Nigeria
              </li>
              <li>
                Faculty Member, Centre for Bioethics and Research, Nigeria
              </li>
              <li>
                Faculty Member, Department of Bioethics and Humanities,
                University of Ibadan
              </li>
              <li>
                Member, Consortium of Universities for Global Health (CUGH)
              </li>
              <li>
                National Treasurer, Nigerian Philosophical Association (NPA)
              </li>
              <li>
                Pro-tem Secretary, Nigerian Philosophical Association (NPA)
              </li>
              <li>Member, Philosophers Association of Nigeria (PAN)</li>
              <li>Member, Bioethics Society of Nigeria (BESON)</li>
              <li>Fellow, Nigerian Academy of Letters (FNAL)</li>
            </ul>
          </article>,
        ],
      },
    ],
  },
registry: {
  title: "Registry",
  lede: "The Registry supports the University's academic administration and institutional governance.",
  sections: [
    {
      heading: "Schedule of Duties of the Registrar:",
      paragraphs: [],
      list: [
        "Responsible to the Vice-Chancellor for the day-to-day efficient administration and management services of the University as Chief Administrative Officer (except in financial matters that are in the purview of Bursary).",
        "Serving as the Secretary to the Governing Council, Senate, Congregation, Convocation and their Committees for which he may appoint Officers to act on his behalf, if required while coordinating all meetings of administrative committees.",
        "Serving as Member/Secretary of relevant University Committees for the purpose of record keeping, rules compliance and instrumentation of statutes for policy formulation, decision making and implementation of decisions by officers of the University and all statutory bodies.",
        "Custodian of records, rules of proceedings, minutes and coordination of secretarial duties for office management in areas of record of meetings and proper keeping of statutory/relevant records for compliance with University rules and administrative guidance.",
        "Custodian of the seal of the University as required and determined by Council for issuance of Certificate and records of the University including signing of Certificates.",
        "Responsible for external communications, advertisement, announcements and general correspondences of the University subject to directions of the Vice-Chancellor.",
        "Serving as an Adviser to the Vice-Chancellor on administrative matters including advising on periodic review of condition of service, staff welfare and discipline.",
        "Promoting interpersonal and good working relationships between all categories of staff in the University and ensuring compliance with University rules and regulations and application of appropriate disciplinary measures as required by the rule book.",
        "Initiating and advising on training needs and manpower development of University staff and responsible for the interpretation of circulars/regulations on personnel matters including staff entitlements subject to further appeal to the Vice-Chancellor and Council.",
        "Taking charge of the Registry by providing leadership as the custodian and interpreter of the University rules and regulations and the gatekeeper of records.",
        "Responsible for the harmonization of the work of all Faculty Officers and Administrative Secretaries in the various organs of the University (though the Officers report to their respective Deans duties in the day-to-day administration of the affairs of the Faculty/School).",
        "Performing any other duties as required by law as directed by the Governing Council or the Vice-Chancellor in line with functions/schedule of duties of Registrar/Registry in the University.",
      ],
    },
  ],
},
bursary: {
  title: "Bursary",
  lede: "The Bursary manages the University's financial operations and promotes responsible stewardship of institutional resources.",
  sections: [
    {
      heading: "Schedule of Duties of the Bursar:",
      paragraphs: [],
      list: [
        "Responsible to the Vice-Chancellor for the day-to-day efficient management of the financial affairs of the University as the Chief Financial Officer.",
        "Serving as the Secretary to the Finance and General Purposes Committee and providing professional advice on all financial matters to the Governing Council, the Vice-Chancellor, Senate and other statutory bodies of the University.",
        "Preparing and presenting the annual budget of the University for the approval of the Governing Council and monitoring its implementation in line with approved estimates and guidelines.",
        "Preparing and presenting the annual financial statements of the University, including statements of income and expenditure, statements of financial position, and other statutory reports for audit and publication.",
        "Coordinating the University's internal audit, external audit and inspections, and ensuring that all audit queries are promptly and satisfactorily resolved.",
        "Safeguarding the assets and funds of the University through sound internal control systems, cash management, investment policies and prudent treasury operations.",
        "Managing the University's payroll, pensions, gratuities, allowances and other staff emoluments in line with approved regulations and government circulars.",
        "Managing students' fees, charges and other internally generated revenue, and ensuring accurate billing, collection and reconciliation of all receipts.",
        "Maintaining proper books of accounts and other financial records of the University in accordance with relevant accounting standards, statutes and regulations.",
        "Advising the Vice-Chancellor and Governing Council on the financial viability of new projects, contracts, procurements and other commitments of the University.",
        "Supervising the Bursary staff and ensuring capacity development, discipline and efficient service delivery in the day-to-day operations of the department.",
        "Performing any other duties as required by law as directed by the Governing Council or the Vice-Chancellor in line with functions/schedule of duties of Bursar/Bursary in the University.",
      ],
    },
  ],
},
};

export default function AboutDetail({ page }) {
  const content = ABOUT_PAGES[page];

  return (
    <>
      {/* Hover effects for the core value cards */}
      <style>{`
        .core-values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-bottom: 42px;
        }

        .core-value-card {
          position: relative;
          padding: 28px 24px;
          background: #ffffff;
          border: 1px solid rgba(11, 31, 74, 0.08);
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(11, 31, 74, 0.04);
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease,
            background 0.35s ease;
          overflow: hidden;
          cursor: pointer;
          will-change: transform;
        }

        .core-value-card::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          background: linear-gradient(180deg, #c9a227, #0b1f4a);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.35s ease;
        }

        .core-value-card:hover,
        .core-value-card:focus-visible {
          transform: translateY(-8px);
          box-shadow: 0 18px 40px rgba(11, 31, 74, 0.16);
          border-color: rgba(201, 162, 39, 0.45);
          background: #fffdf7;
          outline: none;
        }

        .core-value-card:hover::before,
        .core-value-card:focus-visible::before {
          transform: scaleY(1);
        }

        .core-value-number {
          display: inline-block;
          font-size: 2rem;
          font-weight: 700;
          color: rgba(11, 31, 74, 0.12);
          line-height: 1;
          margin-bottom: 12px;
          transition: color 0.35s ease, transform 0.35s ease;
        }

        .core-value-card:hover .core-value-number,
        .core-value-card:focus-visible .core-value-number {
          color: #c9a227;
          transform: translateX(4px);
        }

        .core-value-card h2 {
          font-size: 1.15rem;
          margin: 0 0 10px;
          color: #0b1f4a;
          transition: color 0.35s ease;
        }

        .core-value-card p {
          margin: 0;
          color: #4a5568;
          line-height: 1.6;
          transition: color 0.35s ease;
        }

        .core-value-card:hover p,
        .core-value-card:focus-visible p {
          color: #2d3748;
        }

        @media (prefers-reduced-motion: reduce) {
          .core-value-card,
          .core-value-card::before,
          .core-value-number,
          .core-value-card h2,
          .core-value-card p {
            transition: none;
          }
          .core-value-card:hover,
          .core-value-card:focus-visible {
            transform: none;
          }
        }
      `}</style>

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
                    {verse.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
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
                <article
                  className="core-value-card"
                  key={value.name}
                  tabIndex={0}
                  aria-label={value.name}
                >
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
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {section.list && (
                <ul className="value-list" style={{ marginTop: 20 }}>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
          {content.facts && (
            <div className="value-card">
              {content.facts.map(([label, value]) => (
                <p key={label}>
                  <strong>{label}:</strong> {value}
                </p>
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
              The Motto “Scientia Probitas” meaning “Knowledge with Probity”
              sums up the University’s philosophy, goals and objectives which
              informed the founding of the University by the Supra West Board of
              the Anglican Communion (Church of Nigeria).
            </p>
          </div>
        </section>
      )}
    </>
  );
}
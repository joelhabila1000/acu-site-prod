// Plain-JS copies of the site's default content, used to seed the database.
// Kept free of image imports (which the React files use) so it can run in Node.
// Images are stored as `null`; the frontend falls back to bundled assets, and
// uploaded images override them with a URL.

const SITE = {
  name: "Ajayi Crowther University",
  shortName: "ACU, Oyo",
  motto: "Scientia Probitas",
  mottoMeaning: "Knowledge with Probity",
  tagline: "Raising Godly Intellectuals",
  logo: null,
  phone: "+234 814 592 0637",
  email: "info@acu.edu.ng",
  address: "Ajayi Crowther University, PMB 1066, Oyo Town, Oyo State, Nigeria",
  applyUrl: "https://apply.acu.edu.ng/",
  mapEmbed:
    "https://www.google.com/maps?q=Ajayi+Crowther+University,+Oyo&z=16&t=k&output=embed",
  social: {
    facebook: "https://www.facebook.com/ACU.Oyo/",
    instagram: "https://www.instagram.com/acuoyo/",
    linkedin: "https://ng.linkedin.com/school/acu-ng/",
    x: "https://x.com/ACUOyo",
    youtube: "https://www.youtube.com/channel/UC7pciK9IUlqgP3VziMDmvPA",
  },
};

const CONTACT = {
  address: SITE.address,
  phone: SITE.phone,
  email: SITE.email,
  mapEmbed: SITE.mapEmbed,
  social: SITE.social,
};

const NAV_LINKS = [
  { label: "Home", path: "/" },
  {
    label: "About",
    path: "/about",
    children: [
      {
        label: "Administration",
        path: "/about",
        children: [
          { label: "Principal Officers", path: "/about/principal-officers" },
          { label: "Vice-Chancellary", path: "/about" },
          { label: "Registry", path: "/about" },
          { label: "Bursary", path: "/about" },
        ],
      },
    ],
    megaMenu: [
      {
        heading: "About ACU",
        items: [
          { label: "Historical Background", path: "/about/historical-background" },
          { label: "Our Location", path: "/about/our-location" },
          { label: "Vision and Mission", path: "/about/vision-and-mission" },
          { label: "ACU Anthem", path: "/about/acu-anthem" },
          { label: "University Logo", path: "/about/university-logo" },
          { label: "Core Values & Motto", path: "/about/core-values-motto" },
        ],
      },
      {
        heading: "Administration",
        items: [
          { label: "Principal Officers", path: "/about/principal-officers" },
          { label: "Vice-Chancellary", path: "/about/vice-chancellary" },
          { label: "Registry", path: "/about/registry" },
          { label: "Bursary", path: "/about/bursary" },
        ],
      },
    ],
  },
  { label: "Academics", path: "/academics" },
  { label: "Admissions", path: "/admissions" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const PORTALS = [
  { label: "Postgraduate", url: "/portal/postgraduate" },
  { label: "Undergraduate", url: "https://apply.acu.edu.ng/" },
  { label: "Part-Time", url: "#" },
  { label: "Foundation", url: "https://cpfpapply.acu.edu.ng" },
];

const STATS = [
  { value: 13, label: "Reputable Faculties" },
  { value: 51, label: "Accredited Courses" },
  { value: 3, label: "Fully Stocked Libraries" },
  { value: 4, label: "Strategic Campuses" },
];

const PROGRAMMES = [
  {
    title: "Pre-Degree / Foundation",
    desc: "A one-year bridging programme for candidates preparing for direct entry into 100-level.",
    url: "",
    tag: "JUPEB",
  },
  {
    title: "Undergraduate",
    desc: "Full-time bachelor's degree programmes across 13 faculties, taught by seasoned scholars.",
    url: "",
    tag: "B.Sc / B.A / LL.B",
  },
  {
    title: "Part-Time",
    desc: "Flexible weekend and evening study for working professionals across our study centres.",
    url: "",
    tag: "Weekend & Evening",
  },
  {
    title: "Postgraduate",
    desc: "PGD, Master's and Doctoral research programmes supervised by distinguished faculty.",
    url: "",
    tag: "PGD / M.Sc / Ph.D",
  },
];

const PILLARS = [
  {
    title: "Moral & Spiritual Development",
    desc: "A holistic education that nurtures moral and spiritual growth, fostering a community rooted in empathy, integrity and diverse perspectives.",
  },
  {
    title: "Flexible School Fee Regime",
    desc: "A fee structure designed to accommodate students' financial needs, with flexible plans that break tuition into manageable instalments.",
  },
  {
    title: "Comfortable Accommodation",
    desc: "Hostels that offer comfortable living spaces, enabling students to excel both academically and personally.",
  },
];

// `imageKey` references the bundled IMAGES map on the frontend; `image` is an
// optional uploaded URL that takes precedence.
const HERO_SLIDES = [
  {
    imageKey: "heroCampusOne",
    image: null,
    eyebrow: "A Community of Excellence",
    title: "Welcome to Ajayi Crowther University, Oyo",
    subtitle: "Where We Raise Godly Intellectuals",
    description:
      "A faith-based Anglican institution forming scholars of sound character, deep knowledge and lifelong integrity across thirteen faculties on four strategic campuses in Oyo State, Nigeria.",
  },
  {
    imageKey: "heroCampusTwo",
    image: null,
    eyebrow: "Faith, Learning and Service",
    title: "Shaping Purposeful Leaders for a Better Tomorrow",
    subtitle: "Academic excellence rooted in character",
    description:
      "From the classroom to the community, ACU equips students to lead with wisdom, confidence and integrity in every field of life and service.",
  },
  {
    imageKey: "heroCampusThree",
    image: null,
    eyebrow: "A Future Built on Vision",
    title: "Discover an Environment That Inspires Greatness",
    subtitle: "Innovation, scholarship and spiritual growth",
    description:
      "Our students learn in a vibrant, values-driven environment designed to unlock potential, expand opportunity and nurture a life of impact.",
  },
  {
    imageKey: "heroCampusFour",
    image: null,
    eyebrow: "Purpose in Motion",
    title: "A Campus Experience Designed for Growth",
    subtitle: "Learning that inspires action and excellence",
    description:
      "ACU brings together mentorship, discipline and opportunity so every student can build a life of meaning, leadership and lasting impact.",
  },
  {
    imageKey: "heroCampusFive",
    image: null,
    eyebrow: "Rooted in Vision",
    title: "A Place Where Dreams Take Shape",
    subtitle: "Character, scholarship and service",
    description:
      "With a strong academic culture and a faith-centered foundation, ACU empowers students to pursue excellence in every calling.",
  },
];

const FACULTIES = [
  {
    name: "Agriculture",
    slug: "agriculture",
    tagline: "Cultivating sustainable growth and food security.",
    summary:
      "The Faculty of Agriculture equips students with practical, research-driven knowledge in crop science, agribusiness, animal production and environmental stewardship, preparing them to lead innovation in food systems and rural development.",
    dean: "Prof. A. O. Adebowale",
    programmes: [
      "Agricultural Economics",
      "Animal Production",
      "Crop Science",
      "Soil Science",
    ],
    researchAreas: [
      "Climate-smart agriculture",
      "Food security systems",
      "Agribusiness and value chains",
      "Sustainable land management",
    ],
    highlights: [
      "Hands-on farm training",
      "Research-led extension services",
      "Field-based learning environment",
    ],
    facilities: [
      "Demonstration farm",
      "Crop and soil laboratories",
      "Agribusiness incubation support",
    ],
    careerOutcomes: [
      "Agricultural extension officers",
      "Farm managers",
      "Agri-business specialists",
      "Research analysts",
    ],
  },
  {
    name: "Basic Medical Sciences",
    slug: "basic-medical-sciences",
    tagline: "Building the scientific foundation for modern healthcare.",
    summary:
      "The Faculty of Basic Medical Sciences develops a strong foundation in anatomy, physiology, biochemistry and medical laboratory sciences, enabling students to contribute meaningfully to clinical practice and biomedical innovation.",
    dean: "Prof. M. A. Adeyemi",
    programmes: [
      "Anatomy",
      "Biochemistry",
      "Medical Laboratory Science",
      "Physiology",
    ],
    researchAreas: [
      "Molecular diagnostics",
      "Clinical biochemistry",
      "Public health sciences",
      "Cellular and systems physiology",
    ],
    highlights: [
      "Integrated basic science training",
      "Strong laboratory culture",
      "Clinical relevance and evidence-based practice",
    ],
    facilities: [
      "Human anatomy laboratory",
      "Pathology and histology lab",
      "Research and teaching laboratories",
    ],
    careerOutcomes: [
      "Medical laboratory scientists",
      "Healthcare researchers",
      "Biomedical specialists",
      "Clinical support professionals",
    ],
  },
  {
    name: "Communication & Media Studies",
    slug: "communication-media-studies",
    tagline: "Shaping voices, stories and public influence.",
    summary:
      "This faculty develops confident communicators, media professionals and strategic storytellers who can function in journalism, public communication, broadcasting, digital media and advocacy.",
    dean: "Dr. T. A. Adebayo",
    programmes: [
      "Mass Communication",
      "Broadcasting",
      "Public Relations",
      "Media Production",
    ],
    researchAreas: [
      "Digital media and storytelling",
      "Journalism ethics",
      "Communication for development",
      "Public opinion and media systems",
    ],
    highlights: [
      "Creative storytelling culture",
      "Media lab and production practice",
      "Strong communication for development focus",
    ],
    facilities: [
      "Studio and production room",
      "Media editing suite",
      "Communication research lab",
    ],
    careerOutcomes: [
      "Journalists",
      "Content producers",
      "Public relations specialists",
      "Media strategists",
    ],
  },
  {
    name: "Computing",
    slug: "computing",
    tagline: "Technology for society, innovation and impact.",
    summary:
      "The Faculty of Computing prepares students for the digital economy through software engineering, data science, cybersecurity, networking and intelligent systems, combining academic rigour with practical problem solving.",
    dean: "Prof. O. J. Oke",
    programmes: [
      "Computer Science",
      "Cybersecurity",
      "Software Engineering",
      "Information Systems",
    ],
    researchAreas: [
      "Artificial intelligence",
      "Data science and analytics",
      "Secure software systems",
      "Emerging technologies for education",
    ],
    highlights: [
      "Industry-aligned curriculum",
      "Practical project work",
      "Digital innovation mindset",
    ],
    facilities: [
      "Computer laboratories",
      "Networking and systems lab",
      "Innovation and prototyping space",
    ],
    careerOutcomes: [
      "Software developers",
      "Cybersecurity analysts",
      "Data professionals",
      "Systems designers",
    ],
  },
  {
    name: "Education",
    slug: "education",
    tagline: "Teaching excellence for tomorrow's leaders.",
    summary:
      "The Faculty of Education is committed to forming teachers, school leaders and education specialists who can promote learning, inclusion and values-based leadership across all levels of education.",
    dean: "Dr. C. M. Akinyele",
    programmes: [
      "Educational Management",
      "English Education",
      "Guidance and Counselling",
      "Primary Education",
    ],
    researchAreas: [
      "Curriculum innovation",
      "Learning outcomes and assessment",
      "Educational leadership",
      "Psychology of learning",
    ],
    highlights: [
      "School-based practice",
      "Teacher formation and mentorship",
      "Values-driven educational leadership",
    ],
    facilities: [
      "Teaching practice support",
      "Resource and curriculum centres",
      "Learning and counselling spaces",
    ],
    careerOutcomes: [
      "Teachers",
      "School administrators",
      "Education planners",
      "Counsellors",
    ],
  },
  {
    name: "Engineering",
    slug: "engineering",
    tagline: "Inventing solutions for a better world.",
    summary:
      "The Faculty of Engineering prepares students to solve real-world problems in infrastructure, industrial systems and technology through scientific understanding, design thinking and practical engineering methods.",
    dean: "Engr. Prof. A. S. Adejumo",
    programmes: [
      "Civil Engineering",
      "Electrical/Electronics Engineering",
      "Mechanical Engineering",
      "Computer Engineering",
    ],
    researchAreas: [
      "Sustainable infrastructure",
      "Smart systems and automation",
      "Renewable energy",
      "Applied design and manufacturing",
    ],
    highlights: [
      "Project-based learning",
      "Applied engineering practice",
      "Innovation and industry relevance",
    ],
    facilities: [
      "Workshop facilities",
      "Engineering laboratories",
      "Design and prototyping spaces",
    ],
    careerOutcomes: [
      "Design engineers",
      "Project managers",
      "Maintenance specialists",
      "Systems engineers",
    ],
  },
  {
    name: "Environmental Studies",
    slug: "environmental-studies",
    tagline: "Sustaining people, place and planet.",
    summary:
      "The Faculty of Environmental Studies explores the relationship between people and the natural environment, equipping students to respond to ecological challenges through planning, policy and sustainable systems.",
    dean: "Prof. D. O. Ogunleye",
    programmes: [
      "Environmental Management",
      "Urban and Regional Planning",
      "Geography",
      "Surveying and Geoinformatics",
    ],
    researchAreas: [
      "Climate resilience",
      "Urban sustainability",
      "Land-use planning",
      "Natural resource governance",
    ],
    highlights: [
      "Community and environmental impact",
      "Policy-practice integration",
      "Practical field-based learning",
    ],
    facilities: [
      "Field study kits",
      "Environmental labs",
      "Geospatial mapping facilities",
    ],
    careerOutcomes: [
      "Environmental consultants",
      "Urban planners",
      "GIS specialists",
      "Sustainability officers",
    ],
  },
  {
    name: "Humanities",
    slug: "humanities",
    tagline: "Shaping ideas, culture and critical thought.",
    summary:
      "The Faculty of Humanities fosters critical inquiry into language, history, society and culture, producing graduates who understand human experiences and contribute to leadership, scholarship and public life.",
    dean: "Prof. E. A. Oladipo",
    programmes: [
      "English Language",
      "History and International Studies",
      "Philosophy",
      "Theology",
    ],
    researchAreas: [
      "African literature and culture",
      "Philosophy and ethics",
      "History and governance",
      "Human values and identity",
    ],
    highlights: [
      "Critical reasoning and writing",
      "Ethics and public discourse",
      "Cultural and intellectual engagement",
    ],
    facilities: [
      "Language and literature labs",
      "Seminar and reading spaces",
      "Research and debate forums",
    ],
    careerOutcomes: [
      "Researchers",
      "Writers and editors",
      "Public policy analysts",
      "Educators and communicators",
    ],
  },
  {
    name: "Law",
    slug: "law",
    tagline: "Justice, ethics and legal excellence.",
    summary:
      "The Faculty of Law builds legal scholars and practitioners with a strong foundation in statutory interpretation, advocacy, ethics and access to justice, empowering them to contribute to the rule of law and public good.",
    dean: "Prof. B. O. Ojo",
    programmes: ["LLB", "Legal Research", "International Law", "Commercial Law"],
    researchAreas: [
      "Access to justice",
      "Constitutional governance",
      "Corporate law",
      "Human rights and ethics",
    ],
    highlights: [
      "Mooting courtroom confidence",
      "Responsible legal scholarship",
      "Professional ethics and advocacy",
    ],
    facilities: [
      "Courtroom-style advocacy spaces",
      "Legal research resources",
      "Law library and moot facilities",
    ],
    careerOutcomes: [
      "Legal practitioners",
      "Public sector lawyers",
      "Compliance officers",
      "Legal researchers",
    ],
  },
  {
    name: "Management Sciences",
    slug: "management-sciences",
    tagline: "Preparing leaders for enterprise and governance.",
    summary:
      "The Faculty of Management Sciences prepares students for leadership in business, public administration, finance and entrepreneurship through analytical thinking, strategic decision-making and organisational insight.",
    dean: "Dr. E. A. Babatunde",
    programmes: [
      "Accounting",
      "Business Administration",
      "Banking and Finance",
      "Marketing",
    ],
    researchAreas: [
      "Strategic management",
      "Entrepreneurship and innovation",
      "Finance and policy",
      "Leadership and organisational behaviour",
    ],
    highlights: [
      "Career-ready business training",
      "Entrepreneurial mindset development",
      "Strong corporate and policy orientation",
    ],
    facilities: [
      "Business simulation spaces",
      "Accounting and finance labs",
      "Entrepreneurship support resources",
    ],
    careerOutcomes: [
      "Business managers",
      "Finance professionals",
      "Entrepreneurs",
      "Public administrators",
    ],
  },
  {
    name: "Natural Sciences",
    slug: "natural-sciences",
    tagline: "Exploring the laws of nature and everyday life.",
    summary:
      "The Faculty of Natural Sciences develops scientific reasoning and research capability in biology, chemistry and related fields, helping students understand the world and contribute to innovation across industries.",
    dean: "Prof. H. A. Okafor",
    programmes: ["Biology", "Chemistry", "Industrial Chemistry", "Physics"],
    researchAreas: [
      "Environmental chemistry",
      "Applied biology and microbiology",
      "Energy and materials science",
      "Scientific experimentation and analysis",
    ],
    highlights: [
      "Strong field and lab exposure",
      "Scientific inquiry and discovery",
      "Research-led learning",
    ],
    facilities: [
      "Chemistry and biology labs",
      "Science demonstration rooms",
      "Analytical teaching labs",
    ],
    careerOutcomes: [
      "Research assistants",
      "Laboratory scientists",
      "Analysts",
      "Science educators",
    ],
  },
  {
    name: "Nursing",
    slug: "nursing",
    tagline: "Compassion, clinical excellence and care.",
    summary:
      "The Faculty of Nursing prepares competent, compassionate and ethical nursing professionals equipped to deliver care in hospitals, communities and public health settings.",
    dean: "Dr. A. R. Aderibigbe",
    programmes: [
      "Nursing Science",
      "Midwifery",
      "Community Health Nursing",
      "Clinical Nursing Practice",
    ],
    researchAreas: [
      "Maternal and child health",
      "Public health nursing",
      "Clinical practice improvement",
      "Patient-centred service delivery",
    ],
    highlights: [
      "Hands-on patient care training",
      "Professionalism and empathy",
      "Clinical practice exposure",
    ],
    facilities: [
      "Simulation labs",
      "Clinical training support",
      "Skills acquisition rooms",
    ],
    careerOutcomes: [
      "Registered nurses",
      "Clinical caregivers",
      "Community health professionals",
      "Healthcare educators",
    ],
  },
  {
    name: "Social Sciences",
    slug: "social-sciences",
    tagline: "Understanding society, policy and people.",
    summary:
      "The Faculty of Social Sciences develops students who can analyse social systems, shape public policy and contribute to governance, research and community development.",
    dean: "Prof. S. O. Adeyemo",
    programmes: ["Economics", "Political Science", "Psychology", "Sociology"],
    researchAreas: [
      "Social policy and development",
      "Behavioural and social dynamics",
      "Governance and democracy",
      "Community and development studies",
    ],
    highlights: [
      "Evidence-based social analysis",
      "Public engagement and leadership",
      "Critical understanding of society",
    ],
    facilities: [
      "Seminar and discussion rooms",
      "Research facilitation spaces",
      "Policy and social development resources",
    ],
    careerOutcomes: [
      "Policy analysts",
      "Economists",
      "Community development specialists",
      "Research officers",
    ],
  },
];

const PRINCIPAL_OFFICERS = [
  {
    slug: "vice-chancellor",
    name: "Professor (Mrs.) Ebunoluwa Olufemi Oduwole, FNAL, FCIA, FEMTAN",
    role: "Vice-Chancellor",
    image: null,
    imageKey: "vc",
    summary:
      "ACU's fifth substantive and first female Vice-Chancellor is a Professor of Philosophy with expertise in ethics and bioethics. She brings more than four decades of teaching, research and university leadership experience to the institution.",
    bio: [
      "Professor (Mrs.) Ebunoluwa Olufemi Oduwole is the fifth substantive Vice-Chancellor of Ajayi Crowther University, Oyo, and the first female to hold this position. She is a distinguished Professor of Philosophy with specialization in ethics, bioethics, and African philosophy.",
      "She obtained her Bachelor of Arts degree in Philosophy from the University of Ife (now Obafemi Awolowo University), Ile-Ife, and proceeded to the University of Ibadan where she earned her Master of Arts and Doctor of Philosophy degrees in Philosophy.",
      "With over four decades of experience in teaching, research, and university administration, Professor Oduwole has served in various academic and administrative capacities. Her research interests span ethical theory, bioethics, medical ethics, environmental ethics, and gender studies.",
      "She is a Fellow of the Nigerian Academy of Letters (FNAL), Fellow of the Chartered Institute of Administration (FCIA), and Fellow of the Educational Management and Training Association of Nigeria (FEMTAN).",
      "Professor Oduwole is committed to raising Godly intellectuals and has brought her wealth of experience to bear on the administration of Ajayi Crowther University, championing academic excellence, research innovation, and character formation.",
    ],
    qualifications: [
      "B.A. Philosophy, University of Ife (now OAU), Ile-Ife",
      "M.A. Philosophy, University of Ibadan",
      "Ph.D. Philosophy, University of Ibadan",
    ],
    memberships: [
      "Fellow, Nigerian Academy of Letters (FNAL)",
      "Fellow, Chartered Institute of Administration (FCIA)",
      "Fellow, Educational Management and Training Association of Nigeria (FEMTAN)",
    ],
  },
  {
    slug: "dvc-academics",
    name: "Professor Afolake Atinuke Olanbiwoninu",
    role: "Deputy Vice-Chancellor (Academics)",
    image: null,
    imageKey: null,
    summary:
      "A food microbiologist and academic leader, Professor Olanbiwoninu leads academic planning and quality at ACU. Her research spans food safety, microbial ecology, nutrition and antimicrobial resistance.",
    bio: [
      "Professor Afolake Atinuke Olanbiwoninu is the Deputy Vice-Chancellor (Academics) at Ajayi Crowther University, Oyo. She is a Professor of Food Microbiology with extensive experience in teaching, research, and academic administration.",
      "She obtained her Bachelor of Science degree in Microbiology from the University of Ibadan, and her Master of Science and Doctor of Philosophy degrees in Food Microbiology from the same institution.",
      "Professor Olanbiwoninu's research focuses on food safety, microbial ecology, fermented foods, nutrition, and antimicrobial resistance. She has published extensively in reputable national and international journals.",
      "As Deputy Vice-Chancellor (Academics), she oversees academic planning, curriculum development, quality assurance, and the overall academic activities of the University. She is committed to maintaining high academic standards and fostering a culture of research excellence.",
      "She is a member of several professional bodies including the Nigerian Society for Microbiology (NSM) and the American Society for Microbiology (ASM).",
    ],
    qualifications: [
      "B.Sc. Microbiology, University of Ibadan",
      "M.Sc. Food Microbiology, University of Ibadan",
      "Ph.D. Food Microbiology, University of Ibadan",
    ],
    memberships: [
      "Nigerian Society for Microbiology (NSM)",
      "American Society for Microbiology (ASM)",
    ],
  },
  {
    slug: "dvc-admin",
    name: "Professor Adeyemi Olukayode Binuyo",
    role: "Deputy Vice-Chancellor (Administration)",
    image: null,
    imageKey: null,
    summary:
      "A foundational scholar in ACU's Department of Mathematical Sciences, Professor Binuyo brings extensive experience in teaching, research, mentorship and institutional administration to the University's management.",
    bio: [
      "Professor Adeyemi Olukayode Binuyo is the Deputy Vice-Chancellor (Administration) at Ajayi Crowther University, Oyo. He is a foundational scholar in the Department of Mathematical Sciences at the University.",
      "He obtained his Bachelor of Science degree in Mathematics from the University of Ibadan, and his Master of Science and Doctor of Philosophy degrees in Mathematics from the same institution.",
      "Professor Binuyo has extensive experience in teaching, research, and mentorship. His research interests include mathematical modeling, numerical analysis, and applied mathematics. He has supervised numerous undergraduate and postgraduate students.",
      "As Deputy Vice-Chancellor (Administration), he oversees the administrative functions of the University including human resources, physical planning, security, and general administration. He is committed to efficient and effective service delivery.",
      "He has served in various committees and held several administrative positions within and outside the University, bringing a wealth of experience to his current role.",
    ],
    qualifications: [
      "B.Sc. Mathematics, University of Ibadan",
      "M.Sc. Mathematics, University of Ibadan",
      "Ph.D. Mathematics, University of Ibadan",
    ],
    memberships: [
      "Mathematical Association of Nigeria (MAN)",
      "Nigerian Mathematical Society (NMS)",
    ],
  },
  {
    slug: "registrar",
    name: "Dr. Bode Olofinmuagun",
    role: "Registrar",
    image: null,
    imageKey: "registrar",
    summary:
      "Dr. Olofinmuagun supports effective University governance and administration. His professional experience covers registry operations, personnel, research administration, faculty services and corporate affairs.",
    bio: [
      "Dr. Bode Olofinmuagun is the Registrar of Ajayi Crowther University, Oyo. He is an experienced university administrator with expertise in registry operations, personnel management, research administration, faculty services, and corporate affairs.",
      "He obtained his Bachelor of Arts degree in History from the University of Ife (now Obafemi Awolowo University), Ile-Ife, and his Master of Arts and Doctor of Philosophy degrees in History from the University of Ibadan.",
      "Dr. Olofinmuagun has extensive experience in university administration, having served in various capacities in the registry of several Nigerian universities. He brings a wealth of experience in governance, policy implementation, and administrative best practices.",
      "As Registrar, he is the chief administrative officer of the University and is responsible for the day-to-day administration of the University, including student admissions, records, examinations, and senate matters.",
      "He is a member of several professional bodies including the Association of Nigerian University Professional Administrators (ANUPA) and the Institute of Corporate Administration of Nigeria.",
    ],
    qualifications: [
      "B.A. History, University of Ife (now OAU), Ile-Ife",
      "M.A. History, University of Ibadan",
      "Ph.D. History, University of Ibadan",
    ],
    memberships: [
      "Association of Nigerian University Professional Administrators (ANUPA)",
      "Institute of Corporate Administration of Nigeria",
    ],
  },
  {
    slug: "bursar",
    name: "Dr. Ayodele John Olusanwo, FCA, FCIA, FCTI",
    role: "Bursar",
    image: null,
    imageKey: "bursar",
    summary:
      "An experienced accounting and financial-management professional, Dr. Olusanwo leads ACU's financial planning, accountability and resource stewardship in support of sustainable institutional development.",
    bio: [
      "Dr. Ayodele John Olusanwo is the Bursar of Ajayi Crowther University, Oyo. He is an experienced accounting and financial management professional with expertise in financial planning, budgeting, and resource management.",
      "He is a Fellow of the Institute of Chartered Accountants of Nigeria (FCA), Fellow of the Chartered Institute of Administration (FCIA), and Fellow of the Chartered Institute of Taxation of Nigeria (FCTI).",
      "Dr. Olusanwo has extensive experience in financial management in both the private and public sectors. He has served in various financial management capacities and brings a wealth of experience to his role as Bursar.",
      "As Bursar, he is responsible for the financial administration of the University, including budgeting, accounting, financial reporting, and the management of the University's assets and resources.",
      "He is committed to transparency, accountability, and prudent management of the University's financial resources in support of sustainable institutional development.",
    ],
    qualifications: ["B.Sc. Accounting", "M.Sc. Accounting", "Ph.D. Accounting"],
    memberships: [
      "Fellow, Institute of Chartered Accountants of Nigeria (FCA)",
      "Fellow, Chartered Institute of Administration (FCIA)",
      "Fellow, Chartered Institute of Taxation of Nigeria (FCTI)",
    ],
  },
  {
    slug: "librarian",
    name: "Professor Bosede Adebimpe Ajiboye",
    role: "University Librarian",
    image: null,
    imageKey: null,
    summary:
      "A Library and Information Science specialist, Dr. Ajiboye leads the University's knowledge, research-support and information-access services, with experience in digital literacy and library leadership.",
    bio: [
      "Dr. Bosede Adebimpe Ajiboye is the University Librarian of Ajayi Crowther University, Oyo. She is a Library and Information Science specialist with expertise in digital literacy, information management, and library leadership.",
      "She obtained her Bachelor of Library and Information Science degree from the University of Ibadan, and her Master of Library and Information Science and Doctor of Philosophy degrees from the same institution.",
      "Dr. Ajiboye has extensive experience in library management and information services. Her research interests include digital libraries, information literacy, collection development, and user studies.",
      "As University Librarian, she is responsible for the management of the University Library, including collection development, information services, digital resources, and research support for students and faculty.",
      "She is committed to providing excellent library and information services that support the teaching, learning, and research missions of the University. She is a member of several professional bodies including the Nigerian Library Association (NLA).",
    ],
    qualifications: [
      "B.LIS, University of Ibadan",
      "M.LIS, University of Ibadan",
      "Ph.D. Library and Information Science, University of Ibadan",
    ],
    memberships: [
      "Nigerian Library Association (NLA)",
      "American Library Association (ALA)",
    ],
  },
];

// News & events, mapped to the News/Event tables by `type`.
const NEWS_ITEMS = [
  {
    type: "news",
    title: "ACU Matriculates 1,200 Students for 2025/2026 Session",
    date: "2025-11-14",
    excerpt:
      "Ajayi Crowther University has formally matriculated 1,200 new students across its eleven faculties for the 2025/2026 academic session.",
    body: [
      "Ajayi Crowther University, Oyo, has formally matriculated 1,200 new students across its eleven faculties for the 2025/2026 academic session.",
      "In his address, the Vice-Chancellor, Professor Ebunoluwa Olufemi Oduwole, charged the new students to embrace the University's motto — Knowledge with Probity — and to conduct themselves with discipline, diligence and integrity throughout their studies.",
      "The ceremony featured the administration of the matriculation oath, presentation of the academic gown, and a welcome address by the Registrar on behalf of the Governing Council.",
    ],
    tag: "Ceremony",
  },
  {
    type: "news",
    title: "NUC Grants Full Accreditation to 12 ACU Programmes",
    date: "2025-10-30",
    excerpt:
      "The National Universities Commission has granted full accreditation to twelve undergraduate programmes across the University.",
    body: [
      "The National Universities Commission (NUC) has granted full accreditation to twelve undergraduate programmes across Ajayi Crowther University.",
      "The accredited programmes span the Faculties of Computing, Natural Science, Management Sciences, Humanities, and Education.",
      "This accreditation reaffirms the University's commitment to academic excellence and its compliance with national quality assurance standards.",
    ],
    tag: "Accreditation",
  },
  {
    type: "news",
    title: "ACU Ranks Among Top 20 Private Universities in Nigeria",
    date: "2025-10-05",
    excerpt:
      "A recent national ranking places Ajayi Crowther University among the top 20 private universities in the country.",
    body: [
      "Ajayi Crowther University has been ranked among the top 20 private universities in Nigeria in the latest national higher education rankings.",
      "The ranking considered research output, graduate employability, staff qualifications, infrastructure, and student satisfaction.",
      "The Vice-Chancellor attributed the achievement to the dedication of faculty, staff, and the support of the Church of Nigeria (Anglican Communion).",
    ],
    tag: "Ranking",
  },
  {
    type: "event",
    title: "13th Convocation Ceremony",
    date: "2025-12-08",
    excerpt:
      "The University will hold its 13th Convocation Ceremony, featuring the award of degrees, prizes, and honorary doctorates.",
    body: [
      "Ajayi Crowther University will hold its 13th Convocation Ceremony on Monday, 8 December 2025, at the University Main Auditorium.",
      "The ceremony will feature the presentation of undergraduate and postgraduate degrees, the award of academic prizes, and the conferment of honorary doctorates on distinguished Nigerians.",
      "Graduands should complete all clearance procedures with the Registry and Bursary before the stated deadline.",
    ],
    tag: "Convocation",
  },
  {
    type: "event",
    title: "Annual Founder's Day Lecture",
    date: "2026-01-15",
    excerpt:
      "A public lecture to commemorate the founding of the University and honour the legacy of Bishop Samuel Ajayi Crowther.",
    body: [
      "The University will hold its Annual Founder's Day Lecture on Thursday, 15 January 2026, in the Trenchard Hall.",
      "This year's lecture is titled 'Faith, Scholarship and the Future of African Higher Education' and will be delivered by a leading scholar in the field.",
      "The event is open to students, staff, alumni, and members of the public.",
    ],
    tag: "Lecture",
  },
  {
    type: "event",
    title: "2026/2027 Post-UTME Screening Exercise",
    date: "2026-07-20",
    excerpt:
      "Screening exercise for all candidates seeking admission into the University for the 2026/2027 academic session.",
    body: [
      "The Post-UTME Screening Exercise for the 2026/2027 academic session will hold from 20 to 24 July 2026.",
      "Eligible candidates must have chosen Ajayi Crowther University as their first choice and scored a minimum of 160 in the 2026 UTME.",
      "Candidates should visit the University portal to complete registration, upload required documents, and print their screening slip.",
    ],
    tag: "Admissions",
  },
  {
    type: "news",
    title: "Faculty of Law Wins National Moot Court Competition",
    date: "2025-09-22",
    excerpt:
      "Students from the Faculty of Law have won first place at the National Inter-University Moot Court Competition.",
    body: [
      "The Faculty of Law of Ajayi Crowther University has won first place at the National Inter-University Moot Court Competition held in Abuja.",
      "The winning team comprised four undergraduate students who argued a hypothetical case on constitutional interpretation before a panel of Supreme Court justices.",
      "The Dean of the Faculty praised the students' preparation, poise, and command of legal reasoning.",
    ],
    tag: "Achievement",
  },
  {
    type: "event",
    title: "Career Fair 2026: Connecting Students with Industry",
    date: "2026-03-12",
    excerpt:
      "An annual career fair bringing together employers, alumni, and final-year students for recruitment and mentorship.",
    body: [
      "The 2026 ACU Career Fair will hold on Thursday, 12 March 2026, at the University Sports Complex.",
      "Over 40 organisations from banking, technology, oil and gas, education, and the public sector will be in attendance to recruit graduating students and interns.",
      "The event will also feature CV clinics, mock interviews, and mentorship sessions with alumni.",
    ],
    tag: "Career",
  },
];

module.exports = {
  SITE,
  CONTACT,
  NAV_LINKS,
  PORTALS,
  STATS,
  PROGRAMMES,
  PILLARS,
  HERO_SLIDES,
  FACULTIES,
  PRINCIPAL_OFFICERS,
  NEWS_ITEMS,
};

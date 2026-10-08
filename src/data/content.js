// Central space for editable site content.
// Update text, links, and image URLs here, components read from this file.

import logoImg from "../assets/acu-logo-new-1.png";
import heroImage from "../assets/1784031378408.jpg";
import campusWideImage from "../assets/1784816484060.jpg";
import vchanImage from "../assets/Vice chan.jpeg";
import heroCampusOne from "../assets/IMG_3272.JPG";
import heroCampusTwo from "../assets/IMG_3282.JPG";
import heroCampusThree from "../assets/IMG_3307.JPG";
import heroCampusFour from "../assets/IMG_3318.JPG";
import heroCampusSix from "../assets/IMG_3405.JPG";
import heroCampusFive from "../assets/IMG_3413.JPG";
import studentsImage from "../assets/students.jpg";

export const SITE = {
  name: "Ajayi Crowther University",
  shortName: "ACU, Oyo",
  motto: "Scientia Probitas",
  mottoMeaning: "Knowledge with Probity",
  tagline: "Raising Godly Intellectuals",
  logo: logoImg,
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

export const NAV_LINKS = [
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
          { label: "Vice-Chancellary", path: "/about/vice-chancellary" },
          { label: "Registry", path: "/about/registry" },
          { label: "Bursary", path: "/about/bursary" },
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
  {
    label: "Academics",
    path: "/academics",
    children: [
      { label: "Academics Overview", path: "/academics" },
      { label: "List of Courses", path: "/listofcourses" },
      { label: "Inaugural Lectures", path: "/academics/inaugural-lectures" },
    ],
  },
  { label: "Admissions", path: "/admissions" },
  {
    // A grouping label rather than a destination — no `path`, so the navbar
    // renders it as a non-clickable heading that reveals the menu on hover.
    label: "Student Services",
    children: [
      { label: "Postgraduate School", path: "/portal/postgraduate" },
      { label: "Undergraduate Study", path: "https://apply.acu.edu.ng/" },
      { label: "Part-Time Study", path: "/admissions/part-time" },
      { label: "Foundation Programme", path: "https://cpfpapply.acu.edu.ng" },
    ],
  },
  { label: "Sustainability", path: "/sustainability" },
  {
    label: "Directory",
    path: "/directory",
    children: [
      { label: "Staff Directory", path: "/directory/staff" },
      { label: "Library", path: "/directory/library" },
      { label: "Gallery", path: "/gallery" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

export const PORTALS = [
  { label: "Postgraduate", url: "/portal/postgraduate" },
  { label: "Hostel", url: "/portal/hostel" },
  { label: "Undergraduate", url: "https://apply.acu.edu.ng/" },
  { label: "Part-Time", url: "/admissions/part-time" },
  { label: "Foundation", url: "https://cpfpapply.acu.edu.ng" },
];

export const STATS = [
  { value: 13, label: "Reputable Faculties" },
  { value: 51, label: "Accredited Courses" },
  { value: 3, label: "Fully Stocked Libraries" },
  { value: 4, label: "Strategic Campuses" },
];

export const PROGRAMMES = [
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

export const FACULTIES = [
  {
    name: "Agriculture",
    slug: "agriculture",
    url: "/faculties/agriculture",
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
    url: "/faculties/basic-medical-sciences",
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
    url: "/faculties/communication-media-studies",
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
    url: "/faculties/computing",
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
    url: "/faculties/education",
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
    url: "/faculties/engineering",
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
    url: "/faculties/environmental-studies",
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
    url: "/faculties/humanities",
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
    url: "/faculties/law",
    tagline: "Justice, ethics and legal excellence.",
    summary:
      "The Faculty of Law builds legal scholars and practitioners with a strong foundation in statutory interpretation, advocacy, ethics and access to justice, empowering them to contribute to the rule of law and public good.",
    dean: "Prof. B. O. Ojo",
    programmes: [
      "LLB",
      "Legal Research",
      "International Law",
      "Commercial Law",
    ],
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
    url: "/faculties/management-sciences",
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
    url: "/faculties/natural-sciences",
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
    url: "/faculties/nursing",
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
    url: "/faculties/social-sciences",
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

export const NEWS = [
  {
    title: "Freshers Orientation Brings the ACU Community Together",
    date: "August 12, 2026",
    image: studentsImage,
    url: "/admissions",
  },
  {
    title: "Academic Excellence in Motion: Students Thrive Across Campuses",
    date: "August 9, 2026",
    image: heroCampusOne,
    url: "/academics",
  },
  {
    title: "A New Chapter of Learning, Leadership, and Service at ACU",
    date: "August 4, 2026",
    image: heroCampusTwo,
    url: "/about",
  },
  {
    title: "Campus Life and Research Culture Continue to Grow",
    date: "July 29, 2026",
    image: heroCampusThree,
    url: "/faculties/computing",
  },
  {
    title:
      "Faculty Collaboration and Innovation Strengthen the Student Experience",
    date: "July 21, 2026",
    image: heroCampusFour,
    url: "/faculties",
  },
  {
    title: "ACU Celebrates a Vibrant Student Community and Shared Purpose",
    date: "July 15, 2026",
    image: heroCampusFive,
    url: "/contact",
  },
];

export const PILLARS = [
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

// The 17 Sustainable Development Goals, adopted by all United Nations Member
// States in 2015. Titles and descriptions are the official summaries published
// by the UN Department of Economic and Social Affairs (sdgs.un.org/goals).
// Official SDG icon artwork, downloaded from the United Nations
// (un.org/sustainabledevelopment → "Download 17 SDG Icons (WEB)"). Used under
// the UN's SDG communications guidelines, which require the attribution note
// rendered at the foot of the Sustainability page.
const sdgIcons = import.meta.glob("../assets/sdg/goal-*.png", {
  eager: true,
  import: "default",
});

const sdgIcon = (number) =>
  sdgIcons[`../assets/sdg/goal-${String(number).padStart(2, "0")}.png`] || "";

export const SDG_GOALS = [
  {
    number: 1,
    title: "No Poverty",
    desc: "End poverty in all its forms everywhere.",
  },
  {
    number: 2,
    title: "Zero Hunger",
    desc: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.",
  },
  {
    number: 3,
    title: "Good Health and Well-being",
    desc: "Ensure healthy lives and promote well-being for all at all ages.",
  },
  {
    number: 4,
    title: "Quality Education",
    desc: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
  },
  {
    number: 5,
    title: "Gender Equality",
    desc: "Achieve gender equality and empower all women and girls.",
  },
  {
    number: 6,
    title: "Clean Water and Sanitation",
    desc: "Ensure availability and sustainable management of water and sanitation for all.",
  },
  {
    number: 7,
    title: "Affordable and Clean Energy",
    desc: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
  },
  {
    number: 8,
    title: "Decent Work and Economic Growth",
    desc: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
  },
  {
    number: 9,
    title: "Industry, Innovation and Infrastructure",
    desc: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
  },
  {
    number: 10,
    title: "Reduced Inequalities",
    desc: "Reduce inequality within and among countries.",
  },
  {
    number: 11,
    title: "Sustainable Cities and Communities",
    desc: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
  },
  {
    number: 12,
    title: "Responsible Consumption and Production",
    desc: "Ensure sustainable consumption and production patterns.",
  },
  {
    number: 13,
    title: "Climate Action",
    desc: "Take urgent action to combat climate change and its impacts.",
  },
  {
    number: 14,
    title: "Life Below Water",
    desc: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.",
  },
  {
    number: 15,
    title: "Life on Land",
    desc: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.",
  },
  {
    number: 16,
    title: "Peace, Justice and Strong Institutions",
    desc: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.",
  },
  {
    number: 17,
    title: "Partnerships for the Goals",
    desc: "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.",
  },
].map((goal) => ({ ...goal, image: sdgIcon(goal.number) }));

export const SUSTAINABILITY = {
  heroSlides: [
    {
      image: "",
      imageKey: "heroCampusOne",
      eyebrow: "United Nations · 2030 Agenda",
      title: "Sustainability",
      lede: "How Ajayi Crowther University contributes to the United Nations Sustainable Development Goals — through what we teach, what we research, and how we run our campuses.",
    },
    {
      image: "",
      imageKey: "heroCampusThree",
      eyebrow: "Our role",
      title: "Local action, global goals",
      lede: "The 2030 Agenda is delivered in places, not abstractions. Our contribution begins on the campuses and in the communities of Oyo.",
    },
    {
      image: "",
      imageKey: "heroCampusFive",
      eyebrow: "Teaching & research",
      title: "Insight into action",
      lede: "We put our scholarship to work on the problems our region faces — clean energy, food security and climate resilience.",
    },
    {
      image: "",
      imageKey: "students",
      eyebrow: "Partnerships",
      title: "No goal is reached alone",
      lede: "We work with host communities, schools, alumni and industry, because these goals are too large for any institution to meet by itself.",
    },
  ],
  title: "A University Committed to the 2030 Agenda",
  body: [
    "In September 2015, all United Nations Member States adopted the 2030 Agenda for Sustainable Development, a shared blueprint for peace and prosperity for people and the planet. At its heart are 17 Sustainable Development Goals (SDGs) — an urgent call to action for every country, and for every institution within them.",
    "For a university, the greatest contribution is through education and research. But we are also an employer, a landowner and a neighbour to the communities of Oyo. That gives us a duty to reduce our own footprint, and to put our scholarship at the service of the goals.",
    "This page sets out the goals we have chosen to prioritise, how we are responding to them, and how students, staff, alumni and partners can take part.",
  ],
  introImage: "",
  stats: [
    { value: 17, label: "Goals adopted by all UN Member States" },
    { value: 6, label: "Goals identified as ACU priorities" },
    { value: 13, label: "Faculties aligning teaching with the goals" },
    { value: 4, label: "Campuses with active greening programmes" },
  ],
  goalsTitle: "The 17 Sustainable Development Goals",
  goalsIntro:
    "Adopted by all United Nations Member States in 2015, the 17 goals are a universal call to end poverty, protect the planet and ensure that all people enjoy peace and prosperity. Select a goal to read its targets in full on the United Nations website.",
  prioritiesTitle: "Our Priority Goals",
  prioritiesIntro:
    "We cannot act on everything at once, so we have identified the goals where our teaching, research and operations can make the greatest difference.",
  priorities: [
    {
      goal: 4,
      title: "Quality Education",
      desc: "Our core purpose. We are widening access to quality higher education, strengthening teacher formation, and building sustainability into every programme we teach.",
    },
    {
      goal: 7,
      title: "Affordable and Clean Energy",
      desc: "We are cutting energy waste across our campuses and introducing renewable power, beginning with solar installations on selected facilities.",
    },
    {
      goal: 12,
      title: "Responsible Consumption and Production",
      desc: "From procurement to disposal, we are reducing what we consume and reusing what we can, with segregated waste collection and less single-use plastic.",
    },
    {
      goal: 13,
      title: "Climate Action",
      desc: "We are measuring and reducing our emissions, and supporting research on climate resilience for Nigerian agriculture and communities.",
    },
    {
      goal: 15,
      title: "Life on Land",
      desc: "We protect and expand the trees, green spaces and habitats on our campuses through annual planting and careful land management.",
    },
    {
      goal: 17,
      title: "Partnerships for the Goals",
      desc: "No institution reaches these goals alone. We work with host communities, schools, alumni, industry and other universities to multiply our impact.",
    },
  ],
  contributionsTitle: "How a University Contributes",
  contributionsIntro:
    "Universities take part in the 2030 Agenda in four distinct ways, and we pursue all four together.",
  contributions: [
    {
      title: "Teaching & Learning",
      desc: "Equipping graduates with the knowledge, skills and values to work sustainably in whatever field they enter.",
    },
    {
      title: "Research & Innovation",
      desc: "Producing evidence and practical solutions to local and national challenges, from clean energy to food security.",
    },
    {
      title: "Campus Operations",
      desc: "Managing our own buildings, land, energy, water and waste responsibly, and reporting openly on our progress.",
    },
    {
      title: "Community & Partnerships",
      desc: "Sharing our expertise with host communities and working with partners to extend impact beyond the campus gate.",
    },
  ],
  initiativesTitle: "What We Are Doing",
  initiatives: [
    {
      goal: 15,
      title: "Campus Greening & Tree Planting",
      desc: "Annual tree-planting drives and landscaped green spaces across our campuses, carried out with students, staff and alumni.",
    },
    {
      goal: 7,
      title: "Energy Efficiency Retrofit",
      desc: "Replacing inefficient lighting and equipment and installing solar power for selected facilities, cutting both running costs and emissions.",
    },
    {
      goal: 12,
      title: "Waste Reduction & Recycling",
      desc: "Segregated waste collection, reduced single-use plastics and campus-wide recycling campaigns led by student volunteers.",
    },
    {
      goal: 4,
      title: "Sustainability Across the Curriculum",
      desc: "Modules and projects that let students apply sustainability thinking within their own disciplines.",
    },
  ],
  galleryTitle: "Sustainability on Campus",
  galleryIntro:
    "A look at the places where this work happens, and the people carrying it out.",
  gallery: [
    {
      image: "",
      imageKey: "heroCampusOne",
      caption: "Green spaces across our Oyo campus",
    },
    {
      image: "",
      imageKey: "heroCampusThree",
      caption: "Gardens and walkways between teaching blocks",
    },
    {
      image: "",
      imageKey: "heroCampusFive",
      caption: "Tree planting carried out with students and staff",
    },
    {
      image: "",
      imageKey: "students",
      caption: "Students leading environmental initiatives",
    },
  ],
  storiesTitle: "Impact Stories",
  storiesIntro:
    "Short accounts of work already under way across our campuses and communities.",
  stories: [
    {
      image: "",
      imageKey: "heroCampusTwo",
      category: "Energy",
      title: "Cutting energy waste across our campuses",
      summary:
        "A phased retrofit of lighting and equipment, reducing both our running costs and our emissions.",
    },
    {
      image: "",
      imageKey: "heroCampusSix",
      category: "Land",
      title: "A greener campus, year on year",
      summary:
        "Annual tree planting and careful management of the green spaces within and around our campuses.",
    },
    {
      image: "",
      imageKey: "students",
      category: "Community",
      title: "Working with local schools",
      summary:
        "Students and staff joining with nearby schools on environmental education and campus clean-ups.",
    },
  ],
  collaboratorsTitle: "Working Together",
  collaboratorsIntro:
    "These goals are met through partnership. Among those we work with are:",
  collaborators: [
    "Church of Nigeria (Anglican Communion)",
    "Host communities around our campuses",
    "Local schools and colleges",
    "Alumni and friends of the University",
    "Nigerian universities and research networks",
    "Industry, agriculture and energy partners",
    "Environmental and community organisations",
  ],
  documentsTitle: "Reports & Documents",
  documentsIntro:
    "Download our sustainability reports, policies and publications. Files are managed in the admin under Documents & Reports.",
  commitmentsTitle: "What We Hold Ourselves To",
  commitments: [
    {
      title: "Measure what we use",
      desc: "Track energy, water and waste across our campuses so that decisions rest on evidence rather than assumption.",
    },
    {
      title: "Teach it, not just practise it",
      desc: "Give every student the opportunity to engage seriously with the goals as part of their academic programme.",
    },
    {
      title: "Report openly",
      desc: "Publish our progress, including where we have fallen short, so that our commitments can be held to account.",
    },
  ],
  involvementTitle: "Get Involved",
  involvementIntro:
    "Students, staff, alumni and partners all have a part to play in meeting these goals.",
  involvement: [
    {
      title: "Students",
      desc: "Join environmental volunteering and campus greening drives, and bring the goals into your own projects and research.",
    },
    {
      title: "Staff & Faculty",
      desc: "Bring sustainability into your courses, research and day-to-day operations, and help us hold the university to its commitments.",
    },
    {
      title: "Partners & Alumni",
      desc: "Support campus greening, renewable energy projects and sustainability research through partnership, mentoring and giving.",
    },
  ],
  sourceNote:
    "Goal icons, titles and descriptions are published by the United Nations. The content of this publication has not been approved by the United Nations and does not reflect the views of the United Nations or its officials or Member States.",
};

// Postgraduate programme catalogue. This bundled copy is what the Postgraduate
// page shows when the CMS has no programmes; the CMS copy (Admin → Postgraduate
// Programmes) takes over once it has entries.
export const PG_PROGRAMMES = [
  { name: "M.A. History", award: "M.A.", faculty: "Faculty of Humanities" },
  { name: "Ph.D. History", award: "Ph.D.", faculty: "Faculty of Humanities" },
  {
    name: "M.A. Christian Religious Studies",
    award: "M.A.",
    faculty: "Faculty of Humanities",
  },
  {
    name: "PGD Christian Religious Studies",
    award: "PGD",
    faculty: "Faculty of Humanities",
  },
  {
    name: "Ph.D. Christian Religious Studies",
    award: "Ph.D.",
    faculty: "Faculty of Humanities",
  },
  {
    name: "PGD Religious Studies",
    award: "PGD",
    faculty: "Faculty of Humanities",
  },
  {
    name: "Ph.D. Religious Studies",
    award: "Ph.D.",
    faculty: "Faculty of Humanities",
  },
  { name: "Ph.D. English", award: "Ph.D.", faculty: "Faculty of Humanities" },
  {
    name: "Master of Business Administration (MBA)",
    award: "MBA",
    faculty: "Faculty of Management Sciences",
  },
  {
    name: "Master of Public Administration (MPA)",
    award: "MPA",
    faculty: "Faculty of Management Sciences",
  },
  {
    name: "Doctor of Business Administration (DBA)",
    award: "DBA",
    faculty: "Faculty of Management Sciences",
  },
  {
    name: "M.Sc. Accounting",
    award: "M.Sc.",
    faculty: "Faculty of Management Sciences",
  },
  {
    name: "PGD Accounting",
    award: "PGD",
    faculty: "Faculty of Management Sciences",
  },
  {
    name: "M.Sc. Business Administration",
    award: "M.Sc.",
    faculty: "Faculty of Management Sciences",
  },
  {
    name: "PGD Business Administration",
    award: "PGD",
    faculty: "Faculty of Management Sciences",
  },
  {
    name: "Ph.D. Business Administration",
    award: "Ph.D.",
    faculty: "Faculty of Management Sciences",
  },
  {
    name: "M.Sc. Computer Science",
    award: "M.Sc.",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "PGD Computer Science",
    award: "PGD",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "Ph.D. Computer Science",
    award: "Ph.D.",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "Master of Information Technology (MIT)",
    award: "MIT",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "M.Sc. Microbiology",
    award: "M.Sc.",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "PGD Microbiology",
    award: "PGD",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "Ph.D. Microbiology",
    award: "Ph.D.",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "M.Sc. Biochemistry",
    award: "M.Sc.",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "PGD Biochemistry",
    award: "PGD",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "Ph.D. Biochemistry",
    award: "Ph.D.",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "M.Sc. Industrial Chemistry",
    award: "M.Sc.",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "PGD Industrial Chemistry",
    award: "PGD",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "M.Sc. Geology",
    award: "M.Sc.",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "PGD Geology",
    award: "PGD",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "Ph.D. Geology",
    award: "Ph.D.",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "PGD Physics",
    award: "PGD",
    faculty: "Faculty of Natural Sciences",
  },
  {
    name: "M.Sc. Mass Communication",
    award: "M.Sc.",
    faculty: "Faculty of Social Sciences & Communication",
  },
  {
    name: "PGD Mass Communication",
    award: "PGD",
    faculty: "Faculty of Social Sciences & Communication",
  },
  {
    name: "Ph.D. Mass Communication",
    award: "Ph.D.",
    faculty: "Faculty of Social Sciences & Communication",
  },
  {
    name: "M.Ed. Educational Management",
    award: "M.Ed.",
    faculty: "Faculty of Education",
  },
  { name: "PGD Education", award: "PGD", faculty: "Faculty of Education" },
];

export const IMAGES = {
  hero: heroImage,
  heroCampusOne: heroCampusOne,
  heroCampusTwo: heroCampusTwo,
  heroCampusThree: heroCampusThree,
  heroCampusFour: heroCampusFour,
  heroCampusSix: heroCampusSix,
  heroCampusFive: heroCampusFive,
  students: studentsImage,
  vc: vchanImage,
  aboutSecondary: campusWideImage,
  campusWide: campusWideImage,
};

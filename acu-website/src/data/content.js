// Central space for editable site content.
// Update text, links, and image URLs here, components read from this file.

import logoImg from "../assets/acu-logo-new-1.png";
import heroImage from "../assets/1784031378408.jpg";
import campusWideImage from "../assets/1784816484060.jpg";
import crestImage from "../assets/acu-logo-cd.png";
import vchanImage from "../assets/vchan.jpg";
import heroCampusOne from "../assets/IMG_3272.JPG";
import heroCampusTwo from "../assets/IMG_3282.JPG";
import heroCampusThree from "../assets/IMG_3307.JPG";
import heroCampusFour from "../assets/IMG_3318.JPG";
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
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.4335198877734!2d3.9479533!3d7.849614000000009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103759796a2d6965%3A0x661ff241b20e8152!2sAjayi%20Crowther%20University!5e0!3m2!1sen!2sng!4v1707814559781!5m2!1sen!2sng",
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
  { label: "About", path: "/about" },
  { label: "Academics", path: "/academics" },
  { label: "Admissions", path: "/admissions" },
  { label: "Contact", path: "/contact" },
];

export const PORTALS = [
  { label: "Postgraduate", url: "/portal/postgraduate" },
  { label: "Undergraduate", url: "https://apply.acu.edu.ng/" },
  { label: "Part-Time", url: "/portal/part-time" },
  { label: "Foundation", url: "/portal/foundation" },
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

export const IMAGES = {
  hero: heroImage,
  heroCampusOne: heroCampusOne,
  heroCampusTwo: heroCampusTwo,
  heroCampusThree: heroCampusThree,
  heroCampusFour: heroCampusFour,
  heroCampusFive: heroCampusFive,
  vc: vchanImage,
  aboutSecondary: campusWideImage,
  campusWide: campusWideImage,
};

// Default University Library content — branches, catalogue records, electronic
// resources and services. Kept image-import-free so it runs under Node in
// server/prisma/seedLibrary.js, and mirrored on the frontend by
// src/data/library.js.

const LIBRARY_SETTINGS = {
  eyebrow: "University Library",
  title: "Knowledge, research and lifelong learning",
  intro:
    "The Ajayi Crowther University Library supports teaching, learning and research across every faculty — with print and electronic collections, reading rooms, research support and an open-access institutional repository.",
  searchPlaceholder: "Search the catalogue by title, author, ISBN or subject",
  hoursNote:
    "Opening hours vary by branch. The main library is open throughout the semester; vacation hours are shorter.",
  enquiryEmail: "library@acu.edu.ng",
  requestIntro:
    "Can't find a title, or need help with research? Send the library a request and a librarian will get back to you.",
  quickLinks: [
    { label: "Search the catalogue", path: "/catalogue" },
    { label: "Electronic resources", path: "/e-resources" },
    { label: "Institutional repository", path: "/repository" },
    { label: "Ask a librarian", path: "/contact" },
  ],
};

const LIBRARY_BRANCHES = [
  {
    name: "University Main Library",
    slug: "main-library",
    campus: "Oyo Main Campus",
    address: "Ajayi Crowther University, PMB 1066, Oyo Town, Oyo State",
    phone: "+234 814 592 0637",
    email: "library@acu.edu.ng",
    hours: [
      { day: "Monday – Friday", opens: "8:00 AM", closes: "6:00 PM" },
      { day: "Saturday", opens: "9:00 AM", closes: "3:00 PM" },
      { day: "Sunday", opens: "", closes: "Closed" },
    ],
    sortOrder: 0,
  },
  {
    name: "Faculty of Law Library",
    slug: "law-library",
    campus: "Oyo Main Campus",
    address: "Faculty of Law, Ajayi Crowther University, Oyo",
    phone: "+234 814 592 0638",
    email: "lawlibrary@acu.edu.ng",
    hours: [
      { day: "Monday – Friday", opens: "8:30 AM", closes: "5:00 PM" },
      { day: "Saturday", opens: "10:00 AM", closes: "2:00 PM" },
      { day: "Sunday", opens: "", closes: "Closed" },
    ],
    sortOrder: 1,
  },
  {
    name: "Health Sciences Library",
    slug: "health-sciences-library",
    campus: "Oyo Main Campus",
    address: "College of Health Sciences, Ajayi Crowther University, Oyo",
    phone: "+234 814 592 0639",
    email: "healthlibrary@acu.edu.ng",
    hours: [
      { day: "Monday – Friday", opens: "8:00 AM", closes: "8:00 PM" },
      { day: "Saturday", opens: "9:00 AM", closes: "4:00 PM" },
      { day: "Sunday", opens: "2:00 PM", closes: "6:00 PM" },
    ],
    sortOrder: 2,
  },
];

const LIBRARY_BOOKS = [
  {
    title: "Things Fall Apart",
    slug: "things-fall-apart",
    authors: "Chinua Achebe",
    isbn: "978-0385474542",
    publisher: "Anchor Books",
    publishedYear: 1958,
    resourceType: "Book",
    subject: "Literature",
    callNumber: "PR9387.9.A3 T5",
    description:
      "Achebe's classic novel of Igbo life and the arrival of colonialism, a cornerstone of African literature.",
    branch: "main-library",
    availability: "available",
    copies: 6,
    availableCopies: 5,
    featured: true,
  },
  {
    title: "Introduction to Nigerian Legal System",
    slug: "introduction-to-nigerian-legal-system",
    authors: "Yemi Osinbajo, A. Kalu",
    isbn: "978-9780234567",
    publisher: "Snaap Press",
    publishedYear: 2016,
    edition: "2nd",
    resourceType: "Book",
    subject: "Law",
    callNumber: "KTA68 .O85",
    description:
      "A foundational text on the sources and structure of Nigerian law, widely used by undergraduate law students.",
    branch: "law-library",
    availability: "reference",
    copies: 3,
    availableCopies: 3,
  },
  {
    title: "Gray's Anatomy for Students",
    slug: "grays-anatomy-for-students",
    authors: "Richard Drake, Wayne Vogl, Adam Mitchell",
    isbn: "978-0323934237",
    publisher: "Elsevier",
    publishedYear: 2023,
    edition: "5th",
    resourceType: "Reference",
    subject: "Medicine",
    callNumber: "QM23.2 .D73",
    description:
      "An accessible, clinically focused anatomy textbook for medical and health sciences students.",
    branch: "health-sciences-library",
    availability: "available",
    copies: 4,
    availableCopies: 2,
    featured: true,
  },
  {
    title: "Principles of Economics",
    slug: "principles-of-economics",
    authors: "N. Gregory Mankiw",
    isbn: "978-1305585126",
    publisher: "Cengage Learning",
    publishedYear: 2017,
    edition: "8th",
    resourceType: "Book",
    subject: "Economics",
    callNumber: "HB171.5 .M36",
    description:
      "A standard introduction to micro- and macroeconomics used across the social sciences.",
    branch: "main-library",
    availability: "available",
    copies: 8,
    availableCopies: 6,
  },
  {
    title: "Artificial Intelligence: A Modern Approach",
    slug: "artificial-intelligence-a-modern-approach",
    authors: "Stuart Russell, Peter Norvig",
    isbn: "978-0134610993",
    publisher: "Pearson",
    publishedYear: 2020,
    edition: "4th",
    resourceType: "Book",
    subject: "Computer Science",
    callNumber: "Q335 .R87",
    description:
      "The leading textbook on artificial intelligence, covering search, learning, reasoning and robotics.",
    branch: "main-library",
    availability: "on-loan",
    copies: 5,
    availableCopies: 0,
    featured: true,
  },
  {
    title: "Organic Chemistry",
    slug: "organic-chemistry",
    authors: "Paula Bruice",
    isbn: "978-0134042282",
    publisher: "Pearson",
    publishedYear: 2016,
    edition: "8th",
    resourceType: "Book",
    subject: "Chemistry",
    callNumber: "QD251.3 .B78",
    description:
      "A rigorous but readable treatment of organic chemistry for undergraduate programmes.",
    branch: "main-library",
    availability: "available",
    copies: 6,
    availableCopies: 4,
  },
  {
    title: "Business Ethics: Concepts and Cases",
    slug: "business-ethics-concepts-and-cases",
    authors: "Manuel G. Velasquez",
    isbn: "978-0205066094",
    publisher: "Pearson",
    publishedYear: 2011,
    edition: "7th",
    resourceType: "Book",
    subject: "Management",
    callNumber: "HF5387 .V45",
    description:
      "Introduces moral reasoning in business through theory and case studies.",
    branch: "main-library",
    availability: "available",
    copies: 4,
    availableCopies: 4,
  },
  {
    title: "Journal of African Studies",
    slug: "journal-of-african-studies",
    authors: "Ajayi Crowther University",
    publisher: "ACU Press",
    publishedYear: 2024,
    resourceType: "Journal",
    subject: "African Studies",
    callNumber: "DT1 .J68",
    description:
      "A peer-reviewed journal publishing research on African history, culture and development.",
    branch: "main-library",
    availability: "reference",
    copies: 2,
    availableCopies: 2,
  },
  {
    title: "The Church and Education in Nigeria",
    slug: "church-and-education-in-nigeria",
    authors: "J. A. Atanda",
    publisher: "University Press",
    publishedYear: 2010,
    resourceType: "Book",
    subject: "History",
    callNumber: "LA1631 .A83",
    description:
      "A history of missionary and church-led education in Nigeria, with a focus on the Anglican tradition.",
    branch: "main-library",
    availability: "available",
    copies: 3,
    availableCopies: 3,
  },
  {
    title: "Constitutional Law in Nigeria",
    slug: "constitutional-law-in-nigeria",
    authors: "Keziah A. Ajayi",
    isbn: "978-9781234567",
    publisher: "Princeton Publishing",
    publishedYear: 2019,
    resourceType: "Reference",
    subject: "Law",
    callNumber: "KTA1750 .A33",
    description:
      "An authoritative guide to the Nigerian constitution, federalism and fundamental rights.",
    branch: "law-library",
    availability: "reference",
    copies: 2,
    availableCopies: 2,
  },
  {
    title: "Research Methods for Business Students",
    slug: "research-methods-for-business-students",
    authors: "Mark Saunders, Philip Lewis, Adrian Thornhill",
    isbn: "978-1292208787",
    publisher: "Pearson",
    publishedYear: 2019,
    edition: "8th",
    resourceType: "Book",
    subject: "Management",
    callNumber: "HD30.4 .S28",
    description:
      "A practical guide to designing and carrying out research projects in business and management.",
    branch: "main-library",
    availability: "available",
    copies: 5,
    availableCopies: 3,
  },
  {
    title: "Microbiology: An Introduction",
    slug: "microbiology-an-introduction",
    authors: "Gerard Tortora, Berdell Funke, Christine Case",
    isbn: "978-0134605180",
    publisher: "Pearson",
    publishedYear: 2018,
    edition: "13th",
    resourceType: "Book",
    subject: "Biological Sciences",
    callNumber: "QR41.2 .T67",
    description:
      "An introductory microbiology text covering microbial structure, genetics, disease and immunity.",
    branch: "health-sciences-library",
    availability: "available",
    copies: 6,
    availableCopies: 5,
  },
];

const LIBRARY_E_RESOURCES = [
  {
    name: "JSTOR",
    slug: "jstor",
    provider: "ITHAKA",
    category: "Database",
    description:
      "A digital library of academic journals, books and primary sources across the humanities, social sciences and sciences.",
    accessUrl: "https://www.jstor.org/",
    accessNote: "On-campus access, or sign in with your university account.",
    sortOrder: 0,
  },
  {
    name: "ResearchGate",
    slug: "researchgate",
    provider: "ResearchGate GmbH",
    category: "Open access",
    description:
      "A social networking site for scientists and researchers to share papers, ask questions and find collaborators.",
    accessUrl: "https://www.researchgate.net/",
    accessNote: "Free to register; some full texts are request-only.",
    sortOrder: 1,
  },
  {
    name: "Google Scholar",
    slug: "google-scholar",
    provider: "Google",
    category: "Open access",
    description:
      "A freely accessible web search engine that indexes scholarly literature across many disciplines.",
    accessUrl: "https://scholar.google.com/",
    accessNote: "Open access. Link it to the library to find full texts.",
    sortOrder: 2,
  },
  {
    name: "DOAJ — Directory of Open Access Journals",
    slug: "doaj",
    provider: "DOAJ",
    category: "E-journal",
    description:
      "An online directory that indexes and provides access to high-quality, open-access, peer-reviewed journals.",
    accessUrl: "https://doaj.org/",
    accessNote: "Open access.",
    sortOrder: 3,
  },
  {
    name: "PubMed Central",
    slug: "pubmed-central",
    provider: "US National Library of Medicine",
    category: "Database",
    description:
      "A free full-text archive of biomedical and life sciences journal literature.",
    accessUrl: "https://www.ncbi.nlm.nih.gov/pmc/",
    accessNote: "Open access. Useful for health sciences research.",
    sortOrder: 4,
  },
  {
    name: "Project MUSE",
    slug: "project-muse",
    provider: "Johns Hopkins University Press",
    category: "E-journal",
    description:
      "Full-text scholarly journals in the humanities and social sciences.",
    accessUrl: "https://muse.jhu.edu/",
    accessNote: "On-campus access where subscribed.",
    sortOrder: 5,
  },
  {
    name: "ACU Institutional Repository",
    slug: "acu-institutional-repository",
    provider: "Ajayi Crowther University",
    category: "Repository",
    description:
      "Theses, dissertations, articles and other research outputs from ACU staff and students.",
    accessUrl: "https://library.acu.edu.ng/repository",
    accessNote: "Open access.",
    sortOrder: 6,
  },
  {
    name: "EBSCO Open Dissertations",
    slug: "ebsco-open-dissertations",
    provider: "EBSCO",
    category: "Database",
    description:
      "A free database of electronic theses and dissertations from universities worldwide.",
    accessUrl: "https://biblioboard.com/opendissertations/",
    accessNote: "Open access.",
    sortOrder: 7,
  },
];

const LIBRARY_SERVICES = [
  {
    title: "Borrowing & membership",
    slug: "borrowing-and-membership",
    summary:
      "Register as a reader, borrow print titles and renew loans across all campus libraries.",
    description:
      "Students and staff register with a valid ID or matriculation number. Undergraduate students may borrow up to four titles for two weeks; postgraduate students and staff may borrow more. Reference and special collections are consulted in the reading room only.",
    sortOrder: 0,
  },
  {
    title: "Research support",
    slug: "research-support",
    summary:
      "Literature searching, citation, referencing and thesis preparation guidance from subject librarians.",
    description:
      "Subject librarians help with formulating search strategies, using databases, managing references and preparing theses and dissertations. Book a consultation at any branch.",
    sortOrder: 1,
  },
  {
    title: "Reading rooms & study spaces",
    slug: "reading-rooms-and-study-spaces",
    summary:
      "Quiet reading rooms, group discussion areas and reading-friendly spaces across the campuses.",
    description:
      "Each branch provides individual reading spaces and areas for group study. Silence is observed in the main reading rooms at all times.",
    sortOrder: 2,
  },
  {
    title: "Electronic resources",
    slug: "electronic-resources",
    summary:
      "Access to databases, e-journals and e-books, on campus or remotely.",
    description:
      "The library subscribes to a range of databases and e-journal collections. Many resources are open access; subscribed titles are available on campus or by signing in with your university account.",
    sortOrder: 3,
  },
  {
    title: "Information literacy",
    slug: "information-literacy",
    summary:
      "Library orientation and training on finding, evaluating and using information ethically.",
    description:
      "Orientation sessions are held for new students each semester, with further workshops on database searching, referencing and avoiding plagiarism available on request.",
    sortOrder: 4,
  },
];

module.exports = {
  LIBRARY_SETTINGS,
  LIBRARY_BRANCHES,
  LIBRARY_BOOKS,
  LIBRARY_E_RESOURCES,
  LIBRARY_SERVICES,
};

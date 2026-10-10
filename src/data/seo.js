// Per-route document title and description, used for search results and link
// previews. The site is a client-rendered SPA, so index.html alone can only
// describe the homepage; RouteMeta updates these tags as the visitor moves.
//
// Routes left out of ROUTE_META (news articles, admin, the hostel portal) are
// owned by the page itself or are private, so they are left untouched.

export const SITE_URL = "https://ajayi-crowther-university.vercel.app";

export const DEFAULT_TITLE =
  "Ajayi Crowther University, Oyo | Raising Godly Intellectuals";

export const ROUTE_META = {
  "/": {
    title: DEFAULT_TITLE,
    description:
      "Ajayi Crowther University (ACU), Oyo — a faith-based Anglican university in Oyo State, Nigeria. Explore admissions, faculties, research and campus life.",
  },
  "/about": {
    title: "About ACU | Ajayi Crowther University, Oyo",
    description:
      "Our history, vision and mission. Ajayi Crowther University is a faith-based Anglican institution raising godly intellectuals in Oyo State, Nigeria.",
  },
  "/about/principal-officers": {
    title: "Principal Officers | Ajayi Crowther University, Oyo",
    description:
      "Meet the Vice-Chancellor, Registrar, Bursar and other principal officers leading Ajayi Crowther University, Oyo.",
  },
  "/academics": {
    title: "Academics | Ajayi Crowther University, Oyo",
    description:
      "Faculties, departments and degree programmes at Ajayi Crowther University, Oyo — undergraduate and postgraduate study.",
  },
  "/listofcourses": {
    title: "List of Courses | Ajayi Crowther University, Oyo",
    description:
      "Browse the full list of accredited courses and programmes offered across the faculties of Ajayi Crowther University, Oyo.",
  },
  "/admissions": {
    title: "Admissions | Ajayi Crowther University, Oyo",
    description:
      "How to apply to Ajayi Crowther University, Oyo — entry requirements, undergraduate, part-time, foundation and postgraduate routes.",
  },
  "/news": {
    title: "News & Events | Ajayi Crowther University, Oyo",
    description:
      "The latest news, events, press releases and convocation updates from Ajayi Crowther University, Oyo.",
  },
  "/gallery": {
    title: "Gallery | Ajayi Crowther University, Oyo",
    description:
      "Photographs of campus life, events and facilities at Ajayi Crowther University, Oyo.",
  },
  "/sustainability": {
    title: "Sustainability | Ajayi Crowther University, Oyo",
    description:
      "Ajayi Crowther University's contribution to the UN Sustainable Development Goals through teaching, research and campus operations.",
  },
  "/directory": {
    title: "Directory | Ajayi Crowther University, Oyo",
    description:
      "Find staff, the library and other university services at Ajayi Crowther University, Oyo.",
  },
  "/directory/staff": {
    title: "Staff Directory | Ajayi Crowther University, Oyo",
    description:
      "Search academic and administrative staff at Ajayi Crowther University, Oyo by name, faculty or department.",
  },
  "/directory/library": {
    title: "Library | Ajayi Crowther University, Oyo",
    description:
      "The library's collections, reading rooms, services and study resources for students and staff of Ajayi Crowther University, Oyo.",
  },
  "/directory/library/repository": {
    title: "Institutional Repository | Ajayi Crowther University, Oyo",
    description:
      "The ACU Institutional Repository — open-access theses, dissertations, journal articles and research outputs from Ajayi Crowther University, Oyo.",
  },
  "/resources/library/repository": {
    title: "Institutional Repository | Ajayi Crowther University, Oyo",
    description:
      "The ACU Institutional Repository — open-access theses, dissertations, journal articles and research outputs from Ajayi Crowther University, Oyo.",
  },
  "/resources": {
    title: "Resources | Ajayi Crowther University, Oyo",
    description:
      "Documents, reports, policies and other resources published by Ajayi Crowther University, Oyo.",
  },
  "/research": {
    title: "Research | Ajayi Crowther University, Oyo",
    description:
      "Research at Ajayi Crowther University, Oyo — centres, outputs and the publications of our academic staff.",
  },
  "/research/publications": {
    title: "Publications | Ajayi Crowther University, Oyo",
    description:
      "Journal articles, books and conference papers published by the academic staff of Ajayi Crowther University, Oyo.",
  },
  "/student-life": {
    title: "Student Life | Ajayi Crowther University, Oyo",
    description:
      "Accommodation, student services and campus life at Ajayi Crowther University, Oyo.",
  },
  "/portal/postgraduate": {
    title: "Postgraduate School | Ajayi Crowther University, Oyo",
    description:
      "Postgraduate programmes and the Postgraduate School of Ajayi Crowther University, Oyo.",
  },
  "/contact": {
    title: "Contact Us | Ajayi Crowther University, Oyo",
    description:
      "Contact Ajayi Crowther University, Oyo — address, phone, email and enquiry form.",
  },
};

// Returns the meta for an exact path, or null when the page owns its own tags.
export function metaFor(pathname) {
  return ROUTE_META[pathname] || null;
}

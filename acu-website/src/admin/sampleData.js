export const SAMPLE_NEWS = [
  {
    id: "n1",
    title: "ACU Holds Inaugural Research Symposium",
    category: "Research",
    author: "Prof. A. O. Adebowale",
    date: "2026-08-12",
    published: true,
    featured: true,
    coverImage: "",
    content:
      "<p>Ajayi Crowther University hosted its first Research Symposium showcasing faculty and student research across disciplines.</p>",
  },
  {
    id: "n2",
    title: "Admission Applications Open for 2026/2027",
    category: "Admissions",
    author: "Admissions Office",
    date: "2026-07-01",
    published: true,
    featured: false,
    coverImage: "",
    content:
      "<p>Undergraduate and postgraduate applications are now open. Visit the admissions page for details and deadlines.</p>",
  },
];

export const SAMPLE_EVENTS = [
  {
    id: "e1",
    title: "Matriculation Ceremony",
    date: "2026-09-20",
    time: "10:00",
    venue: "Main Auditorium",
    published: true,
  },
  {
    id: "e2",
    title: "Graduation Workshop",
    date: "2026-10-05",
    time: "09:00",
    venue: "Seminar Hall",
    published: false,
  },
];

export const SAMPLE_PAGES = [
  {
    id: "p1",
    slug: "about",
    title: "About Ajayi Crowther University",
    published: true,
    content:
      "<p>Founded on Christian principles, ACU provides a faith-based academic environment focusing on integrity and scholarship.</p>",
  },
  {
    id: "p2",
    slug: "vision-mission",
    title: "Vision & Mission",
    published: true,
    content:
      "<p>Vision: To be a leading center of Christian higher education. Mission: To develop intellectually and spiritually grounded graduates.</p>",
  },
];

export const SAMPLE_STATS = {
  newsCount: SAMPLE_NEWS.length,
  eventsUpcoming: SAMPLE_EVENTS.filter((e) => e.published).length,
  programmes: 51,
  faculties: 13,
  pagesPublished: SAMPLE_PAGES.filter((p) => p.published).length,
  galleryImages: 132,
};

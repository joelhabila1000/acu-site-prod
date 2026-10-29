// Webinar series at Ajayi Crowther University, Oyo.
//
// Bundled content for the /webinars page. Dates are ISO (YYYY-MM-DD) so the
// page can split sessions into upcoming and past without extra input. The list
// is ordered by date once on the page, so add entries in any order here.

export const WEBINAR_CATEGORIES = [
  "Research",
  "Teaching",
  "Careers",
  "Faith and Ethics",
  "Sustainability",
  "Library",
];

export const WEBINARS = [
  {
    id: "ai-teaching-learning",
    title: "Artificial Intelligence in the Classroom",
    category: "Research",
    date: "2026-11-12",
    time: "10:00",
    duration: "90 minutes",
    speaker: "Prof. O. J. Oke",
    speakerRole: "Professor of Computer Science",
    platform: "Zoom",
    summary:
      "Where AI genuinely helps teaching and where it gets in the way, with practical examples from Nigerian lecture rooms and a look at what the next few years are likely to bring.",
    registerUrl: "https://apply.acu.edu.ng/",
    status: "upcoming",
  },
  {
    id: "postgraduate-proposal",
    title: "Writing a Research Proposal That Gets Approved",
    category: "Research",
    date: "2026-11-26",
    time: "15:00",
    duration: "75 minutes",
    speaker: "Dr. C. M. Akinyele",
    speakerRole: "Faculty of Education",
    platform: "Google Meet",
    summary:
      "A step-by-step walk through a strong postgraduate proposal, from framing the question and reviewing the literature to choosing a method you can actually carry out.",
    registerUrl: "https://apply.acu.edu.ng/",
    status: "upcoming",
  },
  {
    id: "faith-and-technology",
    title: "Faith, Ethics and Emerging Technology",
    category: "Faith and Ethics",
    date: "2026-12-03",
    time: "16:00",
    duration: "60 minutes",
    speaker: "Prof. J. A. Ampitan",
    speakerRole: "Professor of New Testament Studies",
    platform: "Zoom",
    summary:
      "How a values-driven university should think about new technology, and the questions of truth, dignity and community that come with it.",
    registerUrl: "https://apply.acu.edu.ng/",
    status: "upcoming",
  },
  {
    id: "graduate-careers",
    title: "Careers in the Digital Economy",
    category: "Careers",
    date: "2026-12-10",
    time: "11:00",
    duration: "90 minutes",
    speaker: "Alumni and industry panel",
    speakerRole: "ACU Alumni Association",
    platform: "Zoom",
    summary:
      "Graduates working in technology, finance and the creative industries on the skills employers look for, and how to present your degree when you apply.",
    registerUrl: "https://apply.acu.edu.ng/",
    status: "upcoming",
  },
  {
    id: "climate-resilience",
    title: "Climate Resilience for Nigerian Agriculture",
    category: "Sustainability",
    date: "2026-10-08",
    time: "10:00",
    duration: "80 minutes",
    speaker: "Prof. D. O. Ogunleye",
    speakerRole: "Faculty of Environmental Studies",
    platform: "Zoom",
    summary:
      "What a changing climate means for farmers in Oyo State, and the practical adaptations our research supports.",
    recordingUrl: "https://www.youtube.com/",
    status: "past",
  },
  {
    id: "information-literacy",
    title: "Finding and Judging Good Sources",
    category: "Library",
    date: "2026-09-24",
    time: "13:00",
    duration: "60 minutes",
    speaker: "University Library",
    speakerRole: "Reader Services",
    platform: "Google Meet",
    summary:
      "A practical session on using the library catalogue, our e-resources and open databases, and on telling reliable sources from the rest.",
    recordingUrl: "https://www.youtube.com/",
    status: "past",
  },
  {
    id: "first-year-teaching",
    title: "From Campus to Classroom: Your First Year Teaching",
    category: "Teaching",
    date: "2026-09-10",
    time: "15:30",
    duration: "75 minutes",
    speaker: "Dr. C. M. Akinyele",
    speakerRole: "Faculty of Education",
    platform: "Zoom",
    summary:
      "New teachers on classroom management, planning your first terms well, and building the habits that keep good teachers in the profession.",
    recordingUrl: "https://www.youtube.com/",
    status: "past",
  },
  {
    id: "sdgs-on-campus",
    title: "The 2030 Agenda on Campus",
    category: "Sustainability",
    date: "2026-08-27",
    time: "10:00",
    duration: "60 minutes",
    speaker: "Sustainability Office",
    speakerRole: "Ajayi Crowther University",
    platform: "Zoom",
    summary:
      "An introduction to the Sustainable Development Goals and how students and staff can take part through study, research and campus life.",
    recordingUrl: "https://www.youtube.com/",
    status: "past",
  },
];

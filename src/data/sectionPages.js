// Content for the informational pages reached from the primary navigation
// (Academics > Resources, Admissions, Student Life, Research, News & Events).
//
// These pages are rendered by a single reusable component (SectionPage.jsx),
// keyed by the exact route path. Keeping the copy here means new pages only need
// a data entry plus a route — no new component per page.
//
// The copy below is an initial draft for the University to review and refine.

export const SECTION_PAGES = {
  // ---------------------------------------------------------------- Resources
  "/resources/academic-calendar": {
    crumb: "Academics",
    title: "Academic Calendar",
    lede: "Key dates for the 2026/2027 academic session, from resumption and registration through examinations to convocation.",
    calendar: {
      session: "2026/2027",
      note: "Dates are confirmed by the Registry and published here before each semester begins. Activities marked TBC are awaiting confirmation.",
      semesters: [
        {
          name: "First Semester",
          events: [
            { label: "Resumption and arrival of students" },
            { label: "Registration and clearance (fresh students)" },
            { label: "Registration (returning students)" },
            { label: "Orientation programme for fresh students" },
            { label: "Matriculation ceremony" },
            { label: "Lectures begin" },
            { label: "Continuous assessment" },
            { label: "Lectures end" },
            { label: "Revision week" },
            { label: "First semester examinations" },
            { label: "Inter-semester break" },
          ],
        },
        {
          name: "Second Semester",
          events: [
            { label: "Resumption and registration" },
            { label: "Lectures begin" },
            { label: "Continuous assessment" },
            { label: "Lectures end" },
            { label: "Revision week" },
            { label: "Second semester examinations" },
            { label: "Faculty and Senate approval of results" },
            { label: "Convocation ceremony" },
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Staying on schedule",
        paragraphs: [
          "Students should confirm deadlines with their Faculty Officer. Registration and examination timetables are announced through the Registry and the student portal, and this calendar is updated as each date is confirmed.",
        ],
      },
    ],
  },

  "/resources/library": {
    crumb: "Academics",
    title: "University Library",
    lede: "Well-stocked libraries supporting teaching, learning and research across the University.",
    sections: [
      {
        heading: "Collections and access",
        paragraphs: [
          "The University's libraries serve students and staff across all faculties, with physical and digital collections and quiet reading space.",
        ],
        list: [
          "Books, journals and reference materials",
          "Past projects, theses and dissertations",
          "Electronic resources and academic databases",
          "Reading rooms and group study space",
        ],
      },
      {
        heading: "Opening hours",
        paragraphs: [
          "Libraries open on weekdays with extended hours during examination periods. Current hours and holiday arrangements are posted at each library entrance.",
        ],
      },
    ],
  },

  "/resources/e-learning": {
    crumb: "Academics",
    title: "E-Learning",
    lede: "Digital tools that extend teaching and learning beyond the lecture hall.",
    sections: [
      {
        heading: "Learning online",
        paragraphs: [
          "Course materials, assessments and virtual classes are delivered through the University's e-learning platforms.",
        ],
        list: [
          "Lecture notes and course materials",
          "Assignments and submissions",
          "Virtual classes and discussion forums",
          "Continuous assessment and results",
        ],
      },
      {
        heading: "Getting support",
        paragraphs: [
          "Students who need help with their e-learning account should contact the ICT Centre, while academic queries are handled by the relevant lecturer or department.",
        ],
      },
    ],
  },

  "/resources/directorate-of-academic-planning": {
    crumb: "Academics",
    title: "Directorate of Academic Planning",
    lede: "Coordinates academic planning, quality assurance and accreditation across the University.",
    sections: [
      {
        heading: "Mandate",
        paragraphs: [
          "The Directorate works with faculties and the Registry to plan, monitor and improve the University's academic programmes.",
        ],
        list: [
          "Academic planning and curriculum review",
          "Quality assurance and internal audits",
          "Accreditation with the NUC and professional bodies",
          "Institutional research and statistics",
        ],
      },
      {
        heading: "Working with faculties",
        paragraphs: [
          "The Directorate supports faculties through programme reviews, accreditation exercises and the collection of academic data for planning and reporting.",
        ],
      },
    ],
  },

  // --------------------------------------------------------------- Admissions
  "/admissions/how-to-apply": {
    crumb: "Admissions",
    title: "How to Apply",
    lede: "A step-by-step guide to applying for admission to Ajayi Crowther University.",
    sections: [
      {
        heading: "Undergraduate applicants",
        paragraphs: [
          "Applications are made online through the University's admission portal. Have your personal details, O'Level results and JAMB information ready before you begin.",
        ],
        list: [
          "Create an account on the admission portal",
          "Complete the application form and upload your documents",
          "Pay the application fee",
          "Submit and print your acknowledgement slip",
          "Await screening and admission notification",
        ],
      },
      {
        heading: "After you apply",
        paragraphs: [
          "Candidates are contacted through the portal and the contact details supplied on the application. Keep your login details safe so you can track your status.",
        ],
      },
    ],
    cta: {
      label: "Apply Now",
      href: "https://apply.acu.edu.ng/",
      external: true,
    },
  },

  "/admissions/requirements": {
    crumb: "Admissions",
    title: "Admission Requirements",
    lede: "General entry requirements for undergraduate programmes at ACU.",
    sections: [
      {
        heading: "O'Level requirements",
        paragraphs: [
          "Candidates must present five credit passes in relevant subjects, including English Language and Mathematics, at not more than two sittings.",
        ],
        list: [
          "Five O'Level credit passes (WAEC, NECO or equivalent)",
          "Credits in English Language and Mathematics",
          "Subjects relevant to the intended course of study",
          "Not more than two sittings",
        ],
      },
      {
        heading: "UTME requirements",
        paragraphs: [
          "Candidates must sit the Unified Tertiary Matriculation Examination (UTME) and meet the cut-off mark for their chosen programme, with the correct subject combination.",
        ],
      },
    ],
  },

  "/admissions/utme-direct-entry": {
    crumb: "Admissions",
    title: "UTME & Direct Entry",
    lede: "Entry routes for UTME candidates and Direct Entry applicants.",
    sections: [
      {
        heading: "UTME candidates",
        paragraphs: [
          "UTME candidates apply with their JAMB result and O'Level results, choosing ACU as their institution of choice.",
        ],
      },
      {
        heading: "Direct Entry candidates",
        paragraphs: [
          "Direct Entry applicants enter at 200 level with an advanced-level qualification, subject to the requirements of the intended programme.",
        ],
        list: [
          "A-Level, IJMB or JUPEB results",
          "Ordinary National Diploma (OND) or Higher National Diploma (HND)",
          "NCE and equivalent qualifications",
          "Relevant degree for some programmes",
        ],
      },
    ],
  },

  "/admissions/postgraduate": {
    crumb: "Admissions",
    title: "Postgraduate Admissions",
    lede: "Admission into postgraduate diploma, master's and doctoral programmes.",
    sections: [
      {
        heading: "Entry requirements",
        paragraphs: [
          "Postgraduate applicants must hold a relevant bachelor's degree from a recognised university, with the class of degree required by the programme.",
        ],
        list: [
          "Postgraduate Diploma: relevant bachelor's degree or HND",
          "Master's: relevant bachelor's degree with the required class",
          "PhD: relevant master's degree with a satisfactory research proposal",
          "NYSC discharge or exemption where applicable",
        ],
      },
      {
        heading: "The Postgraduate School",
        paragraphs: [
          "The Postgraduate School coordinates admission, supervision and examination of higher degree programmes across the faculties.",
        ],
      },
    ],
  },

  "/admissions/part-time": {
    crumb: "Admissions",
    title: "Part-Time & Conversion Programmes",
    lede: "Flexible study for working professionals, and conversion routes that open a degree to holders of HND and other qualifications.",
    sections: [
      {
        heading: "Part-time study",
        paragraphs: [
          "ACU runs part-time degree programmes for working professionals and others who cannot study full-time. Lectures are scheduled for weekends and evenings so you can keep working while you earn your degree.",
        ],
        list: [
          "Weekend and evening lectures",
          "The same curriculum and standards as the full-time programme",
          "Study across our campuses and study centres",
          "Suited to teachers, civil servants and other professionals",
        ],
      },
      {
        heading: "Conversion programmes",
        paragraphs: [
          "A conversion programme admits holders of Higher National Diploma (HND) and other relevant qualifications into a degree programme, usually at an advanced level. It is the recognised route for HND holders to convert to a bachelor's degree, while graduates changing discipline can do so through a Postgraduate Diploma.",
        ],
        list: [
          "HND to degree (top-up) conversion",
          "Postgraduate Diploma (PGD) as a conversion route",
          "Credit transfer assessed on a case-by-case basis",
        ],
      },
      {
        heading: "How to apply",
        paragraphs: [
          "Apply online through the University admission portal. Have your certificates, transcripts and NYSC documents ready, and contact the Admissions Office if you are unsure whether your qualification is eligible for conversion.",
        ],
      },
    ],
    facts: [
      ["Mode", "Weekend & evening / part-time"],
      ["Conversion", "HND holders and graduates changing discipline"],
      ["Award", "Bachelor's degree / Postgraduate Diploma"],
    ],
    cta: {
      label: "Apply Now",
      href: "https://apply.acu.edu.ng/",
      external: true,
    },
  },

  "/admissions/international-students": {
    crumb: "Admissions",
    title: "International Students",
    lede: "Information for applicants from outside Nigeria.",
    sections: [
      {
        heading: "Applying from abroad",
        paragraphs: [
          "International applicants follow the same application process and are supported through the admission and enrolment stages.",
        ],
        list: [
          "Certified copies of academic transcripts and certificates",
          "Evidence of English Language proficiency where required",
          "A valid passport and, on admission, student visa documentation",
          "Equivalence of qualifications assessed on a case-by-case basis",
        ],
      },
      {
        heading: "Living in Nigeria",
        paragraphs: [
          "The University assists international students with accommodation and orientation. Enquiries can be directed to the Admissions Office.",
        ],
      },
    ],
  },

  "/admissions/scholarships": {
    crumb: "Admissions",
    title: "Scholarships & Financial Aid",
    lede: "Support available to help students fund their studies.",
    sections: [
      {
        heading: "Awards and support",
        paragraphs: [
          "The University offers a range of scholarships and financial support to eligible students, alongside external scholarship opportunities.",
        ],
        list: [
          "Merit awards for outstanding academic performance",
          "Support for indigent students",
          "Church and diocesan sponsorship",
          "External scholarships and bursaries",
        ],
      },
      {
        heading: "How to qualify",
        paragraphs: [
          "Eligibility criteria and application windows are announced by the Registry and the Bursary each session.",
        ],
      },
    ],
  },

  "/admissions/fees": {
    crumb: "Admissions",
    title: "Fees & Payment Plans",
    lede: "Tuition and other charges, and how to pay them.",
    sections: [
      {
        heading: "What you pay",
        paragraphs: [
          "Fees cover tuition and other statutory charges. The schedule of fees is published by the Bursary each session and may vary by programme.",
        ],
        list: [
          "Tuition and academic charges",
          "Accommodation (where applicable)",
          "Other statutory and departmental charges",
        ],
      },
      {
        heading: "Payment plans",
        paragraphs: [
          "Fees are paid in instalments through the designated channels. Students should obtain an official receipt for every payment and keep it safe.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------- Student Life
  "/student-life": {
    crumb: "Students",
    title: "Student Life",
    lede: "Life at ACU extends beyond the classroom — in halls, societies, sports and a community of faith.",
    links: [
      { label: "Accommodation & Hostels", path: "/student-life/accommodation" },
      { label: "Campus Life", path: "/student-life/campus-life" },
      { label: "Clubs & Societies", path: "/student-life/clubs-societies" },
      { label: "Sports", path: "/student-life/sports" },
      { label: "Health Centre", path: "/student-life/health-centre" },
      { label: "Student Affairs", path: "/student-life/student-affairs" },
      { label: "Counselling", path: "/student-life/counselling" },
      { label: "Chapel & Worship", path: "/student-life/chapel" },
      { label: "Security", path: "/student-life/security" },
    ],
    sections: [
      {
        heading: "A community of faith and learning",
        paragraphs: [
          "ACU is a residential, faith-based community. Students take part in worship, societies, sport and student governance, supported by staff dedicated to their welfare.",
        ],
      },
    ],
  },

  "/student-life/accommodation": {
    crumb: "Students",
    title: "Accommodation & Hostels",
    lede: "On-campus living that supports study, community and safety.",
    sections: [
      {
        heading: "Halls of residence",
        paragraphs: [
          "The University provides hostel accommodation for students, with separate halls and house rules that support a studious environment.",
        ],
        list: [
          "Allocation handled through Student Affairs",
          "Furnished rooms with shared facilities",
          "On-site security and supervision",
          "Maintenance and warden support",
        ],
      },
      {
        heading: "Applying for a room",
        paragraphs: [
          "Accommodation is allotted each session on payment of the applicable hostel fee. Students are advised to apply early as places are limited.",
        ],
      },
    ],
  },

  "/student-life/campus-life": {
    crumb: "Students",
    title: "Campus Life",
    lede: "A focused, values-driven campus environment in the historic town of Oyo.",
    sections: [
      {
        heading: "Life on campus",
        paragraphs: [
          "From chapel services and societies to sporting competitions and cultural events, campus life at ACU is built around community and character.",
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "Students balance academics with worship, recreation and leadership, with facilities and activities across the campus.",
        ],
        list: [
          "Chapel and devotional life",
          "Student societies and associations",
          "Sports and recreation",
          "Cultural and social events",
        ],
      },
    ],
  },

  "/student-life/clubs-societies": {
    crumb: "Students",
    title: "Clubs & Societies",
    lede: "Associations that build leadership, service and belonging.",
    sections: [
      {
        heading: "Get involved",
        paragraphs: [
          "Students join departmental, religious, cultural and service societies, developing skills and friendships outside the classroom.",
        ],
        list: [
          "Departmental and faculty associations",
          "Christian and fellowship groups",
          "Cultural and language societies",
          "Debate, entrepreneurship and service clubs",
        ],
      },
      {
        heading: "Starting a society",
        paragraphs: [
          "New societies are registered through Student Affairs, subject to the approval of the University.",
        ],
      },
    ],
  },

  "/student-life/sports": {
    crumb: "Students",
    title: "Sports & Recreation",
    lede: "Sporting facilities and competitions for a healthy campus community.",
    sections: [
      {
        heading: "Facilities and activities",
        paragraphs: [
          "The University encourages participation in sport as part of a balanced student life.",
        ],
        list: [
          "Football and other team sports",
          "Athletics and field events",
          "Indoor games",
          "Inter-faculty and inter-hall competitions",
        ],
      },
    ],
  },

  "/student-life/health-centre": {
    crumb: "Students",
    title: "Health Centre",
    lede: "On-campus health services for students and staff.",
    sections: [
      {
        heading: "Services",
        paragraphs: [
          "The University Health Centre provides first-line medical care and referral where necessary.",
        ],
        list: [
          "Consultation and treatment",
          "First aid and emergency response",
          "Health education and screening",
          "Referral to specialist care",
        ],
      },
      {
        heading: "Access",
        paragraphs: [
          "Students should register with the Health Centre and carry their student identification. Emergencies are attended to at any time.",
        ],
      },
    ],
  },

  "/student-life/student-affairs": {
    crumb: "Students",
    title: "Student Affairs",
    lede: "The office supporting student welfare, accommodation and conduct.",
    sections: [
      {
        heading: "What we do",
        paragraphs: [
          "Student Affairs coordinates the day-to-day welfare of students and interfaces between the student body and the University.",
        ],
        list: [
          "Accommodation and hostel administration",
          "Student associations and governance",
          "Welfare and disciplinary matters",
          "Orientation and student events",
        ],
      },
    ],
  },

  "/student-life/counselling": {
    crumb: "Students",
    title: "Counselling & Guidance",
    lede: "Confidential support for academic, personal and career concerns.",
    sections: [
      {
        heading: "Support for students",
        paragraphs: [
          "The Counselling Unit offers a confidential space to talk through academic pressure, relationships, career choices and personal wellbeing.",
        ],
        list: [
          "Individual and group counselling",
          "Academic and career guidance",
          "Crisis and pastoral support",
          "Referral to specialist services where needed",
        ],
      },
    ],
  },

  "/student-life/chapel": {
    crumb: "Students",
    title: "Chapel & Worship",
    lede: "The spiritual heart of a faith-based University.",
    sections: [
      {
        heading: "Worship and fellowship",
        paragraphs: [
          "As an institution of the Anglican Communion, ACU places worship at the centre of its common life.",
        ],
        list: [
          "Regular chapel services",
          "Bible study and prayer groups",
          "Christian societies",
          "Pastoral care for students and staff",
        ],
      },
    ],
  },

  "/student-life/security": {
    crumb: "Students",
    title: "Campus Security",
    lede: "A safe and secure campus environment, day and night.",
    sections: [
      {
        heading: "Keeping campus safe",
        paragraphs: [
          "The University maintains security personnel and procedures across its campuses, with access control and patrols.",
        ],
        list: [
          "Gates and access control",
          "24-hour patrols and response",
          "Hostel and facility security",
          "Emergency contact lines",
        ],
      },
      {
        heading: "Staying safe",
        paragraphs: [
          "Students are encouraged to observe campus rules, carry identification and report any concern promptly to security or Student Affairs.",
        ],
      },
    ],
  },

  // ----------------------------------------------------------------- Research
  "/research": {
    crumb: "Academics",
    title: "Research at ACU",
    lede: "Scholarship that serves the Church, the nation and the wider world.",
    links: [
      { label: "Centres & Institutes", path: "/research/centres-institutes" },
      { label: "Publications", path: "/research/publications" },
      { label: "Journals", path: "/research/journals" },
      {
        label: "Innovation & Entrepreneurship",
        path: "/research/innovation-entrepreneurship",
      },
      { label: "Research Ethics", path: "/research/ethics" },
    ],
    sections: [
      {
        heading: "Research across the faculties",
        paragraphs: [
          "Research at ACU spans the humanities, sciences, social sciences and professional programmes, with a focus on problems that matter to Nigeria and Africa.",
        ],
      },
      {
        heading: "Support for researchers",
        paragraphs: [
          "The University supports staff and postgraduate students through grants, supervision and research ethics oversight.",
        ],
      },
    ],
  },

  "/research/centres-institutes": {
    crumb: "Research",
    title: "Centres & Institutes",
    lede: "Focused research units that bring disciplines together.",
    sections: [
      {
        heading: "Our centres",
        paragraphs: [
          "Centres and institutes coordinate interdisciplinary research, outreach and training across the University.",
        ],
        list: [
          "Research centres across the faculties",
          "Interdisciplinary research groups",
          "Training and outreach programmes",
          "Community-focused research projects",
        ],
      },
    ],
  },

  "/research/journals": {
    crumb: "Research",
    title: "Journals",
    lede: "Academic journals hosted and supported by the University.",
    sections: [
      {
        heading: "Our journals",
        paragraphs: [
          "The University publishes and supports scholarly journals that reflect the breadth of its research.",
        ],
        list: [
          "Peer-reviewed academic journals",
          "Faculty and departmental journals",
          "Call for papers and submission guidelines",
        ],
      },
    ],
  },

  "/research/innovation-entrepreneurship": {
    crumb: "Research",
    title: "Innovation & Entrepreneurship",
    lede: "Turning research and ideas into enterprise and impact.",
    sections: [
      {
        heading: "Innovation at ACU",
        paragraphs: [
          "The University encourages entrepreneurship and the practical application of research, consistent with its core values.",
        ],
        list: [
          "Entrepreneurship training for students",
          "Support for student ventures",
          "Research commercialisation",
          "Industry and community partnerships",
        ],
      },
    ],
  },

  "/research/ethics": {
    crumb: "Research",
    title: "Research Ethics",
    lede: "Ethical oversight that protects participants and upholds integrity.",
    sections: [
      {
        heading: "Ethical review",
        paragraphs: [
          "Research involving human participants or sensitive data is subject to ethical review before it begins.",
        ],
        list: [
          "Review of research proposals",
          "Informed consent and participant protection",
          "Research integrity and misconduct",
          "Guidance for staff and students",
        ],
      },
    ],
  },

  // -------------------------------------------------------- News & Events
  "/news/events": {
    crumb: "News",
    title: "Upcoming Events",
    lede: "Conferences, lectures, ceremonies and other events at ACU.",
    sections: [
      {
        heading: "What's coming up",
        paragraphs: [
          "The University hosts academic and public events throughout the session, including inaugural lectures, seminars and ceremonies.",
        ],
        list: [
          "Inaugural and public lectures",
          "Conferences and workshops",
          "Matriculation and convocation",
          "Faculty and departmental events",
        ],
      },
      {
        heading: "See the latest",
        paragraphs: [
          "Events are published on the news and events page as dates are confirmed.",
        ],
      },
    ],
    cta: { label: "View News & Events", href: "/news", external: false },
  },

  "/news/press-releases": {
    crumb: "News",
    title: "Press Releases",
    lede: "Official statements and announcements from Ajayi Crowther University.",
    sections: [
      {
        heading: "Official communications",
        paragraphs: [
          "Statements issued on behalf of the University are published here for the media and the general public.",
        ],
      },
      {
        heading: "Media enquiries",
        paragraphs: [
          "Journalists seeking comment or interviews should contact the Registry, which handles external communications for the University.",
        ],
      },
    ],
  },

  "/news/convocation": {
    crumb: "News",
    title: "Convocation",
    lede: "The University's annual celebration of its graduating students.",
    sections: [
      {
        heading: "A milestone for our graduands",
        paragraphs: [
          "Convocation brings together graduands, families, staff and guests to mark the completion of study and the conferment of degrees.",
        ],
        list: [
          "Conferment of degrees and award of diplomas",
          "Presentation of prizes and honorary awards",
          "Convocation lecture",
          "Graduation ceremonies by faculty",
        ],
      },
      {
        heading: "For graduands",
        paragraphs: [
          "Details of clearance, gown collection, rehearsal and ceremony times are communicated by the Registry ahead of each convocation.",
        ],
      },
    ],
  },
};

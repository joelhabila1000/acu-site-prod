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

  // ------------------------------------------------------- Student Services
  // The links under the Student Services menu. Each menu item has a page here;
  // figures (fees, dates) are published by the Bursary and Registry, so these
  // pages explain the process and point to the office rather than restating
  // amounts that change every session.

  "/student-services/undergraduate-freshers-registration": {
    crumb: "Student Services",
    title: "Freshers' Registration Documents",
    lede: "The documents a newly admitted undergraduate must present to complete registration and clearance.",
    sections: [
      {
        heading: "What to bring",
        paragraphs: [
          "Report to your Faculty Officer with the originals and photocopies of the documents below. Clearance is completed before matriculation, and no student is assigned courses until registration is closed.",
        ],
        list: [
          "Admission letter and acceptance fee receipt",
          "O'Level result(s) and UTME/JAMB result slip",
          "Birth certificate or sworn declaration of age",
          "Local government area certificate of origin",
          "Recent passport photographs",
          "School fees payment receipt",
        ],
      },
      {
        heading: "After clearance",
        paragraphs: [
          "Your Faculty Officer guides you through course registration on the student portal and issues your matriculation number. Keep every receipt — they are required for library access, examinations and later transcript requests.",
        ],
      },
    ],
    facts: [
      ["Office", "Faculty Office / Registry"],
      ["When", "On resumption, before matriculation"],
      ["Bring", "Originals and photocopies"],
    ],
    cta: { label: "Contact the Registry", href: "/contact" },
  },

  "/student-services/undergraduate-freshers-information": {
    crumb: "Student Services",
    title: "Freshers' Information",
    lede: "Everything a new undergraduate needs for a smooth first semester at ACU.",
    sections: [
      {
        heading: "Before you arrive",
        paragraphs: [
          "Accept your admission offer and pay the acceptance fee, then settle your school fees. Accommodation is allocated on a first-come basis, so apply early if you intend to live on campus.",
        ],
        list: [
          "Accept admission and pay the acceptance fee",
          "Pay school fees for the session",
          "Apply for hostel accommodation if needed",
          "Print your admission letter and payment receipts",
        ],
      },
      {
        heading: "Orientation and matriculation",
        paragraphs: [
          "The orientation programme introduces you to your faculty, the library, the health centre and student support services. Matriculation formally admits you to the University and is followed by course registration.",
        ],
      },
      {
        heading: "Getting help",
        paragraphs: [
          "Your Faculty Officer is the first point of contact for academic matters. The Student Affairs office handles accommodation, conduct and welfare, and the health centre is open to all registered students.",
        ],
      },
    ],
    facts: [
      ["First contact", "Your Faculty Officer"],
      ["Welfare", "Student Affairs"],
      ["Health", "University Health Centre"],
    ],
    cta: { label: "See student life", href: "/student-life" },
  },

  "/student-services/undergraduate-change-of-course": {
    crumb: "Student Services",
    title: "Returning Students: Change of Course",
    lede: "How a returning undergraduate applies to change programme, and the conditions that apply.",
    sections: [
      {
        heading: "Who can apply",
        paragraphs: [
          "A returning student may apply to change course where they meet the entry requirements of the new programme and there is space in the class. Approval is not automatic and depends on your academic record.",
        ],
        list: [
          "You must have completed at least one semester",
          "You must meet the O'Level and UTME requirements of the new course",
          "Your results in the current programme are considered",
          "Change is normally allowed once during undergraduate study",
        ],
      },
      {
        heading: "How to apply",
        paragraphs: [
          "Obtain the change-of-course form from the Registry, obtain the endorsement of both Heads of Department, and submit it before the end of the registration period. Late applications are carried to the next session.",
        ],
      },
    ],
    facts: [
      ["Form", "Registry"],
      ["Endorsement", "Both Heads of Department"],
      ["Deadline", "End of the registration period"],
    ],
    cta: { label: "Contact the Registry", href: "/contact" },
  },

  "/student-services/undergraduate-academic-calendar": {
    crumb: "Student Services",
    title: "Undergraduate Academic Calendar",
    lede: "Semester dates and academic deadlines for undergraduate students.",
    sections: [
      {
        heading: "Where to find the dates",
        paragraphs: [
          "The University publishes a calendar for each session covering resumption, registration, lectures, continuous assessment, examinations, results and convocation. Dates are confirmed by the Registry and announced through the portal and faculty noticeboards.",
        ],
        list: [
          "Resumption and course registration",
          "Lectures, continuous assessment and revision",
          "First and second semester examinations",
          "Senate approval of results",
          "Convocation",
        ],
      },
      {
        heading: "Why deadlines matter",
        paragraphs: [
          "Registration closes on the published date, and a student who has not registered cannot sit examinations. Keep an eye on your faculty noticeboard and the student portal for any adjustment to the calendar.",
        ],
      },
    ],
    cta: { label: "View the academic calendar", href: "/resources/academic-calendar" },
  },

  "/student-services/undergraduate-schedule-of-fees": {
    crumb: "Student Services",
    title: "2026/2027 Schedule of Fees",
    lede: "Tuition and other charges for undergraduate students in the 2026/2027 session.",
    sections: [
      {
        heading: "What the fees cover",
        paragraphs: [
          "School fees are set for each session and vary by programme and level. The approved schedule, showing tuition, registration and other charges, is published by the Bursary and issued with your fee receipt.",
        ],
        list: [
          "Tuition for the programme and level",
          "Registration and examination charges",
          "Acceptance fee (fresh students only)",
          "Accommodation, where applicable",
        ],
      },
      {
        heading: "How to pay",
        paragraphs: [
          "Payments are made through the University's approved channels and confirmed with a receipt. Bring the receipt to your Faculty Officer for registration — an unverified payment is not treated as settled. Contact the Bursary if a payment does not reflect on the portal.",
        ],
      },
    ],
    facts: [
      ["Office", "Bursary"],
      ["Payable", "Per session"],
      ["Receipt", "Required for registration"],
    ],
    cta: { label: "Contact the Bursary", href: "/contact" },
  },

  "/student-services/undergraduate-course-registration": {
    crumb: "Student Services",
    title: "Course Registration & Results",
    lede: "Register your courses for the semester and check your results on the student portal.",
    sections: [
      {
        heading: "Registering your courses",
        paragraphs: [
          "Course registration is completed on the student portal at the start of each semester, after fees have been confirmed. Register only the courses approved for your level and programme, then print and submit the form to your Faculty Officer.",
        ],
        list: [
          "Confirm your fees are settled",
          "Log in to the student portal with your matriculation number",
          "Select the approved courses for the semester",
          "Print the registration form and submit it to your Faculty Officer",
        ],
      },
      {
        heading: "Checking results",
        paragraphs: [
          "Semester results are published on the portal after Faculty and Senate approval. Query any missing or incorrect result with your Faculty Officer within the published window; corrections cannot be made once results are ratified.",
        ],
      },
    ],
    facts: [
      ["Portal", "Student portal"],
      ["Login", "Matriculation number"],
      ["Approval", "Faculty Officer"],
    ],
    cta: { label: "See admissions", href: "/admissions" },
  },

  "/student-services/undergraduate-transcript": {
    crumb: "Student Services",
    title: "Transcript Request Procedure",
    lede: "How to apply for an official transcript of your undergraduate academic record.",
    sections: [
      {
        heading: "Applying",
        paragraphs: [
          "Transcripts are issued by the Registry and sent directly to the institution or employer that requests them. Apply in person or in writing, and allow time for the record to be compiled and signed.",
        ],
        list: [
          "Apply in writing to the Registrar",
          "State the institution and address the transcript should be sent to",
          "Provide your matriculation number, programme and year of graduation",
          "Pay the prescribed transcript fee and attach the receipt",
        ],
      },
      {
        heading: "Please note",
        paragraphs: [
          "Transcripts are not released while you have outstanding fees or unreturned library materials. Academic transcripts are issued in sealed envelopes and are not valid if opened by anyone other than the receiving institution.",
        ],
      },
    ],
    facts: [
      ["Office", "Registry"],
      ["Addressed to", "Receiving institution"],
      ["Condition", "No outstanding fees or library items"],
    ],
    cta: { label: "Contact the Registry", href: "/contact" },
  },

  "/student-services/undergraduate-statement-of-result": {
    crumb: "Student Services",
    title: "Collection of Statement of Result",
    lede: "Obtaining the formal statement of your semester or final results.",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "A statement of result is the University's confirmation of your approved results for a semester or for the award of a degree. It is issued by the Registry after Senate approval and is separate from the transcript sent to other institutions.",
        ],
      },
      {
        heading: "Collecting it",
        paragraphs: [
          "Bring your student identity card and the fee receipt to the Registry. If someone is collecting on your behalf, provide a signed authorisation letter along with a copy of your identity document.",
        ],
        list: [
          "Student identity card",
          "Fee receipt",
          "Written authorisation, if collecting by proxy",
        ],
      },
    ],
    facts: [
      ["Office", "Registry"],
      ["Requires", "Identity card and fee receipt"],
      ["Proxy", "Signed authorisation letter"],
    ],
    cta: { label: "Contact the Registry", href: "/contact" },
  },

  "/student-services/undergraduate-students-handbook": {
    crumb: "Student Services",
    title: "Students' Handbook",
    lede: "The rules, regulations and academic guidance that apply to every undergraduate.",
    sections: [
      {
        heading: "What the handbook covers",
        paragraphs: [
          "The Students' Handbook is the reference for academic regulations and student conduct. Read it at the start of your programme — the rules on registration, assessment, examinations and discipline apply from the day you matriculate.",
        ],
        list: [
          "Registration and course requirements",
          "Assessment, grading and examination rules",
          "Attendance and probation",
          "Dress code and code of conduct",
          "Disciplinary procedures and appeals",
        ],
      },
      {
        heading: "Getting a copy",
        paragraphs: [
          "Copies are issued through your Faculty Officer at the start of the session, and the current edition is available from the Registry. Where the handbook and a faculty notice disagree, the Registry's ruling applies.",
        ],
      },
    ],
    cta: { label: "Contact the Registry", href: "/contact" },
  },

  "/student-services/postgraduate-academic-calendar": {
    crumb: "Student Services",
    title: "Postgraduate Academic Calendar",
    lede: "Semester dates and deadlines for PGD, master's and doctoral students.",
    sections: [
      {
        heading: "Dates for the session",
        paragraphs: [
          "The postgraduate calendar runs alongside the undergraduate session, with its own registration, coursework, seminar and dissertation milestones. Dates are confirmed by the School of Postgraduate Studies and published on the portal.",
        ],
        list: [
          "Registration and course approval",
          "Coursework and seminars",
          "Semester examinations",
          "Dissertation and thesis submission windows",
          "Senate approval and convocation",
        ],
      },
      {
        heading: "Staying on track",
        paragraphs: [
          "Supervision meetings, progress reports and submission deadlines are set by your department. Confirm each milestone with your supervisor and the Postgraduate School early, as missed deadlines can extend your programme.",
        ],
      },
    ],
    cta: {
      label: "View the academic calendar",
      href: "/resources/academic-calendar",
    },
  },

  "/student-services/postgraduate-school-fees": {
    crumb: "Student Services",
    title: "Postgraduate School Fees Schedule",
    lede: "Tuition and other charges for PGD, master's and doctoral programmes.",
    sections: [
      {
        heading: "What you pay",
        paragraphs: [
          "Postgraduate fees are set per programme and per session, and differ between PGD, master's and doctoral study. The approved schedule is published by the Bursary and stated on your admission letter.",
        ],
        list: [
          "Tuition for the programme and level",
          "Registration and examination charges",
          "Acceptance fee",
          "Thesis or dissertation processing, where applicable",
        ],
      },
      {
        heading: "Payment and confirmation",
        paragraphs: [
          "Pay through the University's approved channels and keep the receipt. Registration is only complete once payment is confirmed by the Bursary, so settle fees before the registration deadline.",
        ],
      },
    ],
    facts: [
      ["Office", "Bursary"],
      ["Varies by", "Programme and level"],
      ["Required", "Before registration"],
    ],
    cta: { label: "Contact the Bursary", href: "/contact" },
  },

  "/student-services/postgraduate-programmes": {
    crumb: "Student Services",
    title: "Postgraduate Programmes & Requirements",
    lede: "The postgraduate programmes on offer and what each one requires for admission.",
    sections: [
      {
        heading: "Programmes available",
        paragraphs: [
          "The University offers Postgraduate Diplomas, master's degrees and doctorates across its faculties. Each programme sets its own entry requirements, duration and mode of study.",
        ],
        list: [
          "Postgraduate Diploma (PGD)",
          "Master's degrees (M.A., M.Sc., MBA and others)",
          "Doctor of Philosophy (Ph.D)",
        ],
      },
      {
        heading: "Entry requirements",
        paragraphs: [
          "A PGD requires a first degree or an HND at the level stated by the department. Master's programmes normally require a good first degree or a PGD in a relevant field, and a doctorate requires a master's degree with a research proposal. Transcripts, NYSC documentation and references are part of every application.",
        ],
      },
      {
        heading: "How to apply",
        paragraphs: [
          "Applications are made through the postgraduate portal. Check the specific requirements for your chosen programme with the School of Postgraduate Studies before applying.",
        ],
      },
    ],
    cta: {
      label: "Apply for postgraduate admission",
      href: "https://pgsportal.acu.edu.ng/",
      external: true,
    },
  },

  "/student-services/postgraduate-transcript": {
    crumb: "Student Services",
    title: "Postgraduate Transcript Request",
    lede: "How to request an official transcript of your postgraduate record.",
    sections: [
      {
        heading: "Applying",
        paragraphs: [
          "Postgraduate transcripts are issued by the Registry after the Postgraduate School confirms your record. Apply in writing, stating where the transcript should be sent.",
        ],
        list: [
          "Written application to the Registrar",
          "Matriculation number, programme and year of award",
          "Name and address of the receiving institution",
          "Payment of the prescribed transcript fee",
        ],
      },
      {
        heading: "Please note",
        paragraphs: [
          "Transcripts are held while fees are outstanding or library materials are unreturned. They are issued in sealed envelopes and are only valid unopened.",
        ],
      },
    ],
    facts: [
      ["Office", "Registry"],
      ["Confirmation", "Postgraduate School"],
      ["Addressed to", "Receiving institution"],
    ],
    cta: { label: "Contact the Registry", href: "/contact" },
  },

  "/student-services/jupeb-admission-requirements": {
    crumb: "Student Services",
    title: "JUPEP / Foundation Admission Requirements",
    lede: "Entry requirements for the one-year foundation programme that leads to direct entry.",
    sections: [
      {
        heading: "Who the programme is for",
        paragraphs: [
          "The Joint Universities Preliminary Examinations Board (JUPEP) programme prepares candidates for direct entry into 200-level degree study. It suits school leavers who want a structured bridging year before university.",
        ],
        list: [
          "O'Level credit passes in the subjects required for your intended degree",
          "A minimum of five credits, including English Language and Mathematics, in not more than two sittings",
          "Subjects that match the faculty you intend to enter",
        ],
      },
      {
        heading: "How to apply",
        paragraphs: [
          "Applications are made online through the foundation programme portal. Upload your O'Level result and a recent passport photograph, and keep the payment receipt for screening.",
        ],
      },
    ],
    facts: [
      ["Duration", "One academic session"],
      ["Leads to", "Direct entry (200 level)"],
      ["Result", "JUPEP examination"],
    ],
    cta: {
      label: "Apply for the foundation programme",
      href: "https://cpfpapply.acu.edu.ng",
      external: true,
    },
  },

  "/student-services/jupeb-school-fees": {
    crumb: "Student Services",
    title: "JUPEP / Foundation School Fees",
    lede: "Fees payable for the one-year foundation programme.",
    sections: [
      {
        heading: "What the fees cover",
        paragraphs: [
          "Foundation programme fees cover tuition, registration and examination charges for the session. The approved schedule is published by the Bursary and stated on your admission letter.",
        ],
        list: [
          "Tuition for the session",
          "Registration and examination charges",
          "Acceptance fee on admission",
          "Accommodation, where applicable",
        ],
      },
      {
        heading: "Payment",
        paragraphs: [
          "Pay through the University's approved channels and keep the receipt — it is required at registration. Contact the Bursary if a payment does not reflect on your record.",
        ],
      },
    ],
    facts: [
      ["Office", "Bursary"],
      ["Payable", "Per session"],
      ["Required", "Before registration"],
    ],
    cta: { label: "Contact the Bursary", href: "/contact" },
  },

  "/student-services/jupeb-course-form-payment": {
    crumb: "Student Services",
    title: "JUPEP Course Form Payment",
    lede: "Paying for and collecting the course form for the foundation programme.",
    sections: [
      {
        heading: "Paying for the form",
        paragraphs: [
          "The course form fee is paid through the University's approved payment channels after admission. Keep the receipt — the course form is only released against a verified payment.",
        ],
        list: [
          "Pay the course form fee",
          "Keep the payment receipt",
          "Present the receipt to the programme office",
          "Complete the form and submit it before the deadline",
        ],
      },
      {
        heading: "After payment",
        paragraphs: [
          "Completed forms are submitted to the foundation programme office, which registers your subjects and issues your examination number. Late submission may mean missing continuous assessment.",
        ],
      },
    ],
    facts: [
      ["Payment", "University approved channels"],
      ["Release", "Against a verified receipt"],
      ["Submit to", "Programme office"],
    ],
    cta: { label: "Contact the programme office", href: "/contact" },
  },

  "/student-services/jupeb-course-registration": {
    crumb: "Student Services",
    title: "JUPEP Course Registration & Results",
    lede: "Registering your JUPEP subjects and checking your examination results.",
    sections: [
      {
        heading: "Registering subjects",
        paragraphs: [
          "Foundation students register the four subjects that match their intended degree. Registration is done at the programme office after the course form is submitted, and the subject combination cannot be changed after the deadline.",
        ],
        list: [
          "Four subjects matched to your intended degree",
          "English Language is compulsory",
          "Changes only before the registration deadline",
        ],
      },
      {
        heading: "Results",
        paragraphs: [
          "JUPEP examination results are released by the board and published by the programme office. A pass in the required subjects qualifies you for direct entry into the corresponding degree programme.",
        ],
      },
    ],
    facts: [
      ["Subjects", "Four, matched to the degree"],
      ["Result", "JUPEP board examination"],
      ["Progression", "Direct entry to 200 level"],
    ],
    cta: { label: "Contact the programme office", href: "/contact" },
  },

  "/student-services/part-time-centres": {
    crumb: "Student Services",
    title: "Part-Time Centres & Contacts",
    lede: "Where part-time and conversion programmes are taught, and who to contact.",
    sections: [
      {
        heading: "Study centres",
        paragraphs: [
          "Part-time degree and conversion programmes are taught at the University's campuses and approved study centres. Lectures are scheduled for weekends and evenings so students can keep working.",
        ],
        list: [
          "Weekend and evening lectures",
          "The same curriculum and standards as full-time study",
          "Coordination through the Centre for Continuing Education",
        ],
      },
      {
        heading: "Who to contact",
        paragraphs: [
          "Enquiries about a centre, lecture timetable or your registration should go to the Centre for Continuing Education (CCED). Include your name, programme and matriculation number in any correspondence so your record can be found quickly.",
        ],
      },
    ],
    facts: [
      ["Office", "Centre for Continuing Education (CCED)"],
      ["Mode", "Weekend and evening"],
      ["Enquiries", "Contact the University"],
    ],
    cta: { label: "Contact the University", href: "/contact" },
  },

  "/student-services/part-time-id-card": {
    crumb: "Student Services",
    title: "Part-Time ID Card Payment",
    lede: "Paying for and collecting the student identity card for part-time students.",
    sections: [
      {
        heading: "Paying for the card",
        paragraphs: [
          "The identity card fee is paid through the University's approved channels after registration. Keep the receipt and bring it, with a recent passport photograph, when you collect the card.",
        ],
        list: [
          "Pay the identity card fee",
          "Keep the payment receipt",
          "Bring a recent passport photograph",
          "Collect the card from the issuing office",
        ],
      },
      {
        heading: "Why you need it",
        paragraphs: [
          "The card identifies you on campus and is required for library access, examinations and any Registry transaction. Report a lost card immediately so it can be replaced and the old one invalidated.",
        ],
      },
    ],
    facts: [
      ["Payment", "University approved channels"],
      ["Bring", "Receipt and passport photograph"],
      ["Use", "Library, examinations, Registry"],
    ],
    cta: { label: "Contact the Registry", href: "/contact" },
  },

  "/student-services/part-time-portal": {
    crumb: "Student Services",
    title: "Student Portal (Part-Time)",
    lede: "Registration, fees and results for part-time students.",
    sections: [
      {
        heading: "What the portal does",
        paragraphs: [
          "Part-time students use the same student portal as full-time students. It is where you register courses each semester, confirm fee payments and check results once they are approved.",
        ],
        list: [
          "Course registration and printing of forms",
          "Fee status and payment receipts",
          "Semester results",
          "Notices from the Centre for Continuing Education",
        ],
      },
      {
        heading: "Getting help",
        paragraphs: [
          "Collect your login details from the ICT Directorate after registration. If a course is missing or your fee payment does not show, contact the centre that coordinates your programme before the registration deadline.",
        ],
      },
    ],
    facts: [
      ["Users", "Part-time students"],
      ["Login", "Matriculation number"],
      ["Support", "ICT Directorate / CCED"],
    ],
    cta: { label: "Contact ICT support", href: "/contact" },
  },
};

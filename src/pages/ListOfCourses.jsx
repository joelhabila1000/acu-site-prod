import { useState, useMemo, useEffect } from "react";
import PageHeader from "../components/PageHeader.jsx";
import "../pages/ListOfCourses.css";
// ===== COURSE DATA =====
const ALL_COURSES = [
  {
    id: 1,
    name: "Agricultural Economics/Extension",
    faculty: "Agricultural Science",
    degree: "B.Agric",
    duration: "5 years",
    description:
      "This programme trains students in the economic analysis of agricultural production, marketing, policy and rural development, with strong extension and community engagement components.",
    utme: [
      "English Language",
      "Mathematics",
      "Biology/Agricultural Science",
      "Chemistry",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics, Biology/Agricultural Science and any two of Chemistry, Economics or Geography.",
    careers: [
      "Agricultural Economist",
      "Extension Officer",
      "Agribusiness Analyst",
      "Policy Advisor",
    ],
  },
  {
    id: 2,
    name: "Animal & Crop Science",
    faculty: "Agricultural Science",
    degree: "B.Agric",
    duration: "5 years",
    description:
      "Focuses on the science of crop production, animal husbandry, soil management and sustainable farming systems for food security and enterprise.",
    utme: [
      "English Language",
      "Biology/Agricultural Science",
      "Chemistry",
      "Mathematics/Physics",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics, Biology/Agricultural Science, Chemistry and one other science subject.",
    careers: [
      "Farm Manager",
      "Agro-consultant",
      "Crop Scientist",
      "Animal Scientist",
    ],
  },
  {
    id: 3,
    name: "Environmental Health Science",
    faculty: "Basic Medical Science",
    degree: "B.EHS",
    duration: "5 years",
    description:
      "Prepares graduates to assess, control and prevent environmental factors that affect human health, including sanitation, water quality, waste management and vector control.",
    utme: ["English Language", "Biology", "Chemistry", "Physics/Mathematics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Biology, Chemistry and Physics.",
    careers: [
      "Environmental Health Officer",
      "Public Health Inspector",
      "Sanitation Officer",
    ],
  },
  {
    id: 4,
    name: "Medical Laboratory Science",
    faculty: "Basic Medical Science",
    degree: "BMLS",
    duration: "5 years",
    description:
      "Trains laboratory scientists in clinical chemistry, haematology, microbiology, histopathology and immunology for diagnostic and research roles in health care.",
    utme: ["English Language", "Biology", "Chemistry", "Physics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Biology, Chemistry and Physics.",
    careers: [
      "Medical Laboratory Scientist",
      "Clinical Researcher",
      "Diagnostics Specialist",
    ],
  },
  {
    id: 5,
    name: "Radiography and Radiation Science",
    faculty: "Basic Medical Science",
    degree: "B.Rad",
    duration: "5 years",
    description:
      "Equips students with skills in medical imaging and therapeutic radiography using X-rays, CT, MRI, ultrasound and radiation therapy.",
    utme: ["English Language", "Biology", "Chemistry", "Physics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Biology, Chemistry and Physics.",
    careers: [
      "Radiographer",
      "Medical Imaging Scientist",
      "Radiation Therapist",
    ],
  },
  {
    id: 6,
    name: "Anatomy",
    faculty: "Basic Medical Science",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Study of the structure of the human body including gross anatomy, histology, embryology and neuroanatomy, preparing graduates for health sciences and research careers.",
    utme: ["English Language", "Biology", "Chemistry", "Physics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Biology, Chemistry and Physics.",
    careers: ["Anatomy Lecturer", "Research Scientist", "Health Educator"],
  },
  {
    id: 7,
    name: "Physiology",
    faculty: "Basic Medical Science",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Examines the functions of the human body systems and how they respond to internal and external stimuli, providing a strong foundation for medicine and biomedical research.",
    utme: ["English Language", "Biology", "Chemistry", "Physics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Biology, Chemistry and Physics.",
    careers: ["Physiologist", "Research Scientist", "Medical Sales Specialist"],
  },
  {
    id: 8,
    name: "Pharmacology",
    faculty: "Basic Medical Science",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Study of drugs, their actions on the body and their therapeutic uses; graduates work in drug development, regulatory affairs and biomedical research.",
    utme: ["English Language", "Biology", "Chemistry", "Physics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Biology, Chemistry and Physics.",
    careers: [
      "Pharmacologist",
      "Drug Regulatory Officer",
      "Clinical Research Associate",
    ],
  },
  {
    id: 9,
    name: "Public Health",
    faculty: "Basic Medical Science",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Focuses on disease prevention, health promotion, epidemiology and health policy to improve population health at community and national levels.",
    utme: ["English Language", "Biology", "Chemistry", "Mathematics/Physics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Biology, Chemistry and one other science subject.",
    careers: [
      "Public Health Officer",
      "Epidemiologist",
      "Health Programme Manager",
    ],
  },
  {
    id: 10,
    name: "Mass Communication",
    faculty: "Communication & Media Studies",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Covers journalism, broadcasting, advertising, public relations and digital media, with hands-on training in writing, production and media management.",
    utme: [
      "English Language",
      "Literature in English",
      "Government/Economics",
      "Any other Arts/Social Science subject",
    ],
    olevel:
      "Five O'Level credits including English, Literature in English, Mathematics and two other Arts or Social Science subjects.",
    careers: ["Journalist", "PR Officer", "Broadcaster", "Content Producer"],
  },
  {
    id: 11,
    name: "Information and Media Studies",
    faculty: "Communication & Media Studies",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Examines the role of information in society, media literacy, data journalism and information management across digital platforms.",
    utme: [
      "English Language",
      "Literature in English",
      "Government/Economics",
      "Any other Arts/Social Science subject",
    ],
    olevel:
      "Five O'Level credits including English, Literature in English, Mathematics and two others.",
    careers: [
      "Information Officer",
      "Media Analyst",
      "Digital Content Manager",
    ],
  },
  {
    id: 12,
    name: "Broadcasting",
    faculty: "Communication & Media Studies",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Specialised training in radio and television production, on-air presentation, scriptwriting and broadcast management.",
    utme: [
      "English Language",
      "Literature in English",
      "Government/Economics",
      "Any other Arts/Social Science subject",
    ],
    olevel:
      "Five O'Level credits including English, Literature in English, Mathematics and two others.",
    careers: ["Broadcast Journalist", "TV/Radio Producer", "On-air Presenter"],
  },
  {
    id: 13,
    name: "Journalism and Media Studies",
    faculty: "Communication & Media Studies",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Focuses on news gathering, investigative reporting, editorial writing and multimedia journalism for print, broadcast and online platforms.",
    utme: [
      "English Language",
      "Literature in English",
      "Government/Economics",
      "Any other Arts/Social Science subject",
    ],
    olevel:
      "Five O'Level credits including English, Literature in English, Mathematics and two others.",
    careers: ["Reporter", "Editor", "Investigative Journalist"],
  },
  {
    id: 14,
    name: "Computer Science",
    faculty: "Computing",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Provides a strong foundation in algorithms, programming, software engineering, databases and computer systems.",
    utme: ["English Language", "Mathematics", "Physics", "Chemistry/Biology"],
    olevel:
      "Five O'Level credits including English, Mathematics, Physics, Chemistry and one other science subject.",
    careers: ["Software Developer", "Systems Analyst", "Data Engineer"],
  },
  {
    id: 15,
    name: "Computer Science (ICT Option)",
    faculty: "Computing",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Blends computer science fundamentals with networking, cloud computing, IT infrastructure and enterprise systems.",
    utme: ["English Language", "Mathematics", "Physics", "Chemistry/Biology"],
    olevel:
      "Five O'Level credits including English, Mathematics, Physics, Chemistry and one other science subject.",
    careers: ["IT Specialist", "Network Engineer", "Cloud Administrator"],
  },
  {
    id: 16,
    name: "Cybersecurity",
    faculty: "Computing",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Trains students in network security, ethical hacking, cryptography, digital forensics and security governance.",
    utme: ["English Language", "Mathematics", "Physics", "Chemistry/Biology"],
    olevel:
      "Five O'Level credits including English, Mathematics, Physics, Chemistry and one other science subject.",
    careers: [
      "Cybersecurity Analyst",
      "Penetration Tester",
      "Security Engineer",
    ],
  },
  {
    id: 17,
    name: "Data Security",
    faculty: "Computing",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Focuses on protecting data through encryption, access control, privacy regulations and secure data architecture.",
    utme: ["English Language", "Mathematics", "Physics", "Chemistry/Biology"],
    olevel:
      "Five O'Level credits including English, Mathematics, Physics, Chemistry and one other science subject.",
    careers: ["Data Security Officer", "Compliance Analyst", "Privacy Officer"],
  },
  {
    id: 18,
    name: "Artificial Intelligence",
    faculty: "Computing",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Covers machine learning, deep learning, natural language processing, robotics and AI ethics.",
    utme: ["English Language", "Mathematics", "Physics", "Chemistry/Biology"],
    olevel:
      "Five O'Level credits including English, Mathematics, Physics, Chemistry and one other science subject.",
    careers: ["AI Engineer", "Machine Learning Scientist", "Data Scientist"],
  },
  {
    id: 19,
    name: "Business Education",
    faculty: "Education",
    degree: "B.Ed",
    duration: "4 years",
    description:
      "Prepares teachers for business subjects in secondary schools and colleges, combining pedagogy with accounting, management and office technology.",
    utme: [
      "English Language",
      "Mathematics",
      "Economics/Commerce",
      "Any other Social Science subject",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics, Economics and two other subjects.",
    careers: [
      "Business Teacher",
      "School Administrator",
      "Curriculum Developer",
    ],
  },
  {
    id: 20,
    name: "English Education",
    faculty: "Education",
    degree: "B.A (Ed)",
    duration: "4 years",
    description:
      "Combines English language and literature with teaching methodology for future English language teachers.",
    utme: [
      "English Language",
      "Literature in English",
      "Any two other Arts/Social Science subjects",
    ],
    olevel:
      "Five O'Level credits including English, Literature in English, Mathematics and two others.",
    careers: [
      "English Teacher",
      "Curriculum Specialist",
      "Educational Consultant",
    ],
  },
  {
    id: 21,
    name: "Guidance & Counselling",
    faculty: "Education",
    degree: "B.Ed",
    duration: "4 years",
    description:
      "Trains counsellors and educational psychologists to support students' academic, career and personal development.",
    utme: ["English Language", "Any three Arts/Social Science subjects"],
    olevel:
      "Five O'Level credits including English, Mathematics and three other subjects.",
    careers: [
      "School Counsellor",
      "Career Advisor",
      "Educational Psychologist",
    ],
  },
  {
    id: 22,
    name: "Social Studies Education",
    faculty: "Education",
    degree: "B.Sc(Ed)",
    duration: "4 years",
    description:
      "Prepares teachers of social studies with strong grounding in civics, economics, geography and history.",
    utme: [
      "English Language",
      "Economics/Government",
      "Any two other Social Science subjects",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics, Economics and two others.",
    careers: [
      "Social Studies Teacher",
      "Education Officer",
      "Curriculum Developer",
    ],
  },
  {
    id: 23,
    name: "Political Science Education",
    faculty: "Education",
    degree: "B.Sc (Ed)",
    duration: "4 years",
    description:
      "Combines political science with teaching methodology for civic and government education.",
    utme: [
      "English Language",
      "Government",
      "Any two other Social Science subjects",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics, Government and two others.",
    careers: ["Government Teacher", "Civic Educator", "Policy Analyst"],
  },
  {
    id: 24,
    name: "Educational Management",
    faculty: "Education",
    degree: "B.Ed",
    duration: "4 years",
    description:
      "Prepares students for leadership roles in schools and educational institutions, covering administration, planning and policy.",
    utme: ["English Language", "Any three Arts/Social Science subjects"],
    olevel:
      "Five O'Level credits including English, Mathematics and three others.",
    careers: ["School Administrator", "Education Planner", "Policy Officer"],
  },
  {
    id: 25,
    name: "Early Childhood Education",
    faculty: "Education",
    degree: "B.Ed",
    duration: "4 years",
    description:
      "Specialises in the development, care and education of children from birth to age eight.",
    utme: ["English Language", "Any three Arts/Social Science subjects"],
    olevel:
      "Five O'Level credits including English, Mathematics and three others.",
    careers: [
      "Early Years Teacher",
      "Child Development Specialist",
      "Curriculum Designer",
    ],
  },
  {
    id: 26,
    name: "Computer Engineering",
    faculty: "Engineering",
    degree: "B.Eng",
    duration: "5 years",
    description:
      "Bridges hardware and software, covering embedded systems, digital design, computer architecture and robotics.",
    utme: ["English Language", "Mathematics", "Physics", "Chemistry"],
    olevel:
      "Five O'Level credits including English, Mathematics, Physics, Chemistry and one other science subject.",
    careers: [
      "Computer Engineer",
      "Embedded Systems Developer",
      "Hardware Architect",
    ],
  },
  {
    id: 27,
    name: "Electrical/Electronics Engineering",
    faculty: "Engineering",
    degree: "B.Eng",
    duration: "5 years",
    description:
      "Covers power systems, control, electronics, telecommunications and electrical machines.",
    utme: ["English Language", "Mathematics", "Physics", "Chemistry"],
    olevel:
      "Five O'Level credits including English, Mathematics, Physics, Chemistry and one other science subject.",
    careers: [
      "Electrical Engineer",
      "Power Systems Engineer",
      "Telecoms Engineer",
    ],
  },
  {
    id: 28,
    name: "Architecture",
    faculty: "Environmental Sciences",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Combines art, science and technology in the design of buildings and the built environment.",
    utme: [
      "English Language",
      "Mathematics",
      "Physics",
      "Chemistry/Geography/Art",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics, Physics, Chemistry and one other.",
    careers: ["Architect", "Urban Designer", "Building Consultant"],
  },
  {
    id: 29,
    name: "Building",
    faculty: "Environmental Sciences",
    degree: "B.Sc",
    duration: "5 years",
    description:
      "Focuses on construction technology, project management and building maintenance.",
    utme: ["English Language", "Mathematics", "Physics", "Chemistry/Geography"],
    olevel:
      "Five O'Level credits including English, Mathematics, Physics, Chemistry and one other.",
    careers: ["Building Technologist", "Project Manager", "Site Engineer"],
  },
  {
    id: 30,
    name: "Estate Management",
    faculty: "Environmental Sciences",
    degree: "B.Sc",
    duration: "5 years",
    description:
      "Covers valuation, property law, land economics and real estate investment.",
    utme: ["English Language", "Mathematics", "Economics", "Geography/Physics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Economics and two others.",
    careers: ["Estate Surveyor", "Property Valuer", "Real Estate Manager"],
  },
  {
    id: 31,
    name: "Urban and Regional Planning",
    faculty: "Environmental Sciences",
    degree: "B.Sc",
    duration: "5 years",
    description:
      "Teaches the planning and management of cities, regions and human settlements.",
    utme: ["English Language", "Mathematics", "Geography", "Economics/Physics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Geography and two others.",
    careers: ["Urban Planner", "Regional Planner", "GIS Analyst"],
  },
  {
    id: 32,
    name: "English",
    faculty: "Humanities",
    degree: "B.A",
    duration: "4 years",
    description:
      "Study of English language, literature and critical theory, developing strong written and analytical skills.",
    utme: [
      "English Language",
      "Literature in English",
      "Any two other Arts/Social Science subjects",
    ],
    olevel:
      "Five O'Level credits including English, Literature in English, Mathematics and two others.",
    careers: ["Writer/Editor", "Lecturer", "Content Strategist"],
  },
  {
    id: 33,
    name: "History & International Studies",
    faculty: "Humanities",
    degree: "B.A",
    duration: "4 years",
    description:
      "Examines historical processes, international relations, diplomacy and global affairs.",
    utme: [
      "English Language",
      "History/Government",
      "Any two other Arts/Social Science subjects",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics, History/Government and two others.",
    careers: ["Diplomat", "Historian", "International Relations Officer"],
  },
  {
    id: 34,
    name: "Music",
    faculty: "Humanities",
    degree: "B.A",
    duration: "4 years",
    description:
      "Covers music theory, performance, composition, ethnomusicology and music technology.",
    utme: [
      "English Language",
      "Music/Any Arts subject",
      "Any two other Arts/Social Science subjects",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics and three others.",
    careers: ["Musician", "Music Director", "Music Teacher"],
  },
  {
    id: 35,
    name: "Performing Arts",
    faculty: "Humanities",
    degree: "B.A",
    duration: "4 years",
    description:
      "Combines theatre, dance, film and media performance with practical production training.",
    utme: [
      "English Language",
      "Literature in English",
      "Any two other Arts/Social Science subjects",
    ],
    olevel:
      "Five O'Level credits including English, Literature in English, Mathematics and two others.",
    careers: ["Actor", "Director", "Arts Administrator"],
  },
  {
    id: 36,
    name: "Christian Religious Studies",
    faculty: "Humanities",
    degree: "B.A",
    duration: "4 years",
    description:
      "Study of the Bible, Christian theology, church history and ethics for ministry and academic careers.",
    utme: [
      "English Language",
      "CRS/IRS",
      "Any two other Arts/Social Science subjects",
    ],
    olevel:
      "Five O'Level credits including English, CRS/IRS, Mathematics and two others.",
    careers: ["Pastor/Clergy", "Religious Educator", "Chaplain"],
  },
  {
    id: 37,
    name: "Law",
    faculty: "Law",
    degree: "LL.B",
    duration: "5 years",
    description:
      "Rigorous legal training in Nigerian and international law, preparing graduates for the Bar and legal practice.",
    utme: [
      "English Language",
      "Literature in English",
      "Government/History",
      "Any other Arts/Social Science subject",
    ],
    olevel:
      "Five O'Level credits including English, Literature in English, Mathematics and two others.",
    careers: ["Lawyer", "Judge", "Legal Advisor", "Corporate Counsel"],
  },
  {
    id: 38,
    name: "Accounting",
    faculty: "Management Sciences",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Covers financial accounting, auditing, taxation, management accounting and business law.",
    utme: [
      "English Language",
      "Mathematics",
      "Economics",
      "Any other Social Science subject",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics, Economics and two others.",
    careers: ["Accountant", "Auditor", "Tax Consultant"],
  },
  {
    id: 39,
    name: "Finance",
    faculty: "Management Sciences",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Focuses on corporate finance, investment analysis, banking and financial markets.",
    utme: [
      "English Language",
      "Mathematics",
      "Economics",
      "Any other Social Science subject",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics, Economics and two others.",
    careers: ["Financial Analyst", "Banker", "Investment Manager"],
  },
  {
    id: 40,
    name: "Business Administration",
    faculty: "Management Sciences",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Provides broad training in management, marketing, operations and business strategy.",
    utme: [
      "English Language",
      "Mathematics",
      "Economics",
      "Any other Social Science subject",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics, Economics and two others.",
    careers: ["Business Manager", "Management Consultant", "Entrepreneur"],
  },
  {
    id: 41,
    name: "Entrepreneurship",
    faculty: "Management Sciences",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Trains students to start and grow businesses through innovation, venture creation and small business management.",
    utme: [
      "English Language",
      "Mathematics",
      "Economics",
      "Any other Social Science subject",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics, Economics and two others.",
    careers: [
      "Entrepreneur",
      "Business Development Officer",
      "Startup Founder",
    ],
  },
  {
    id: 42,
    name: "Employment Relations & Human Resources Management",
    faculty: "Management Sciences",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Covers people management, industrial relations, labour law and organisational behaviour.",
    utme: [
      "English Language",
      "Mathematics",
      "Economics",
      "Any other Social Science subject",
    ],
    olevel:
      "Five O'Level credits including English, Mathematics, Economics and two others.",
    careers: ["HR Manager", "Industrial Relations Officer", "Recruiter"],
  },
  {
    id: 43,
    name: "Biochemistry",
    faculty: "Natural Science",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Study of the chemical processes within living organisms, with applications in medicine, agriculture and biotechnology.",
    utme: ["English Language", "Biology", "Chemistry", "Physics/Mathematics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Biology, Chemistry and Physics.",
    careers: ["Biochemist", "Research Scientist", "Lab Manager"],
  },
  {
    id: 44,
    name: "Biotechnology",
    faculty: "Natural Science",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Applies biological systems to develop products and technologies in health, agriculture and industry.",
    utme: ["English Language", "Biology", "Chemistry", "Physics/Mathematics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Biology, Chemistry and Physics.",
    careers: [
      "Biotechnologist",
      "Research Scientist",
      "Quality Control Officer",
    ],
  },
  {
    id: 45,
    name: "Geological Sciences",
    faculty: "Natural Science",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Study of the Earth's structure, minerals, rocks and processes, with applications in mining, oil and gas and environmental management.",
    utme: ["English Language", "Mathematics", "Physics", "Chemistry/Biology"],
    olevel:
      "Five O'Level credits including English, Mathematics, Physics, Chemistry and Biology/Geography.",
    careers: ["Geologist", "Petroleum Geoscientist", "Mining Consultant"],
  },
  {
    id: 46,
    name: "Industrial Chemistry",
    faculty: "Natural Science",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Applies chemical principles to industrial processes, materials, polymers and manufacturing.",
    utme: ["English Language", "Chemistry", "Mathematics", "Physics/Biology"],
    olevel:
      "Five O'Level credits including English, Mathematics, Chemistry, Physics and Biology.",
    careers: ["Industrial Chemist", "Quality Analyst", "Production Chemist"],
  },
  {
    id: 47,
    name: "Mathematics",
    faculty: "Natural Science",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Covers pure and applied mathematics, statistics, modelling and computation.",
    utme: ["English Language", "Mathematics", "Physics", "Chemistry/Economics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Physics, Chemistry and one other.",
    careers: ["Mathematician", "Data Analyst", "Statistician"],
  },
  {
    id: 48,
    name: "Microbiology",
    faculty: "Natural Science",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Study of microorganisms with applications in medicine, food, agriculture and industry.",
    utme: ["English Language", "Biology", "Chemistry", "Physics/Mathematics"],
    olevel:
      "Five O'Level credits including English, Mathematics, Biology, Chemistry and Physics.",
    careers: ["Microbiologist", "Lab Scientist", "Quality Control Officer"],
  },
  {
    id: 49,
    name: "Physics",
    faculty: "Natural Science",
    degree: "B.Sc",
    duration: "4 years",
    description:
      "Study of matter, energy, motion and the fundamental laws of the universe, with applications in electronics, astrophysics and materials science.",
    utme: ["English Language", "Physics", "Mathematics", "Chemistry/Biology"],
    olevel:
      "Five O'Level credits including English, Mathematics, Physics, Chemistry and Biology.",
    careers: ["Physicist", "Research Scientist", "Electronics Specialist"],
  },
];

const FACULTIES = [...new Set(ALL_COURSES.map((c) => c.faculty))].sort();

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [activeCourse, setActiveCourse] = useState(null);

  // Close modal on Escape + lock background scroll
  useEffect(() => {
    if (!activeCourse) return;
    const onKey = (e) => e.key === "Escape" && setActiveCourse(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeCourse]);

  const filteredCourses = useMemo(() => {
    return ALL_COURSES.filter((course) => {
      const matchesSearch = course.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFaculty =
        selectedFaculty === "All" || course.faculty === selectedFaculty;
      const matchesDuration =
        selectedDuration === "All" || course.duration === selectedDuration;
      return matchesSearch && matchesFaculty && matchesDuration;
    });
  }, [searchTerm, selectedFaculty, selectedDuration]);

  return (
    <>
      <PageHeader
        crumb="Admissions"
        title="Undergraduate Courses"
        lede="Explore our NUC-accredited programmes across 11 faculties. Find the right course to shape your future."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 1100 }}>
          {/* SEARCH & FILTER BAR */}
          <div className="courses-controls">
            <div className="courses-search">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search courses by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search courses"
              />
            </div>

            <div className="courses-filters">
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                aria-label="Filter by faculty"
              >
                <option value="All">All Faculties</option>
                {FACULTIES.map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>

              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                aria-label="Filter by duration"
              >
                <option value="All">Any Duration</option>
                <option value="4 years">4 Years</option>
                <option value="5 years">5 Years</option>
              </select>
            </div>
          </div>

          <p className="courses-count">
            Showing <strong>{filteredCourses.length}</strong> of{" "}
            {ALL_COURSES.length} courses
          </p>

          {filteredCourses.length > 0 ? (
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <article className="course-card" key={course.id}>
                  <div className="course-card-header">
                    <span className="course-faculty-badge">
                      {course.faculty}
                    </span>
                    <span className="course-duration">{course.duration}</span>
                  </div>
                  <h3 className="course-name">{course.name}</h3>
                  <div className="course-meta">
                    <span className="course-degree">{course.degree}</span>
                  </div>
                  <button
                    className="course-cta"
                    type="button"
                    onClick={() => setActiveCourse(course)}
                  >
                    View Details
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="courses-empty">
              <p>No courses match your search. Try adjusting your filters.</p>
              <button
                className="course-cta"
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFaculty("All");
                  setSelectedDuration("All");
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      {activeCourse && (
        <div
          className="course-modal-overlay"
          onClick={() => setActiveCourse(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-modal-title"
        >
          <div className="course-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="course-modal-close"
              onClick={() => setActiveCourse(null)}
              aria-label="Close details"
            >
              ×
            </button>

            <div className="course-modal-header">
              <span className="course-faculty-badge">
                {activeCourse.faculty}
              </span>
              <h2 id="course-modal-title">{activeCourse.name}</h2>
              <div className="course-modal-meta">
                <span className="course-degree">{activeCourse.degree}</span>
                <span className="course-duration">{activeCourse.duration}</span>
              </div>
            </div>

            <div className="course-modal-body">
              <h3>Overview</h3>
              <p>{activeCourse.description}</p>

              <h3>UTME Subjects</h3>
              <ul>
                {activeCourse.utme.map((subj) => (
                  <li key={subj}>{subj}</li>
                ))}
              </ul>

              <h3>O'Level Requirements</h3>
              <p>{activeCourse.olevel}</p>

              <h3>Career Paths</h3>
              <ul>
                {activeCourse.careers.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="course-modal-footer">
              <button
                className="course-cta course-cta-close"
                type="button"
                onClick={() => setActiveCourse(null)}
              >
                Close
              </button>
              {" "}
              <a
                className="course-cta course-cta-apply"
                href="https://apply.acu.edu.ng"
                target="_blank"
                rel="noopener noreferrer"
              >
                Click Here to Apply
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

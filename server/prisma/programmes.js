// Postgraduate programme catalogue, grouped by the faculty that offers it.
// Sourced from the university's published list of postgraduate programmes.
const FACULTIES = [
  {
    faculty: "Faculty of Humanities",
    programmes: [
      ["M.A. History", "M.A."],
      ["Ph.D. History", "Ph.D."],
      ["M.A. Christian Religious Studies", "M.A."],
      ["PGD Christian Religious Studies", "PGD"],
      ["Ph.D. Christian Religious Studies", "Ph.D."],
      ["PGD Religious Studies", "PGD"],
      ["Ph.D. Religious Studies", "Ph.D."],
      ["Ph.D. English", "Ph.D."],
    ],
  },
  {
    faculty: "Faculty of Management Sciences",
    programmes: [
      ["Master of Business Administration (MBA)", "MBA"],
      ["Master of Public Administration (MPA)", "MPA"],
      ["Doctor of Business Administration (DBA)", "DBA"],
      ["M.Sc. Accounting", "M.Sc."],
      ["PGD Accounting", "PGD"],
      ["M.Sc. Business Administration", "M.Sc."],
      ["PGD Business Administration", "PGD"],
      ["Ph.D. Business Administration", "Ph.D."],
    ],
  },
  {
    faculty: "Faculty of Natural Sciences",
    programmes: [
      ["M.Sc. Computer Science", "M.Sc."],
      ["PGD Computer Science", "PGD"],
      ["Ph.D. Computer Science", "Ph.D."],
      ["Master of Information Technology (MIT)", "MIT"],
      ["M.Sc. Microbiology", "M.Sc."],
      ["PGD Microbiology", "PGD"],
      ["Ph.D. Microbiology", "Ph.D."],
      ["M.Sc. Biochemistry", "M.Sc."],
      ["PGD Biochemistry", "PGD"],
      ["Ph.D. Biochemistry", "Ph.D."],
      ["M.Sc. Industrial Chemistry", "M.Sc."],
      ["PGD Industrial Chemistry", "PGD"],
      ["M.Sc. Geology", "M.Sc."],
      ["PGD Geology", "PGD"],
      ["Ph.D. Geology", "Ph.D."],
      ["PGD Physics", "PGD"],
    ],
  },
  {
    faculty: "Faculty of Social Sciences & Communication",
    programmes: [
      ["M.Sc. Mass Communication", "M.Sc."],
      ["PGD Mass Communication", "PGD"],
      ["Ph.D. Mass Communication", "Ph.D."],
    ],
  },
  {
    faculty: "Faculty of Education",
    programmes: [
      ["M.Ed. Educational Management", "M.Ed."],
      ["PGD Education", "PGD"],
    ],
  },
];

const POSTGRADUATE_PROGRAMMES = FACULTIES.flatMap((group) =>
  group.programmes.map(([name, award]) => ({
    name,
    award,
    faculty: group.faculty,
  })),
);

module.exports = { POSTGRADUATE_PROGRAMMES };

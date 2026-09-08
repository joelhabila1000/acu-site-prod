import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

const PRINCIPAL_OFFICERS = [
  {
    name: "Professor (Mrs.) Ebunoluwa Olufemi Oduwole FNAL, FCIA, FEMTAN",
    role: "Vice-Chancellor",
    summary:
      "Provides strategic leadership for the University’s academic, administrative and spiritual mission, guiding ACU toward excellence in teaching, research and service.",
  },
  {
    name: "Professor Adeyemi Olukayode Binuyo",
    role: "Deputy Vice-Chancellor (Administration)",
    summary:
      "Oversees academic standards, curriculum quality, faculty development and the strengthening of the University’s learning environment.",
  },
  {
    name: "Prof. O. O. Adeoye",
    role: "Deputy Vice-Chancellor (Academics)",
    summary:
      "Coordinates institutional operations, staff welfare and administrative systems that support effective university governance and service delivery.",
  },
  {
    name: "Mr. A. A. Akinlade",
    role: "Registrar",
    summary:
      "Leads student records, academic governance, statutory compliance and the administrative framework that sustains institutional order and continuity.",
  },
  {
    name: "Mr. I. A. Ojo",
    role: "Bursar",
    summary:
      "Manages the University’s financial planning, budgeting, accounts and resource stewardship to support sustainable development and accountability.",
  },
  {
    name: "Dr. L. A. Bello",
    role: "University Librarian",
    summary:
      "Directs library services, information access and knowledge resources that enable teaching, research, and intellectual growth across the campus.",
  },
];

export default function PrincipalOfficers() {
  return (
    <>
      <PageHeader
        crumb="About"
        title="Principal Officers"
        lede="The administrative leadership of Ajayi Crowther University is committed to academic excellence, integrity, and service in line with the University’s mission and values."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 1100 }}>
          <div
            style={{
              display: "grid",
              gap: 24,
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            }}
          >
            {PRINCIPAL_OFFICERS.map((officer) => (
              <article
                key={officer.role}
                style={{
                  background: "#fff",
                  border: "1px solid rgba(12, 35, 64, 0.1)",
                  borderRadius: 12,
                  boxShadow: "0 18px 40px -24px rgba(8,19,38,0.2)",
                  padding: 28,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #123056, #7a2331)",
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    marginBottom: 18,
                  }}
                  aria-hidden="true"
                >
                  {officer.name
                    .split(" ")
                    .slice(-2)
                    .map((part) => part[0])
                    .join("")}
                </div>
                <h3 style={{ marginBottom: 8 }}>{officer.name}</h3>
                <p
                  style={{
                    color: "#7a2331",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    fontSize: "0.72rem",
                    marginBottom: 14,
                  }}
                >
                  {officer.role}
                </p>
                <p style={{ color: "#3c4148", marginBottom: 0 }}>
                  {officer.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-navy" aria-labelledby="leadership-message">
        <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
          <p className="eyebrow" style={{ color: "#e0bf4f" }}>Leadership</p>
          <h2 id="leadership-message">
            Committed to mission, excellence and transformation
          </h2>
          <p style={{ color: "rgba(248,244,233,0.82)" }}>
            ACU’s principal officers work together to uphold the University’s
            mission of raising Godly intellectuals who are equipped for
            scholarship, leadership, service and meaningful contribution to
            society.
          </p>
          <div style={{ marginTop: 20 }}>
            <Link to="/about" className="btn btn-outline">
              Back to About
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

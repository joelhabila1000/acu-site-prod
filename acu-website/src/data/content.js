// Central space for editable site content.
// Update text, links, and image URLs here, components read from this file.

import logoImg from "../assets/acu-logo-new-1.png";

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
  applyUrl: "",
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
  { label: "Undergraduate", url: "/portal/undergraduate" },
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
  { name: "Agriculture", url: "" },
  {
    name: "Basic Medical Sciences",
    url: "",
  },
  {
    name: "Communication & Media Studies",
    url: "",
  },
  { name: "Computing", url: "" },
  { name: "Education", url: "" },
  { name: "Engineering", url: "" },
  {
    name: "Environmental Studies",
    url: "",
  },
  { name: "Humanities", url: "" },
  { name: "Law", url: "" },
  {
    name: "Management Sciences",
    url: "",
  },
  {
    name: "Natural Sciences",
    url: "",
  },
  { name: "Nursing", url: "" },
  {
    name: "Social Sciences",
    url: "",
  },
];

export const NEWS = [
  {
    title: "SURCON Accreditation Team Visits ACU, Lauds Programme Quality",
    date: "August 5, 2026",
    image:
      "https://acu.edu.ng/mainacu/wp-content/uploads/2026/08/SURCON-2.jpeg",
    url: "https://acu.edu.ng/surcon-accreditation-team-visits-acu-lauds-programme-quality/",
  },
  {
    title: "NUC Pre-Validation Team Visits ACU for ODeL Programme Assessment",
    date: "August 5, 2026",
    image:
      "https://acu.edu.ng/mainacu/wp-content/uploads/2026/08/AJAYI-CROWTHER-4.jpeg",
    url: "https://acu.edu.ng/nuc-pre-validation-team-visits-ajayi-crowther-university-for-odel-programme-assessment/",
  },
  {
    title:
      "ACU Celebrates BOT Chairman Chief Wole Olanipekun's 50 Years of Legal Excellence",
    date: "August 5, 2026",
    image:
      "https://acu.edu.ng/mainacu/wp-content/uploads/2026/08/AJAYI-CROWTHER-2.jpeg",
    url: "https://acu.edu.ng/acu-celebrates-bot-chairman-chief-wole-olanipekuns-50-years-of-legal-excellence-hails-his-transformative-philanthropy/",
  },
  {
    title: "2026/2027 Admissions: Why Ajayi Crowther University, Oyo",
    date: "July 29, 2026",
    image:
      "https://acu.edu.ng/mainacu/wp-content/uploads/2026/07/1785321244968.jpg",
    url: "https://acu.edu.ng/2026-2027-admissions-why-ajayi-crowther-university-acu-oyo/",
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
  hero: "https://acu.edu.ng/wp-content/uploads/2025/10/ACU-Oyo-4.png",
  vc: "https://acu.edu.ng/wp-content/uploads/2025/10/acu_vc-1024x819.jpeg",
  aboutSecondary:
    "https://acu.edu.ng/mainacu/wp-content/uploads/2026/08/AJAYI-CROWTHER-2.jpeg",
  campusWide:
    "https://acu.edu.ng/mainacu/wp-content/uploads/2026/08/AJAYI-CROWTHER-4.jpeg",
};

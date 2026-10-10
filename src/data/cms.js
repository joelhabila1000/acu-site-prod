// Content layer: loads editable content from the CMS API once, falling back to
// the bundled static content whenever the API is unavailable or a collection is
// empty. Components read it through the hooks at the bottom of this file.

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { apiGet } from "../lib/api.js";
import { slugify } from "../lib/format.js";
import {
  SITE,
  NAV_LINKS,
  PORTALS,
  STATS,
  PROGRAMMES,
  PILLARS,
  FACULTIES,
  NEWS,
  IMAGES,
  SUSTAINABILITY,
  PG_PROGRAMMES,
} from "./content.js";
import { NEWS_ITEMS } from "./News.js";
import { PRINCIPAL_OFFICERS } from "./principalOfficers.js";
import { INAUGURAL_LECTURES } from "./lectures.js";

const OFFICER_IMAGES = Object.fromEntries(
  PRINCIPAL_OFFICERS.map((officer) => [officer.slug, officer.image]),
);

const NEWS_IMAGE_FALLBACKS = [
  IMAGES.heroCampusOne,
  IMAGES.heroCampusTwo,
  IMAGES.heroCampusThree,
  IMAGES.heroCampusFour,
  IMAGES.students,
];

const DEFAULT_SLIDES = [
  {
    imageKey: "heroCampusOne",
    eyebrow: "A Community of Excellence",
    title: "Welcome to Ajayi Crowther University, Oyo",
    subtitle: "Where We Raise Godly Intellectuals",
    description:
      "A faith-based Anglican institution forming scholars of sound character, deep knowledge and lifelong integrity across thirteen faculties on four strategic campuses in Oyo State, Nigeria.",
  },
  {
    imageKey: "heroCampusTwo",
    eyebrow: "Faith, Learning and Service",
    title: "Shaping Purposeful Leaders for a Better Tomorrow",
    subtitle: "Academic excellence rooted in character",
    description:
      "From the classroom to the community, ACU equips students to lead with wisdom, confidence and integrity in every field of life and service.",
  },
  {
    imageKey: "heroCampusThree",
    eyebrow: "A Future Built on Vision",
    title: "Discover an Environment That Inspires Greatness",
    subtitle: "Innovation, scholarship and spiritual growth",
    description:
      "Our students learn in a vibrant, values-driven environment designed to unlock potential, expand opportunity and nurture a life of impact.",
  },
  {
    imageKey: "heroCampusFour",
    eyebrow: "Purpose in Motion",
    title: "A Campus Experience Designed for Growth",
    subtitle: "Learning that inspires action and excellence",
    description:
      "ACU brings together mentorship, discipline and opportunity so every student can build a life of meaning, leadership and lasting impact.",
  },
  {
    imageKey: "heroCampusFive",
    eyebrow: "Rooted in Vision",
    title: "A Place Where Dreams Take Shape",
    subtitle: "Character, scholarship and service",
    description:
      "With a strong academic culture and a faith-centered foundation, ACU empowers students to pursue excellence in every calling.",
  },
];

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

// Photographs are stored as [{ url, caption }]; tolerate a bare string too so
// older/imported data still renders.
function mapImages(value) {
  return asArray(value)
    .map((item) =>
      typeof item === "string"
        ? { url: item, caption: "" }
        : {
            url: (item && item.url) || "",
            caption: (item && item.caption) || "",
          },
    )
    .filter((item) => item.url);
}

function firstImage(images) {
  return images.length ? images[0].url : null;
}

// Facilities are stored as [{ name, image }]; rows created before photos were
// supported are a plain list of strings, so accept both.
function mapFacilities(value) {
  return asArray(value)
    .map((item) =>
      typeof item === "string"
        ? { name: item, image: "" }
        : {
            name: (item && item.name) || "",
            image: (item && item.image) || "",
          },
    )
    .filter((item) => item.name);
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function stripHtml(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").trim();
}

function htmlToParagraphs(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  const paragraphs = [...doc.body.querySelectorAll("p")]
    .map((p) => (p.textContent || "").trim())
    .filter(Boolean);
  return paragraphs.length ? paragraphs.join("\n\n") : stripHtml(html);
}

function resolveSlide(slide) {
  return {
    image: slide.image || IMAGES[slide.imageKey] || IMAGES.heroCampusOne,
    eyebrow: slide.eyebrow || "",
    title: slide.title || "",
    subtitle: slide.subtitle || "",
    description: slide.description || "",
  };
}

function mapFaculty(row) {
  return {
    name: row.name,
    slug: row.slug,
    url: `/faculties/${row.slug}`,
    tagline: row.tagline || "",
    summary: row.summary || row.description || "",
    dean: row.dean || "",
    image: row.image || null,
    programmes: asArray(row.programmes),
    researchAreas: asArray(row.researchAreas),
    highlights: asArray(row.highlights),
    facilities: mapFacilities(row.facilities),
    careerOutcomes: asArray(row.careerOutcomes),
  };
}

function mapOfficer(row) {
  return {
    slug: row.slug,
    name: row.name,
    role: row.role,
    image: row.image || OFFICER_IMAGES[row.slug] || null,
    summary: row.summary || "",
    bio: asArray(row.bio),
    qualifications: asArray(row.qualifications),
    memberships: asArray(row.memberships),
  };
}

const STATIC_NEWS_HOME = NEWS.map((item) => ({ ...item }));

const STATIC_NEWS_EVENTS = NEWS_ITEMS.map((item) => ({
  id: `${item.type}-${item.id}`,
  slug: slugify(item.title),
  type: item.type,
  title: item.title,
  date: item.date,
  excerpt: item.excerpt,
  body: asArray(item.body).join("\n\n"),
  image: item.image || null,
  category: item.tag,
}));

const DEFAULT_GALLERY = [
  {
    name: "Campus Life",
    slug: "campus-life",
    description: "A glimpse of life and learning at Ajayi Crowther University.",
    coverImage: IMAGES.heroCampusOne,
    images: [
      {
        url: IMAGES.heroCampusOne,
        caption:
          "Florence Ajimobi Information Technology Building at Ajayi Crowther University",
      },
      {
        url: IMAGES.heroCampusTwo,
        caption: "Academic building at Ajayi Crowther University",
      },
      {
        url: IMAGES.heroCampusThree,
        caption: "Crowther Hall at Ajayi Crowther University",
      },
      {
        url: IMAGES.heroCampusFour,
        caption: "University Lecture Rooms at Ajayi Crowther University",
      },
      {
        url: IMAGES.heroCampusFive,
        caption: "Senate Building at Ajayi Crowther University",
      },
      {
        url: IMAGES.heroCampusSix,
        caption: "Postgraduate School building at Ajayi Crowther University",
      },
    ],
  },
];

function mapAlbum(row) {
  const images = asArray(row.images)
    .map((image) => ({
      url: image.imageUrl,
      caption: image.caption || "",
    }))
    .filter((image) => image.url);
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || "",
    coverImage: row.coverImage || (images[0] && images[0].url) || null,
    images,
  };
}

const DEFAULT_CONTENT = {
  site: { ...SITE, logo: SITE.logo },
  nav: NAV_LINKS,
  portals: PORTALS,
  stats: STATS,
  programmes: PROGRAMMES,
  pillars: PILLARS,
  sustainability: SUSTAINABILITY,
  slides: DEFAULT_SLIDES.map(resolveSlide),
  faculties: FACULTIES.map((faculty) => ({
    ...faculty,
    facilities: mapFacilities(faculty.facilities),
  })),
  principalOfficers: PRINCIPAL_OFFICERS.map((officer) => ({ ...officer })),
  news: STATIC_NEWS_HOME,
  newsEvents: STATIC_NEWS_EVENTS,
  gallery: DEFAULT_GALLERY,
  documents: [],
  staff: [],
  lectures: INAUGURAL_LECTURES.map((lecture) => ({ ...lecture })),
  announcements: [],
  pgProgrammes: PG_PROGRAMMES.map((programme) => ({ ...programme })),
  publications: [],
  ready: false,
};

// Sustainability is edited as one object, so a saved value may only carry the
// fields the editor changed. Merge over the bundled defaults and keep the
// bundled copy for any list that came back empty.
function mapSustainability(value) {
  const base = DEFAULT_CONTENT.sustainability;
  const src = value && typeof value === "object" ? value : {};
  const merged = { ...base, ...src };
  for (const key of [
    "heroSlides",
    "body",
    "stats",
    "priorities",
    "contributions",
    "initiatives",
    "stories",
    "collaborators",
    "gallery",
    "commitments",
    "involvement",
  ]) {
    if (!asArray(src[key]).length) merged[key] = base[key];
  }
  return merged;
}

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [reloadToken, setReloadToken] = useState(0);
  // Tracks whether the API answered, so we can retry when it did not.
  const lastLoadFailed = useRef(true);

  // Lets consumers re-pull everything, e.g. after editing in the admin.
  const refresh = useCallback(() => setReloadToken((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [
        settingsR,
        facultiesR,
        officersR,
        newsR,
        eventsR,
        galleryR,
        documentsR,
        staffR,
        lecturesR,
        announcementsR,
        programmesR,
        publicationsR,
      ] = await Promise.allSettled([
        apiGet("/api/settings"),
        apiGet("/api/faculties"),
        apiGet("/api/principal-officers"),
        apiGet("/api/news?status=published"),
        apiGet("/api/events?status=published"),
        apiGet("/api/gallery?status=published"),
        apiGet("/api/documents?status=active"),
        apiGet("/api/staff?status=active"),
        apiGet("/api/lectures?status=published"),
        apiGet("/api/announcements?status=published"),
        apiGet("/api/programmes?status=published"),
        apiGet("/api/publications?status=published"),
      ]);

      if (cancelled) return;

      // The settings call is the canary: if it never answered, the API is
      // unreachable and the page is showing bundled fallback content.
      lastLoadFailed.current = settingsR.status !== "fulfilled";

      const settings =
        settingsR.status === "fulfilled" && settingsR.value
          ? settingsR.value
          : {};

      const next = { ...DEFAULT_CONTENT };

      if (Object.keys(settings).length) {
        next.site = {
          ...SITE,
          ...(settings.site || {}),
          logo: (settings.site && settings.site.logo) || SITE.logo,
          social: {
            ...SITE.social,
            ...((settings.site && settings.site.social) ||
              (settings.contact && settings.contact.social) ||
              {}),
          },
        };
        if (Object.keys(settings.contact || {}).length) {
          next.site = {
            ...next.site,
            address: settings.contact.address || next.site.address,
            phone: settings.contact.phone || next.site.phone,
            email: settings.contact.email || next.site.email,
            mapEmbed: settings.contact.mapEmbed || next.site.mapEmbed,
          };
        }
        if (asArray(settings.nav).length) next.nav = settings.nav;
        if (asArray(settings.portals).length) next.portals = settings.portals;
        if (asArray(settings.stats).length) next.stats = settings.stats;
        if (asArray(settings.programmes).length) {
          next.programmes = settings.programmes;
        }
        if (asArray(settings.pillars).length) next.pillars = settings.pillars;
        const slides = settings.homepage && settings.homepage.slides;
        if (asArray(slides).length) next.slides = slides.map(resolveSlide);
        if (settings.sustainability) {
          next.sustainability = mapSustainability(settings.sustainability);
        }
      }

      if (
        facultiesR.status === "fulfilled" &&
        asArray(facultiesR.value && facultiesR.value.data).length
      ) {
        next.faculties = facultiesR.value.data.map(mapFaculty);
      }

      if (
        officersR.status === "fulfilled" &&
        asArray(officersR.value && officersR.value.data).length
      ) {
        next.principalOfficers = officersR.value.data
          .slice()
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map(mapOfficer);
      }

      if (
        galleryR.status === "fulfilled" &&
        asArray(galleryR.value && galleryR.value.data).length
      ) {
        const albums = galleryR.value.data.map(mapAlbum).filter((album) => album.images.length);
        if (albums.length) next.gallery = albums;
      }

      if (
        documentsR.status === "fulfilled" &&
        asArray(documentsR.value && documentsR.value.data).length
      ) {
        next.documents = documentsR.value.data.map((row) => ({
          id: row.id,
          title: row.title,
          description: row.description || "",
          category: row.category || "",
          url: row.fileUrl,
          fileName: row.fileName || "",
          fileType: row.fileType || "",
          fileSize: row.fileSize || 0,
          date: formatDate(row.createdAt),
        }));
      }

      if (
        staffR.status === "fulfilled" &&
        asArray(staffR.value && staffR.value.data).length
      ) {
        next.staff = staffR.value.data.map((row) => ({
          id: row.id,
          slug: row.slug,
          title: row.title || "",
          name: row.name,
          position: row.position || "",
          staffType: row.staffType || "academic",
          image: row.profileImage || "",
          facultyId: row.facultyId || null,
          departmentId: row.departmentId || null,
          facultyName: row.facultyName || "",
          departmentName: row.departmentName || "",
          unit: row.unit || "",
          biography: row.biography || "",
          email: row.email || "",
          phone: row.phone || "",
          linkedin: row.linkedin || "",
          orcid: row.orcid || "",
          googleScholar: row.googleScholar || "",
          scopus: row.scopus || "",
          researchGate: row.researchGate || "",
          academia: row.academia || "",
          webOfScience: row.webOfScience || "",
          ssrn: row.ssrn || "",
        }));
      }

      const lectureRows =
        lecturesR.status === "fulfilled"
          ? asArray(lecturesR.value && lecturesR.value.data)
          : [];

      if (lectureRows.length) {
        next.lectures = lectureRows.map((row) => ({
          id: row.id,
          number: row.number,
          lecturer: row.lecturer || "",
          lecturerRole: row.lecturerRole || "",
          title: row.title || "",
          summary: row.summary || "",
          date: row.lectureDate || "",
          venue: row.venue || "",
          fileUrl: row.fileUrl || "",
          status: row.status || "published",
        }));
      }

      const announcementRows =
        announcementsR.status === "fulfilled"
          ? asArray(announcementsR.value && announcementsR.value.data)
          : [];

      if (announcementRows.length) {
        next.announcements = announcementRows.map((row) => ({
          id: row.id,
          title: row.title,
          content: row.content,
          priority: row.priority || 1,
          date: formatDate(row.publishedAt),
        }));
      }

      const programmeRows =
        programmesR.status === "fulfilled"
          ? asArray(programmesR.value && programmesR.value.data)
          : [];

      if (programmeRows.length) {
        next.pgProgrammes = programmeRows.map((row) => ({
          id: row.id,
          name: row.name,
          award: row.award,
          faculty: row.faculty,
        }));
      }

      const publicationRows =
        publicationsR.status === "fulfilled"
          ? asArray(publicationsR.value && publicationsR.value.data)
          : [];

      if (publicationRows.length) {
        next.publications = publicationRows.map((row) => ({
          id: row.id,
          title: row.title,
          authors: row.authors || "",
          type: row.publicationType || "",
          venue: row.venue || "",
          year: row.year || null,
          volume: row.volume || "",
          issue: row.issue || "",
          pages: row.pages || "",
          doi: row.doi || "",
          url: row.url || "",
          abstract: row.abstract || "",
          faculty: row.faculty || "",
          fileUrl: row.fileUrl || "",
          featured: !!row.featured,
        }));
      }

      const newsRows =
        newsR.status === "fulfilled" ? asArray(newsR.value && newsR.value.data) : [];
      const eventRows =
        eventsR.status === "fulfilled" ? asArray(eventsR.value && eventsR.value.data) : [];

      if (newsRows.length) {
        next.news = newsRows.map((row, index) => {
          const photos = mapImages(row.images);
          return {
            id: row.id,
            title: row.title,
            date: formatDate(row.publishedAt || row.createdAt),
            image:
              row.featuredImage ||
              firstImage(photos) ||
              NEWS_IMAGE_FALLBACKS[index % NEWS_IMAGE_FALLBACKS.length],
            url: `/news/${row.slug || slugify(row.title)}`,
          };
        });
        next.newsEvents = [
          ...newsRows.map((row) => {
            const photos = mapImages(row.images);
            return {
              id: `news-${row.id}`,
              type: "news",
              title: row.title,
              date: row.publishedAt || row.createdAt,
              excerpt: row.excerpt || stripHtml(row.content),
              body: htmlToParagraphs(row.content),
              image: row.featuredImage || firstImage(photos),
              images: photos,
              category: row.category,
              slug: row.slug || slugify(row.title),
              link: null,
            };
          }),
          ...eventRows.map((row) => {
            const photos = mapImages(row.images);
            return {
              id: `event-${row.id}`,
              slug: slugify(row.title),
              type: "event",
              title: row.title,
              date: row.eventDate,
              excerpt: row.description,
              body: row.description,
              image: row.image || firstImage(photos),
              images: photos,
              category: row.venue || null,
            };
          }),
        ];
      } else if (eventRows.length) {
        next.newsEvents = eventRows.map((row) => {
          const photos = mapImages(row.images);
          return {
            id: `event-${row.id}`,
            slug: slugify(row.title),
            type: "event",
            title: row.title,
            date: row.eventDate,
            excerpt: row.description,
            body: row.description,
            image: row.image || firstImage(photos),
            images: photos,
            category: row.venue || null,
          };
        });
      }

      next.ready = true;
      setContent(next);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  // If the API was unreachable when the page loaded we are showing fallback
  // content, so try again as soon as the user comes back to the tab.
  useEffect(() => {
    const onFocus = () => {
      if (lastLoadFailed.current) refresh();
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [refresh]);

  const value = useMemo(() => ({ ...content, refresh }), [content, refresh]);
  return createElement(ContentContext.Provider, { value }, children);
}

const noop = () => {};

function useContent() {
  return useContext(ContentContext) || DEFAULT_CONTENT;
}

// Re-pulls all CMS content. Used when returning to the public site from the
// admin, so edits appear without a hard refresh.
export function useRefreshContent() {
  const content = useContent();
  return content.refresh || noop;
}

export function useSite() {
  const c = useContent();
  return {
    site: c.site,
    nav: c.nav,
    portals: c.portals,
    stats: c.stats,
    programmes: c.programmes,
    pillars: c.pillars,
    slides: c.slides,
  };
}

export function useSustainability() {
  return useContent().sustainability;
}

export function useDocuments() {
  return useContent().documents;
}

export function useStaff() {
  return useContent().staff;
}

export function useFaculties() {
  return useContent().faculties;
}

export function usePrincipalOfficers() {
  return useContent().principalOfficers;
}

export function useNews() {
  return useContent().news;
}

export function useNewsEvents() {
  return useContent().newsEvents;
}

export function useGallery() {
  return useContent().gallery;
}

export function useLectures() {
  return useContent().lectures;
}

export function useAnnouncements() {
  return useContent().announcements;
}

export function usePostgraduateProgrammes() {
  return useContent().pgProgrammes;
}

export function usePublications() {
  return useContent().publications;
}

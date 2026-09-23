// Content layer: loads editable content from the CMS API once, falling back to
// the bundled static content whenever the API is unavailable or a collection is
// empty. Components read it through the hooks at the bottom of this file.

import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiGet } from "../lib/api.js";
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
} from "./content.js";
import { NEWS_ITEMS } from "./News.js";
import { PRINCIPAL_OFFICERS } from "./principalOfficers.js";

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
    facilities: asArray(row.facilities),
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
  slides: DEFAULT_SLIDES.map(resolveSlide),
  faculties: FACULTIES.map((faculty) => ({ ...faculty })),
  principalOfficers: PRINCIPAL_OFFICERS.map((officer) => ({ ...officer })),
  news: STATIC_NEWS_HOME,
  newsEvents: STATIC_NEWS_EVENTS,
  gallery: DEFAULT_GALLERY,
  ready: false,
};

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [settingsR, facultiesR, officersR, newsR, eventsR, galleryR] =
        await Promise.allSettled([
          apiGet("/api/settings"),
          apiGet("/api/faculties"),
          apiGet("/api/principal-officers"),
          apiGet("/api/news?status=published"),
          apiGet("/api/events?status=published"),
          apiGet("/api/gallery?status=published"),
        ]);

      if (cancelled) return;

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

      const newsRows =
        newsR.status === "fulfilled" ? asArray(newsR.value && newsR.value.data) : [];
      const eventRows =
        eventsR.status === "fulfilled" ? asArray(eventsR.value && eventsR.value.data) : [];

      if (newsRows.length) {
        next.news = newsRows.map((row, index) => ({
          id: row.id,
          title: row.title,
          date: formatDate(row.publishedAt || row.createdAt),
          image:
            row.featuredImage ||
            NEWS_IMAGE_FALLBACKS[index % NEWS_IMAGE_FALLBACKS.length],
          url: "/news",
        }));
        next.newsEvents = [
          ...newsRows.map((row) => ({
            id: `news-${row.id}`,
            type: "news",
            title: row.title,
            date: row.publishedAt || row.createdAt,
            excerpt: row.excerpt || stripHtml(row.content),
            body: htmlToParagraphs(row.content),
            image: row.featuredImage || null,
            category: row.category,
            slug: row.slug,
            link: null,
          })),
          ...eventRows.map((row) => ({
            id: `event-${row.id}`,
            type: "event",
            title: row.title,
            date: row.eventDate,
            excerpt: row.description,
            body: row.description,
            image: row.image || null,
            category: row.venue || null,
          })),
        ];
      } else if (eventRows.length) {
        next.newsEvents = eventRows.map((row) => ({
          id: `event-${row.id}`,
          type: "event",
          title: row.title,
          date: row.eventDate,
          excerpt: row.description,
          body: row.description,
          image: row.image || null,
          category: row.venue || null,
        }));
      }

      next.ready = true;
      setContent(next);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => content, [content]);
  return createElement(ContentContext.Provider, { value }, children);
}

function useContent() {
  return useContext(ContentContext) || DEFAULT_CONTENT;
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

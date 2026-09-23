// Declarative schemas for the schema-driven admin CRUD pages.

const STATUS_EDITORIAL = ["draft", "published"];

export const RESOURCES = {
  news: {
    title: "News",
    singular: "News article",
    endpoint: "/api/news",
    columns: [
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "status", label: "Status" },
      { key: "publishedAt", label: "Published", format: "date" },
    ],
    defaults: { status: "draft", featured: false },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", help: "Leave blank to generate from the title." },
      { name: "category", label: "Category", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "content", label: "Content (HTML)", type: "richtext" },
      { name: "featuredImage", label: "Cover image", type: "image" },
      { name: "status", label: "Status", type: "select", options: STATUS_EDITORIAL },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "publishedAt", label: "Published at", type: "date" },
    ],
  },

  events: {
    title: "Events",
    singular: "Event",
    endpoint: "/api/events",
    columns: [
      { key: "title", label: "Title" },
      { key: "venue", label: "Venue" },
      { key: "status", label: "Status" },
      { key: "eventDate", label: "Date", format: "date" },
    ],
    defaults: { status: "draft" },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "eventDate", label: "Event date", type: "date" },
      { name: "startTime", label: "Start time", type: "text" },
      { name: "endTime", label: "End time", type: "text" },
      { name: "venue", label: "Venue", type: "text" },
      { name: "image", label: "Image", type: "image" },
      { name: "status", label: "Status", type: "select", options: STATUS_EDITORIAL },
    ],
  },

  principalOfficers: {
    title: "Principal Officers",
    singular: "Principal Officer",
    endpoint: "/api/principal-officers",
    columns: [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "status", label: "Status" },
    ],
    defaults: { status: "published", sortOrder: 0 },
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "role", label: "Role / title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", help: "Leave blank to generate from the name." },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "bio", label: "Biography", type: "tags", help: "One paragraph per line." },
      { name: "qualifications", label: "Qualifications", type: "tags" },
      { name: "memberships", label: "Professional memberships", type: "tags" },
      { name: "image", label: "Portrait", type: "image" },
      { name: "sortOrder", label: "Display order", type: "number" },
      { name: "status", label: "Status", type: "select", options: STATUS_EDITORIAL },
    ],
  },

  faculties: {
    title: "Faculties & Programmes",
    singular: "Faculty",
    endpoint: "/api/faculties",
    columns: [
      { key: "name", label: "Faculty" },
      { key: "dean", label: "Dean" },
      { key: "status", label: "Status" },
    ],
    defaults: { status: "active", sortOrder: 0 },
    fields: [
      { name: "name", label: "Faculty name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", help: "Leave blank to generate from the name." },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "summary", label: "Overview", type: "textarea" },
      { name: "dean", label: "Dean", type: "text" },
      { name: "image", label: "Image", type: "image" },
      { name: "programmes", label: "Programmes", type: "tags", help: "One programme per line." },
      { name: "researchAreas", label: "Research areas", type: "tags" },
      { name: "highlights", label: "Highlights", type: "tags" },
      { name: "facilities", label: "Facilities", type: "tags" },
      { name: "careerOutcomes", label: "Career outcomes", type: "tags" },
      { name: "sortOrder", label: "Display order", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"] },
    ],
  },

  gallery: {
    title: "Gallery",
    singular: "Gallery album",
    endpoint: "/api/gallery",
    columns: [
      { key: "name", label: "Album" },
      { key: "status", label: "Status" },
    ],
    defaults: { status: "published", sortOrder: 0, images: [] },
    fields: [
      { name: "name", label: "Album name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", help: "Leave blank to generate from the name." },
      { name: "description", label: "Description", type: "textarea" },
      { name: "coverImage", label: "Cover image", type: "image" },
      {
        name: "images",
        label: "Photos",
        type: "list",
        itemLabel: "photo",
        itemFields: [
          { name: "imageUrl", label: "Image", type: "image" },
          { name: "caption", label: "Caption", type: "text" },
        ],
      },
      { name: "sortOrder", label: "Display order", type: "number" },
      { name: "status", label: "Status", type: "select", options: STATUS_EDITORIAL },
    ],
  },
};

export const ADMIN_NAV = [
  { path: "/admin", page: "dashboard", label: "Dashboard" },
  { path: "/admin/news", page: "news", label: "News" },
  { path: "/admin/events", page: "events", label: "Events" },
  { path: "/admin/principal-officers", page: "principal-officers", label: "Principal Officers" },
  { path: "/admin/faculties", page: "faculties", label: "Faculties & Programmes" },
  { path: "/admin/gallery", page: "gallery", label: "Gallery" },
  { path: "/admin/settings", page: "settings", label: "Site Settings" },
  { path: "/admin/users", page: "users", label: "Users & Roles" },
];

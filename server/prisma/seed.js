const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const slugify = require("slugify");
const prisma = new PrismaClient();
const content = require("./seedContent");
const { INAUGURAL_LECTURES } = require("./lectures");
const { POSTGRADUATE_PROGRAMMES } = require("./programmes");
const { PUBLICATIONS } = require("./publications");

function slug(value) {
  return slugify(value, { lower: true, strict: true });
}

async function seedRolesAndAdmin() {
  const superRole = await prisma.role.upsert({
    where: { name: "Super Admin" },
    update: {},
    create: { name: "Super Admin", description: "Full access" },
  });
  await prisma.role.upsert({
    where: { name: "Content Editor" },
    update: {},
    create: { name: "Content Editor", description: "Manage pages, news, events" },
  });
  await prisma.role.upsert({
    where: { name: "Academic Editor" },
    update: {},
    create: {
      name: "Academic Editor",
      description: "Manage faculties, departments, programmes, staff",
    },
  });
  await prisma.role.upsert({
    where: { name: "Admissions Editor" },
    update: {},
    create: { name: "Admissions Editor", description: "Manage admissions content" },
  });

  const passwordHash = await bcrypt.hash("adminchangeme", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@acu.edu.ng" },
    update: {},
    create: {
      name: "ACU Admin",
      email: "admin@acu.edu.ng",
      passwordHash,
      roleId: superRole.id,
    },
  });
  return admin;
}

async function seedSettings() {
  const settings = {
    site: content.SITE,
    contact: content.CONTACT,
    nav: content.NAV_LINKS,
    portals: content.PORTALS,
    stats: content.STATS,
    programmes: content.PROGRAMMES,
    pillars: content.PILLARS,
    sustainability: content.SUSTAINABILITY,
    homepage: { slides: content.HERO_SLIDES },
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}

async function seedFaculties() {
  for (const [index, faculty] of content.FACULTIES.entries()) {
    await prisma.faculty.upsert({
      where: { slug: faculty.slug },
      update: {
        name: faculty.name,
        tagline: faculty.tagline,
        summary: faculty.summary,
        description: faculty.summary,
        dean: faculty.dean,
        programmes: faculty.programmes,
        researchAreas: faculty.researchAreas,
        highlights: faculty.highlights,
        facilities: faculty.facilities,
        careerOutcomes: faculty.careerOutcomes,
        sortOrder: index,
      },
      create: {
        name: faculty.name,
        slug: faculty.slug,
        tagline: faculty.tagline,
        summary: faculty.summary,
        description: faculty.summary,
        dean: faculty.dean,
        programmes: faculty.programmes,
        researchAreas: faculty.researchAreas,
        highlights: faculty.highlights,
        facilities: faculty.facilities,
        careerOutcomes: faculty.careerOutcomes,
        sortOrder: index,
        status: "active",
      },
    });
  }
}

async function seedPrincipalOfficers() {
  for (const [index, officer] of content.PRINCIPAL_OFFICERS.entries()) {
    await prisma.principalOfficer.upsert({
      where: { slug: officer.slug },
      update: {
        name: officer.name,
        role: officer.role,
        summary: officer.summary,
        bio: officer.bio,
        qualifications: officer.qualifications,
        memberships: officer.memberships,
        sortOrder: index,
      },
      create: {
        slug: officer.slug,
        name: officer.name,
        role: officer.role,
        summary: officer.summary,
        bio: officer.bio,
        qualifications: officer.qualifications,
        memberships: officer.memberships,
        sortOrder: index,
        status: "published",
      },
    });
  }
}

async function seedNewsAndEvents(adminId) {
  for (const item of content.NEWS_ITEMS) {
    const publishedAt = new Date(item.date);
    if (item.type === "event") {
      const existing = await prisma.event.findFirst({
        where: { title: item.title },
      });
      if (!existing) {
        await prisma.event.create({
          data: {
            title: item.title,
            description: item.body.join("\n\n"),
            eventDate: publishedAt,
            status: "published",
          },
        });
      }
    } else {
      const newsSlug = slug(item.title);
      await prisma.news.upsert({
        where: { slug: newsSlug },
        update: {
          title: item.title,
          excerpt: item.excerpt,
          content: item.body.map((p) => `<p>${p}</p>`).join(""),
          category: item.tag,
          status: "published",
          publishedAt,
        },
        create: {
          title: item.title,
          slug: newsSlug,
          excerpt: item.excerpt,
          content: item.body.map((p) => `<p>${p}</p>`).join(""),
          category: item.tag,
          authorId: adminId,
          status: "published",
          publishedAt,
        },
      });
    }
  }
}

async function seedLectures() {
  for (const [index, lecture] of INAUGURAL_LECTURES.entries()) {
    const existing = await prisma.inauguralLecture.findFirst({
      where: { number: lecture.number },
    });
    const data = {
      number: lecture.number,
      lecturer: lecture.lecturer,
      lecturerRole: lecture.lecturerRole || "",
      title: lecture.title,
      lectureDate: lecture.lectureDate ? new Date(lecture.lectureDate) : null,
      venue: lecture.venue || "",
      status: lecture.status || "published",
      sortOrder: index,
    };
    if (existing) {
      await prisma.inauguralLecture.update({ where: { id: existing.id }, data });
    } else {
      await prisma.inauguralLecture.create({ data });
    }
  }
}

async function seedAnnouncements() {
  const count = await prisma.announcement.count();
  if (count > 0) return;
  await prisma.announcement.create({
    data: {
      title: "2026/2027 Admissions Now Open",
      content:
        "Applications for the 2026/2027 academic session are open. Visit the Admissions page to begin your application.",
      priority: 1,
      status: "published",
      publishedAt: new Date(),
    },
  });
}

async function seedPostgraduateProgrammes() {
  const count = await prisma.postgraduateProgramme.count();
  if (count > 0) return;
  for (const [index, programme] of POSTGRADUATE_PROGRAMMES.entries()) {
    await prisma.postgraduateProgramme.create({
      data: {
        name: programme.name,
        award: programme.award,
        faculty: programme.faculty,
        status: "published",
        sortOrder: index,
      },
    });
  }
}

async function seedPublications() {
  const count = await prisma.publication.count();
  if (count > 0) return;
  for (const [index, publication] of PUBLICATIONS.entries()) {
    await prisma.publication.create({
      data: {
        title: publication.title,
        authors: publication.authors,
        publicationType: publication.publicationType,
        venue: publication.venue || null,
        year: publication.year ?? null,
        volume: publication.volume || null,
        issue: publication.issue || null,
        pages: publication.pages || null,
        doi: publication.doi || null,
        url: publication.url || null,
        abstract: publication.abstract || null,
        faculty: publication.faculty || null,
        featured: publication.featured || false,
        status: "published",
        sortOrder: index,
      },
    });
  }
}

async function main() {
  console.log("Seeding database...");
  const admin = await seedRolesAndAdmin();
  await seedSettings();
  await seedFaculties();
  await seedPrincipalOfficers();
  await seedNewsAndEvents(admin.id);
  await seedLectures();
  await seedAnnouncements();
  await seedPostgraduateProgrammes();
  await seedPublications();
  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

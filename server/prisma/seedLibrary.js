const { PrismaClient } = require("@prisma/client");
const {
  LIBRARY_SETTINGS,
  LIBRARY_BRANCHES,
  LIBRARY_BOOKS,
  LIBRARY_E_RESOURCES,
  LIBRARY_SERVICES,
} = require("./library");

// Seeds the University Library content. Safe to re-run: every row is upserted by
// slug, and it only touches the `library` settings key, so it can be applied to
// an existing database without clobbering the rest of the site content.
async function seedLibrary(prisma) {
  await prisma.siteSetting.upsert({
    where: { key: "library" },
    update: { value: LIBRARY_SETTINGS },
    create: { key: "library", value: LIBRARY_SETTINGS },
  });

  const branchIdBySlug = {};
  for (const [index, branch] of LIBRARY_BRANCHES.entries()) {
    const data = { ...branch, sortOrder: index, status: "active" };
    const row = await prisma.libraryBranch.upsert({
      where: { slug: branch.slug },
      update: data,
      create: data,
    });
    branchIdBySlug[branch.slug] = row.id;
  }

  for (const [index, book] of LIBRARY_BOOKS.entries()) {
    const { branch, ...rest } = book;
    const data = {
      ...rest,
      branchId: branch ? branchIdBySlug[branch] || null : null,
      sortOrder: index,
      status: "published",
      publishedAt: new Date(),
    };
    await prisma.libraryBook.upsert({
      where: { slug: book.slug },
      update: data,
      create: data,
    });
  }

  for (const resource of LIBRARY_E_RESOURCES) {
    const data = { ...resource, status: "published" };
    await prisma.libraryEResource.upsert({
      where: { slug: resource.slug },
      update: data,
      create: data,
    });
  }

  for (const service of LIBRARY_SERVICES) {
    const data = { ...service, status: "published" };
    await prisma.libraryService.upsert({
      where: { slug: service.slug },
      update: data,
      create: data,
    });
  }
}

module.exports = { seedLibrary };

if (require.main === module) {
  const prisma = new PrismaClient();
  seedLibrary(prisma)
    .then(() => console.log("Library seed completed"))
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
}

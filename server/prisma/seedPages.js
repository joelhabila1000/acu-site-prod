// Loads the bundled page copy (src/data/sectionPages.json) into the Page table
// so every informational page can then be edited in the admin.
//
// Safe to re-run: it only creates pages that are not there yet, so copy edited
// in the admin is never overwritten.
//
//   npm run seed:pages
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const pages = require("../../src/data/sectionPages.json");

const prisma = new PrismaClient();

function rowFor(page) {
  const cta = page.cta || {};
  const attachment = page.attachment || {};
  return {
    title: page.title,
    crumb: page.crumb || null,
    lede: page.lede || null,
    sections: page.sections || [],
    facts: page.facts || [],
    links: page.links || [],
    calendar: page.calendar || null,
    ctaLabel: cta.label || null,
    ctaHref: cta.href || null,
    ctaExternal: Boolean(cta.external),
    attachmentUrl: attachment.url || null,
    attachmentName: attachment.name || null,
    attachmentSize: Number(attachment.size) || null,
    attachmentType: attachment.type || null,
    status: "published",
  };
}

async function main() {
  const entries = Object.entries(pages);
  let created = 0;

  for (const [path, page] of entries) {
    const existing = await prisma.page.findUnique({ where: { path } });
    if (existing) continue;
    await prisma.page.create({ data: { path, ...rowFor(page) } });
    created += 1;
  }

  console.log(
    `Pages seeded: ${created} created, ${entries.length - created} already present.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

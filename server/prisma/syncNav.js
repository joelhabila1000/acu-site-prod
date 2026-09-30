// Pushes just the `nav` and `portals` site settings from the seed source into
// the database — without re-seeding, which would overwrite every other setting
// (sustainability, homepage slides, contact details, …).
//
// The navbar is rendered from the database, so editing NAV_LINKS or PORTALS in
// seedContent.js is not enough on a database that already has content. Run this
// after such an edit:
//
//   npm run sync:nav
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const content = require("./seedContent");

const prisma = new PrismaClient();

async function main() {
  for (const key of ["nav", "portals"]) {
    const value = key === "nav" ? content.NAV_LINKS : content.PORTALS;
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  console.log(
    "Synced nav:",
    content.NAV_LINKS.map((item) => item.label).join(", "),
  );
  console.log(
    "Synced portals:",
    content.PORTALS.map((item) => item.label).join(", "),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

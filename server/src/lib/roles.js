// Privileged roles.
//
// Roles live in the database (seeded in prisma/seed.js), but the API authorises
// by role *name*, so every privileged role must appear in these lists as well.
// Anything not listed gets no access at all. Keeping the names and their
// descriptions in one place stops the seed and the auth layer drifting apart.

const EDITOR_ROLES = [
  "Super Admin",
  "Content Editor",
  "Academic Editor",
  "Admissions Editor",
];

const ADMIN_ROLES = ["Super Admin"];

const ROLE_DESCRIPTIONS = {
  "Super Admin": "Full access",
  "Content Editor": "Manage pages, news, events",
  "Academic Editor": "Manage faculties, departments, programmes, staff",
  "Admissions Editor": "Manage admissions content",
};

module.exports = { EDITOR_ROLES, ADMIN_ROLES, ROLE_DESCRIPTIONS };

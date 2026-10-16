// Public read visibility.
//
// The list and get routes are shared: the public site reads them without a
// token, and the admin reads the very same routes with one. An editor (any
// authenticated role the auth layer knows about) must see every status; an
// anonymous visitor must only ever see records that are live. `published` below
// is the value of the status column that means "live" for the resource — most
// resources use "published", a few use "active".

function isEditor(req) {
  return Boolean(req.user);
}

// Narrows a Prisma `where` for an anonymous reader. Editors keep the query as
// written; everyone else is pinned to the live status, so asking for
// `?status=draft` returns only published records rather than drafts.
function applyPublicListFilter(req, where, queryStatus, published = "published") {
  if (isEditor(req)) {
    if (queryStatus) where.status = queryStatus;
  } else {
    where.status = published;
  }
  return where;
}

// A single record is only readable by an anonymous visitor when it is live.
function isPubliclyVisible(req, item, published = "published") {
  return isEditor(req) || Boolean(item && item.status === published);
}

module.exports = { isEditor, applyPublicListFilter, isPubliclyVisible };

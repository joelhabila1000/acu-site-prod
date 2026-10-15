import { Link } from "react-router-dom";
import { libraryPath, availabilityLabel } from "../../data/library.js";

export default function BookCard({ book, base = "" }) {
  const badgeClass = `lib-badge lib-badge--${book.availability}`;
  return (
    <Link to={libraryPath(base, `/catalogue/${book.slug}`)} className="lib-book-card">
      <div className="lib-book-cover">
        {book.coverImage ? (
          <img src={book.coverImage} alt="" loading="lazy" />
        ) : (
          <span>{book.title}</span>
        )}
      </div>
      <div className="lib-book-body">
        <span className="lib-book-type">{book.resourceType}</span>
        <h3 className="lib-book-title">{book.title}</h3>
        <p className="lib-book-author">{book.authors}</p>
        <div className="lib-book-foot">
          <span className={badgeClass}>{availabilityLabel(book.availability)}</span>
          {book.branchName ? (
            <span style={{ fontSize: "0.78rem", color: "var(--lib-muted)" }}>
              {book.branchName}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

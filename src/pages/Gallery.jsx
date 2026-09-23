import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { useGallery } from "../data/cms.js";
import "./Gallery.css";

export default function Gallery() {
  const albums = useGallery();
  const [albumKey, setAlbumKey] = useState("all");
  const [lightbox, setLightbox] = useState(-1);

  const visibleAlbums = useMemo(
    () => albums.filter((album) => album.images.length > 0),
    [albums],
  );

  const photos = useMemo(() => {
    const source =
      albumKey === "all"
        ? visibleAlbums
        : visibleAlbums.filter((album) => (album.slug || album.name) === albumKey);
    return source.flatMap((album) =>
      album.images.map((image) => ({
        url: image.url,
        caption: image.caption,
        albumName: album.name,
      })),
    );
  }, [visibleAlbums, albumKey]);

  useEffect(() => {
    if (lightbox < 0) return;
    const onKey = (event) => {
      if (event.key === "Escape") setLightbox(-1);
      if (event.key === "ArrowRight") {
        setLightbox((index) => (index + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        setLightbox((index) => (index - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, photos.length]);

  const active = lightbox >= 0 ? photos[lightbox] : null;

  return (
    <>
      <PageHeader
        crumb="Gallery"
        title="Gallery"
        lede="Moments from around the Ajayi Crowther University campuses — academic life, ceremonies and everyday campus scenes."
      />

      <section className="section">
        <div className="container">
          {visibleAlbums.length > 1 && (
            <div className="gallery-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={albumKey === "all"}
                className={`gallery-tab ${albumKey === "all" ? "is-active" : ""}`}
                onClick={() => {
                  setAlbumKey("all");
                  setLightbox(-1);
                }}
              >
                All
              </button>
              {visibleAlbums.map((album) => {
                const key = album.slug || album.name;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={albumKey === key}
                    className={`gallery-tab ${albumKey === key ? "is-active" : ""}`}
                    onClick={() => {
                      setAlbumKey(key);
                      setLightbox(-1);
                    }}
                  >
                    {album.name}
                  </button>
                );
              })}
            </div>
          )}

          {photos.length > 0 ? (
            <div className="gallery-grid">
              {photos.map((photo, index) => (
                <button
                  key={`${photo.url}-${index}`}
                  type="button"
                  className="gallery-tile"
                  onClick={() => setLightbox(index)}
                  aria-label={photo.caption || `Open photo ${index + 1}`}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || ""}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                  {photo.caption && (
                    <span className="gallery-tile-caption">{photo.caption}</span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="gallery-empty">
              <p>No photos have been published yet.</p>
            </div>
          )}
        </div>
      </section>

      {active && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption || "Photo"}
          onClick={() => setLightbox(-1)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setLightbox(-1)}
            aria-label="Close"
          >
            ×
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-prev"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightbox((index) => (index - 1 + photos.length) % photos.length);
                }}
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-next"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightbox((index) => (index + 1) % photos.length);
                }}
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}
          <figure className="gallery-lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={active.url} alt={active.caption || ""} />
            {(active.caption || active.albumName) && (
              <figcaption>
                {active.caption}
                {active.caption && active.albumName ? " — " : ""}
                {active.albumName}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}

import { Link } from "react-router-dom";
import { useGallery } from "../data/cms.js";
import "./GallerySection.css";

const OFFSETS = ["left", "right", "left", "right", "left", "right"];
const ANGLES = ["-2deg", "2deg", "-3deg", "3deg", "-1deg", "1deg"];

export default function GallerySection() {
  const albums = useGallery();

  const photos = albums
    .flatMap((album) => album.images)
    .slice(0, 6)
    .map((image, index) => ({
      src: image.url,
      alt: image.caption || `Ajayi Crowther University campus photo ${index + 1}`,
      offset: OFFSETS[index % OFFSETS.length],
      angle: ANGLES[index % ANGLES.length],
    }));

  if (!photos.length) return null;

  return (
    <section className="section" aria-labelledby="gallery-heading">
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            Campus Life
          </p>
          <h2 id="gallery-heading">A Glimpse of ACU</h2>
        </div>

        <div className="gallery-collage" aria-label="University campus gallery">
          {photos.map((item, index) => (
            <figure
              key={`${item.src}-${index}`}
              className={`gallery-photo ${item.offset}`}
              style={{ "--tilt": item.angle }}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
            </figure>
          ))}
        </div>

        <div className="gallery-more">
          <Link className="btn btn-navy btn-sm" to="/gallery">
            View full gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

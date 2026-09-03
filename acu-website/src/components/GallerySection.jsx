import { IMAGES } from "../data/content.js";
import "./GallerySection.css";

const galleryItems = [
  {
    src: IMAGES.heroCampusOne,
    alt: "Campus life at Ajayi Crowther University",
    offset: "left",
    angle: "-2deg",
  },
  {
    src: IMAGES.heroCampusTwo,
    alt: "University facade and learning environment",
    offset: "right",
    angle: "2deg",
  },
  {
    src: IMAGES.heroCampusThree,
    alt: "Students and faculty at ACU",
    offset: "left",
    angle: "-3deg",
  },
  {
    src: IMAGES.heroCampusFour,
    alt: "Research and growth at ACU",
    offset: "right",
    angle: "3deg",
  },
  {
    src: IMAGES.aboutSecondary,
    alt: "Campus view and scenic grounds",
    offset: "left",
    angle: "-1deg",
  },
  {
    src: IMAGES.heroCampusFive,
    alt: "Student moments and campus atmosphere",
    offset: "right",
    angle: "1deg",
  },
];

export default function GallerySection() {
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
          {galleryItems.map((item, index) => (
            <figure
              key={`${item.alt}-${index}`}
              className={`gallery-photo ${item.offset}`}
              style={{ "--tilt": item.angle }}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

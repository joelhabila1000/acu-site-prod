import logoImg from "../assets/acu-logo-new-1.png";

export default function Preloader({ active = true }) {
  if (!active) return null;

  return (
    <div className="preloader-overlay" role="status" aria-live="polite" aria-busy="true">
      <div className="preloader-panel">
        <img
          src={logoImg}
          alt="Ajayi Crowther University logo"
          className="preloader-logo"
        />
        <p className="preloader-text">Ajayi Crowther University</p>
      </div>
    </div>
  );
}

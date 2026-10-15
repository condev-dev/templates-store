import Link from "next/link";
import "./index.css";

// Centred call-to-action banner. It deliberately reuses the site's own card recipe
// (--round-lg radius, 1px border, shadow-sm, rokh heading, btn-main button) so it
// reads as one more block of the page rather than a separate widget.
const Banner = ({
  title = "همه قالب ها در یک صفحه",
  description = "فهرست کامل قالب های تک صفحه ای Con Dev را یک جا ببینید؛ کازینو زنده، بازی انفجار، پیش بینی ورزشی و صفحه بایو، همراه با پیش نمایش زنده و فیلتر سریع.",
  buttonText = "مشاهده همه قالب ها",
  href = "/templates",
}) => {
  return (
    <section className="banner-main shadow-sm w-100">
      {/* Decoration only — the same blurred --bg-color glow the intro and the
          plan cards already use, plus a faint dot texture. Both stay static. */}
      <span className="banner-glow" aria-hidden="true" />
      <span className="banner-texture" aria-hidden="true" />

      <div className="banner-content">
        {/* h2 keeps the page's single h1 (the intro headline) intact. */}
        <h2 className="banner-title">{title}</h2>
        <p className="banner-description">{description}</p>

        <div className="banner-actions">
          <Link href={href} className="btn-main btn-color shadow-sm">
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;

import Link from "next/link";
import { GetAllTemplates } from "@/services/templates";
import "./index.css";

// Movieto-style hero: a tilted mosaic of real template previews fills the
// whole hero, a dark gradient from the copy side keeps the headline readable,
// and the mosaic fades into the page on all sides so there is no visible cut.
// Decoration only — the tiles are never clickable, because they drift.
const WALL_COLUMNS = 5;
const TILES_PER_COLUMN = 5;

// postimg hands a tiny thumbnail to any client that advertises webp support.
// ?dl=1 makes it serve the real file, exactly like CustomLoadingImage does.
const fullSize = (url) =>
  url.includes("postimg.cc") && !url.includes("dl=1")
    ? `${url}${url.includes("?") ? "&" : "?"}dl=1`
    : url;

const padColumn = (shots) => {
  if (!shots.length) return shots;
  const filled = [];
  while (filled.length < TILES_PER_COLUMN) filled.push(...shots);
  return filled.slice(0, TILES_PER_COLUMN);
};

const Intro = async () => {
  let templates = [];

  try {
    templates = await GetAllTemplates();
  } catch (error) {
    console.error("[intro] loading the templates failed:", error?.message);
  }

  const images = (templates || [])
    .map((template) => template?.image_card || template?.image)
    .filter(Boolean);

  const wanted = WALL_COLUMNS * TILES_PER_COLUMN;
  const step = Math.max(1, Math.floor(images.length / wanted) || 1);
  const picked = [];
  for (let i = 0; picked.length < wanted && i < images.length; i += 1) {
    const image = images[(i * step) % images.length];
    if (image && !picked.includes(image)) picked.push(image);
  }
  while (picked.length && picked.length < wanted) {
    picked.push(picked[picked.length % Math.max(picked.length, 1)]);
  }

  const columns = [];
  for (let index = 0; index < WALL_COLUMNS; index += 1) {
    const column = padColumn(
      picked.filter((_, tile) => tile % WALL_COLUMNS === index),
    );
    if (column.length) columns.push(column);
  }

  return (
    <section className="intro-main">
      {columns.length ? (
        <div className="intro-mosaic" aria-hidden="true">
          <div className="intro-mosaic-track">
            {columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={`intro-mosaic-col${
                  columnIndex % 2 ? " intro-mosaic-col-reverse" : ""
                }`}
              >
                {[0, 1].map((copy) => (
                  <div className="intro-mosaic-group" key={copy}>
                    {column.map((shot, tileIndex) => (
                      <span className="intro-shot" key={tileIndex}>
                        <img
                          src={fullSize(shot)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="intro-veil" aria-hidden="true" />

      <div className="intro-content">
        <h1 className="intro-title">
          قالب های آماده ی <span className="intro-title-accent">حرفه ای</span>
        </h1>

        <h2 className="intro-sub">
          اگر دنبال قالب هایی هستید که هم زیبا باشند، هم سریع و کاربردی، اینجا
          مجموعه ای انتخاب شده برای شما آماده شده است.
        </h2>

        <div className="intro-actions">
          <Link href={"/templates"} className="btn-main btn-color shadow-sm">
            مشاهده همه قالب ها
          </Link>

          <Link
            href={"/templates/filter/بازی"}
            className="btn-main btn-dark shadow-sm"
          >
            بازی ها
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Intro;

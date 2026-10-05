import { FiArrowLeft } from "react-icons/fi";
import "./index.css";
import Link from "next/link";
import { GetTemplateCountByFilter } from "@/services/templates";

// The numbers on these cards are read from the database, so they can never drift out of sync
// with the catalogue again (they were hardcoded as 80 / 30 / 50 / 5). If the read fails the card
// simply shows no number instead of taking the page down.
async function safeCount(filter) {
  try {
    return await GetTemplateCountByFilter(filter);
  } catch {
    return null;
  }
}

const Categories = async () => {
  const [faCount, trCount, bioCount, gameCount] = await Promise.all([
    safeCount("لندینگ فارسی"),
    safeCount("ترکی"),
    safeCount("بایو"),
    safeCount("بازی"),
  ]);

  return (
    <>
      <section
        id="categories"
        className="categories-container-lg-title d-flex justify-content-between align-items-center w-100 mt-5 pt-3"
      >
        <h3 className="mt-2">دسته بندی ها</h3>
      </section>
      <section className="w-100 categories-container-lg mt-4 pt-2 pt-lg-0 mt-lg-5">
        <div className="category-item d-flex p-3 p-lg-4 shadow-lg">
          <div className="d-flex flex-column w-50 align-items-start justify-content-center gap-2">
            <h5>
              قالب های <span className="mx-1">فارسی زبان</span>
            </h5>
            <div className="d-flex align-items-center w-100 flex-wrap">
              <small className=" ">{faCount}</small>
              <small className="  mx-2">|</small>
              <small className="  mx-2">FA</small>
            </div>
            <Link
              href={"/templates/filter/لندینگ فارسی"}
              className="btn-main btn-color mt-2 mt-lg-3"
            >
              مشاهده همه
              <FiArrowLeft size={18} className="me-2" />
            </Link>
          </div>

          <div className="w-50 h-100 category-image-1"></div>
        </div>
        {/*  */}
        <div className="category-item d-flex p-3 p-lg-4 shadow-lg">
          <div className="d-flex flex-column w-50 align-items-start justify-content-center gap-2">
            <h5>
              قالب های <span className="mx-1">ترکی زبان</span>
            </h5>
            <div className="d-flex align-items-center w-100 flex-wrap">
              <small className=" ">{trCount}</small>
              <small className="  mx-2">|</small>
              <small className="  mx-2">TR</small>
            </div>
            <Link
              href={"/templates/filter/ترکی"}
              className="btn-main btn-color  mt-2 mt-lg-3"
            >
              مشاهده همه
              <FiArrowLeft size={18} className="me-2" />
            </Link>
          </div>

          <div className="w-50 h-100 category-image-2"></div>
        </div>
        {/*  */}
        <div className="category-item d-flex p-3 p-lg-4 shadow-lg">
          <div className="d-flex flex-column w-50 align-items-start justify-content-center gap-2">
            <h5>
              قالب های <span className="mx-1">بایو</span>
            </h5>
            <div className="d-flex align-items-center w-100 flex-wrap">
              <small className=" ">{bioCount}</small>
              <small className="  mx-2">|</small>
              <small className="  mx-2"> BIO</small>
            </div>
            <Link
              href={"/templates/filter/بایو"}
              className="btn-main btn-color  mt-2 mt-lg-3"
            >
              مشاهده همه
              <FiArrowLeft size={18} className="me-2" />
            </Link>
          </div>

          <div className="w-50 h-100 category-image-3"></div>
        </div>
        {/*  */}
        <div className="category-item d-flex p-3 p-lg-4 shadow-lg">
          <div className="d-flex flex-column w-50 align-items-start justify-content-center gap-2">
            <h5>
              قالب های <span className="mx-1">بازی</span>
            </h5>
            <div className="d-flex align-items-center w-100 flex-wrap">
              <small className=" ">{gameCount}</small>
              <small className="  mx-2">|</small>
              <small className="  mx-2">GAME</small>
            </div>
            <Link
              href={"/templates/filter/بازی"}
              className="btn-main btn-color  mt-2 mt-lg-3"
            >
              مشاهده همه
              <FiArrowLeft size={18} className="me-2" />
            </Link>
          </div>

          <div className="w-50 h-100 category-image-4"></div>
        </div>
        {/*  */}
      </section>
    </>
  );
};

export default Categories;

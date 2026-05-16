import { FiArrowLeft } from "react-icons/fi";
import "./index.css";
import Link from "next/link";

const Categories = () => {
  return (
    <>
      <section id="categories" className="categories-container-lg-title d-flex justify-content-between align-items-center w-100 mt-5 pt-3">
        <h3 className="mt-2">دسته بندی ها</h3>
      </section>
      <section className="w-100 categories-container-lg mt-4 pt-2 pt-lg-0 mt-lg-5">
        <div className="category-item d-flex p-3 p-lg-4 shadow-lg">
          <div className="d-flex flex-column w-50 align-items-start justify-content-center gap-2">
            <h5>
              قالب های <span>فارسی زبان</span>
            </h5>
            <div className="d-flex align-items-center w-100 flex-wrap">
              <small className=" ">80 +</small>
              <small className="  mx-2">|</small>
              <small className="  mx-2">FA</small>
            </div>
            <Link
              href={"/templates/filter/فارسی"}
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
              قالب های <span>ترکی زبان</span>
            </h5>
            <div className="d-flex align-items-center w-100 flex-wrap">
              <small className=" ">30 +</small>
              <small className="  mx-2">|</small>
              <small className="  mx-2">FA</small>
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
              قالب های <span>تبلیغاتی</span>
            </h5>
            <div className="d-flex align-items-center w-100 flex-wrap">
              <small className=" ">50 +</small>
              <small className="  mx-2">|</small>
              <small className="  mx-2"> ADVERTISEMENT</small>
            </div>
            <Link
              href={"/templates/filter/تبلیغاتی"}
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
              قالب های <span>بازی</span>
            </h5>
            <div className="d-flex align-items-center w-100 flex-wrap">
              <small className=" ">8 +</small>
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

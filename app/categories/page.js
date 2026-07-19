import { FaAngleLeft } from "react-icons/fa";
import "./index.css";
import Link from "next/link";

const Categories = () => {
  return (
    <section className="d-flex flex-column w-100 mt-4 categories-container">
      <Link
        href="/templates/filter/لندینگ فارسی"
        className="btn-categories w-100 d-flex justify-content-between align-items-center shadow-lg"
      >
        <span> قالب های فارسی</span>
        <FaAngleLeft size={20} className="btn-categories-icon" />
      </Link>
      <Link
        href="/templates/filter/ترکی"
        className="btn-categories w-100 d-flex justify-content-between align-items-center shadow-lg mt-3"
      >
        <span> قالب های ترکی</span>
        <FaAngleLeft size={20} className="btn-categories-icon" />
      </Link>
      <Link
        href="/templates/filter/بایو"
        className="btn-categories w-100 d-flex justify-content-between align-items-center shadow-lg mt-3"
      >
        <span> قالب های بایو</span>
        <FaAngleLeft size={20} className="btn-categories-icon" />
      </Link>
    </section>
  );
};

export default Categories;

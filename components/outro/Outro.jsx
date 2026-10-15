import Link from "next/link";
import "./index.css";

const Outro = () => {
  return (
    <section className="outro-main">
      <h3 className="outro-title">
        همه ی قالب ها <span className="outro-title-accent">یک جا</span>
      </h3>

      <p className="outro-description">
        مجموعه ی کاملی از قالب های آماده را یک جا ببین؛ همه ی قالب ها دسته بندی
        شده، قابل جست و جو و آماده ی استفاده اند. کافیست دسته ی مورد نظرت را
        انتخاب کنی.
      </p>

      <Link href="/templates" className="btn-main btn-color shadow-sm outro-cta">
        مشاهده همه قالب ها
      </Link>
    </section>
  );
};

export default Outro;

import Link from "next/link";
import Template from "./Template";
import "./index.css";

const TemplateCategory = ({ title }) => {
  return (
    <section className=" w-100 d-flex flex-column mt-5">
      <section className="template-category-title d-flex justify-content-between align-items-center w-100">
        <h3 className="mt-2">{title}</h3>

        <Link href={"/templates/filter"}>
          <button className="btn-main btn-color">مشاهده همه</button>
        </Link>
      </section>

      <section className="template-container gap-4 mt-4 pt-1">
        <Template />
        <Template />
        <Template />
        <Template />
      </section>
    </section>
  );
};

export default TemplateCategory;

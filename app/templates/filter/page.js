import Template from "@/components/templates/Template";
import "./index.css";

const TemplateCategories = () => {
  return (
    <>
      {/* Title */}
      <section className="template-category-title d-flex justify-content-between align-items-center w-100 mt-5">
        <h3 className="mt-2">قالب های</h3>
      </section>
      {/* Templates */}
      <section className="template-container gap-4 mt-4 pt-1">
        <Template />
        <Template />
        <Template />
        <Template />
        <Template />
        <Template />
        <Template />
        <Template />
      </section>
      {/* Load More */}
      <section className="mt-5 d-flex align-items-center justify-content-center">
        <button className="btn-main btn-color">مشاهده بیشتر</button>
      </section>
    </>
  );
};

export default TemplateCategories;

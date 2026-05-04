import Link from "next/link";
import Template from "./TemplateItem";
//
import "./index.css";

const TemplateCategory = async ({ title, filterBy }) => {
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const ApiKey = process.env.NEXT_API_SECRET_KEY;

  const res = await fetch(`${BaseUrl}/api/templates`, {
    cache: "no-store",
    headers: {
      "api-key": ApiKey,
    },
  });

  const templates = res.ok ? await res.json() : [];

  return (
    <section className=" w-100 d-flex flex-column mt-4 mt-sm-5 pt-4">
      <section className="template-category-title d-flex justify-content-between align-items-center w-100">
        <h3 className="mt-2">{title}</h3>

        <div className="d-none d-sm-flex">
          <Link href={`/templates/filter/${filterBy}`}>
            <button className="btn-main btn-color">مشاهده همه</button>
          </Link>
        </div>
      </section>

      <section className="template-container gap-4 mt-4 mt-sm-5 pt-1">
        {templates?.slice(0, 4).map((template) => (
          <Template
            key={template.id}
            image={template.image}
            title={template.title}
            categories={template.categories}
            price={template.price}
            id={template.id}
          />
        ))}
      </section>
    </section>
  );
};

export default TemplateCategory;

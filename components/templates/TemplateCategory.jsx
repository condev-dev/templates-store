"use client";
import Link from "next/link";
import Template from "./Template";
import "./index.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const TemplateCategory = ({ title, filterBy }) => {
  const [templates, setTemplates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchTemplates = async () => {
    try {
      const res = await fetch(`${BaseUrl}/api/templates`, {
        cache: "no-store",
      });
      const data = await res.json();
      setTemplates(data);
    } catch (err) {
      toast.error("خط در بارگیری اطلاعات");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (isLoading) {
    return <h1>در حال لود</h1>;
  }

  if (!isLoading && !templates) {
    return <h1>هیچ موردی یافت نشد !</h1>;
  }

  return (
    <section className=" w-100 d-flex flex-column mt-5">
      <section className="template-category-title d-flex justify-content-between align-items-center w-100">
        <h3 className="mt-2">{title}</h3>

        <Link href={`/templates/filter/${filterBy}`}>
          <button className="btn-main btn-color">مشاهده همه</button>
        </Link>
      </section>

      <section className="template-container gap-4 mt-4 pt-1">
        {!isLoading &&
          templates
            ?.slice(0, 4)
            .map((template) => (
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

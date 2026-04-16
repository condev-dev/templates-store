"use client";

import Template from "@/components/templates/Template";
import "./index.css";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

const TemplateCategories = () => {
  const params = useParams();
  const filterBy = decodeURIComponent(params.filterBy);

  const [templates, setTemplates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchTemplates = async (filterBy) => {
    try {
      const res = await fetch(`${BaseUrl}/api/templates?filterBy=${filterBy}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("خط در بارگیری اطلاعات");
      }

      const data = await res.json();
      setTemplates(data);
    } catch (error) {
      console.error("خطا در fetchTemplates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates(filterBy);
  }, [filterBy]);

  if (isLoading) {
    return <h1>در حال لود</h1>;
  }

  if (!isLoading && !templates) {
    return <h1>هیچ موردی یافت نشد !</h1>;
  }

  return (
    <>
      <section className="template-category-title d-flex justify-content-between align-items-center w-100 mt-5">
        <h3 className="mt-2">قالب های {filterBy ? filterBy : ""}</h3>
      </section>
      <section className="template-container gap-4 mt-4 pt-1">
        {!isLoading && templates && templates.length > 0
          ? templates
              .slice(0, visibleCount)
              .map((template) => (
                <Template
                  key={template.id}
                  image={template.image}
                  title={template.title}
                  categories={template.categories}
                  price={template.price}
                  id={template.id}
                />
              ))
          : !isLoading && <h1>هیچ موردی یافت نشد !</h1>}
      </section>
      {templates && templates.length > visibleCount && (
        <section className="mt-5 d-flex align-items-center justify-content-center">
          <button
            className="btn-main btn-color"
            onClick={() => setVisibleCount(visibleCount + 4)}
          >
            مشاهده بیشتر
          </button>
        </section>
      )}
    </>
  );
};

export default TemplateCategories;

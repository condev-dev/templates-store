"use client";
import { useState } from "react";
import TemplateItem from "@/components/templates/TemplateItem";
//
import "./index.css";

export default function TemplateList({ templates }) {
  const [visibleCount, setVisibleCount] = useState(8);

  if (!templates?.length) return <div>هیچ قالب پرفروشی پیدا نشد.</div>;

  return (
    <>
      <section className="template-container gap-4 mt-4 pt-1">
        {templates.slice(0, visibleCount).map((template) => (
          <TemplateItem key={template.id} {...template} />
        ))}
      </section>

      {templates.length > visibleCount && (
        <section className="mt-5 d-flex justify-content-center">
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
}

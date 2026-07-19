"use client";
import { useState, use } from "react";
import TemplateItem from "@/components/templates/TemplateItem";
//
import "./index.css";
import Empty from "@/components/ui/empty/Empty";
import TemplateItemLoading from './../../../../components/templates/TemplateItemLoading';

export default function TemplateList({ templates: templatesProp }) {
  const [visibleCount, setVisibleCount] = useState(8);

  const isSkeleton = templatesProp === null;
  const templates = isSkeleton ? [] : use(templatesProp);

  if (!isSkeleton && !templates?.length) {
    return <Empty text={"هیچ قالبی در این دسته بندی یافت نشد"} />;
  }

  return (
    <>
      <section className="template-container gap-4 mt-4 pt-1 w-100" style={{ display: 'grid' }}>
        {isSkeleton
          ? Array(8)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-100" style={{ minWidth: "100%" }}>
                  <TemplateItemLoading />
                </div>
              ))
          : templates.slice(0, visibleCount).map((template) => (
              <TemplateItem key={template.id} {...template} />

            ))}
      </section>

      {!isSkeleton && templates.length > visibleCount && (
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

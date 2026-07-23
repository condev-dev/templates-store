import { Suspense } from "react";
import TemplateList from "./TemplateList";
//
import "./index.css";

async function fetchTemplates(filterBy) {
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const ApiKey = process.env.NEXT_API_SECRET_KEY;
  
  const res = await fetch(`${BaseUrl}/api/templates?filterBy=${filterBy}`, {
    cache: "no-store",
    headers: {
      "api-key": ApiKey,
    }
  });

  return res.ok ? await res.json() : [];
}

const TemplateCategories = async ({ params }) => {
  const { filterBy } = await params;
  const decode_filterBy = decodeURIComponent(filterBy);
  
  const templatesPromise = fetchTemplates(filterBy);

  return (
    <>
      <section className="template-category-title d-flex justify-content-between align-items-center w-100 mt-4 mt-sm-5">
        <h3 className="mt-2">
          قالب های {decode_filterBy ? decode_filterBy : ""}
        </h3>
      </section>
      <Suspense fallback={<TemplateList templates={null} />}>
        <TemplateList templates={templatesPromise} />
      </Suspense>
    </>
  );
};

export default TemplateCategories;

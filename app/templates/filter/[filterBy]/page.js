import { Suspense } from "react";
import TemplateList from "./TemplateList";
//
import "./index.css";

// Own title/description so these listing pages stop inheriting the home page's metadata.
// Deliberately NO canonical here: the URL holds a percent-encoded Persian category, and a
// canonical that does not byte-match the requested URL is worse than having none - without one
// the page is simply treated as self-canonical.
export async function generateMetadata({ params }) {
  const { filterBy } = await params;
  const label = decodeURIComponent(filterBy || "");
  return {
    title: `قالب های ${label} | Con Dev`,
    description: `خرید و دانلود قالب های تک صفحه ای ${label} با طراحی مدرن، سرعت بالا و کد کلین.`,
  };
}

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

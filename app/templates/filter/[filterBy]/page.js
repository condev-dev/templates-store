import TemplateList from "./TemplateList";
//
import "./index.css";

const TemplateCategories = async ({ params }) => {
  const { filterBy } = await params;
  const decode_filterBy = decodeURIComponent(filterBy);
  //
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const ApiKey = process.env.NEXT_API_SECRET_KEY;
  //
  const res = await fetch(`${BaseUrl}/api/templates?filterBy=${filterBy}`, {
    cache: "no-store",
        headers :{
      "api-key": ApiKey,
    }
  });

  const templates = res.ok ? await res.json() : [];

  return (
    <>
      <section className="template-category-title d-flex justify-content-between align-items-center w-100 mt-5">
        <h3 className="mt-2">
          قالب های {decode_filterBy ? decode_filterBy : ""}
        </h3>
      </section>
      <TemplateList templates={templates} />
    </>
  );
};

export default TemplateCategories;

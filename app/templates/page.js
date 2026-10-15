import { GetAllTemplates } from "@/services/templates";
import TemplateItem from "@/components/templates/TemplateItem";
import FaNumber from "@/components/common/FaNumber";
import "@/components/templates/index.css";

// One page that links to every template. Most template pages used to receive no internal link
// at all, which is one of the reasons Google kept them out of the index.
export const revalidate = 3600;

export const metadata = {
  title: "همه قالب ها | Con Dev",
  description:
    "فهرست کامل قالب های تک صفحه ای Con Dev برای سایت های کازینو، بازی، پیش بینی و بایو. همه قالب ها با کد کلین، سرعت بالا و کاملا ریسپانسیو.",
  alternates: {
    canonical: "https://www.condev.ir/templates",
  },
};

const Templates = async () => {
  // Read straight from the database instead of fetching our own /api/templates route: that route
  // needs the api-key plus an absolute URL, so any failure there would render an empty listing.
  // A database hiccup must not break the page, hence the guard.
  let templates = [];

  try {
    templates = await GetAllTemplates();
  } catch (error) {
    console.error("[/templates] loading the catalogue failed:", error?.message);
  }

  return (
    <>
      <section className="w-100 d-flex flex-column mt-4 mt-sm-5 pt-4">
        <h1 className="h3 mt-2">
همه قالب ها        </h1>
        <p className="mt-3">
          در این صفحه فهرست کامل قالب های تک صفحه ای را می بینید. هر قالب
          برای یک کاربرد مشخص طراحی شده است: کازینو زنده، بازی انفجار، پیش بینی
          ورزشی، گردونه شانس و صفحه بایو.
        </p>
      </section>

      <section className="template-container gap-4 mt-2 mt-sm-5 pt-1 w-100">
        {templates.map((template) => (
          <TemplateItem
            key={template.id}
            image={template.image_card || template.image}
            title={template.title}
            categories={template.categories}
            price={template.price}
            id={template.id}
            demo_url={template.demo_url}
          />
        ))}
      </section>
    </>
  );
};

export default Templates;

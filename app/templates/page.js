import Link from "next/link";
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

// The four categories the rest of the site groups by. `value` is the exact
// string stored on the template, `label` is what the button shows.
const CATEGORIES = [
  { label: "لندینگ فارسی", value: "لندینگ فارسی" },
  { label: "لندینگ ترکی", value: "ترکی" },
  { label: "لندینگ بایو", value: "بایو" },
  { label: "بازی ها", value: "بازی" },
];

const Templates = async ({ searchParams }) => {
  const { category } = await searchParams;
  const active = typeof category === "string" ? category : "";

  // Read straight from the database instead of fetching our own /api/templates route: that route
  // needs the api-key plus an absolute URL, so any failure there would render an empty listing.
  // A database hiccup must not break the page, hence the guard.
  let templates = [];

  try {
    templates = await GetAllTemplates();
  } catch (error) {
    console.error("[/templates] loading the catalogue failed:", error?.message);
  }

  // Filtering runs on the list that is already loaded, so switching a category is
  // just a link: no extra request, no client state.
  const list = active
    ? templates.filter((template) => template?.categories?.includes(active))
    : templates;

  return (
    <>
      <section className="templates-head w-100 mt-4 mt-sm-5 ">
        <h1 className="templates-head-title">همه قالب ها</h1>
        <p className="templates-head-sub">
          در این صفحه فهرست کامل قالب های تک صفحه ای را می بینید. هر قالب
          برای یک کاربرد مشخص طراحی شده است: کازینو زنده، بازی انفجار، پیش بینی
          ورزشی، گردونه شانس و صفحه بایو.
        </p>
      </section>

      <section className="templates-filters w-100 mt-4">
        <Link
          href="/templates"
          className={`btn-main ${active ? "btn-light" : "btn-color"}`}
        >
          همه قالب ها
        </Link>

        {CATEGORIES.map((item) => (
          <Link
            key={item.value}
            href={`/templates?category=${encodeURIComponent(item.value)}`}
            className={`btn-main ${
              active === item.value ? "btn-color" : "btn-light"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </section>

      <section className="template-container gap-4 mt-2 mt-sm-5 pt-1 w-100">
        {list.map((template) => (
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

import { getDb } from "@/lib/getDb";
import { unstable_cache } from "next/cache";

export const GetAllTemplates = unstable_cache(
  async () => {
    const db = await getDb();
    const templates = await db.collection("templates").find({}).toArray();
    return JSON.parse(JSON.stringify(templates));
  },
  ["all-templates"],
  { revalidate: 3600, tags: ["templates"] },
);

export async function GetTemplatesByFilter(filterBy) {
  const templates = await GetAllTemplates();

  const filtered = templates?.filter((template) =>
    template?.categories?.some((category) => category === filterBy),
  );
  return filtered || [];
}

export async function GetTemplateById(templateId) {
  // Look the template up directly instead of searching the cached full list:
  //   * String() on both sides removes any string/number mismatch, which is what makes every
  //     single-template page fall through to the "not found" branch;
  //   * it no longer depends on the unstable_cache snapshot.
  // The shape is unchanged: an object, or [] when there is no such template, because the page
  // reads data?.title / data?.id / data?.image (a single object, not an array).
  const db = await getDb();
  const template = await db.collection("templates").findOne({ id: String(templateId) });
  return template ? JSON.parse(JSON.stringify(template)) : [];
}

// Number of templates in a category. Used by the home page category cards, which used to show
// hardcoded numbers (80 / 30 / 50) that no longer matched the catalogue.
export async function GetTemplateCountByFilter(filterBy) {
  const db = await getDb();
  return db.collection("templates").countDocuments({ categories: filterBy });
}
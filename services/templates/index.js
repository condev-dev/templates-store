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
  const templates = await GetAllTemplates();

  const filtered = templates?.find((template) => template.id === templateId);
  return filtered || [];
}
import { getDb } from "@/lib/getDb";

export async function GetTemplatesByFilter(filterBy) {
  const db = await getDb();
  const templates = await db.collection("templates").find({}).toArray();

  const filtered = templates?.filter((template) =>
    template?.categories?.some((category) => category === filterBy),
  );
  if (filtered) {
    return filtered;
  } else {
    return [];
  }
}

export async function GetTemplateById(templateId) {
  const db = await getDb();
  const templates = await db.collection("templates").find({}).toArray();

  const filtered = templates?.find((template) => template.id === templateId);
  if (filtered) {
    return filtered;
  } else {
    return [];
  }
}

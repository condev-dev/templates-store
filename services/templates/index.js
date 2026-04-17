import { readData } from "@/utils/api";

export async function GetTemplatesByFilter(filterBy) {
  const templates = await readData("templates");

  const filtered = templates?.filter((template) =>
    template?.categories?.some((category) => category === filterBy),
  );
  if (filtered) {
    return filtered;
  } else {
    return [];
  }
}

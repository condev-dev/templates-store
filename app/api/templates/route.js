import { readData, writeData } from "@/utils/api";

// GET
export async function GET(request) {
  const templates = await readData("templates");
  const { searchParams } = new URL(request.url);

  // By Id
  const id = searchParams.get("id");
  if (id) {
    const template = templates.find((p) => p.id === id);
    if (template) {
      return new Response(JSON.stringify(template), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // By Filter
  const filterBy = searchParams.get("filterBy");
  if (filterBy) {
    const filtered = templates?.filter((template) =>
      template?.categories?.some((category) => category === filterBy),
    );
    if (filtered) {
      return new Response(JSON.stringify(filtered), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // Get All
  return new Response(JSON.stringify(templates), {
    headers: { "Content-Type": "application/json" },
  });
}

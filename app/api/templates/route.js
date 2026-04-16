import { readData, writeData } from "@/utils/api";

// GET
export async function GET(request) {
  const products = await readData("templates");
  const { searchParams } = new URL(request.url);

  // By Id
  const id = searchParams.get("id");
  if (id) {
    const product = products.find((p) => p.id === id);
    if (product) {
      return new Response(JSON.stringify(product), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // By Filter
  const filterBy = searchParams.get("filterBy");
  if (filterBy) {
    const filtered = products?.filter((product) =>
      product?.categories?.some((category) => category === filterBy),
    );
    if (filtered) {
      return new Response(JSON.stringify(filtered), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // Get All
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

import BestSellers_c from "./BestSellers_c";

export default async function BestSellers_s() {
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const ApiKey = process.env.NEXT_API_SECRET_KEY;

  const res = await fetch(`${BaseUrl}/api/templates`, {
    cache: "no-store",
    headers: {
      "api-key": ApiKey,
    },
  });

  const templates = res.ok ? await res.json() : [];

  const topSellers = templates
    .sort((a, b) => Number(b.sell_count) - Number(a.sell_count))
    .slice(0, 8);

  return <BestSellers_c templates={topSellers} />;
}

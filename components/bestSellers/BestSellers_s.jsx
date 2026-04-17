import BestSellers_c from "./BestSellers_c";

export default async function BestSellers_s() {
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Now Get All Templates
  const res = await fetch(`${BaseUrl}/api/templates`, {
    cache: "no-store",
  });

  const templates = res.ok ? await res.json() : [];

  return <BestSellers_c templates={templates} />;
}

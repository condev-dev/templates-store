import { Suspense } from "react";
import BestSellers_c from "./BestSellers_c";

async function fetchTemplates() {
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const ApiKey = process.env.NEXT_API_SECRET_KEY;

  const res = await fetch(`${BaseUrl}/api/templates`, {
    cache: "no-store",
    headers: {
      "api-key": ApiKey,
    },
  });

  const templates = res.ok ? await res.json() : [];

  return templates
    .sort((a, b) => Number(b.sell_count) - Number(a.sell_count))
    .slice(0, 8);
}

export default function BestSellers_s() {
  const templatesPromise = fetchTemplates();

  return (
    <Suspense fallback={<BestSellers_c templates={null} />}>
      <BestSellers_c templates={templatesPromise} />
    </Suspense>
  );
}

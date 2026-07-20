import { GetTemplateById, GetTemplatesByFilter } from "@/services/templates";
import { getDb } from "@/lib/getDb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const resApiKey = request.headers.get("api-key");
  const expectedApiKey = process.env.NEXT_API_SECRET_KEY;

  if (!resApiKey || resApiKey !== expectedApiKey) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  const { searchParams } = new URL(request.url);
  const filterBy = searchParams.get("filterBy");
  const templateId = searchParams.get("templateId");

  // Get By Filter
  if (filterBy) {
    const filtered = await GetTemplatesByFilter(filterBy);
    return NextResponse.json(filtered);
  }

  // Get By Id
  if (templateId) {
    const filtered = await GetTemplateById(templateId);
    return NextResponse.json(filtered);
  }

  const db = await getDb();
  const templates = await db.collection("templates").find({}).toArray();
  return NextResponse.json(templates);
}

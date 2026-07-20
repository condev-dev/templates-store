import { getDb } from "@/lib/getDb";
import { GetTemplateById, GetTemplatesByFilter } from "@/services/templates";
import { NextResponse } from "next/server";

export async function GET(request) {
  const resApiKey = request.headers.get("api-key");
  const expectedApiKey = process.env.NEXT_API_SECRET_KEY;

  if (!resApiKey || resApiKey !== expectedApiKey) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } // Check If User Write Link Like : /api/templates - redirect to not-found and don't return any data

  const db = await getDb();
  const templates = await db.collection("templates").find({}).toArray();

  const { searchParams } = new URL(request.url);
  const filterBy = searchParams.get("filterBy");
  const templateId = searchParams.get("templateId");

  // Get By Filter
  if (filterBy) {
    const filtered = await GetTemplatesByFilter(filterBy);
    if (filtered) return NextResponse.json(filtered);
  }

  // Get By Id
  if (templateId) {
    const filtered = await GetTemplateById(templateId);
    if (filtered) return NextResponse.json(filtered);
  }

  // Get All
  return NextResponse.json(templates);
}

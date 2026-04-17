import { GetTemplatesByFilter } from "@/services/templates";
import { readData } from "@/utils/api";
import { NextResponse } from "next/server";

export async function GET(request) {
  const templates = await readData("templates");
  const { searchParams } = new URL(request.url);
  const filterBy = searchParams.get("filterBy");

  // Get By Filter
  if (filterBy) {
    const filtered = await GetTemplatesByFilter(filterBy);
    if (filtered) return NextResponse.json(filtered);
  }

  // Get All
  return NextResponse.json(templates);
}

import { GetPurchasesById } from "@/services/purchases";
import { NextResponse } from "next/server";

export async function GET(request) {
  const resApiKey = request.headers.get("api-key");
  const expectedApiKey = process.env.NEXT_API_SECRET_KEY;

  if (!resApiKey || resApiKey !== expectedApiKey) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } // Check If User Write Link Like : /api/templates - redirect to not-found and don't return any data

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (userId) {
    const userPurchases = await GetPurchasesById(userId);
    return NextResponse.json(userPurchases);
  }

  return NextResponse.json([]);
}

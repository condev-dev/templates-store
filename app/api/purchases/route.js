import { GetPurchasesById } from "@/services/purchases";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (userId) {
    const userPurchases = await GetPurchasesById(userId);
    return NextResponse.json(userPurchases);
  }

  return NextResponse.json([]);
}

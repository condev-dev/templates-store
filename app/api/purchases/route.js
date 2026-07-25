import { getDb } from "@/lib/getDb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const resApiKey = request.headers.get("api-key");
  const expectedApiKey = process.env.NEXT_API_SECRET_KEY;

  if (!resApiKey || resApiKey !== expectedApiKey) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId الزامی است" }, { status: 400 });
  }

  const db = await getDb();

  const purchaseDoc = await db
    .collection("purchases")
    .findOne({ user_id: userId });

  const templateIds = purchaseDoc?.templates || [];

  if (templateIds.length === 0) {
    return NextResponse.json([]);
  }

  const templates = await db
    .collection("templates")
    .find({ id: { $in: templateIds } })
    .toArray();

  return NextResponse.json(templates);
}
import { getDb } from "@/lib/getDb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ exists: false });
  }

  const db = await getDb();
  const user = await db.collection("users").findOne({ email });

  return NextResponse.json({ exists: !!user });
}
import { getDb } from "@/lib/getDb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { authority } = await request.json();

  const db = await getDb();

  const pending = await db
    .collection("pendingPayments")
    .findOne({ authority });

  if (!pending) {
    return NextResponse.json({ success: false });
  }

  const res = await fetch(
    `${process.env.ZARINPAL_BASE_URL}/pg/v4/payment/verify.json`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        amount: pending.amount * 10, 
        authority: authority,
      }),
    },
  );

  const data = await res.json();

  if (data.data && data.data.code === 100) {
    await db.collection("purchases").updateOne(
      { user_id: pending.userId },
      { $addToSet: { templates: { $each: pending.templateIds } } },
      { upsert: true },
    );

    await db.collection("carts").updateOne(
      { user_id: pending.userId },
      { $set: { carts: [] } },
    );

    await db.collection("pendingPayments").deleteOne({ authority });

    return NextResponse.json({ success: true, ref_id: data.data.ref_id });
  }

  await db.collection("pendingPayments").deleteOne({ authority });

  return NextResponse.json({ success: false });
}
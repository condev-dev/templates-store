import { getDb } from "@/lib/getDb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { amount, description, userId } = await request.json();

  if (!userId || !amount) {
    return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
  }

  const db = await getDb();

  const cartDoc = await db.collection("carts").findOne({ user_id: userId });
  const templateIds = (cartDoc?.carts || []).map((item) =>
    typeof item === "string" ? item : item.templateId,
  );

  const res = await fetch(
    `${process.env.ZARINPAL_BASE_URL}/pg/v4/payment/request.json`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        amount: amount * 10, 
        description: description,
        callback_url: `${process.env.NEXT_PUBLIC_API_URL}/payment/callback`,
      }),
    },
  );

  const data = await res.json();

  if (data.data && data.data.code === 100) {
    await db.collection("pendingPayments").insertOne({
      authority: data.data.authority,
      amount: amount, 
      userId: userId,
      templateIds: templateIds,
      createdAt: new Date(),
    });

    return NextResponse.json({
      url: `${process.env.ZARINPAL_BASE_URL}/pg/StartPay/${data.data.authority}`,
    });
  }

  return NextResponse.json(
    { error: "خطا در ایجاد درخواست پرداخت" },
    { status: 400 },
  );
}
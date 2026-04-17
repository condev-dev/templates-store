import {
  AddCart,
  AddTemplate,
  GetUserCart,
  RemoveTemplate,
} from "@/services/cart";
import { NextResponse } from "next/server";

// // GET
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (userId) {
    const userCartTemplates = await GetUserCart(userId);
    //
    return NextResponse.json(userCartTemplates);
  } else {
    return NextResponse.json(
      { message: "خطا در ساخت سبد خرید." },
      { status: 500 },
    );
  }
}

// POST
export async function POST(request) {
  try {
    const body = await request.json();

    const newCart = await AddCart(body.userId);

    return NextResponse.json(newCart, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ساخت سبد خرید." },
      { status: 500 },
    );
  }
}

// // PUT
export async function PUT(request) {
  try {
    const body = await request.json();
    await AddTemplate(body);

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ساخت سبد خرید." },
      { status: 500 },
    );
  }
}

// // DELETE
export async function DELETE(request) {
  try {
    const body = await request.json();
    await RemoveTemplate(body);

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ساخت سبد خرید." },
      { status: 500 },
    );
  }
}

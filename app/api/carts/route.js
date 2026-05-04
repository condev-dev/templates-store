import {
  AddCart,
  AddTemplate,
  GetUserCart,
  RemoveTemplate,
} from "@/services/cart";
import { NextResponse } from "next/server";

// // GET
export async function GET(request) {

  // ----------------------------------------------------------------- Check Api Key - If Was Like backend then return data
  // get public of front - show in client too
  const res_ApiKey = request.headers.get("api-key");
  // get secret api from env - just backend not show anywhere
  const ApiKey = process.env.NEXT_API_SECRET_KEY;

  // add res with secret api
  const Secret_Public_ApiKey = ApiKey + res_ApiKey;
  // so here have public in static here
  const Secret_ApiKey = process.env.NEXT_API_SECRET_KEY + "SGVsbGeVjCEg8";

  // Check If User Write Link Like : /api/templates - redirect to not-found and don't return any data
  if (!Secret_Public_ApiKey || Secret_Public_ApiKey !== Secret_ApiKey) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
  // -----------------------------------------------------------------

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (userId) {
    const userCartTemplates = await GetUserCart(userId);
    //
    return NextResponse.json(userCartTemplates);
  } else {
    return NextResponse.json(
      { message: "خطا در دریافت سبد خرید." },
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

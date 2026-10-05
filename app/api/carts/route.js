import {
  AddCart,
  AddTemplate,
  GetUserCart,
  RemoveTemplate,
} from "@/services/cart";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Every method below acts on the SIGNED-IN user's cart only.
// The session is the authority: a userId sent by the caller is ignored, so nobody can read or
// modify someone else's cart. This is the same getServerSession pattern already used by
// app/purchases/page.js, so it stays consistent with the rest of the app.
//
// It replaces the old api-key check, which compared against NEXT_PUBLIC_API_SECRET_KEY - a value
// that is shipped to the browser, so it never actually protected anything.
async function currentUserId() {
  const session = await getServerSession(authOptions);
  return session?.user?.id || null;
}

const NOT_SIGNED_IN = { message: "لطفا وارد حساب خود شوید." };

// GET
export async function GET() {
  const userId = await currentUserId();

  if (!userId) {
    return NextResponse.json(NOT_SIGNED_IN, { status: 401 });
  }

  const userCartTemplates = await GetUserCart(userId);

  return NextResponse.json(userCartTemplates);
}

// POST
// Called by the sign-up form to open a new user's cart, and that happens BEFORE the user signs
// in - so this one cannot require a session. It is harmless anyway: AddCart now returns the
// existing cart instead of inserting a second one, so calling it gains nothing.
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body?.userId) {
      return NextResponse.json(
        { message: "کاربر مشخص نشده است." },
        { status: 400 },
      );
    }

    const newCart = await AddCart(body.userId);

    return NextResponse.json(newCart, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ساخت سبد خرید." },
      { status: 500 },
    );
  }
}

// PUT
export async function PUT(request) {
  const userId = await currentUserId();

  if (!userId) {
    return NextResponse.json(NOT_SIGNED_IN, { status: 401 });
  }

  try {
    const body = await request.json();
    // userId comes from the session, never from the request body
    const result = await AddTemplate({ ...body, userId });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "سبد خریدی برای این کاربر پیدا نشد." },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "قالب اضافه شد." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ساخت سبد خرید." },
      { status: 500 },
    );
  }
}

// DELETE
export async function DELETE(request) {
  const userId = await currentUserId();

  if (!userId) {
    return NextResponse.json(NOT_SIGNED_IN, { status: 401 });
  }

  try {
    const body = await request.json();
    // userId comes from the session, never from the request body
    await RemoveTemplate({ ...body, userId });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ساخت سبد خرید." },
      { status: 500 },
    );
  }
}

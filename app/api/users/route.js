import { AddUser } from "@/services/users";
import { readData, writeData } from "@/utils/api";
import { NextResponse } from "next/server";

// GET
export async function GET(request) {
  const resApiKey = request.headers.get("api-key");
  const expectedApiKey = process.env.NEXT_API_SECRET_KEY;

  // Check If User Write Link Like : /api/templates - redirect to not-found and don't return any data
  if (!resApiKey || resApiKey !== expectedApiKey) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  const users = await readData("users");
  return NextResponse.json(users);
}

// POST
export async function POST(request) {
  try {
    const users = await readData("users");
    const body = await request.json();

    // Check Email
    if (users?.find((user) => user.email === body?.email)) {
      return Response.json(
        { message: "این ایمیل موجود می باشد." },
        { status: 400 },
      );
    }

    // ‍Add User
    const newUser = await AddUser(body);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ساخت کاربر جدید." },
      { status: 500 },
    );
  }
}

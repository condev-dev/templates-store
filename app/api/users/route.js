import { getDb } from "@/lib/getDb";
import {
  AddUser,
  DeleteUser,
  EditEmail,
  EditFullName,
  EditPassword,
  EditUserName,
} from "@/services/users";
import { NextResponse } from "next/server";

// GET
export async function GET(request) {
  const resApiKey = request.headers.get("api-key");
  const expectedApiKey = process.env.NEXT_API_SECRET_KEY;

  if (!resApiKey || resApiKey !== expectedApiKey) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  try {
    const db = await getDb();
    const users = await db
      .collection("users")
      .find({}, { projection: { password: 0 } })
      .toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات کاربران" },
      { status: 500 },
    );
  }
}

// POST
export async function POST(request) {
  try {
    const db = await getDb();
    const body = await request.json();

    // Check Email Already Exists
    const existingUser = await db
      .collection("users")
      .findOne({ email: body?.email });

    if (existingUser) {
      return NextResponse.json(
        { message: "این ایمیل موجود می باشد." },
        { status: 400 },
      );
    }

    // add user
    const newUser = await AddUser(body);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "خطا در ساخت کاربر جدید." },
      { status: 500 },
    );
  }
}

// PUT
export async function PUT(request) {
  try {
    const db = await getDb();
    const body = await request.json();

    let hasChanges = false;

    // For FullName
    if (body.fullname !== undefined) {
      await EditFullName(body);
      hasChanges = true;
    }

    // For UserName
    if (body.username !== undefined) {
      await EditUserName(body);
      hasChanges = true;
    }

    // For Email
    if (body.email !== undefined) {
      // Check Email Already Exists
      const emailExists = await db.collection("users").findOne({
        email: body.email,
        id: { $ne: body.userId },
      });

      if (emailExists) {
        return NextResponse.json(
          { message: "این ایمیل موجود می باشد." },
          { status: 409 },
        );
      }

      // Edit Email
      await EditEmail(body);
      hasChanges = true;
    }

    // For Password
    if (body.password !== undefined) {
      await EditPassword(body);
      hasChanges = true;
    }

    // If Was Any Change Here Change It.
    if (hasChanges) {
      return NextResponse.json(
        { message: "پروفایل با موفقیت آپدیت شد." },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "لطفا یک مورد رو تغییر دهید!" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "ادیت با مشکل روبرو شد!" },
      { status: 500 },
    );
  }
}

// DELETE
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { userId } = body;

    const result = await DeleteUser(userId);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "کاربری با این مشخصات پیدا نشد." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "حساب کاربری شما با موفقیت حذف شد." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "خطا در حذف حساب کاربری!" },
      { status: 500 },
    );
  }
}

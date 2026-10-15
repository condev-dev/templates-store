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
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Every method below acts on the SIGNED-IN user's own account. The session is the authority and a
// userId sent by the caller is ignored - trusting it let anyone edit or delete anybody's account.
const NOT_SIGNED_IN = { message: "لطفا وارد حساب خود شوید." };

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
  // --------- Check Session - the id comes from the session, never from the body
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(NOT_SIGNED_IN, { status: 401 });
  }
  // -----------------------------------------------------------------

  try {
    const db = await getDb();
    const body = await request.json();

    // Whatever userId the caller sent is discarded.
    const data = { ...body, userId };

    let hasChanges = false;

    // For FullName
    if (body.fullname !== undefined) {
      await EditFullName(data);
      hasChanges = true;
    }

    // For UserName
    if (body.username !== undefined) {
      await EditUserName(data);
      hasChanges = true;
    }

    // For Email
    if (body.email !== undefined) {
      // Check Email Already Exists
      const emailExists = await db.collection("users").findOne({
        email: body.email,
        id: { $ne: userId },
      });

      if (emailExists) {
        return NextResponse.json(
          { message: "این ایمیل موجود می باشد." },
          { status: 409 },
        );
      }

      // Edit Email
      await EditEmail(data);
      hasChanges = true;
    }

    // For Password
    if (body.password !== undefined) {
      await EditPassword(data);
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
export async function DELETE() {
  // --------- Check Session - a user can only delete their own account
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(NOT_SIGNED_IN, { status: 401 });
  }
  // -----------------------------------------------------------------

  try {
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

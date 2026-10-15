import { ConsumeResetToken } from "@/services/resetTokens";
import { EditPassword } from "@/services/users";
import { NextResponse } from "next/server";

const INVALID_LINK = {
  message: "این لینک منقضی شده یا قبلا استفاده شده است. لطفا دوباره درخواست کنید.",
};

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    // The token is the ONLY authority here. The previous version trusted an email address sent by
    // the browser, which meant anyone who knew a user's email could set a new password on their
    // account. Nothing about the account is taken from the request any more.
    if (!token || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { message: "لینک نامعتبر است یا رمز عبور کوتاه است." },
        { status: 400 },
      );
    }

    const record = await ConsumeResetToken(token);

    if (!record) {
      return NextResponse.json(INVALID_LINK, { status: 400 });
    }

    await EditPassword({ userId: record.userId, password });

    return NextResponse.json({ message: "رمز عبور تغییر کرد." });
  } catch (error) {
    console.error("Error resetting the password:", error);
    return NextResponse.json(
      { message: "خطا در تغییر رمز عبور." },
      { status: 500 },
    );
  }
}

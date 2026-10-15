import { getDb } from "@/lib/getDb";
import { CreateResetToken } from "@/services/resetTokens";
import { sendEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";

// The same answer goes out whether or not the address exists. Anything else turns this endpoint
// into an oracle that tells the caller which emails are registered on the site.
const GENERIC_MESSAGE = {
  message: "اگر این ایمیل در سایت ثبت شده باشد، لینک بازیابی برایتان ارسال شد.",
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function POST(request) {
  try {
    const { email } = await request.json();
    const address = typeof email === "string" ? email.trim() : "";

    if (!address) {
      return NextResponse.json(
        { message: "لطفا ایمیل را وارد کنید." },
        { status: 400 },
      );
    }

    // A missing mail key is a configuration problem, not a user problem, and reporting it here -
    // before any database lookup - keeps the answer identical for every address.
    if (!process.env.RESEND_API_KEY) {
      console.error("forgot-password: RESEND_API_KEY is not set");
      return NextResponse.json(
        { message: "سرویس ارسال ایمیل در حال حاضر فعال نیست. لطفا بعدا تلاش کنید." },
        { status: 503 },
      );
    }

    const db = await getDb();

    // Case-insensitive so a user who signed up as Name@Example.com still gets their link.
    const user = await db.collection("users").findOne({
      email: { $regex: `^${escapeRegex(address)}$`, $options: "i" },
    });

    if (!user) {
      return NextResponse.json(GENERIC_MESSAGE);
    }

    const { token, rateLimited } = await CreateResetToken(user.id);

    if (rateLimited) {
      return NextResponse.json(GENERIC_MESSAGE);
    }

    const resetUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password?token=${token}`;

    await sendEmail({
      to: user.email,
      subject: "بازیابی رمز عبور | Con Dev",
      html: `
        <div style="font-family: Tahoma, Arial, sans-serif; direction: rtl; text-align: right; line-height: 1.9; color: #222;">
          <p>سلام${user.fullname ? ` ${user.fullname}` : ""}،</p>
          <p>برای تغییر رمز عبور روی لینک زیر بزنید. این لینک تا ۱۵ دقیقه اعتبار دارد و فقط یک بار قابل استفاده است.</p>
          <p style="margin: 24px 0;">
            <a href="${resetUrl}" style="background: #6d5cff; color: #fff; padding: 12px 22px; border-radius: 8px; text-decoration: none;">
              تغییر رمز عبور
            </a>
          </p>
          <p>اگر شما این درخواست را نداده اید، این ایمیل را نادیده بگیرید؛ رمز عبور شما تغییری نمی کند.</p>
          <p style="color: #888; font-size: 13px;">Con Dev</p>
        </div>
      `,
    });

    return NextResponse.json(GENERIC_MESSAGE);
  } catch (error) {
    console.error("Error in forgot-password:", error);
    // A provider failure must not reveal whether the address exists either.
    return NextResponse.json(GENERIC_MESSAGE);
  }
}

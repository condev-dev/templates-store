import { getDb } from "@/lib/getDb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);


    const db = await getDb();
    const result = await db.collection("users").updateOne(
        { email },
        { $set: {password: hashedPassword } },
    );

    if (result.matchedCount === 0) {
        return NextResponse.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "رمز عبور تغییر کرد" });
}
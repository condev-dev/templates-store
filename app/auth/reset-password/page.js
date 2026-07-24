"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "../index.css";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const OnReset = async () => {
    // ------- Checks
    // Check if any field is empty
    if (!newPassword || !repeatPassword) {
      toast.error("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    // Check if the new password is at least 6 characters long
    if (newPassword.length < 6) {
      toast.error("رمز عبور جدید باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    // Check if the new password matches the repeat password
    if (newPassword !== repeatPassword) {
      toast.error("رمز عبور جدید با تکرار آن مطابقت ندارد!");
      return;
    }

    const res = await fetch(`${BaseUrl}/api/users/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: newPassword }),
    });

    if (res.ok) {
      toast.success("رمز عبور با موفقیت تغییر کرد.");
      router.push("/auth/signin");
    } else {
      toast.error("مشکلی پیش آمد.");
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center auth-container">
      <section className="d-flex justify-content-center align-items-center flex-column gap-3 auth-box p-5 shadow-sm">
        <h2 className="auth-title">رمز عبور جدید</h2>
        <input
          className="input-group-text mt-2"
          type="password"
          placeholder="رمز عبور جدید"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          className="input-group-text my-lg-1"
          type="password"
          placeholder="تکرار رمز عبور جدید"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button className="btn-main btn-color w-100 mt-1" onClick={OnReset}>
          تغییر رمز عبور
        </button>
      </section>
    </section>
  );
}
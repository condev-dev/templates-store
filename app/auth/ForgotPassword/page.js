"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "../index.css";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const OnCheck = async () => {
    if (email.trim() === "") {
      toast.error("لطفا ایمیل را وارد کنید.");
      return;
    }

    const res = await fetch(
      `${BaseUrl}/api/users/check-email?email=${encodeURIComponent(email)}`,
    );

    const data = await res.json();



    if (data.exists) {
      router.push(`/auth/reset-password?email=${email}`);
    } else {
      toast.error("کاربری با این ایمیل یافت نشد.");
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center auth-container">
      <section className="d-flex justify-content-center align-items-center flex-column gap-3 auth-box p-5 shadow-sm">
        <h2 className="auth-title">فراموشی رمز عبور</h2>
        <input
          className="input-group-text mt-2"
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn-main btn-color w-100 mt-1" onClick={OnCheck}>
          بررسی ایمیل
        </button>
      </section>
    </section>
  );
}
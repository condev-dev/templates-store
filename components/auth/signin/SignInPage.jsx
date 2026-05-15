"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "../index.css";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  const router = useRouter();
  //

  //
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedPassword = sessionStorage.getItem("pass");
    //
    if (storedEmail) {
      setEmail(storedEmail);
      sessionStorage.removeItem("email");
    }
    if (storedPassword) {
      setPassword(storedPassword);
      sessionStorage.removeItem("pass");
    }
    //
  }, []);
  //
  const OnSignIn = async () => {
    if (email === "" || password === "") {
      toast.error("لطفا ایمیل و کلمه عبور را وارد کنید. ");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      id: "",
    });

    if (result?.error) {
      toast.error("کاربری با مشخصات وارد شده یافت نشد.");
    } else {
      router.back();
    }
  };

  return (
    <>
      <section className="d-flex justify-content-center align-items-center auth-container">
        {/* Overlay in Mobile */}
        <div
          className="auth-container-overlay"
          onClick={() => router.back()}
        ></div>
        <section className="d-flex justify-content-center align-items-center flex-column gap-3 auth-box p-5 shadow-sm">
          <div
            onClick={() => router.back()}
            className="show-lg"
            style={{ cursor: "pointer" }}
          >
            <Image
              src="/img/logo.webp"
              alt="ConDev"
              loading="eager"
              width={170}
              height={40}
              className="logo"
            />
          </div>

          <div className="d-flex justify-content-center align-content-center gap-2 w-75 mt-3 show-lg">
            <div
              className={`btn-main w-50 btn-color `}
              onClick={() => router.replace("/auth/signin")}
            >
              ورود
            </div>
            <div
              onClick={() => router.replace("/auth/signup")}
              className={`btn-main w-50 btn-light`}
            >
              ثبت نام
            </div>
          </div>

          <h2 className="auth-title mt-3 mt-lg-4 pt-lg-3">ورود به سایت</h2>

          <input
            className="input-group-text mt-2"
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-group-text my-lg-1"
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn-main btn-color w-100 mt-1 mt-lg-2"
            onClick={OnSignIn}
          >
            ورود
          </button>
          <small className=" w-100 small px-1  mt-1 mt-lg-0 d-lg-none ">
            حساب کاربری ندارید؟
            <small
              onClick={() => router.replace("/auth/signup")}
              className="mx-2"
            >
              ثبت نام
            </small>
          </small>
          <small className=" w-100 small px-1">
            رمز عبورتان را گم کرده‌اید؟{" "}
            <Link href="/" className="mx-2">
              ایجاد رمز جدید
            </Link>
          </small>
        </section>
      </section>
    </>
  );
}

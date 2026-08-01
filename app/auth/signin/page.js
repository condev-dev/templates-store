"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "../index.css";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedPassword = sessionStorage.getItem("pass");
    if (storedEmail) {
      setEmail(storedEmail);
      sessionStorage.removeItem("email");
    }
    if (storedPassword) {
      setPassword(storedPassword);
      sessionStorage.removeItem("pass");
    }
  }, []);

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
      router.push("/");
    }
  };
// For Google Login
  const OnGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <>
      <section className="d-flex justify-content-center align-items-center auth-container">
        <section className="d-flex justify-content-center align-items-center flex-column gap-3 auth-box p-5  shadow-sm">
          <Link href={"/"} className="show-lg">
            <Image
              src="/img/logo.webp"
              alt="ConDev"
              loading="eager"
              width={170}
              height={40}
              className="logo"
            />
          </Link>

          <div className="d-flex justify-content-center align-content-center gap-2 w-75 mt-lg-3 show-lg">
            <Link className={`btn-main w-50 btn-color `} href={"/auth/signin"}>
              ورود
            </Link>
            <Link href={"/auth/signup"} className={`btn-main w-50 btn-light`}>
              ثبت نام
            </Link>
          </div>

          <h2 className="auth-title mt-1 mt-sm-4 pt-sm-3">سلام خوش اومدی 👋</h2>

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
            <small onClick={() => router.push("/auth/signup")} className="mx-2">
              ثبت نام
            </small>
          </small>
          <small className=" w-100 small px-1">
            رمز عبورتان را گم کرده‌اید؟{" "}
            <Link
              href="/auth/ForgotPassword"
              className="mx-2"
              style={{ color: "var(--bg-btn-color)" }}
            >
              ایجاد رمز جدید
            </Link>
          </small>
          <div className="d-flex align-items-center w-100 mt-2">
            <hr className="flex-grow-1" />
            <small className="mx-2 small">OR</small>
            <hr className="flex-grow-1" />
          </div>

          <button
            className="btn-main btn-light w-100 d-flex justify-content-center align-items-center gap-2"
            onClick={OnGoogleSignIn}
            type="button"
          >
            <FaGoogle size={24} />
            ورود با گوگل
          </button>
        </section>
      </section>
    </>
  );
}

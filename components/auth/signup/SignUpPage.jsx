"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "../index.css";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const router = useRouter();
  //
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  //
  const OnSignUp = async () => {
    if (email === "" || password === "" || username === "") {
      toast.error("لطفا تمام فیلد ها را پر کنید. ");
      return;
    }

    const userToAdd = {
      id: crypto.randomUUID(),
      email: email,
      password: password,
      username: username,
      fullname: "",
    };

    try {
      const resUser = await fetch(`${BaseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userToAdd.id,
          email: userToAdd.email,
          password: userToAdd.password,
          username: userToAdd.username,
          fullname: userToAdd.fullname
        }),
      });

      const resCart = await fetch(`${BaseUrl}/api/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userToAdd.id,
        }),
      });

      const cartData = await resCart.json();
      const userData = await resUser.json();

      if (resCart.ok && resUser.ok) {
        toast.success("ثبت نام با موفقیت انجام شد.");
        // Set In Session Then Get From SignIn
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("pass", password);
        //
        router.replace("/auth/signin");
      } else {
        toast.error(cartData.message || userData.message);
      }
    } catch (err) {
      toast.error("ثبت نام با مشکل مواجعه شد.");
    }
  };

  return (
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
            className={`btn-main w-50 btn-light`}
            onClick={() => router.replace("/auth/signin")}
          >
            ورود
          </div>
          <div
            onClick={() => router.replace("/auth/signup")}
            className={`btn-main w-50 btn-color `}
          >
            ثبت نام
          </div>
        </div>
        <h2 className="auth-title  mt-3 mt-lg-4 pt-lg-3">ثبت نام</h2>
        <input
          className="input-group-text mt-2"
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />{" "}
        <input
          className="input-group-text my-lg-1"
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-group-text "
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn-main btn-color w-100 mt-1 mt-lg-2"
          onClick={OnSignUp}
        >
          ثبت نام
        </button>
        <small className=" w-100 small px-1  mt-1 mt-lg-0 d-lg-none ">
          حساب کاربری دارید؟
          <small
            onClick={() => router.replace("/auth/signin")}
            className="mx-2"
          >
            ورود به سایت
          </small>
        </small>
      </section>
    </section>
  );
}

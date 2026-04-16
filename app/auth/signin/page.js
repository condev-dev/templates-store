"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "../index.css";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
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
    });

    if (result?.error) {
      toast.error("کاربری با مشخصات وارد شده یافت نشد.");
    } else {
      router.push("/");
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center signin-container">
      <section className="d-flex justify-content-center align-items-center flex-column gap-3 signin-box p-5 shadow-sm">
        <Link href="/">
          <Image
            src="/img/logo.webp"
            alt="ConDev"
            loading="eager"
            width={170}
            height={40}
            className="logo"
          />
        </Link>

        <div className="d-flex justify-content-center align-content-center gap-2 w-75 mt-3">
          <button
            className={`btn-main w-50 btn-color`}
            onClick={() => router.push("/auth/signin")}
          >
            ورود
          </button>
          <button
            onClick={() => router.push("/auth/signup")}
            className={`btn-main w-50 btn-light`}
          >
            ثبت نام
          </button>
        </div>

        <h2 className="signin-title mt-4 pt-3">ورود به سایت</h2>

        <input
          className="input-group-text mt-2"
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-group-text my-1"
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn-main btn-color w-100 mt-2" onClick={OnSignIn}>
          ورود
        </button>
        <small className=" w-100 small px-1 ">
          فراموشی{" "}
          <Link href="/" className="mx-1">
            رمز عبور
          </Link>
        </small>
      </section>
    </section>
  );
}

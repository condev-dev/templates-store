"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthBtn = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="d-flex gap-3">
      {session?.status === "authenticated" ? (
        <button onClick={signOut} className="btn-main btn-red">
          خروج از حساب کاربری
        </button>
      ) : (
        <>
          <button
            onClick={() => router.push("/auth/signup")}
            className="btn-main btn-color"
          >
            ثبت نام
          </button>
          <button
            onClick={() => router.push("/auth/signin")}
            className="btn-main btn-color"
          >
            ورود
          </button>
        </>
      )}
    </div>
  );
};

export default AuthBtn;

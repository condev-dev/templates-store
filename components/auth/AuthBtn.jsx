"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthBtn = ({ className }) => {
  const session = useSession();
  const router = useRouter();
  return (
    <>
      {session?.status !== "authenticated" && (
        <>
          <button
            onClick={() => router.push("/auth/signin")}
            className={`btn-main btn-color ${className}`}
          >
            ثبت نام / ورود
          </button>
        </>
      )}
    </>
  );
};

export default AuthBtn;

"use client";
import { useEffect } from "react";
import SignInPage from "@/components/auth/signin/SignInPage";

export default function SignInModal() {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);


  return <SignInPage />;
}

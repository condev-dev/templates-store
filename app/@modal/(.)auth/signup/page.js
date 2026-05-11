"use client";
import { useEffect } from "react";
import SignUpPage from "@/components/auth/signup/SignUpPage";

export default function SignUpModal() {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return <SignUpPage />;
}

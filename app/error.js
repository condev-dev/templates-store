"use client";

import { useEffect } from "react";
import CustomError from "@/components/ui/error/CustomError";

export default function Error({ error, reset }) {
  // Log The Error
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
    <CustomError error={error} reset={reset} />
    </>
  );
}

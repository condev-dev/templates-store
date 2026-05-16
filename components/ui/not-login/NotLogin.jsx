"use client";

import "./index.css";
import { useRouter } from "next/navigation";

const NotLogin = ({ text, className }) => {
  const router = useRouter();

  return (
    <div className=" w-100 d-flex justify-content-center align-items-center not-login px-3 flex-column ">
      <h5>
        {" "}
        <span className="mx-1">لطفاً</span> {text}{" "}
      </h5>

      <div className="d-flex gap-2 gap-sm-3 mt-3 ">
        <button
          onClick={() => router.push("/auth/signin")}
          className={`btn-main btn-color ${className}`}
        >
          ثبت نام / ورود
        </button>
      </div>
    </div>
  );
};

export default NotLogin;

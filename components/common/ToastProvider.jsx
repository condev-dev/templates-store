"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 function ToastProvider() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 576);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <ToastContainer
      position={isMobile ? "top-center" : "bottom-right"}
      hideProgressBar
      pauseOnHover
      closeOnClick
      stacked
      rtl
      limit={3}
      autoClose="800"
      theme="colored"
    />
  );
}


export default ToastProvider;

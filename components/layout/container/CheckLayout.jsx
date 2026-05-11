"use client";
import { usePathname } from "next/navigation";

const CheckLayout = ({ children }) => {
  const pathname = usePathname();
  const hideLayout = ["/auth/signin", "/auth/signup"].includes(pathname);

  if (typeof window !== "undefined" && window.innerWidth < 992) return children;
  
  if (hideLayout) return null;
  return children;
};

export default CheckLayout;

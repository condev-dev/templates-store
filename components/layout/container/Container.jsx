"use client";
import { usePathname } from "next/navigation";
import "./index.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Container = ({ children }) => {
  const pathname = usePathname();
  const hideLayout = ["/auth/signin", "/auth/signup"].includes(pathname);
  return (
    <section className="main-container d-flex flex-column ">
      {hideLayout ? "" : <Header />}
      {children}
      {hideLayout ? "" : <Footer />}
    </section>
  );
};

export default Container;

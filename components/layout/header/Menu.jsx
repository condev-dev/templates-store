"use client";
import Image from "next/image";
import { FaStar, FaTimes } from "react-icons/fa";
import "./index.css";
import { useState } from "react";
import AuthBtn from "@/components/auth/AuthBtn";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  FiGrid,
  FiMenu,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

const Menu = () => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/*  */}
      <button
        className="btn-main btn-color btn-color-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu size={18} />
      </button>
      {/*  */}
      <section
        className={`menu ${isOpen && "menu-open"} d-flex justify-content-start flex-column p-4 `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-100 d-flex justify-content-between align-items-center flex-row-reverse">
          <Link href="/">
            <Image
              src="/img/logo.webp"
              alt="ConDev"
              loading="eager"
              width={170}
              height={40}
              className="logo menu-logo"
            />
          </Link>
          <button
            className="btn-main btn-light"
            onClick={() => setIsOpen(!isOpen)}
          >
            {" "}
            <FaTimes size={14} />{" "}
          </button>
        </div>

        <Link href={"/#plans"} className="menu-btn-plan mt-5 gap-2 shadow-lg d-flex justify-content-center align-items-center">
          <FaStar size={18} />
          <span>پلن های ویژه</span>
        </Link>

        {session?.status !== "authenticated" && (
          <AuthBtn className="mt-3 w-100" />
        )}

        <Link href={"/#categories"} className="btn-main menu-btn mt-4 justify-content-start gap-3 shadow-sm">
          <FiGrid size={18} />
          <span>دسته بندی ها</span>
        </Link>

        <Link
          href="/purchases"
          className="btn-main menu-btn mt-3 justify-content-start gap-3 shadow-sm"
        >
          <FiShoppingBag size={18} />
          <span>خرید های قبلی</span>
        </Link>

        <Link href={"/profile"} className="btn-main menu-btn mt-3 justify-content-start gap-3 shadow-sm">
          <FiUser size={18} />
          <span>حساب کاربری</span>
        </Link>

        <Link
          href="/cart"
          className="btn-main menu-btn mt-3 justify-content-start gap-3 shadow-sm"
        >
          <FiShoppingCart size={18} />
          <span>سبد خرید</span>
        </Link>

        <div className="d-flex flex-column w-100 mt-auto">
          {session?.status === "authenticated" && (
            <button onClick={signOut} className="btn-main btn-red">
              خروج از حساب کاربری
            </button>
          )}
        </div>
      </section>
      {/*  */}
      {isOpen && (
        <section
          className="menu-overlay"
          onClick={() => setIsOpen(!isOpen)}
        ></section>
      )}
    </>
  );
};

export default Menu;

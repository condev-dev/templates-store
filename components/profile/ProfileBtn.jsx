"use client";
import { signOut, useSession } from "next-auth/react";
import "./index.css";
import Link from "next/link";
import {
  FiLogOut,
  FiSettings,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

const ProfileBtn = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated")
    return (
      <div className="profile-wrapper">
        <button className="profile-btn d-flex align-items-center justify-content-center ">
          <img src="/img/profile.jfif" alt="" />
        </button>

        <section className="btn-profile-con pt-5">
          <section className="btn-profile p-4">
            <div className="d-flex align-items-center mb-4 pb-2">
              <Link
                href="/profile"
                className="profile-btn d-flex align-items-center justify-content-center "
              >
                <img src="/img/profile.jfif" alt="" />
              </Link>
              <h6 className="btn-profile-name mx-3 mt-2">
                {session?.user?.username}
              </h6>
            </div>

            <Link
              href="/profile"
              className="btn-profile-info d-flex align-items-center"
            >
              <FiUser size={14} className="mx-3 mb-1" />
              حساب کاربری
            </Link>
            <Link
              href="/purchases"
              className="btn-profile-info d-flex align-items-center  mt-3 pt-1"
            >
              <FiShoppingBag size={14} className="mx-3 mb-1" />
              خرید های قبلی
            </Link>

            <Link
              href="/cart"
              className="btn-profile-info d-flex align-items-center mt-3 pt-1"
            >
              <FiShoppingCart size={14} className="mx-3 mb-1" />
              سبد خرید
            </Link>
            <Link
              href="/"
              className="btn-profile-info d-flex align-items-center mt-3 pt-1"
            >
              <FiSettings size={14} className="mx-3 mb-1" />
              تنظیمات
            </Link>

            <a
              onClick={signOut}
              className="btn-profile-info btn-profile-info-logout d-flex align-items-center mt-3 pt-3"
            >
              <FiLogOut size={14} className="mx-3 mb-1" />
              خروج از حساب کاربری
            </a>
          </section>
        </section>
      </div>
    );
};

export default ProfileBtn;

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
import Image from "next/image";

const ProfileBtn = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated")
    return (
      <div className="profile-wrapper">
        <button className="profile-btn d-flex align-items-center justify-content-center ">
          <Image
            width={42}
            height={42}
            src="/img/profile.webp"
            alt="Profile Image"
            loading="lazy"
          />
        </button>

        <section className="btn-profile-con pt-5 mt-2">
          <section className="btn-profile  ">
            <div className="d-flex align-items-center ">
              <Link
                href="/profile"
                className="profile-btn d-flex align-items-center justify-content-center "
              >
                <Image
                  width={42}
                  height={42}
                  src="/img/profile.webp"
                  alt="Profile Image"
                  loading="lazy"
                />
              </Link>
              <h6 className="btn-profile-name mx-3 mt-2">
                {session?.user?.username}
              </h6>
            </div>

            <hr />

            <Link
              href="/profile"
              className="btn-profile-info d-flex align-items-center"
            >
              <FiUser size={14} className="mx-3 mb-1" />
              حساب کاربری
            </Link>
            <Link
              href="/purchases"
              className="btn-profile-info d-flex align-items-center  "
            >
              <FiShoppingBag size={14} className="mx-3 mb-1" />
              خرید های قبلی
            </Link>

            <Link
              href="/cart"
              className="btn-profile-info d-flex align-items-center "
            >
              <FiShoppingCart size={14} className="mx-3 mb-1" />
              سبد خرید
            </Link>
            {/* <Link
              href="/"
              className="btn-profile-info d-flex align-items-center "
            >
              <FiSettings size={14} className="mx-3 mb-1" />
              تنظیمات
            </Link> */}

            <a
              onClick={signOut}
              className="btn-main btn-red btn-profile-info-logout d-flex align-items-center mt-3"
            >
              خروج از حساب کاربری
            </a>
          </section>
        </section>
      </div>
    );
};

export default ProfileBtn;

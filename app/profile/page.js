"use client";

import ProfileInformation from "@/components/profile/ProfileInformation";
import "./index.css";
import { FiUser, FiLock } from "react-icons/fi";
import ProfilePassword from "@/components/profile/ProfilePassword";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");
  return (
    <section className="box-profile w-100 mt-5">
      <div className="d-flex flex-column gap-4 ms-2">
        <button
          className={`btn-main ${activeTab === "info" ? "btn-color" : "btn-light"}`}
          onClick={() => setActiveTab("info")}
        >
          <FiUser className="ms-3" size={18} />
          اطلاعات کاربری
        </button>

        <button
          className={`btn-main ${activeTab === "password" ? "btn-color" : "btn-light"}`}
          onClick={() => setActiveTab("password")}
        >
          <FiLock className="ms-3" size={18} />
          تغییر گذرواژه
        </button>

        {/* <button className="btn-main btn-light ">
          <FiSettings className="ms-3" size={18} />
          تنظیمات اعلانیه‌ها
        </button> */}

        {/* <button className="btn-main btn-light ">
          <FiEdit className="ms-3" size={18} />
          اطلاعات تکمیلی
        </button> */}
      </div>

      {activeTab === "info" && <ProfileInformation />}
      {activeTab === "password" && <ProfilePassword />}
    </section>
  );
};

export default Profile;

"use client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import EditableInput from "./EditableInput";

const ProfileInformation = () => {
  const { data } = useSession();

  return (
    <div className="d-flex flex-column gap-4 mt-4 mt-lg-0 p-4 p-md-5 me-lg-5 profile">
      <h6 className="mb-4 mb-md-0">اطلاعات کاربری</h6>

      <EditableInput
        label="نام و نام خانوادگی"
        value={data?.user?.fullname}
        name={"fullname"}
      />
      <EditableInput
        label="نام کاربری"
        value={data?.user?.username}
        name={"username"}
      />
      <EditableInput
        label="ایمیل"
        value={data?.user?.email}
        type="email"
        name={"email"}
      />
    </div>
  );
};

export default ProfileInformation;

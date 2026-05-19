"use client";

import { useSession } from "next-auth/react";
import { FiEdit } from "react-icons/fi";

const ProfilePassword = () => {
  const { data } = useSession();
  console.log(data);

  return (
    <div className="d-flex flex-column gap-4 mt-4 mt-lg-0 p-4 p-md-5 me-lg-5 profile ">
      <div className="w-100 mt-2 mt-md-0">
        <h6>گذرواژه</h6>
      </div>

      <div className="d-flex align-items-md-center align-items-start justify-content-end w-100 mt-4 flex-column flex-md-row ">
        <label className="w-25 w-md-100">رمز عبور</label>
        <div className="d-flex justify-content-between align-items-center w-75 w-md-100 mt-3 mt-md-0">
          <input
            class="input-group-text w-100"
            placeholder="ثبت نشده است"
            disabled
            value={"FUCK YOU :)"}
            type="password"
          />
          <button className="btn-main btn-color btn-color-sm me-3">
            {" "}
            <FiEdit size={16} />{" "}
          </button>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default ProfilePassword;

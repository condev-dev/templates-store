"use client";

import { useSession } from "next-auth/react";
import { FiEdit } from "react-icons/fi";

const ProfilePassword = () => {
  const { data } = useSession();
  console.log(data);

  return (
    <div className="d-flex flex-column gap-4 p-5 me-5 profile ">
      <div className="w-100">
        <h6>گذرواژه</h6>
      </div>

      <div className="d-flex align-items-center justify-content-end w-100 mt-4">
        <label className="w-25">رمز عبور</label>
        <div className="d-flex justify-content-between align-items-center w-75">
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

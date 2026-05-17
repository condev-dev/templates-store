import "./index.css";
import {
  FiUser,
  FiEye,
  FiEyeOff,
  FiUserCircle,
  FiLock,
  FiSettings,
  FiEdit,
} from "react-icons/fi";

const Profile = () => {
  return (
    <section className="box-profile w-100  mt-5">
      {/* -- Btn's */}
      <div className="d-flex flex-column gap-4 ms-2">
        <button className="btn-main btn-color ">
          <FiUser className="ms-3" size={18} />
          اطلاعات کاربری
        </button>

        <button className="btn-main btn-light ">
          <FiLock className="ms-3" size={18} />
          تغییر گذرواژه
        </button>
        {/*  */}

        <button className="btn-main btn-light ">
          <FiSettings className="ms-3" size={18} />
          تنظیمات اعلانیه‌ها
        </button>

        <button className="btn-main btn-light ">
          <FiEdit className="ms-3" size={18} />
          اطلاعات تکمیلی
        </button>
      </div>

      {/* -- Profile's */}
      {/* User Profile */}
      <div className="d-flex flex-column gap-4 p-5 me-5 profile ">
        <div className="w-100">
          <h6>اطلاعات کاربری</h6>
        </div>

        <div className="d-flex align-items-center justify-content-end w-100 mt-4">
          <label className="w-25">نام و نام خانوادگی</label>
          <div className="d-flex justify-content-between align-items-center w-75">
            <input
              class="input-group-text w-100"
              disabled
              placeholder="ثبت نشده است

"
              type="text"
            />
            <button className="btn-main btn-color btn-color-sm me-3">
              {" "}
              <FiEdit size={16} />{" "}
            </button>
          </div>
        </div>

        <hr />

        <div className="d-flex align-items-center justify-content-end w-100 ">
          <label className="w-25">نام کاربری</label>
          <div className="d-flex justify-content-between align-items-center w-75">
            <input
              disabled
              class="input-group-text w-100"
              placeholder="ثبت نشده است


"
              type="text"
            />
            <button className="btn-main btn-color btn-color-sm me-3">
              {" "}
              <FiEdit size={16} />{" "}
            </button>
          </div>
        </div>
        <hr />

        <div className="d-flex align-items-center justify-content-end w-100 ">
          <label className="w-25">ایمیل</label>
          <div className="d-flex justify-content-between align-items-center w-75">
            <input
              disabled
              class="input-group-text w-100"
              placeholder="ثبت نشده است



"
              type="email"
            />
            <button className="btn-main btn-color btn-color-sm me-3">
              {" "}
              <FiEdit size={16} />{" "}
            </button>
          </div>
        </div>
      </div>

      {/* <hr className="my-5" /> */}
      {/* <div className="box-profile align-items-center">
        <div className="d-flex">
          <FiLock size={18} />
          <h6 className="mx-3">رمز عبور</h6>
        </div>

        <div className="d-flex  gap-5 pe-5">
          <div className="d-flex flex-column w-50">
            <label>رمز جدید</label>
            <input
              class="input-group-text mt-2"
              placeholder="••••••"
              type="password"
            />
          </div>
          <div className="d-flex flex-column w-50">
            <label>تکرار رمز جدید</label>
            <input
              class="input-group-text mt-2"
              placeholder="••••••"
              type="password"
            />
          </div>
        </div>
      </div> */}
      {/* <hr className="my-5" /> */}

      {/* <button className="btn-main btn-color px-5" >ثبت و ذخیره</button> */}
    </section>
  );
};

export default Profile;

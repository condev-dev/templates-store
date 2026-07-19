import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

const PasswordInput = () => {
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  //
  const { data: session, update } = useSession();
  //
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const repeatPasswordRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    requestAnimationFrame(() => currentPasswordRef.current?.focus());
  };

  const handleSaveClick = async () => {
    const currentPassword = currentPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    const repeatPassword = repeatPasswordRef.current?.value;

    // ------- Checks
    // Check if any field is empty
    if (!currentPassword || !newPassword || !repeatPassword) {
      toast.error("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    // Check if the new password is at least 6 characters long
    if (newPassword.length < 6) {
      toast.error("رمز عبور جدید باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    // Check if the new password matches the repeat password
    if (newPassword !== repeatPassword) {
      toast.error("رمز عبور جدید با تکرار آن مطابقت ندارد!");
      return;
    }

    const res = await fetch(`${BaseUrl}/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user?.id,
        password: newPassword,
      }),
    });

    if (res.ok) {
      await update({
        ...session,
        user: {
          ...session?.user,
          password: newPassword,
        },
      });
      toast.success("پسورد با موفقیت آپدیت شد.");
    } else {
      const errorData = await res.json();
      toast.error(errorData.message);
      if (newPasswordRef.current) {
        newPasswordRef.current.value = "";
      }
    }

    // console.log("Saving password:", { currentPassword, newPassword });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    currentPasswordRef.current.value = "";
    newPasswordRef.current.value = "";
    repeatPasswordRef.current.value = "";
  };

  return (
    <div className="d-flex flex-column gap-4 mt-3">
      {!isEditing ? (
        <div className="d-flex align-items-md-center align-items-start justify-content-end w-100 flex-column flex-md-row ">
          <label className="w-25 w-md-100">رمز عبور</label>
          <div className="d-flex justify-content-between align-items-center w-75 w-md-100 mt-3 mt-md-0">
            <input
              className="input-group-text w-100"
              placeholder="تغییر رمز عبور"
              disabled
              type="password"
              value="********"
            />
            <button
              onClick={handleEditClick}
              className="btn-main btn-color btn-color-sm me-3"
            >
              <FiEdit size={16} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex align-items-md-center align-items-start justify-content-end w-100 flex-column flex-md-row ">
            <label className="w-25 w-md-100">رمز عبور فعلی</label>
            <div className="w-75 w-md-100 mt-3 mt-md-0">
              <input
                ref={currentPasswordRef}
                className="input-group-text w-100"
                placeholder="رمز عبور فعلی"
                type="password"
              />
            </div>
          </div>
          <div className="d-flex align-items-md-center align-items-start justify-content-end w-100 flex-column flex-md-row pt-2">
            <label className="w-25 w-md-100">رمز عبور جدید</label>
            <div className="w-75 w-md-100 mt-3 mt-md-0">
              <input
                ref={newPasswordRef}
                className="input-group-text w-100"
                placeholder="رمز عبور جدید"
                type="password"
              />
            </div>
          </div>
          <div className="d-flex align-items-md-center align-items-start justify-content-end w-100 flex-column flex-md-row pt-2">
            <label className="w-25 w-md-100">تکرار رمز عبور</label>
            <div className="w-75 w-md-100 mt-3 mt-md-0">
              <input
                ref={repeatPasswordRef}
                className="input-group-text w-100"
                placeholder="تکرار رمز عبور جدید"
                type="password"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end w-50 w-md-100 mt-3 pt-4 mt-md-0 gap-2 gap-md-3 w-md-100">
            <button
              onClick={handleSaveClick}
              className="btn-main btn-color w-50"
            >
              ذخیره
            </button>
            <button
              onClick={handleCancelClick}
              className="btn-main btn-red w-50"
            >
              انصراف
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordInput;

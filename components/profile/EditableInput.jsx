"use client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

const EditableInput = ({ label, value, type = "text", name }) => {
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const { data: session, update } = useSession();
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleEdit = async () => {
    if (disabled) {
      setDisabled(false);
      requestAnimationFrame(() => inputRef.current?.select());
    } else {
      const newValue = inputRef.current.value;
      setDisabled(true);

      // ---------- Checks
      // Check if the new value is empty
      if (newValue.trim() === "") {
        toast.error("این فیلد نمی‌تواند خالی باشد.");
        inputRef.current.value = value || "";
        setDisabled(true);
        return;
      }

      // Check if the new value is the same as the old value
      if (newValue === value) {
        toast.info("مقدار جدید با مقدار قبلی یکسان است.");
        inputRef.current.value = value || "";
        setDisabled(true);
        return;
      }

      // Check if the new value is less than 3 characters for username
      if (name === "username" && newValue.length < 3) {
        toast.error("نام کاربری باید حداقل ۳ کاراکتر باشد.");
        inputRef.current.value = value || "";
        setDisabled(true);
        return;
      }

      // Check if the new value is a valid email format for email field
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newValue)) {
          toast.error("فرمت ایمیل وارد شده معتبر نیست.");
          inputRef.current.value = value || "";
          setDisabled(true);
          return;
        }
      }

      //---------- Update the user data via API
      const res = await fetch(`${BaseUrl}/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          [name]: newValue,
        }),
      });

      if (res.ok) {
        await update({
          ...session,
          user: {
            ...session?.user,
            [name]: newValue,
          },
        });
        toast.success("پروفایل با موفقیت آپدیت شد.");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message);
        if (inputRef.current) {
          inputRef.current.value = value || "";
        }
      }
    }
  };

  return (
    <>
      <div className="d-flex align-items-md-center align-items-start justify-content-end w-100 mt-md-4 flex-column flex-md-row">
        <label className="w-25 w-md-100">{label}</label>
        <div className="d-flex justify-content-between align-items-center w-75 w-md-100 mt-3 mt-md-0">
          <input
            ref={inputRef}
            className="input-group-text w-100"
            disabled={disabled}
            defaultValue={value}
            type={type}
            placeholder="ثبت نشده است"
          />
          <button
            onClick={handleEdit}
            className="btn-main btn-color btn-color-sm me-3"
          >
            {!disabled ? "ذخیره" : <FiEdit size={16} />}
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default EditableInput;

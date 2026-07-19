"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import "./index.css";
import { toast } from "react-toastify";

const DeleteAccountBtn = () => {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  //
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleDelete = async () => {
    if (!session?.user?.id) return;

    const result = await Swal.fire({
      title: "آیا مطمئن هستید؟",
      color: "#94a3b8",
      icon: "warning",

      iconColor: "#ef4444",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#94a3b8",
      customClass: {
        confirmButton: "btn-main btn-red mt-2 mb-3 mx-2",
        cancelButton: "btn-main btn-color mt-2 mb-3 mx-2",
      },
      background: "#0f172a",
      confirmButtonText: "حذف حساب",
      cancelButtonText: "انصراف",
    });

    if (!result.isConfirmed) return;

    try {
      setIsDeleting(true);

      const response = await fetch(`${BaseUrl}/api/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "حساب کاربری با موفقیت حذف شد.");

        signOut({ callbackUrl: "/" });
      } else {
        toast.error(data.message || "مشکلی در حذف حساب پیش آمد.");
      }
    } catch (error) {
      toast.error("خطا", "ارتباط با سرور برقرار نشد.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mt-2 mt-md-4 p-4 alert-delete-account ">
      <h5 className="alert-heading">حذف حساب </h5>
      <p className=" mt-3 pt-1 mb-2 alert-text">
        در صورت حذف حساب، دیگر به قالب های خریداری شده و سبد خرید خود دسترسی
        نخواهید داشت.
      </p>
      <hr />
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="btn-main btn-red"
      >
        {isDeleting ? "در حال حذف..." : "حذف حساب کاربری"}
      </button>
    </div>
  );
};

export default DeleteAccountBtn;

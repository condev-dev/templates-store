"use client";
import FaNumber from "../common/FaNumber";
import Toman from "../common/Toman";
import Skeleton from "react-loading-skeleton";
import "./index.css";
import Link from "next/link";
import { toast } from "react-toastify";
import { useState } from "react";

const CartInformation = ({ UserTemplates, isLoading, userId }) => {
  const [paying, setPaying] = useState(false);
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;


  const totalItems = Array.isArray(UserTemplates) ? UserTemplates.length : 0;
  const totalPrice = Array.isArray(UserTemplates)
    ? UserTemplates.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        return sum + price;
      }, 0)
    : 0;

  const showSkeleton =
    isLoading || !UserTemplates || UserTemplates.length === 0;

  const OnCheckout = async () => {
    setPaying(true);
    try {
      const res = await fetch(`${BaseUrl}/api/payment/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          description: `خرید ${totalItems} تمپلیت`,
          userId: userId,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("خطا در اتصال به درگاه پرداخت.");
        setPaying(false);
      }
    } catch (err) {
      toast.error("مشکلی پیش آمد.");
      setPaying(false);
    }
  };

  return (
    <div className="w-25 h-100 cart-information-container">
      <div className="cart-information p-4 shadow-sm">
        <h6 className="text-center 2-100 mt-2 cart-information-title mb-5">
          اطلاعات سبد خرید
        </h6>

        <div className="d-flex justify-content-between align-items-center w-100 mt-3 cart-information-text pb-2">
          <h6>تعداد</h6>
          <h6 className="d-flex justify-content-center align-items-center gap-2">
            {showSkeleton ? (
              <Skeleton width={35} height={18} />
            ) : (
              <>
                <FaNumber number={totalItems} />
                <span>مورد</span>
              </>
            )}
          </h6>
        </div>

        <div className="d-flex justify-content-between align-items-center w-100 mt-3 ">
          <h6>جمع سبد خرید</h6>
          <h6 className="d-flex justify-content-center align-items-center gap-2">
            {showSkeleton ? (
              <Skeleton width={80} height={18} />
            ) : (
              <>
                <FaNumber number={totalPrice} />
                <Toman size={20} />
              </>
            )}
          </h6>
        </div>

        <button
          className="btn-main btn-color mt-4 w-100 shadow-sm"
          disabled={showSkeleton || paying}
          onClick={OnCheckout}
        >
          {paying ? "در حال انتقال..." : "تسویه حساب"}
        </button>
      </div>

      <Link href={"/"} className="btn-main btn-light mt-4 w-100 shadow-sm">
        بازگشت به صفحه ی اصلی
      </Link>
    </div>
  );
};

export default CartInformation;
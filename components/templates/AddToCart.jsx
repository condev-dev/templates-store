"use client";
import { fetcher } from "@/services/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

const AddToCart = ({ templateId }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const { data, error, isLoading } = useSWR(
    status === "authenticated" && `carts?userId=${session?.user?.id}`,
    fetcher,
  );

  if (error) {
    return <button className="btn-main btn-red">خطا در بارگذاری</button>;
  }

  if (isLoading) {
    return <button className="btn-main btn-color">در حال بارگذاری...</button>;
  }

  const isExists = data?.find((template) => template.id === templateId);

  const handleAddToCart = async () => {
    if (isExists) return router.push("/cart");

    if (status !== "authenticated") {
      router.push("/");
      return toast.error("لطفا وارد حساب خود شوید.");
    }

    try {
      const response = await fetch(`${BaseUrl}/api/carts`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          templateId: templateId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return toast.error(errorData.message);
      }

      await mutate(`carts?userId=${session?.user?.id}`);
      toast.success("محصول با موفقیت به سبد خرید اضافه شد.");
      //
    } catch (error) {
      toast.error("خطا در ارتباط با سرور.");
    }
  };
  return (
    <button
      className={`btn-main ${isExists ? "btn-light" : "btn-color"}`}
      onClick={handleAddToCart}
      disabled={isLoading}
    >
      {isExists ? "مشاهده سبد خرید" : "افزودن به سبد خرید"}
    </button>
  );
};

export default AddToCart;

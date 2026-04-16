// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

// const BtnAddToCart = ({ templateId, userId }) => {
//   const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

//   const onSubmit = async () => {
//     console.log(userId);

//     try {
//       const res = await fetch(`${BaseUrl}/api/users`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: userId,
//           templateId: templateId,
//         }),
//       });
//       const data = await res.json();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <button className="btn-main btn-color" onClick={onSubmit}>
//       افزودن به سبد خرید
//     </button>
//   );
// };

// export default BtnAddToCart;

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddToCart = ({ templateId, classname }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  //
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  //   get user
  const fetchUser = async () => {
    if (status === "authenticated" && session?.user?.id) {
      try {
        const res = await fetch(`${BaseUrl}/api/users`);
        const users = await res.json();
        const user = users?.find((user) => user.id === session?.user?.id);
        setUser(user);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("خطا در دریافت سبد خرید.");
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [status, session]);

  // Check if the product already exists in the cart
  const isExists = user?.cart?.some(
    (template) => template.templateId === templateId,
  );

  const handleAddToCart = async () => {
    if (status !== "authenticated") {
      toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      return;
    }

    if (isExists) {
      router.push("/cart");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BaseUrl}/api/users`, {
        method: "POST",
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
        toast.error(errorData.message || "خطا در افزودن محصول به سبد خرید.");
        setIsLoading(false);
        return;
      }

      const updatedCartFromServer = await response.json();
      setUser(updatedCartFromServer);

      toast.success("محصول با موفقیت به سبد خرید اضافه شد.");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("خطا در ارتباط با سرور.");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = isExists ? "مشاهده سبد خرید" : "افزودن به سبد خرید";

  if (user === null && status === "authenticated") {
    return (
      <button className={`btn-main btn-color ${classname}`} disabled>
        در حال بارگذاری...
      </button>
    );
  }

  return (
    <button
      className={`btn-main ${classname} ${isExists ? "btn-light" : "btn-color"}`}
      onClick={handleAddToCart}
      disabled={isLoading}
    >
      {isLoading ? "در حال پردازش..." : buttonText}
    </button>
  );
};

export default AddToCart;

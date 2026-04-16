"use client";
import Toman from "@/components/common/Toman";
import FaNumber from "../../components/common/FaNumber";
import "./index.css";
import { FiTrash2, FiEye } from "react-icons/fi";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CartItem from "@/components/cart/CartItem";
import CartInformation from "@/components/cart/CartInfromation";

const Cart = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userCart, setUserCart] = useState(null);
  const [templates, setTemplates] = useState(null);
  //
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  //   get user
  const fetchUserCart = async () => {
    if (status === "authenticated" && session?.user?.id) {
      try {
        const res = await fetch(`${BaseUrl}/api/users`);
        const users = await res.json();
        const user = users?.find((user) => user.id === session?.user?.id);
        setUserCart(user?.cart);
      } catch (error) {
        toast.error("خطا در دریافت سبد خرید.");
      }
    } else {
      setUserCart(null);
    }
  };

  const fetchTemplates = async () => {
    if (status === "authenticated" && session?.user?.id) {
      try {
        const res = await fetch(`${BaseUrl}/api/templates`);
        const templates = await res.json();
        setTemplates(templates);
      } catch (error) {
        toast.error("خطا در دریافت سبد خرید.");
      }
    } else {
      setTemplates(null);
    }
  };

  const handelRemoveFront = () => {
    fetchUserCart();
  };

  useEffect(() => {
    if (status !== "loading" && status !== "authenticated") {
      router.push("/");
      toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      return;
    }

    fetchUserCart();
    fetchTemplates();
  }, [status, session]);

  const userCartTemplateIds = userCart?.map((cartItem) => cartItem.templateId);
  const uniqueTemplateIds = [...new Set(userCartTemplateIds)];
  const UserTemplates = templates
    ? templates.filter((template) => uniqueTemplateIds?.includes(template.id))
    : [];

  return (
    <section className="d-flex justify-content-between align-items-start flex-row-reverse mt-4 h-100">
      {/* Information */}
      <CartInformation UserTemplates={UserTemplates} />
      {/* Box */}
      <div className="cart-items-container w-75 ps-4 gap-4 h-100">
        {UserTemplates?.map((template) => (
          <CartItem
            key={template?.id}
            image={template?.image}
            title={template?.title}
            price={template?.price}
            id={template?.id}
            userId={session?.user?.id}
            handelRemoveFront={handelRemoveFront}
          />
        ))}
      </div>
    </section>
  );
};

export default Cart;

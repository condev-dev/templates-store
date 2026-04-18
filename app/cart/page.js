"use client";
import Toman from "@/components/common/Toman";
import { useSession } from "next-auth/react";
import CartItem from "@/components/cart/CartItem";
import CartInformation from "@/components/cart/CartInfromation";
import { fetcher } from "@/services/api";
import useSWR, { mutate } from "swr";
//
import "./index.css";

const Cart = () => {
  const { data: session, status } = useSession();

  const { data, error, isLoading } = useSWR(
    status === "authenticated" && `carts?userId=${session?.user?.id}`,
    fetcher,
  );
  //
  if (status !== "loading" && status !== "authenticated")
    return <div>لطفاً برای مشاهده سبد خرید وارد حساب کاربری خود شوید. </div>;
  //
  if (isLoading) return <div>Loading...</div>;
  //
  if (error) return <div>Error loading data</div>;
  //
  if (data?.length <= 0) return <div> سبد خرید شما خالی می باشد. </div>;
  //

  if (status === "authenticated") {
    // Func For Update When Remove A Template
    const handelRemoveFront = async () => {
      await mutate(`carts?userId=${session?.user?.id}`);
    };
    //
    return (
      <section className="d-flex justify-content-between align-items-start flex-row-reverse mt-4 h-100">
        {/* Information */}
        <CartInformation UserTemplates={data} />
        {/* Box */}
        <div className="cart-items-container w-75 ps-4 gap-4 h-100">
          {data?.map((template) => (
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
  }
};

export default Cart;

"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";

const CartBtn = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <>
      {session?.status === "authenticated" && (
        <button
          className="btn-main btn-color btn-color-sm"
          onClick={() => router.push("/cart")}
        >
          <FiShoppingCart size={18} />
        </button>
      )}
    </>
  );
};

export default CartBtn;

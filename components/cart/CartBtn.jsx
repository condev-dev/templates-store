"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";

const CartBtn = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="d-flex gap-3">
      {session?.status === "authenticated" && (
        <button
          className="btn-main btn-color btn-color-sm"
          onClick={() => router.push("/cart")}
        >
          <FaCartPlus size={16} />
        </button>
      )}
    </div>
  );
};

export default CartBtn;

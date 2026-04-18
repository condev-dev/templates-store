import Image from "next/image";
import FaNumber from "../common/FaNumber";
import Toman from "../common/Toman";
import { FiEye } from "react-icons/fi";
import RemoveFromCart from "./RemoveFromCart";
//
import "./index.css";

const CartItem = ({ image, title, price, id, userId, handelRemoveFront }) => {
  return (
    <div className="d-flex justify-content-start align-items-center cart-item p-3 shadow-sm">
      <Image src={image} width={200} height={200} alt={title} loading="lazy" />

      <div className="me-4 mt-2 h-100">
        {/*  */}
        <h5 className="cart-item-title">{title}</h5>
        {/*  */}
        <h5 className="d-flex w-100 justify-content-between align-items-center mt-3 pb-1  cart-item-price">
          <span>قیمت :</span>
          <span className="d-flex gap-2">
            <FaNumber number={price} />
            <Toman size={20} />
          </span>
        </h5>
        {/*  */}

        <div className="d-flex gap-2 mt-4">
          <RemoveFromCart
            userId={userId}
            templateId={id}
            handelRemoveFront={handelRemoveFront}
          />
          <button className="btn-main btn-color btn-color-sm mx-1">
            <FiEye size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

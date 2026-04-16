import FaNumber from "../common/FaNumber";
import Toman from "../common/Toman";
import "./index.css";

const CartInformation = ({ UserTemplates }) => {
  // totalItems
  const totalItems = Array.isArray(UserTemplates) ? UserTemplates.length : 0;
  // totalPrice
  const totalPrice = Array.isArray(UserTemplates)
    ? UserTemplates.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        return sum + price;
      }, 0)
    : 0;

  return (
    <div className="w-25 h-100">
      <div className="cart-information p-4 shadow-sm">
        <h6 className="text-center 2-100 mt-2 cart-information-title mb-5">
          اطلاعات سبد خرید
        </h6>

        <div className="d-flex justify-content-between align-items-center w-100 mt-3 cart-information-text pb-2">
          <h6>تعداد</h6>
          <h6 className="d-flex justify-content-center align-items-center gap-2">
            <FaNumber number={totalItems} />
            <span>مورد</span>
          </h6>
        </div>

        <div className="d-flex justify-content-between align-items-center w-100 mt-3 ">
          <h6>جمع سبد خرید</h6>
          <h6 className="d-flex justify-content-center align-items-center gap-2">
            <FaNumber number={totalPrice} />
            <Toman size={20} />{" "}
          </h6>
        </div>

        <button className="btn-main btn-color mt-4 w-100 shadow-sm">
          تسویه حساب
        </button>
      </div>

      <button
        className="btn-main btn-light mt-4 w-100 shadow-sm"
        onClick={() => router.push("/")}
      >
        ادامه خرید
      </button>
    </div>
  );
};

export default CartInformation;

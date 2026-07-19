import Skeleton from "react-loading-skeleton";

const CartItemloading = () => {
  return (
    <div className="d-flex justify-content-start align-items-center cart-item p-3 pb-4 shadow-sm w-100">
      <div className="cart-item-image shadow-sm" style={{ height: "100%" }}>
        <Skeleton height="100%" borderRadius="var(--round-md)" />
      </div>

      <div className="me-4 mt-2 h-100 flex-grow-1">
        <div style={{ maxWidth: "220px" }}>
          <Skeleton height={22} width="85%" />
        </div>

        <div
          className="d-flex w-100 justify-content-between align-items-center mt-3 pb-1"
          style={{ maxWidth: "185px" }}
        >
          <Skeleton height={18} width={45} />
          <Skeleton height={20} width={75} />
        </div>

        <div className="d-flex gap-2 mt-3 mt-sm-4">
          <Skeleton height={38} width={40} borderRadius="6px" />
          <Skeleton height={38} width={40} borderRadius="6px" />
        </div>
      </div>
    </div>
  );
};

export default CartItemloading;

import Skeleton from "react-loading-skeleton";

const PurchasedItemLoading = () => {
  return (
    <div className="purchasedItem-box d-flex flex-column p-3 shadow-sm">
      <div className="w-100" style={{ height: "300px" }}>
        <Skeleton height="100%" borderRadius="var(--round-sm)" />
      </div>

      <div className="mt-4" style={{ paddingRight: "15px" }}>
        <Skeleton height={24} width="75%" />
      </div>

      <div className="mt-3 w-100">
        <Skeleton height={42} width="100%" borderRadius="6px" />
      </div>
    </div>
  );
};

export default PurchasedItemLoading;

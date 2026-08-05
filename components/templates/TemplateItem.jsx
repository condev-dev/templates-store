import Skeleton from "react-loading-skeleton";

const TemplateItemLoading = () => {
  return (
    <div className="template-box d-flex flex-column position-relative shadow-sm">
      <div className="w-100" style={{ height: "300px" }}>
        <Skeleton height="100%" borderRadius="var(--round-sm)" />
      </div>

      <div className="mt-4">
        <Skeleton height={24} width="70%" />
      </div>

      <div className="mt-3">
        <Skeleton height={18} width="40%" />
      </div>

      <div className="mt-3 d-flex flex-row-reverse justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-1 pt-2 mt-1">
          <Skeleton height={24} width={80} />
        </div>

        <div className="d-flex gap-2">
          <Skeleton height={38} width={45} borderRadius="6px" />
          <Skeleton height={38} width={110} borderRadius="6px" />
        </div>
      </div>
    </div>
  );
};

export default TemplateItemLoading;

import "./index.css";
import CustomLoadingImage from "../ui/loading-image/CustomLoadingImage";

const PurchasedItem = ({ image, title }) => {
  return (
    <div className="purchasedItem-box d-flex flex-column p-3 shadow-sm">
      <CustomLoadingImage
        src={image}
        alt={title}
        width={500}
        height={300}
        className="mb-1 "
      />

      <h5 className="mt-4 purchasedItem-box-title">{title}</h5>

      <div className="mt-3  d-flex flex-row-reverse justify-content-between align-items-center">
        {/* <h6 className="purchasedItem-box-price d-flex align-items-center justify-content-center row-gap-2 pt-2 mt-1">
          <span className="mx-1 px-1">
            {" "}
            <FaNumber number={price} />{" "}
          </span>
          <Toman size={22} />
        </h6> */}

        <button className="btn-main btn-color w-100">دانلود فایل قالب</button>
      </div>
    </div>
  );
};

export default PurchasedItem;

import Image from "next/image";
import FaNumber from "../common/FaNumber";
import Toman from "../common/Toman";
import { FaEye } from "react-icons/fa";
import "./index.css";
import { Fragment } from "react";
import ImagePlaceholder from "../common/ImagePlaceholder";
import AddToCart from "./AddToCart";

const Template = ({ image, title, categories, price, id }) => {
  return (
    <div className="template-box d-flex flex-column p-3 shadow-sm">
      {image ? (
        <Image
          src={image}
          alt={title}
          loading="lazy"
          width={500}
          height={300}
          className="mb-1 "
        />
      ) : (
        <ImagePlaceholder width={500} height={300} />
      )}
      <h5 className="mt-4 template-box-title">{title}</h5>

      <h6 className="mt-3 template-box-category">
        <span>دسته بندی :</span>
        <span>
          {categories?.slice(0, 3).map((category, index) => (
            <Fragment key={index}>
              {index > 0 && <small className="mx-1">|</small>}
              <small key={index}> {category}</small>
            </Fragment>
          ))}
        </span>
      </h6>

      <div className="mt-3  d-flex flex-row-reverse justify-content-between align-items-center">
        <h6 className="template-box-price d-flex align-items-center justify-content-center row-gap-2 pt-2 mt-1">
          <span className="mx-1 px-1">
            {" "}
            <FaNumber number={price} />{" "}
          </span>
          <Toman size={22} />
        </h6>

        <div className="d-flex gap-2">
          <button className="btn-main btn-light ms-1">
            {" "}
            <FaEye size={16} />
          </button>

          <AddToCart templateId={id} />
        </div>
      </div>
    </div>
  );
};

export default Template;

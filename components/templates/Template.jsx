import Image from "next/image";
import FaNumber from "../common/FaNumber";
import Toman from "../common/Toman";
import { FaEye } from "react-icons/fa";
import "./index.css";

const Template = () => {
  return (
    <div className="template-box d-flex flex-column p-3 shadow-sm">
      <Image
        src="/img/templates/template.webp"
        width={100}
        height={300}
        alt="Image"
        className="mb-1"
        loading="lazy"
      />
      <h5 className="mt-4 template-box-title">
        قالب کازینویی رویال | فارسی زبان
      </h5>

      <h6 className="mt-3 template-box-category">
        <span>دسته بندی :</span>
        <span>کازینو | فارسی</span>
      </h6>

      <div className="mt-3  d-flex flex-row-reverse justify-content-between align-items-center">
        <h6 className="template-box-price d-flex align-items-center justify-content-center row-gap-2 pt-2 mt-1">
          <span className="mx-1 px-1">
            {" "}
            <FaNumber number={100000} />{" "}
          </span>
          <Toman size={22} />
        </h6>

        <div className="d-flex gap-2">
          <button className="btn-main btn-light ms-1">
            {" "}
            <FaEye size={16} />
          </button>

          <button className="btn-main btn-color">افزودن به سبد خرید</button>
        </div>
      </div>
    </div>
  );
};

export default Template;

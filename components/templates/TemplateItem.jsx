"use client";
import FaNumber from "../common/FaNumber";
import Toman from "../common/Toman";
import { Fragment } from "react";
import AddToCart from "./AddToCart";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
//
import "./index.css";
import CustomLoadingImage from "../ui/loading-image/CustomLoadingImage";

const TemplateItem = ({ image, title, categories, price, id, demo_url }) => {
  return (
    <div className="template-box d-flex flex-column position-relative  shadow-sm">
      <Link href={`/template/${id}`}>
        <CustomLoadingImage
          src={image}
          alt={title}
          width={1200}
          height={600}
          className="w-100 shadow-sm"
        />
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
      </Link>

      <div className="mt-3  d-flex flex-row-reverse justify-content-between align-items-center">
        <h6 className="template-box-price d-flex align-items-center justify-content-center row-gap-2 pt-2 mt-1">
          <span className="mx-1 px-1">
            {" "}
            <FaNumber number={price} />{" "}
          </span>
          <Toman size={22} />
        </h6>

        <div className="d-flex gap-2">
          <Link
            href={demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-main btn-light ms-1"
          >
            {" "}
            <FiEye size={16} />
          </Link>

          <AddToCart templateId={id} />
        </div>
      </div>
    </div>
  );
};

export default TemplateItem;

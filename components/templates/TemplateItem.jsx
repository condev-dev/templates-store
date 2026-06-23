"use client";
import Image from "next/image";
import FaNumber from "../common/FaNumber";
import Toman from "../common/Toman";
import { Fragment, useState } from "react";
import ImagePlaceholder from "../common/ImagePlaceholder";
import AddToCart from "./AddToCart";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
//
import "./index.css";

const TemplateItem = ({ image, title, categories, price, id, demo_url }) => {
  // For Image
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(image);
  const [retryCount, setRetryCount] = useState(0);

  const handleImgError = () => {
    if (retryCount < 1) {
      setRetryCount((prev) => prev + 1);
      setImgSrc(`${image}?retry=${Date.now()}`);
    } else {
      setImgSrc(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="template-box d-flex flex-column position-relative  shadow-sm">
      <Link href={`/template/${id}`}>
        {isLoading && imgSrc && (
          <ImSpinner2 size={24} className="template-box-spiner" />
        )}

        {imgSrc ? (
          <Image
            src={image}
            alt={title}
            loading="lazy"
            width={500}
            height={300}
            className="mb-1 img-fluid"
            unoptimized
            onLoad={() => setIsLoading(false)}
            onError={handleImgError}
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

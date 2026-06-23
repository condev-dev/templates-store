"use client";
import { useState } from "react";
import Image from "next/image";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CustomLoadingImage = ({ src, alt, width, height, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <ImagePlaceholder width={"auto"} height={500} />;
  }

  return (
    <div className="position-relative w-100 h-100">
      {isLoading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 z-1">
          <Skeleton
            width="100%"
            height="100%"
            borderRadius={10}
            baseColor="#1e293b"
            highlightColor="#334155"
          />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={{ transition: "opacity 0.3s ease-in-out" }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default CustomLoadingImage;

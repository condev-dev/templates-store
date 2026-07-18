"use client";
import { useState } from "react";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import Skeleton from "react-loading-skeleton";

const CustomLoadingImage = ({ src, alt, width, height, className, style }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`position-relative ${className || ""}`}
      style={{
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        ...style,
      }}
    >
      {isLoading && !hasError && (
        <Skeleton
          width="100%"
          height="100%"
          className="position-absolute top-0 start-0"
          borderRadius={10}
          baseColor="#1e293b"
          highlightColor="#334155"
        />
      )}

      {hasError ? (
        <ImagePlaceholder />
      ) : (
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isLoading ? 0 : 1,
            filter: isLoading ? "blur(10px)" : "none",
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      )}
    </div>
  );
};

export default CustomLoadingImage;

"use client";
import { useEffect, useRef, useState } from "react";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import Skeleton from "react-loading-skeleton";

const CustomLoadingImage = ({ src, alt, width, height, className, style }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoading(false);
    }
  }, [src]);

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
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isLoading ? 0 : 1,
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

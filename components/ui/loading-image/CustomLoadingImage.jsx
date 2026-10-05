"use client";
import { useEffect, useRef, useState } from "react";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import Skeleton from "react-loading-skeleton";
import "./index.css";

const CustomLoadingImage = ({ src, alt, width, height, className, style }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // postimg hands a tiny 60x180 thumbnail to any client that advertises webp support, which every
  // browser does. ?dl=1 makes it serve the real file instead, whatever the caller is.
  // Nothing else about this component changes: the picture stays in the normal flow with
  // width/height 100%, which is what gives the card its height.
  const source =
    typeof src === "string" && src.includes("postimg.cc") && !src.includes("dl=1")
      ? `${src}${src.includes("?") ? "&" : "?"}dl=1`
      : src;

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
          src={source}
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
          className={className}
        />
      )}
    </div>
  );
};

export default CustomLoadingImage;

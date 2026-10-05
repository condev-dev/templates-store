"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import Skeleton from "react-loading-skeleton";
import "./index.css";

// Every template picture goes through this one component, so routing it through the image
// optimiser is what makes the whole site light: the optimiser fetches the 1920px original once,
// re-encodes it at the width the picture is actually drawn at, and caches that small variant.
// Before this the browser was handed the full original for a card only ~300px wide, which made
// the home page pull about 4MB of images.
//
// `sizes` is how the optimiser knows that width. The default suits a card in a three column grid;
// anything drawn wider (the big picture on a template page) must pass its own value.
// `quality` and `priority` are passed straight through.
const CustomLoadingImage = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  sizes = "(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw",
  quality = 75,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const boxRef = useRef(null);

  // postimg hands out a tiny 60x180 thumbnail to any client that advertises webp support - which
  // is exactly what a browser does, and what the image optimiser does too. Appending ?dl=1 makes
  // it serve the real file instead, for every kind of client. Without this the optimiser would
  // "helpfully" resize a thumbnail and the cards would be blurry.
  const source =
    typeof src === "string" && src.includes("postimg.cc") && !src.includes("dl=1")
      ? `${src}${src.includes("?") ? "&" : "?"}dl=1`
      : src;

  // A cached picture can finish before React attaches its handlers, so the load event never
  // fires. Look the element up directly rather than relying on a ref to the inner <img>.
  useEffect(() => {
    const img = boxRef.current?.querySelector("img");
    if (img && img.complete && img.naturalWidth > 0) {
      setIsLoading(false);
    }
  }, [src]);

  return (
    <div
      ref={boxRef}
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

      {hasError || !source ? (
        <ImagePlaceholder />
      ) : (
        <Image
          src={source}
          alt={alt || ""}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          style={{
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

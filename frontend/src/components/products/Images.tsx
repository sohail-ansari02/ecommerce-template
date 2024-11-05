"use client";

import Image, { ImageLoader } from "next/image";
import React, { useState } from "react";

import { Skeleton } from "../ui/skeleton";

const cloudinaryLoader: ImageLoader = ({ src, width, quality }) => {
  const params = [
    "f_auto",
    "c_limit",
    "w_" + width,
    "q_" + (quality || "auto"),
  ];
  const normalizeSrc = (src: string) => (src[0] === "/" ? src.slice(1) : src);

  return src;
  return `https://res.cloudinary.com/${
    process.env.CLOUDINARY_CLOUD_NAME
  }/image/upload/${params.join(",")}/${normalizeSrc(src)}`;
};

export const Images = ({
  image,
  name,
  width,
  height,
  priority,
  sizes,
}: {
  image: [string];
  name: string;
  width: number;
  height: number;
  priority: boolean;
  sizes: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoadComplete = () => {
    setImageLoaded(true);
  };

  return (
    <div className={!imageLoaded ? "relative" : ""}>
      {/* sizes={sizes} */}
      <Image
        loader={cloudinaryLoader}
        width={width}
        height={height}
        alt={name}
        src={image[0]}
        priority={priority}
        className="w-full max-w-img aspect-[2/3] brightness-90"
        onLoad={handleImageLoadComplete}
        />
      <div
        className={
          !imageLoaded
            ? "absolute top-0 right-0 w-full aspect-[2/3] bg-black"
            : "hidden"
        }
      >
        <Skeleton className="w-full aspect-[2/3] rounded-b-none" />
      </div>
    </div>
  );
};

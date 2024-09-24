"use client";

import clsx from "clsx";
import { ImageProps } from "next/image";
import { useState } from "react";
import Image from "next/image";

type CustomImageProps = {
  parentClass?: string;
} & ImageProps;

export function CustomImage(props: CustomImageProps) {
  const { src, alt, className, parentClass, ...rest } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div
      className={clsx(
        "overflow-hidden",
        isLoading ? "animate-pulse" : "",
        parentClass
      )}>
      <Image
        className={clsx(
          "duration-150 ease-in-out",
          isLoading ? "scale-[1.02] blur-xl" : "scale-100 blur-0",
          className
        )}
        src={src}
        alt={alt}
        loading="lazy"
        quality={100}
        onLoad={() => setIsLoading(false)}
        {...rest}
      />
    </div>
  );
}

import React from "react";
import Image, { ImageProps } from "next/image";

type CountryImageProps = {
  name?: string;
  src?: string;
  alt?: string;
} & Omit<ImageProps, "src" | "alt">;

function CountryFlag({ name, src, alt = "", ...props }: CountryImageProps) {
  return (
    <Image
      width={48}
      height={48}
      src={
        src ??
        `https://static.esimplus.net/storage/flags/${name?.toLowerCase()}.svg`
      }
      {...props}
      alt={alt}
    />
  );
}

export { CountryFlag };

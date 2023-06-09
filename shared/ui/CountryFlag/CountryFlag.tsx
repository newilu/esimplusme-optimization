import React from "react";
import Image, { ImageProps } from "next/image";

type CountryImageProps = {
  name?: string;
  src?: string;
  alt?: string;
  borderRadius?: number;
} & Omit<ImageProps, "src" | "alt">;

function CountryFlag({
  name,
  src,
  alt = "",
  width = 48,
  height = 30,
  borderRadius = 5,
  ...props
}: CountryImageProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius,
        overflow: "hidden",
        width,
        height,
      }}
    >
      <Image
        width={width}
        height={width}
        src={
          src ??
          `https://static.esimplus.net/storage/flags/${name?.toLowerCase()}.svg`
        }
        {...props}
        alt={alt}
      />
    </div>
  );
}

export { CountryFlag };

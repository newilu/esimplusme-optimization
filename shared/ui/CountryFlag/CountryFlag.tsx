import React from "react";
import { Wrapper } from "./styled";

type CountryImageProps = {
  name?: string;
  src?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
};

function CountryFlag({
  name,
  src,
  width = 48,
  height = 30,
  borderRadius = 5,
}: CountryImageProps) {
  return (
    <Wrapper
      style={{
        borderRadius,
        width,
        height,
        flex: `0 0 ${width}px`,
      }}
      src={
        src ??
        `https://static.esimplus.net/storage/flags/${name?.toLowerCase()}.svg`
      }
    />
  );
}

export { CountryFlag };

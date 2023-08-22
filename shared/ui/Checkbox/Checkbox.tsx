import React from "react";
import CheckmarkSvg from "@/shared/assets/images/CheckmarkSVG";
import { Wrapper } from "./styled";

function Checkbox({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Wrapper checked={value}>
      {value && <CheckmarkSvg />}
      <input type="checkbox" onChange={onChange} />
    </Wrapper>
  );
}

export { Checkbox };

import React from "react";
import CheckboxIcon from "@/shared/assets/images/CheckboxIcon";
import { Wrapper } from "./styled";

type Props = {
  checked: boolean;
  id?: string;
  color?: string;
  type?: "checkbox" | "radio";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Checkbox({
  checked,
  onChange,
  id,
  color = "#0076FF",
  type = "checkbox",
}: Props) {
  return (
    <Wrapper checked={checked} $color={color}>
      {checked && <CheckboxIcon />}
      <input id={id} name={id} type={type} onChange={onChange} />
    </Wrapper>
  );
}

export { Checkbox };

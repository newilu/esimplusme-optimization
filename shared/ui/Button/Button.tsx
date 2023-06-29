import React from "react";
import { Wrapper } from "./styled";

export type ButtonProps<As extends string | undefined = "button"> =
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    label: React.ReactNode;
    variant?: "secondary" | "outlined" | "dark" | "thick-secondary";
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
    as?: As;
  } & (As extends "a" ? { href: Required<string> } : {});

function ButtonInner<T extends string | undefined>(
  { label, variant = "secondary", fullWidth, as, ...props }: ButtonProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <Wrapper
      as={as}
      ref={ref as any}
      variant={variant}
      fullWidth={fullWidth}
      {...props}
    >
      {label}
    </Wrapper>
  );
}

const Button = React.forwardRef(ButtonInner) as <T extends string | undefined>(
  props: ButtonProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => ReturnType<typeof ButtonInner>;

export { Button };

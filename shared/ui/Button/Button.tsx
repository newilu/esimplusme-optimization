import React from "react";
import { Wrapper } from "./styled";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: React.ReactNode;
  variant?: "secondary" | "outlined" | "dark" | "thick-secondary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, variant = "secondary", fullWidth, ...props }, ref) => {
    return (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      <Wrapper
        ref={ref as any}
        variant={variant}
        fullWidth={fullWidth}
        {...props}
      >
        {label}
      </Wrapper>
    );
  }
);

export { Button };

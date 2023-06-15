import React from "react";
import { Wrapper } from "./styled";

type BreadcrumbsProps = {
  children?: React.ReactNode | React.ReactNode[];
} & Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
>;

function Breadcrumbs({ children, ...props }: BreadcrumbsProps) {
  return <Wrapper {...props}>{children}</Wrapper>;
}

export { Breadcrumbs, type BreadcrumbsProps };

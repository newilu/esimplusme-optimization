import React from "react";
import { Wrapper } from "./styled";

type BreadcrumbsProps = {
  children?: React.ReactNode | React.ReactNode[];
} & Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
>;

function Breadcrumbs({ children, ...props }: BreadcrumbsProps) {
  return (
    <Wrapper {...props}>
      {React.Children.toArray(children).map((child, index, childNodes) => {
        if (React.isValidElement(child) && index === childNodes.length - 1) {
          const { href, ...rest } = child.props;
          return React.createElement(
            "div",
            { ...rest, key: child.key },
            child.props.children
          );
        }
        return child;
      })}
    </Wrapper>
  );
}

export { Breadcrumbs, type BreadcrumbsProps };

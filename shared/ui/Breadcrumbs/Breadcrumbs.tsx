import React, { Children, Fragment, createElement, isValidElement } from "react";
import { Wrapper, Slash } from "./styled";

type BreadcrumbsProps = {
  children?: React.ReactNode | React.ReactNode[];
} & Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
>;

function Breadcrumbs({ children, ...props }: BreadcrumbsProps) {
  return (
    <Wrapper {...props}>
      {Children.toArray(children).map((child, index, childNodes) => {
        if(!isValidElement(child)) {
          return null
        }

        if (index === childNodes.length - 1) {
          const { href, ...rest } = child.props;
          return createElement(
            "div",
            { ...rest, key: child.key },
            child.props.children
          );
        }
        
        return (
          <Fragment key={child.key}>
            {child}
            <Slash>/</Slash>
          </Fragment>
        );
      })}
    </Wrapper>
  );
}

export { Breadcrumbs, type BreadcrumbsProps };

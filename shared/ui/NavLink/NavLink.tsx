import React from "react";
import { useRouter } from "next/router";
import { LinkProps } from "next/link";
import { Wrapper } from "./styled";

type NavLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  React.PropsWithChildren<LinkProps> & {
    activeClassName?: string;
    exact?: boolean;
    as?: any;
  };

export const NavLink = ({ children, exact, ...props }: NavLinkProps) => {
  const { asPath, pathname } = useRouter();

  const isActive = exact
    ? pathname === props.href || asPath === props.as
    : asPath.includes(props.href.toString());

  return (
    <Wrapper $isActive={isActive} {...props}>
      {children}
    </Wrapper>
  );
};

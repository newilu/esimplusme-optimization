import React from "react";
import { Container } from "../styled";
import { Wrapper } from "./styled";

function Index({
  children,
  ref,
  ...props
}: {
  children?: string | React.ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <Wrapper {...props}>
      <Container>{children}</Container>
    </Wrapper>
  );
}

export default Index;

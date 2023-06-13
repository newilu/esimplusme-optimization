import React from "react";
import { Container } from "../styled";
import { Wrapper } from "./styled";

function Index({
  children,
  ...props
}: {
  children?: string | React.ReactNode;
}) {
  return (
    <Wrapper {...props}>
      <Container>{children}</Container>
    </Wrapper>
  );
}

export default Index;

import React from "react";
import { Wrapper } from "./styled";

function Index({ children }: { children?: string | React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

export default Index;

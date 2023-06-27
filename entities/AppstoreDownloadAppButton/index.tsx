import React from "react";
import Image from "next/image";
import { APPSTORE_LINK } from "@/shared/constants";
import appstore from "./assets/appstore.svg";
import { Wrapper } from "./styled";

function Index({ onClick }: { onClick?: () => void }) {
  return (
    <Wrapper
      onClick={onClick}
      target="_blank"
      rel="noreferrer"
      href={APPSTORE_LINK}
    >
      <Image src={appstore} alt="" />
    </Wrapper>
  );
}

export default Index;

import React from "react";
import Image from "next/image";
import { GPLAY_LINK } from "@/shared/constants";
import gplay from "./assets/gplay.svg";
import { Wrapper } from "./styled";

function Index({ onClick }: { onClick?: () => void }) {
  return (
    <Wrapper
      onClick={onClick}
      target="_blank"
      rel="noreferrer"
      href={GPLAY_LINK}
    >
      <Image src={gplay} alt="" />
    </Wrapper>
  );
}

export default Index;

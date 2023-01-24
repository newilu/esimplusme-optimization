import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "public/staticfiles/logo.png";
import { Wrapper } from "./styled";

function Logo({ color, ...props }: { color?: string }) {
  return (
    <Wrapper style={{ color }} {...props}>
      <Link href="/">
        <Image width={36} height={30} src={logo} alt="logo" />
        <div>
          <div>
            <div>eSIM</div>
            <div>Plus</div>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
}

export { Logo };

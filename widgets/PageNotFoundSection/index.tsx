import React from "react";
import { useTheme } from "styled-components";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import notFound from "./assets/404.png";
import notFoundDark from "./assets/404-dark.png";
import { Wrapper } from "./styled";

function PageNotFoundSection() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Image
        width={550}
        height={200}
        src={(theme as any).name === "dark" ? notFoundDark : notFound}
        alt="page not found"
      />
      <h1>{t("page_not_found")}</h1>
      <p>{t("this_is_not_the_web_page_u_r_looking_for")}</p>
    </Wrapper>
  );
}

export default PageNotFoundSection;

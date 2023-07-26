import React from "react";
import { useTranslation } from "next-i18next";
import { Container } from "shared/ui/styled";
import { Wrapper } from "./styled";
import { sendSafeGtagEvent } from "@/utils/common";

function GetFreeNumberSection() {
  const { t } = useTranslation();

  return (
    <Container>
      <Wrapper>
        <div>
          <h2>{t("get_a_number_for_free")}</h2>
          <p>{t("we_give_the_opportunity_to_connect_number_for_free")}</p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              sendSafeGtagEvent("virtualnumber_free_click")
              if (typeof window !== "undefined") {
                window.open("https://sms.esimplus.me/");
              }
            }}
          >
            {t("i_want_free_number")}
          </button>
        </div>
      </Wrapper>
    </Container>
  );
}

export { GetFreeNumberSection };

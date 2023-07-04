import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { SecondPhoneCountry } from "@/utils/types";
import PopularCountriesTable from "@/entities/PopularCountriesTable";
import { Paragraph } from "@/shared/ui/styled";
import search from "./assets/search.svg";
import { Wrapper } from "./styled";

type NoNumbersAvailableViewProps = {
  countries: SecondPhoneCountry[];
};

function NoNumbersAvailableView({ countries }: NoNumbersAvailableViewProps) {
  return (
    <Wrapper>
      <div>
        <Image width={120} height={100} src={search} alt="" />
        <Paragraph>
          We&apos;re sorry, there are currently no available numbers. Feel free
          to check back later, select a different country or region, or{" "}
          <Link href="mailto:ask.esimplus@appvillis.com" target="_blank">
            Request Number
          </Link>{" "}
          to notify us about your preference. Your patience and understanding
          are greatly appreciated!
        </Paragraph>
      </div>
      <div>
        <PopularCountriesTable countries={countries} />
      </div>
    </Wrapper>
  );
}

export { NoNumbersAvailableView, type NoNumbersAvailableViewProps };

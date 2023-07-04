import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { ICountry } from "country-cities";
import Link from "next/link";
import styled from "styled-components";
import Navbar from "@/widgets/Navbar";
import { COUNTRY_LIST } from "@/shared/constants";
import { formatStringToKebabCase, generateMeta } from "@/shared/lib";
import { PhoneToBuy } from "@/utils/types";
import api from "@/api";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import BaseHeader from "@/shared/ui/BaseHeader";
import { PanelSection, PanelSectionTitle } from "@/shared/ui/styled";
import PhoneNumberPurchase from "@/features/PhoneNumberPurchase";
import PhoneNumbersTable from "@/features/PhoneNumbersTable";
import { Wrapper as TableWrapper } from "@/shared/ui/BaseTable/styled";
import Button from "@/shared/ui/Button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Head from "next/head";

type PageProps = { country: ICountry; phones: PhoneToBuy[] };

const PhoneNumberTypesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
  padding: 0 20px 20px 20px;
  justify-content: center;

  button {
    max-width: 80px;
    flex: 1 1 80px;
  }
`;

const SectionsWrapper = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 45% 55%;
  max-width: 900px;
  margin: 0 auto;

  ${PanelSection} {
    max-width: unset;
    width: 100%;
    margin: 0;
  }
  > ${PanelSection}:first-child {
    grid-column-start: 1;
    grid-column-end: 3;
    border-radius: 25px 25px 5px 5px;
    background: ${(props) => props.theme.translucentCardsBg};
  }

  > ${PanelSection}:nth-child(2) {
    border-radius: 5px 5px 5px 25px;
  }
  > ${PanelSection}:nth-child(3) {
    border-radius: 5px 5px 25px 5px;
  }

  @media (min-width: 769px) {
    ${PanelSection}:nth-child(2) {
      ${TableWrapper} {
        height: 100%;
        > div {
          max-height: unset !important;
          position: absolute;
          height: 100%;
          width: 100%;
        }
      }
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    ${PanelSection}:nth-child(2) {
      border-radius: 5px;
    }
    ${PanelSection}:last-child {
      border-radius: 5px 5px 25px 25px;
    }
  }
`;

function Index({ country, phones }: PageProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation("virtual-phone-number");
  const [selectedPhone, setSelectedPhone] = React.useState(
    phones.length ? phones[0] : null
  );
  const [selectedNumbersType, setSelectedNumbersType] = React.useState<
    string | null
  >(null);

  const phoneNumberTypes = React.useMemo(
    () =>
      phones.reduce<string[]>(
        (acc, cur) =>
          acc.includes(cur.numberType) ? acc : [...acc, cur.numberType],
        []
      ),
    [phones]
  );

  const filteredNumbers = React.useMemo(
    () =>
      phones.filter(({ numberType }) =>
        selectedNumbersType ? numberType === selectedNumbersType : true
      ),
    [phones, selectedNumbersType]
  );

  const handlePhoneNumberPurchase = async () => {
    if (!selectedPhone) return;

    const params = new URLSearchParams({
      paymentAmount: String((selectedPhone.price + 1) * 100),
      phoneNumber: selectedPhone.phoneNumber,
      country: country.isoCode,
    });

    await router.push(
      `/virtual-phone-number/payment/provider-select?${params.toString()}`
    );
  };

  const meta = React.useMemo(
    () =>
      generateMeta({
        language: i18n.language,
        description: t("meta:virtual_numbers_by_country_description", {
          country: country.name,
        }),
        title: t("meta:virtual_numbers_by_country_title", {
          country: country.name,
        }),
        asPath: router.asPath,
      }),
    [router.asPath, country.name, i18n.language, t]
  );

  return (
    <>
      <Head>{meta}</Head>
      <Navbar />
      <BaseHeader>
        <h1>
          {t("phone_numbers_by_country_mobile_title", {
            country: country.name,
          })}
        </h1>
        <Breadcrumbs style={{ margin: "20px 0" }}>
          <Link href="/virtual-phone-number">{t("common:phone_number")}</Link>
          <Link href="/virtual-phone-number/pricing">
            {t("common:phone_number")}
          </Link>
          <Link
            href={`/virtual-phone-number/${formatStringToKebabCase(
              country.name
            )}`}
          >
            {country.isoCode}
          </Link>
        </Breadcrumbs>
        <SectionsWrapper>
          <PanelSection>
            <PanelSectionTitle>{t("select_phone_number")}</PanelSectionTitle>
            <PhoneNumberTypesWrapper>
              <Button
                size="small"
                label="All"
                variant={selectedNumbersType === null ? "secondary" : "dark"}
                onClick={() => setSelectedNumbersType(null)}
              />
              {phoneNumberTypes.map((el) => (
                <Button
                  key={el}
                  size="small"
                  label={el}
                  variant={selectedNumbersType === el ? "secondary" : "dark"}
                  onClick={() => setSelectedNumbersType(el)}
                />
              ))}
            </PhoneNumberTypesWrapper>
          </PanelSection>{" "}
          <PanelSection style={{ paddingTop: 25 }}>
            <PhoneNumbersTable
              phones={filteredNumbers}
              onRowClick={setSelectedPhone}
            />
          </PanelSection>{" "}
          <PanelSection>
            {selectedPhone && (
              <PhoneNumberPurchase
                onSubmit={handlePhoneNumberPurchase}
                country={country}
                phone={selectedPhone}
              />
            )}
          </PanelSection>
        </SectionsWrapper>
      </BaseHeader>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  locale,
  params,
}) => {
  const { country } = params ?? {};
  if (typeof country !== "string") {
    return {
      redirect: {
        destination: "/virtual-phone-number/pricing",
        statusCode: 301,
      },
    };
  }

  const currentCountry = COUNTRY_LIST.find((el) =>
    country.includes(formatStringToKebabCase(el.name))
  );

  if (!currentCountry) {
    return {
      redirect: {
        destination: "/virtual-phone-number/pricing",
        statusCode: 301,
      },
    };
  }

  const { data } = await api.secondPhone.getPhonesByCountry(
    currentCountry.isoCode
  );

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "virtual-phone-number",
        "meta",
      ])),
      country: currentCountry,
      phones: data?.data.phones ?? [],
    },
  };
};

export default Index;

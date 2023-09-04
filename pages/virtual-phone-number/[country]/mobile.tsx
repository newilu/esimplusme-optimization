import React from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { ICountry } from 'country-cities';
import Link from 'next/link';
import styled from 'styled-components';
import Navbar from '@/widgets/Navbar';
import { COUNTRY_LIST, SECOND_PHONE_SUPPORTED_COUNTRIES } from '@/shared/constants';
import {
  formatAreaCode,
  formatStringToKebabCase,
  generateMeta,
  generateSecondPhonesList,
  scrollToId,
} from '@/shared/lib';
import { PhoneToBuy, SecondPhoneCountry } from '@/utils/types';
import api from '@/api';
import Breadcrumbs from '@/shared/ui/Breadcrumbs';
import BaseHeader from '@/shared/ui/BaseHeader';
import { PanelSection, PanelSectionTitle } from '@/shared/ui/styled';
import PhoneNumberPurchase from '@/features/PhoneNumberPurchase';
import PhoneNumbersTable from '@/features/PhoneNumbersTable';
import { Wrapper as TableWrapper } from '@/shared/ui/BaseTable/styled';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useWindowSize } from '@/context/WindowSizeContext';
import MobileNumberFaq from '@/features/MobileNumberFaq';
import Footer from '@/components/Footer';
import WhyDoYouNeedMobileNumber from '@/features/WhyDoYouNeedMobileNumber';
import { NoNumbersAvailableView } from '@/features/NoNumbersAvailableView/NoNumbersAvailableView';
import { useSecondPhoneCountries } from '@/shared/hooks';
import { format } from 'libphonenumber-js';
import { Cacheable } from '@/lib/redis';

type PageProps = {
  country: ICountry;
  phones: PhoneToBuy[];
  popularCountries: SecondPhoneCountry[];
};

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

function Index({ country, phones, popularCountries }: PageProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation('virtual-phone-number');
  const { isMobile } = useWindowSize();
  const secondPhoneCountries = useSecondPhoneCountries({
    initCountryList: popularCountries,
  });

  const [selectedPhone, setSelectedPhone] = React.useState(phones[0]);

  const areaCode =
    (country.isoCode === 'US' || country.isoCode === 'CA') && phones[0]
      ? format(phones[0].phoneNumber, 'INTERNATIONAL').slice(0, 6).replaceAll(' ', '-')
      : formatAreaCode(country.phonecode);

  const purchaseSectionId = React.useId();

  const meta = React.useMemo(
    () =>
      generateMeta({
        language: i18n.language,
        description: t('meta:virtual_numbers_by_country_mobile_description', {
          country: country.name,
        }),
        title: t('meta:virtual_numbers_by_country_mobile_title', {
          country: country.name,
          areaCode,
        }),
        asPath: router.asPath,
        supportedLangs: ['en'],
      }),
    [router.asPath, country.name, i18n.language, t, areaCode]
  );

  return (
    <>
      <Head>{meta}</Head>
      <Navbar />
      <BaseHeader>
        <h1>
          {t('phone_numbers_by_country_mobile_title', {
            country: country.name,
            areaCode,
          })}
        </h1>
        <Breadcrumbs style={{ margin: '20px 0' }}>
          <Link href="/">{t('common:home')}</Link>
          <Link href="/virtual-phone-number/pricing">{t('common:phone_number')}</Link>
          <Link href={`/virtual-phone-number/${formatStringToKebabCase(country.name)}`}>{country.name}</Link>
          <Link href="/mock">Mobile</Link>
        </Breadcrumbs>
        {phones.length > 0 ? (
          <SectionsWrapper>
            <PanelSection>
              <PanelSectionTitle>{t('select_phone_number')}</PanelSectionTitle>
            </PanelSection>{' '}
            <PanelSection style={{ paddingTop: 25 }}>
              <PhoneNumbersTable
                phones={phones}
                onRowClick={(phone) => {
                  if (isMobile) {
                    scrollToId(purchaseSectionId, 80);
                  }
                  setSelectedPhone(phone);
                }}
              />
            </PanelSection>{' '}
            <PanelSection id={purchaseSectionId}>
              {selectedPhone && <PhoneNumberPurchase isNumberOfMobileType country={country} phone={selectedPhone} />}
            </PanelSection>
          </SectionsWrapper>
        ) : (
          <PanelSection>
            <NoNumbersAvailableView countries={secondPhoneCountries} />
          </PanelSection>
        )}
      </BaseHeader>
      <WhyDoYouNeedMobileNumber country={country} />
      <MobileNumberFaq />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ locale, params, res }) => {
  res.setHeader('Cache-Control', `public, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 60}`);

  const { country } = params ?? {};
  if (typeof country !== 'string') {
    return {
      redirect: {
        destination: '/virtual-phone-number/pricing',
        statusCode: 301,
      },
    };
  }

  const currentCountry = COUNTRY_LIST.find((el) => country === formatStringToKebabCase(el.name));

  if (!currentCountry) {
    return {
      redirect: {
        destination: '/virtual-phone-number/pricing',
        statusCode: 301,
      },
    };
  }

  const { data } = await Cacheable(api.secondPhone.getPhonesByCountry)(currentCountry.isoCode);

  const { data: secondPhoneCountries } = await Cacheable(api.secondPhone.listSecondPhoneCountries)();

  const phones = data?.data.phones.length
    ? data.data.phones
    : SECOND_PHONE_SUPPORTED_COUNTRIES.includes(currentCountry.isoCode)
    ? generateSecondPhonesList({ countryIso: currentCountry.isoCode })
    : [];

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'virtual-phone-number', 'meta'])),
      country: currentCountry,
      phones,
      popularCountries: secondPhoneCountries ?? [],
    },
  };
};

export default Index;

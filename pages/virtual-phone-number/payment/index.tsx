import React from 'react';
import type { ICountry, IState } from 'country-cities';
import type { GetServerSideProps } from 'next';
import type { PhoneToBuy, SecondPhoneCountry } from '@/utils/types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import api from '@/api';
import Navbar from '@/widgets/Navbar';
import { COUNTRY_LIST, SECOND_PHONE_SUPPORTED_COUNTRIES } from '@/shared/constants';
import { formatStringToKebabCase, generateMeta, generateSecondPhonesList, getStatesByCountryCode } from '@/shared/lib';
import PhoneNumberPurchaseHeader from '@/widgets/PhoneNumberPurchaseHeader';
import DownloadAppSection from '@/features/DownloadAppSection';
import Footer from '@/components/Footer';
import NoNumbersAvailableView from '@/features/NoNumbersAvailableView';
import BaseHeader from '@/shared/ui/BaseHeader';
import { PanelSection } from '@/shared/ui/styled';
import { useSecondPhoneCountries } from '@/shared/hooks';
import { Cacheable } from '@/lib/redis';

type PageProps = {
  phones: PhoneToBuy[] | null;
  countries: SecondPhoneCountry[];
  country: ICountry | null;
  state: IState | null;
  phone: PhoneToBuy | null;
  randomGeneratedPhones: PhoneToBuy[];
};

function Index({ country, state, phones, phone, countries, randomGeneratedPhones }: PageProps) {
  const { asPath } = useRouter();
  const { t, i18n } = useTranslation('virtual-phone-number');
  const secondPhoneCountries = useSecondPhoneCountries({
    initCountryList: countries,
  });

  const meta = generateMeta({
    language: i18n.language,
    title: t('meta:payment_title'),
    description: t('meta:payment_description'),
    asPath,
    supportedLangs: ['en'],
  });

  return (
    <>
      <Head>{meta}</Head>
      <Navbar />
      {phones && country ? (
        <PhoneNumberPurchaseHeader
          phone={phone}
          state={state}
          phones={phones}
          country={country}
          countries={secondPhoneCountries}
          randomGeneratedPhones={randomGeneratedPhones}
        />
      ) : (
        <BaseHeader>
          <PanelSection>
            <NoNumbersAvailableView phones={randomGeneratedPhones} />
          </PanelSection>
        </BaseHeader>
      )}
      <DownloadAppSection />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ locale, query }) => {
  const { country, state, phone } = query;

  const { data: secondPhoneCountries } = await Cacheable(api.secondPhone.listSecondPhoneCountries)();

  const countries = secondPhoneCountries ?? [];

  if (typeof country !== 'string') {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common', 'virtual-phone-number', 'meta'])),
        country: null,
        phone: null,
        countries,
        state: null,
        phones: null,
        randomGeneratedPhones: [],
      },
    };
  }

  const currentCountry = COUNTRY_LIST.find((el) => country === formatStringToKebabCase(el.name));

  const currentState =
    getStatesByCountryCode(currentCountry?.isoCode ?? '').find((el) => state === formatStringToKebabCase(el.name)) ??
    null;

  if (!currentCountry) {
    return {
      redirect: {
        destination: '/virtual-phone-number/pricing',
        statusCode: 301,
      },
    };
  }

  if (currentCountry.isoCode === 'US' && currentState) {
    let selectedPhone: PhoneToBuy | null = null;
    let phones: PhoneToBuy[] = [];

    const { data: phonesByStateDataRaw } = await Cacheable(api.secondPhone.getAvailableNumbersByStateISO)(
      currentState.isoCode
    );

    phones = phonesByStateDataRaw?.data.phones.length
      ? phonesByStateDataRaw.data.phones
      : generateSecondPhonesList({
          countryIso: currentCountry.isoCode,
          stateIso: currentState.isoCode,
        });

    const selectedPhoneFromStatePhones = phones.find((_phone) => _phone.phoneNumber === phone);

    if (!selectedPhoneFromStatePhones) {
      selectedPhone = phones[0] ?? null;
    }

    if (!selectedPhone) {
      return {
        redirect: {
          destination: '/virtual-phone-number/pricing',
          statusCode: 301,
        },
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common', 'virtual-phone-number', 'meta'])),
        phones,
        phone: selectedPhone,
        country: currentCountry,
        state: currentState,
        countries,
        randomGeneratedPhones: !phones.length
          ? SECOND_PHONE_SUPPORTED_COUNTRIES.map((el) => generateSecondPhonesList({ countryIso: el, amount: 3 })).flat()
          : [],
      },
    };
  }

  const { data } = await Cacheable(api.secondPhone.getPhonesByCountry)(currentCountry.isoCode);

  const countryPhones = data?.data.phones.length
    ? data.data.phones
    : generateSecondPhonesList({
        countryIso: currentCountry.isoCode,
      });

  const selectedPhone = countryPhones.find((_phone) => _phone.phoneNumber === phone) ?? countryPhones[0] ?? null;

  const filteredPhones = countryPhones.filter((_phone) =>
    currentState ? _phone.region === currentState?.isoCode : true
  );

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'virtual-phone-number', 'meta'])),
      phones: filteredPhones,
      country: currentCountry,
      state: currentState,
      phone: selectedPhone,
      countries,
      randomGeneratedPhones: !filteredPhones.length
        ? SECOND_PHONE_SUPPORTED_COUNTRIES.map((el) => generateSecondPhonesList({ countryIso: el, amount: 3 })).flat()
        : [],
    },
  };
};

export default Index;

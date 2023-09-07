import React from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ICity, ICountry, IState } from 'country-cities';
import { format } from 'libphonenumber-js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { PhoneToBuy } from '@/utils/types';
import api from '@/api';
import Navbar from '@/widgets/Navbar';
import PhoneNumbersByRegion from '@/widgets/PhoneNumbersByRegion';
import {
  formatAreaCode,
  formatStringFromKebabToTileCase,
  formatStringToKebabCase,
  generateMeta,
  generateSecondPhonesList,
  getCitiesByStateCode,
  getStatesByCountryCode,
  getUSStateInfoByStateName,
  removeExcludedWords,
} from '@/shared/lib';
import { COUNTRY_LIST, SECOND_PHONE_SUPPORTED_COUNTRIES, STATE_NAME_DEPRECATED_WORDS } from '@/shared/constants';
import DownloadAppSection from '@/features/DownloadAppSection';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import WhyDoYouNeedPhoneNumberInRegion from '@/features/WhyDoYouNeedPhoneNumberInRegion';
import { Cacheable } from '@/lib/redis';

type PhoneNumberStatePageProps = {
  phones: PhoneToBuy[];
  country: ICountry;
  state: IState;
  cities: ICity[];
  phoneNumber: PhoneToBuy | null;
  randomGeneratedPhones: PhoneToBuy[];
};

function Index({ phones, country, state, cities, phoneNumber, randomGeneratedPhones }: PhoneNumberStatePageProps) {
  const { asPath } = useRouter();
  const { t, i18n } = useTranslation('meta');

  const areaCode =
    (country.isoCode === 'US' || country.isoCode === 'CA') && phones[0]
      ? format(phones[0].phoneNumber, 'INTERNATIONAL').slice(0, 6).replaceAll(' ', '-')
      : formatAreaCode(country.phonecode);

  const meta = generateMeta({
    language: i18n.language,
    description: t('virtual_numbers_by_state_description', {
      state: state.name,
      stateIso: state.isoCode,
      areaCode,
    }),
    title: t('virtual_numbers_by_state_title', {
      country: country.name,
      state: state.name,
      stateIso: state.isoCode,
      areaCode,
    }),
    asPath,
    supportedLangs: ['en'],
  });

  return (
    <>
      <Head>{meta}</Head>
      <Navbar />
      <PhoneNumbersByRegion
        phones={phones}
        cities={cities}
        country={country}
        state={state}
        areaCode={areaCode}
        phoneNumber={phoneNumber}
        randomGeneratedPhones={randomGeneratedPhones}
      />
      <WhyDoYouNeedPhoneNumberInRegion regionName={state.name} />
      <DownloadAppSection />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<PhoneNumberStatePageProps> = async ({ locale, params }) => {
  const { country, state, phone } = params ?? {};

  if (typeof country !== 'string' || typeof state !== 'string') {
    return {
      redirect: {
        destination: '/virtual-phone-number/pricing',
        statusCode: 301,
      },
    };
  }

  const currentCountry = COUNTRY_LIST.find((el) => country === formatStringToKebabCase(el.name));

  let currentState: IState | undefined;

  if (currentCountry?.isoCode === 'US') {
    const stateFromLocalJSON = getUSStateInfoByStateName(formatStringFromKebabToTileCase(state));

    currentState = {
      isoCode: stateFromLocalJSON.isoCode,
      countryCode: 'US',
      name: stateFromLocalJSON.name,
      latitude: null,
      longitude: null,
    };
  } else {
    currentState = getStatesByCountryCode(currentCountry?.isoCode ?? '').find(
      (el) => formatStringToKebabCase(removeExcludedWords(el.name, STATE_NAME_DEPRECATED_WORDS)) === state
    );
  }

  if (!currentCountry || !currentState) {
    return {
      redirect: {
        destination: '/virtual-phone-number/pricing',
        statusCode: 301,
      },
    };
  }

  const cities = getCitiesByStateCode(currentState.isoCode, currentCountry.isoCode);

  if (currentCountry.isoCode === 'US') {
    const { data: phonesByStateUS } = await Cacheable(api.secondPhone.getAvailableNumbersByStateIso)(
      currentState.isoCode
    );

    const phones = phonesByStateUS?.data.phones.length
      ? phonesByStateUS.data.phones
      : generateSecondPhonesList({
          countryIso: currentCountry.isoCode,
          stateIso: currentState.isoCode,
        });

    const phoneNumber = phone ? phones.find((el) => el.phoneNumber === phone) ?? phones[0] ?? null : null;

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common', 'virtual-phone-number', 'meta'])),
        phones,
        country: currentCountry,
        state: currentState,
        cities,
        phoneNumber,
        randomGeneratedPhones: !phones.length
          ? SECOND_PHONE_SUPPORTED_COUNTRIES.map((el) => generateSecondPhonesList({ countryIso: el, amount: 3 })).flat()
          : [],
      },
      revalidate: 3600,
    };
  }

  const { data: phonesByCountryDataRaw } = await api.secondPhone.getPhonesByCountry(currentCountry.isoCode);

  const countryPhones = phonesByCountryDataRaw?.data.phones.length
    ? phonesByCountryDataRaw.data.phones
    : SECOND_PHONE_SUPPORTED_COUNTRIES.includes(currentCountry.isoCode)
    ? generateSecondPhonesList({ countryIso: currentCountry.isoCode })
    : [];

  const filteredPhones = countryPhones.filter((_phone) => _phone.region === currentState?.isoCode);

  const phones = filteredPhones.length ? filteredPhones : countryPhones;

  const phoneNumber = phone ? phones.find((el) => el.phoneNumber === phone) ?? phones[0] ?? null : null;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'virtual-phone-number', 'meta'])),
      phones,
      country: currentCountry,
      state: currentState,
      cities,
      phoneNumber,
      randomGeneratedPhones: !phones.length
        ? SECOND_PHONE_SUPPORTED_COUNTRIES.map((el) => generateSecondPhonesList({ countryIso: el, amount: 3 })).flat()
        : [],
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = COUNTRY_LIST.flatMap((country) => {
    const countryName = formatStringToKebabCase(country.name);
    const states = getStatesByCountryCode(country.isoCode);

    if (!states.length) return [];

    return states.map((state) => ({
      params: {
        country: countryName,
        state: formatStringToKebabCase(removeExcludedWords(state.name, STATE_NAME_DEPRECATED_WORDS)),
      },
    }));
  });

  const uniquePaths = Array.from(new Set(paths.map((path) => JSON.stringify(path)))).map((pathStr) =>
    JSON.parse(pathStr)
  );

  return {
    paths: uniquePaths,
    fallback: 'blocking',
  };
};
export default Index;

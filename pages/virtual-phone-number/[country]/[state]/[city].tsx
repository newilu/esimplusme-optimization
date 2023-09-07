import React from 'react';
import type { ICity, ICountry, IState } from 'country-cities';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { PhoneToBuy, SecondPhoneCountry } from '@/utils/types';
import { format } from 'libphonenumber-js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import api from '@/api';
import Navbar from '@/widgets/Navbar';
import { COUNTRY_LIST, SECOND_PHONE_SUPPORTED_COUNTRIES, STATE_NAME_DEPRECATED_WORDS } from '@/shared/constants';
import WhyDoYouNeedPhoneNumber from '@/features/WhyDoYouNeedPhoneNumberInCity';
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
import PhoneNumbersByCity from '@/widgets/PhoneNumberPurchaseHeader';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useSecondPhoneCountries } from '@/shared/hooks';
import { Cacheable } from '@/lib/redis';

type PageProps = {
  phones: PhoneToBuy[];
  country: ICountry;
  state: IState;
  city: ICity;
  countries: SecondPhoneCountry[];
  randomGeneratedPhones: PhoneToBuy[];
};

function Index({ country, city, state, phones, countries, randomGeneratedPhones }: PageProps) {
  const { asPath } = useRouter();
  const { t, i18n } = useTranslation('meta');
  const secondPhoneCountries = useSecondPhoneCountries({
    initCountryList: countries,
  });

  const areaCode =
    (country.isoCode === 'US' || country.isoCode === 'CA') && phones[0]
      ? format(phones[0].phoneNumber, 'INTERNATIONAL').slice(0, 6).replaceAll(' ', '-')
      : formatAreaCode(country.phonecode);

  const meta = generateMeta({
    language: i18n.language,
    description: t('virtual_numbers_by_city_description', {
      stateISO: state.isoCode,
      city: city.name,
      areaCode,
    }),
    title: t('virtual_numbers_by_city_title', {
      stateISO: state.isoCode,
      city: city.name,
      areaCode,
    }),
    asPath,
    supportedLangs: ['en'],
  });

  return (
    <>
      <Head>{meta}</Head>
      <Navbar />
      <PhoneNumbersByCity
        city={city}
        state={state}
        phones={phones}
        country={country}
        countries={secondPhoneCountries}
        randomGeneratedPhones={randomGeneratedPhones}
      />
      <WhyDoYouNeedPhoneNumber cityName={city.name} />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale, params }) => {
  const { country, state, city } = params ?? {};

  if (typeof country !== 'string' || typeof state !== 'string' || typeof city !== 'string') {
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

  const currentCity = getCitiesByStateCode(currentState?.isoCode || '', currentCountry?.isoCode || '').find(
    (el) => city === formatStringToKebabCase(el.name)
  );

  if (!currentCountry || !currentState || !currentCity) {
    return {
      redirect: {
        destination: '/virtual-phone-number/pricing',
        statusCode: 301,
      },
    };
  }

  const { data: secondPhoneCountries } = await Cacheable(api.secondPhone.listSecondPhoneCountries)();

  const countries = secondPhoneCountries ?? [];

  if (currentCountry.isoCode === 'US') {
    const { data } = await Cacheable(api.secondPhone.getAvailableNumbersByStateISO)(currentState.isoCode);

    const phones =
      data?.data.phones ??
      generateSecondPhonesList({
        countryIso: currentCountry.isoCode,
        stateIso: currentState.isoCode,
      });

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common', 'virtual-phone-number', 'meta'])),
        phones,
        country: currentCountry,
        state: currentState,
        city: currentCity,
        countries,
        randomGeneratedPhones: !phones?.length
          ? SECOND_PHONE_SUPPORTED_COUNTRIES.map((el) => generateSecondPhonesList({ countryIso: el, amount: 3 })).flat()
          : [],
        revalidate: 3600,
      },
    };
  }

  const { data } = await api.secondPhone.getPhonesByCountry(currentCountry.isoCode);

  const countryPhones = data?.data.phones.length
    ? data.data.phones
    : SECOND_PHONE_SUPPORTED_COUNTRIES.includes(currentCountry.isoCode)
    ? generateSecondPhonesList({ countryIso: currentCountry.isoCode })
    : [];

  const filteredPhones = countryPhones.filter((_phone) => _phone.region === currentState?.isoCode);
  const phones = filteredPhones.length ? filteredPhones : countryPhones;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'virtual-phone-number', 'meta'])),
      phones,
      country: currentCountry,
      state: currentState,
      city: currentCity,
      countries,
      randomGeneratedPhones: !phones?.length
        ? SECOND_PHONE_SUPPORTED_COUNTRIES.map((el) => generateSecondPhonesList({ countryIso: el, amount: 3 })).flat()
        : [],
      revalidate: 3600,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = COUNTRY_LIST.flatMap((country) => {
    const countryName = formatStringToKebabCase(country.name);
    const states = getStatesByCountryCode(country.isoCode);

    if (!states.length) return [];

    return states.flatMap((state) => {
      const stateName = formatStringToKebabCase(removeExcludedWords(state.name, STATE_NAME_DEPRECATED_WORDS));
      const cities = getCitiesByStateCode(state.isoCode, country.isoCode);

      if (!cities.length) return [];

      return cities.map((city) => ({
        params: {
          country: countryName,
          state: stateName,
          city: formatStringToKebabCase(city.name),
        },
      }));
    });
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

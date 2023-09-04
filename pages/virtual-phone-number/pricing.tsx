import React from 'react';
import type { ICountry } from 'country-cities';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import api from '@/api';
import Footer from '@/components/Footer';
import PhoneNumbersRates from '@/widgets/PhoneNumberRates';
import Navbar from '@/widgets/Navbar';
import DownloadAppSection from '@/features/DownloadAppSection';
import { SecondPhoneCountry } from '@/utils/types';
import { COUNTRY_LIST } from '@/shared/constants';
import SpecialDealsSection from 'features/VirtualPhoneNumberSpecialDealsSection';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { generateMeta } from '@/shared/lib';
import { useSecondPhoneCountries } from '@/shared/hooks';
import { Cacheable } from '@/lib/redis';

function Pricing({
  popularSecondPhoneCountries,
  allCountries,
}: {
  popularSecondPhoneCountries: SecondPhoneCountry[];
  allCountries: ICountry[];
}) {
  const { asPath } = useRouter();
  const { t, i18n } = useTranslation('meta');
  const secondPhoneCountries = useSecondPhoneCountries({
    initCountryList: popularSecondPhoneCountries,
  });

  const meta = React.useMemo(
    () =>
      generateMeta({
        language: i18n.language,
        description: t('virtual_numbers_pricing_description'),
        title: t('virtual_numbers_pricing_title'),
        asPath,
        supportedLangs: ['en'],
      }),
    [asPath, i18n.language, t]
  );

  return (
    <>
      <Head>{meta}</Head>
      <Navbar />
      <PhoneNumbersRates popularSecondPhoneCountries={secondPhoneCountries} secondPhoneCountries={allCountries} />
      <SpecialDealsSection />
      <DownloadAppSection />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale, req, res }) => {
  res.setHeader('Cache-Control', `public, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 60}`);

  const countryCode = (req.headers['cf-ipcountry'] ?? '') as string;

  const [{ data: popularCountries }] = await Promise.all([Cacheable(api.secondPhone.listSecondPhoneCountries)()]);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'virtual-phone-number', 'meta'])),
      popularSecondPhoneCountries: popularCountries ?? [],
      allCountries: COUNTRY_LIST,
      countryCode,
    },
  };
};

export default Pricing;

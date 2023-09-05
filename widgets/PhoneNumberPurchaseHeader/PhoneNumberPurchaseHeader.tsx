import React from 'react';
import type { ICity, ICountry, IState } from 'country-cities';
import { format } from 'libphonenumber-js';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useWindowSize } from '@/context/WindowSizeContext';
import type { PhoneToBuy, SecondPhoneCountry } from '@/utils/types';
import PhoneNumberPurchase from '@/features/PhoneNumberPurchase';
import PhoneNumbersTable from '@/features/PhoneNumbersTable';
import NoNumbersAvailableView from '@/features/NoNumbersAvailableView';
import { formatAreaCode, formatStringToKebabCase, removeExcludedWords } from '@/shared/lib';
import CountryFlag from '@/shared/ui/CountryFlag';
import Breadcrumbs from '@/shared/ui/Breadcrumbs';
import { STATE_NAME_DEPRECATED_WORDS } from '@/shared/constants';
import { PanelSection, PanelSectionTitle } from '@/shared/ui/styled';
import { SectionsWrapper, Wrapper } from './styled';

type PhoneNumberPurchaseHeaderProps = {
  phones: PhoneToBuy[];
  state: IState | null;
  city?: ICity;
  country: ICountry;
  phone?: PhoneToBuy | null;
  countries: SecondPhoneCountry[];
  randomGeneratedPhones: PhoneToBuy[];
};

enum Steps {
  SelectNumber = 'SelectNumber',
  Purchase = 'Purchase',
}

function PhoneNumberPurchaseHeader({
  phones,
  country,
  city,
  state,
  phone = null,
  countries,
  randomGeneratedPhones,
}: PhoneNumberPurchaseHeaderProps) {
  const { t } = useTranslation('virtual-phone-number');
  const { isMobile } = useWindowSize();
  const [step, setStep] = React.useState(Steps.SelectNumber);
  const [selectedPhone, setSelectedPhone] = React.useState(phone ?? phones.length ? phones[0] : null);

  const areaCode =
    (country.isoCode === 'US' || country.isoCode === 'CA') && phones[0]
      ? format(phones[0].phoneNumber, 'INTERNATIONAL').slice(0, 6).replaceAll(' ', '-')
      : formatAreaCode(country.phonecode);

  const handlePhoneNumberSelect = React.useCallback(
    (_phone: PhoneToBuy) => {
      setSelectedPhone(_phone);
      if (isMobile) {
        setStep(Steps.Purchase);
        if (typeof window !== 'undefined') window.scroll({ top: 0 });
      }
    },
    [isMobile]
  );

  return (
    <Wrapper>
      <h1>
        {t('phone_numbers_by_city_title', {
          stateIso: state?.isoCode,
          city: city?.name,
          areaCode,
          country: country.name,
        })}
      </h1>
      <Breadcrumbs>
        <Link href="/">{t('common:home')}</Link>
        <Link href="/virtual-phone-number/pricing">{t('common:phone_number')}</Link>
        <Link href={`/virtual-phone-number/${formatStringToKebabCase(country.name)}`}>{country.name}</Link>
        {state && (
          <Link
            href={`/virtual-phone-number/${formatStringToKebabCase(country.name)}/${formatStringToKebabCase(
              removeExcludedWords(state.name, STATE_NAME_DEPRECATED_WORDS)
            )}`}
          >
            {removeExcludedWords(state.name, STATE_NAME_DEPRECATED_WORDS)}
          </Link>
        )}
        {city && state && (
          <Link
            href={`/virtual-phone-number/${formatStringToKebabCase(country.name)}/${formatStringToKebabCase(
              removeExcludedWords(state.name, STATE_NAME_DEPRECATED_WORDS)
            )}/${formatStringToKebabCase(city.name)}`}
          >
            {city.name}
          </Link>
        )}
      </Breadcrumbs>
      <SectionsWrapper>
        {(isMobile ? step === Steps.SelectNumber : true) && (
          <PanelSection>
            <PanelSectionTitle>
              <div>
                <CountryFlag name={country.isoCode} width={32} height={24} borderRadius={5} /> {areaCode} {country.name}
              </div>
              <Link
                href={`/virtual-phone-number/${formatStringToKebabCase(country.name)}${
                  state
                    ? `/${formatStringToKebabCase(removeExcludedWords(state.name, STATE_NAME_DEPRECATED_WORDS))}`
                    : ''
                }`}
              >
                {t('change')}
              </Link>
            </PanelSectionTitle>
            {phones.length ? (
              <>
                <PanelSectionTitle>{t('select_phone_number')}</PanelSectionTitle>
                <PhoneNumbersTable onRowClick={handlePhoneNumberSelect} phones={phones} />
              </>
            ) : (
              <NoNumbersAvailableView phones={randomGeneratedPhones} />
            )}
          </PanelSection>
        )}
        {(isMobile ? step === Steps.Purchase : true) && selectedPhone && (
          <PanelSection>
            <PhoneNumberPurchase country={country} phone={selectedPhone} state={state} />
          </PanelSection>
        )}
      </SectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumberPurchaseHeader, type PhoneNumberPurchaseHeaderProps };

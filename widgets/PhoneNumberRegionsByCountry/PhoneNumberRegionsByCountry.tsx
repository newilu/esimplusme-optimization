import React from 'react';
import { useRouter } from 'next/router';

import type { ICountry, IState } from 'country-cities';
import { Trans, useTranslation } from 'next-i18next';
import Link from 'next/link';
import { formatAreaCode, formatStringToKebabCase } from '@/shared/lib';
import Breadcrumbs from '@/shared/ui/Breadcrumbs';
import { StatesTable } from '@/entities/StatesTable/StatesTable';
import { CountryFlag } from '@/shared/ui/CountryFlag/CountryFlag';

import { PanelSection, PanelSectionTitle, PanelSectionsWrapper } from '@/shared/ui/styled';
import { PhoneToBuy, SecondPhoneCountry } from '@/utils/types';
import PhoneNumbersTable from '@/features/PhoneNumbersTable';
import PhoneNumberPurchase from '@/features/PhoneNumberPurchase';
import NoNumbersAvailableView from '@/features/NoNumbersAvailableView';
import { Wrapper } from './styled';

type PhoneNumberRegionsByCountryProps = {
  states: IState[];
  country: ICountry;
  phones: PhoneToBuy[] | null;
  popularCountries: SecondPhoneCountry[];
  phoneNumberStartingPrice: number | null;
  phoneNumber?: PhoneToBuy | null;
  randomGeneratedPhones: PhoneToBuy[];
};

function PhoneNumberRegionsByCountry({
  country,
  states,
  phones,
  phoneNumberStartingPrice,
  popularCountries,
  phoneNumber = null,
  randomGeneratedPhones,
}: PhoneNumberRegionsByCountryProps) {
  const { t } = useTranslation('virtual-phone-number');
  const { pathname } = useRouter();
  const [selectedPhone, setSelectedPhone] = React.useState(phones?.length ? phones[0] : null);

  return (
    <Wrapper>
      <h1>{t('phone_number_regions_by_country_title', { country: country.name })}</h1>
      <p>
        <Trans
          i18nKey="virtual-phone-number:phone_number_regions_by_country_text"
          values={{
            country: country.name,
          }}
        />
      </p>
      <Breadcrumbs>
        <Link href="/">{t('common:home')}</Link>
        <Link href="/virtual-phone-number/pricing">{t('common:phone_number')}</Link>
        <Link href={`/virtual-phone-number/${formatStringToKebabCase(country.name)}`}>{country.name}</Link>
      </Breadcrumbs>
      <PanelSectionsWrapper dir="row">
        {phoneNumber ? (
          <PanelSection>
            <PanelSectionTitle>
              <div>
                <CountryFlag name={country.isoCode} width={32} height={24} borderRadius={5} />{' '}
                {formatAreaCode(country.phonecode)} {country.name}
              </div>
              <Link href={pathname}>Change</Link>
            </PanelSectionTitle>
            <PhoneNumberPurchase phone={phoneNumber} country={country} />
          </PanelSection>
        ) : (
          <>
            {!!states.length && (
              <PanelSection>
                <PanelSectionTitle>
                  {t('regions')} <Link href="/virtual-phone-number/pricing">{t('change')}</Link>
                </PanelSectionTitle>
                <StatesTable country={country} states={states} phoneNumberStartingPrice={phoneNumberStartingPrice} />
              </PanelSection>
            )}
            {!!phones?.length && (
              <>
                <PanelSection>
                  <PanelSectionTitle>
                    {t('select_phone_number')} <Link href="/virtual-phone-number/pricing">{t('change')}</Link>
                  </PanelSectionTitle>
                  <PhoneNumbersTable phones={phones} onRowClick={setSelectedPhone} />
                </PanelSection>
                <PanelSection>
                  <PhoneNumberPurchase country={country} phone={selectedPhone as PhoneToBuy} />
                </PanelSection>
              </>
            )}
          </>
        )}
        {popularCountries && !phones?.length && !states.length && (
          <PanelSection>
            <NoNumbersAvailableView phones={randomGeneratedPhones} />
          </PanelSection>
        )}
      </PanelSectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumberRegionsByCountry, type PhoneNumberRegionsByCountryProps };

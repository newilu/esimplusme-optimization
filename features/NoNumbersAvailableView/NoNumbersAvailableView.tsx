import React from 'react';
import { format } from 'libphonenumber-js';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createColumnHelper } from '@tanstack/react-table';
import type { PhoneToBuy } from '@/utils/types';
import { Paragraph } from '@/shared/ui/styled';
import { formatStringToKebabCase } from '@/shared/lib';
import BaseTable from '@/shared/ui/BaseTable';
import { DEFAULT_PHONE_NUMBER_PRICE, SECOND_PHONE_SUPPORTED_COUNTRIES } from '@/shared/constants';
import CountryFlag from '@/shared/ui/CountryFlag';
import searchIcon from './assets/search.svg';
import { PhoneNumberWrapper, Wrapper } from './styled';

const columnHelper = createColumnHelper<PhoneToBuy>();

type NoNumbersAvailableViewProps = {
  phones: PhoneToBuy[];
};

function NoNumbersAvailableView({ phones }: NoNumbersAvailableViewProps) {
  const router = useRouter();
  const { t } = useTranslation('virtual-phone-number');

  const phoneNumberColumn = React.useMemo(
    () =>
      columnHelper.accessor('phoneNumber', {
        header: () => t('numbers'),
        cell: (info) => (
          <PhoneNumberWrapper>
            <CountryFlag width={28} height={20} name={info.row.original.region} />{' '}
            {format(info.getValue(), 'INTERNATIONAL')}
          </PhoneNumberWrapper>
        ),
      }),

    [t]
  );

  const connectionFeeColumn = React.useMemo(
    () =>
      columnHelper.accessor('price', {
        header: () => t('connection_monthly_fee'),
        cell: (info) => `$${(info.getValue() || DEFAULT_PHONE_NUMBER_PRICE) + 1}`,
      }),
    [t]
  );

  const handleRowClick = React.useCallback(
    ({ region, phoneNumber }: PhoneToBuy) => {
      router.push({
        pathname: '/virtual-phone-number/payment',
        query: {
          ...router.query,
          country: formatStringToKebabCase(SECOND_PHONE_SUPPORTED_COUNTRIES.find((el) => el === region) ?? ''),
          phone: phoneNumber,
        },
      });
    },
    [router]
  );

  return (
    <Wrapper>
      <div>
        <Image width={120} height={100} src={searchIcon} alt="" />
        <Paragraph>
          We&apos;re sorry, there are currently no available numbers. Feel free to check back later, select a different
          country or region, or{' '}
          <Link href="mailto:ask.esimplus@appvillis.com" target="_blank">
            Request Number
          </Link>{' '}
          to notify us about your preference. Your patience and understanding are greatly appreciated!
        </Paragraph>
      </div>
      <div>
        <BaseTable
          onRowClick={handleRowClick}
          maxVisibleElements={null}
          data={phones}
          columns={[phoneNumberColumn, connectionFeeColumn]}
        />
      </div>
    </Wrapper>
  );
}

export { NoNumbersAvailableView, type NoNumbersAvailableViewProps };

import { SECOND_PHONE_SUPPORTED_COUNTRIES } from '@/shared/constants';
import { BuyMultipleNumbersPayload, MappedDataType, PhoneToBuy, SecondPhoneCountry } from '@/utils/types';
import { MAIN_API_URL } from '@/utils/constants';
import { getCookie } from '@/shared/lib';
import { delay } from '@/utils/common';
import { queryFetcher } from './index';

const ENDPOINTS = {
  getPhonesByCountry: (countryCode: string) => `/v7/second-phone/phone-numbers/${countryCode}`,
  states: () => '/v6/second-phone/usa/states',
  numbersByStateCode: (code: number) => `/v6/second-phone/usa/phone-numbers/code/${code}`,
  numbersByStateIso: (iso: string) => `/v6/second-phone/usa/phone-numbers/state/${iso}`,
  numbersByStateISO: (stateIso: string) => `/v6/second-phone/usa/phone-numbers/state/${stateIso}`,
  secondPhoneCountries: () => `/v7/second-phone/countries`,
  createTempUser: () => `/v6/auth/temp-user`,
  signature: () => '/v7/second-phone/ecommpay-signature',
  thedexTopUp: () => '/v6/payment-providers/thedex/top-up/second-phone',
  buyNumber: () => `/v6/second-phone/buy-number`,
  buyMultipleNumbers: () => '/v6/second-phone/buy-multiple-numbers',
  topupWithWebpay: () => `/v6/payment-providers/webpay/top-up/second-phone`,
  checkPaymentStatus: () => '/v6/payment-providers/is-payment-paid',
};

async function listSecondPhoneCountries(): Promise<MappedDataType<SecondPhoneCountry[]>> {
  const { data, error, headers } = await queryFetcher<{
    data: { countries: SecondPhoneCountry[] };
  }>(MAIN_API_URL.concat(ENDPOINTS.secondPhoneCountries()));

  return {
    error,
    data: data?.data.countries ?? null,
    headers,
  };
}

function getAvailableNumbersByStateISO(iso: string) {
  return queryFetcher<{ data: { phones: PhoneToBuy[] } }>(`${MAIN_API_URL}${ENDPOINTS.numbersByStateISO(iso)}`);
}

function getAvailableNumbersByStateAreaCode(code: number) {
  return queryFetcher<{ data: { phones: PhoneToBuy[] } }>(`${MAIN_API_URL}${ENDPOINTS.numbersByStateCode(code)}`);
}

function getAvailableNumbersByStateIso(isoCode: string) {
  return queryFetcher<{ data: { phones: PhoneToBuy[] } }>(`${MAIN_API_URL}${ENDPOINTS.numbersByStateIso(isoCode)}`);
}

function getPhonesByCountry(country: string) {
  if (!SECOND_PHONE_SUPPORTED_COUNTRIES.includes(country)) {
    return { headers: null, error: null, data: { data: { phones: [] } } } as MappedDataType<{
      data: { phones: PhoneToBuy[] };
    }>;
  }

  return queryFetcher<{ data: { phones: PhoneToBuy[] } }>(`${MAIN_API_URL}${ENDPOINTS.getPhonesByCountry(country)}`);
}

function createTempUser() {
  return queryFetcher<{ data: { systemAuthToken: string } }>(`${MAIN_API_URL}${ENDPOINTS.createTempUser()}`, {
    method: 'POST',
    credentials: 'include',
  });
}

function getSignature({ stringToSign, price }: { stringToSign: string; price: string | number }) {
  return queryFetcher(`${MAIN_API_URL}${ENDPOINTS.signature()}`, {
    method: 'POST',
    body: JSON.stringify({ data: stringToSign, price }),
    credentials: 'include',
    headers: {
      'x-system-auth-token': getCookie('tmp_usr_session') ?? '',
    },
  });
}
function thedexTopUp({
  price,
  successUrl,
  failureUrl,
}: {
  price: string | number;
  successUrl: string;
  failureUrl: string;
}) {
  return queryFetcher<{ data: { payUrl: string } }>(`${MAIN_API_URL}${ENDPOINTS.thedexTopUp()}`, {
    method: 'POST',
    body: JSON.stringify({
      amount: price,
      successUrl,
      failureUrl,
    }),
    credentials: 'include',
    headers: {
      'x-system-auth-token': getCookie('tmp_usr_session') ?? '',
    },
  });
}

function topupWithWebpay(payload: { amount: number; successUrl?: string; failureUrl?: string }) {
  return queryFetcher<{ data: { payUrl: string; paymentId: string } }>(
    `${MAIN_API_URL}${ENDPOINTS.topupWithWebpay()}`,
    {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(payload),
      headers: {
        'x-system-auth-token': getCookie('tmp_usr_session') ?? '',
      },
    }
  );
}

function buyNumber(props: { phone: string; country_code: string }) {
  return queryFetcher(`${MAIN_API_URL}${ENDPOINTS.buyNumber()}`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(props),
    headers: {
      'x-system-auth-token': getCookie('tmp_usr_session') ?? '',
    },
  });
}

function buyMultipleNumbers(payload: BuyMultipleNumbersPayload) {
  return queryFetcher(`${MAIN_API_URL}${ENDPOINTS.buyMultipleNumbers()}`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(payload),
    headers: {
      'x-system-auth-token': getCookie('tmp_usr_session') ?? '',
    },
  });
}

function checkPaymentStatus(paymentId: string) {
  return queryFetcher<{ data: { paid: boolean } }>(`${MAIN_API_URL}${ENDPOINTS.checkPaymentStatus()}`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ paymentId }),
    headers: {
      'x-system-auth-token': getCookie('tmp_usr_session') ?? '',
    },
  });
}

const recursiveCheckPaymentStatus = (paymentId: string, attempts: number) =>
  new Promise<void>((res) => {
    checkPaymentStatus(paymentId).then(({ data }) => {
      if (data?.data?.paid === false) {
        delay(6000).then(() => {
          recursiveCheckPaymentStatus(paymentId, attempts - 1).then(res);
        });
      } else {
        res();
      }
    });
  });

export {
  ENDPOINTS,
  topupWithWebpay,
  getPhonesByCountry,
  getAvailableNumbersByStateAreaCode,
  getAvailableNumbersByStateIso,
  listSecondPhoneCountries,
  getAvailableNumbersByStateISO,
  createTempUser,
  getSignature,
  thedexTopUp,
  buyNumber,
  buyMultipleNumbers,
  checkPaymentStatus,
  recursiveCheckPaymentStatus,
};

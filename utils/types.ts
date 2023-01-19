import { ProviderTypes } from "./constants";

export type FirebaseError = {
  code: string;
  message: string;
  name: "FirebaseError";
  stack?: string;
};

export type MarketingBundle = {
  id: number;
  description: string;
  countries: {
    id: number;
    image: string;
    iso: string;
    name: string;
  }[];
  dataAmount: number;
  duration: number;
  speed: string[];
  image: string;
  price: number;
};

export type User = {
  balance: number;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  mobileIdentifier: string;
  photoUrl: string;
  referrerId: number | null;
  telegramAuthToken: string | null;
  telegramUsername: string | null;
};

export type EsimUser = {
  balance: number;
  email: string;
  firstName: string;
  id: number | string;
  lastName: string;
  mobileIdentifier: string;
  photoUrl: string;
  referrerId: number | null;
  telegramAuthToken: string | null;
  telegramUsername: string | null;
};

export type Bundle = {
  countries: {
    country: string;
    currency: string;
    id: number;
    image: string;
    isoName2: string;
    mtx: number;
    tc: number;
  }[];
  currency: string;
  dataAmount: number;
  duration: number;
  groupId: string;
  image: string;
  isoName2: string;
  name: string;
  paymentCode: string;
  price: number;
  providerType: ProviderTypes;
  regionId: number;
  worldwide: 1 | 0;
};

export type CountryByISO = {
  availableDataAmounts: number[];
  bundles: { [key: number]: Bundle[] };
} & Country;

export type Country = {
  aliases: any;
  country: string;
  id: number;
  image: string;
  isoName: string;
  isoName2: string;
  mtx: number;
  planId: number | null;
  regionId: number;
  regionlist: number[];
  tc: number;
  worldwideRegionId: number | null;
};

export type Region = {
  featured: boolean;
  id: number;
  name: string;
  specialOffer: boolean;
  type: string;
  worldwide: boolean;
};

export type RegionById = Region &
  Pick<CountryByISO, "availableDataAmounts" | "bundles">;

export type EcommpayPurchaseProfileResponse = {
  signedRequest: {
    customer_id: number;
    hide_saved_wallets: 1 | 0;
    language_code: string;
    payment_amount: number;
    payment_currency: string;
    payment_description: string;
    payment_id: string;
    project_id: number;
    redirect_success_mode: string;
    redirect_success_url: string;
    region_code: string;
  };
  stringToSign: string;
  signature: string;
  applePayMerchantId: string;
};

export type Profile = {
  active: 1 | 0;
  balance: number;
  bundleDays: number;
  bundleId: number;
  cachedAt: string;
  code: string;
  country: {
    aliases: null | string;
    country: string;
    id: number;
    image: string;
    iso_name: string;
    iso_name2: string;
    mtx: number;
    plan_id: number;
    region_id: number;
    regionlist: number[];
    tc: number;
    worldwide_region_id: number | null;
  };
  currency: string;
  customTitle: string | null;
  endDate: string | null;
  expired: 1 | 0;
  icc: string;
  id: number;
  image: string;
  isoName2: string;
  lpa: string;
  lpaDisplay: string;
  phoneNumber: string | null;
  providerType: string;
  region: {
    available: 1 | 0;
    categoryId: number;
    createdAt: string;
    description: null | string;
    descriptionBottom: null | string;
    id: number;
    image: null | string;
    metaDescription: string;
    metaH1: string;
    metaKeywords: string;
    metaRobotsIndex: number;
    metaTitle: string;
    order: number;
    slug: string;
    title: string;
    updatedAt: string;
  };
  regionId: number;
  title: string;
  totalVolumeBytes: number;
  usedVolumeBytes: number;
};

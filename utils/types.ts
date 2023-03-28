import { ProviderTypes } from "./constants";

export type Category = {
  id: number;
  name: string;
  articleCount: number;
};

export type Author = {
  id: number;
  name: string;
  image: string | null;
  articleCount: number;
};

export type ArticlePreview = {
  image: { src: string | null; width: number; height: number };
  content: string;
  title: string;
  url?: string | null;
  id: number;
  createdAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  categories: Category[];
};

export type Article = {
  author: Author;
  categories: Category[];
  content: { [key: number]: string };
  createdAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  updatedAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  id: number;
  metaTitle: string;
  metaDescription: string;
  preview: ArticlePreview;
  readingTime: string;
  tableOfContent: string[];
  title: string;
  url?: string | null;
  relatedArticles: ArticlePreview[];
};

export type SpecialOffer = {
  bundleId: number;
  countdown: number;
  countries: string[];
  country: string;
  createdAt: string;
  days: number;
  description: string;
  duration: number;
  endTime: null;
  featured: 1 | 0;
  id: number;
  image: string;
  isPerMb: 1 | 0;
  mb: number;
  name: string;
  order: number;
  price: number;
  regionId: number;
  regularRegionId: number;
  softLimit: number;
  specialOffer: 1 | 0;
  startTime: string;
  type: string;
  updatedAt: string;
  worldwide: 1 | 0;
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

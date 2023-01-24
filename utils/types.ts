export type Category = {
  id: number;
  name: string;
};

export type Author = {
  id: number;
  name: string;
  description: string;
  image: string;
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
  id: number;
  pageTitle: string;
  metaDescription: string;
  preview: string;
  readingTime: string;
  tableOfContent: { [key: number]: string };
  title: string;
  url?: string | null;
};

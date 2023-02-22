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

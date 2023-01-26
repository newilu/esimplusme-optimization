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
  metaTitle: string;
  metaDescription: string;
  preview: { image: string | null; content: string; title: string };
  readingTime: string;
  tableOfContent: string[];
  title: string;
  url?: string | null;
  relatedArticles: Article[];
};

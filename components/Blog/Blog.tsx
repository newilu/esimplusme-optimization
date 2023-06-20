import React from "react";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { Article } from "@/utils/types";
import { SectionTitle, Text } from "@/utils/styled";
import {
  CardCategories,
  CardCategory,
} from "@/components/BlogPreviewCard/styled";
import { scrollToId } from "@/utils/common";
import AuthorComponent from "../AuthorComponent";
import {
  BlogInfoWrapper,
  BlogReadingTime,
  DocumentToc,
  DocumentTocHeading,
  DocumentTocItem,
  DocumentTocList,
  LeftSide,
  RightSide,
  Wrapper,
} from "./styled";

function Blog({
  categories,
  title,
  readingTime,
  content,
  author,
  createdAt,
  tableOfContent,
}: Article) {
  const router = useRouter();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      scrollToId(window.location.hash.slice(1), 64);
    }
  }, []);

  return (
    <Wrapper>
      <LeftSide>
        <SectionTitle>{title}</SectionTitle>
        <BlogInfoWrapper>
          <Link href={`/authors/${author.id}`}>
            <AuthorComponent
              size="small"
              image={author.image}
              name={author.name}
              subtitle={`${t("published")} ${format(
                new Date(createdAt.date.replace(" ", "T")),
                "PP"
              )}`}
            />
          </Link>
          <div>
            <CardCategories>
              {categories.map(({ name, id }) => (
                <CardCategory key={id}>#{name}</CardCategory>
              ))}
            </CardCategories>
            <BlogReadingTime>{readingTime}</BlogReadingTime>
          </div>
        </BlogInfoWrapper>
        <Text
          dangerouslySetInnerHTML={{ __html: Object.values(content).join("") }}
        />
      </LeftSide>
      <RightSide>
        <DocumentToc>
          <DocumentTocHeading>{t("table_of_content")}</DocumentTocHeading>
          <DocumentTocList>
            {tableOfContent.map((el) => {
              const name = el.match(/name="(.*?)"/)?.[1];

              return (
                <DocumentTocItem
                  key={el}
                  $active={decodeURIComponent(router.asPath).includes(
                    name ?? ""
                  )}
                >
                  <Link
                    href={`#${name}`}
                    scroll={false}
                    onClick={() => scrollToId(name ?? "", 90)}
                  >
                    {name}
                  </Link>
                </DocumentTocItem>
              );
            })}
          </DocumentTocList>
        </DocumentToc>
      </RightSide>
    </Wrapper>
  );
}

export { Blog };

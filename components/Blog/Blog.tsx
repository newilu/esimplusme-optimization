import React from "react";
import Link from "next/link";
import { SectionTitle, Text } from "@/utils/styled";
import { Article } from "@/utils/types";
import AuthorComponent from "../AuthorComponent";
import {
  CardCategories,
  CardCategory,
} from "@/components/BlogPreviewCard/styled";
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
import { useTranslation } from "next-i18next";

function Blog({ categories, title, readingTime, content, author }: Article) {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <LeftSide>
        <CardCategories>
          {categories.map(({ name, id }) => (
            <CardCategory key={id}>
              <Link target="_blank" href={`/categories/${name}`}>
                #{name}
              </Link>
            </CardCategory>
          ))}
        </CardCategories>
        <SectionTitle>{title}</SectionTitle>
        <BlogInfoWrapper>
          <Link href={`/authors/${author.id}`}>
            <AuthorComponent
              size="small"
              image={author.image}
              name={author.name}
              subtitle={author.description}
            />
          </Link>
          <BlogReadingTime>{readingTime}</BlogReadingTime>
        </BlogInfoWrapper>
        <Text
          dangerouslySetInnerHTML={{ __html: Object.values(content).join("") }}
        />
      </LeftSide>
      <RightSide>
        <DocumentToc>
          <DocumentTocHeading>
            <h2>{t("table_of_content")}</h2>
          </DocumentTocHeading>
          <DocumentTocList>
            <DocumentTocItem $active>
              <a href="#интерактивный_пример">Интерактивный пример</a>
            </DocumentTocItem>{" "}
            <DocumentTocItem>
              <a href="#интерактивный_пример">Интерактивный пример</a>
            </DocumentTocItem>{" "}
            <DocumentTocItem>
              <a href="#интерактивный_пример">Интерактивный пример</a>
            </DocumentTocItem>{" "}
            <DocumentTocItem>
              <a href="#интерактивный_пример">Интерактивный пример</a>
            </DocumentTocItem>
          </DocumentTocList>
        </DocumentToc>
      </RightSide>
    </Wrapper>
  );
}

export { Blog };

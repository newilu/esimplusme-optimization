import React from "react";
import Link from "next/link";
import Image from "next/image";
import arrow from "public/staticfiles/arrow-top-right.svg";
import ph from "public/staticfiles/preview-ph.svg";
import { ArticlePreview } from "utils/types";
import { format } from "date-fns";
import { useTranslation } from "next-i18next";
import {
  BlogPublicationDate,
  CardCategories,
  CardCategory,
  CardFooter,
  CardText,
  CardTitle,
  ImageWrapper,
  Wrapper,
} from "./styled";

type BlogPreviewCardProps = ArticlePreview;

function BlogPreviewCard({
  url,
  id,
  createdAt,
  categories,
  title,
  image,
  content,
}: BlogPreviewCardProps) {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Link href={`/blog/${url ?? id}`}>
        <ImageWrapper>
          <Image width={300} height={200} src={image.src ?? ph} alt="" />
        </ImageWrapper>
        <CardCategories>
          {categories.map(({ name, id: categoryId }) => (
            <CardCategory key={categoryId}>#{name}</CardCategory>
          ))}
        </CardCategories>
        <CardTitle>{title}</CardTitle>
        <CardText dangerouslySetInnerHTML={{ __html: content }} />
        <CardFooter>
          <div>
            {t("read_article")}{" "}
            <Image width={16} height={16} src={arrow} alt="arrow" />{" "}
          </div>
          <BlogPublicationDate>
            {format(new Date(createdAt.date.replace(" ", "T")), "PP")}
          </BlogPublicationDate>
        </CardFooter>
      </Link>
    </Wrapper>
  );
}

export { BlogPreviewCard };

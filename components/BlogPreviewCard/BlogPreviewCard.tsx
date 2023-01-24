import React from "react";
import Link from "next/link";
import Image from "next/image";
import arrow from "public/staticfiles/arrow-top-right.svg";
import { Article } from "@/utils/types";
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
import { format } from "date-fns";
import { useTranslation } from "next-i18next";

function BlogPreviewCard({
  url,
  id,
  preview,
  createdAt,
  title,
  categories,
}: Article) {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <ImageWrapper>
        <Link href={`/blog/${url ?? id}`}>
          <Image
            width={300}
            height={200}
            src={preview ? `http://${preview}` : ""}
            alt=""
          />
        </Link>
      </ImageWrapper>
      <CardCategories>
        {categories.map(({ name, id }) => (
          <CardCategory key={id}>#{name}</CardCategory>
        ))}
      </CardCategories>
      <Link href={`/blog/${url ?? id}`}>
        <CardTitle>{title}</CardTitle>
      </Link>
      <CardText>{title}</CardText>
      <CardFooter>
        <Link href={`/blog/${url ?? id}`}>
          {t("read_article")}{" "}
          <Image width={16} height={16} src={arrow} alt="arrow" />{" "}
        </Link>
        <BlogPublicationDate>
          {format(new Date(createdAt.date.replace(" ", "T")), "PP")}
        </BlogPublicationDate>
      </CardFooter>
    </Wrapper>
  );
}

export { BlogPreviewCard };

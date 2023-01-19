import React from "react";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import arrow from "public/staticfiles/arrow-top-right.svg";
import {
  BlogPublicationDate,
  CardCategory,
  CardFooter,
  CardText,
  CardTitle,
  ImageWrapper,
  Wrapper,
} from "./styled";

function BlogPreviewCard(props: LinkProps) {
  return (
    <Wrapper>
      <ImageWrapper>
        <Link {...props}>
          <Image
            width={300}
            height={200}
            src="https://wallpaperaccess.com/full/2029165.jpg"
            alt=""
          />
        </Link>
      </ImageWrapper>
      <CardCategory>#zxc</CardCategory>
      <Link {...props}>
        <CardTitle>Повседневная практика показывает</CardTitle>
      </Link>
      <CardText>
        Таким образом постоянный количественный рост и сфера нашей активности
        требуют определения и уточнения новых предложений.
      </CardText>
      <CardFooter>
        <Link {...props}>
          Читать пост <Image width={16} height={16} src={arrow} alt="arrow" />{" "}
        </Link>
        <BlogPublicationDate>20.12.2022</BlogPublicationDate>
      </CardFooter>
    </Wrapper>
  );
}

export { BlogPreviewCard };

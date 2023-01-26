import React from "react";
import Image from "next/image";
import { AuthorDesr, AuthorName, AuthorImageWrapper, Wrapper } from "./styled";
import Link from "next/link";

function AuthorPreviewCard({
  name,
  image,
  description,
  id,
}: {
  name: string;
  image: string;
  id: number;
  description: React.ReactNode;
}) {
  return (
    <Wrapper>
      <Link href={`/authors/${id}`}>
        <AuthorImageWrapper>
          <Image src={image} width={80} height={80} alt="author image" />
        </AuthorImageWrapper>
        <AuthorName>{name}</AuthorName>
        <AuthorDesr>{description}</AuthorDesr>
      </Link>
    </Wrapper>
  );
}

export { AuthorPreviewCard };

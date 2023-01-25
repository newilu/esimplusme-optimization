import React from "react";
import Image from "next/image";
import { AuthorDesr, AuthorName, AuthorImageWrapper, Wrapper } from "./styled";

function AuthorPreviewCard({
  name,
  image,
  description,
}: {
  name: string;
  image: string;
  description: React.ReactNode;
}) {
  return (
    <Wrapper>
      <AuthorImageWrapper>
        <Image src={image} width={80} height={80} alt="author image" />
      </AuthorImageWrapper>
      <AuthorName>{name}</AuthorName>
      <AuthorDesr>{description}</AuthorDesr>
    </Wrapper>
  );
}

export { AuthorPreviewCard };

import React from "react";
import Image from "next/image";
import { AuthorDesr, AuthorName, AuthorImageWrapper, Wrapper } from "./styled";
import { Author } from "@/utils/types";

function AuthorPreviewCard({ name, image, description }: Author) {
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

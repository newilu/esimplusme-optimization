import React from "react";
import Image from "next/image";
import ph from "public/staticfiles/author-placeholder.svg";
import {
  AuthorImageWrapper,
  AuthorName,
  AuthorTagline,
  Wrapper,
} from "./styled";

export type AuthorComponentProps = {
  name: string;
  image: string | null;
  subtitle: string;
  size?: "small" | "default";
};

function AuthorComponent({
  name,
  image,
  subtitle,
  size,
}: AuthorComponentProps) {
  return (
    <Wrapper size={size}>
      <AuthorImageWrapper>
        <Image width={80} height={80} src={image ?? ph} alt={name} />
      </AuthorImageWrapper>
      <div>
        <AuthorName>{name}</AuthorName>
        <AuthorTagline>{subtitle}</AuthorTagline>
      </div>
    </Wrapper>
  );
}

export { AuthorComponent };

import React from "react";
import BlogPreviewCard from "../BlogPreviewCard";
import { GridWrapper, Title, Wrapper } from "./styled";

function RelatedArticles() {
  return (
    <Wrapper>
      <Title>Related articiels</Title>
      <GridWrapper>
        <BlogPreviewCard href="/" />
        <BlogPreviewCard href="/" />
        <BlogPreviewCard href="/" />
      </GridWrapper>
    </Wrapper>
  );
}

export { RelatedArticles };

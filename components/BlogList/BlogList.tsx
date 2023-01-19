import React from "react";
import { SectionTitle, Text } from "@/utils/styled";
import { Wrapper } from "./styled";
import PaginatedGridView from "@/components/PaginatedGridView";
import BlogPreviewCard from "../BlogPreviewCard";

function BlogList() {
  return (
    <Wrapper>
      <SectionTitle>hueta</SectionTitle>
      <Text>dlya pedikov</Text>
      <PaginatedGridView
        items={[
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
          <BlogPreviewCard href="/blog/1" />,
        ]}
      />
    </Wrapper>
  );
}

export { BlogList };

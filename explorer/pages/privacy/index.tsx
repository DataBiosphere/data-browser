import { LAYOUT_STYLE } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/ContentLayout/contentLayout";
import { ContentView } from "@clevercanary/data-explorer-ui/lib/views/ContentView/contentView";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
import { ContentTheme } from "../../app/components/common/Content/components/ContentTheme/contentTheme";
import { MDX_COMPONENTS } from "../../app/content/common/constants";
import { getContentStaticProps } from "../../app/content/common/contentPages";
import NotFoundPage from "../404";

const slug = ["privacy"];

export const getStaticProps: GetStaticProps = async () => {
  return getContentStaticProps({ params: { slug } });
};

const Page = ({
  frontmatter,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const { layoutStyle } = frontmatter || {};
  if (!mdxSource) return <NotFoundPage />;
  return (
    <ContentView
      content={
        <ContentTheme>
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
        </ContentTheme>
      }
      layoutStyle={layoutStyle ?? LAYOUT_STYLE.CONTRAST}
    />
  );
};

export default Page;

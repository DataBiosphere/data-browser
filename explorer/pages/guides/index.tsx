import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { ContentView } from "@databiosphere/findable-ui/lib/views/ContentView/contentView";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import { ContentTheme } from "../../app/components/common/Content/components/ContentTheme/contentTheme";
import { MDX_COMPONENTS } from "../../app/content/common/constants";
import { getContentStaticProps } from "../../app/content/common/contentPages";
import NotFoundPage from "../404";

const slug = ["guides"];

export const getStaticProps: GetStaticProps = async () => {
  return getContentStaticProps({ params: { slug } }, "Guides");
};

const Page = ({
  layoutStyle,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  if (!mdxSource) return <NotFoundPage />;
  return (
    <ContentView
      content={
        <ContentTheme>
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
        </ContentTheme>
      }
      layoutStyle={layoutStyle ?? undefined}
    />
  );
};

Page.Main = Main;

export default Page;
